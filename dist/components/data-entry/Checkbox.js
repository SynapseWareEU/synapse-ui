import { jsxs as h, jsx as r } from "react/jsx-runtime";
import { Checkbox as N, CheckboxIndicator as w } from "../../vendor/@radix-ui/react-checkbox/dist/index.js";
import { cn as o } from "../../utils/cn.js";
import { useFormContext as B, useFormItemContext as I } from "./Form.js";
const q = [
  "relative inline-flex shrink-0 items-center justify-center size-[16px] p-0 rounded-su-tag",
  "border border-solid text-on-action",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: paint the token colours (Canvas, CanvasText, Highlight) instead of letting the
  // browser erase the fill, which would hide the checked state.
  "forced-colors:[forced-color-adjust:none]"
].join(" "), z = [
  "cursor-pointer bg-surface",
  "data-[state=checked]:bg-action data-[state=checked]:border-action",
  "data-[state=indeterminate]:bg-action data-[state=indeterminate]:border-action",
  "[@media(hover:hover)]:group-hover/cb:data-[state=checked]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=checked]:border-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=indeterminate]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=indeterminate]:border-action-hover"
].join(" "), D = "border-border-control [@media(hover:hover)]:group-hover/cb:data-[state=unchecked]:border-ink-3", F = "border-danger", L = [
  "cursor-not-allowed bg-fill border-border",
  "data-[state=checked]:bg-border-strong data-[state=checked]:border-border-strong",
  "data-[state=indeterminate]:bg-border-strong data-[state=indeterminate]:border-border-strong"
].join(" ");
function v({
  disabled: t,
  invalid: a
}) {
  return o(
    q,
    t ? L : o(z, a ? F : D)
  );
}
function m() {
  return /* @__PURE__ */ h("svg", { viewBox: "0 0 24 24", fill: "none", "aria-hidden": "true", className: "block size-[12px]", children: [
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
function V({
  checked: t,
  disabled: a,
  className: d
}) {
  const i = t === "indeterminate" ? "indeterminate" : t ? "checked" : "unchecked";
  return /* @__PURE__ */ r(
    "span",
    {
      "aria-hidden": "true",
      "data-state": i,
      className: o(v({ disabled: a }), d),
      children: i === "unchecked" ? null : /* @__PURE__ */ r(m, {})
    }
  );
}
function W({
  checked: t,
  defaultChecked: a,
  disabled: d,
  required: i,
  name: x,
  value: k = "on",
  id: f,
  className: p,
  children: s,
  row: l = !1,
  trailing: b,
  onCheckedChange: c,
  "aria-label": g,
  "aria-labelledby": C
}) {
  const j = B(), e = I(), n = d ?? j.disabled, y = !!(e != null && e.error);
  return /* @__PURE__ */ h(
    "label",
    {
      className: o(
        // The whole row is the target: box + 8 + label 14/20. Desk keeps the visual size;
        // touch gets the 44px floor.
        "group/cb items-center gap-su2",
        l ? "flex w-full min-w-0 px-su2 rounded-su-control [@media(hover:hover)]:h-[var(--su-row-overlay)] [@media(hover:hover)]:hover:bg-surface-hover" : "inline-flex",
        "[@media(hover:none)]:min-h-[var(--su-hit-target)] [@media(hover:none)]:min-w-[var(--su-hit-target)]",
        n ? "cursor-not-allowed" : "cursor-pointer",
        p
      ),
      children: [
        /* @__PURE__ */ r(
          N,
          {
            id: f ?? (e == null ? void 0 : e.id),
            "aria-label": s ? void 0 : g,
            "aria-labelledby": s ? void 0 : C,
            checked: t,
            defaultChecked: a,
            disabled: n,
            required: i ?? (e == null ? void 0 : e.required),
            name: x,
            value: k,
            className: o(v({ disabled: n, invalid: y }), "su-focus-ring"),
            onCheckedChange: (u) => c == null ? void 0 : c(u === !0, u),
            "aria-describedby": e == null ? void 0 : e.descriptionId,
            "aria-invalid": e != null && e.error ? !0 : void 0,
            children: /* @__PURE__ */ r(w, { className: "flex items-center justify-center", children: /* @__PURE__ */ r(m, {}) })
          }
        ),
        s && /* @__PURE__ */ r(
          "span",
          {
            className: o(
              "text-body select-none",
              l && "min-w-0 flex-1 truncate",
              n ? "text-ink-3" : "text-ink"
            ),
            children: s
          }
        ),
        b != null ? /* @__PURE__ */ r("span", { className: o("shrink-0 su-tabular text-small", n ? "text-ink-3" : "text-ink-2"), children: b }) : null
      ]
    }
  );
}
export {
  W as Checkbox,
  V as CheckboxMark,
  v as checkboxBoxClass
};
