import * as PopoverPrimitive from "@radix-ui/react-popover";
import { IconCheck, IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { useFieldState, useFormItemContext } from "./Form";
import { selectTriggerClass, selectTriggerSizeClass } from "./Select";
import type { CascaderOption } from "./types";

export interface CascaderProps {
  value?: string[];
  defaultValue?: string[];
  placeholder?: string;
  disabled?: boolean;
  options?: CascaderOption[];
  /** Rendered when the root column has no options. */
  notFoundContent?: ReactNode;
  className?: string;
  /**
   * Fires at every level of the drill-down, not only on leaf selection — the
   * emitted path is what the panel currently shows expanded. Check
   * `value.length` / your own tree if you need "the user finished picking".
   */
  onChange?: (value: string[], labels: string[]) => void;
}

function findPath(
  options: CascaderOption[],
  values: string[],
): { columns: CascaderOption[][]; labels: string[] } {
  const columns: CascaderOption[][] = [options];
  const labels: string[] = [];
  let current = options;

  for (const val of values) {
    const match = current.find((opt) => opt.value === val);
    if (!match) break;
    labels.push(match.label);
    if (match.children?.length) {
      current = match.children;
      columns.push(current);
    }
  }

  return { columns, labels };
}

/*
 * Cascader (§4.2, D): panes 200 wide split by 1px border lines, 280 tall at most. Rows 32,
 * padding 0 8, radius 4; a branch ends in a 14 ink-3 chevron-right, the chosen leaf in a 16 check.
 * The active path is action-subtle. Keyboard focus is roving (arrow keys), so the focused row
 * shows the highlighted background instead of an outline (§3), plus an inset outline under
 * prefers-contrast / forced colours where a background alone is too faint.
 */
const cascaderOptionClass =
  "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag font-sans text-body text-start outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none contrast-more:focus-visible:outline-2 contrast-more:focus-visible:outline-solid contrast-more:focus-visible:outline-ink contrast-more:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid forced-colors:focus-visible:-outline-offset-2";

// One background per state, so stylesheet order never decides between them.
const cascaderOptionStateClass = {
  idle: "bg-transparent text-ink cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover focus-visible:bg-surface-hover",
  active:
    "bg-action-subtle text-ink cursor-pointer [@media(hover:hover)]:hover:bg-action-subtle-hover focus-visible:bg-action-subtle-hover",
  disabled: "bg-transparent text-ink-3 cursor-not-allowed",
};

function focusOption(column: Element | null | undefined, index = 0) {
  const opts = column?.querySelectorAll<HTMLButtonElement>("button:not(:disabled)");
  if (!opts?.length) return;
  opts[Math.max(0, Math.min(index, opts.length - 1))].focus();
}

export function Cascader({
  value: valueProp,
  defaultValue = [],
  placeholder = "Select…",
  disabled,
  options = [],
  notFoundContent = "No options",
  className,
  onChange,
}: CascaderProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(undefined, disabled);

  const [internal, setInternal] = useState<string[]>(defaultValue);
  const [open, setOpen] = useState(false);
  // Level whose first option should take focus once the panel has re-rendered.
  const [pendingLevel, setPendingLevel] = useState<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internal;

  const { columns, labels } = useMemo(() => findPath(options, value), [options, value]);
  const display = labels.length > 0 ? labels.join(" / ") : null;

  const emit = useCallback(
    (next: string[]) => {
      const { labels: nextLabels } = findPath(options, next);
      if (!isControlled) setInternal(next);
      onChange?.(next, nextLabels);
    },
    [isControlled, onChange, options],
  );

  const handleSelect = (level: number, option: CascaderOption) => {
    if (option.disabled) return;
    const next = value.slice(0, level);
    next[level] = option.value;
    emit(next);
    if (!option.children?.length) setOpen(false);
  };

  useEffect(() => {
    if (pendingLevel === null) return;
    focusOption(panelRef.current?.children[pendingLevel]);
    setPendingLevel(null);
  }, [pendingLevel, columns]);

  // Escape, outside press, Tab-out and focus return to the trigger are Radix Popover's job.
  const handlePanelKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const current = document.activeElement as HTMLButtonElement | null;
    const column = current?.closest("[data-column]");
    if (!column) return;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      const siblings = [...column.querySelectorAll<HTMLButtonElement>("button:not(:disabled)")];
      const i = siblings.indexOf(current as HTMLButtonElement);
      focusOption(column, i + (event.key === "ArrowDown" ? 1 : -1));
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      const level = Number(column.getAttribute("data-column"));
      const option = columns[level]?.[Number(current?.dataset.index)];
      if (column.nextElementSibling && value[level] === option?.value) {
        // The focused option is the one that produced the next column.
        focusOption(column.nextElementSibling);
      } else if (option && current?.dataset.branch) {
        // Branch not expanded (or a sibling is): commit it, then focus its column.
        handleSelect(level, option);
        setPendingLevel(level + 1);
      }
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      focusOption(column.previousElementSibling);
    }
  };

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>
        <button
          type="button"
          id={item?.id}
          disabled={isDisabled}
          className={cn(selectTriggerClass, selectTriggerSizeClass[size], "w-full", className)}
          aria-haspopup="listbox"
          aria-describedby={item?.descriptionId}
          aria-invalid={item?.error ? true : undefined}
          title={display ?? undefined}
        >
          <span className={cn("flex-1 min-w-0 truncate", !display && "text-ink-3")}>
            {display ?? placeholder}
          </span>
          <IconChevronDown size={16} stroke={1.75} aria-hidden="true" className="shrink-0 text-ink-3" />
        </button>
      </PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          ref={panelRef}
          role="listbox"
          align="start"
          sideOffset={4}
          collisionPadding={8}
          className="su-popover flex p-0 max-w-[calc(100vw-var(--su-space-4))] overflow-x-auto animate-su-dropdown-in motion-reduce:animate-none"
          onKeyDown={handlePanelKeyDown}
          // Radix would park focus on the panel itself, where the arrow keys have no row to move from.
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            focusOption(panelRef.current?.children[0]);
          }}
        >
          {columns.map((column, level) => (
            <div
              key={level}
              data-column={level}
              className="w-[200px] shrink-0 max-h-[var(--su-dropdown-max-h)] overflow-y-auto overscroll-contain p-su1 border-e border-solid border-border last:border-e-0"
            >
              {column.length === 0 ? (
                <div className="p-su2 text-small text-ink-2 text-start">{notFoundContent}</div>
              ) : (
                column.map((option, index) => {
                  const isActive = value[level] === option.value;
                  const isBranch = Boolean(option.children?.length);
                  return (
                    <button
                      key={option.value}
                      type="button"
                      role="option"
                      tabIndex={-1}
                      data-index={index}
                      data-branch={isBranch ? "true" : undefined}
                      aria-selected={isActive}
                      disabled={option.disabled}
                      className={cn(
                        cascaderOptionClass,
                        cascaderOptionStateClass[
                          option.disabled ? "disabled" : isActive ? "active" : "idle"
                        ],
                      )}
                      onClick={() => handleSelect(level, option)}
                    >
                      <span className="flex-1 min-w-0 truncate">{option.label}</span>
                      {isBranch ? (
                        <IconChevronRight
                          size={14}
                          stroke={1.75}
                          aria-hidden="true"
                          className="shrink-0 text-ink-3 rtl:-scale-x-100"
                        />
                      ) : isActive ? (
                        <IconCheck
                          size={16}
                          stroke={1.75}
                          aria-hidden="true"
                          className="shrink-0 text-action-text"
                        />
                      ) : null}
                    </button>
                  );
                })
              )}
            </div>
          ))}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
