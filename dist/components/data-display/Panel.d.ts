import { type HTMLAttributes, type ReactNode } from "react";
export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
    /** Section title, 16/24 600. Names the panel (`aria-labelledby`). */
    title?: ReactNode;
    /** Count pill after the title. A number renders the neutral pill; pass a `<Badge>` for a tone. */
    count?: ReactNode;
    /** Actions at the end of the header (28 buttons, 8 apart). */
    extra?: ReactNode;
    /** Note under the body: 44 high, border-top, 13/18 ink-2. */
    footer?: ReactNode;
    /** Body without padding, for tables and lists. Default: padded 16. */
    flush?: boolean;
    /** Class for the body wrapper. */
    bodyClassName?: string;
    children?: ReactNode;
}
/**
 * The white boxed surface on the grey ground: 1px border, radius 8, no shadow. Header 44, body
 * flush or padded 16, optional note footer 44.
 */
export declare function Panel({ title, count, extra, footer, flush, bodyClassName, className, children, "aria-labelledby": labelledBy, ...rest }: PanelProps): import("react").JSX.Element;
//# sourceMappingURL=Panel.d.ts.map