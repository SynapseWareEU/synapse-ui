import type { CSSProperties } from "react";
import { cn } from "../../utils/cn";

export interface RingSpinnerProps {
  /** Rendered box in px (14, 16, 20 or 24 in v2), or `inherit` to track the font size (1em). Omit to size with `className`. */
  size?: number | "inherit";
  className?: string;
  style?: CSSProperties;
}

/**
 * Ring spinner (v2 §4.4 Spin): a 2px track in the border colour with a quarter arc in
 * `currentColor`, turning at 800ms linear. Under reduced motion it stays a static arc; the
 * caller keeps the text next to it.
 *
 * The strokes are non-scaling, so the ring is 2px at every box size. A host can re-tint the
 * track through `--su-spin-track` (Button's primary does, so the track reads on the action fill).
 *
 * Decorative: `aria-hidden`. The busy announcement belongs to the caller (`aria-busy`,
 * `role="status"`).
 *
 * Internal for now (not in the barrel); Spin and Switch can import it from here.
 */
export function RingSpinner({ size, className, style }: RingSpinnerProps) {
  const px = typeof size === "number" ? size : undefined;
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={cn(
        "block shrink-0 animate-spin motion-reduce:animate-none",
        size === "inherit" && "size-[1em]",
        className,
      )}
      style={{
        animationDuration: "800ms",
        ...(px ? { width: px, height: px } : null),
        ...style,
      }}
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        className="[stroke:var(--su-spin-track,var(--su-border))] forced-colors:[stroke:GrayText]"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
