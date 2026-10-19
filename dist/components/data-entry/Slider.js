import { jsxs as p, jsx as a } from "react/jsx-runtime";
import { Root as x, SliderTrack as C, Range as w, SliderThumb as j } from "../../vendor/@radix-ui/react-slider/dist/index.js";
import { cn as e } from "../../utils/cn.js";
import { useFormContext as S, useFormItemContext as N } from "./Form.js";
const k = [
  "relative flex items-center w-full h-[20px] touch-none select-none",
  "[@media(hover:none)]:h-[var(--su-hit-target)]",
  "data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-[20px] data-[orientation=vertical]:h-[160px]",
  "[@media(hover:none)]:data-[orientation=vertical]:w-[var(--su-hit-target)]",
  // High Contrast: keep the token colours so the range (Highlight) stays visible on its track.
  "forced-colors:[forced-color-adjust:none]"
].join(" "), R = "relative flex-1 h-[4px] rounded-su-bar bg-fill forced-colors:bg-[GrayText] data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-[4px]", T = "absolute h-full rounded-su-bar data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full", $ = [
  "block size-[16px] rounded-full border-2 border-solid bg-surface su-focus-ring",
  "transition-[border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none"
].join(" "), y = "border-action cursor-grab active:cursor-grabbing active:border-action-press [@media(hover:hover)]:[&:not(:active):hover]:border-action-hover", z = "border-border-strong cursor-not-allowed";
function G({
  value: t,
  defaultValue: n = [0],
  min: c = 0,
  max: d = 100,
  step: u = 1,
  orientation: b = "horizontal",
  disabled: h,
  className: v,
  onValueChange: m,
  onValueCommit: f,
  "aria-label": i = "Value"
}) {
  const g = S(), o = N(), r = h ?? g.disabled, s = t ?? n;
  return /* @__PURE__ */ p(
    x,
    {
      id: o == null ? void 0 : o.id,
      value: t,
      defaultValue: n,
      min: c,
      max: d,
      step: u,
      orientation: b,
      disabled: r,
      className: e(k, r && "cursor-not-allowed", v),
      onValueChange: m,
      onValueCommit: f,
      "aria-describedby": o == null ? void 0 : o.descriptionId,
      "aria-invalid": o != null && o.error ? !0 : void 0,
      children: [
        /* @__PURE__ */ a(C, { className: R, children: /* @__PURE__ */ a(
          w,
          {
            className: e(T, r ? "bg-border-strong" : "bg-action")
          }
        ) }),
        s.map((D, l) => /* @__PURE__ */ a(
          j,
          {
            className: e($, r ? z : y),
            "aria-label": s.length > 1 ? `${i} ${l + 1}` : i
          },
          l
        ))
      ]
    }
  );
}
export {
  G as Slider
};
