import { jsxs as s, jsx as e, Fragment as y } from "react/jsx-runtime";
import { cn as n } from "../../utils/cn.js";
import { hhTransition as _, HH_STROKE as $ } from "./shared.js";
import E from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
const C = n(
  "m-0 border-0 rounded-[var(--su-hh-radius)] bg-transparent",
  "text-ink no-underline su-focus-ring cursor-pointer",
  "[@media(hover:hover)]:hover:bg-fill active:bg-border",
  _
), F = (l, a) => `Step ${l} of ${a}`;
function q({
  flow: l,
  step: a = 0,
  total: t = 0,
  stepLabel: j = F,
  onBack: i,
  backHref: f,
  backLabel: w = "Menu",
  backAriaLabel: p,
  brand: o,
  brandIcon: c,
  site: u,
  user: h,
  onSessionClick: x,
  sessionAriaLabel: M,
  className: S,
  ...T
}) {
  const b = t > 0, d = Math.min(Math.max(Math.trunc(a), 0), t), g = /* @__PURE__ */ s(y, { children: [
    /* @__PURE__ */ e(E, { size: 22, stroke: $, "aria-hidden": !0, className: "shrink-0" }),
    /* @__PURE__ */ e("span", { className: "text-hh-body", children: w })
  ] }), N = n(C, "flex items-center gap-[6px] h-su10 pl-su2 pr-su3 font-sans");
  let r = null;
  f ? r = /* @__PURE__ */ e("a", { href: f, onClick: i, "aria-label": p, className: N, children: g }) : i ? r = /* @__PURE__ */ e("button", { type: "button", onClick: i, "aria-label": p, className: N, children: g }) : (o || c) && (r = /* @__PURE__ */ s("span", { className: "flex items-center gap-su2 pl-su3 text-ink", children: [
    c ? /* @__PURE__ */ e("span", { "aria-hidden": !0, className: "inline-flex shrink-0 size-[22px] [&>svg]:size-full", children: c }) : null,
    o ? /* @__PURE__ */ e("span", { className: "text-hh-body font-semibold", children: o }) : null
  ] }));
  const z = u != null || h != null, k = /* @__PURE__ */ s(y, { children: [
    u != null ? /* @__PURE__ */ e("span", { className: "font-mono text-[15px] leading-[20px] font-medium text-ink-2", children: u }) : null,
    h != null ? /* @__PURE__ */ e("span", { className: "font-sans text-small text-ink-2", children: h }) : null
  ] }), v = "flex flex-col items-end justify-center h-su10 px-su1 text-end";
  return /* @__PURE__ */ s(
    "header",
    {
      className: n(
        "flex flex-col shrink-0 w-full bg-surface text-ink font-sans",
        "border-b border-solid border-border",
        S
      ),
      ...T,
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center justify-between shrink-0 h-su11 pl-su1 pr-su3", children: [
          r ?? /* @__PURE__ */ e("span", {}),
          z ? x ? /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: x,
              "aria-label": M,
              className: n(C, v),
              children: k
            }
          ) : /* @__PURE__ */ e("div", { className: v, children: k }) : null
        ] }),
        l != null ? /* @__PURE__ */ s("div", { className: "flex flex-col shrink-0 h-[55px] gap-[9px] pt-su2 px-su4", children: [
          /* @__PURE__ */ s("div", { className: "flex items-baseline justify-between gap-su3 min-w-0", children: [
            /* @__PURE__ */ e("span", { className: "min-w-0 truncate text-hh-flow font-semibold", children: l }),
            b ? /* @__PURE__ */ e("span", { className: "shrink-0 text-hh-step font-medium text-ink-2", children: j(d, t) }) : null
          ] }),
          b ? /* @__PURE__ */ e("div", { "aria-hidden": !0, className: "flex gap-su1 h-su1", children: Array.from({ length: t }, (G, H) => {
            const m = H + 1;
            return /* @__PURE__ */ e(
              "span",
              {
                className: n(
                  "flex-1 h-su1 rounded-su-bar forced-colors:[forced-color-adjust:none]",
                  m < d ? "bg-ink" : m === d ? "bg-action" : "bg-border forced-colors:bg-[GrayText]"
                )
              },
              m
            );
          }) }) : null
        ] }) : null
      ]
    }
  );
}
export {
  q as HandheldTopBar
};
