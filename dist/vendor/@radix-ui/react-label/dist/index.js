import * as f from "react";
import { Primitive as i } from "../../react-primitive/dist/index.js";
import { jsx as n } from "react/jsx-runtime";
var l = Object.defineProperty, u = (r, e) => l(r, "name", { value: e, configurable: !0 }), m = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ u(function(e, o) {
    return /* @__PURE__ */ n(
      i.label,
      {
        ...e,
        ref: o,
        onMouseDown: (t) => {
          var a;
          t.target.closest("button, input, select, textarea") || ((a = e.onMouseDown) == null || a.call(e, t), !t.defaultPrevented && t.detail > 1 && t.preventDefault());
        }
      }
    );
  }, "Label")
), g = m;
export {
  m as Label,
  g as Root
};
