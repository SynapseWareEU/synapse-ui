import { jsxs as c, jsx as t } from "react/jsx-runtime";
import { Root as w, SwitchThumb as g } from "../../vendor/@radix-ui/react-switch/dist/index.js";
import { cn as i } from "../../utils/cn.js";
import { useFormContext as y, useFormItemContext as j } from "./Form.js";
const N = [
  "relative inline-flex shrink-0 items-center w-[36px] h-[20px] p-[3px] border-0 rounded-su-pill",
  "transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: keep the token colours (GrayText / Highlight track, HighlightText thumb);
  // a borderless track would otherwise be erased to Canvas.
  "forced-colors:[forced-color-adjust:none]",
  "su-focus-ring"
].join(" "), D = [
  "bg-ink-3 data-[state=checked]:bg-action",
  "[@media(hover:hover)]:group-hover/sw:data-[state=unchecked]:bg-ink-2",
  "[@media(hover:hover)]:group-hover/sw:data-[state=checked]:bg-action-hover"
].join(" "), S = "cursor-not-allowed bg-border data-[state=checked]:bg-border-strong", q = [
  "pointer-events-none flex items-center justify-center size-[14px] rounded-full bg-on-action",
  "transition-transform duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "translate-x-0 data-[state=checked]:translate-x-[16px]",
  // physical translate, mirrored under [dir=rtl] so the thumb travels toward the trailing edge
  "rtl:data-[state=checked]:-translate-x-[16px]"
].join(" ");
function z() {
  return /* @__PURE__ */ c(
    "svg",
    {
      viewBox: "0 0 10 10",
      fill: "none",
      "aria-hidden": "true",
      className: "block size-[10px] animate-spin motion-reduce:animate-none text-ink-3 [[data-state=checked]_&]:text-action",
      style: { animationDuration: "800ms" },
      children: [
        /* @__PURE__ */ t("circle", { cx: "5", cy: "5", r: "4", strokeWidth: "1.5", className: "stroke-border" }),
        /* @__PURE__ */ t("path", { d: "M5 1a4 4 0 0 1 4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
      ]
    }
  );
}
function T({
  checked: d,
  defaultChecked: l,
  disabled: u,
  loading: r,
  required: m,
  name: b,
  value: p,
  id: x,
  className: h,
  children: o,
  onCheckedChange: n,
  "aria-label": v,
  "aria-labelledby": f
}) {
  const k = y(), e = j(), a = u ?? k.disabled;
  return /* @__PURE__ */ c(
    "label",
    {
      className: i(
        // The switch field row: 36 tall, switch + 10 + state words.
        "group/sw inline-flex items-center gap-[10px] min-h-[var(--su-control-md)]",
        "[@media(hover:none)]:min-h-[max(var(--su-control-md),var(--su-hit-target))]",
        a ? "cursor-not-allowed" : r ? "cursor-wait" : "cursor-pointer",
        h
      ),
      children: [
        /* @__PURE__ */ t(
          w,
          {
            id: x ?? (e == null ? void 0 : e.id),
            "aria-label": o ? void 0 : v,
            "aria-labelledby": o ? void 0 : f,
            checked: d,
            defaultChecked: l,
            disabled: a,
            required: m ?? (e == null ? void 0 : e.required),
            name: b,
            value: p,
            className: i(
              N,
              a ? S : D,
              !a && (r ? "cursor-wait" : "cursor-pointer")
            ),
            onClick: (s) => {
              r && (s.preventDefault(), s.stopPropagation());
            },
            onCheckedChange: (s) => {
              r || n == null || n(s);
            },
            "aria-describedby": e == null ? void 0 : e.descriptionId,
            "aria-invalid": e != null && e.error ? !0 : void 0,
            "aria-busy": r || void 0,
            children: /* @__PURE__ */ t(g, { className: q, children: r ? /* @__PURE__ */ t(z, {}) : null })
          }
        ),
        o && /* @__PURE__ */ t("span", { className: i("text-body select-none", a ? "text-ink-3" : "text-ink"), children: o })
      ]
    }
  );
}
export {
  T as Switch
};
