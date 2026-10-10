import { jsxs as i, jsx as m } from "react/jsx-runtime";
import { forwardRef as p } from "react";
import { cn as e } from "../utils/cn.js";
import { chromeRimClass as v } from "./Chrome.js";
const o = "backdrop-blur-[var(--su-glass-blur)] backdrop-saturate-[var(--su-glass-saturate)] transparency-reduce:backdrop-filter-none contrast-more:backdrop-filter-none", j = e(
  "bg-[var(--su-glass-bg)] transparency-reduce:bg-[var(--su-glass-solid)] contrast-more:bg-surface",
  o
);
function f({
  as: t,
  variant: n = "regular",
  elevated: l = !1,
  dim: c = !1,
  radius: y = "md",
  chrome: r = "none",
  className: d,
  children: b,
  ...u
}, g) {
  const a = t ?? "div", s = n === "clear";
  return /* @__PURE__ */ i(
    a,
    {
      ref: g,
      type: a === "button" ? "button" : void 0,
      className: e(
        "relative isolate text-ink",
        o,
        // One background per branch: `cn()` is a plain join, so a later class never "overrides".
        s ? "bg-[var(--su-glass-clear-bg)] transparency-reduce:bg-[var(--su-glass-clear-solid)] contrast-more:bg-surface" : l ? "bg-[var(--su-glass-bg-elevated)] transparency-reduce:bg-[var(--su-glass-solid)] contrast-more:bg-surface" : "bg-[var(--su-glass-bg)] transparency-reduce:bg-[var(--su-glass-solid)] contrast-more:bg-surface",
        s ? (
          // Translucency implies its own edge; in contrast mode it's gone, so draw one.
          "contrast-more:border contrast-more:border-solid contrast-more:border-border"
        ) : (
          // su-chrome already rings all 4 sides, so when chrome is on there's no
          // manual hairline to double up with.
          r === "none" && "border-b border-b-solid border-b-border"
        ),
        r !== "none" && v[r],
        d
      ),
      ...u,
      children: [
        s && c ? /* @__PURE__ */ m(
          "span",
          {
            "aria-hidden": !0,
            className: "absolute inset-0 z-[-1] bg-[var(--su-glass-clear-dim)] pointer-events-none transparency-reduce:hidden contrast-more:hidden"
          }
        ) : null,
        b
      ]
    }
  );
}
const G = p(f);
export {
  G as Glass,
  j as glassHeaderClass
};
