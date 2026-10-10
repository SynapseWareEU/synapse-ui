import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
export interface DocketProps extends HTMLAttributes<HTMLElement> {
    /**
     * `false` (default): a `<ul>` of tappable rows ("tap one to scan it again").
     * `true`: a `<dl>` read-out (the done screen), rows without chevrons.
     */
    readOnly?: boolean;
}
/**
 * The answers given so far on a handheld flow, one `DocketRow` each. Name the list with
 * `aria-label` ("Answers given. Tap one to scan it again."). Full bleed: rows carry their own
 * 16 inset and bottom hairline; add `border-t` when it does not sit under the top bar.
 */
export declare function Docket({ readOnly, className, children, ...rest }: DocketProps): import("react").JSX.Element;
export interface DocketRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
    /** The key, 18/24 500 ink-2 ("Location"). */
    label: ReactNode;
    /** The answer, 24/30 600 ink, right-aligned with an ellipsis. Mono unless `mono={false}`. */
    value: ReactNode;
    /** Second line, 17/22 ink-2, right-aligned ("Bandage roll 10cm"). Makes the row 64 tall. */
    sub?: ReactNode;
    /** Identifier value (SKU, bin, PO) in mono. Set `false` for a number with its unit ("20 buc"). Default true. */
    mono?: boolean;
    /** Read-only row (`<dt>`/`<dd>`, no chevron). Defaults to the enclosing `Docket`'s `readOnly`. */
    readOnly?: boolean;
}
/**
 * Docket row (spec §4.7): one-line 56, two-line 64 (grid rows 30 + 22), padding 0 16,
 * `grid: auto 1fr 18px` with a 12 gap, bottom hairline, chevron 18 ink-3.
 * Tappable rows are buttons (inside a `Docket`, each sits in an `<li>`); read-only rows are
 * `<dt>`/`<dd>` pairs 56 tall with no chevron.
 */
export declare function DocketRow({ label, value, sub, mono, readOnly: readOnlyProp, className, disabled, type, ...rest }: DocketRowProps): import("react").JSX.Element;
//# sourceMappingURL=Docket.d.ts.map