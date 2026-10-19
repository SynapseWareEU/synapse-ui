import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
export interface HandheldTopBarProps extends HTMLAttributes<HTMLElement> {
    /** Flow name, 20/26 600 ("Recepție"). Omit it to render the 56 bar alone. */
    flow?: ReactNode;
    /**
     * Element the flow name is rendered as. Default `span`. Pass `h1` on a flow screen, where the
     * bar holds the page's only title, so the page keeps a heading.
     */
    flowAs?: "span" | "h1" | "h2" | "h3";
    /** Current step, 1-based. */
    step?: number;
    /** Number of steps. The counter and the segments show only when this is above 0 (not on the menu screen). */
    total?: number;
    /** Counter text. Default: `Step {step} of {total}` (Romanian screens pass "Pasul N din M"). */
    stepLabel?: (step: number, total: number) => ReactNode;
    /** Shows the back button (chevron + `backLabel`). */
    onBack?: MouseEventHandler<HTMLElement>;
    /** Renders the back control as a link instead of a button. */
    backHref?: string;
    /** Visible back text, 17/24 ink. Default "Menu". */
    backLabel?: ReactNode;
    /** Accessible name when the visible text is not enough ("Back to menu"). */
    backAriaLabel?: string;
    /**
     * Disables the back button (a write is in flight): it stays in place, in ink-3. With `backHref`
     * the control is drawn as a disabled button, since a link cannot be disabled.
     */
    backDisabled?: boolean;
    /** Shown instead of the back control (the menu screen): 17/24 600, e.g. "Terminal". */
    brand?: ReactNode;
    /** 22px mark before `brand`. */
    brandIcon?: ReactNode;
    /** Site code, mono 15/20 500 ink-2 ("RO_BUC_01"). */
    site?: ReactNode;
    /** Operator, 13/18 ink-2 ("Ioana P."). */
    user?: ReactNode;
    /** Makes the site/user block a 48 button (session menu). */
    onSessionClick?: MouseEventHandler<HTMLButtonElement>;
    /** Accessible name of the session button ("Session: RO_BUC_01, Ioana P."). Used with `onSessionClick`. */
    sessionAriaLabel?: string;
    /** Disables the session button (a write is in flight): it stays in place, in ink-3. */
    sessionDisabled?: boolean;
}
/**
 * Handheld top bar (`V2HHTop`, 390 × 112): a 56 bar (back or brand, then the session block) over
 * a 55 title row with the flow name, "Step N of M" and the step segments.
 * The segments are decorative (`aria-hidden`); the counter text carries the step for assistive tech.
 */
export declare function HandheldTopBar({ flow, flowAs: FlowTag, step, total, stepLabel, onBack, backHref, backLabel, backAriaLabel, backDisabled, brand, brandIcon, site, user, onSessionClick, sessionAriaLabel, sessionDisabled, className, ...rest }: HandheldTopBarProps): import("react").JSX.Element;
//# sourceMappingURL=HandheldTopBar.d.ts.map