import * as i from "react";
import { useComposedRefs as C } from "../../react-compose-refs/dist/index.js";
var L = Object.defineProperty, a = (e, t) => L(e, "name", { value: t, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function h(e) {
  const t = i.forwardRef((r, n) => {
    let { children: o, ...s } = r, l = null, c = !1;
    const f = [];
    m(o) && typeof u == "function" && (o = u(o._payload)), i.Children.forEach(o, (S) => {
      var b;
      if (P(S)) {
        c = !0;
        const p = S;
        let d = "child" in p.props ? p.props.child : p.props.children;
        m(d) && typeof u == "function" && (d = u(d._payload)), l = j(p, d), f.push((b = l == null ? void 0 : l.props) == null ? void 0 : b.children);
      } else
        f.push(S);
    }), l ? l = i.cloneElement(l, void 0, f) : (
      // A `Slottable` was found but it didn't resolve to a single element (e.g.
      // it wrapped multiple elements, text, or a render-prop `child` that
      // wasn't an element). Don't fall back to treating the `Slottable` wrapper
      // itself as the slot target — throw a descriptive error below instead.
      !c && i.Children.count(o) === 1 && i.isValidElement(o) && (l = o)
    );
    const y = l ? v(l) : void 0, x = C(n, y);
    if (!l) {
      if (o || o === 0)
        throw new Error(
          c ? V(e) : O(e)
        );
      return o;
    }
    const E = R(s, l.props ?? {});
    return l.type !== i.Fragment && (E.ref = n ? x : y), i.cloneElement(l, E);
  });
  return t.displayName = `${e}.Slot`, t;
}
a(h, "createSlot");
var W = /* @__PURE__ */ h("Slot"), g = Symbol.for("radix.slottable");
// @__NO_SIDE_EFFECTS__
function _(e) {
  const t = /* @__PURE__ */ a((r) => "child" in r ? r.children(r.child) : r.children, "Slottable");
  return t.displayName = `${e}.Slottable`, t.__radixId = g, t;
}
a(_, "createSlottable");
var A = /* @__PURE__ */ _("Slottable"), j = /* @__PURE__ */ a((e, t) => {
  if ("child" in e.props) {
    const r = e.props.child;
    return i.isValidElement(r) ? i.cloneElement(r, void 0, e.props.children(r.props.children)) : null;
  }
  return i.isValidElement(t) ? t : null;
}, "getSlottableElementFromSlottable");
function R(e, t) {
  const r = { ...t };
  for (const n in t) {
    const o = e[n], s = t[n];
    /^on[A-Z]/.test(n) ? o && s ? r[n] = (...c) => {
      const f = s(...c);
      return o(...c), f;
    } : o && (r[n] = o) : n === "style" ? r[n] = { ...o, ...s } : n === "className" && (r[n] = [o, s].filter(Boolean).join(" "));
  }
  return { ...e, ...r };
}
a(R, "mergeProps");
function v(e) {
  var n, o;
  let t = (n = Object.getOwnPropertyDescriptor(e.props, "ref")) == null ? void 0 : n.get, r = t && "isReactWarning" in t && t.isReactWarning;
  return r ? e.ref : (t = (o = Object.getOwnPropertyDescriptor(e, "ref")) == null ? void 0 : o.get, r = t && "isReactWarning" in t && t.isReactWarning, r ? e.props.ref : e.props.ref || e.ref);
}
a(v, "getElementRef");
function P(e) {
  return i.isValidElement(e) && typeof e.type == "function" && "__radixId" in e.type && e.type.__radixId === g;
}
a(P, "isSlottable");
var I = Symbol.for("react.lazy");
function m(e) {
  return e != null && typeof e == "object" && "$$typeof" in e && e.$$typeof === I && "_payload" in e && $(e._payload);
}
a(m, "isLazyComponent");
function $(e) {
  return typeof e == "object" && e !== null && "then" in e;
}
a($, "isPromiseLike");
var O = /* @__PURE__ */ a((e) => `${e} failed to slot onto its children. Expected a single React element child or \`Slottable\`.`, "createSlotError"), V = /* @__PURE__ */ a((e) => `${e} failed to slot onto its \`Slottable\`. Expected \`Slottable\` to receive a single React element child.`, "createSlottableError"), u = i[" use ".trim().toString()];
export {
  W as Root,
  W as Slot,
  A as Slottable,
  h as createSlot,
  _ as createSlottable
};
