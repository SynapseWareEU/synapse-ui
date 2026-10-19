import { type TablerIcon } from "@tabler/icons-react";
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
export declare const toneSurfaceClass: Record<FeedbackToneOrNeutral, string>;
/** Tone text colour for a status icon. State is shown by shape and colour, never colour alone. */
export declare const toneTextClass: Record<FeedbackToneOrNeutral, string>;
/** check-circle · alert-circle · alert-triangle · info-circle (spec §4.4, Message). */
export declare const toneIcon: Record<FeedbackToneOrNeutral, TablerIcon>;
/** 28 box, 16 icon: Alert dismiss, Notification close, persistent toast close. */
export declare const dismissButtonClass = "relative shrink-0 inline-flex items-center justify-center p-0 border-0 rounded-su-control bg-transparent text-ink-2 cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] active:bg-border [@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:active:bg-border disabled:text-ink-3 disabled:cursor-not-allowed [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:inset-[calc((100%-var(--su-hit-target))/2)] size-[var(--su-control-xs)]";
/** 32 box, 18 icon: Drawer and Modal close. */
export declare const closeButtonClass = "relative shrink-0 inline-flex items-center justify-center p-0 border-0 rounded-su-control bg-transparent text-ink-2 cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] active:bg-border [@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:active:bg-border disabled:text-ink-3 disabled:cursor-not-allowed [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:inset-[calc((100%-var(--su-hit-target))/2)] size-[var(--su-control-sm)]";
//# sourceMappingURL=shared.d.ts.map