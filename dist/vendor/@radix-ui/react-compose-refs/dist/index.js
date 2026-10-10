import * as i from "react";
var l = Object.defineProperty, s = (e, n) => l(e, "name", { value: n, configurable: !0 });
function f(e, n) {
  if (typeof e == "function")
    return e(n);
  e != null && (e.current = n);
}
s(f, "setRef");
function r(...e) {
  return (n) => {
    let u = !1;
    const c = e.map((t) => {
      const o = f(t, n);
      return !u && typeof o == "function" && (u = !0), o;
    });
    if (u)
      return () => {
        for (let t = 0; t < c.length; t++) {
          const o = c[t];
          typeof o == "function" ? o() : f(e[t], null);
        }
      };
  };
}
s(r, "composeRefs");
function p(...e) {
  return i.useCallback(r(...e), e);
}
s(p, "useComposedRefs");
export {
  r as composeRefs,
  p as useComposedRefs
};
