import * as RadixPopover from "@radix-ui/react-popover";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface PopoverProps
  extends Omit<ComponentPropsWithoutRef<typeof RadixPopover.Root>, "children"> {
  trigger: ReactNode;
  content: ReactNode;
  side?: ComponentPropsWithoutRef<typeof RadixPopover.Content>["side"];
  align?: ComponentPropsWithoutRef<typeof RadixPopover.Content>["align"];
  /**
   * Distance from the trigger, in px. Defaults to the v2 overlay's 4. For a trigger that sits
   * inside a frame the overlay must clear, such as a rail tile whose panel opens past the rail.
   */
  sideOffset?: number;
  contentClassName?: string;
  /**
   * The accessible name of the overlay, which is a `dialog`: what it is for ("Filter by zone").
   * Give one whenever the content has no heading of its own.
   */
  "aria-label"?: string;
  /** Portal target; defaults to document.body. For shadow DOM / iframe hosts. */
  container?: HTMLElement | null;
}

/**
 * v2 overlay: surface-overlay, 1px border, radius 8, overlay shadow, padding 8, 4 from the
 * trigger, no arrow. Fades in with a 4px drift (150ms).
 */
export function Popover({
  trigger,
  content,
  side = "bottom",
  align = "center",
  sideOffset = 4,
  contentClassName,
  container,
  "aria-label": ariaLabel,
  ...rest
}: PopoverProps) {
  return (
    <RadixPopover.Root {...rest}>
      <RadixPopover.Trigger asChild>
        {trigger}
      </RadixPopover.Trigger>
      <RadixPopover.Portal container={container}>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          aria-label={ariaLabel}
          className={cn(
            "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
            "font-sans text-body text-ink su-focus-ring",
            // `data-side` holds exactly one value, so only one of these animations ever applies.
            "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
            contentClassName,
          )}
        >
          {/* No arrow (v2): the overlay shadow and the 4px offset already tie it to its trigger. */}
          {/* The scroller is the whole padding box (the padding is taken back and given again
              inside it), so a focus ring at the content's edge is drawn in the padding instead of
              being cut by the scroller, and a rule may bleed to the border with `-mx-su2`. */}
          <div className="-m-su2 p-su2 max-h-[calc(var(--radix-popover-content-available-height)-2px)] overflow-y-auto rounded-[inherit]">
            {content}
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
