import * as Dialog from "@radix-ui/react-dialog";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
export type ModalSize = "sm" | "md" | "lg";
export interface ModalProps extends ComponentPropsWithoutRef<typeof Dialog.Root>, Pick<ComponentPropsWithoutRef<typeof Dialog.Content>, "onEscapeKeyDown" | "onPointerDownOutside" | "onInteractOutside" | "onOpenAutoFocus" | "onCloseAutoFocus"> {
    /** 16/24 600 ink, one line with an ellipsis. */
    title?: ReactNode;
    /** Accessible (and optionally visible) description for the dialog. */
    description?: ReactNode;
    /** When true, show `description` at the top of the body instead of sr-only. */
    showDescription?: boolean;
    /**
     * Action bar: 64 tall, border-top, left-packed. Primary first, then secondary; a destructive
     * confirm uses the danger primary.
     */
    footer?: ReactNode;
    /** Width step: `sm` 400 (confirm) · `md` 480 (default) · `lg` 640 (palette). */
    size?: ModalSize;
    /** Explicit width; wins over `size`. Never wider than the viewport − 32. */
    width?: number | string;
    children?: ReactNode;
    trigger?: ReactNode;
    /** Set false to hide the close icon (mandatory-choice dialogs). */
    closable?: boolean;
}
/**
 * Dialog (spec §4.4). Top-anchored 96px from the top, not vertically centred; centred on the
 * content column. Set `--su-content-inset-start` on the root (e.g. to the rail width) and the
 * dialog centres on the column right of it; without it, on the viewport. surface-overlay,
 * hairline, 8px radius, overlay shadow; the body scrolls past `100vh − 192px`. Enters with a
 * fade and a 4px rise over 150ms.
 */
export declare function Modal({ title, description, showDescription, footer, size, width, children, trigger, closable, onEscapeKeyDown, onPointerDownOutside, onInteractOutside, onOpenAutoFocus, onCloseAutoFocus, ...rest }: ModalProps): import("react").JSX.Element;
//# sourceMappingURL=Modal.d.ts.map