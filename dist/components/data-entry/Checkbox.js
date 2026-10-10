import { jsxs as b, jsx as r } from "react/jsx-runtime";
import { Checkbox as j, CheckboxIndicator as y } from "../../vendor/@radix-ui/react-checkbox/dist/index.js";
import { cn as t } from "../../utils/cn.js";
import { useFormContext as N, useFormItemContext as w } from "./Form.js";
const B = [
  "relative inline-flex shrink-0 items-center justify-center size-[16px] p-0 rounded-su-tag",
  "border border-solid text-on-action",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: paint the token colours (Canvas, CanvasText, Highlight) instead of letting the
  // browser erase the fill, which would hide the checked state.
  "forced-colors:[forced-color-adjust:none]"
].join(" "), I = [
  "cursor-pointer bg-surface",
  "data-[state=checked]:bg-action data-[state=checked]:border-action",
  "data-[state=indeterminate]:bg-action data-[state=indeterminate]:border-action",
  "[@media(hover:hover)]:group-hover/cb:data-[state=checked]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=checked]:border-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=indeterminate]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=indeterminate]:border-action-hover"
].join(" "), q = "border-border-control [@media(hover:hover)]:group-hover/cb:data-[state=unchecked]:border-ink-3", z = "border-danger", D = [
  "cursor-not-allowed bg-fill border-border",
  "data-[state=checked]:bg-border-strong data-[state=checked]:border-border-strong",
  "data-[state=indeterminate]:bg-border-strong data-[state=indeterminate]:border-border-strong"
].join(" ");
function u({
  disabled: o,
  invalid: a
}) {
  return t(
    B,
    o ? D : t(I, a ? z : q)
  );
}
function h() {
  return /* @__PURE__ */ b("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "block size-[12px]", children: [
    /* @__PURE__ */ r(
      "path",
      {
        d: "M5 12l5 5l10 -10",
        stroke: "currentColor",
        strokeWidth: "3",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: "[[data-state=indeterminate]_&]:hidden"
      }
    ),
    /* @__PURE__ */ r(
      "rect",
      {
        x: "4",
        y: "10",
        width: "16",
        height: "4",
        rx: "2",
        fill: "currentColor",
        className: "hidden [[data-state=indeterminate]_&]:block"
      }
    )
  ] });
}
function E({
  checked: o,
  disabled: a,
  className: s
}) {
  const n = o === "indeterminate" ? "indeterminate" : o ? "checked" : "unchecked";
  return /* @__PURE__ */ r(
    "span",
    {
      "aria-hidden": "true",
      "data-state": n,
      className: t(u({ disabled: a }), s),
      children: n === "unchecked" ? null : /* @__PURE__ */ r(h, {})
    }
  );
}
function G({
  checked: o,
  defaultChecked: a,
  disabled: s,
  required: n,
  name: m,
  value: v = "on",
  id: x,
  className: k,
  children: i,
  onCheckedChange: c,
  "aria-label": g,
  "aria-labelledby": p
}) {
  const f = N(), e = w(), d = s ?? f.disabled, C = !!(e != null && e.error);
  return /* @__PURE__ */ b(
    "label",
    {
      className: t(
        // The whole row is the target: box + 8 + label 14/20. Desk keeps the visual size;
        // touch gets the 44px floor.
        "group/cb inline-flex items-center gap-su2",
        "[@media(hover:none)]:min-h-[var(--su-hit-target)] [@media(hover:none)]:min-w-[var(--su-hit-target)]",
        d ? "cursor-not-allowed" : "cursor-pointer",
        k
      ),
      children: [
        /* @__PURE__ */ r(
          j,
          {
            id: x ?? (e == null ? void 0 : e.id),
            "aria-label": i ? void 0 : g,
            "aria-labelledby": i ? void 0 : p,
            checked: o,
            defaultChecked: a,
            disabled: d,
            required: n ?? (e == null ? void 0 : e.required),
            name: m,
            value: v,
            className: t(u({ disabled: d, invalid: C }), "su-focus-ring"),
            onCheckedChange: (l) => c == null ? void 0 : c(l === !0, l),
            "aria-describedby": e == null ? void 0 : e.descriptionId,
            "aria-invalid": e != null && e.error ? !0 : void 0,
            children: /* @__PURE__ */ r(y, { className: "flex items-center justify-center", children: /* @__PURE__ */ r(h, {}) })
          }
        ),
        i && /* @__PURE__ */ r("span", { className: t("text-body select-none", d ? "text-ink-3" : "text-ink"), children: i })
      ]
    }
  );
}
export {
  G as Checkbox,
  E as CheckboxMark,
  u as checkboxBoxClass
};
