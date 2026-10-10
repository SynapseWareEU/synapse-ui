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
          className={cn(
            "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
            "font-sans text-body text-ink su-focus-ring",
            // `data-side` holds exactly one value, so only one of these animations ever applies.
            "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
            contentClassName,
          )}
        >
          {/* No arrow (v2): the overlay shadow and the 4px offset already tie it to its trigger. */}
          <div className="max-h-[calc(var(--radix-popover-content-available-height)-2*var(--su-space-2)-2px)] overflow-y-auto">
            {content}
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
