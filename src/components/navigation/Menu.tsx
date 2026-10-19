import type { ComponentPropsWithRef, CSSProperties, MouseEvent, ReactNode } from "react";
import { useEffect, useState } from "react";
import * as Collapsible from "@radix-ui/react-collapsible";
import { IconChevronDown } from "@tabler/icons-react";
import { Icon } from "../general/Icon";
import { cn } from "../../utils/cn";

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
  /** Name of the navigation landmark. Default "Menu"; pass the application's words. */
  "aria-label"?: string;
}

/** Nesting indent: 12 per level on top of the row's own start padding. */
const indent: Record<MenuVariant, string> = {
  page: "ps-[calc(var(--su-space-3)+var(--su-menu-depth)*var(--su-space-3))] pe-su3",
  panel: "ps-[calc(var(--su-space-2)+var(--su-menu-depth)*var(--su-space-3))] pe-su2",
};

/**
 * Geometry only. Colour comes from exactly one branch in `rowClass`: `cn()` is a plain join
 * and UnoCSS decides which of two same-specificity utilities wins, so nothing here is an
 * override of something else.
 */
const rowBase: Record<MenuVariant, string> = {
  page:
    "min-h-[var(--su-control-md)] [@media(hover:none)]:min-h-[var(--su-hit-target)] rounded-su-control font-medium",
  panel:
    "min-h-[var(--su-row)] [@media(hover:none)]:min-h-[var(--su-hit-target)] rounded-su-tag font-normal",
};

const rowShared =
  "group relative flex items-center gap-su2 w-full m-0 font-sans text-body text-start no-underline cursor-pointer su-focus-ring " +
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none " +
  "disabled:cursor-not-allowed";

/**
 * One tone per state. Disabled rows get no hover at all (a disabled item renders as a
 * `<button disabled>`, never as a link), so no `:enabled` guards are needed.
 */
function rowClass(
  variant: MenuVariant,
  opts: { selected?: boolean; danger?: boolean; trail?: boolean; disabled?: boolean },
) {
  const tone = opts.disabled
    ? "bg-transparent text-ink-3"
    : opts.selected
      ? "bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover forced-colors:outline forced-colors:outline-2 forced-colors:outline-offset-[-2px] forced-colors:outline-[Highlight]"
      : cn(
          "bg-transparent [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:none)]:active:bg-surface-hover",
          opts.danger ? "text-danger-text" : opts.trail ? "text-action-text" : "text-ink",
        );
  return cn(rowShared, rowBase[variant], indent[variant], tone);
}

/** Leading icon: 16, ink-2 at rest, action on the current row, inherits on danger/disabled. */
function iconTone(opts: { selected?: boolean; danger?: boolean; disabled?: boolean }) {
  if (opts.disabled || opts.danger) return "text-current";
  return opts.selected ? "text-action-text" : "text-ink-2";
}

/** Group / section label: 32 tall, 13/18 500 ink-2, sentence case, on the rows' start line. */
const groupLabelClass = "su-label flex items-center min-h-[var(--su-row-overlay)]";

interface MenuListProps {
  items: MenuItem[];
  selectedKey?: string;
  depth: number;
  variant: MenuVariant;
  onSelect?: (key: string, event: MouseEvent) => void;
  className?: string;
}

function containsKey(items: MenuItem[], key?: string): boolean {
  if (!key) return false;
  return items.some(
    (item) => item.key === key || containsKey(item.children ?? [], key),
  );
}

const present = (node: ReactNode) => node !== undefined && node !== null && node !== false;

function itemContent(
  item: MenuItem,
  variant: MenuVariant,
  state: { selected?: boolean; disabled?: boolean },
) {
  const hasCount = present(item.count);
  return (
    <>
      {item.icon && (
        <Icon size="md" className={cn("shrink-0", iconTone({ ...state, danger: item.danger }))}>
          {item.icon}
        </Icon>
      )}
      <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
        {item.label}
      </span>
      {present(item.exception) ? (
        <span className="shrink-0 whitespace-nowrap text-small font-medium text-danger-text">
          {item.exception}
        </span>
      ) : null}
      {hasCount || variant === "panel" ? (
        <span
          className={cn(
            "shrink-0 whitespace-nowrap text-small font-normal su-tabular",
            variant === "panel" && "w-[40px] text-end",
            state.selected ? "text-action-text" : state.disabled ? "text-ink-3" : "text-ink-2",
            // The panel keeps the 40px column on every row so counts line up; an empty one is inert.
            !hasCount && "invisible",
          )}
          aria-hidden={hasCount ? undefined : true}
        >
          {item.count}
        </span>
      ) : null}
    </>
  );
}

