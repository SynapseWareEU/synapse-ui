import { type CSSProperties, type ReactNode } from "react";
export type ThemeMode = "light" | "dark";
/** Control density. `handheld` re-sizes generic controls for the 390-wide terminal (56/64 heights, 17px body). */
export type ConfigDensity = "desk" | "handheld";
export interface ConfigProviderProps {
    children: ReactNode;
    locale?: string;
    direction?: "ltr" | "rtl";
    /** Sets `data-theme` on the target element. Default: light */
    theme?: ThemeMode;
    /**
     * Sets `data-density` on the target element. Inherited by nested providers. Default: desk
     * (no attribute is written unless the prop is set, or a parent provider is handheld).
     */
    density?: ConfigDensity;
    /** CSS variable overrides keyed as `--su-*` or without the prefix */
    tokens?: Record<string, string>;
    /** Element that receives theme + token styles. Default: document.documentElement */
    target?: HTMLElement | null;
    className?: string;
    style?: CSSProperties;
}
interface ConfigContextValue {
    locale: string;
    direction: "ltr" | "rtl";
    theme: ThemeMode;
    density: ConfigDensity;
    tokens: Record<string, string>;
}
export declare function ConfigProvider({ children, theme: themeProp, density: densityProp, locale: localeProp, direction: directionProp, tokens, target, className, style, }: ConfigProviderProps): import("react").JSX.Element;
export declare function useConfig(): ConfigContextValue;
export {};
//# sourceMappingURL=ConfigProvider.d.ts.map