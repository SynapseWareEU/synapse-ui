import * as a from "react";
import { jsx as _ } from "react/jsx-runtime";
var b = Object.defineProperty, r = (e, c) => b(e, "name", { value: c, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function $(e, c) {
  const s = a.createContext(c);
  s.displayName = e + "Context";
  const x = /* @__PURE__ */ r((u) => {
    const { children: o, ...t } = u, n = a.useMemo(() => t, Object.values(t));
    return /* @__PURE__ */ _(s.Provider, { value: n, children: o });
  }, "Provider");
  x.displayName = e + "Provider";
  function i(u, o = {}) {
    const { optional: t = !1 } = o, n = a.useContext(s);
    if (n) return n;
    if (c !== void 0) return c;
    if (!t)
      throw new Error(`\`${u}\` must be used within \`${e}\``);
  }
  return r(i, "useContext"), [x, i];
}
r($, "createContext");
// @__NO_SIDE_EFFECTS__
function w(e, c = []) {
  let s = [];
  function x(u, o) {
    const t = a.createContext(o);
    t.displayName = u + "Context";
    const n = s.length;
    s = [...s, o];
    const f = /* @__PURE__ */ r((d) => {
      var C;
      const { scope: p, children: l, ...v } = d, P = ((C = p == null ? void 0 : p[e]) == null ? void 0 : C[n]) || t, m = a.useMemo(() => v, Object.values(v));
      return /* @__PURE__ */ _(P.Provider, { value: m, children: l });
    }, "Provider");
    f.displayName = u + "Provider";
    function S(d, p, l = {}) {
      var C;
      const { optional: v = !1 } = l, P = ((C = p == null ? void 0 : p[e]) == null ? void 0 : C[n]) || t, m = a.useContext(P);
      if (m) return m;
      if (o !== void 0) return o;
      if (!v)
        throw new Error(`\`${d}\` must be used within \`${u}\``);
    }
    return r(S, "useContext"), [f, S];
  }
  r(x, "createContext");
  const i = /* @__PURE__ */ r(() => {
    const u = s.map((o) => a.createContext(o));
    return /* @__PURE__ */ r(function(t) {
      const n = (t == null ? void 0 : t[e]) || u;
      return a.useMemo(
        () => ({ [`__scope${e}`]: { ...t, [e]: n } }),
        [t, n]
      );
    }, "useScope");
  }, "createScope");
  return i.scopeName = e, [x, h(i, ...c)];
}
r(w, "createContextScope");
function h(...e) {
  const c = e[0];
  if (e.length === 1) return c;
  const s = /* @__PURE__ */ r(() => {
    const x = e.map((i) => ({
      useScope: i(),
      scopeName: i.scopeName
    }));
    return /* @__PURE__ */ r(function(u) {
      const o = x.reduce((t, { useScope: n, scopeName: f }) => {
        const d = n(u)[`__scope${f}`];
        return { ...t, ...d };
      }, {});
      return a.useMemo(() => ({ [`__scope${c.scopeName}`]: o }), [o]);
    }, "useComposedScopes");
  }, "createScope");
  return s.scopeName = c.scopeName, s;
}
r(h, "composeContextScopes");
export {
  $ as createContext,
  w as createContextScope
};
