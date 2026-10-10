import type { HTMLAttributes } from "react";
export type StatusDotTone = "neutral" | "info" | "success" | "warning" | "danger";
export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
    /** The tone's solid colour. Default `neutral`. */
    tone?: StatusDotTone;
    /** Not started yet: an empty ring (1.5px ink-3) instead of a filled dot. */
    pending?: boolean;
    /** 8 (default: status dots, group rows, exception lists) or 6 (inside tags and table meta lines). */
    size?: 6 | 8;
    /**
     * Accessible name (renders `role="img"`). Without it the dot is decorative. Warning and success
     * solids are below 3:1, so a warning or success dot needs a text neighbour or this label.
     */
    label?: string;
}
export declare const statusDotToneClass: Record<StatusDotTone, string>;
/** 8px dot in a tone's solid colour. Colour is never the only signal: pair it with a word. */
export declare function StatusDot({ tone, pending, size, label, className, ...rest }: StatusDotProps): import("react").JSX.Element;
//# sourceMappingURL=StatusDot.d.ts.map