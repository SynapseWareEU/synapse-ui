import * as n from "react";
import { composeEventHandlers as I } from "../../primitive/dist/index.js";
import { Primitive as A, dispatchDiscreteCustomEvent as G } from "../../react-primitive/dist/index.js";
import { useComposedRefs as H } from "../../react-compose-refs/dist/index.js";
import { useCallbackRef as T } from "../../react-use-callback-ref/dist/index.js";
import { jsx as z } from "react/jsx-runtime";
var J = Object.defineProperty, a = (c, r) => J(c, "name", { value: r, configurable: !0 }), g = "dismissableLayer.update", K = "dismissableLayer.pointerDownOutside", Q = "dismissableLayer.focusOutside", N, k = n.createContext({
  layers: /* @__PURE__ */ new Set(),
  layersWithOutsidePointerEventsDisabled: /* @__PURE__ */ new Set(),
  branches: /* @__PURE__ */ new Set(),
  // Outside elements that belong to a layer's own dismiss affordance (eg, a
  // dialog overlay). Pressing them should dismiss the layer regardless of
  // whether or not they stop propagation.
  //
  // See https://github.com/radix-ui/primitives/issues/3346
  dismissableSurfaces: /* @__PURE__ */ new Set()
}), V = /* @__PURE__ */ n.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ a(function(r, e) {
    const {
      disableOutsidePointerEvents: u = !1,
      deferPointerDownOutside: d = !1,
      onEscapeKeyDown: l,
      onPointerDownOutside: m,
      onFocusOutside: D,
      onInteractOutside: E,
      onDismiss: f,
      ...b
    } = r, t = n.useContext(k), [s, P] = n.useState(null), v = (s == null ? void 0 : s.ownerDocument) ?? (globalThis == null ? void 0 : globalThis.document), [, w] = n.useState({}), O = H(e, P), y = Array.from(t.layers), [L] = [
      ...t.layersWithOutsidePointerEventsDisabled
    ].slice(-1), i = L ? y.indexOf(L) : -1, h = s ? y.indexOf(s) : -1, C = t.layersWithOutsidePointerEventsDisabled.size > 0, p = h >= i, F = n.useRef(!1), X = j(
      (o) => {
        m == null || m(o), E == null || E(o), o.defaultPrevented || f == null || f();
      },
      {
        ownerDocument: v,
        deferPointerDownOutside: d,
        isDeferredPointerDownOutsideRef: F,
        dismissableSurfaces: t.dismissableSurfaces,
        shouldHandlePointerDownOutside: n.useCallback(
          (o) => {
            if (!(o instanceof Node))
              return !1;
            const S = [...t.branches].some(
              (_) => _.contains(o)
            );
            return p && !S;
          },
          [t.branches, p]
        )
      }
    ), W = M((o) => {
      if (d && F.current)
        return;
      const S = o.target;
      [...t.branches].some((q) => q.contains(S)) || (D == null || D(o), E == null || E(o), o.defaultPrevented || f == null || f());
    }, v), U = s ? h === y.length - 1 : !1, R = T((o) => {
      o.key === "Escape" && (l == null || l(o), !o.defaultPrevented && f && (o.preventDefault(), f()));
    });
    return n.useEffect(() => {
      if (U)
        return v.addEventListener("keydown", R, { capture: !0 }), () => v.removeEventListener("keydown", R, { capture: !0 });
    }, [v, U, R]), n.useEffect(() => {
      if (s)
        return u && (t.layersWithOutsidePointerEventsDisabled.size === 0 && (N = v.body.style.pointerEvents, v.body.style.pointerEvents = "none"), t.layersWithOutsidePointerEventsDisabled.add(s)), t.layers.add(s), B(), () => {
          u && (t.layersWithOutsidePointerEventsDisabled.delete(s), t.layersWithOutsidePointerEventsDisabled.size === 0 && (v.body.style.pointerEvents = N));
        };
    }, [s, v, u, t]), n.useEffect(() => () => {
      s && (t.layers.delete(s), t.layersWithOutsidePointerEventsDisabled.delete(s), B());
    }, [s, t]), n.useEffect(() => {
      const o = /* @__PURE__ */ a(() => w({}), "handleUpdate");
      return document.addEventListener(g, o), () => document.removeEventListener(g, o);
    }, []), /* @__PURE__ */ z(
      A.div,
      {
        ...b,
        ref: O,
        style: {
          pointerEvents: C ? p ? "auto" : "none" : void 0,
          ...r.style
        },
        onFocusCapture: I(r.onFocusCapture, W.onFocusCapture),
        onBlurCapture: I(r.onBlurCapture, W.onBlurCapture),
        onPointerDownCapture: I(
          r.onPointerDownCapture,
          X.onPointerDownCapture
        )
      }
    );
  }, "DismissableLayer")
), Y = /* @__PURE__ */ n.forwardRef(/* @__PURE__ */ a(function(r, e) {
  const u = n.useContext(k), d = n.useRef(null), l = H(e, d);
  return n.useEffect(() => {
    const m = d.current;
    if (m)
      return u.branches.add(m), () => {
        u.branches.delete(m);
      };
  }, [u.branches]), /* @__PURE__ */ z(A.div, { ...r, ref: l });
}, "DismissableLayerBranch"));
function Z() {
  const c = n.useContext(k), [r, e] = n.useState(null);
  return n.useEffect(() => {
    if (r)
      return c.dismissableSurfaces.add(r), () => {
        c.dismissableSurfaces.delete(r);
      };
  }, [r, c.dismissableSurfaces]), e;
}
a(Z, "useDismissableLayerSurface");
var $ = /* @__PURE__ */ a(() => !0, "IS_TRUE");
function j(c, r) {
  const {
    ownerDocument: e = globalThis == null ? void 0 : globalThis.document,
    deferPointerDownOutside: u = !1,
    isDeferredPointerDownOutsideRef: d,
    dismissableSurfaces: l,
    shouldHandlePointerDownOutside: m = $
  } = r, D = T(c), E = n.useRef(!1), f = n.useRef(!1), b = n.useRef(/* @__PURE__ */ new Map()), t = n.useRef(() => {
  });
  return n.useEffect(() => {
    function s() {
      f.current = !1, d.current = !1, b.current.clear();
    }
    a(s, "resetOutsideInteraction");
    function P() {
      return Array.from(b.current.values()).some(Boolean);
    }
    a(P, "isOutsideInteractionIntercepted");
    function v(i) {
      if (!f.current)
        return;
      const h = i.target;
      h instanceof Node && [...l].some((p) => p.contains(h)) || b.current.set(i.type, !0), i.type === "click" && window.setTimeout(() => {
        f.current && t.current();
      }, 0);
    }
    a(v, "handleInteractionCapture");
    function w(i) {
      f.current && b.current.set(i.type, !1);
    }
    a(w, "handleInteractionBubble");
    const O = /* @__PURE__ */ a((i) => {
      if (i.target && !E.current) {
        let h = function() {
          e.removeEventListener("click", t.current);
          const p = P();
          s(), p || x(
            K,
            D,
            C,
            { discrete: !0 }
          );
        };
        if (a(h, "handleAndDispatchPointerDownOutsideEvent"), !m(i.target)) {
          e.removeEventListener("click", t.current), s(), E.current = !1;
          return;
        }
        const C = { originalEvent: i };
        f.current = !0, d.current = u && i.button === 0, b.current.clear(), !u || i.button !== 0 ? h() : (e.removeEventListener("click", t.current), t.current = h, e.addEventListener("click", t.current, { once: !0 }));
      } else
        e.removeEventListener("click", t.current), s();
      E.current = !1;
    }, "handlePointerDown"), y = [
      "pointerup",
      "mousedown",
      "mouseup",
      "touchstart",
      "touchend",
      "click"
    ];
    for (const i of y)
      e.addEventListener(i, v, !0), e.addEventListener(i, w);
    const L = window.setTimeout(() => {
      e.addEventListener("pointerdown", O);
    }, 0);
    return () => {
      window.clearTimeout(L), e.removeEventListener("pointerdown", O), e.removeEventListener("click", t.current);
      for (const i of y)
        e.removeEventListener(i, v, !0), e.removeEventListener(i, w);
    };
  }, [
    e,
    D,
    u,
    d,
    l,
    m
  ]), {
    // ensures we check React component tree (not just DOM tree)
    onPointerDownCapture: /* @__PURE__ */ a(() => E.current = !0, "onPointerDownCapture")
  };
}
a(j, "usePointerDownOutside");
function M(c, r = globalThis == null ? void 0 : globalThis.document) {
  const e = T(c), u = n.useRef(!1);
  return n.useEffect(() => {
    const d = /* @__PURE__ */ a((l) => {
      l.target && !u.current && x(Q, e, { originalEvent: l }, {
        discrete: !1
      });
    }, "handleFocus");
    return r.addEventListener("focusin", d), () => r.removeEventListener("focusin", d);
  }, [r, e]), {
    onFocusCapture: /* @__PURE__ */ a(() => u.current = !0, "onFocusCapture"),
    onBlurCapture: /* @__PURE__ */ a(() => u.current = !1, "onBlurCapture")
  };
}
a(M, "useFocusOutside");
function B() {
  const c = new CustomEvent(g);
  document.dispatchEvent(c);
}
a(B, "dispatchUpdate");
function x(c, r, e, { discrete: u }) {
  const d = e.originalEvent.target, l = new CustomEvent(c, { bubbles: !1, cancelable: !0, detail: e });
  r && d.addEventListener(c, r, { once: !0 }), u ? G(d, l) : d.dispatchEvent(l);
}
a(x, "handleAndDispatchCustomEvent");
var ie = V, oe = Y;
export {
  oe as Branch,
  V as DismissableLayer,
  Y as DismissableLayerBranch,
  ie as Root,
  Z as useDismissableLayerSurface
};
