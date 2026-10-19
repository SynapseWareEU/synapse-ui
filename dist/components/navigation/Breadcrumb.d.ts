import type { HTMLAttributes, Key, MouseEventHandler, ReactNode } from "react";
export interface BreadcrumbItem {
    label: ReactNode;
    href?: string;
    /** Stable key; falls back to the array index. */
    key?: Key;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
}
/**
 * `"trail"` (default): every ancestor, chevron-separated, ending on the current page.
 * `"back"`: only a back link to the parent (the item before the last, or the only item),
 * drawn as "← Parent" 4 above a page title.
 */
export type BreadcrumbVariant = "trail" | "back";
export interface BreadcrumbProps extends Omit<HTMLAttributes<HTMLElement>, "children"> {
    items: BreadcrumbItem[];
    /** Between items. Default: a 14px chevron in ink-3. */
    separator?: ReactNode;
    variant?: BreadcrumbVariant;
}
export declare function Breadcrumb({ items, separator, variant, className, ...rest }: BreadcrumbProps): import("react").JSX.Element | null;
//# sourceMappingURL=Breadcrumb.d.ts.map