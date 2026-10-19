import { jsx as l, jsxs as m } from "react/jsx-runtime";
import { cn as a } from "../../utils/cn.js";
const c = {
  stroke: 1.75,
  strokeLinejoin: "round",
  strokeLinecap: "round"
}, k = {
  sm: "size-[14px]",
  md: "size-[16px]",
  lg: "size-[20px]",
  inherit: "size-[1em]"
};
function u(n, e) {
  const o = n ?? e["aria-label"] ?? e["aria-labelledby"];
  return {
    role: o ? "img" : void 0,
    "aria-label": n,
    "aria-hidden": o ? void 0 : !0
  };
}
const h = /(?:^|\s)!?(?:size|w|h|min-w|min-h|max-w|max-h)-/;
function d(n, e, o) {
  return h.test(e ?? "") ? { style: o } : typeof n == "number" ? { style: { width: n, height: n, ...o } } : { box: k[n], style: o };
}
function x({ size: n = "md", className: e, children: o, label: i, style: s, ...t }) {
  const r = d(n, e, s);
  return /* @__PURE__ */ l(
    "span",
    {
      className: a(
        "inline-flex shrink-0 items-center justify-center [vertical-align:-0.125em]",
        // CSS beats SVG presentation attributes, so a glyph's own `stroke` prop is normalised
        // here; a child that deliberately needs another stroke must use a class or style.
        "[&>svg]:block [&>svg]:size-full [&>svg]:[stroke-width:1.75] [&>svg]:[stroke-linecap:round] [&>svg]:[stroke-linejoin:round]",
        "contrast-more:[&>svg]:[stroke-width:2]",
        r.box,
        e
      ),
      style: r.style,
      ...u(i, t),
      ...t,
      children: o
    }
  );
}
function p({ size: n = "md", className: e, children: o, label: i, style: s, ...t }) {
  const r = d(n, e, s);
  return /* @__PURE__ */ m(
    "svg",
    {
      className: a("block shrink-0 contrast-more:[stroke-width:2]", r.box, e),
      style: r.style,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: c.stroke,
      strokeLinecap: c.strokeLinecap,
      strokeLinejoin: c.strokeLinejoin,
      ...u(i, t),
      ...t,
      children: [
        i ? /* @__PURE__ */ l("title", { children: i }) : null,
        o
      ]
    }
  );
}
export {
  x as Icon,
  p as SvgIcon,
  c as iconDefaults
};
