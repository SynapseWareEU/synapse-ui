// @unocss-include — UnoCSS's Vite pipeline only extracts from .tsx by default;
// without this the class strings below never generate CSS in dev.

import {
  IconAlertCircle,
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
  type TablerIcon,
} from "@tabler/icons-react";

/**
 * Bits the feedback surfaces (Alert, Message, Notification, Result) share: the status union,
 * the tone → colour maps, the tone icons and the small close buttons. They were copy-pasted
 * three ways and had already drifted; keep them here.
 *
 * Lattice UI v2 spends status colour as opaque tones (tint background, line border, text
 * colour). There is no 3px left rule any more.
 */

export type FeedbackTone = "info" | "success" | "warning" | "error";

/** The four status tones plus v2's neutral note (Alert's default). */
export type FeedbackToneOrNeutral = FeedbackTone | "neutral";

/** Tinted box: tone tint background and tone line border (Alert). Pair with `border border-solid`. */
export const toneSurfaceClass: Record<FeedbackToneOrNeutral, string> = {
  neutral: "bg-surface-2 border-border",
  info: "bg-info-tint border-info-line",
  success: "bg-success-tint border-success-line",
  warning: "bg-warning-tint border-warning-line",
  error: "bg-danger-tint border-danger-line",
};

/** Tone text colour for a status icon. State is shown by shape and colour, never colour alone. */
export const toneTextClass: Record<FeedbackToneOrNeutral, string> = {
  neutral: "text-ink-2",
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  error: "text-danger-text",
};

/** check-circle · alert-circle · alert-triangle · info-circle (spec §4.4, Message). */
export const toneIcon: Record<FeedbackToneOrNeutral, TablerIcon> = {
  neutral: IconInfoCircle,
  info: IconInfoCircle,
  success: IconCircleCheck,
  warning: IconAlertTriangle,
  error: IconAlertCircle,
};

/**
 * Ghost icon button (spec §4.1 icon-only buttons, §3 states). Rest: transparent and ink-2.
 * Hover (only with a real pointer): fill and ink. Press: the border colour. Focus: the 2px
 * outline, which follows the 6px radius.
 *
 * Below 44px the hit area grows to 44 under `(hover: none)` only; on desk the visual size is
 * the target. `active:` is repeated inside the hover media query so press still wins over
 * hover there. `border-0`, not `border-none`: an explicit 0 keeps the UA `2px outset` off a
 * bare <button> even if the reset is ever narrowed. No margin class here: callers add the
 * negative margins the anatomy asks for, and `cn()` cannot settle two margin utilities.
 */
const iconButtonBase =
  "relative shrink-0 inline-flex items-center justify-center p-0 border-0 rounded-su-control bg-transparent text-ink-2 cursor-pointer " +
  "su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] " +
  "active:bg-border [@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:active:bg-border " +
  "disabled:text-ink-3 disabled:cursor-not-allowed " +
  "[@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:inset-[calc((100%-var(--su-hit-target))/2)]";

/** 28 box, 16 icon: Alert dismiss, Notification close, persistent toast close. */
export const dismissButtonClass = `${iconButtonBase} size-[var(--su-control-xs)]`;

/** 32 box, 18 icon: Drawer and Modal close. */
export const closeButtonClass = `${iconButtonBase} size-[var(--su-control-sm)]`;
