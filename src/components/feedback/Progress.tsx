import * as RadixProgress from "@radix-ui/react-progress";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ProgressProps extends ComponentPropsWithoutRef<
  typeof RadixProgress.Root
> {
  type?: "line" | "circle";
  /**
   * Circle: diameter in px (default 40). Line: bar thickness in px (default 4).
   * ponytail: one raw px number for both types, so a size meant for a circle looks
   * absurd on a line; swap for a named scale ("sm" | "md" | "lg") if that bites.
   */
  size?: number;
  /** `null` = indeterminate (unknown duration). */
  value?: number | null;
  max?: number;
  /** Show the label after the meter (13/18 ink): the percentage, or what `format` returns. */
  showInfo?: boolean;
  /** `normal` → ink · `success` → success · `error` → danger. A full `normal` meter turns success. */
  status?: "normal" | "success" | "error";
  /**
   * Line: the late or blocked portion, in the same units as `value`. Drawn as a danger segment
   * right after the progress, in the same track and with no gap.
   */
  blocked?: number;
  /**
   * Line: split the meter into this many stages (the staged meter, e.g. reserved · picked ·
   * shipped). A completed stage is fully success; the moving stage is a partial ink fill.
   */
  steps?: number;
  /** Line: a 48-wide meter that sits inline in a row, instead of filling its container. */
  inline?: boolean;
  /**
   * Label text; implies `showInfo`. Gets the rounded percentage, the value and the max, e.g.
   * `(_, v, m) => \`${v}/${m}\``. Wrap trailing words in an ink-2 span ("2/3 culese").
   */
  format?: (percent: number, value: number, max: number) => ReactNode;
}

type Status = NonNullable<ProgressProps["status"]>;

const barTone: Record<Status, string> = {
  normal: "bg-ink",
  success: "bg-success",
  error: "bg-danger",
};

const arcTone: Record<Status, string> = {
  normal: "stroke-ink",
  success: "stroke-success",
  error: "stroke-danger",
};

/* Meters are painted with backgrounds, which forced colours would flatten to Canvas; opt out and
   let the tokens (fill → Canvas, ink and the tones → CanvasText) draw them, with an outline for
   the track edge. */
const forcedClass = "forced-colors:[forced-color-adjust:none]";
const trackClass = `overflow-hidden rounded-su-bar bg-fill ${forcedClass} forced-colors:[outline:1px_solid_CanvasText]`;

const labelClass = "shrink-0 text-small text-ink su-tabular whitespace-nowrap";

/* Indeterminate line: a 30% ink bar slides across the track (1.2s) on the `shimmer` keyframe,
   which animates background-position 100% → 0. The gradient image is 230% of the track with the
   bar at 1/2.3–1.3/2.3 of it, so it enters fully off the start edge and leaves fully off the
   end. Under reduced motion it rests at the start (position 1/1.3 = 76.92%). */
const indeterminateBarClass =
  "h-full w-full bg-no-repeat bg-[length:230%_100%] " +
  "bg-[linear-gradient(90deg,transparent_43.48%,var(--su-ink)_43.48%,var(--su-ink)_56.52%,transparent_56.52%)] " +
  "animate-shimmer animate-duration-[1.2s] animate-ease-[var(--su-ease-in-out)] " +
  "motion-reduce:animate-none motion-reduce:bg-[position:76.92%_0]";

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

/**
 * Meter (spec §4.4). Line: a 4px bar with a 2px radius on the fill track; ink progress, success
 * when complete, and an optional danger segment for the late or blocked part. Staged: `steps`
 * segments with a 3px gap. Circle: 40 with a 4px round-capped arc. Give it an `aria-label`
 * sentence ("2 din 3 linii"): the bar alone never carries the meaning.
 */
