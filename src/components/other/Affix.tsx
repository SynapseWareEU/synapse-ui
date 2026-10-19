import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface AffixProps extends HTMLAttributes<HTMLDivElement> {
  offsetTop?: number;
  /** Pin to the bottom edge instead of (or as well as) the top. */
  offsetBottom?: number;
  children?: ReactNode;
}

/**
 * Sticks to the top of whichever ancestor scrolls — the window or any
 * scroll container. `position: sticky` also reserves the element's own space,
 * so the content below it never jumps when it pins. Pass `offsetBottom` to pin
 * against the bottom edge (a bottom action bar in a scroll panel) instead.
 *
 * Affix only positions: it has no visuals. What it pins brings its own surface —
 * usually opaque (`bg-surface` plus a 1px border). The one place glass is
 * allowed is a sticky header that content scrolls under (`<Header
 * material="glass">`); don't put a background or blur on Affix itself.
 */
export function Affix({
  offsetTop,
  offsetBottom,
  className,
  children,
  style,
  ...rest
}: AffixProps) {
  return (
    <div
      className={cn("sticky z-[var(--su-z-sticky)]", className)}
      style={{
        top: offsetBottom === undefined ? (offsetTop ?? 0) : offsetTop,
        bottom: offsetBottom,
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
