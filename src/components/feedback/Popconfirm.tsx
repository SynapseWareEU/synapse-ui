import type * as AlertDialog from "@radix-ui/react-alert-dialog";
import * as RadixPopover from "@radix-ui/react-popover";
import { useId, useRef, useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Button } from "../general/Button";

export interface PopconfirmProps
  extends ComponentPropsWithoutRef<typeof AlertDialog.Root> {
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
export function Popconfirm({
  title = "Are you sure?",
  description,
  okText = "OK",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  disabled,
  okDanger,
  danger,
  children,
  open: openProp,
  defaultOpen,
  onOpenChange,
}: PopconfirmProps) {
  const confirmDanger = okDanger ?? danger ?? false;
  const [openState, setOpenState] = useState(defaultOpen ?? false);
  const [pending, setPending] = useState(false);
  const open = openProp ?? openState;
  const titleId = useId();
  const descriptionId = useId();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const setOpen = (next: boolean) => {
    if (openProp === undefined) setOpenState(next);
    onOpenChange?.(next);
  };

  // We own the close, so an async onConfirm can hold the popover open.
  const confirm = () => {
    const result = onConfirm?.();
    if (!result || typeof (result as Promise<unknown>).then !== "function") {
      setOpen(false);
      return;
    }
    setPending(true);
    Promise.resolve(result)
      .then(
        () => setOpen(false),
        () => undefined, // rejection: stay open, caller surfaces the error
      )
      .finally(() => setPending(false));
  };

  const cancel = () => {
    onCancel?.();
    setOpen(false);
  };

  return (
    <RadixPopover.Root modal open={disabled ? false : open} onOpenChange={setOpen}>
      <RadixPopover.Trigger asChild disabled={disabled}>
        {children}
      </RadixPopover.Trigger>
      <RadixPopover.Portal>
        <RadixPopover.Content
          role="alertdialog"
          aria-labelledby={titleId}
          aria-describedby={description ? descriptionId : undefined}
          side="bottom"
          align="start"
          sideOffset={4}
          collisionPadding={8}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            cancelRef.current?.focus();
          }}
          onEscapeKeyDown={(event) => {
            if (pending) event.preventDefault();
          }}
          onInteractOutside={(event) => {
            if (pending) event.preventDefault();
          }}
          className="z-[var(--su-z-dropdown)] box-border w-[320px] max-w-[calc(100vw-var(--su-space-8))] flex flex-col gap-su2 p-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay outline-none animate-su-dropdown-in motion-reduce:animate-none"
        >
          <div id={titleId} className="text-body font-semibold text-ink [overflow-wrap:anywhere]">
            {title}
          </div>
          {description ? (
            <div id={descriptionId} className="text-small text-ink-2 [overflow-wrap:anywhere]">
              {description}
            </div>
          ) : null}
          <div className="mt-su1 flex flex-wrap items-center gap-su2">
            <Button
              variant="primary"
              size="sm"
              danger={confirmDanger}
              loading={pending}
              onClick={confirm}
            >
              {okText}
            </Button>
            <Button ref={cancelRef} size="sm" disabled={pending} onClick={cancel}>
              {cancelText}
            </Button>
          </div>
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
}
