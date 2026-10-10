import type { HTMLAttributes, ReactNode } from "react";
export type ResultBandTone = "success" | "danger";
export interface ResultBandProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** `success`: success-strong, `role="status"`. `danger`: danger-strong, `role="alert"`. Default success. */
    tone?: ResultBandTone;
    /** 22/28 600 ("Accepted", "Refused"). */
    title: ReactNode;
    /**
     * The sound and vibration the terminal just made, 13/18 600 with a speaker icon, pushed right
     * ("1 beep · short vibration"). Pair every band with one, so the result never rests on colour alone.
     */
    signal?: ReactNode;
    /** Replaces the check / cross (24). `null` hides it. */
    icon?: ReactNode | null;
    /** What to do next, the last line in 600 ("Scan the shelf label, not the pallet's."). */
    instruction?: ReactNode;
    /** Detail line(s), 17/22. Identifiers go in `<code>`: mono 0.9em 600. */
    children?: ReactNode;
}
/**
 * Result band (spec §4.7): full-width answer to the scan just read, readable across the aisle.
 * Padding 16, gap 6; a 28 title row (icon + title, signal pushed right), then 17/22 lines.
 * 88 tall with one line (success), 110 with two (danger); the title and the lines wrap, so a
 * longer answer grows the band instead of being cut. The band colours are fixed in both themes;
 * the text is `on-action` white.
 */
export declare function ResultBand({ tone, title, signal, icon, instruction, children, className, role, ...rest }: ResultBandProps): import("react").JSX.Element;
//# sourceMappingURL=ResultBand.d.ts.map