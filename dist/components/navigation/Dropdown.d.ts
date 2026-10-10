import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { type ButtonProps } from "../general/Button";
export type DropdownProps = DropdownMenu.DropdownMenuProps;
export declare function Dropdown(props: DropdownProps): import("react").JSX.Element;
export type DropdownTriggerProps = DropdownMenu.DropdownMenuTriggerProps & Pick<ButtonProps, "variant" | "size" | "icon" | "iconPlacement">;
export declare function DropdownTrigger({ className, asChild, children, variant, size, icon, iconPlacement, ...rest }: DropdownTriggerProps): import("react").JSX.Element;
export type DropdownContentProps = DropdownMenu.DropdownMenuContentProps & {
    /** Portal target (Ant Design's `getPopupContainer`). Defaults to document.body. */
    container?: HTMLElement | null;
};
export declare function DropdownContent({ className, sideOffset, align, collisionPadding, container, forceMount, ...rest }: DropdownContentProps): import("react").JSX.Element;
/**
 * Shared row vocabulary: items, checkbox/radio items and sub-triggers. Public; use it to style
 * a custom row (`<DropdownMenu.Item asChild><a className={dropdownItemClass} /></…>`).
 */
export declare const dropdownItemClass = "relative flex items-center gap-su2 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 rounded-su-tag font-sans text-body text-start outline-none cursor-default select-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [&>svg]:size-[16px] [&>svg]:shrink-0 contrast-more:data-[highlighted]:outline contrast-more:data-[highlighted]:outline-1 contrast-more:data-[highlighted]:outline-offset-[-1px] contrast-more:data-[highlighted]:outline-[var(--su-border-strong)] forced-colors:data-[highlighted]:outline forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-offset-[-2px] forced-colors:data-[highlighted]:outline-[Highlight] data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed [&[data-disabled]>svg]:text-ink-3 text-ink data-[highlighted]:bg-surface-hover [&>svg]:text-ink-2";
export type DropdownItemProps = DropdownMenu.DropdownMenuItemProps & {
    /** Destructive action (delete, revoke) — Ant Design's `items[].danger`. */
    danger?: boolean;
};
export declare function DropdownItem({ className, danger, ...rest }: DropdownItemProps): import("react").JSX.Element;
export type DropdownSeparatorProps = DropdownMenu.DropdownMenuSeparatorProps;
/** Full-bleed hairline: margin 4 −4 cancels the content's 4px padding. */
export declare function DropdownSeparator({ className, ...rest }: DropdownSeparatorProps): import("react").JSX.Element;
export type DropdownLabelProps = DropdownMenu.DropdownMenuLabelProps;
/** Group label: 32 tall, padding 0 8, 13/18 500 ink-2, sentence case. */
export declare function DropdownLabel({ className, ...rest }: DropdownLabelProps): import("react").JSX.Element;
/** Groups items under a DropdownLabel (`role="group"`). */
export type DropdownGroupProps = DropdownMenu.DropdownMenuGroupProps;
export declare function DropdownGroup(props: DropdownGroupProps): import("react").JSX.Element;
export type DropdownSubProps = DropdownMenu.DropdownMenuSubProps;
export declare function DropdownSub(props: DropdownSubProps): import("react").JSX.Element;
export type DropdownSubTriggerProps = DropdownMenu.DropdownMenuSubTriggerProps;
export declare function DropdownSubTrigger({ className, children, ...rest }: DropdownSubTriggerProps): import("react").JSX.Element;
export type DropdownSubContentProps = DropdownMenu.DropdownMenuSubContentProps;
export declare function DropdownSubContent({ className, sideOffset, ...rest }: DropdownSubContentProps): import("react").JSX.Element;
export type DropdownCheckboxItemProps = DropdownMenu.DropdownMenuCheckboxItemProps;
export declare function DropdownCheckboxItem({ className, children, ...rest }: DropdownCheckboxItemProps): import("react").JSX.Element;
export type DropdownRadioGroupProps = DropdownMenu.DropdownMenuRadioGroupProps;
export declare function DropdownRadioGroup(props: DropdownRadioGroupProps): import("react").JSX.Element;
export type DropdownRadioItemProps = DropdownMenu.DropdownMenuRadioItemProps;
export declare function DropdownRadioItem({ className, children, ...rest }: DropdownRadioItemProps): import("react").JSX.Element;
//# sourceMappingURL=Dropdown.d.ts.map