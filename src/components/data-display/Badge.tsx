import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

/** `default` is the neutral pill (the v1 name, kept). */
export type BadgeVariant =
  | "default"
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  count?: number;
  dot?: boolean;
  max?: number;
  showZero?: boolean;
  variant?: BadgeVariant;
  children?: ReactNode;
}

// Count pill: tone tint + tone text, sans. Neutral is fill with ink-2.
const pillClass: Record<BadgeVariant, string> = {
  default: "bg-fill text-ink-2",
  neutral: "bg-fill text-ink-2",
  accent: "bg-action-subtle text-action-text",
  info: "bg-info-tint text-info-text",
  success: "bg-success-tint text-success-text",
  warning: "bg-warning-tint text-warning-text",
  danger: "bg-danger-tint text-danger-text",
};

// A dot carries no text, so it takes the tone's solid colour.
const dotClass: Record<BadgeVariant, string> = {
  default: "bg-neutral",
  neutral: "bg-neutral",
  accent: "bg-action",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

// 18 high, radius 9, 12/16 500 sans, tabular figures. Fixed px on purpose: a count pill keeps its
// size under the handheld density scope.
const pillBase =
  "inline-flex items-center justify-center h-[18px] min-w-[18px] px-[6px] rounded-su-pill font-sans text-[12px] leading-[16px] font-medium whitespace-nowrap su-tabular forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]";
const dotBase =
  "inline-block shrink-0 size-[8px] rounded-su-round forced-colors:[forced-color-adjust:none]";
// On a child: the dot sits inside the corner at 15% (top 6, end 6 of the 40 rail box; closer to
// the corner on smaller children); the pill hangs over it (top −6, end −6). Both wear a 2px
// surface ring so they separate from the child.
const onChildDot = "absolute top-[15%] end-[15%] [box-shadow:0_0_0_2px_var(--su-surface)]";
const onChildPill = "absolute -top-[6px] -end-[6px] [box-shadow:0_0_0_2px_var(--su-surface)]";

export function Badge({
  count,
  dot = false,
  max = 99,
  showZero = false,
  variant = "default",
  className,
  children,
  title,
  ...rest
}: BadgeProps) {
  const show = dot || (count !== undefined && (showZero || count > 0));
  const label = count !== undefined && count > max ? `${max}+` : count;

  const chip = show ? (
    <span
      className={cn(
        dot ? cn(dotBase, dotClass[variant]) : cn(pillBase, pillClass[variant]),
        children ? (dot ? onChildDot : onChildPill) : undefined,
      )}
      aria-hidden={dot}
      title={dot ? undefined : (title ?? (label === undefined ? undefined : String(label)))}
    >
      {!dot && label}
    </span>
  ) : null;

  // No children: nothing to overlay, so the chip sits in normal flow.
  if (!children) {
    return (
      <span className={cn("inline-flex", className)} {...rest}>
        {chip}
      </span>
    );
  }

  return (
    <span className={cn("relative inline-flex", className)} {...rest}>
      {children}
      {chip}
    </span>
  );
}
