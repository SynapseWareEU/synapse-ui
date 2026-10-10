import type { HTMLAttributes, ReactNode } from "react";
import { type FeedbackTone } from "./shared";
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
export declare function Notification({ type, title, description, icon, action, onClose, className, children, ...rest }: NotificationProps): import("react").JSX.Element;
export declare namespace Notification {
    var Stack: typeof NotificationStack;
}
export interface NotificationStackProps extends HTMLAttributes<HTMLDivElement> {
    children?: ReactNode;
}
/**
 * The same stack as toasts: bottom-left of the main content area (24 from the bottom, the page
 * padding from the start edge, past `--su-content-inset-start` when the app sets it), 360 wide,
 * stacking upward with an 8 gap.
 */
export declare function NotificationStack({ className, children, ...rest }: NotificationStackProps): import("react").JSX.Element;
//# sourceMappingURL=Notification.d.ts.map