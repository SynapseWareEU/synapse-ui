import { jsx as e, jsxs as n, Fragment as j } from "react/jsx-runtime";
import { cn as s } from "../../utils/cn.js";
import { HH_STROKE as F, hhTransition as G } from "./shared.js";
import H from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
const T = s(
  "m-0 border-0 rounded-[var(--su-hh-radius)] bg-transparent",
  "text-ink no-underline su-focus-ring cursor-pointer",
  G
), K = s(T, "[@media(hover:hover)]:hover:bg-fill active:bg-border"), M = s(
  T,
  "[@media(hover:hover)]:hover:enabled:bg-fill active:enabled:bg-border",
  "disabled:cursor-not-allowed disabled:text-ink-3"
), O = (l, r) => `Step ${l} of ${r}`;
function Q({
  flow: l,
  flowAs: r = "span",
  step: z = 0,
  total: t = 0,
  stepLabel: S = O,
  onBack: i,
  backHref: o,
  backLabel: L = "Menu",
  backAriaLabel: x,
  backDisabled: b = !1,
  brand: c,
  brandIcon: d,
  site: u,
  user: h,
  onSessionClick: m,
  sessionAriaLabel: _,
  sessionDisabled: g = !1,
  className: $,
  ...A
}) {
  const N = t > 0, f = Math.min(Math.max(Math.trunc(z), 0), t), k = /* @__PURE__ */ n(j, { children: [
    /* @__PURE__ */ e(H, { size: 22, stroke: F, "aria-hidden": !0, className: "shrink-0" }),
    /* @__PURE__ */ e("span", { className: "text-hh-body", children: L })
  ] }), v = "flex items-center shrink-0 gap-[6px] h-su10 pl-su2 pr-su3 font-sans";
  let a = null;
  o && !b ? a = /* @__PURE__ */ e(
    "a",
    {
      href: o,
      onClick: i,
      "aria-label": x,
      className: s(K, v),
      children: k
    }
  ) : i || o ? a = /* @__PURE__ */ e(
    "button",
    {
      type: "button",
      onClick: i,
      disabled: b,
      "aria-label": x,
      className: s(M, v),
      children: k
    }
  ) : (c || d) && (a = /* @__PURE__ */ n("span", { className: "flex items-center shrink-0 gap-su2 pl-su3 text-ink", children: [
    d ? /* @__PURE__ */ e("span", { "aria-hidden": !0, className: "inline-flex shrink-0 size-[22px] [&>svg]:size-full", children: d }) : null,
    c ? /* @__PURE__ */ e("span", { className: "text-hh-body font-semibold", children: c }) : null
  ] }));
  const B = u != null || h != null, w = m && g ? "text-ink-3" : "text-ink-2", y = /* @__PURE__ */ n(j, { children: [
    u != null ? /* @__PURE__ */ e(
      "span",
      {
        className: s(
          "max-w-full truncate font-mono text-[15px] leading-[20px] font-medium",
          w
        ),
        children: u
      }
    ) : null,
    h != null ? /* @__PURE__ */ e("span", { className: s("max-w-full truncate font-sans text-small", w), children: h }) : null
  ] }), C = "flex flex-col items-end justify-center min-w-0 h-su10 px-su1 text-end";
  return /* @__PURE__ */ n(
    "header",
    {
      className: s(
        "flex flex-col shrink-0 w-full bg-surface text-ink font-sans",
        "border-b border-solid border-border",
        $
      ),
      ...A,
      children: [
        /* @__PURE__ */ n("div", { className: "flex items-center justify-between gap-su2 shrink-0 h-su11 pl-su1 pr-su3", children: [
          a ?? /* @__PURE__ */ e("span", {}),
          B ? m ? /* @__PURE__ */ e(
            "button",
            {
              type: "button",
              onClick: m,
              disabled: g,
              "aria-label": _,
              className: s(M, C),
              children: y
            }
          ) : /* @__PURE__ */ e("div", { className: C, children: y }) : null
        ] }),
        l != null ? /* @__PURE__ */ n("div", { className: "flex flex-col shrink-0 h-[55px] gap-[9px] pt-su2 px-su4", children: [
          /* @__PURE__ */ n("div", { className: "flex items-baseline justify-between gap-su3 min-w-0", children: [
            /* @__PURE__ */ e(r, { className: "m-0 min-w-0 truncate text-hh-flow font-semibold", children: l }),
            N ? /* @__PURE__ */ e("span", { className: "shrink-0 text-hh-step font-medium text-ink-2", children: S(f, t) }) : null
          ] }),
          N ? /* @__PURE__ */ e("div", { "aria-hidden": !0, className: "flex gap-su1 h-su1", children: Array.from({ length: t }, (R, E) => {
            const p = E + 1;
            return /* @__PURE__ */ e(
              "span",
              {
                className: s(
                  "flex-1 h-su1 rounded-su-bar forced-colors:[forced-color-adjust:none]",
                  p < f ? "bg-ink" : p === f ? "bg-action" : "bg-border forced-colors:bg-[GrayText]"
                )
              },
              p
            );
          }) }) : null
        ] }) : null
      ]
    }
  );
}
export {
  Q as HandheldTopBar
};
