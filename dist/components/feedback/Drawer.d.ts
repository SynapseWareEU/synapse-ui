import * as Dialog from "@radix-ui/react-dialog";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
export interface DrawerProps extends ComponentPropsWithoutRef<typeof Dialog.Root> {
    title?: ReactNode;
    description?: ReactNode;
    placement?: "left" | "right";
    width?: number | string;
    /** Pinned action bar below the scroll region (Apply / Cancel). */
    footer?: ReactNode;
    children?: ReactNode;
    trigger?: ReactNode;
    /** The close button's accessible name, "Close drawer" by default. Pass the application's word. */
    closeLabel?: string;
}
export declare function Drawer({ title, description, placement, width, footer, children, trigger, closeLabel, ...rest }: DrawerProps): import("react").JSX.Element;
//# sourceMappingURL=Drawer.d.ts.map