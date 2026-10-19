import type { HTMLAttributes, Ref } from "react";
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
export declare function Layout({ className, ...rest }: LayoutProps): import("react").JSX.Element;
export declare namespace Layout {
    var Header: typeof import("./Layout").Header;
    var Sider: typeof import("./Layout").Sider;
    var Content: typeof import("./Layout").Content;
    var Footer: typeof import("./Layout").Footer;
}
/** App header: 56 tall, padding 0 16 0 12, gap 12, surface with a bottom border. */
export declare function Header({ className, material, ...rest }: HeaderProps): import("react").JSX.Element;
/**
 * The app rail: 64 wide, full height, surface with an end border. For a wider text sidebar,
 * set the width inline (`style={{ width: 240 }}`), which wins over the class.
 */
export declare function Sider({ className, ...rest }: LayoutProps): import("react").JSX.Element;
/** Page content: padding 24 32 (16 on phones), a column with 16 between blocks. */
export declare function Content({ className, ...rest }: LayoutProps): import("react").JSX.Element;
/** Footer: 44 tall, top border, 13/18 ink-2. */
export declare function Footer({ className, ...rest }: LayoutProps): import("react").JSX.Element;
//# sourceMappingURL=Layout.d.ts.map