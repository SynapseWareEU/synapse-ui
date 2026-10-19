import * as a from "react";
import * as s from "react-dom";
import { Primitive as u } from "../../react-primitive/dist/index.js";
import { useLayoutEffect as l } from "../../react-use-layout-effect/dist/index.js";
import { jsx as p } from "react/jsx-runtime";
var P = Object.defineProperty, d = (t, r) => P(t, "name", { value: r, configurable: !0 }), _ = /* @__PURE__ */ a.forwardRef(
  /* @__PURE__ */ d(function(r, n) {
    var e;
    const { container: f, ...i } = r, [c, m] = a.useState(!1);
    l(() => m(!0), []);
    const o = f || c && ((e = globalThis == null ? void 0 : globalThis.document) == null ? void 0 : e.body);
    return o ? s.createPortal(/* @__PURE__ */ p(u.div, { ...i, ref: n }), o) : null;
  }, "Portal")
);
export {
  _ as Portal
};
