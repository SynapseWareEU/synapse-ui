import * as d from "react";
import { Primitive as f } from "../../react-primitive/dist/index.js";
import { jsx as m } from "react/jsx-runtime";
var l = Object.defineProperty, e = (r, o) => l(r, "name", { value: o, configurable: !0 }), i = "horizontal", O = ["horizontal", "vertical"], u = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ e(function(o, c) {
    const { decorative: p, orientation: a = i, ...s } = o, t = n(a) ? a : i, v = p ? { role: "none" } : { "aria-orientation": t === "vertical" ? t : void 0, role: "separator" };
    return /* @__PURE__ */ m(
      f.div,
      {
        "data-orientation": t,
        ...v,
        ...s,
        ref: c
      }
    );
  }, "Separator")
);
function n(r) {
  return O.includes(r);
}
e(n, "isValidOrientation");
var _ = u;
export {
  _ as Root,
  u as Separator
};
