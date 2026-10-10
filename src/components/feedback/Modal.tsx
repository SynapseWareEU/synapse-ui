import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { iconDefaults } from "../general/Icon";
import { cn } from "../../utils/cn";
import { closeButtonClass } from "./shared";

export type ModalSize = "sm" | "md" | "lg";

export interface ModalProps
  extends ComponentPropsWithoutRef<typeof Dialog.Root>,
    Pick<
      ComponentPropsWithoutRef<typeof Dialog.Content>,
      | "onEscapeKeyDown"
      | "onPointerDownOutside"
      | "onInteractOutside"
      | "onOpenAutoFocus"
      | "onCloseAutoFocus"
    > {
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

const sizeClass: Record<ModalSize, string> = {
  sm: "w-[400px]",
  md: "w-[var(--su-modal-width)]",
  lg: "w-[var(--su-palette-width)]",
};

/**
 * Dialog (spec §4.4). Top-anchored 96px from the top, not vertically centred; centred on the
 * content column. Set `--su-content-inset-start` on the root (e.g. to the rail width) and the
 * dialog centres on the column right of it; without it, on the viewport. surface-overlay,
 * hairline, 8px radius, overlay shadow; the body scrolls past `100vh − 192px`. Enters with a
 * fade and a 4px rise over 150ms.
 */
export function Modal({
  title,
  description,
  showDescription = false,
  footer,
  size = "md",
  width,
  children,
  trigger,
  closable = true,
  onEscapeKeyDown,
  onPointerDownOutside,
  onInteractOutside,
  onOpenAutoFocus,
  onCloseAutoFocus,
  ...rest
}: ModalProps) {
  const header = Boolean(title) || closable;
  const titleNode = title ? (
    <Dialog.Title className="flex-1 min-w-0 m-0 truncate font-sans text-section font-semibold text-ink text-start">
      {title}
    </Dialog.Title>
  ) : (
    <Dialog.Title className="sr-only">Dialog</Dialog.Title>
  );
  const visibleDescription = Boolean(description) && showDescription;
  return (
    <Dialog.Root {...rest}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="su-overlay" />
        <Dialog.Content
          className={cn(
            // `start`/`end` + auto margins centre it without a transform, so the rise keyframe
            // (which animates `transform`) cannot knock it off centre.
            "fixed top-[var(--su-modal-top)] start-[var(--su-content-inset-start,0px)] end-0 mx-auto z-[var(--su-z-modal)] box-border",
            "max-w-[calc(100vw-var(--su-space-8))] max-h-[calc(100vh-var(--su-modal-top)*2)] flex flex-col overflow-hidden",
            "rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay outline-none",
            "animate-su-scale-in motion-reduce:animate-none",
            width === undefined && sizeClass[size],
          )}
          style={width !== undefined ? { width } : undefined}
          onEscapeKeyDown={onEscapeKeyDown}
          onPointerDownOutside={onPointerDownOutside}
          onInteractOutside={onInteractOutside}
          onOpenAutoFocus={onOpenAutoFocus}
          onCloseAutoFocus={onCloseAutoFocus}
          {...(!description ? { "aria-describedby": undefined } : {})}
        >
          {header ? (
            // Header 56 (the drawer's height token): padding 0 12 0 24.
            <div className="flex-none flex items-center gap-su3 h-[var(--su-drawer-header)] ps-su6 pe-su3">
              {titleNode}
              {closable ? (
                <Dialog.Close asChild>
                  <button type="button" className={cn(closeButtonClass, "ms-auto")} aria-label="Close">
                    <IconX size={18} {...iconDefaults} />
                  </button>
                </Dialog.Close>
              ) : null}
            </div>
          ) : (
            titleNode
          )}
          {description && !showDescription ? (
            <Dialog.Description className="sr-only">{description}</Dialog.Description>
          ) : null}
          <div className="flex-1 min-h-0 overflow-auto p-su6 flex flex-col gap-su4 text-body text-ink-2 text-start [&>:first-child]:mt-0 [&>:last-child]:mb-0">
            {visibleDescription ? (
              <Dialog.Description className="m-0 text-body text-ink-2">{description}</Dialog.Description>
            ) : null}
            {children}
          </div>
          {footer ? (
            // Footer 64 (the drawer's height token): border-top, padding 0 24, gap 8.
            <div className="flex-none flex flex-wrap items-center justify-start gap-su2 min-h-[var(--su-drawer-footer)] py-su3 px-su6 border-t border-solid border-border">
              {footer}
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
