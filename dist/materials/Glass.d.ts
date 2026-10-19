import type { ComponentPropsWithRef, ElementType, ReactElement, ReactNode } from "react";
import { type ChromeStrength as ChromeRimStrength } from "./Chrome";
export type GlassVariant = "regular" | "clear";
export type GlassRadius = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
/** Chrome's rim strengths plus "none" (Glass can opt out; Chrome always draws). */
export type ChromeStrength = ChromeRimStrength | "none";
type GlassOwnProps<C extends ElementType> = {
    as?: C;
    variant?: GlassVariant;
    /** Uses --su-glass-bg-elevated instead of --su-glass-bg. Never a shadow. */
    elevated?: boolean;
    /** Clear glass only: dim backdrop for legibility over bright media */
    dim?: boolean;
    /** Kept for API only: glass is a header material, and headers are square. */
    radius?: GlassRadius;
    chrome?: ChromeStrength;
    children?: ReactNode;
};
/**
 * Polymorphic: `as` also types that element's native props and `ref`.
 *
 * Legibility: text placed directly in Glass sits over a blurred, moving
 * backdrop — use ink and ink-2 only, never ink-3.
 */
export type GlassProps<C extends ElementType = "div"> = GlassOwnProps<C> & Omit<ComponentPropsWithRef<C>, keyof GlassOwnProps<C>>;
/**
 * The glass recipe for a sticky header (`<Header material="glass">`): translucent surface plus
 * blur, falling back to the opaque surface under reduced transparency and increased contrast.
 * Internal (not re-exported from the package), so Layout and Glass share one recipe.
 */
export declare const glassHeaderClass: string;
/**
 * Optional header material, off by default. The v2 header, rail and phone header are opaque
 * surface with a 1px border; glass is only for a sticky header that content genuinely scrolls
 * under (prefer `<Header material="glass">`). Never on content, never stacked, never on
 * overlays (overlays are opaque surface-overlay + shadow). Turns opaque under
 * `prefers-reduced-transparency` and `prefers-contrast: more`.
 */
export declare const Glass: <C extends ElementType = "div">(props: GlassProps<C>) => ReactElement;
export {};
//# sourceMappingURL=Glass.d.ts.map