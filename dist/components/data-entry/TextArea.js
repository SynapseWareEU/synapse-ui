import { jsx as l } from "react/jsx-runtime";
import { cn as c } from "../../utils/cn.js";
import { useFormItemContext as u, useFieldState as m } from "./Form.js";
import { inputClass as b } from "./Input.js";
const f = {
  sm: "min-h-[72px] px-su2 py-su2 text-control",
  md: "min-h-[80px] px-su3 py-su2 text-control",
  lg: "min-h-[88px] px-[14px] py-su2 text-section"
};
function C({
  size: e,
  mono: s,
  disabled: i,
  className: o,
  id: t,
  "aria-describedby": a,
  "aria-invalid": n,
  ...d
}) {
  const r = u(), { size: p, disabled: x } = m(e, i);
  return /* @__PURE__ */ l(
    "textarea",
    {
      id: t ?? (r == null ? void 0 : r.id),
      disabled: x,
      required: r == null ? void 0 : r.required,
      className: c(
        b,
        "block m-0 resize-y",
        f[p],
        // After `inputClass`'s font-sans; both are one class, so the later rule must be this one.
        s && "!font-mono placeholder:!font-sans",
        o
      ),
      ...d,
      "aria-describedby": a ?? (r == null ? void 0 : r.descriptionId),
      "aria-invalid": n ?? (r != null && r.error ? !0 : void 0)
    }
  );
}
export {
  C as TextArea,
  f as textareaSizeClass
};
