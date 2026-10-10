import { jsx as t } from "react/jsx-runtime";
import { forwardRef as P, useState as tt, useEffect as at } from "react";
import { Slottable as st, Root as nt } from "../../vendor/@radix-ui/react-slot/dist/index.js";
import { cn as u } from "../../utils/cn.js";
import { Icon as x } from "./Icon.js";
import { RingSpinner as et } from "./RingSpinner.js";
const rt = {
  link: "text",
  text: "text",
  ghost: "ghost",
  dashed: "dashed",
  primary: "primary",
  default: "default"
}, ut = "group relative box-border inline-flex flex-[0_0_auto] max-w-full items-center justify-center gap-[var(--su-btn-gap)] font-sans font-medium tracking-normal whitespace-nowrap [text-decoration-line:none] cursor-pointer aria-busy:cursor-wait disabled:cursor-not-allowed aria-disabled:cursor-not-allowed bg-[var(--su-btn-bg)] text-[var(--su-btn-fg)] border-[color:var(--su-btn-bd)] transition-[background-color,color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] su-focus-ring", ot = "[@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:bg-[var(--su-btn-bg-h,var(--su-btn-bg))] [@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:text-[var(--su-btn-fg-h,var(--su-btn-fg))] [@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:border-[color:var(--su-btn-bd-h,var(--su-btn-bd))] [&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:bg-[var(--su-btn-bg-h,var(--su-btn-bg))] [&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:text-[var(--su-btn-fg-h,var(--su-btn-fg))] [&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:border-[color:var(--su-btn-bd-h,var(--su-btn-bd))] [&:not(:disabled,[aria-disabled=true]):active]:bg-[var(--su-btn-bg-p,var(--su-btn-bg))] [&:not(:disabled,[aria-disabled=true]):active]:text-[var(--su-btn-fg-p,var(--su-btn-fg-h,var(--su-btn-fg)))] [&:not(:disabled,[aria-disabled=true]):active]:border-[color:var(--su-btn-bd-p,var(--su-btn-bd))]", dt = "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-action-subtle)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg-h:var(--su-action-subtle-hover)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg-p:var(--su-action-subtle-hover)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-action)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-action-text)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg-h:var(--su-action-text)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg-p:var(--su-action-text)] [&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-action-text)]", m = "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-fill)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-fill)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-ink-3)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-ink-3)]", o = "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-ink-3)] [&:is(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-ink-3)]", M = o + " [&:is(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-border)]", V = "[--su-spin-track:color-mix(in_srgb,currentColor_30%,transparent)]", bt = {
  primary: {
    base: "[--su-btn-bg:var(--su-action)] [--su-btn-bg-h:var(--su-action-hover)] [--su-btn-bg-p:var(--su-action-press)] [--su-btn-fg:var(--su-on-action)] [--su-btn-bd:transparent] " + V + " " + m,
    danger: "[--su-btn-bg:var(--su-danger-strong)] [--su-btn-bg-h:var(--su-danger-strong-hover)] [--su-btn-bg-p:var(--su-danger-strong-press)] [--su-btn-fg:var(--su-on-action)] [--su-btn-bd:transparent] " + V + " " + m
  },
  default: {
    base: "[--su-btn-bg:var(--su-surface)] [--su-btn-bg-h:var(--su-surface-2)] [--su-btn-bg-p:var(--su-fill)] [--su-btn-fg:var(--su-ink)] [--su-btn-bd:var(--su-border-strong)] [--su-btn-ic:var(--su-ink-2)] " + m,
    danger: "[--su-btn-bg:var(--su-surface)] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:var(--su-danger-line)] " + m
  },
  ghost: {
    base: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-fill)] [--su-btn-bg-p:var(--su-border)] [--su-btn-fg:var(--su-ink-2)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:transparent] " + o,
    danger: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:transparent] " + o
  },
  dashed: {
    base: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-surface-2)] [--su-btn-bg-p:var(--su-fill)] [--su-btn-fg:var(--su-ink-2)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:var(--su-border-strong)] " + M,
    danger: "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:var(--su-danger-line)] " + M
  },
  text: {
    base: "[--su-btn-bg:transparent] [--su-btn-fg:var(--su-action-text)] [--su-btn-fg-h:var(--su-action-text-hover)] [--su-btn-fg-p:var(--su-action-press)] [--su-btn-bd:transparent] " + o,
    danger: "[--su-btn-bg:transparent] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:transparent] " + o
  }
}, it = "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-fill)] [--su-btn-bg-p:var(--su-border)] [--su-btn-fg:var(--su-ink-3)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:transparent] " + o, lt = {
  sm: "[--su-btn-h:var(--su-control-xs)] [--su-btn-box:var(--su-control-mini)] [--su-btn-px:10px] [--su-btn-pi:8px] [--su-btn-pt:6px] [--su-btn-gap:6px] [--su-btn-icon:14px] [--su-btn-icon-only:16px]",
  md: "[--su-btn-h:var(--su-control-md)] [--su-btn-box:var(--su-control-sm)] [--su-btn-px:14px] [--su-btn-pi:12px] [--su-btn-pt:8px] [--su-btn-gap:6px] [--su-btn-icon:16px] [--su-btn-icon-only:18px] [[data-density=handheld]_&]:[--su-btn-box:var(--su-hh-control-md)] [[data-density=handheld]_&]:[--su-btn-px:16px] [[data-density=handheld]_&]:[--su-btn-pi:16px] [[data-density=handheld]_&]:[--su-btn-gap:8px] [[data-density=handheld]_&]:[--su-btn-icon:24px] [[data-density=handheld]_&]:[--su-btn-icon-only:24px]",
  lg: "[--su-btn-h:var(--su-control-lg)] [--su-btn-box:var(--su-hit-target)] [--su-btn-px:18px] [--su-btn-pi:16px] [--su-btn-pt:12px] [--su-btn-gap:8px] [--su-btn-icon:20px] [--su-btn-icon-only:20px] [[data-density=handheld]_&]:[--su-btn-box:var(--su-hh-control-lg)] [[data-density=handheld]_&]:[--su-btn-px:16px] [[data-density=handheld]_&]:[--su-btn-pi:16px] [[data-density=handheld]_&]:[--su-btn-icon:24px] [[data-density=handheld]_&]:[--su-btn-icon-only:28px]"
}, Y = {
  sm: "text-control-sm",
  md: "text-control",
  lg: "text-section [[data-density=handheld]_&]:text-hh-primary [[data-density=handheld]_&]:font-semibold"
}, ct = {
  sm: "text-control-sm",
  md: "text-body",
  lg: "text-section"
}, vt = "[@media(hover:none)]:before:content-empty [@media(hover:none)]:before:absolute [@media(hover:none)]:before:inset-[min(0px,calc((100%_-_var(--su-hit-target))/2))]", pt = "underline-offset-3 decoration-1 [@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true]):hover]:underline", gt = "inline-flex min-w-0 max-w-full items-center justify-center gap-[var(--su-btn-gap)]", ht = "block min-w-0 truncate", ft = "py-[2px] [background:linear-gradient(currentColor_0_0)_0_100%_/_0_1px_no-repeat] [transition-property:background-size] duration-[var(--su-duration-scan)] ease-[var(--su-ease-out)] [@media(hover:hover)]:group-hover:[background-size:100%_1px] group-focus-visible:[background-size:100%_1px] motion-reduce:transition-none", xt = "transition-transform duration-[var(--su-duration-base)] ease-[var(--su-ease-out)] [@media(hover:hover)]:group-hover:translate-x-1 rtl:-scale-x-100 rtl:[@media(hover:hover)]:group-hover:-translate-x-1 motion-reduce:transition-none";
function mt() {
  return /* @__PURE__ */ t("svg", { viewBox: "0 0 24 24", "aria-hidden": "true", fill: "none", children: /* @__PURE__ */ t("path", { d: "M5 12h14M13 6l6 6-6 6", stroke: "currentColor" }) });
}
const It = P(function({
  variant: N,
  type: d,
  size: s = "md",
  block: y = !1,
  asChild: p = !1,
  danger: I = !1,
  loading: n = !1,
  icon: b,
  iconPlacement: j = "start",
  inset: G = "default",
  arrow: _ = !1,
  hideEndCell: _t,
  href: k,
  target: D,
  rel: H,
  htmlType: O,
  className: Q,
  children: g,
  disabled: i,
  onClick: w,
  ...C
}, q) {
  const l = N === "secondary" ? "default" : N ?? rt[d] ?? "default", z = O ?? (d === "submit" || d === "reset" || d === "button" ? d : "button"), T = !!n, h = typeof n == "object" && n ? n.delay ?? 0 : 0, S = typeof n == "object" && n ? n.icon : void 0, [J, E] = tt(!1);
  at(() => {
    if (!h || !T) {
      E(!1);
      return;
    }
    const v = window.setTimeout(() => E(!0), h);
    return () => window.clearTimeout(v);
  }, [h, T]);
  const r = h ? J : T, K = !!i || r, U = I ? "danger" : "base", e = l === "text", B = g != null && g !== !1, f = !e && !B && (b != null || r), c = f ? "size-[var(--su-btn-icon-only)] text-[var(--su-btn-ic,currentColor)]" : "size-[var(--su-btn-icon)] text-[var(--su-btn-ic,currentColor)]", R = r ? S != null ? /* @__PURE__ */ t(x, { className: c, children: S }, "lead") : /* @__PURE__ */ t(et, { className: c }, "lead") : null, A = R ?? (j === "start" && b != null ? /* @__PURE__ */ t(x, { className: c, children: b }, "lead") : null), F = !R && j === "end" && b != null ? /* @__PURE__ */ t(x, { className: c, children: b }, "trail") : null, W = _ && (e || l === "ghost") && !r ? /* @__PURE__ */ t(x, { className: u(c, xt), children: /* @__PURE__ */ t(mt, {}) }, "arrow") : null, L = [
    A,
    p ? /* @__PURE__ */ t(st, { children: g }, "label") : B ? /* @__PURE__ */ t("span", { className: u(ht, e && _ && ft), children: g }, "label") : null,
    F,
    W
  ], X = e || f ? "p-0" : G === "tight" ? "px-[var(--su-btn-pt)]" : A ? "ps-[var(--su-btn-pi)] pe-[var(--su-btn-px)]" : F ? "ps-[var(--su-btn-px)] pe-[var(--su-btn-pi)]" : "px-[var(--su-btn-px)]", Z = e ? u("h-auto border-0 rounded-su-tag", y ? "w-full" : "w-max", ct[s]) : f ? u(
    "h-[var(--su-btn-box)] w-[var(--su-btn-box)] border",
    s === "sm" ? "rounded-su-tag" : "rounded-su-control",
    Y[s]
  ) : u(
    "h-[var(--su-btn-h)] border rounded-su-control",
    y ? "w-full" : "w-max",
    // The handheld primary spans the screen.
    s === "lg" && !y && "[[data-density=handheld]_&]:w-full",
    Y[s]
  ), $ = p ? nt : k ? "a" : "button", a = {
    ...C,
    ref: q,
    className: u(
      ut,
      ot,
      !e && dt,
      vt,
      lt[s],
      f && l === "ghost" && !I && s === "sm" ? it : bt[l][U],
      Z,
      l === "dashed" && "border-dashed",
      X,
      e && !_ && pt,
      Q
    ),
    "aria-busy": r || void 0,
    "aria-disabled": i || void 0,
    onClick: (v) => {
      if (K) {
        v.preventDefault(), v.stopPropagation();
        return;
      }
      w == null || w(v);
    }
  };
  return r && !B && !C["aria-label"] && !C["aria-labelledby"] && (a["aria-label"] = "Loading"), k ? (i || (a.href = k), a.target = D, a.rel = H ?? (D === "_blank" ? "noopener noreferrer" : void 0), i && (a.role = "link", a.tabIndex = -1)) : p || (a.type = z, a.disabled = !!i), /* @__PURE__ */ t($, { ...a, children: p ? L : /* @__PURE__ */ t("span", { className: gt, children: L }) });
});
export {
  It as Button
};
