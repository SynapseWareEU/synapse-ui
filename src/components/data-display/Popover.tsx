import * as RadixPopover from "@radix-ui/react-popover";
import { useEffect, useState, type ComponentPropsWithoutRef, type ReactNode, type RefObject } from "react";
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
  /**
   * Shift along the edge it is aligned to, in px (negative: before the start). With `anchorRef`
   * it lines the overlay's content up with what the anchor holds, such as a column header's label
   * 8 inside its cell.
   */
  alignOffset?: number;
  /**
   * What the overlay is placed against, in place of the trigger: an element, or anything with a
   * `getBoundingClientRect` (a rect the caller works out). For a small trigger that stands for
   * something larger, such as the funnel in a column header whose panel opens under the column's
   * start. The trigger still opens it, is still its `aria-controls`, and takes focus back.
   */
  anchorRef?: RefObject<{ getBoundingClientRect(): DOMRect } | null>;
  contentClassName?: string;
  /**
   * The accessible name of the overlay, which is a `dialog`: what it is for ("Filter by zone").
   * Give one whenever the content has no heading of its own.
   */
  "aria-label"?: string;
  /** Portal target; defaults to document.body. For shadow DOM / iframe hosts. */
  container?: HTMLElement | null;
}

type Measurable = { getBoundingClientRect(): DOMRect };

function measurableOf(ref: RefObject<Measurable | null>): Measurable {
  return {
    getBoundingClientRect: () => ref.current?.getBoundingClientRect() ?? new DOMRect(),
    // Read by the positioning library: whose scrollers to listen to.
    get contextElement() {
      const held = ref.current;
      return typeof Element !== "undefined" && held instanceof Element ? held : undefined;
    },
  } as Measurable;
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
  alignOffset,
  anchorRef,
  contentClassName,
  container,
  "aria-label": ariaLabel,
  ...rest
}: PopoverProps) {
  const { onOpenChange, ...root } = rest;
  // Radix takes a new anchor only when the ref's value changes, and its trigger announces itself
  // as the anchor while it mounts (twice under StrictMode, the second time after this one was
  // taken). So the anchor is handed over again, as a new object, each time the overlay opens: by
  // then the trigger no longer competes. The object measures the caller's ref when asked, so the
  // ref may be filled late; `contextElement` lets the overlay follow that element's scrollers.
  const [virtual, setVirtual] = useState<RefObject<Measurable> | undefined>(() =>
    anchorRef ? { current: measurableOf(anchorRef) } : undefined,
  );
  const open = root.open;
  useEffect(() => {
    setVirtual(anchorRef ? { current: measurableOf(anchorRef) } : undefined);
  }, [anchorRef, open]);
  return (
    <RadixPopover.Root
      {...root}
      onOpenChange={(next) => {
        if (next && anchorRef) setVirtual({ current: measurableOf(anchorRef) });
        onOpenChange?.(next);
      }}
    >
      <RadixPopover.Trigger asChild>
        {trigger}
      </RadixPopover.Trigger>
      {virtual ? <RadixPopover.Anchor virtualRef={virtual} /> : null}
      <RadixPopover.Portal container={container}>
        <RadixPopover.Content
          side={side}
          align={align}
          sideOffset={sideOffset}
          alignOffset={alignOffset}
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
