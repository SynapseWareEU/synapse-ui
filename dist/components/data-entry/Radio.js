import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { Item as g, Indicator as x, RadioGroup as k } from "../../vendor/@radix-ui/react-radio-group/dist/index.js";
import { useContext as C, createContext as R } from "react";
import { cn as d } from "../../utils/cn.js";
import { useFormContext as h, useFormItemContext as I } from "./Form.js";
const v = R({});
function S({
  value: n,
  defaultValue: c,
  disabled: l,
  name: s,
  direction: u = "vertical",
  options: o,
  className: t,
  children: a,
  onValueChange: m
}) {
  const p = h(), e = I(), b = l ?? p.disabled;
  return /* @__PURE__ */ r(v.Provider, { value: { disabled: b, invalid: !!(e != null && e.error) }, children: /* @__PURE__ */ r(
    k,
    {
      id: e == null ? void 0 : e.id,
      value: n,
      defaultValue: c,
      disabled: b,
      name: s,
      className: d(
        "flex",
        u === "horizontal" ? "flex-row flex-wrap gap-su4" : "flex-col gap-su2",
        t
      ),
      onValueChange: m,
      "aria-describedby": e == null ? void 0 : e.descriptionId,
      "aria-invalid": e != null && e.error ? !0 : void 0,
      children: o ? o.map((i) => /* @__PURE__ */ r(D, { value: i.value, disabled: i.disabled, children: i.label }, i.value)) : a
    }
  ) });
}
const j = [
  "relative inline-flex shrink-0 items-center justify-center size-[16px] p-0 rounded-full",
  "border border-solid su-focus-ring",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: keep the token colours so the checked fill and dot survive.
  "forced-colors:[forced-color-adjust:none]"
].join(" "), G = [
  "cursor-pointer bg-surface",
  "data-[state=checked]:bg-action data-[state=checked]:border-action",
  "[@media(hover:hover)]:group-hover/rd:data-[state=checked]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/rd:data-[state=checked]:border-action-hover"
].join(" "), N = "border-border-control [@media(hover:hover)]:group-hover/rd:data-[state=unchecked]:border-ink-3", w = "border-danger", y = "cursor-not-allowed bg-fill border-border data-[state=checked]:bg-border-strong data-[state=checked]:border-border-strong";
function D({ value: n, disabled: c, className: l, children: s }) {
  const u = h(), o = C(v), t = c ?? u.disabled, a = !!(o.disabled || t);
  return /* @__PURE__ */ f(
    "label",
    {
      className: d(
        "group/rd inline-flex items-center gap-su2",
        "[@media(hover:none)]:min-h-[var(--su-hit-target)]",
        a ? "cursor-not-allowed" : "cursor-pointer",
        l
      ),
      children: [
        /* @__PURE__ */ r(
          g,
          {
            value: n,
            disabled: t,
            className: d(
              j,
              a ? y : d(G, o.invalid ? w : N)
            ),
            children: /* @__PURE__ */ r(x, { className: "block size-[6px] rounded-full bg-on-action" })
          }
        ),
        s && /* @__PURE__ */ r("span", { className: d("text-body select-none", a ? "text-ink-3" : "text-ink"), children: s })
      ]
    }
  );
}
export {
  D as Radio,
  S as RadioGroup,
  S as RadioGroupRoot
};
