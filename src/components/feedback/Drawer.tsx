import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { iconDefaults } from "../general/Icon";
import { cn } from "../../utils/cn";
import { closeButtonClass } from "./shared";

export interface DrawerProps extends ComponentPropsWithoutRef<typeof Dialog.Root> {
  /** 16/24 600 ink, one line with an ellipsis. An identifier in it reads best in mono 0.9em. */
  title?: ReactNode;
  description?: ReactNode;
  placement?: "left" | "right";
  /** Panel width. Defaults to 480 (`--su-drawer-width`); never wider than the viewport − 32. */
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
export function Drawer({
  title,
  description,
  placement = "right",
  width,
  footer,
  children,
  trigger,
  closeLabel = "Close drawer",
  ...rest
}: DrawerProps) {
  // Radix hands focus back to a Dialog.Trigger as the dialog closes. A drawer opened through a
  // controlled `open` has none, so focus fell to <body> and a keyboard user started again at the
  // top of the page. Remember what held focus as the drawer opened and give it back on close.
  // Read while rendering the open, not in onOpenAutoFocus: an autoFocus field inside the drawer
  // takes focus during the commit, and Radix then skips that event.
  // A menu item that opened the drawer is gone once its menu closes, so remember the menu's
  // trigger instead: the element its content's aria-labelledby names (getElementById, because
  // React 18 ids hold colons). A submenu's trigger is an item too, so walk out a few levels.
  const opener = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  if (rest.open && !wasOpen.current) {
    opener.current = document.activeElement as HTMLElement | null;
    for (let depth = 0; depth < 4; depth++) {
      const id = opener.current?.closest("[role=menu]")?.getAttribute("aria-labelledby");
      const menuTrigger = id && document.getElementById(id);
      if (!menuTrigger) break;
      opener.current = menuTrigger;
    }
  }
  wasOpen.current = rest.open === true;
  const left = placement === "left";
  return (
    <Dialog.Root {...rest}>
      {trigger ? <Dialog.Trigger asChild>{trigger}</Dialog.Trigger> : null}
      <Dialog.Portal>
        <Dialog.Overlay className="su-overlay" />
        {/* Two layers so the two keyframes can run together: the dialog fades, the panel
            inside it slides 16px. One element can only carry one `animation`. */}
        <Dialog.Content
          className={cn(
            "fixed top-0 bottom-0 z-[var(--su-z-modal)] max-w-[calc(100vw-var(--su-space-8))] outline-none animate-su-fade-in motion-reduce:animate-none",
            left ? "left-0" : "right-0",
            width === undefined && "w-[var(--su-drawer-width)]",
          )}
          style={width !== undefined ? { width } : undefined}
          onCloseAutoFocus={(event) => {
            if (trigger) return; // Radix focuses the trigger itself
            // No "is it still open" guard: a drawer that closes by unmounting never renders closed.
            event.preventDefault();
            opener.current?.focus();
          }}
          {...(!description ? { "aria-describedby": undefined } : {})}
        >
          <div
            className={cn(
              "h-full w-full flex flex-col bg-surface-overlay text-ink font-sans shadow-su-overlay border-solid border-border motion-reduce:animate-none",
              left ? "border-r animate-su-slide-in-left" : "border-l animate-su-slide-in",
            )}
          >
            <div
              className={cn(
                "flex-none flex items-center gap-su3 h-[var(--su-drawer-header)] ps-su6 pe-su3",
                title ? "border-b border-solid border-border" : undefined,
              )}
            >
              {title ? (
                <Dialog.Title className="flex-1 min-w-0 m-0 truncate font-sans text-section font-semibold text-ink text-start">
                  {title}
                </Dialog.Title>
              ) : (
                <Dialog.Title className="sr-only">Drawer</Dialog.Title>
              )}
              <Dialog.Close asChild>
                <button type="button" className={cn(closeButtonClass, "ms-auto")} aria-label={closeLabel}>
                  <IconX size={18} {...iconDefaults} />
                </button>
              </Dialog.Close>
            </div>
            {description ? (
              <Dialog.Description className="sr-only">{description}</Dialog.Description>
            ) : null}
            <div className="flex-1 min-h-0 overflow-auto p-su6 flex flex-col gap-su4 text-body text-ink [&>:first-child]:mt-0 [&>:last-child]:mb-0">
              {children}
            </div>
            {footer ? (
              <div className="flex-none flex flex-wrap items-center justify-start gap-su2 min-h-[var(--su-drawer-footer)] py-su3 px-su6 border-t border-solid border-border">
                {footer}
              </div>
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
