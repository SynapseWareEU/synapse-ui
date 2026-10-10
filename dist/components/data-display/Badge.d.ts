import type { HTMLAttributes, ReactNode } from "react";
/** `default` is the neutral pill (the v1 name, kept). */
export type BadgeVariant = "default" | "neutral" | "accent" | "info" | "success" | "warning" | "danger";
export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    count?: number;
    dot?: boolean;
    max?: number;
    showZero?: boolean;
    variant?: BadgeVariant;
    children?: ReactNode;
}
export declare function Badge({ count, dot, max, showZero, variant, className, children, title, ...rest }: BadgeProps): import("react").JSX.Element;
//# sourceMappingURL=Badge.d.ts.map