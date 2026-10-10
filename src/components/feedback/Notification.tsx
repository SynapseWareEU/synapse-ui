import { IconX } from "@tabler/icons-react";
import type { HTMLAttributes, ReactNode } from "react";
import { iconDefaults } from "../general/Icon";
import { cn } from "../../utils/cn";
import { dismissButtonClass, toneIcon, toneTextClass, type FeedbackTone } from "./shared";

export type NotificationType = FeedbackTone;

export interface NotificationProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  type?: NotificationType;
  /** 14/20 500 ink. */
  title?: ReactNode;
  /** 13/18 ink-2. `children` is used when this is empty. */
  description?: ReactNode;
  /** Replaces the tone icon (18, in the tone's text colour). */
  icon?: ReactNode;
  /** Small buttons, 8 below the text with an 8 gap. */
  action?: ReactNode;
  /** Shows the 28 close button. */
  onClose?: () => void;
}

/**
 * Notification card (spec §4.4): the toast shell (surface-overlay, hairline, 8px radius, overlay
 * shadow) padded 12 16, with a tone icon, a title, a description and optional actions.
 */
export function Notification({
  type = "info",
  title,
  description,
  icon,
  action,
  onClose,
  className,
  children,
  ...rest
}: NotificationProps) {
  const Glyph = toneIcon[type];
  return (
    <div
      className={cn(
        "box-border flex items-start gap-[10px] py-su3 px-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay",
        className,
      )}
      role={type === "error" ? "alert" : "status"}
      {...rest}
    >
      <span
        className={cn("shrink-0 flex mt-[1px]", toneTextClass[type])}
        aria-hidden={icon ? undefined : true}
      >
        {icon ?? <Glyph size={18} {...iconDefaults} />}
      </span>
      <div className="flex-1 min-w-0 [overflow-wrap:anywhere]">
        {title ? <div className="text-body font-medium text-ink">{title}</div> : null}
        {description || children ? (
          <div className="text-small text-ink-2">{description ?? children}</div>
        ) : null}
        {action ? <div className="mt-su2 flex flex-wrap items-center gap-su2">{action}</div> : null}
      </div>
      {onClose ? (
        <button
          type="button"
          className={cn(dismissButtonClass, "-m-su1")}
          onClick={onClose}
          aria-label="Dismiss notification"
        >
          <IconX size={16} {...iconDefaults} />
        </button>
      ) : null}
    </div>
  );
}

export interface NotificationStackProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

/**
 * The same stack as toasts: bottom-left of the main content area (24 from the bottom, the page
 * padding from the start edge, past `--su-content-inset-start` when the app sets it), 360 wide,
 * stacking upward with an 8 gap.
 */
export function NotificationStack({ className, children, ...rest }: NotificationStackProps) {
  return (
    <div
      className={cn(
        "fixed bottom-su6 start-[calc(var(--su-content-inset-start,0px)+var(--su-page-pad-x))] z-[var(--su-z-toast)] flex flex-col gap-su2 w-[min(var(--su-toast-width),calc(100vw-var(--su-page-pad-x)*2))]",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Notification.Stack = NotificationStack;
