import * as RadixPopover from "@radix-ui/react-popover";
import { type ComponentPropsWithoutRef, type ReactNode, type RefObject } from "react";
export interface PopoverProps extends Omit<ComponentPropsWithoutRef<typeof RadixPopover.Root>, "children"> {
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
     * How close to the viewport's edge the overlay may come before it is moved back in, in px.
     * Default 0, as before: an overlay pushed in by the edge then touches it. Give the page's own
     * margin where the trigger can stand at the far edge (the last column of a table).
     */
    collisionPadding?: number;
    /**
     * What the overlay is placed against, in place of the trigger: an element, or anything with a
     * `getBoundingClientRect` (a rect the caller works out). For a small trigger that stands for
     * something larger, such as the funnel in a column header whose panel opens under the column's
     * start. The trigger still opens it, is still its `aria-controls`, and takes focus back.
     */
    anchorRef?: RefObject<{
        getBoundingClientRect(): DOMRect;
    } | null>;
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
export declare function Popover({ trigger, content, side, align, sideOffset, alignOffset, collisionPadding, anchorRef, contentClassName, container, "aria-label": ariaLabel, ...rest }: PopoverProps): import("react").JSX.Element;
//# sourceMappingURL=Popover.d.ts.map