import type { ElementType, HTMLAttributes, ReactNode, Ref } from "react";
export type ChromeStrength = "subtle" | "default" | "strong";
export interface ChromeProps extends HTMLAttributes<HTMLElement> {
    as?: ElementType;
    strength?: ChromeStrength;
    children?: ReactNode;
    /** React 19 forwards `ref` as an ordinary prop through `{...rest}`. */
    ref?: Ref<HTMLElement>;
}
/**
 * Strength -> rim class. Exported so Glass (and any other surface with a
 * `chrome` prop) uses one source of truth instead of re-declaring the map.
 *
 * "subtle" intentionally equals "default": the system has two hairline weights
 * (--su-border / --su-border-strong), not three. Don't invent a third.
 */
export declare const chromeRimClass: Record<ChromeStrength, string>;
/**
 * Draws a 1px hairline edge (--su-border / --su-border-strong, via box-shadow so it
 * adds nothing to layout) around a surface someone else sizes — usually Glass.
 *
 * Not a material tier and not a gloss: no specular rims, no gradients, no glow.
 * The ring is a box-shadow, so it follows whatever radius the host sets; Chrome
 * sets none of its own.
 */
export declare function Chrome({ as: Comp, strength, className, children, ...rest }: ChromeProps): import("react").JSX.Element;
//# sourceMappingURL=Chrome.d.ts.map