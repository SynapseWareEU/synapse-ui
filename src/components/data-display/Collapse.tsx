import * as Accordion from "@radix-ui/react-accordion";
import { IconChevronDown } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";

type CollapseItem = {
  key: string;
  label: ReactNode;
  children: ReactNode;
  disabled?: boolean;
  /** Trailing header content (badge, count, action). Does not toggle the panel. */
  extra?: ReactNode;
};

type CollapseSingleProps = {
  items: CollapseItem[];
  type?: "single";
  collapsible?: boolean;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

type CollapseMultipleProps = {
  items: CollapseItem[];
  type: "multiple";
  defaultValue?: string[];
  value?: string[];
  onValueChange?: (value: string[]) => void;
  className?: string;
};

export type CollapseProps = CollapseSingleProps | CollapseMultipleProps;

/*
 * Disclosure rows in a Panel, in the table's expanded-row language: a 24 chevron box at the
 * start (right → down), and an open item turns surface-2 as one block, with no rule between
 * its header and its content. The content indent (16 + 24 + 8 = 48) lines up with the title.
 */
function renderItems(items: CollapseItem[]) {
  return items.map((item) => (
    <Accordion.Item
      key={item.key}
      value={item.key}
      className="border-b border-solid border-border last:border-b-0 data-[state=open]:bg-surface-2"
      disabled={item.disabled}
    >
      {/* extra lives beside the Trigger, never inside it: Accordion.Trigger is a
          real <button>, so an interactive extra would be a nested control. */}
      <Accordion.Header
        className={cn(
          "m-0 flex w-full items-center",
          // Pointer-only hover; `:not([data-disabled])` also makes it outrank the open fill.
          "[@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-surface-hover",
          item.extra != null && "gap-su2 pe-su4",
        )}
      >
        <Accordion.Trigger
          className={cn(
            "group flex flex-1 min-w-0 min-h-[var(--su-panel-header)] items-center gap-su2 py-su3 ps-su4 bg-transparent",
            "font-sans text-body font-medium text-ink text-start cursor-pointer",
            item.extra != null ? "pe-0" : "pe-su4",
            "disabled:cursor-not-allowed disabled:text-ink-3",
            // The panel clips its corners, so the ring sits inside the row.
            "su-focus-ring focus-visible:outline-offset-[-2px]",
          )}
        >
          <span
            aria-hidden
            className="inline-flex shrink-0 items-center justify-center size-[var(--su-control-mini)] text-ink-3"
          >
            <IconChevronDown
              size={16}
              stroke={1.75}
              className={cn(
                "-rotate-90 rtl:rotate-90 group-data-[state=open]:rotate-0",
                "transition-transform duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)]",
              )}
            />
          </span>
          <span className="flex-1 min-w-0">{item.label}</span>
        </Accordion.Trigger>
        {item.extra != null ? (
          // font-normal: the header is an <h3>, whose UA bold would otherwise reach the extra.
          <span className="shrink-0 font-sans text-small font-normal text-ink-2">{item.extra}</span>
        ) : null}
      </Accordion.Header>
      <Accordion.Content
        className={cn(
          "overflow-hidden data-[state=open]:animate-su-slide-down data-[state=closed]:animate-su-slide-up",
          "motion-reduce:data-[state]:animate-none",
        )}
      >
        <div className="pt-0 pe-su4 pb-su4 ps-[calc(var(--su-space-4)+var(--su-control-mini)+var(--su-space-2))] text-body text-ink-2">
          {item.children}
        </div>
      </Accordion.Content>
    </Accordion.Item>
  ));
}

export function Collapse(props: CollapseProps) {
  const { items, className } = props;
  // Panel: surface, 1px border, radius 8. It clips the open fill at the corners, which is
  // why the triggers draw their focus ring inset.
  const rootClass = cn("su-panel", className);

  if (props.type === "multiple") {
    const { defaultValue, value, onValueChange } = props;
    return (
      <Accordion.Root
        type="multiple"
        className={rootClass}
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange}
      >
        {renderItems(items)}
      </Accordion.Root>
    );
  }

  const { collapsible = true, defaultValue, value, onValueChange } = props;
  return (
    <Accordion.Root
      type="single"
      collapsible={collapsible}
      className={rootClass}
      defaultValue={defaultValue}
      value={value}
      onValueChange={onValueChange}
    >
      {renderItems(items)}
    </Accordion.Root>
  );
}
