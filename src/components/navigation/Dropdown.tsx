import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { useConfig } from "../../ConfigProvider";
import { Button, type ButtonProps } from "../general/Button";

export type DropdownProps = DropdownMenu.DropdownMenuProps;

export function Dropdown(props: DropdownProps) {
  const { direction } = useConfig();
  // Radix reads direction from its own `dir` prop / DirectionProvider, and the
  // portaled panel lives outside ConfigProvider's wrapper — so feed it here.
  return <DropdownMenu.Root dir={direction} {...props} />;
}

export type DropdownTriggerProps = DropdownMenu.DropdownMenuTriggerProps &
  Pick<ButtonProps, "variant" | "size" | "icon" | "iconPlacement">;

/**
 * Open state = the trigger's own hover look, held while the menu is open: surface-2 for a
 * secondary button, fill for a ghost or icon button, action-hover for a primary.
 * With `asChild`, `variant` only picks this look (the child renders itself); it defaults to
 * the ghost/icon-button look, the usual row "⋯" trigger.
 */
const triggerOpenClass: Record<string, string> = {
  default: "data-[state=open]:bg-surface-2",
  secondary: "data-[state=open]:bg-surface-2",
  dashed: "data-[state=open]:bg-surface-2 data-[state=open]:text-ink",
  ghost: "data-[state=open]:bg-fill data-[state=open]:text-ink",
  primary: "data-[state=open]:bg-action-hover",
  text: "data-[state=open]:text-action-text-hover data-[state=open]:underline",
};

export function DropdownTrigger({
  className,
  asChild,
  children,
  variant,
  size,
  icon,
  iconPlacement,
  ...rest
}: DropdownTriggerProps) {
  if (asChild) {
    return (
      <DropdownMenu.Trigger
        asChild
        className={cn(triggerOpenClass[variant ?? "ghost"] ?? triggerOpenClass.ghost, className)}
        {...rest}
      >
        {children}
      </DropdownMenu.Trigger>
    );
  }

  return (
    <DropdownMenu.Trigger asChild>
      <Button
        variant={variant}
        size={size}
        icon={icon}
        iconPlacement={iconPlacement}
        className={cn(
          triggerOpenClass[variant ?? "default"] ?? triggerOpenClass.default,
          className,
        )}
        {...rest}
      >
        {children}
      </Button>
    </DropdownMenu.Trigger>
  );
}

/*
 * Popover surface: the shared `su-popover` skin (radius 8, hairline, overlay shadow, padding 4),
 * at least 220 wide or the trigger's width. Fade + 4px drop in 150ms; none under reduced motion.
 */
const contentClass =
  "su-popover " +
  "min-w-[max(var(--su-menu-width),var(--radix-dropdown-menu-trigger-width,0px))] max-w-[min(calc(100vw-var(--su-space-4)),320px)] " +
  "max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto overscroll-contain " +
  "origin-[var(--radix-dropdown-menu-content-transform-origin)] animate-su-dropdown-in motion-reduce:animate-none";

export type DropdownContentProps = DropdownMenu.DropdownMenuContentProps & {
  /** Portal target (Ant Design's `getPopupContainer`). Defaults to document.body. */
  container?: HTMLElement | null;
};

export function DropdownContent({
  className,
  sideOffset = 4,
  align = "start",
  collisionPadding = 8,
  container,
  forceMount,
  ...rest
}: DropdownContentProps) {
  return (
    <DropdownMenu.Portal container={container} forceMount={forceMount}>
      <DropdownMenu.Content
        sideOffset={sideOffset}
        align={align}
        collisionPadding={collisionPadding}
        forceMount={forceMount}
        className={cn(contentClass, className)}
        {...rest}
      />
    </DropdownMenu.Portal>
  );
}

/**
 * Row geometry shared by every item kind, without colour: 32 tall (44 on touch screens),
 * padding 0 8, radius 4, 14/20, gap 8, bare 16px icons. Radix moves focus onto the highlighted
 * row (roving focus), so the highlight fill replaces the outline; forced-colors mode gets an
 * outline back because the fill is flattened there.
 */
const itemBaseClass =
  "relative flex items-center gap-su2 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] " +
  "px-su2 rounded-su-tag font-sans text-body text-start outline-none cursor-default select-none " +
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none " +
  "[&>svg]:size-[16px] [&>svg]:shrink-0 " +
  "contrast-more:data-[highlighted]:outline contrast-more:data-[highlighted]:outline-1 contrast-more:data-[highlighted]:outline-offset-[-1px] contrast-more:data-[highlighted]:outline-[var(--su-border-strong)] " +
  "forced-colors:data-[highlighted]:outline forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-offset-[-2px] forced-colors:data-[highlighted]:outline-[Highlight] " +
  "data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed [&[data-disabled]>svg]:text-ink-3";

/** One colour per branch: `cn()` is a plain join, so the danger row never layers over this one. */
const neutralItemClass = "text-ink data-[highlighted]:bg-surface-hover [&>svg]:text-ink-2";

/** Destructive row: danger-text, highlighted on danger-tint. Put it last, after a separator. */
const dangerItemClass = "text-danger-text data-[highlighted]:bg-danger-tint";

/**
 * Shared row vocabulary: items, checkbox/radio items and sub-triggers. Public; use it to style
 * a custom row (`<DropdownMenu.Item asChild><a className={dropdownItemClass} /></…>`).
 */
export const dropdownItemClass = `${itemBaseClass} ${neutralItemClass}`;

