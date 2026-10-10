import { jsx as k } from "react/jsx-runtime";
import { useRef as d, useEffect as m } from "react";
import { useConfig as w } from "../../ConfigProvider.js";
import { cn as _ } from "../../utils/cn.js";
import { shaderPalette as h } from "./palette.js";
const y = {
  dither: () => import("./light-field/dither.webgl.js"),
  pure: () => import("./light-field/pure.webgl.js"),
  grain: () => import("./light-field/grain.webgl.js"),
  halftone: () => import("./light-field/halftone.webgl.js")
};
function f(o) {
  return getComputedStyle(o).colorScheme.includes("dark") ? "dark" : "light";
}
function T({
  variant: o = "dither",
  theme: a,
  autoplay: u = !0,
  onError: c,
  className: g,
  style: p,
  ...v
}) {
  const s = d(null), i = d(null), { theme: b } = w();
  return m(() => {
    const r = s.current;
    if (!r) return;
    const e = new AbortController(), n = (t) => c == null ? void 0 : c(t instanceof Error ? t : new Error(String(t)));
    return y[o]().then(({ createShader: t }) => {
      e.signal.aborted || (i.current = t(r, {
        theme: a ?? f(r),
        background: { light: h.paper, dark: h.paperDark },
        autoplay: u,
        signal: e.signal,
        onError: n
      }));
    }).catch(n), () => {
      e.abort(), i.current = null;
    };
  }, [o, u]), m(() => {
    const r = s.current;
    if (!r) return;
    const e = () => {
      var l;
      return (l = i.current) == null ? void 0 : l.setTheme(a ?? f(r));
    };
    e();
    const n = window.matchMedia("(prefers-color-scheme: dark)"), t = new MutationObserver(e);
    return n.addEventListener("change", e), t.observe(document.documentElement, { attributes: !0, attributeFilter: ["data-theme"] }), () => {
      n.removeEventListener("change", e), t.disconnect();
    };
  }, [a, b]), /* @__PURE__ */ k(
    "canvas",
    {
      ref: s,
      "aria-hidden": "true",
      className: _(
        // Brand guide: before the first frame, and without WebGL2, a gradient of blue-deep and cyan on paper.
        "block w-full rounded-none bg-[radial-gradient(120%_80%_at_20%_100%,var(--su-blue-deep),var(--su-cyan)_45%,var(--su-paper)_80%)]",
        g
      ),
      style: { width: "100%", height: 220, ...p },
      ...v
    }
  );
}
export {
  T as LightField
};
