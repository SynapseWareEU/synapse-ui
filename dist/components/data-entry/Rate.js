import { jsxs as x, jsx as l } from "react/jsx-runtime";
import { useState as b } from "react";
import { cn as m } from "../../utils/cn.js";
import { useFormContext as C, useFormItemContext as N } from "./Form.js";
const O = [
  "inline-flex shrink-0 items-center justify-center size-[20px] p-0 rounded-su-tag bg-transparent",
  "[@media(hover:none)]:size-[var(--su-hit-target)]",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: on and off would both be forced to one text colour; keep them apart.
  "forced-colors:[forced-color-adjust:none]",
  "su-focus-ring"
].join(" "), n = {
  on: "text-warning forced-colors:text-[CanvasText]",
  off: "text-border-strong forced-colors:text-[GrayText]",
  disabledOn: "text-ink-3 forced-colors:text-[GrayText]",
  disabledOff: "text-border-strong forced-colors:text-[GrayText]"
};
function M({
  value: d,
  defaultValue: p = 0,
  count: c = 5,
  allowClear: v = !0,
  disabled: y,
  className: g,
  onChange: a,
  "aria-label": h = "Rating"
}) {
  const j = C(), r = N(), t = y ?? j.disabled, [w, T] = b(p), [k, o] = b(null), u = d !== void 0, i = u ? d : w, s = k ?? i;
  return (
    // Not role="slider": a slider must be focusable and own its arrow keys, and
    // must not contain interactive descendants. The stars are real buttons, so
    // this is a labelled group of them.
    // ponytail: no allowHalf / custom character / arrow-key roving focus — add
    // them as additive props when a real rating flow asks for them.
    /* @__PURE__ */ x(
      "div",
      {
        id: r == null ? void 0 : r.id,
        className: m("inline-flex items-center", g),
        role: "group",
        "aria-label": h,
        "aria-describedby": r == null ? void 0 : r.descriptionId,
        "aria-invalid": r != null && r.error ? !0 : void 0,
        onMouseLeave: () => o(null),
        children: [
          Array.from({ length: c }, (B, z) => {
            const e = z + 1;
            return /* @__PURE__ */ l(
              "button",
              {
                type: "button",
                disabled: t,
                className: m(
                  O,
                  t ? e <= s ? n.disabledOn : n.disabledOff : e <= s ? n.on : n.off,
                  t ? "cursor-not-allowed" : "cursor-pointer"
                ),
                "aria-label": `${e} star${e > 1 ? "s" : ""}`,
                "aria-pressed": e === i,
                onMouseEnter: () => !t && o(e),
                onFocus: () => !t && o(e),
                onBlur: () => o(null),
                onClick: () => {
                  if (t) return;
                  const f = v && i === e ? 0 : e;
                  u || T(f), a == null || a(f);
                },
                children: /* @__PURE__ */ l("svg", { viewBox: "0 0 24 24", className: "size-[16px]", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ l("path", { d: "M12 2.5 15.09 8.76 22 9.77l-5 4.87 1.18 6.86L12 18.26l-6.18 3.24L7 14.64l-5-4.87 6.91-1.01z" }) })
              },
              e
            );
          }),
          s > 0 && /* @__PURE__ */ x("span", { className: "ms-su2 text-small text-ink-2 su-tabular", children: [
            s,
            "/",
            c
          ] })
        ]
      }
    )
  );
}
export {
  M as Rate
};
