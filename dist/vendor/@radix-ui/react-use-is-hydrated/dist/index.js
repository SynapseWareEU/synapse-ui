import * as s from "react";
var c = Object.defineProperty, a = (e, r) => c(e, "name", { value: r, configurable: !0 }), t = !1;
function u() {
  const [e, r] = s.useState(t);
  return s.useEffect(() => {
    t || (t = !0, r(!0));
  }, []), e;
}
a(u, "useIsHydrated");
var n = s[" useSyncExternalStore ".trim().toString()];
function d() {
  return () => {
  };
}
a(d, "subscribe");
function o() {
  return n(
    d,
    () => !0,
    () => !1
  );
}
a(o, "useIsHydratedModern");
var f = typeof n == "function" ? o : u;
export {
  f as useIsHydrated
};
