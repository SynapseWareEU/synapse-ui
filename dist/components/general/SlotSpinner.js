import { jsx as p } from "react/jsx-runtime";
import { useSyncExternalStore as S } from "react";
import { cn as a } from "../../utils/cn.js";
const f = [
  "receiving",
  "onhand",
  "counted",
  "onhand",
  "allocated",
  "picking"
], t = [0, 1, 2, 5, 8, 7, 6, 3], C = [
  "onhand",
  "onhand",
  "allocated",
  "picking",
  "counted",
  "onhand",
  "receiving",
  "allocated"
], k = {
  receiving: "bg-s-receiving",
  onhand: "bg-s-onhand",
  allocated: "bg-s-allocated",
  picking: "bg-s-picking",
  counted: "bg-s-counted"
}, w = {
  sm: "grid-cols-[repeat(3,4px)] gap-px [&>span]:size-[4px]",
  md: "grid-cols-[repeat(3,6px)] gap-px [&>span]:size-[6px]",
  lg: "grid-cols-[repeat(3,8px)] gap-[2px] [&>span]:size-[8px]"
}, T = "[transition:background-color_140ms_var(--su-ease-step)]", _ = "bg-rule contrast-more:bg-ink-3 forced-colors:bg-[Canvas] forced-colors:outline forced-colors:outline-1 forced-colors:outline-[GrayText]", y = "bg-[color-mix(in_srgb,var(--su-on-action)_28%,transparent)] contrast-more:bg-[color-mix(in_srgb,var(--su-on-action)_45%,transparent)] forced-colors:bg-[Canvas] forced-colors:outline forced-colors:outline-1 forced-colors:outline-[GrayText]", E = "contrast-more:bg-accent forced-colors:bg-[CanvasText]", z = "bg-on-action forced-colors:bg-[CanvasText]";
let u = 0, i;
const o = /* @__PURE__ */ new Set(), n = typeof window > "u" ? null : window.matchMedia("(prefers-reduced-motion: reduce)");
function d() {
  for (const e of o) e();
}
function I(e) {
  return o.add(e), o.size === 1 && (i = window.setInterval(() => {
    document.hidden || (u += 1, d());
  }, 140), n == null || n.addEventListener("change", d)), () => {
    o.delete(e), o.size === 0 && (window.clearInterval(i), i = void 0, n == null || n.removeEventListener("change", d));
  };
}
const N = () => n != null && n.matches ? -1 : u, O = () => 0;
function R({
  size: e = "md",
  className: m,
  onAction: l = !1
}) {
  const r = S(I, N, O), c = r < 0, h = c ? -1 : t[r % t.length], b = f[Math.floor(Math.max(r, 0) / t.length) % f.length];
  return /* @__PURE__ */ p(
    "span",
    {
      dir: "ltr",
      className: a("inline-grid shrink-0 align-middle", w[e], m),
      "aria-hidden": "true",
      children: Array.from({ length: 9 }, (G, s) => {
        const g = t.indexOf(s), x = c ? g >= 0 : s === h, v = c ? C[g] : b;
        return /* @__PURE__ */ p(
          "span",
          {
            className: a(
              T,
              x ? l ? z : a(k[v], E) : l ? y : _
            )
          },
          s
        );
      })
    }
  );
}
export {
  R as SlotSpinner
};
