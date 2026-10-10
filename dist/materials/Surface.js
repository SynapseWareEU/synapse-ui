import { jsx as i } from "react/jsx-runtime";
import { forwardRef as u } from "react";
import { cn as b } from "../utils/cn.js";
const g = {
  system: "bg-[var(--su-bg)] text-ink",
  systemSecondary: "bg-[var(--su-bg-secondary)] text-ink",
  systemTertiary: "bg-[var(--su-bg-tertiary)] text-ink",
  grouped: "bg-[var(--su-bg-grouped)] text-ink",
  groupedSecondary: "bg-[var(--su-bg-grouped-secondary)] text-ink",
  groupedTertiary: "bg-[var(--su-bg-grouped-tertiary)] text-ink",
  fill: "bg-fill text-ink",
  fillSecondary: "bg-fill-secondary text-ink",
  fillTertiary: "bg-fill-tertiary text-ink",
  fillQuaternary: "bg-fill-quaternary text-ink"
}, l = {
  none: void 0,
  sm: "rounded-su-tag",
  md: "rounded-su-control",
  lg: "rounded-su-surface",
  xl: "rounded-su-surface"
}, y = {
  1: "border border-solid border-border",
  2: "border border-solid border-border-strong"
}, k = u(function({
  as: r = "div",
  tone: t = "system",
  radius: o = "none",
  elevation: e = "none",
  className: n,
  children: s,
  ...d
}, a) {
  return /* @__PURE__ */ i(
    r,
    {
      ref: a,
      type: r === "button" ? "button" : void 0,
      className: b(
        g[t],
        l[o],
        e !== "none" && y[e],
        n
      ),
      ...d,
      children: s
    }
  );
});
export {
  k as Surface
};
