import { jsx as e, Fragment as s, jsxs as a } from "react/jsx-runtime";
import { Root as u, Trigger as d, Portal as l, Content as m, Provider as p } from "../../vendor/@radix-ui/react-tooltip/dist/index.js";
function x({
  children: r,
  ...t
}) {
  return /* @__PURE__ */ e(p, { delayDuration: 500, ...t, children: r });
}
function f({
  content: r,
  side: t = "top",
  align: o = "center",
  children: n,
  ...i
}) {
  return r == null || r === "" ? /* @__PURE__ */ e(s, { children: n }) : /* @__PURE__ */ a(u, { ...i, children: [
    /* @__PURE__ */ e(d, { asChild: !0, children: n }),
    /* @__PURE__ */ e(l, { children: /* @__PURE__ */ e(
      m,
      {
        side: t,
        align: o,
        sideOffset: 6,
        className: "z-[var(--su-z-dropdown)] max-w-[240px] py-su1 px-su2 rounded-su-tag bg-inverse text-inverse-ink font-sans text-small font-normal text-start [overflow-wrap:anywhere] [&_kbd]:bg-[color-mix(in_srgb,var(--su-inverse-ink)_16%,transparent)] [&_kbd]:text-inverse-ink animate-su-tip-in motion-reduce:animate-none",
        children: r
      }
    ) })
  ] });
}
f.Provider = x;
export {
  f as Tooltip,
  x as TooltipProvider
};
