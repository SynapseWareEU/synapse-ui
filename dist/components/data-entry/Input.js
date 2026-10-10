import { jsxs as te, jsx as s } from "react/jsx-runtime";
import { useId as ne, useRef as j, useState as y, useCallback as se } from "react";
import { cn as i } from "../../utils/cn.js";
import { useFormItemContext as oe, useFieldState as re } from "./Form.js";
import ae from "../../vendor/@tabler/icons-react/dist/esm/icons/IconEyeOff.js";
import ie from "../../vendor/@tabler/icons-react/dist/esm/icons/IconEye.js";
import le from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const B = "bg-surface text-ink border border-solid border-border-strong rounded-su-control su-focus-ring duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none aria-invalid:enabled:border-danger disabled:bg-surface-2 disabled:border-border disabled:text-ink-3 disabled:cursor-not-allowed [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4 [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:outline-none [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:border-action", D = `w-full ${B} transition-[border-color] placeholder:text-ink-3 read-only:bg-surface-2 read-only:border-border`, Ie = `${D} font-sans`, de = {
  sm: "min-h-[var(--su-control-sm)] px-su2 py-0 text-control",
  md: "min-h-[var(--su-control-md)] px-su3 py-0 text-control",
  // Handheld: `lg` (64) never sets smaller type than `md` (56), and 16 is under the 17 floor.
  lg: "min-h-[var(--su-control-lg)] px-[14px] py-0 text-section [[data-density=handheld]_&]:text-control"
}, Se = `inline-flex items-center gap-su2 min-w-0 font-sans font-normal text-start cursor-pointer ${B} transition-[border-color,background-color] [@media(hover:hover)]:hover:enabled:bg-surface-2 data-[state=open]:bg-surface-2`, ze = {
  sm: "min-h-[var(--su-control-sm)] ps-su2 pe-su2 text-control",
  md: "min-h-[var(--su-control-md)] ps-su3 pe-[10px] text-control",
  lg: "min-h-[var(--su-control-lg)] ps-[14px] pe-su3 text-section [[data-density=handheld]_&]:text-control"
}, Ne = "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 disabled:cursor-not-allowed", T = {
  sm: { pad: 8, inset: 8, icon: 16, height: "var(--su-control-sm)" },
  md: { pad: 12, inset: 10, icon: 16, height: "var(--su-control-md)" },
  lg: { pad: 14, inset: 12, icon: 20, height: "var(--su-control-lg)" }
}, R = 8, ce = 24, ue = {
  sm: "start-[var(--su-space-2)]",
  md: "start-[10px]",
  lg: "start-[var(--su-space-3)]"
}, pe = {
  sm: "end-[var(--su-space-2)]",
  md: "end-[var(--su-space-3)]",
  lg: "end-[14px]"
}, fe = {
  sm: "end-[var(--su-space-1)]",
  md: "end-[6px]",
  lg: "end-[var(--su-space-2)]"
}, be = {
  sm: "text-control",
  md: "text-control",
  lg: "text-section [[data-density=handheld]_&]:text-control"
}, F = "absolute inset-y-0 flex items-center whitespace-nowrap pointer-events-none [&_*]:pointer-events-auto", W = "pointer-events-auto inline-flex items-center justify-center p-0 bg-transparent cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill [@media(hover:hover)]:hover:enabled:text-ink disabled:cursor-not-allowed [@media(hover:none)]:su-hit-44";
function me(n) {
  return T[n].inset + ce;
}
function ve({ size: n, onClick: l, onMouseDown: o, label: p = "Clear" }) {
  return /* @__PURE__ */ s("span", { className: i("absolute inset-y-0 flex items-center pointer-events-none", fe[n]), children: /* @__PURE__ */ s(
    "button",
    {
      type: "button",
      "aria-label": p,
      onClick: l,
      onMouseDown: o,
      className: i(W, "size-[var(--su-control-mini)] rounded-su-tag text-ink-3"),
      children: /* @__PURE__ */ s(le, { size: 16, stroke: 1.75, "aria-hidden": "true" })
    }
  ) });
}
function O(n) {
  return n != null && n !== !1 && n !== "";
}
function M() {
  const [n, l] = y(), o = j(null);
  return [se((d) => {
    var b;
    if ((b = o.current) == null || b.disconnect(), o.current = null, !d) return;
    const f = () => l(d.offsetWidth);
    f(), typeof ResizeObserver == "function" && (o.current = new ResizeObserver(f), o.current.observe(d));
  }, []), n];
}
function _e({
  size: n,
  prefix: l,
  suffix: o,
  fullWidth: p = !0,
  allowClear: d,
  mono: f,
  disabled: b,
  className: $,
  style: k,
  id: q,
  ref: m,
  onChange: v,
  "aria-describedby": A,
  "aria-invalid": X,
  ...r
}) {
  const t = oe(), { size: a, disabled: h } = re(n, b), u = T[a], G = ne(), w = j(null), [H, L] = y(() => String(r.defaultValue ?? "") !== ""), [x, V] = y(!1), [J, K] = M(), [Q, U] = M(), C = O(l), g = O(o), I = r.type === "number", c = r.type === "password" && !g, S = !c && d === !0 && !h && !r.readOnly && (r.value != null ? String(r.value) !== "" : H), z = q ?? (t == null ? void 0 : t.id) ?? (c ? G : void 0), N = C ? u.inset + (K ?? u.icon) + R : void 0, _ = c ? `calc(${u.height} + 4px)` : S ? me(a) : g ? u.pad + (U ?? u.icon) + R : void 0, Y = N != null || _ != null ? { paddingInlineStart: N, paddingInlineEnd: _, ...k } : k, Z = (e) => {
    w.current = e, typeof m == "function" ? m(e) : m && (m.current = e);
  }, ee = () => {
    var P, E;
    const e = w.current;
    e && ((E = (P = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")) == null ? void 0 : P.set) == null || E.call(e, ""), e.dispatchEvent(new Event("input", { bubbles: !0 })), e.focus());
  };
  return /* @__PURE__ */ te(
    "div",
    {
      className: i(
        "relative flex items-center",
        p && "w-full",
        h && "cursor-not-allowed"
      ),
      children: [
        C && /* @__PURE__ */ s("span", { ref: J, className: i(F, ue[a], "text-ink-3"), children: l }),
        /* @__PURE__ */ s(
          "input",
          {
            id: z,
            disabled: h,
            className: i(
              D,
              de[a],
              f ? "font-mono placeholder:font-sans" : "font-sans",
              // §4.2 numbers: no native spinners, figures that line up, left-aligned.
              I && "su-no-spinner su-tabular",
              $
            ),
            style: Y,
            required: t == null ? void 0 : t.required,
            inputMode: I ? "decimal" : void 0,
            spellCheck: c ? !1 : void 0,
            ...r,
            type: c && x ? "text" : r.type,
            ref: Z,
            onChange: d ? (e) => {
              L(e.target.value !== ""), v == null || v(e);
            } : v,
            "aria-describedby": A ?? (t == null ? void 0 : t.descriptionId),
            "aria-invalid": X ?? (t != null && t.error ? !0 : void 0)
          }
        ),
        c ? (
          // 2 in from the field's edge on three sides: 32 in a 36 field, and it follows the
          // handheld height.
          /* @__PURE__ */ s("span", { className: "absolute top-[2px] bottom-[2px] end-[2px] flex", children: /* @__PURE__ */ s(
            "button",
            {
              type: "button",
              "aria-label": "Show password",
              title: "Show password",
              "aria-pressed": x,
              "aria-controls": z,
              disabled: h,
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => V((e) => !e),
              className: i(
                W,
                "h-full aspect-square rounded-su-control text-ink-2 disabled:text-ink-3"
              ),
              children: x ? /* @__PURE__ */ s(ae, { size: 18, stroke: 1.75, "aria-hidden": "true" }) : /* @__PURE__ */ s(ie, { size: 18, stroke: 1.75, "aria-hidden": "true" })
            }
          ) })
        ) : S ? /* @__PURE__ */ s(ve, { size: a, onClick: ee }) : g && /* @__PURE__ */ s(
          "span",
          {
            ref: Q,
            className: i(F, pe[a], be[a], "text-ink-2"),
            children: o
          }
        )
      ]
    }
  );
}
export {
  ve as FieldClearButton,
  _e as Input,
  me as fieldClearPadding,
  Ie as inputClass,
  de as inputSizeClass,
  Ne as nativePickerClass,
  Se as selectTriggerClass,
  ze as selectTriggerSizeClass
};
