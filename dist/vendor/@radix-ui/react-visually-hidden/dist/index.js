import * as a from "react";
import { Primitive as o } from "../../react-primitive/dist/index.js";
import { jsx as t } from "react/jsx-runtime";
var n = Object.defineProperty, d = (r, e) => n(r, "name", { value: e, configurable: !0 }), l = Object.freeze({
  // See: https://github.com/twbs/bootstrap/blob/main/scss/mixins/_visually-hidden.scss
  position: "absolute",
  border: 0,
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0, 0, 0, 0)",
  whiteSpace: "nowrap",
  wordWrap: "normal"
}), f = /* @__PURE__ */ a.forwardRef(
  /* @__PURE__ */ d(function(e, i) {
    return /* @__PURE__ */ t(
      o.span,
      {
        ...e,
        ref: i,
        style: { ...l, ...e.style }
      }
    );
  }, "VisuallyHidden")
), s = f;
export {
  s as Root,
  l as VISUALLY_HIDDEN_STYLES,
  f as VisuallyHidden
};