export type DropdownItemProps = DropdownMenu.DropdownMenuItemProps & {
  /** Destructive action (delete, revoke) — Ant Design's `items[].danger`. */
  danger?: boolean;
};

export function DropdownItem({ className, danger, ...rest }: DropdownItemProps) {
  return (
    <DropdownMenu.Item
      className={cn(itemBaseClass, danger ? dangerItemClass : neutralItemClass, className)}
      {...rest}
    />
  );
}

export type DropdownSeparatorProps = DropdownMenu.DropdownMenuSeparatorProps;

/** Full-bleed hairline: margin 4 −4 cancels the content's 4px padding. */
export function DropdownSeparator({ className, ...rest }: DropdownSeparatorProps) {
  return (
    <DropdownMenu.Separator
      className={cn("h-px my-su1 -mx-su1 su-rule", className)}
      {...rest}
    />
  );
}

export type DropdownLabelProps = DropdownMenu.DropdownMenuLabelProps;

/** Group label: 32 tall, padding 0 8, 13/18 500 ink-2, sentence case. */
export function DropdownLabel({ className, ...rest }: DropdownLabelProps) {
  return (
    <DropdownMenu.Label
      className={cn(
        "su-label flex items-center min-h-[var(--su-row-overlay)] px-su2",
        className,
      )}
      {...rest}
    />
  );
}

/** Groups items under a DropdownLabel (`role="group"`). */
export type DropdownGroupProps = DropdownMenu.DropdownMenuGroupProps;

export function DropdownGroup(props: DropdownGroupProps) {
  return <DropdownMenu.Group {...props} />;
}

export type DropdownSubProps = DropdownMenu.DropdownMenuSubProps;

export function DropdownSub(props: DropdownSubProps) {
  return <DropdownMenu.Sub {...props} />;
}

export type DropdownSubTriggerProps = DropdownMenu.DropdownMenuSubTriggerProps;

export function DropdownSubTrigger({
  className,
  children,
  ...rest
}: DropdownSubTriggerProps) {
  return (
    <DropdownMenu.SubTrigger
      className={cn(dropdownItemClass, "data-[state=open]:bg-surface-hover", className)}
      {...rest}
    >
      {children}
      <span
        aria-hidden="true"
        className="ms-auto flex shrink-0 text-ink-3 rtl:-scale-x-100"
      >
        <IconChevronRight size={16} stroke={1.75} />
      </span>
    </DropdownMenu.SubTrigger>
  );
}

export type DropdownSubContentProps = DropdownMenu.DropdownMenuSubContentProps;

export function DropdownSubContent({
  className,
  sideOffset = 4,
  ...rest
}: DropdownSubContentProps) {
  return (
    <DropdownMenu.Portal>
      <DropdownMenu.SubContent
        sideOffset={sideOffset}
        className={cn(contentClass, className)}
        {...rest}
      />
    </DropdownMenu.Portal>
  );
}

/*
 * The 16px controls, drawn in the row (Radix renders ItemIndicator only while checked, so the
 * empty box lives outside it). Unchecked: surface + 1px border-control (3:1). Checked: action
 * fill with a white mark. The row's `data-state` drives both.
 */
const controlBoxClass =
  "relative inline-flex shrink-0 items-center justify-center size-[16px] border border-solid border-border-control bg-surface text-on-action " +
  "[[data-state=checked]>&]:bg-action [[data-state=checked]>&]:border-action " +
  "[[data-state=indeterminate]>&]:bg-action [[data-state=indeterminate]>&]:border-action " +
  "[[data-disabled]>&]:bg-fill [[data-disabled]>&]:border-border " +
  "[[data-disabled][data-state=checked]>&]:bg-border-strong [[data-disabled][data-state=checked]>&]:border-border-strong " +
  "[[data-disabled][data-state=indeterminate]>&]:bg-border-strong [[data-disabled][data-state=indeterminate]>&]:border-border-strong";

export type DropdownCheckboxItemProps =
  DropdownMenu.DropdownMenuCheckboxItemProps;

export function DropdownCheckboxItem({
  className,
  children,
  ...rest
}: DropdownCheckboxItemProps) {
  return (
    <DropdownMenu.CheckboxItem className={cn(dropdownItemClass, className)} {...rest}>
      <span aria-hidden="true" className={cn(controlBoxClass, "rounded-su-tag")}>
        <DropdownMenu.ItemIndicator className="flex">
          {rest.checked === "indeterminate" ? (
            <span className="block w-[8px] h-[2px] rounded-[1px] bg-current" />
          ) : (
            <IconCheck size={12} stroke={3} />
          )}
        </DropdownMenu.ItemIndicator>
      </span>
      {children}
    </DropdownMenu.CheckboxItem>
  );
}

export type DropdownRadioGroupProps = DropdownMenu.DropdownMenuRadioGroupProps;

export function DropdownRadioGroup(props: DropdownRadioGroupProps) {
  return <DropdownMenu.RadioGroup {...props} />;
}

export type DropdownRadioItemProps = DropdownMenu.DropdownMenuRadioItemProps;

export function DropdownRadioItem({
  className,
  children,
  ...rest
}: DropdownRadioItemProps) {
  return (
    <DropdownMenu.RadioItem className={cn(dropdownItemClass, className)} {...rest}>
      <span aria-hidden="true" className={cn(controlBoxClass, "rounded-su-round")}>
        <DropdownMenu.ItemIndicator className="block size-[6px] rounded-su-round bg-current" />
      </span>
      {children}
    </DropdownMenu.RadioItem>
  );
}
