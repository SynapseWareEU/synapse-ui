import { jsxs as w, jsx as d } from "react/jsx-runtime";
import { useState as z, useCallback as C } from "react";
import { cn as s } from "../../utils/cn.js";
import { useFormItemContext as j, useFieldState as y } from "./Form.js";
const N = {
  sm: "h-[var(--su-control-sm)]",
  md: "h-[var(--su-control-md)]",
  lg: "h-[var(--su-control-lg)]"
}, S = {
  sm: "w-[var(--su-control-sm)]",
  md: "w-[var(--su-control-md)]",
  lg: "w-[var(--su-control-lg)]"
}, D = {
  sm: "size-[20px]",
  md: "size-[20px]",
  lg: "size-[24px]"
}, F = [
  "relative inline-flex shrink-0 items-center gap-su2 rounded-su-control border border-solid font-sans",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // The native input inside takes focus; the ring goes on the whole trigger, keyboard only.
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-focus has-[:focus-visible]:outline-offset-[var(--su-focus-ring-offset)]"
].join(" "), I = (o) => /^#[0-9a-fA-F]{6}$/.test(o) ? o : "#000000";
function E({
  value: o,
  defaultValue: u = "#1D4ED8",
  size: b,
  disabled: f,
  showText: c = !0,
  className: p,
  onChange: e,
  id: v,
  ...m
}) {
  const r = j(), { size: a, disabled: i } = y(b, f), [g, h] = z(u), n = o !== void 0, l = I(n ? o : g), x = C(
    (t) => {
      n || h(t), e == null || e(t);
    },
    [n, e]
  ), k = !!(r != null && r.error);
  return /* @__PURE__ */ w(
    "div",
    {
      className: s(
        F,
        N[a],
        c ? "ps-su2 pe-su3" : s("justify-center", S[a]),
        i ? "bg-surface-2 border-border cursor-not-allowed" : s(
          "bg-surface cursor-pointer [@media(hover:hover)]:hover:bg-surface-2",
          k ? "border-danger" : "border-border-strong"
        ),
        p
      ),
      children: [
        /* @__PURE__ */ d(
          "span",
          {
            "aria-hidden": "true",
            className: s(
              "shrink-0 rounded-su-tag border border-solid border-border forced-colors:[forced-color-adjust:none]",
              D[a]
            ),
            style: { backgroundColor: l }
          }
        ),
        c && /* @__PURE__ */ d("span", { className: s("su-id-2 whitespace-nowrap", i && "text-ink-3"), children: l.toUpperCase() }),
        /* @__PURE__ */ d(
          "input",
          {
            type: "color",
            id: v ?? (r == null ? void 0 : r.id),
            value: l,
            disabled: i,
            className: "absolute inset-0 size-full m-0 p-0 appearance-none border-none bg-transparent opacity-0 outline-none cursor-pointer disabled:cursor-not-allowed",
            onChange: (t) => x(t.target.value),
            ...m,
            "aria-describedby": r == null ? void 0 : r.descriptionId,
            "aria-invalid": r != null && r.error ? !0 : void 0
          }
        )
      ]
    }
  );
}
export {
  E as ColorPicker
};
