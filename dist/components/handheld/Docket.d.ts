import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
export interface DocketProps extends HTMLAttributes<HTMLElement> {
    /**
     * `false` (default): a `<ul>` of tappable rows ("tap one to scan it again").
     * `true`: a `<dl>` read-out (the done screen), rows without chevrons.
     */
    readOnly?: boolean;
    /**
     * Draw a hairline above the first row, for a docket that does not sit under the top bar (after
     * a result band, or part-way down the done screen). Default false: the bar's own rule is above.
     */
    topRule?: boolean;
}
/**
 * The answers given so far on a handheld flow, one `DocketRow` each. Name the list with
 * `aria-label` ("Answers given. Tap one to scan it again."). Full bleed: rows carry their own
 * 16 inset and bottom hairline; pass `topRule` when it does not sit under the top bar.
 */
export declare function Docket({ readOnly, topRule, className, children, ...rest }: DocketProps): import("react").JSX.Element;
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
    /**
     * Never cut the answer. The value and the `sub` line wrap, breaking inside an identifier that
     * has no word to break at (an SSCC, a 50-character bin, a lot), and the row grows from its 56 /
     * 64 with 12 / 5 above and below instead of keeping a fixed height. Default: one line each,
     * ending in an ellipsis. A row whose value fits on one line is the same height either way.
     */
    wrap?: boolean;
    /**
     * Props for the element that holds the value alone (`data-testid`, `id`, `title`): the `<dd>`
     * of a read-only row, the value's `<span>` of a tappable one.
     */
    valueProps?: DocketRowValueAttributes;
}
/** Attributes for the value element, handed over as an object, so `data-*` is spelled out. */
export type DocketRowValueAttributes = HTMLAttributes<HTMLElement> & {
    [key: `data-${string}`]: string | number | boolean | undefined;
};
/**
 * Docket row (spec §4.7): one-line 56, two-line 64 (grid rows 30 + 22), padding 0 16,
 * `grid: auto 1fr 18px` with a 12 gap, bottom hairline, chevron 18 ink-3.
 * Tappable rows are buttons (inside a `Docket`, each sits in an `<li>`); read-only rows are
 * `<dt>`/`<dd>` pairs 56 tall with no chevron. The other props (`data-testid`, `id`, `aria-*`)
 * reach the button, or the row's own `<div>` when it is read-only.
 */
export declare function DocketRow({ label, value, sub, mono, readOnly: readOnlyProp, wrap, valueProps, className, disabled, type, ...rest }: DocketRowProps): import("react").JSX.Element;
//# sourceMappingURL=Docket.d.ts.map