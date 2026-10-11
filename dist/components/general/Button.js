import { jsx as t } from "react/jsx-runtime";
import { forwardRef as at, useState as st, useEffect as nt } from "react";
import { Slottable as et, Root as rt } from "../../vendor/@radix-ui/react-slot/dist/index.js";
import { cn as o } from "../../utils/cn.js";
import { Icon as x } from "./Icon.js";
import { RingSpinner as ot } from "./RingSpinner.js";
const ut = {
  link: "text",
  text: "text",
  ghost: "ghost",
  dashed: "dashed",
  primary: "primary",
  default: "default"
}, dt = "group relative box-border inline-flex flex-[0_0_auto] max-w-full items-center justify-center gap-[var(--su-btn-gap)] font-sans font-medium tracking-normal [text-decoration-line:none] cursor-pointer aria-busy:cursor-wait disabled:cursor-not-allowed aria-disabled:cursor-not-allowed bg-[var(--su-btn-bg)] text-[var(--su-btn-fg)] border-[color:var(--su-btn-bd)] transition-[background-color,color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] su-focus-ring", bt = "[@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:bg-[var(--su-btn-bg-h,var(--su-btn-bg))] [@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:text-[var(--su-btn-fg-h,var(--su-btn-fg))] [@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:border-[color:var(--su-btn-bd-h,var(--su-btn-bd))] [&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:bg-[var(--su-btn-bg-h,var(--su-btn-bg))] [&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:text-[var(--su-btn-fg-h,var(--su-btn-fg))] [&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:border-[color:var(--su-btn-bd-h,var(--su-btn-bd))] [&:not(:disabled,[aria-disabled=true]):active]:bg-[var(--su-btn-bg-p,var(--su-btn-bg))] [&:not(:disabled,[aria-disabled=true]):active]:text-[var(--su-btn-fg-p,var(--su-btn-fg-h,var(--su-btn-fg)))] [&:not(:disabled,[aria-disabled=true]):active]:border-[color:var(--su-btn-bd-p,var(--su-btn-bd))]", it = "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-action-subtle)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg-h:var(--su-action-subtle-hover)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg-p:var(--su-action-subtle-hover)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-action)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-action-text)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg-h:var(--su-action-text)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg-p:var(--su-action-text)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-action-text)]", m = "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-fill)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-fill)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-ink-3)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-ink-3)]", u = "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-ink-3)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-ink-3)]", V = u + " [&:is(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-border)]", Y = "[--su-spin-track:color-mix(in_srgb,currentColor_30%,transparent)]", lt = {
  primary: {
    base: "[--su-btn-bg:var(--su-action)] [--su-btn-bg-h:var(--su-action-hover)] [--su-btn-bg-p:var(--su-action-press)] [--su-btn-fg:var(--su-on-action)] [--su-btn-bd:transparent] " + Y + " " + m,
    danger: "[--su-btn-bg:var(--su-danger-strong)] [--su-btn-bg-h:var(--su-danger-strong-hover)] [--su-btn-bg-p:var(--su-danger-strong-press)] [--su-btn-fg:var(--su-on-action)] [--su-btn-bd:transparent] " + Y + " " + m
  },
  default: {
    base: "[--su-btn-bg:var(--su-surface)] [--su-btn-bg-h:var(--su-surface-2)] [--su-btn-bg-p:var(--su-fill)] [--su-btn-fg:var(--su-ink)] [--su-btn-bd:var(--su-border-strong)] [--su-btn-ic:var(--su-ink-2)] " + m,
    danger: "[--su-btn-bg:var(--su-surface)] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:var(--su-danger-line)] " + m
  },
  ghost: {
    base: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-fill)] [--su-btn-bg-p:var(--su-border)] [--su-btn-fg:var(--su-ink-2)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:transparent] " + u,
    danger: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:transparent] " + u
  },
  dashed: {
    base: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-surface-2)] [--su-btn-bg-p:var(--su-fill)] [--su-btn-fg:var(--su-ink-2)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:var(--su-border-strong)] " + V,
    danger: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:var(--su-danger-line)] " + V
  },
  text: {
    base: "[--su-btn-bg:transparent] [--su-btn-fg:var(--su-action-text)] [--su-btn-fg-h:var(--su-action-text-hover)] [--su-btn-fg-p:var(--su-action-press)] [--su-btn-bd:transparent] " + u,
    danger: "[--su-btn-bg:transparent] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:transparent] " + u
  }
}, ct = "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-fill)] [--su-btn-bg-p:var(--su-border)] [--su-btn-fg:var(--su-ink-3)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:transparent] " + u, vt = {
  sm: "[--su-btn-h:var(--su-control-xs)] [--su-btn-box:var(--su-control-mini)] [--su-btn-px:10px] [--su-btn-pi:8px] [--su-btn-pt:6px] [--su-btn-gap:6px] [--su-btn-icon:14px] [--su-btn-icon-only:16px]",
  md: "[--su-btn-h:var(--su-control-md)] [--su-btn-box:var(--su-control-sm)] [--su-btn-px:14px] [--su-btn-pi:12px] [--su-btn-pt:8px] [--su-btn-gap:6px] [--su-btn-icon:16px] [--su-btn-icon-only:18px] [[data-density=handheld]_&]:[--su-btn-box:var(--su-hh-control-md)] [[data-density=handheld]_&]:[--su-btn-px:16px] [[data-density=handheld]_&]:[--su-btn-pi:16px] [[data-density=handheld]_&]:[--su-btn-gap:8px] [[data-density=handheld]_&]:[--su-btn-icon:24px] [[data-density=handheld]_&]:[--su-btn-icon-only:24px]",
  lg: "[--su-btn-h:var(--su-control-lg)] [--su-btn-box:var(--su-hit-target)] [--su-btn-px:18px] [--su-btn-pi:16px] [--su-btn-pt:12px] [--su-btn-gap:8px] [--su-btn-icon:20px] [--su-btn-icon-only:20px] [[data-density=handheld]_&]:[--su-btn-box:var(--su-hh-control-lg)] [[data-density=handheld]_&]:[--su-btn-px:16px] [[data-density=handheld]_&]:[--su-btn-pi:16px] [[data-density=handheld]_&]:[--su-btn-icon:24px] [[data-density=handheld]_&]:[--su-btn-icon-only:28px]"
}, G = {
  sm: "text-control-sm",
  md: "text-control",
  lg: "text-section [[data-density=handheld]_&]:text-hh-primary [[data-density=handheld]_&]:font-semibold"
}, pt = {
  sm: "text-control-sm",
  md: "text-body",
  lg: "text-section"
}, gt = "[@media(hover:none)]:before:content-empty [@media(hover:none)]:before:absolute [@media(hover:none)]:before:inset-[min(0px,calc((100%_-_var(--su-hit-target))/2))]", ht = "underline-offset-3 decoration-1 [@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true]):hover]:underline", ft = "inline-flex min-w-0 max-w-full items-center justify-center gap-[var(--su-btn-gap)]", xt = "block min-w-0 truncate", mt = "block min-w-0 break-words text-center", yt = "py-[2px] [background:linear-gradient(currentColor_0_0)_0_100%_/_0_1px_no-repeat] [transition-property:background-size] duration-[var(--su-duration-scan)] ease-[var(--su-ease-out)] [@media(hover:hover)]:group-hover:[background-size:100%_1px] group-focus-visible:[background-size:100%_1px] motion-reduce:transition-none", _t = "transition-transform duration-[var(--su-duration-base)] ease-[var(--su-ease-out)] [@media(hover:hover)]:group-hover:translate-x-1 rtl:-scale-x-100 rtl:[@media(hover:hover)]:group-hover:-translate-x-1 motion-reduce:transition-none";
function wt() {
  return /* @__PURE__ */ t("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", fill: "none", children: /* @__PURE__ */ t("path", { d: "M5 12h14M13 6l6 6-6 6", stroke: "currentColor" }) });
}
const St = at(function({
  variant: I,
  type: d,
  size: n = "md",
  block: y = !1,
  asChild: g = !1,
  danger: j = !1,
  loading: e = !1,
  icon: b,
  iconPlacement: D = "start",
  inset: H = "default",
  arrow: _ = !1,
  wrap: O = !1,
  hideEndCell: Ct,
  href: w,
  target: S,
  rel: Q,
  htmlType: W,
  className: q,
  children: h,
  disabled: i,
  onClick: k,
  ...C
}, z) {
  const l = I === "secondary" ? "default" : I ?? ut[d] ?? "default", J = W ?? (d === "submit" || d === "reset" || d === "button" ? d : "button"), T = !!e, f = typeof e == "object" && e ? e.delay ?? 0 : 0, E = typeof e == "object" && e ? e.icon : void 0, [K, R] = st(!1);
  nt(() => {
    if (!f || !T) {
      R(!1);
      return;
    }
    const p = window.setTimeout(() => R(!0), f);
    return () => window.clearTimeout(p);
  }, [f, T]);
  const r = f ? K : T, U = !!i || r, X = j ? "danger" : "base", s = l === "text", B = h != null && h !== !1, c = !s && !B && (b != null || r), N = O && !s && !c, v = c ? "size-[var(--su-btn-icon-only)] text-[var(--su-btn-ic,currentColor)]" : "size-[var(--su-btn-icon)] text-[var(--su-btn-ic,currentColor)]", A = r ? E != null ? /* @__PURE__ */ t(x, { className: v, children: E }, "lead") : /* @__PURE__ */ t(ot, { className: v }, "lead") : null, F = A ?? (D === "start" && b != null ? /* @__PURE__ */ t(x, { className: v, children: b }, "lead") : null), L = !A && D === "end" && b != null ? /* @__PURE__ */ t(x, { className: v, children: b }, "trail") : null, Z = _ && (s || l === "ghost") && !r ? /* @__PURE__ */ t(x, { className: o(v, _t), children: /* @__PURE__ */ t(wt, {}) }, "arrow") : null, M = [
    F,
    g ? /* @__PURE__ */ t(et, { children: h }, "label") : B ? /* @__PURE__ */ t("span", { className: o(N ? mt : xt, s && _ && yt), children: h }, "label") : null,
    L,
    Z
  ], $ = s || c ? "p-0" : H === "tight" ? "px-[var(--su-btn-pt)]" : F ? "ps-[var(--su-btn-pi)] pe-[var(--su-btn-px)]" : L ? "ps-[var(--su-btn-px)] pe-[var(--su-btn-pi)]" : "px-[var(--su-btn-px)]", P = s ? o("h-auto border-0 rounded-su-tag", y ? "w-full" : "w-max", pt[n]) : c ? o(
    "h-[var(--su-btn-box)] w-[var(--su-btn-box)] border",
    n === "sm" ? "rounded-su-tag" : "rounded-su-control",
    G[n]
  ) : o(
    N ? "min-h-[var(--su-btn-h)] py-su1 [[data-density=handheld]_&]:py-su2 border rounded-su-control" : "h-[var(--su-btn-h)] border rounded-su-control",
    y ? "w-full" : "w-max",
    // The handheld primary spans the screen.
    n === "lg" && !y && "[[data-density=handheld]_&]:w-full",
    G[n]
  ), tt = g ? rt : w ? "a" : "button", a = {
    ...C,
    ref: z,
    className: o(
      dt,
      N ? "whitespace-normal" : "whitespace-nowrap",
      bt,
      !s && it,
      gt,
      vt[n],
      c && l === "ghost" && !j && n === "sm" ? ct : lt[l][X],
      P,
      l === "dashed" && "border-dashed",
      $,
      s && !_ && ht,
      q
    ),
    "aria-busy": r || void 0,
    "aria-disabled": i || void 0,
    onClick: (p) => {
      if (U) {
        p.preventDefault(), p.stopPropagation();
        return;
      }
      k == null || k(p);
    }
  };
  return r && !B && !C["aria-label"] && !C["aria-labelledby"] && (a["aria-label"] = "Loading"), w ? (i || (a.href = w), a.target = S, a.rel = Q ?? (S === "_blank" ? "noopener noreferrer" : void 0), i && (a.role = "link", a.tabIndex = -1)) : g || (a.type = J, a.disabled = !!i), /* @__PURE__ */ t(tt, { ...a, children: g ? M : /* @__PURE__ */ t("span", { className: ft, children: M }) });
});
export {
  St as Button
};
