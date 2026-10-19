import type { CSSProperties } from "react";
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
export declare function RingSpinner({ size, className, style }: RingSpinnerProps): import("react").JSX.Element;
//# sourceMappingURL=RingSpinner.d.ts.map