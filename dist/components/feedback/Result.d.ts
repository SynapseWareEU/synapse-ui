import type { HTMLAttributes, ReactNode } from "react";
export type ResultStatus = "success" | "error" | "info" | "warning" | "404" | "403" | "500";
export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    status?: ResultStatus;
    /** 24/32 600, −0.01em. */
    title?: ReactNode;
    /** 14/20 ink-2, at most 420 wide. */
    subTitle?: ReactNode;
    /** Actions, 24 below the text with an 8 gap. */
    extra?: ReactNode;
    /** Replaces the status icon (or the HTTP code). */
    icon?: ReactNode;
}
/**
 * Outcome page (spec §4.4, desk). A centred column at most 480 wide, padded 48 24: a 32 icon in
 * the tone's text colour (or the HTTP code in display 32/40 600 ink-2, sans), the title, the
 * text and the actions.
 */
export declare function Result({ status, title, subTitle, extra, icon, children, className, ...rest }: ResultProps): import("react").JSX.Element;
//# sourceMappingURL=Result.d.ts.map