import type { HTMLAttributes, ReactNode } from "react";
export type TagColor = "default" | "accent" | "success" | "warning" | "danger";
export interface TagProps extends HTMLAttributes<HTMLSpanElement> {
    color?: TagColor;
    closable?: boolean;
    onClose?: () => void;
    /** The remove button's accessible name, "Remove <text>" (or "Remove tag") by default. Pass the application's words. */
    removeLabel?: string;
    children?: ReactNode;
}
export declare function Tag({ color, closable, onClose, removeLabel, className, children, ...rest }: TagProps): import("react").JSX.Element;
//# sourceMappingURL=Tag.d.ts.map