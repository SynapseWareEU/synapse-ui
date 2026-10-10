import { jsx as d } from "react/jsx-runtime";
import { useState as S, useCallback as q } from "react";
import { cn as o } from "../../utils/cn.js";
import { useFormItemContext as N, useFieldState as P } from "./Form.js";
import { inputSizeClass as j, nativePickerClass as D, inputClass as E } from "./Input.js";
import { pickerEndPadClass as T, pickerFieldClass as A } from "./DatePicker.js";
function M({
  value: l,
  defaultValue: n,
  min: c,
  max: u,
  step: p,
  disabled: m,
  size: b,
  className: f,
  onChange: i,
  id: v,
  name: k,
  "aria-label": x,
  "aria-labelledby": C
}) {
  const e = N(), { size: s, disabled: t } = P(b, m), [y, w] = S(n ?? ""), a = l !== void 0, z = a ? l : y, F = q(
    (r) => {
      a || w(r), i == null || i(r);
    },
    [a, i]
  ), I = (r) => {
    F(r.target.value);
  };
  return /* @__PURE__ */ d(
    "div",
    {
      className: o(
        "inline-flex w-full max-w-[180px]",
        t && "cursor-not-allowed",
        f
      ),
      children: /* @__PURE__ */ d(
        "input",
        {
          type: "time",
          id: v ?? (e == null ? void 0 : e.id),
          name: k,
          value: z,
          min: c,
          max: u,
          step: p,
          disabled: t,
          onChange: I,
          className: o(
            E,
            D,
            j[s],
            A,
            T[s]
          ),
          required: e == null ? void 0 : e.required,
          "aria-label": x,
          "aria-labelledby": C,
          "aria-describedby": e == null ? void 0 : e.descriptionId,
          "aria-invalid": e != null && e.error ? !0 : void 0
        }
      )
    }
  );
}
export {
  M as TimePicker
};
