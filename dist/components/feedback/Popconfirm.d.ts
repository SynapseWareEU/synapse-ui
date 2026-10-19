import type * as AlertDialog from "@radix-ui/react-alert-dialog";
import { type ComponentPropsWithoutRef, type ReactNode } from "react";
export interface PopconfirmProps extends ComponentPropsWithoutRef<typeof AlertDialog.Root> {
    /** 14/20 600 ink. */
    title?: ReactNode;
    /** 13/18 ink-2. */
    description?: ReactNode;
    okText?: ReactNode;
    cancelText?: ReactNode;
    /**
     * Confirm handler. Return a promise to keep the popover open (confirm button
     * spinning) until it settles; a rejection leaves it open.
     */
    onConfirm?: () => void | Promise<unknown>;
    /** Fired when the user dismisses via Cancel. */
    onCancel?: () => void;
    /** Block the trigger from opening (e.g. the row is already being deleted). */
    disabled?: boolean;
    /** Style the confirm action as destructive (Ant Design `okButtonProps.danger`). */
    okDanger?: boolean;
    /** Alias for `okDanger`. */
    danger?: boolean;
    children: ReactNode;
}
/**
 * Confirmation before a consequential action (spec §4.4). A 320-wide popover anchored 4px from
 * its trigger: surface-overlay, hairline, 8px radius, overlay shadow, padded 16 with an 8 gap.
 * Actions are left-packed: confirm (small primary, or small danger primary) then cancel (small
 * secondary). It is modal and announced as an `alertdialog`: focus is trapped inside, starts
 * on Cancel so Enter never confirms by accident, and returns to the trigger on close.
 */
export declare function Popconfirm({ title, description, okText, cancelText, onConfirm, onCancel, disabled, okDanger, danger, children, open: openProp, defaultOpen, onOpenChange, }: PopconfirmProps): import("react").JSX.Element;
//# sourceMappingURL=Popconfirm.d.ts.map