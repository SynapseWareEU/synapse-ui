import type { HTMLAttributes, ReactNode } from "react";
export interface TimelineItem {
    title?: ReactNode;
    description?: ReactNode;
    /** Replaces the 8px dot, e.g. with a 16 icon. Drawn in the tone's text colour. */
    dot?: ReactNode;
    color?: "default" | "accent" | "success" | "warning" | "danger";
}
export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
    items: TimelineItem[];
    pending?: ReactNode;
}
export declare function Timeline({ items, pending, className, ...rest }: TimelineProps): import("react").JSX.Element;
//# sourceMappingURL=Timeline.d.ts.map