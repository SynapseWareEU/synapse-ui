import type { CSSProperties, HTMLAttributes, SVGAttributes } from "react";
import { cn } from "../../utils/cn";

export type IconSize = "sm" | "md" | "lg";

/** Defaults for a bare @tabler/icons-react glyph rendered outside <Icon>: v2 stroke, round caps and joins. */
export const iconDefaults = {
  stroke: 1.75,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

/**
 * One table for the scale (v2 §3): `sm` 14 (sort arrows, chip remove, field error), `md` 16 (the
 * default inside 36px controls), `lg` 20 (rail, phone header, palette search). A number renders
 * that many px (18 for 32px icon buttons, 24 for empty states and handheld). The stroke is
 * 1.75 in the 24 viewBox at every size, as drawn. Class strings stay literal so the UnoCSS
 * scanner finds them.
 */
const SIZES = {
  sm: "size-[14px]",
  md: "size-[16px]",
  lg: "size-[20px]",
  inherit: "size-[1em]",
} satisfies Record<IconSize | "inherit", string>;

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

/** Hidden unless something actually names it — `label`, or an aria prop passed through. */
function ariaFor(
  label: string | undefined,
  rest: { "aria-label"?: string; "aria-labelledby"?: string },
) {
  const named = label ?? rest["aria-label"] ?? rest["aria-labelledby"];
  return {
    role: named ? ("img" as const) : undefined,
    "aria-label": label,
    "aria-hidden": named ? undefined : (true as const),
  };
}

const ownSizeRe = /(?:^|\s)!?(?:size|w|h|min-w|min-h|max-w|max-h)-/;

/** Size class and inline box for one `size` value; nothing when the caller sizes it by class. */
function sizing(
  size: IconSize | "inherit" | number,
  className: string | undefined,
  style: CSSProperties | undefined,
): { box?: string; style?: CSSProperties } {
  if (ownSizeRe.test(className ?? "")) return { style };
  if (typeof size === "number") return { style: { width: size, height: size, ...style } };
  return { box: SIZES[size], style };
}

/**
 * Icon box. Sizes its child SVG, sets the v2 stroke (1.75, round caps and joins), and stays out
 * of the way of colour: the glyph is `currentColor`, so the host decides (ink-2 inside
 * controls, ink-3 for chevrons and field adornments).
 *
 * Presentational only — for a clickable icon use `<Button>` with an `aria-label`, which supplies
 * the focus ring, the keyboard path and the 44px touch pad.
 */
export function Icon({ size = "md", className, children, label, style, ...rest }: IconProps) {
  const own = sizing(size, className, style);
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center [vertical-align:-0.125em]",
        // CSS beats SVG presentation attributes, so a glyph's own `stroke` prop is normalised
        // here; a child that deliberately needs another stroke must use a class or style.
        "[&>svg]:block [&>svg]:size-full [&>svg]:[stroke-width:1.75] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]",
        "contrast-more:[&>svg]:[stroke-width:2]",
        own.box,
        className,
      )}
      style={own.style}
      {...ariaFor(label, rest)}
      {...rest}
    >
      {children}
    </span>
  );
}

/** Stroke SVG shell drawn like the Tabler set: 24 viewBox, stroke 1.75, round caps and joins. */
export function SvgIcon({ size = "md", className, children, label, style, ...rest }: SvgIconProps) {
  const own = sizing(size, className, style);
  return (
    <svg
      className={cn("block shrink-0 contrast-more:[stroke-width:2]", own.box, className)}
      style={own.style}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={iconDefaults.stroke}
      strokeLinecap={iconDefaults.strokeLinecap}
      strokeLinejoin={iconDefaults.strokeLinejoin}
      {...ariaFor(label, rest)}
      {...rest}
    >
      {label ? <title>{label}</title> : null}
      {children}
    </svg>
  );
}
