import { type ReactNode } from "react";
import { type FeedbackTone } from "./shared";
export type MessageType = FeedbackTone;
export interface MessageOptions {
    /** 14/20 ink. Put identifiers in mono at 0.9em. */
    content: ReactNode;
    type?: MessageType;
    /** Milliseconds before it dismisses itself (4500 by default; paused on hover and focus). `0` keeps it until closed. */
    duration?: number;
    /** Replaces the tone icon (18, in the tone's text colour). */
    icon?: ReactNode;
    /** Optional action link at the end (14/20 500), e.g. a `Button variant="text"`. */
    action?: ReactNode;
}
interface MessageContextValue {
    open: (options: MessageOptions) => void;
    success: (content: ReactNode) => void;
    error: (content: ReactNode) => void;
    info: (content: ReactNode) => void;
    warning: (content: ReactNode) => void;
}
/**
 * Toasts (spec §4.4). 360 wide, surface-overlay with a hairline, 8px radius and the overlay
 * shadow; tone icon 18, text 14/20 ink. They sit at the bottom-left of the main content area,
 * 24 from its bottom and 32 (the page padding) from its left, and stack upward with an 8 gap.
 * Set `--su-content-inset-start` on the root (e.g. to the rail width) to move them past a rail.
 * Errors are announced assertively, the rest politely.
 */
export declare function MessageProvider({ children, closeLabel, }: {
    children: ReactNode;
    /** The close button's accessible name on every toast, "Dismiss" by default. Pass the application's word. */
    closeLabel?: string;
}): import("react").JSX.Element;
export declare function useMessage(): MessageContextValue;
/** Imperative helper when provider is mounted via App */
export declare const message: {
    _api: MessageContextValue | null;
    useBind(api: MessageContextValue): void;
    open(opts: MessageOptions): void;
    success(content: ReactNode): void;
    error(content: ReactNode): void;
    info(content: ReactNode): void;
    warning(content: ReactNode): void;
};
export {};
//# sourceMappingURL=Message.d.ts.map