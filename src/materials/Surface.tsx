import { forwardRef } from "react";
import type { ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

export type SurfaceTone =
  | "system"
  | "systemSecondary"
  | "systemTertiary"
  | "grouped"
  | "groupedSecondary"
  | "groupedTertiary"
  | "fill"
  | "fillSecondary"
  | "fillTertiary"
  | "fillQuaternary";

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

// Legacy variable names on purpose: they alias onto the v2 ramp in tokens.css, and a consumer's
// ConfigProvider `tokens` override of, say, `bg-secondary` keeps working.
const toneClass: Record<SurfaceTone, string> = {
  system: "bg-[var(--su-bg)] text-ink",
  systemSecondary: "bg-[var(--su-bg-secondary)] text-ink",
  systemTertiary: "bg-[var(--su-bg-tertiary)] text-ink",
  grouped: "bg-[var(--su-bg-grouped)] text-ink",
  groupedSecondary: "bg-[var(--su-bg-grouped-secondary)] text-ink",
  groupedTertiary: "bg-[var(--su-bg-grouped-tertiary)] text-ink",
  fill: "bg-fill text-ink",
  fillSecondary: "bg-fill-secondary text-ink",
  fillTertiary: "bg-fill-tertiary text-ink",
  fillQuaternary: "bg-fill-quaternary text-ink",
};

const radiusClass: Record<SurfaceRadius, string | undefined> = {
  none: undefined,
  sm: "rounded-su-tag",
  md: "rounded-su-control",
  lg: "rounded-su-surface",
  xl: "rounded-su-surface",
};

const elevationClass: Record<Exclude<SurfaceElevation, "none">, string> = {
  "1": "border border-solid border-border",
  "2": "border border-solid border-border-strong",
};

/** Content-layer surface. Prefer this over Glass for page content. */
export const Surface = forwardRef<HTMLElement, SurfaceProps>(function Surface(
  {
    as: Comp = "div",
    tone = "system",
    radius = "none",
    elevation = "none",
    className,
    children,
    ...rest
  },
  ref,
) {
  return (
    <Comp
      ref={ref}
      // Native <button>/<input> would otherwise submit and round on iOS.
      type={Comp === "button" ? "button" : undefined}
      className={cn(
        toneClass[tone],
        radiusClass[radius],
        elevation !== "none" && elevationClass[elevation],
        className,
      )}
      {...rest}
    >
      {children}
    </Comp>
  );
});
