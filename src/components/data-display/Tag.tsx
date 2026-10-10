import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

/**
 * Tones. One word, one tone, everywhere: danger for late, expired, blocked, refused; warning for
 * today, expiring, quarantine, paused, partial; info for work in progress only; neutral for
 * finished, shipped, closed, cancelled, inactive and roles. Silent defaults (active, available,
 * open, waiting) get no tag at all. `default` is the v1 name for `neutral`.
 */
export type TagColor =
  | "default"
  | "neutral"
  | "info"
  | "accent"
  | "success"
  | "warning"
  | "danger";

export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  color?: TagColor;
  /** A 6px dot in the tone's solid colour before the text. `accent` has no dot. */
  dot?: boolean;
  /**
   * Renders the filter chip: 28 high, action-subtle, with a 20px remove button.
   * `color` and `dot` do not apply to it.
   */
  closable?: boolean;
  onClose?: () => void;
  /** Filter chip only: the key ("Zone:") in 500 before the values (`children`, 400). */
  filterLabel?: ReactNode;
  /**
   * The remove button's accessible name. By default "Remove the <key> filter" when `filterLabel`
   * is a string, else "Remove <text>" (or "Remove tag"). Pass the application's words.
   */
  removeLabel?: string;
  children?: ReactNode;
}

const toneClass: Record<TagColor, string> = {
  default: "bg-neutral-tint text-neutral-text",
  neutral: "bg-neutral-tint text-neutral-text",
  info: "bg-info-tint text-info-text",
  accent: "bg-action-subtle text-action-text",
  success: "bg-success-tint text-success-text",
  warning: "bg-warning-tint text-warning-text",
  danger: "bg-danger-tint text-danger-text",
};

const dotClass: Record<TagColor, string | undefined> = {
  default: "bg-neutral",
  neutral: "bg-neutral",
  info: "bg-info",
  accent: undefined,
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

// In forced colours the tint disappears, so the box keeps a system-colour outline.
const forcedBox = "forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]";

function closeName(removeLabel: string | undefined, filterLabel: ReactNode, children: ReactNode) {
  if (removeLabel) return removeLabel;
  if (typeof filterLabel === "string") return `Remove the ${filterLabel.replace(/:\s*$/, "")} filter`;
  if (typeof children === "string") return `Remove ${children}`;
  return "Remove tag";
}

export function Tag({
  color = "default",
  dot = false,
  closable = false,
  onClose,
  filterLabel,
  removeLabel,
  className,
  children,
  ...rest
}: TagProps) {
  if (closable) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-[4px] h-[28px] ps-[8px] pe-[4px] rounded-su-tag bg-action-subtle text-action-text font-sans text-small font-normal whitespace-nowrap",
          forcedBox,
          className,
        )}
        {...rest}
      >
        <span className="min-w-0 truncate">
          {filterLabel != null ? (
            <>
              <span className="font-medium">{filterLabel}</span>{" "}
            </>
          ) : null}
          {children}
        </span>
        <button
          type="button"
          className="inline-flex items-center justify-center shrink-0 size-[20px] p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:bg-action-subtle-hover [@media(hover:none)]:su-hit-44"
          onClick={onClose}
          aria-label={closeName(removeLabel, filterLabel, children)}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
          </svg>
        </button>
      </span>
    );
  }

  const dotTone = dot ? dotClass[color] : undefined;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[6px] h-[22px] px-[8px] rounded-su-tag font-sans text-micro font-medium whitespace-nowrap",
        toneClass[color],
        forcedBox,
        className,
      )}
      {...rest}
    >
      {dotTone ? (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block shrink-0 size-[6px] rounded-su-round forced-colors:[forced-color-adjust:none]",
            dotTone,
          )}
        />
      ) : null}
      {children}
    </span>
  );
}