function titleOf(item: MenuItem) {
  return item.title ?? (typeof item.label === "string" ? item.label : undefined);
}

/**
 * Open state is controlled-with-a-default so a `selectedKey` that lands on a descendant
 * after mount (route change, deep link) opens the branch instead of hiding the selection.
 */
function MenuBranch({
  item,
  selectedKey,
  depth,
  variant,
  onSelect,
}: Omit<MenuListProps, "items" | "className"> & { item: MenuItem }) {
  const contains = containsKey(item.children ?? [], selectedKey) && !item.disabled;
  const [open, setOpen] = useState(contains);

  useEffect(() => {
    if (contains) setOpen(true);
  }, [contains]);

  return (
    <Collapsible.Root open={open} onOpenChange={setOpen} disabled={item.disabled}>
      <Collapsible.Trigger
        className={rowClass(variant, {
          trail: contains && !open,
          danger: item.danger,
          disabled: item.disabled,
        })}
        title={titleOf(item)}
      >
        {itemContent(item, variant, { disabled: item.disabled })}
        <Icon
          size="md"
          className="shrink-0 text-ink-3 transition-transform duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)] motion-reduce:transition-none group-data-[state=open]:rotate-180"
        >
          <IconChevronDown />
        </Icon>
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-su-collapse-down data-[state=closed]:animate-su-collapse-up motion-reduce:animate-none">
        <MenuList
          items={item.children ?? []}
          selectedKey={selectedKey}
          depth={depth + 1}
          variant={variant}
          onSelect={onSelect}
          className={variant === "page" ? "pt-[2px]" : undefined}
        />
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

function MenuList({ items, selectedKey, depth, variant, onSelect, className }: MenuListProps) {
  // The custom property inherits, so one declaration per list covers every row in it.
  const depthVar = { "--su-menu-depth": depth } as CSSProperties;

  return (
    <ul
      className={cn(
        "flex flex-col m-0 p-0 list-none",
        variant === "page" && "gap-[2px]",
        className,
      )}
      style={depthVar}
    >
      {items.map((item) => {
        if (item.type === "divider") {
          return (
            <li key={item.key} role="separator" className="h-px my-su1 su-rule" />
          );
        }

        if (item.type === "group") {
          return (
            <li key={item.key}>
              <span className={cn(groupLabelClass, indent[variant])}>{item.label}</span>
              {item.children?.length ? (
                <MenuList
                  items={item.children}
                  selectedKey={selectedKey}
                  depth={depth}
                  variant={variant}
                  onSelect={onSelect}
                />
              ) : null}
            </li>
          );
        }

        if (item.children?.length) {
          return (
            <li key={item.key}>
              <MenuBranch
                item={item}
                selectedKey={selectedKey}
                depth={depth}
                variant={variant}
                onSelect={onSelect}
              />
            </li>
          );
        }

        const isSelected = selectedKey === item.key && !item.disabled;
        const rowCls = rowClass(variant, {
          selected: isSelected,
          danger: item.danger,
          disabled: item.disabled,
        });
        const content = itemContent(item, variant, {
          selected: isSelected,
          disabled: item.disabled,
        });

        return (
          <li key={item.key}>
            {item.href && !item.disabled ? (
              <a
                href={item.href}
                className={rowCls}
                title={titleOf(item)}
                aria-current={isSelected ? "page" : undefined}
                onClick={(event) => onSelect?.(item.key, event)}
              >
                {content}
              </a>
            ) : (
              <button
                type="button"
                disabled={item.disabled}
                className={rowCls}
                title={titleOf(item)}
                aria-current={isSelected ? "true" : undefined}
                onClick={(event) => onSelect?.(item.key, event)}
              >
                {content}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}

/**
 * Navigation list. The page nav has no box of its own: it sits on the ground (or in a panel)
 * and the current row is the only fill. The panel variant is the rail's section flyout.
 */
export function Menu({
  items,
  selectedKey,
  onSelect,
  variant = "page",
  className,
  "aria-label": ariaLabel = "Menu",
  ...rest
}: MenuProps) {
  if (!items.length) return null;

  return (
    <nav
      className={cn(
        "font-sans text-ink",
        variant === "panel" && "su-popover w-[288px] max-w-full p-su2",
        className,
      )}
      aria-label={ariaLabel}
      {...rest}
    >
      <MenuList
        items={items}
        selectedKey={selectedKey}
        depth={0}
        variant={variant}
        onSelect={onSelect}
      />
    </nav>
  );
}
