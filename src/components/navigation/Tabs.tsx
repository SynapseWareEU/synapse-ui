import * as TabsPrimitive from "@radix-ui/react-tabs";
import type { ReactNode } from "react";
import { useConfig } from "../../ConfigProvider";
import { cn } from "../../utils/cn";

export type TabsProps = TabsPrimitive.TabsProps;

export function Tabs({ className, dir, ...rest }: TabsProps) {
  const { direction } = useConfig();
  return (
    <TabsPrimitive.Root
      dir={dir ?? direction}
      className={cn(
        "font-sans data-[orientation=vertical]:(flex items-start gap-su6)",
        className,
      )}
      {...rest}
    />
  );
}

export interface TabsListProps extends TabsPrimitive.TabsListProps {
  /** Actions aligned to the end of the tab row. Rendered outside `role="tablist"`. */
  extra?: ReactNode;
}

// The scroller clips on both axes (overflow-x: auto forces overflow-y too) and a tab has no
// padding, so a 2px ring at a 2px offset would be cut on every side. `p/-m` buys it 5px of
// room without moving the row.
const listScrollClass =
  "min-w-0 flex-1 overflow-x-auto p-[5px] -m-[5px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export function TabsList({ className, extra, ...rest }: TabsListProps) {
  return (
    <div className="flex max-w-full items-stretch">
      <div className={listScrollClass}>
        <TabsPrimitive.List
          className={cn(
            // 40 tall (each trigger pulls 1px down over the hairline), 24 between tabs.
            "flex w-max min-w-full gap-su6 border-b border-b-solid border-b-border",
            // Vertical: page-nav rows (as in Menu), 2 apart, no rule.
            "data-[orientation=vertical]:(w-auto min-w-0 flex-col gap-[2px] border-b-0)",
            className,
          )}
          {...rest}
        />
      </div>
      {extra ? (
        <div className="shrink-0 self-center ps-su4">{extra}</div>
      ) : null}
    </div>
  );
}

export interface TabsTriggerProps extends TabsPrimitive.TabsTriggerProps {
  /**
   * Count pill after the label (18 tall, 12/16 500 sans, tabular). Neutral at rest,
   * action-subtle while its tab is selected. Omit it for no pill; `0` renders "0".
   */
  count?: ReactNode;
  /** `"danger"` keeps the pill red in every state, for counts that are alerts (late, blocked). */
  countVariant?: "neutral" | "danger";
}

/**
 * Horizontal tab: 40 tall, no padding, 14/20 500 in every state (the weight never changes, so
 * nothing shifts), and a static 2px action underline on the selected tab. The others carry a
 * transparent 2px border so every label sits on the same line. 44 tall on touch screens.
 */
const triggerClass = cn(
  "relative inline-flex shrink-0 items-center justify-center gap-[6px] whitespace-nowrap",
  "h-[var(--su-tab-height)] [@media(hover:none)]:h-[var(--su-hit-target)] p-0 -mb-px [appearance:none]",
  "border-b-2 border-solid border-b-transparent bg-transparent",
  "font-sans text-body font-medium text-ink-2 cursor-pointer su-focus-ring",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "[@media(hover:hover)]:[&:not([data-state=active]):enabled:hover]:text-ink",
  "disabled:text-ink-3 disabled:cursor-not-allowed",
  "data-[state=active]:text-ink data-[state=active]:border-b-action",
  "forced-colors:data-[state=active]:border-b-[Highlight]",
  // Vertical: a page-nav row (36, padding 0 12, radius 6); selection is a fill, not a rule.
  "data-[orientation=vertical]:(w-full h-[var(--su-control-md)] justify-between mb-0 px-su3 border-b-0 rounded-su-control)",
  "[&[data-orientation=vertical]:not([data-state=active]):enabled]:text-ink",
  "[@media(hover:hover)]:data-[orientation=vertical]:hover:not-disabled:bg-surface-hover",
  "data-[orientation=vertical]:data-[state=active]:bg-action-subtle",
  "data-[orientation=vertical]:data-[state=active]:text-action-text",
  "[@media(hover:hover)]:data-[orientation=vertical]:data-[state=active]:hover:bg-action-subtle-hover",
);

/**
 * The Badge count pill, drawn here so it can follow its own tab's state. In a vertical list it
 * is the page-nav count instead: plain 13/18 400, ink-2 (action-text on the selected row).
 */
const countClass = cn(
  "inline-flex shrink-0 items-center justify-center h-[18px] min-w-[18px] px-[6px] rounded-su-pill font-sans text-micro font-medium su-tabular",
  "[[data-orientation=vertical]>&]:h-auto [[data-orientation=vertical]>&]:min-w-0 [[data-orientation=vertical]>&]:px-0",
  "[[data-orientation=vertical]>&]:text-small [[data-orientation=vertical]>&]:font-normal",
  "[[data-orientation=vertical][data-state]>&]:bg-transparent",
);

const countVariantClass = {
  neutral:
    "bg-fill text-ink-2 [[data-state=active]>&]:bg-action-subtle [[data-state=active]>&]:text-action-text",
  danger: "bg-danger-tint text-danger-text",
} as const;

export function TabsTrigger({
  className,
  children,
  count,
  countVariant = "neutral",
  ...rest
}: TabsTriggerProps) {
  const hasCount = count !== undefined && count !== null && count !== false;
  return (
    <TabsPrimitive.Trigger className={cn(triggerClass, className)} {...rest}>
      {children}
      {hasCount ? (
        <span className={cn(countClass, countVariantClass[countVariant])}>{count}</span>
      ) : null}
    </TabsPrimitive.Trigger>
  );
}

export type TabsContentProps = TabsPrimitive.TabsContentProps;

export function TabsContent({ className, ...rest }: TabsContentProps) {
  return (
    <TabsPrimitive.Content
      className={cn(
        "mt-su4 su-focus-ring text-ink text-body",
        "data-[state=active]:animate-su-fade-in motion-reduce:animate-none",
        "data-[orientation=vertical]:(mt-0 flex-1 min-w-0)",
        className,
      )}
      {...rest}
    />
  );
}
