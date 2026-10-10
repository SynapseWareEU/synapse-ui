import { IconX } from "@tabler/icons-react";
import type { HTMLAttributes, ReactNode } from "react";
import { iconDefaults } from "../general/Icon";
import { cn } from "../../utils/cn";
import {
  dismissButtonClass,
  toneIcon,
  toneSurfaceClass,
  toneTextClass,
  type FeedbackToneOrNeutral,
} from "./shared";

/** `neutral` is the v2 default (the grey note); the four tones are tinted. */
export type AlertType = FeedbackToneOrNeutral;

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Tone. Defaults to `neutral`: surface-2 with a hairline, the note drawn on the login screen. */
  type?: AlertType;
  /** 14/20 500 ink. The title stays ink in every tone. */
  title?: ReactNode;
  closable?: boolean;
  onClose?: () => void;
  /** The close button's accessible name, "Close alert" by default. Pass the application's word. */
  closeLabel?: string;
  /** Show the per-type status icon (16, in the tone's text colour). */
  showIcon?: boolean;
  /** Custom icon; implies `showIcon`. */
  icon?: ReactNode;
  /** Trailing action link (14/20 500), e.g. a `Button variant="text"`. */
  action?: ReactNode;
  /** Denser description: 13/18 instead of 14/20. */
  compact?: boolean;
  /** Description, ink-2, on the line below the title. */
  children?: ReactNode;
}

/**
 * Inline status note (spec §4.4). A tinted, 8px-rounded box: icon 16 at the top, the title on
 * the first line and the description below it, an optional action link and a 28 dismiss.
 * Errors and warnings are announced (`role="alert"`); the other tones are `role="status"`.
 */
export function Alert({
  type = "neutral",
  title,
  closable = false,
  onClose,
  closeLabel = "Close alert",
  showIcon = false,
  icon,
  action,
  compact = false,
  className,
  children,
  ...rest
}: AlertProps) {
  const Glyph = toneIcon[type];
  const glyph = icon ?? (showIcon ? <Glyph size={16} {...iconDefaults} /> : null);

  return (
    <div
      role={type === "error" || type === "warning" ? "alert" : "status"}
      className={cn(
        "w-full box-border flex items-start gap-su2 py-[10px] px-su3 rounded-su-surface border border-solid font-sans text-body text-ink",
        toneSurfaceClass[type],
        className,
      )}
      {...rest}
    >
      {glyph ? (
        <span aria-hidden className={cn("shrink-0 flex mt-[2px] leading-none", toneTextClass[type])}>
          {glyph}
        </span>
      ) : null}
      <div className="flex-1 min-w-0 break-words">
        {title ? <div className="text-body font-medium text-ink">{title}</div> : null}
        {children ? (
          <div className={cn(compact ? "text-small" : "text-body", "text-ink-2")}>{children}</div>
        ) : null}
      </div>
      {action ? <div className="shrink-0 text-body font-medium">{action}</div> : null}
      {closable ? (
        <button type="button" className={cn(dismissButtonClass, "-m-su1")} onClick={onClose} aria-label={closeLabel}>
          <IconX size={16} {...iconDefaults} />
        </button>
      ) : null}
    </div>
  );
}
