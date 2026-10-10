import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useConfig } from "../../ConfigProvider";
import { cn } from "../../utils/cn";
import { Segmented } from "./Segmented";

export interface CalendarProps extends Omit<
  HTMLAttributes<HTMLDivElement>,
  "onChange" | "defaultValue" | "value"
> {
  fullscreen?: boolean;
  /** Extra line under the day number — an event title, a count. Truncated to one line. */
  dateRender?: (date: Date) => ReactNode;
  /** Blocks a date: not selectable, muted, still reachable by keyboard. */
  disabledDate?: (date: Date) => boolean;
  value?: Date;
  defaultValue?: Date;
  onChange?: (date: Date) => void;
}

/** Chevrons point along reading order, so RTL mirrors them. */
function Chevron({ back }: { back?: boolean }) {
  const Glyph = back ? IconChevronLeft : IconChevronRight;
  return <Glyph size={16} stroke={1.75} aria-hidden className="rtl:-scale-x-100" />;
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function sameMonth(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Days in a month, so a page-up out of the 31st lands on the 28th rather than overflowing. */
function clampDay(year: number, month: number, day: number) {
  return new Date(year, month, Math.min(day, new Date(year, month + 1, 0).getDate()));
}

/** Sunday-indexed first day of the week for a locale (Intl says Mon=1…Sun=7). */
function weekStart(locale: string) {
  try {
    const info = (
      new Intl.Locale(locale) as Intl.Locale & {
        getWeekInfo?: () => { firstDay: number };
        weekInfo?: { firstDay: number };
      }
    );
    const firstDay = (info.getWeekInfo?.() ?? info.weekInfo)?.firstDay;
    return firstDay ? firstDay % 7 : 0;
  } catch {
    return 0;
  }
}

/**
 * 28 ghost icon button (prev/next): ink-2 chevron; hover fill + ink; press border colour.
 * Under (hover: none) a transparent ::after lifts the target to 44.
 */
const navButtonClass =
  "relative inline-flex shrink-0 items-center justify-center size-[var(--su-control-xs)] rounded-su-control bg-transparent text-ink-2 cursor-pointer " +
  "transition-[background-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] " +
  "[@media(hover:hover)]:[&:hover:not(:active)]:bg-fill [@media(hover:hover)]:hover:text-ink active:bg-border su-focus-ring " +
  "[@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:-inset-[8px]";

/** 40 wide day columns in the compact calendar (DatePicker cells, grown to 40×40). */
const compactColumns = "grid-cols-[repeat(7,40px)]";

const ARROW_DELTA: Record<string, number> = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7,
};

export function Calendar({
  value,
  fullscreen = false,
  dateRender,
  disabledDate,
  defaultValue,
  onChange,
  className,
  ...rest
}: CalendarProps) {
  const { locale } = useConfig();
  const firstDay = weekStart(locale);
  const weekdays = Array.from({ length: 7 }, (_, i) =>
    new Intl.DateTimeFormat(locale, { weekday: "short" }).format(
      // 4 Jan 2026 is a Sunday; the weekday cycles every 7 days.
      new Date(2026, 0, 4 + firstDay + i),
    ),
  );
  const [internal, setInternal] = useState(() => defaultValue ?? new Date());
  const selected = value ?? internal;
  const [mode, setMode] = useState<"month" | "year">("month");
  const [view, setView] = useState(
    () => new Date(selected.getFullYear(), selected.getMonth(), 1),
  );
  // A controlled value that jumps months must bring the panel with it.
  const valueYear = value?.getFullYear();
  const valueMonth = value?.getMonth();
  useEffect(() => {
    if (valueYear !== undefined && valueMonth !== undefined) {
      setView(new Date(valueYear, valueMonth, 1));
    }
  }, [valueYear, valueMonth]);

  const days = useMemo(() => {
    const start = new Date(view.getFullYear(), view.getMonth(), 1);
    const end = new Date(view.getFullYear(), view.getMonth() + 1, 0);
    const cells: Array<Date | null> = [];
    for (let i = 0; i < (start.getDay() - firstDay + 7) % 7; i++) cells.push(null);
    for (let d = 1; d <= end.getDate(); d++) {
      cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    }
    return cells;
  }, [view, firstDay]);

  // Roving tabindex: one day is in the tab order, arrows move between the rest.
  const gridRef = useRef<HTMLDivElement>(null);
  const [focused, setFocused] = useState<Date | null>(null);
  const tabbable =
    focused && sameMonth(focused, view)
      ? focused.getDate()
      : sameMonth(selected, view)
        ? selected.getDate()
        : sameMonth(new Date(), view)
          ? new Date().getDate()
          : 1;

  useEffect(() => {
    if (!focused) return;
    gridRef.current
      ?.querySelector<HTMLButtonElement>(`[data-day="${focused.getDate()}"]`)
      ?.focus();
  }, [focused]);

  const pick = (date: Date) => {
    if (disabledDate?.(date)) return;
    if (!value) setInternal(date);
    onChange?.(date);
  };

  const shiftMonth = (delta: number) => {
    setView((v) => new Date(v.getFullYear(), v.getMonth() + delta, 1));
  };

  const onDayKeyDown = (event: KeyboardEvent<HTMLButtonElement>, date: Date) => {
    const [y, m, d] = [date.getFullYear(), date.getMonth(), date.getDate()];
    const arrow = ARROW_DELTA[event.key];
    let next: Date | null = null;
    if (arrow !== undefined) next = new Date(y, m, d + arrow);
    else if (event.key === "Home") next = new Date(y, m, d - ((date.getDay() - firstDay + 7) % 7));
    else if (event.key === "End")
      next = new Date(y, m, d + 6 - ((date.getDay() - firstDay + 7) % 7));
    else if (event.key === "PageUp") next = clampDay(y, m - (event.shiftKey ? 12 : 1), d);
    else if (event.key === "PageDown") next = clampDay(y, m + (event.shiftKey ? 12 : 1), d);
    if (!next) return;
    event.preventDefault();
    setFocused(next);
    if (!sameMonth(next, view)) setView(new Date(next.getFullYear(), next.getMonth(), 1));
  };

  const monthLabel = view.toLocaleDateString(locale, {
    month: "long",
    year: "numeric",
  });

  const today = new Date();

  return (
    <div
      className={cn(
        // Panel: surface, 1px border, radius 8. Not `su-panel`: that clips, and the day cells'
        // focus rings sit in the 12/16 padding.
        "bg-surface border border-solid border-border rounded-su-surface font-sans text-ink",
        fullscreen ? "w-full p-su4" : "w-max p-su3",
        className,
      )}
      {...rest}
    >
      <div
        className={cn(
          "flex flex-wrap items-center justify-between gap-su2",
          fullscreen ? "mb-su3" : "min-h-[var(--su-control-sm)] mb-su2",
        )}
      >
        <span
          className={cn(
            "font-semibold text-ink su-tabular",
            fullscreen ? "text-section" : "text-body",
          )}
        >
          {mode === "year" ? view.getFullYear() : monthLabel}
        </span>
        <div className="flex items-center gap-su2 ms-auto">
          {fullscreen && (
            <Segmented
              value={mode}
              onValueChange={(next) => setMode(next as "month" | "year")}
              options={[
                { value: "month", label: "Month" },
                { value: "year", label: "Year" },
              ]}
            />
          )}
          <div className="inline-flex items-center gap-su1">
            <button
              type="button"
              className={navButtonClass}
              onClick={() => shiftMonth(mode === "year" ? -12 : -1)}
              aria-label={mode === "year" ? "Previous year" : "Previous month"}
            >
              <Chevron back />
            </button>
            <button
              type="button"
              className={navButtonClass}
              onClick={() => shiftMonth(mode === "year" ? 12 : 1)}
              aria-label={mode === "year" ? "Next year" : "Next month"}
            >
              <Chevron />
            </button>
          </div>
        </div>
      </div>
      {mode === "year" ? (
        <div className="grid grid-cols-3 gap-su2">
          {Array.from({ length: 12 }, (_, month) => {
            const isCurrent = month === view.getMonth();
            return (
              <button
                type="button"
                key={month}
                aria-current={isCurrent ? "true" : undefined}
                className={cn(
                  "min-h-[72px] border border-solid rounded-su-control text-body cursor-pointer transition-[background-color,border-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] su-focus-ring",
                  // Current month: the v2 selection (action-subtle + action-text), weight unchanged.
                  isCurrent
                    ? "border-action-subtle bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover [@media(hover:hover)]:hover:border-action-subtle-hover"
                    : "border-border bg-surface text-ink [@media(hover:hover)]:hover:bg-surface-2",
                )}
                onClick={() => {
                  setView(new Date(view.getFullYear(), month, 1));
                  setMode("month");
                }}
              >
                {new Intl.DateTimeFormat(locale, { month: "long" }).format(
                  new Date(view.getFullYear(), month, 1),
                )}
              </button>
            );
          })}
        </div>
      ) : (
        <>
          <div className={cn("grid", fullscreen ? "grid-cols-7" : compactColumns)}>
            {weekdays.map((d) => (
              <span
                key={d}
                className={cn(
                  "h-[24px] text-micro font-medium text-ink-2",
                  fullscreen
                    ? "flex items-center px-su2 text-start"
                    : "grid place-items-center",
                )}
              >
                {d}
              </span>
            ))}
          </div>
          <div
            ref={gridRef}
            className={cn("grid", fullscreen ? "grid-cols-7" : compactColumns)}
          >
            {days.map((date, i) => {
              if (!date) {
                return (
                  <span
                    key={`empty-${i}`}
                    className={cn(
                      fullscreen
                        ? "min-h-[92px] max-md:min-h-14 border-t border-solid border-border"
                        : dateRender
                          ? "min-h-[52px]"
                          : "h-[40px]",
                    )}
                  />
                );
              }
              const isSelected = sameDay(date, selected);
              // aria-disabled, not `disabled`: a blocked day stays in the roving focus path.
              const isDisabled = disabledDate?.(date) ?? false;
              const isToday = !isSelected && !isDisabled && sameDay(date, today);
              // One text colour + weight per state, so no two utilities ever compete.
              const numberTone = isSelected
                ? "text-on-action font-medium"
                : isDisabled
                  ? "text-ink-3"
                  : isToday
                    ? "text-action-text font-semibold"
                    : "text-ink";
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  data-day={date.getDate()}
                  tabIndex={date.getDate() === tabbable ? 0 : -1}
                  className={cn(
                    // Alignment and padding live only in the branches: `cn()` is a plain join, so a
                    // base `place-items-center` would beat the fullscreen `place-items-start`.
                    "group grid text-small su-tabular su-focus-ring transition-[background-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                    isDisabled ? "cursor-not-allowed" : "cursor-pointer",
                    fullscreen
                      ? cn(
                          // A top-ruled cell stays square: a radius would leave arc stubs at every join.
                          "min-h-[92px] max-md:min-h-14 rounded-su-row border-t border-solid border-border place-items-start content-start gap-su1 p-su2 max-md:p-su1 text-start",
                          isSelected
                            ? "bg-action-subtle [@media(hover:hover)]:hover:bg-action-subtle-hover"
                            : isDisabled
                              ? "bg-transparent"
                              : "bg-transparent [@media(hover:hover)]:hover:bg-surface-hover",
                        )
                      : cn(
                          // Compact: the whole 40×40 cell is the DatePicker day chip (radius 6).
                          "w-[40px] place-items-center rounded-su-control",
                          dateRender ? "min-h-[52px] content-center gap-0 px-0 py-su1" : "h-[40px] p-0",
                          numberTone,
                          isSelected
                            ? "bg-action [@media(hover:hover)]:hover:bg-action-hover"
                            : isDisabled
                              ? "bg-transparent"
                              : "bg-transparent [@media(hover:hover)]:hover:bg-surface-hover",
                        ),
                  )}
                  aria-label={date.toLocaleDateString(locale, {
                    dateStyle: "full",
                  })}
                  aria-pressed={isSelected}
                  aria-disabled={isDisabled || undefined}
                  onClick={() => pick(date)}
                  onKeyDown={(event) => onDayKeyDown(event, date)}
                >
                  <span
                    className={cn(
                      "grid place-items-center",
                      // Fullscreen: the number is its own chip; selected fills it with action.
                      fullscreen &&
                        cn(
                          "h-[var(--su-control-xs)] min-w-0 px-su2 rounded-su-control",
                          numberTone,
                          isSelected ? "bg-action" : undefined,
                        ),
                    )}
                  >
                    {date.getDate()}
                  </span>
                  {dateRender && (
                    <span
                      className={cn(
                        "block max-w-full overflow-hidden text-micro text-ellipsis whitespace-nowrap",
                        !fullscreen && isSelected ? "text-on-action" : "text-ink-2",
                        fullscreen && "ps-su2",
                      )}
                    >
                      {dateRender(date)}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
