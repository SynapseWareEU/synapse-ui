import * as r from "react";
import { useLayoutEffect as u } from "../../react-use-layout-effect/dist/index.js";
var f = Object.defineProperty, n = (e, t) => f(e, "name", { value: t, configurable: !0 }), s = r[" useId ".trim().toString()] || (() => {
}), c = 0;
function d(e) {
  const [t, a] = r.useState(s());
  return u(() => {
    e || a((o) => o ?? String(c++));
  }, [e]), e || (t ? `radix-${t}` : "");
}
n(d, "useId");
export {
  d as useId
};
