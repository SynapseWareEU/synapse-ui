import type { HTMLAttributes } from "react";
import { cn } from "../../utils/cn";

export type StatusDotTone = "neutral" | "info" | "success" | "warning" | "danger";

export interface StatusDotProps extends HTMLAttributes<HTMLSpanElement> {
  /** The tone's solid colour. Default `neutral`. */
  tone?: StatusDotTone;
  /** Not started yet: an empty ring (1.5px ink-3) instead of a filled dot. */
  pending?: boolean;
  /** 8 (default: status dots, group rows, exception lists) or 6 (inside tags and table meta lines). */
  size?: 6 | 8;
  /**
   * Accessible name (renders `role="img"`). Without it the dot is decorative. Warning and success
   * solids are below 3:1, so a warning or success dot needs a text neighbour or this label.
   */
  label?: string;
}

// Exported for the components that draw the same dot inline (Tag, Badge, table meta lines).
export const statusDotToneClass: Record<StatusDotTone, string> = {
  neutral: "bg-neutral",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/** 8px dot in a tone's solid colour. Colour is never the only signal: pair it with a word. */
export function StatusDot({
  tone = "neutral",
  pending = false,
  size = 8,
  label,
  className,
  ...rest
}: StatusDotProps) {
  const named = label ?? rest["aria-label"] ?? rest["aria-labelledby"];
  return (
    <span
      role={named ? "img" : undefined}
      aria-label={label}
      aria-hidden={named ? undefined : true}
      className={cn(
        "inline-block shrink-0 rounded-su-round",
        size === 6 ? "size-[6px]" : "size-[8px]",
        pending
          ? "bg-transparent border-[1.5px] border-solid border-ink-3"
          : cn(statusDotToneClass[tone], "forced-colors:[forced-color-adjust:none]"),
        className,
      )}
      {...rest}
    />
  );
}
