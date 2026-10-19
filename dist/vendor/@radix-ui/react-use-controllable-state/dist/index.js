import * as r from "react";
import { useLayoutEffect as T } from "../../react-use-layout-effect/dist/index.js";
import { useEffectEvent as g } from "../../react-use-effect-event/dist/index.js";
var j = Object.defineProperty, S = (t, s) => j(t, "name", { value: s, configurable: !0 }), A = r[" useInsertionEffect ".trim().toString()] || T;
function I({
  prop: t,
  defaultProp: s,
  onChange: n = /* @__PURE__ */ S(() => {
  }, "onChange"),
  caller: f
}) {
  const [e, o, u] = y({
    defaultProp: s,
    onChange: n
  }), v = t !== void 0, l = v ? t : e, m = r.useCallback(
    (a) => {
      var c;
      if (v) {
        const i = P(a) ? a(t) : a;
        i !== t && ((c = u.current) == null || c.call(u, i));
      } else
        o(a);
    },
    [v, t, o, u]
  );
  return [l, m];
}
S(I, "useControllableState");
function y({
  defaultProp: t,
  onChange: s
}) {
  const [n, f] = r.useState(t), e = r.useRef(n), o = r.useRef(s);
  return A(() => {
    o.current = s;
  }, [s]), r.useEffect(() => {
    var u;
    e.current !== n && ((u = o.current) == null || u.call(o, n), e.current = n);
  }, [n, e]), [n, f, o];
}
S(y, "useUncontrolledState");
function P(t) {
  return typeof t == "function";
}
S(P, "isFunction");
var R = Symbol("RADIX:SYNC_STATE");
function O(t, s, n, f) {
  const { prop: e, defaultProp: o, onChange: u, caller: v } = s, l = e !== void 0, m = g(u), a = [{ ...n, state: o }];
  f && a.push(f);
  const [c, i] = r.useReducer(
    (p, E) => {
      if (E.type === R)
        return { ...p, state: E.state };
      const b = t(p, E);
      return l && !Object.is(b.state, p.state) && m(b.state), b;
    },
    ...a
  ), d = c.state, C = r.useRef(d);
  r.useEffect(() => {
    C.current !== d && (C.current = d, l || m(d));
  }, [d, C, l]);
  const _ = r.useMemo(() => e !== void 0 ? { ...c, state: e } : c, [c, e]);
  return r.useEffect(() => {
    l && !Object.is(e, c.state) && i({ type: R, state: e });
  }, [e, c.state, l]), [_, i];
}
S(O, "useControllableStateReducer");
export {
  I as useControllableState,
  O as useControllableStateReducer
};
