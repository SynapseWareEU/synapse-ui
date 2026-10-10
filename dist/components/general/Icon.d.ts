import type { HTMLAttributes, SVGAttributes } from "react";
export type IconSize = "sm" | "md" | "lg";
/** Defaults for a bare @tabler/icons-react glyph rendered outside <Icon>: v2 stroke, round caps and joins. */
export declare const iconDefaults: {
    stroke: number;
    strokeLinejoin: "round";
    strokeLinecap: "round";
};
export interface IconProps extends HTMLAttributes<HTMLSpanElement> {
    /**
     * `sm` 14 / `md` 16 / `lg` 20, a number of px, or `inherit` to track the surrounding
     * font-size (1em). A `size-*` / `w-*` / `h-*` class in `className` wins instead (the built-in
     * size is dropped), because `cn()` does not resolve conflicts and UnoCSS decides the order.
     */
    size?: IconSize | "inherit" | number;
    /** Accessible name. Omit for decorative icons — they are `aria-hidden` by default. */
    label?: string;
}
export interface SvgIconProps extends SVGAttributes<SVGElement> {
    size?: IconSize | "inherit" | number;
    /** Accessible name. Omit for decorative icons — they are `aria-hidden` by default. */
    label?: string;
}
/**
 * Icon box. Sizes its child SVG, sets the v2 stroke (1.75, round caps and joins), and stays out
 * of the way of colour: the glyph is `currentColor`, so the host decides (ink-2 inside
 * controls, ink-3 for chevrons and field adornments).
 *
 * Presentational only — for a clickable icon use `<Button>` with an `aria-label`, which supplies
 * the focus ring, the keyboard path and the 44px touch pad.
 */
export declare function Icon({ size, className, children, label, style, ...rest }: IconProps): import("react").JSX.Element;
/** Stroke SVG shell drawn like the Tabler set: 24 viewBox, stroke 1.75, round caps and joins. */
export declare function SvgIcon({ size, className, children, label, style, ...rest }: SvgIconProps): import("react").JSX.Element;
//# sourceMappingURL=Icon.d.ts.map