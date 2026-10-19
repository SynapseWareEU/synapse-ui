import type { HTMLAttributes, ReactNode } from "react";
export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Icon above the text (24, ink-3). Defaults to an inbox glyph; `false` hides it. No illustrations. */
    image?: ReactNode;
    /** Title, 15/22 600 ("No open counts"). */
    title?: ReactNode;
    /** Text, 14/20 ink-2, at most 420 wide. Defaults to "No data" when there is no title. */
    description?: ReactNode;
    /** Inside lists and menus: one 13/18 ink-2 line, padding 8, no icon. */
    compact?: boolean;
    /** At most one secondary button. */
    children?: ReactNode;
}
export declare function Empty({ image, title, description, compact, className, children, ...rest }: EmptyProps): import("react").JSX.Element;
//# sourceMappingURL=Empty.d.ts.map