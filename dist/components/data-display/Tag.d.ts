import type { HTMLAttributes, ReactNode } from "react";
/**
 * Tones. One word, one tone, everywhere: danger for late, expired, blocked, refused; warning for
 * today, expiring, quarantine, paused, partial; info for work in progress only; neutral for
 * finished, shipped, closed, cancelled, inactive and roles. Silent defaults (active, available,
 * open, waiting) get no tag at all. `default` is the v1 name for `neutral`.
 */
export type TagColor = "default" | "neutral" | "info" | "accent" | "success" | "warning" | "danger";
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
export declare function Tag({ color, dot, closable, onClose, filterLabel, removeLabel, className, children, ...rest }: TagProps): import("react").JSX.Element;
//# sourceMappingURL=Tag.d.ts.map