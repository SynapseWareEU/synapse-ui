import { forwardRef } from "react";
import type { ComponentPropsWithRef, ElementType, ReactElement, ReactNode, Ref } from "react";
import { cn } from "../utils/cn";
import { chromeRimClass, type ChromeStrength as ChromeRimStrength } from "./Chrome";

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
export type GlassProps<C extends ElementType = "div"> = GlassOwnProps<C> &
  Omit<ComponentPropsWithRef<C>, keyof GlassOwnProps<C>>;

/** Blur + saturate, dropped whenever the surface turns opaque. */
const blurClass =
  "backdrop-blur-[var(--su-glass-blur)] backdrop-saturate-[var(--su-glass-saturate)] " +
  "transparency-reduce:backdrop-filter-none contrast-more:backdrop-filter-none";

/**
 * The glass recipe for a sticky header (`<Header material="glass">`): translucent surface plus
 * blur, falling back to the opaque surface under reduced transparency and increased contrast.
 * Internal (not re-exported from the package), so Layout and Glass share one recipe.
 */
export const glassHeaderClass = cn(
  "bg-[var(--su-glass-bg)] transparency-reduce:bg-[var(--su-glass-solid)] contrast-more:bg-surface",
  blurClass,
);

function GlassImpl(
  {
    as,
    variant = "regular",
    elevated = false,
    dim = false,
    radius: _radius = "md",
    chrome = "none",
    className,
    children,
    ...rest
  }: GlassProps<ElementType>,
  ref: Ref<Element>,
) {
  const Comp: ElementType = as ?? "div";
  const isClear = variant === "clear";
  return (
    <Comp
      ref={ref}
      // Native <button> would otherwise default to type="submit".
      type={Comp === "button" ? "button" : undefined}
      className={cn(
        "relative isolate text-ink",
        blurClass,
        // One background per branch: `cn()` is a plain join, so a later class never "overrides".
        isClear
          ? "bg-[var(--su-glass-clear-bg)] transparency-reduce:bg-[var(--su-glass-clear-solid)] contrast-more:bg-surface"
          : elevated
            ? "bg-[var(--su-glass-bg-elevated)] transparency-reduce:bg-[var(--su-glass-solid)] contrast-more:bg-surface"
            : "bg-[var(--su-glass-bg)] transparency-reduce:bg-[var(--su-glass-solid)] contrast-more:bg-surface",
        isClear
          ? // Translucency implies its own edge; in contrast mode it's gone, so draw one.
            "contrast-more:border contrast-more:border-solid contrast-more:border-border"
          : // su-chrome already rings all 4 sides, so when chrome is on there's no
            // manual hairline to double up with.
            chrome === "none" && "border-b border-b-solid border-b-border",
        chrome !== "none" && chromeRimClass[chrome],
        className,
      )}
      {...rest}
    >
      {isClear && dim ? (
        <span
          aria-hidden
          className="absolute inset-0 z-[-1] bg-[var(--su-glass-clear-dim)] pointer-events-none transparency-reduce:hidden contrast-more:hidden"
        />
      ) : null}
      {children}
    </Comp>
  );
}

/**
 * Optional header material, off by default. The v2 header, rail and phone header are opaque
 * surface with a 1px border; glass is only for a sticky header that content genuinely scrolls
 * under (prefer `<Header material="glass">`). Never on content, never stacked, never on
 * overlays (overlays are opaque surface-overlay + shadow). Turns opaque under
 * `prefers-reduced-transparency` and `prefers-contrast: more`.
 */
export const Glass = forwardRef(GlassImpl) as <C extends ElementType = "div">(
  props: GlassProps<C>,
) => ReactElement;
