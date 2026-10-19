import { useLayoutEffect as c } from "../../react-use-layout-effect/dist/index.js";
import * as r from "react";
var i = Object.defineProperty, s = (t, e) => i(t, "name", { value: e, configurable: !0 }), f = r[" useEffectEvent ".trim().toString()], o = r[" useInsertionEffect ".trim().toString()];
function a(t) {
  if (typeof f == "function")
    return f(t);
  const e = r.useRef(() => {
    throw new Error("Cannot call an event handler while rendering.");
  });
  return typeof o == "function" ? o(() => {
    e.current = t;
  }) : c(() => {
    e.current = t;
  }), r.useMemo(() => ((...u) => {
    var n;
    return (n = e.current) == null ? void 0 : n.call(e, ...u);
  }), []);
}
s(a, "useEffectEvent");
export {
  a as useEffectEvent
};
