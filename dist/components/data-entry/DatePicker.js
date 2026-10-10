import { jsx as r, jsxs as m } from "react/jsx-runtime";
import { useState as I, useCallback as h } from "react";
import { cn as o } from "../../utils/cn.js";
import { Button as _ } from "../general/Button.js";
import { useFormItemContext as D, useFieldState as S, formLabelClass as q } from "./Form.js";
import { inputSizeClass as F, nativePickerClass as P, inputClass as j } from "./Input.js";
const E = "[&::-webkit-calendar-picker-indicator]:size-[16px] [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:ms-su2 [&::-webkit-calendar-picker-indicator]:p-0", R = {
  sm: "pe-su2",
  md: "pe-[10px]",
  lg: "pe-su3"
};
function B({
  value: n,
  defaultValue: k,
  min: c,
  max: u,
  disabled: p,
  size: f,
  className: w,
  onChange: d
}) {
  const a = D(), { size: b, disabled: v } = S(f, p), [e, x] = I(k ?? ""), s = n !== void 0, N = s ? n : e, g = h(
    (i) => {
      s || x(i), d == null || d(i);
    },
    [s, d]
  ), t = (i) => {
    g(i.target.value);
  };
  return /* @__PURE__ */ r(
    "div",
    {
      className: o(
        "inline-flex w-full max-w-[220px]",
        v && "cursor-not-allowed",
        w
      ),
      children: /* @__PURE__ */ r(
        "input",
        {
          type: "date",
          id: a == null ? void 0 : a.id,
          value: N,
          min: c,
          max: u,
          disabled: v,
          onChange: t,
          className: o(
            j,
            P,
            F[b],
            E,
            R[b]
          ),
          required: a == null ? void 0 : a.required,
          "aria-describedby": a == null ? void 0 : a.descriptionId,
          "aria-invalid": a != null && a.error ? !0 : void 0
        }
      )
    }
  );
}
function A({
  value: n,
  defaultValue: k = ["", ""],
  onChange: c,
  presets: u = [],
  startLabel: p = "Start date",
  endLabel: f = "End date",
  disabled: w,
  min: d,
  max: a,
  size: b,
  className: v
}) {
  const e = D(), { size: x, disabled: s } = S(b, w), [N, g] = I(k), t = n !== void 0, i = t ? n : N, y = h(
    (l) => {
      t || g(l), c == null || c(l);
    },
    [t, c]
  ), z = o(
    j,
    P,
    F[x],
    E,
    R[x]
  ), C = o(
    "flex flex-col min-w-0 flex-[1_1_160px] max-w-[220px]",
    s && "cursor-not-allowed"
  );
  return /* @__PURE__ */ m("div", { className: o("flex flex-col gap-su3 w-full", v), children: [
    /* @__PURE__ */ m("div", { className: "flex flex-wrap gap-x-su4 gap-y-su3", children: [
      /* @__PURE__ */ m("label", { className: C, children: [
        p && /* @__PURE__ */ r("span", { className: q, children: p }),
        /* @__PURE__ */ r(
          "input",
          {
            type: "date",
            id: e == null ? void 0 : e.id,
            className: z,
            value: i[0],
            min: d,
            max: i[1] || a,
            disabled: s,
            required: e == null ? void 0 : e.required,
            "aria-describedby": e == null ? void 0 : e.descriptionId,
            "aria-invalid": e != null && e.error ? !0 : void 0,
            onChange: (l) => y([l.target.value, i[1]])
          }
        )
      ] }),
      /* @__PURE__ */ m("label", { className: C, children: [
        f && /* @__PURE__ */ r("span", { className: q, children: f }),
        /* @__PURE__ */ r(
          "input",
          {
            type: "date",
            className: z,
            value: i[1],
            min: i[0] || d,
            max: a,
            disabled: s,
            required: e == null ? void 0 : e.required,
            "aria-describedby": e == null ? void 0 : e.descriptionId,
            "aria-invalid": e != null && e.error ? !0 : void 0,
            onChange: (l) => y([i[0], l.target.value])
          }
        )
      ] })
    ] }),
    u.length > 0 && /* @__PURE__ */ r("div", { className: "flex flex-wrap gap-su2", children: u.map((l) => /* @__PURE__ */ r(
      _,
      {
        variant: "default",
        size: "sm",
        disabled: s,
        onClick: () => y(l.value),
        children: l.label
      },
      l.label
    )) })
  ] });
}
B.RangePicker = A;
export {
  B as DatePicker,
  A as DateRangePicker,
  R as pickerEndPadClass,
  E as pickerFieldClass
};
