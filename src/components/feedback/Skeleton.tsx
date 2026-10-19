import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  /** Shimmer from fill to surface-2 over 1.4s (static under reduced motion). */
  active?: boolean;
  width?: number | string;
  /**
   * Block height, 12 by default (a text line). Up to 16 it reads as text and rounds to 4;
   * taller blocks are control shapes and round to 6. Table skeleton rows are 40.
   */
  height?: number | string;
  /** A circle sized from `height` (avatars). */
  circle?: boolean;
  rows?: number;
  /** When explicitly `false`, render `children` instead of the placeholder. */
  loading?: boolean;
  /**
   * What a screen reader hears while the placeholder is shown. Default: "Loading". Pass the
   * application's own words, or `null` when the caller announces the state itself: the skeleton
   * is then decoration only (`aria-hidden`, no `status` role, no text in the DOM).
   */
  label?: string | null;
  children?: ReactNode;
}

/** Text lines round to 4 (tag radius), control shapes to 6 (control radius), avatars are circles. */
function radiusFor(height: number | string, circle: boolean) {
  if (circle) return "rounded-su-round";
  return typeof height === "number" && height <= 16 ? "rounded-su-tag" : "rounded-su-control";
}

/** Loading placeholder (spec §4.4): blocks in fill, no borders. */
export function Skeleton({
  active = true,
  width,
  height = 12,
  circle = false,
  rows,
  loading,
  label = "Loading",
  children,
  className,
  style,
  ...rest
}: SkeletonProps) {
  if (loading === false) return <>{children}</>;

  const block = cn("bg-fill", radiusFor(height, circle), active && "su-skeleton-active");
  // Named: a live `status` that says so. Unnamed: hidden, so nothing is announced twice.
  const state =
    label == null
      ? ({ "aria-hidden": true } as const)
      : ({ role: "status", "aria-busy": true } as const);
  const text = label == null ? null : <span className="sr-only">{label}</span>;

  if (rows && rows > 1) {
    return (
      <div
        className={cn("w-full flex flex-col gap-su2", className)}
        style={style}
        {...state}
        {...rest}
      >
        {text}
        {Array.from({ length: rows }).map((_, i) => (
          <div
            key={i}
            aria-hidden="true"
            className={block}
            // ponytail: last row at 70% stands in for per-row widths; take a width array only if a caller needs it
            style={{ width: i === rows - 1 ? "70%" : "100%", height }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(block, className)}
      style={{ width: circle ? height : width, height, ...style }}
      {...state}
      {...rest}
    >
      {text}
    </div>
  );
}
