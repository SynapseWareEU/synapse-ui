import type { HTMLAttributes, Ref } from "react";
import { glassHeaderClass } from "../../materials/Glass";
import { cn } from "../../utils/cn";

export interface LayoutProps extends HTMLAttributes<HTMLDivElement> {
  /** React 19 forwards `ref` as an ordinary prop through `{...rest}`. */
  ref?: Ref<HTMLDivElement>;
}

/** `"solid"` (default): opaque surface. `"glass"`: the optional translucent header material. */
export type HeaderMaterial = "solid" | "glass";

export interface HeaderProps extends LayoutProps {
  /**
   * Opt-in glass, only for a sticky header that content genuinely scrolls under (make it
   * sticky yourself, e.g. `className="sticky top-0 z-[var(--su-z-sticky)]"`). Turns opaque
   * under reduced transparency and increased contrast. Never use it on content or overlays.
   */
  material?: HeaderMaterial;
}

/** The v2 shell: white header and rail with 1px borders on the grey ground. */
export function Layout({ className, ...rest }: LayoutProps) {
  return (
    <div
      // `:has(> aside)` replaces Ant's LayoutContext + sider registry + hasSider
      // prop; `:has()` takes its argument's specificity so it beats `flex-col`
      // regardless of stylesheet order.
      // ponytail: only direct-child Siders flip the axis — add a `hasSider`
      // prop if someone wraps their Sider in another element.
      className={cn(
        "flex flex-col has-[>aside]:flex-row flex-auto min-h-full bg-bg",
        className,
      )}
      {...rest}
    />
  );
}

/** App header: 56 tall, padding 0 16 0 12, gap 12, surface with a bottom border. */
export function Header({ className, material = "solid", ...rest }: HeaderProps) {
  return (
    <header
      className={cn(
        "shrink-0 flex items-center gap-su3 min-h-[var(--su-nav-height)] ps-su3 pe-su4",
        "border-b border-b-solid border-b-border text-ink",
        material === "glass" ? glassHeaderClass : "bg-surface",
        className,
      )}
      {...rest}
    />
  );
}

/**
 * The app rail: 64 wide, full height, surface with an end border. For a wider text sidebar,
 * set the width inline (`style={{ width: 240 }}`), which wins over the class.
 */
export function Sider({ className, ...rest }: LayoutProps) {
  return (
    <aside
      className={cn(
        "shrink-0 w-[var(--su-rail-width)] bg-surface border-e border-e-solid border-e-border",
        className,
      )}
      {...rest}
    />
  );
}

/** Page content: padding 24 32 (16 on phones), a column with 16 between blocks. */
export function Content({ className, ...rest }: LayoutProps) {
  // <main> gives the shell its landmark. A nested Content should pass
  // role="region" + aria-label to avoid a duplicate main.
  return (
    <main
      className={cn(
        "flex-1 min-w-0 min-h-0 flex flex-col gap-[var(--su-gap-block)]",
        "p-[var(--su-page-pad-phone)] md:px-[var(--su-page-pad-x)] md:py-[var(--su-page-pad-y)]",
        className,
      )}
      {...rest}
    />
  );
}

/** Footer: 44 tall, top border, 13/18 ink-2. */
export function Footer({ className, ...rest }: LayoutProps) {
  return (
    <footer
      className={cn(
        "shrink-0 min-h-[var(--su-panel-footer)] px-su4 py-su3",
        "border-t border-t-solid border-t-border text-small text-ink-2",
        className,
      )}
      {...rest}
    />
  );
}

Layout.Header = Header;
Layout.Sider = Sider;
Layout.Content = Content;
Layout.Footer = Footer;
