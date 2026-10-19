import * as c from "react";
import { useFloating as Pe, offset as xe, shift as we, flip as ye, size as ve, arrow as Ae, hide as Ce, limitShift as Se } from "../../../@floating-ui/react-dom/dist/floating-ui.react-dom.js";
import { useComposedRefs as q } from "../../react-compose-refs/dist/index.js";
import { createContextScope as be } from "../../react-context/dist/index.js";
import { Primitive as G } from "../../react-primitive/dist/index.js";
import { useCallbackRef as Re } from "../../react-use-callback-ref/dist/index.js";
import { useLayoutEffect as W } from "../../react-use-layout-effect/dist/index.js";
import { useSize as Oe } from "../../react-use-size/dist/index.js";
import { jsx as S } from "react/jsx-runtime";
import { autoUpdate as _e } from "../../../@floating-ui/dom/dist/floating-ui.dom.js";
var $e = Object.defineProperty, m = (t, n) => $e(t, "name", { value: n, configurable: !0 }), J = "Popper", [K, Ze] = be(J), [Ee, Q] = K(J), Ne = /* @__PURE__ */ m((t) => {
  const { __scopePopper: n, children: p } = t, [l, a] = c.useState(null), [h, e] = c.useState(void 0);
  return /* @__PURE__ */ S(
    Ee,
    {
      scope: n,
      anchor: l,
      onAnchorChange: a,
      placementState: h,
      setPlacementState: e,
      children: p
    }
  );
}, "Popper"), He = "PopperAnchor", We = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ m(function(n, p) {
    const { __scopePopper: l, virtualRef: a, ...h } = n, e = Q(He, l), v = c.useRef(null), i = e.onAnchorChange, d = c.useCallback(
      (o) => {
        v.current = o, o && i(o);
      },
      [i]
    ), u = q(p, d), r = c.useRef(null);
    c.useEffect(() => {
      if (!a)
        return;
      const o = r.current;
      r.current = a.current, o !== r.current && i(r.current);
    });
    const s = e.placementState && _(e.placementState), g = s == null ? void 0 : s[0], f = s == null ? void 0 : s[1];
    return a ? null : /* @__PURE__ */ S(
      G.div,
      {
        "data-radix-popper-side": g,
        "data-radix-popper-align": f,
        ...h,
        ref: u
      }
    );
  }, "PopperAnchor")
), V = "PopperContent", [Fe, Ue] = K(V), Me = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ m(function(n, p) {
    var D, z, L, T, X, Y, Z;
    const {
      __scopePopper: l,
      side: a = "bottom",
      sideOffset: h = 0,
      align: e = "center",
      alignOffset: v = 0,
      arrowPadding: i = 0,
      avoidCollisions: d = !0,
      collisionBoundary: u = [],
      collisionPadding: r = 0,
      sticky: s = "partial",
      hideWhenDetached: g = !1,
      updatePositionStrategy: f = "optimized",
      onPlaced: o,
      ...P
    } = n, A = Q(V, l), [x, te] = c.useState(null), re = q(p, te), [$, oe] = c.useState(null), w = Oe($), ne = (w == null ? void 0 : w.width) ?? 0, F = (w == null ? void 0 : w.height) ?? 0, ae = a + (e !== "center" ? "-" + e : ""), ie = typeof r == "number" ? r : { top: 0, right: 0, bottom: 0, left: 0, ...r }, M = Array.isArray(u) ? u : [u], k = M.length > 0, C = {
      padding: ie,
      boundary: M.filter(ee),
      // with `strategy: 'fixed'`, this is the only way to get it to respect boundaries
      altBoundary: k
    }, { refs: se, floatingStyles: I, placement: E, isPositioned: b, middlewareData: y } = Pe({
      // default to `fixed` strategy so users don't have to pick and we also avoid focus scroll issues
      strategy: "fixed",
      placement: ae,
      whileElementsMounted: /* @__PURE__ */ m((...H) => _e(...H, {
        animationFrame: f === "always"
      }), "whileElementsMounted"),
      elements: {
        reference: A.anchor
      },
      middleware: [
        xe({ mainAxis: h + F, alignmentAxis: v }),
        d && we({
          mainAxis: !0,
          crossAxis: !1,
          limiter: s === "partial" ? Se() : void 0,
          ...C
        }),
        d && ye({ ...C }),
        ve({
          ...C,
          apply: /* @__PURE__ */ m(({ elements: H, rects: U, availableWidth: me, availableHeight: ue }) => {
            const { width: he, height: ge } = U.reference, O = H.floating.style;
            O.setProperty("--radix-popper-available-width", `${me}px`), O.setProperty("--radix-popper-available-height", `${ue}px`), O.setProperty("--radix-popper-anchor-width", `${he}px`), O.setProperty("--radix-popper-anchor-height", `${ge}px`);
          }, "apply")
        }),
        $ && Ae({ element: $, padding: i }),
        ke({ arrowWidth: ne, arrowHeight: F }),
        g && Ce({
          strategy: "referenceHidden",
          ...C,
          // `hide` detects whether the anchor (reference) is clipped, so when
          // no explicit `collisionBoundary` is set we fall back to Floating
          // UI's default clipping ancestors (e.g. a scrollable menu). This
          // lets an occluded submenu hide once its anchor scrolls out of view
          // (#3237). The collision/size middlewares deliberately keep the
          // viewport-based default to avoid clamping content rendered inside
          // transformed or overflow-clipping portal containers.
          boundary: k ? C.boundary : void 0
        })
      ]
    }), N = A.setPlacementState;
    W(() => (N(E), () => {
      N(void 0);
    }), [E, N]);
    const [j, B] = _(E), R = Re(o);
    W(() => {
      b && (R == null || R());
    }, [b, R]);
    const ce = (D = y.arrow) == null ? void 0 : D.x, pe = (z = y.arrow) == null ? void 0 : z.y, le = ((L = y.arrow) == null ? void 0 : L.centerOffset) !== 0, [de, fe] = c.useState();
    return W(() => {
      x && fe(window.getComputedStyle(x).zIndex);
    }, [x]), /* @__PURE__ */ S(
      "div",
      {
        ref: se.setFloating,
        "data-radix-popper-content-wrapper": "",
        style: {
          ...I,
          transform: b ? I.transform : "translate(0, -200%)",
          // keep off the page when measuring
          minWidth: "max-content",
          zIndex: de,
          "--radix-popper-transform-origin": [
            (T = y.transformOrigin) == null ? void 0 : T.x,
            (X = y.transformOrigin) == null ? void 0 : X.y
          ].join(" "),
          // hide the content if using the hide middleware and should be hidden
          // set visibility to hidden and disable pointer events so the UI behaves
          // as if the PopperContent isn't there at all
          ...((Y = y.hide) == null ? void 0 : Y.referenceHidden) && {
            visibility: "hidden",
            pointerEvents: "none"
          }
        },
        dir: n.dir,
        children: /* @__PURE__ */ S(
          Fe,
          {
            scope: l,
            placedSide: j,
            placedAlign: B,
            onArrowChange: oe,
            arrowX: ce,
            arrowY: pe,
            shouldHideArrow: le,
            children: /* @__PURE__ */ S(
              G.div,
              {
                "data-side": j,
                "data-align": B,
                ...P,
                ref: re,
                style: {
                  ...P.style,
                  // if the PopperContent hasn't been placed yet (not all
                  // measurements done) we prevent animations so that users'
                  // animations don't kick in too early from the wrong sides.
                  animation: b ? (Z = P.style) == null ? void 0 : Z.animation : "none"
                }
              }
            )
          }
        )
      }
    );
  }, "PopperContent")
);
function ee(t) {
  return t !== null;
}
m(ee, "isNotNull");
var ke = /* @__PURE__ */ m((t) => ({
  name: "transformOrigin",
  options: t,
  fn(n) {
    var P, A, x;
    const { placement: p, rects: l, middlewareData: a } = n, e = ((P = a.arrow) == null ? void 0 : P.centerOffset) !== 0, v = e ? 0 : t.arrowWidth, i = e ? 0 : t.arrowHeight, [d, u] = _(p), r = { start: "0%", center: "50%", end: "100%" }[u], s = (((A = a.arrow) == null ? void 0 : A.x) ?? 0) + v / 2, g = (((x = a.arrow) == null ? void 0 : x.y) ?? 0) + i / 2;
    let f = "", o = "";
    return d === "bottom" ? (f = e ? r : `${s}px`, o = `${-i}px`) : d === "top" ? (f = e ? r : `${s}px`, o = `${l.floating.height + i}px`) : d === "right" ? (f = `${-i}px`, o = e ? r : `${g}px`) : d === "left" && (f = `${l.floating.width + i}px`, o = e ? r : `${g}px`), { data: { x: f, y: o } };
  }
}), "transformOrigin");
function _(t) {
  const [n, p = "center"] = t.split("-");
  return [n, p];
}
m(_, "getSideAndAlignFromPlacement");
var qe = Ne, Ge = We, Je = Me;
export {
  Ge as Anchor,
  Je as Content,
  Ne as Popper,
  We as PopperAnchor,
  Me as PopperContent,
  qe as Root,
  Ze as createPopperScope
};
