import type { HTMLAttributes, ReactNode } from "react";
export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
    /** 14/20 ink, one line with ellipsis. Identifiers inside go in mono 0.9em (500 for the subject). */
    title?: ReactNode;
    /** 13/18 ink-2, one line with ellipsis. A row with a description is 48 high; one-line rows are 40. */
    description?: ReactNode;
    /** Trailing content, usually one link (14/20 500). */
    extra?: ReactNode;
    /** Leading content: an 8px `<StatusDot>` in exception lists, or an `<Avatar>`. */
    avatar?: ReactNode;
    /**
     * Clickable row: pointer cursor, surface-hover under a pointer and an inset focus ring (a Panel
     * frame clips anything outside the row).
     * With `onClick` it also becomes a keyboard target (role="button", Enter/Space).
     */
    interactive?: boolean;
    children?: ReactNode;
}
export declare function ListItem({ title, description, extra, avatar, interactive, className, children, onClick, onKeyDown, ...rest }: ListItemProps): import("react").JSX.Element;
export interface ListProps extends HTMLAttributes<HTMLUListElement> {
    /** Framed as a Panel: surface, 1px border, radius 8. */
    bordered?: boolean;
    /** 1px border between rows (none after the last). */
    split?: boolean;
    children?: ReactNode;
}
/**
 * Static list primitive. For the zero-item case render `<Empty description="No results" />`
 * instead of an empty `<List>`; for thousands of rows use `Listy` (virtualized).
 */
export declare function List({ bordered, split, className, children, ...rest }: ListProps): import("react").JSX.Element;
export declare namespace List {
    var Item: typeof ListItem;
}
//# sourceMappingURL=List.d.ts.map