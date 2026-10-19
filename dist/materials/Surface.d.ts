import type { ElementType, HTMLAttributes, ReactNode } from "react";
export type SurfaceTone = "system" | "systemSecondary" | "systemTertiary" | "grouped" | "groupedSecondary" | "groupedTertiary" | "fill" | "fillSecondary" | "fillTertiary" | "fillQuaternary";
export type SurfaceRadius = "none" | "sm" | "md" | "lg" | "xl";
export type SurfaceElevation = "none" | "1" | "2";
export interface SurfaceProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    /**
     * `system` is the grey app ground (`--su-bg`); `systemSecondary` is the white panel surface,
     * `systemTertiary` the subtle surface-2. The grouped and fill tones alias onto the same ramp.
     */
    tone?: SurfaceTone;
    /** `sm` 4 (tags, chips) · `md` 6 (controls) · `lg`/`xl` 8 (panels, cards). Default square. */
    radius?: SurfaceRadius;
    /** Content stays flat: `1` is a border hairline, `2` a border-strong one. Never a shadow. */
    elevation?: SurfaceElevation;
    children?: ReactNode;
}
/** Content-layer surface. Prefer this over Glass for page content. */
export declare const Surface: import("react").ForwardRefExoticComponent<SurfaceProps & import("react").RefAttributes<HTMLElement>>;
//# sourceMappingURL=Surface.d.ts.map