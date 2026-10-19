import { jsx as m } from "react/jsx-runtime";
import { forwardRef as d } from "react";
import { cn as i } from "../../utils/cn.js";
import { Button as b } from "./Button.js";
const a = "bottom-[max(var(--su-space-6),env(safe-area-inset-bottom,0px))]", f = {
  "bottom-right": `end-su6 ${a}`,
  "bottom-left": `start-su6 ${a}`,
  "bottom-center": `left-1/2 -translate-x-1/2 ${a}`
}, c = "[&:not(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-surface-overlay)] [&:not(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-border)]", _ = d(
  function({
    placement: s = "bottom-right",
    variant: o = "default",
    icon: r,
    className: n,
    children: t,
    tooltip: e,
    ...u
  }, l) {
    return /* @__PURE__ */ m(
      b,
      {
        ref: l,
        variant: o,
        size: "lg",
        icon: r,
        "aria-label": t == null || t === !1 ? e : void 0,
        title: e,
        className: i(
          // `!` — Button sets `relative`, its own radius and its icon-only box, and UnoCSS
          // decides which of two equal-specificity utilities wins by sheet order.
          "!fixed z-[var(--su-z-float)] max-w-[calc(100vw_-_2_*_var(--su-space-6))]",
          "![--su-btn-box:var(--su-control-lg)] !rounded-su-surface shadow-su-overlay",
          o === "default" && c,
          // A labelled lg Button spans the screen on handheld; a floating one never does.
          t != null && t !== !1 && "[[data-density=handheld]_&]:!w-max",
          "animate-su-rise-in motion-reduce:animate-none",
          f[s],
          n
        ),
        ...u,
        children: t
      }
    );
  }
);
export {
  _ as FloatButton
};
