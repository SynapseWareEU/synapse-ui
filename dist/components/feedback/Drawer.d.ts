import * as Dialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
export interface DrawerProps extends ComponentPropsWithoutRef<typeof Dialog.Root> {
    /** 16/24 600 ink, one line with an ellipsis. An identifier in it reads best in mono 0.9em. */
    title?: ReactNode;
    description?: ReactNode;
    placement?: "left" | "right";
    /**
     * Panel width. Defaults to 480 (`--su-drawer-width`); never wider than the viewport − 32. Below
     * `sm` (640) it may take the whole viewport: a 32 strip of the page beside a sheet on a phone
     * is too narrow to read and wide enough to show half of a navigation rail.
     */
    width?: number | string;
    /**
     * Pinned action bar below the scroll region: 64 tall, left-packed. Put the primary action
     * first, then the secondary one.
     */
    footer?: ReactNode;
    children?: ReactNode;
    trigger?: ReactNode;
    /** The close button's accessible name, "Close drawer" by default. Pass the application's word. */
    closeLabel?: string;
}
/**
 * Side sheet for edits (spec §4.4). Flush to the viewport edge and square: 480 wide by default,
 * surface-overlay with a hairline on its inner edge and the overlay shadow, over the scrim.
 * Header 56, body padded 24 with a 16 gap between blocks, footer 64. Enters with a 16px slide
 * and a fade over 240ms (none under reduced motion).
 */
export declare function Drawer({ title, description, placement, width, footer, children, trigger, closeLabel, ...rest }: DrawerProps): import("react").JSX.Element;
//# sourceMappingURL=Drawer.d.ts.map