export function Progress({
  type = "line",
  size,
  value = 0,
  max = 100,
  showInfo = false,
  status = "normal",
  blocked,
  steps,
  inline = false,
  format,
  className,
  ...rest
}: ProgressProps) {
  const safeMax = max > 0 ? max : 100;
  const indeterminate = value == null;
  const safeValue = indeterminate ? null : clamp(value, 0, safeMax);
  const pct = safeValue == null ? 0 : (safeValue / safeMax) * 100;
  const blockedPct = indeterminate || !blocked ? 0 : clamp((blocked / safeMax) * 100, 0, 100 - pct);
  const complete = !indeterminate && pct >= 100;
  const tone: Status = status === "normal" && complete ? "success" : status;
  const showLabel = (showInfo || format !== undefined) && !indeterminate;
  const labelText = format ? format(Math.round(pct), safeValue ?? 0, safeMax) : `${Math.round(pct)}%`;

  if (type === "circle") {
    const diameter = size ?? 40;
    const stroke = 4;
    const c = diameter / 2;
    const r = (diameter - stroke) / 2;
    return (
      <RadixProgress.Root
        className={cn("relative shrink-0", forcedClass, className)}
        value={safeValue}
        max={safeMax}
        style={{ width: diameter, height: diameter }}
        {...rest}
      >
        <svg
          viewBox={`0 0 ${diameter} ${diameter}`}
          width={diameter}
          height={diameter}
          fill="none"
          aria-hidden="true"
          className={
            indeterminate
              ? "animate-spin animate-duration-[1.2s] motion-reduce:animate-none"
              : undefined
          }
        >
          <circle cx={c} cy={c} r={r} strokeWidth={stroke} className="stroke-fill" />
          {indeterminate || pct > 0 ? (
            <circle
              cx={c}
              cy={c}
              r={r}
              strokeWidth={stroke}
              strokeLinecap="round"
              pathLength={100}
              strokeDasharray={indeterminate ? "30 70" : `${pct} 100`}
              transform={`rotate(-90 ${c} ${c})`}
              className={cn(
                arcTone[tone],
                !indeterminate &&
                  "[transition-property:stroke-dasharray] duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)]",
              )}
            />
          ) : null}
        </svg>
        {showLabel ? (
          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center text-small font-semibold text-ink su-tabular"
          >
            {labelText}
          </span>
        ) : null}
      </RadixProgress.Root>
    );
  }

  const height = size ?? 4;
  const stageCount = steps && steps > 1 ? Math.floor(steps) : 0;

  return (
    <div
      className={cn(
        inline ? "inline-flex max-w-full" : "flex w-full",
        "items-center gap-su2 align-middle",
        className,
      )}
    >
      {stageCount ? (
        <RadixProgress.Root
          className={cn("flex gap-[3px]", inline ? "w-[48px] shrink-0" : "flex-1 min-w-0")}
          value={safeValue}
          max={safeMax}
          style={{ height }}
          {...rest}
        >
          {Array.from({ length: stageCount }, (_, i) => {
            // From value and max, not the percentage: (2/3 · 100) / 100 · 3 is 1.999…, which
            // left a finished second stage as a partial ink fill instead of success.
            const fill =
              safeValue == null
                ? 0
                : clamp(Math.round(((safeValue * stageCount) / safeMax - i) * 1e6) / 1e6, 0, 1);
            const done = fill >= 1;
            return (
              <span key={i} className={cn("flex-1 min-w-0 h-full flex", trackClass)}>
                {fill > 0 ? (
                  <span
                    className={cn(
                      "h-full",
                      done && status !== "error" ? "bg-success" : barTone[status],
                    )}
                    style={{ width: `${fill * 100}%` }}
                  />
                ) : null}
              </span>
            );
          })}
        </RadixProgress.Root>
      ) : (
        <RadixProgress.Root
          className={cn("flex", trackClass, inline ? "w-[48px] shrink-0" : "flex-1 min-w-0")}
          value={safeValue}
          max={safeMax}
          style={{ height }}
          {...rest}
        >
          {indeterminate ? (
            <div className={indeterminateBarClass} />
          ) : (
            <>
              <RadixProgress.Indicator
                className={cn(
                  "h-full shrink-0 transition-[width] duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)]",
                  barTone[tone],
                )}
                style={{ width: `${pct}%`, transform: "none" }}
              />
              {blockedPct > 0 ? (
                <div className="h-full shrink-0 bg-danger" style={{ width: `${blockedPct}%` }} />
              ) : null}
            </>
          )}
        </RadixProgress.Root>
      )}
      {showLabel ? (
        <span
          aria-hidden="true"
          className={cn(labelClass, !format && !inline && "min-w-[36px] text-end")}
        >
          {labelText}
        </span>
      ) : null}
    </div>
  );
}
