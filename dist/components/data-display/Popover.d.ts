import * as RadixPopover from "@radix-ui/react-popover";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
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
export declare function Popover({ trigger, content, side, align, sideOffset, contentClassName, container, "aria-label": ariaLabel, ...rest }: PopoverProps): import("react").JSX.Element;
//# sourceMappingURL=Popover.d.ts.map