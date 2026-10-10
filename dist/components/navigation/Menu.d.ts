import type { ComponentPropsWithRef, MouseEvent, ReactNode } from "react";
export interface MenuItem {
    key: string;
    /** Omit only on `type: "divider"`. */
    label?: ReactNode;
    /** `"item"` (default) · `"group"` — a section label whose children sit at the same depth · `"divider"` — a hairline. */
    type?: "item" | "group" | "divider";
    icon?: ReactNode;
    disabled?: boolean;
    href?: string;
    danger?: boolean;
    /** Native tooltip for a truncated label. Defaults to `label` when it is a string. */
    title?: string;
    /** Count at the end of the row (13/18 ink-2, tabular; action-text on the current row). */
    count?: ReactNode;
    /**
     * Exception text before the count (13/18 500 danger-text), e.g. "1 blocată". Section panels
     * only show it when something is actually waiting; leave it unset otherwise.
     */
    exception?: ReactNode;
    children?: MenuItem[];
}
/**
 * `"page"` (default): page nav on the ground. Rows 36, padding 0 12, radius 6, 14/20 500, 2 apart.
 * `"panel"`: the section panel that opens from the app rail. A 288-wide `su-popover` with padding 8,
 * rows 40, padding 0 8, radius 4, 14/20 400, and a fixed 40px count column. The panel only draws
 * the surface: place it (8 right of the rail, top-aligned with its glyph) in the app.
 */
export type MenuVariant = "page" | "panel";
export interface MenuProps extends Omit<ComponentPropsWithRef<"nav">, "onSelect"> {
    items: MenuItem[];
    selectedKey?: string;
    /** `event` is the row's click — call `preventDefault()` to keep an `href` item on the page (router navigation). */
    onSelect?: (key: string, event: MouseEvent) => void;
    variant?: MenuVariant;
}
/**
 * Navigation list. The page nav has no box of its own: it sits on the ground (or in a panel)
 * and the current row is the only fill. The panel variant is the rail's section flyout.
 */
export declare function Menu({ items, selectedKey, onSelect, variant, className, ...rest }: MenuProps): import("react").JSX.Element | null;
//# sourceMappingURL=Menu.d.ts.map