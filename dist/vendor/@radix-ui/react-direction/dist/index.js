import * as t from "react";
import { jsx as c } from "react/jsx-runtime";
var a = Object.defineProperty, o = (r, e) => a(r, "name", { value: e, configurable: !0 }), i = t.createContext(void 0), d = /* @__PURE__ */ o((r) => {
  const { dir: e, children: n } = r;
  return /* @__PURE__ */ c(i.Provider, { value: e, children: n });
}, "DirectionProvider");
function u(r) {
  const e = t.useContext(i);
  return r || e || "ltr";
}
o(u, "useDirection");
export {
  d as DirectionProvider,
  u as useDirection
};
