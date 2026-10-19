import {
  createContext,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

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

const ConfigContext = createContext<ConfigContextValue | null>(null);
const EMPTY_TOKENS: Record<string, string> = {};
const DEFAULT_CONFIG: ConfigContextValue = {
  theme: "light",
  density: "desk",
  tokens: EMPTY_TOKENS,
  locale: "en-US",
  direction: "ltr",
};

const normalizeTokenEntries = (
  tokens: Record<string, string>,
): Record<string, string> =>
  Object.fromEntries(
    Object.entries(tokens).map(([key, value]) => [
      key.startsWith("--") ? key : `--su-${key}`,
      value,
    ]),
  );

export function ConfigProvider({
  children,
  theme: themeProp,
  density: densityProp,
  locale: localeProp,
  direction: directionProp,
  tokens = EMPTY_TOKENS,
  target,
  className,
  style,
}: ConfigProviderProps) {
  const parent = useContext(ConfigContext);
  const wrapper = useRef<HTMLDivElement>(null);
  const theme = themeProp ?? parent?.theme ?? "light";
  const density = densityProp ?? parent?.density ?? "desk";
  // Every provider element carries `data-theme`, which re-declares the desk sizes, so a nested
  // provider under a handheld one must repeat `data-density` itself. Desk by default writes nothing.
  const densityAttr =
    densityProp !== undefined || density === "handheld" ? density : undefined;
  const locale = localeProp ?? parent?.locale ?? "en-US";
  const direction = directionProp ?? parent?.direction ?? "ltr";
  const normalized = useMemo(() => normalizeTokenEntries(tokens), [tokens]);
  const value = useMemo(
    () => ({
      theme,
      density,
      locale,
      direction,
      tokens: { ...parent?.tokens, ...normalized },
    }),
    [theme, density, locale, direction, normalized, parent],
  );

  useLayoutEffect(() => {
    const el = target ?? (parent ? wrapper.current : document.documentElement);
    if (!el) return;
    const previousAttributes = ["data-theme", "data-density", "lang", "dir"].map(
      (name) => [name, el.getAttribute(name)] as const,
    );
    el.setAttribute("data-theme", theme);
    if (densityAttr) el.setAttribute("data-density", densityAttr);
    el.setAttribute("lang", locale);
    el.setAttribute("dir", direction);

    const previous: Array<[string, string]> = [];
    for (const [key, val] of Object.entries(normalized)) {
      previous.push([key, el.style.getPropertyValue(key)]);
      el.style.setProperty(key, val);
    }

    return () => {
      for (const [name, old] of previousAttributes) {
        if (old === null) el.removeAttribute(name);
        else el.setAttribute(name, old);
      }
      for (const [key, val] of previous) {
        if (val) el.style.setProperty(key, val);
        else el.style.removeProperty(key);
      }
    };
  }, [theme, densityAttr, locale, direction, normalized, target, !!parent]);

  // A root provider already themes <html> from the effect above, so the wrapper
  // element only earns its place for subtree scoping or caller-supplied styling.
  if (!parent && !className && !style)
    return (
      <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
    );

  return (
    <ConfigContext.Provider value={value}>
      {/* Radix primitives read direction from this context, not from the `dir` attribute. */}
      <DirectionProvider dir={direction}>
        <div
          ref={wrapper}
          className={className}
          style={{ ...normalized, ...style }}
          data-theme={theme}
          data-density={densityAttr}
          lang={locale}
          dir={direction}
          data-su-config=""
        >
          {children}
        </div>
      </DirectionProvider>
    </ConfigContext.Provider>
  );
}

export function useConfig(): ConfigContextValue {
  return useContext(ConfigContext) ?? DEFAULT_CONFIG;
}
