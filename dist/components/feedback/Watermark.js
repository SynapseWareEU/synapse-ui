import { jsxs as W, jsx as M } from "react/jsx-runtime";
import { cn as C } from "../../utils/cn.js";
const y = 13, o = 18, v = 16, E = 0.06, R = 0.6, S = "IBM Plex Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif", T = (s) => s.replace(/[<>&']/g, (t) => `&#${t.charCodeAt(0)};`);
function O({
  content: s = "Watermark",
  gap: t = [120, 120],
  rotate: i = -22,
  offset: I,
  className: b,
  children: f,
  style: u,
  ...w
}) {
  const c = Array.isArray(s) ? s : [s], e = c.map(T), r = c.reduce((a, n) => Math.max(a, n.length), 0) * y * R, l = e.length * o, m = i * Math.PI / 180, h = Math.abs(Math.cos(m)), p = Math.abs(Math.sin(m)), x = Math.ceil(
    Math.max(t[0], 1, r * h + l * p + v)
  ), d = Math.ceil(
    Math.max(t[1], 1, r * p + l * h + v)
  ), A = -((e.length - 1) * o) / 2, N = e.map(
    (a, n) => `<tspan x='50%' dy='${n === 0 ? A : o}'>${a}</tspan>`
  ).join(""), $ = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${x}' height='${d}'><text x='50%' y='50%' fill='black' font-size='${y}' font-weight='400' font-family='${S}' transform='rotate(${i} ${x / 2} ${d / 2})' text-anchor='middle' dominant-baseline='middle'>${N}</text></svg>`
  )}")`, [g, k] = I ?? [t[0] / 2, t[1] / 2], P = {
    WebkitMaskImage: $,
    maskImage: $,
    WebkitMaskRepeat: "repeat",
    maskRepeat: "repeat",
    WebkitMaskPosition: `${g}px ${k}px`,
    maskPosition: `${g}px ${k}px`,
    // The SVG is only a mask (its black is the alpha channel); the colour is the ink token.
    backgroundColor: "var(--su-ink)",
    opacity: E,
    pointerEvents: "none"
  };
  return /* @__PURE__ */ W("div", { className: C("relative", b), style: u, ...w, children: [
    /* @__PURE__ */ M("div", { className: "absolute inset-0", style: P, "aria-hidden": "true" }),
    /* @__PURE__ */ M("div", { className: "relative", children: f })
  ] });
}
export {
  O as Watermark
};
