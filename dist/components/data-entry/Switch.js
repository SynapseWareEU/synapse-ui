import { jsxs as p, jsx as r } from "react/jsx-runtime";
import { Root as S, SwitchThumb as D } from "../../vendor/@radix-ui/react-switch/dist/index.js";
import { useState as I } from "react";
import { cn as c } from "../../utils/cn.js";
import { useFormContext as B, useFormItemContext as q } from "./Form.js";
const z = [
  "relative inline-flex shrink-0 items-center w-[36px] h-[20px] p-[3px] border-0 rounded-su-pill",
  "transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: keep the token colours (GrayText / Highlight track, HighlightText thumb);
  // a borderless track would otherwise be erased to Canvas.
  "forced-colors:[forced-color-adjust:none]",
  "su-focus-ring"
].join(" "), F = [
  "bg-ink-3 data-[state=checked]:bg-action",
  "[@media(hover:hover)]:group-hover/sw:data-[state=unchecked]:bg-ink-2",
  "[@media(hover:hover)]:group-hover/sw:data-[state=checked]:bg-action-hover"
].join(" "), T = "cursor-not-allowed bg-border data-[state=checked]:bg-border-strong", W = [
  "pointer-events-none flex items-center justify-center size-[14px] rounded-full bg-on-action",
  "transition-transform duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "translate-x-0 data-[state=checked]:translate-x-[16px]",
  // physical translate, mirrored under [dir=rtl] so the thumb travels toward the trailing edge
  "rtl:data-[state=checked]:-translate-x-[16px]"
].join(" ");
function C() {
  return /* @__PURE__ */ p(
    "svg",
    {
      viewBox: "0 0 10 10",
      fill: "none",
      "aria-hidden": "true",
      className: "block size-[10px] animate-spin motion-reduce:animate-none text-ink-3 [[data-state=checked]_&]:text-action",
      style: { animationDuration: "800ms" },
      children: [
        /* @__PURE__ */ r("circle", { cx: "5", cy: "5", r: "4", strokeWidth: "1.5", className: "stroke-border" }),
        /* @__PURE__ */ r("path", { d: "M5 1a4 4 0 0 1 4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
      ]
    }
  );
}
function $({
  checked: d,
  defaultChecked: l,
  disabled: b,
  loading: t,
  required: h,
  name: x,
  value: f,
  id: v,
  className: k,
  children: s,
  onCheckedChange: n,
  "aria-label": i,
  "aria-labelledby": w
}) {
  const y = B(), e = q(), o = b ?? y.disabled, [g, j] = I(l ?? !1), u = typeof s == "function" ? s(d ?? g) : s, m = w ?? (i == null ? e == null ? void 0 : e.labelId : void 0), N = i != null || m != null;
  return /* @__PURE__ */ p(
    "label",
    {
      className: c(
        // The switch field row: 36 tall, switch + 10 + state words.
        "group/sw inline-flex items-center gap-[10px] min-h-[var(--su-control-md)]",
        "[@media(hover:none)]:min-h-[max(var(--su-control-md),var(--su-hit-target))]",
        o ? "cursor-not-allowed" : t ? "cursor-wait" : "cursor-pointer",
        k
      ),
      children: [
        /* @__PURE__ */ r(
          S,
          {
            id: v ?? (e == null ? void 0 : e.id),
            "aria-label": i,
            "aria-labelledby": m,
            checked: d,
            defaultChecked: l,
            disabled: o,
            required: h ?? (e == null ? void 0 : e.required),
            name: x,
            value: f,
            className: c(
              z,
              o ? T : F,
              !o && (t ? "cursor-wait" : "cursor-pointer")
            ),
            onClick: (a) => {
              t && (a.preventDefault(), a.stopPropagation());
            },
            onCheckedChange: (a) => {
              t || (j(a), n == null || n(a));
            },
            "aria-describedby": e == null ? void 0 : e.descriptionId,
            "aria-invalid": e != null && e.error ? !0 : void 0,
            "aria-busy": t || void 0,
            children: /* @__PURE__ */ r(D, { className: W, children: t ? /* @__PURE__ */ r(C, {}) : null })
          }
        ),
        u && /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": N || void 0,
            "data-su-switch-state": "",
            className: c("text-body select-none", o ? "text-ink-3" : "text-ink"),
            children: u
          }
        )
      ]
    }
  );
}
export {
  $ as Switch
};
