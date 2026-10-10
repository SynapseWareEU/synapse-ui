import * as i from "react";
import { composeEventHandlers as E } from "../../primitive/dist/index.js";
import { useComposedRefs as G } from "../../react-compose-refs/dist/index.js";
import { createContextScope as z } from "../../react-context/dist/index.js";
import { DismissableLayer as J } from "../../react-dismissable-layer/dist/index.js";
import { useId as Q } from "../../react-id/dist/index.js";
import { createPopperScope as j, Root as W, Anchor as Z, Content as ee } from "../../react-popper/dist/index.js";
import { Portal as te } from "../../react-portal/dist/index.js";
import { Presence as F } from "../../react-presence/dist/index.js";
import { Primitive as oe } from "../../react-primitive/dist/index.js";
import { createSlottable as re } from "../../react-slot/dist/index.js";
import { useControllableState as ne } from "../../react-use-controllable-state/dist/index.js";
import { useLayoutEffect as ie } from "../../react-use-layout-effect/dist/index.js";
import { Root as se } from "../../react-visually-hidden/dist/index.js";
import { jsx as m, jsxs as ae } from "react/jsx-runtime";
var ce = Object.defineProperty, h = (r, e) => ce(r, "name", { value: e, configurable: !0 }), [I, Ne] = z("Tooltip", [
  j
]), A = j(), le = "TooltipProvider", ue = 700, O = "tooltip.open", [pe, S] = I(le), de = /* @__PURE__ */ h((r) => {
  const {
    __scopeTooltip: e,
    delayDuration: t = ue,
    skipDelayDuration: o = 300,
    disableHoverableContent: s = !1,
    children: n
  } = r, a = i.useRef(!0), v = i.useRef(!1), u = i.useRef(0);
  return i.useEffect(() => {
    const l = u.current;
    return () => window.clearTimeout(l);
  }, []), /* @__PURE__ */ m(
    pe,
    {
      scope: e,
      isOpenDelayedRef: a,
      delayDuration: t,
      onOpen: i.useCallback(() => {
        o <= 0 || (window.clearTimeout(u.current), a.current = !1);
      }, [o]),
      onClose: i.useCallback(() => {
        o <= 0 || (window.clearTimeout(u.current), u.current = window.setTimeout(
          () => a.current = !0,
          o
        ));
      }, [o]),
      isPointerInTransitRef: v,
      onPointerInTransitChange: i.useCallback((l) => {
        v.current = l;
      }, []),
      disableHoverableContent: s,
      children: n
    }
  );
}, "TooltipProvider"), k = "Tooltip", [fe, _] = I(k), ve = /* @__PURE__ */ h((r) => {
  const {
    __scopeTooltip: e,
    children: t,
    open: o,
    defaultOpen: s,
    onOpenChange: n,
    disableHoverableContent: a,
    delayDuration: v
  } = r, u = S(k, r.__scopeTooltip), l = A(e), [p, f] = i.useState(null), [d, T] = i.useState(void 0), x = Q(), c = i.useRef(0), g = a ?? u.disableHoverableContent, C = v ?? u.delayDuration, b = i.useRef(!1), [P, y] = ne({
    prop: o,
    defaultProp: s ?? !1,
    onChange: /* @__PURE__ */ h((H) => {
      H ? (u.onOpen(), document.dispatchEvent(new CustomEvent(O))) : u.onClose(), n == null || n(H);
    }, "onChange"),
    caller: k
  }), L = i.useMemo(() => P ? b.current ? "delayed-open" : "instant-open" : "closed", [P]), w = i.useCallback(() => {
    window.clearTimeout(c.current), c.current = 0, b.current = !1, y(!0);
  }, [y]), D = i.useCallback(() => {
    window.clearTimeout(c.current), c.current = 0, y(!1);
  }, [y]), M = i.useCallback(() => {
    window.clearTimeout(c.current), c.current = window.setTimeout(() => {
      b.current = !0, y(!0), c.current = 0;
    }, C);
  }, [C, y]);
  return i.useEffect(() => () => {
    c.current && (window.clearTimeout(c.current), c.current = 0);
  }, []), /* @__PURE__ */ m(W, { ...l, children: /* @__PURE__ */ m(
    fe,
    {
      scope: e,
      contentId: d ?? x,
      setContentId: T,
      open: P,
      stateAttribute: L,
      trigger: p,
      onTriggerChange: f,
      onTriggerEnter: i.useCallback(() => {
        u.isOpenDelayedRef.current ? M() : w();
      }, [u.isOpenDelayedRef, M, w]),
      onTriggerLeave: i.useCallback(() => {
        g ? D() : (window.clearTimeout(c.current), c.current = 0);
      }, [D, g]),
      onOpen: w,
      onClose: D,
      disableHoverableContent: g,
      children: t
    }
  ) });
}, "Tooltip"), N = "TooltipTrigger", he = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ h(function(e, t) {
    const { __scopeTooltip: o, ...s } = e, n = _(N, o), a = S(N, o), v = A(o), u = i.useRef(null), l = G(t, u, n.onTriggerChange), p = i.useRef(!1), f = i.useRef(!1), d = i.useCallback(() => p.current = !1, []);
    return i.useEffect(() => () => document.removeEventListener("pointerup", d), [d]), /* @__PURE__ */ m(Z, { asChild: !0, ...v, children: /* @__PURE__ */ m(
      oe.button,
      {
        "aria-describedby": n.open ? n.contentId : void 0,
        "data-state": n.stateAttribute,
        ...s,
        ref: l,
        onPointerMove: E(e.onPointerMove, (T) => {
          T.pointerType !== "touch" && !f.current && !a.isPointerInTransitRef.current && (n.onTriggerEnter(), f.current = !0);
        }),
        onPointerLeave: E(e.onPointerLeave, () => {
          n.onTriggerLeave(), f.current = !1;
        }),
        onPointerDown: E(e.onPointerDown, () => {
          n.open && n.onClose(), p.current = !0, document.addEventListener("pointerup", d, { once: !0 });
        }),
        onFocus: E(e.onFocus, () => {
          p.current || n.onOpen();
        }),
        onBlur: E(e.onBlur, n.onClose),
        onClick: E(e.onClick, n.onClose)
      }
    ) });
  }, "TooltipTrigger")
), B = "TooltipPortal", [Te, me] = I(B, {
  forceMount: void 0
}), ge = /* @__PURE__ */ h((r) => {
  const { __scopeTooltip: e, forceMount: t, children: o, container: s } = r, n = _(B, e);
  return /* @__PURE__ */ m(Te, { scope: e, forceMount: t, children: /* @__PURE__ */ m(F, { present: t || n.open, children: /* @__PURE__ */ m(te, { asChild: !0, container: s, children: o }) }) });
}, "TooltipPortal"), R = "TooltipContent", Ce = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ h(function(e, t) {
    const o = me(R, e.__scopeTooltip), { forceMount: s = o.forceMount, side: n = "top", ...a } = e, v = _(R, e.__scopeTooltip);
    return /* @__PURE__ */ m(F, { present: s || v.open, children: v.disableHoverableContent ? /* @__PURE__ */ m(U, { side: n, ...a, ref: t }) : /* @__PURE__ */ m(xe, { side: n, ...a, ref: t }) });
  }, "TooltipContent")
), xe = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ h(function(e, t) {
  const o = _(R, e.__scopeTooltip), s = S(R, e.__scopeTooltip), n = i.useRef(null), a = G(t, n), [v, u] = i.useState(null), { trigger: l, onClose: p } = o, f = n.current, { onPointerInTransitChange: d } = s, T = i.useCallback(() => {
    u(null), d(!1);
  }, [d]), x = i.useCallback(
    (c, g) => {
      const C = c.currentTarget, b = { x: c.clientX, y: c.clientY }, P = Y(b, C.getBoundingClientRect()), y = q(b, P), L = X(g.getBoundingClientRect()), w = V([...y, ...L]);
      u(w), d(!0);
    },
    [d]
  );
  return i.useEffect(() => () => T(), [T]), i.useEffect(() => {
    if (l && f) {
      const c = /* @__PURE__ */ h((C) => x(C, f), "handleTriggerLeave"), g = /* @__PURE__ */ h((C) => x(C, l), "handleContentLeave");
      return l.addEventListener("pointerleave", c), f.addEventListener("pointerleave", g), () => {
        l.removeEventListener("pointerleave", c), f.removeEventListener("pointerleave", g);
      };
    }
  }, [l, f, x, T]), i.useEffect(() => {
    if (v) {
      const c = /* @__PURE__ */ h((g) => {
        const C = g.target, b = { x: g.clientX, y: g.clientY }, P = (l == null ? void 0 : l.contains(C)) || (f == null ? void 0 : f.contains(C)), y = !K(b, v);
        P ? T() : y && (T(), p());
      }, "handleTrackPointerGrace");
      return document.addEventListener("pointermove", c), () => document.removeEventListener("pointermove", c);
    }
  }, [l, f, v, p, T]), /* @__PURE__ */ m(U, { ...e, ref: a });
}, "TooltipContentHoverable")), ye = re("TooltipContent"), U = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ h(function(e, t) {
    const {
      __scopeTooltip: o,
      children: s,
      "aria-label": n,
      id: a,
      onEscapeKeyDown: v,
      onPointerDownOutside: u,
      ...l
    } = e, p = _(R, o), f = A(o), { onClose: d } = p;
    i.useEffect(() => (document.addEventListener(O, d), () => document.removeEventListener(O, d)), [d]), i.useEffect(() => {
      if (p.trigger) {
        const x = /* @__PURE__ */ h((c) => {
          c.target instanceof Node && c.target.contains(p.trigger) && d();
        }, "handleScroll");
        return window.addEventListener("scroll", x, { capture: !0 }), () => window.removeEventListener("scroll", x, { capture: !0 });
      }
    }, [p.trigger, d]);
    const { setContentId: T } = p;
    return ie(() => (T(a), () => {
      T(void 0);
    }), [a, T]), /* @__PURE__ */ m(
      J,
      {
        asChild: !0,
        disableOutsidePointerEvents: !1,
        onEscapeKeyDown: v,
        onPointerDownOutside: u,
        onFocusOutside: (x) => x.preventDefault(),
        onDismiss: d,
        children: /* @__PURE__ */ ae(
          ee,
          {
            "data-state": p.stateAttribute,
            role: n ? void 0 : "tooltip",
            id: n ? void 0 : p.contentId,
            ...f,
            ...l,
            ref: t,
            style: {
              ...l.style,
              "--radix-tooltip-content-transform-origin": "var(--radix-popper-transform-origin)",
              "--radix-tooltip-content-available-width": "var(--radix-popper-available-width)",
              "--radix-tooltip-content-available-height": "var(--radix-popper-available-height)",
              "--radix-tooltip-trigger-width": "var(--radix-popper-anchor-width)",
              "--radix-tooltip-trigger-height": "var(--radix-popper-anchor-height)"
            },
            children: [
              /* @__PURE__ */ m(ye, { children: s }),
              n ? /* @__PURE__ */ m(se, { id: p.contentId, role: "tooltip", children: n }) : null
            ]
          }
        )
      }
    );
  }, "TooltipContentImpl")
);
function Y(r, e) {
  const t = Math.abs(e.top - r.y), o = Math.abs(e.bottom - r.y), s = Math.abs(e.right - r.x), n = Math.abs(e.left - r.x);
  switch (Math.min(t, o, s, n)) {
    case n:
      return "left";
    case s:
      return "right";
    case t:
      return "top";
    case o:
      return "bottom";
    default:
      throw new Error("unreachable");
  }
}
h(Y, "getExitSideFromRect");
function q(r, e, t = 5) {
  const o = [];
  switch (e) {
    case "top":
      o.push(
        { x: r.x - t, y: r.y + t },
        { x: r.x + t, y: r.y + t }
      );
      break;
    case "bottom":
      o.push(
        { x: r.x - t, y: r.y - t },
        { x: r.x + t, y: r.y - t }
      );
      break;
    case "left":
      o.push(
        { x: r.x + t, y: r.y - t },
        { x: r.x + t, y: r.y + t }
      );
      break;
    case "right":
      o.push(
        { x: r.x - t, y: r.y - t },
        { x: r.x - t, y: r.y + t }
      );
      break;
  }
  return o;
}
h(q, "getPaddedExitPoints");
function X(r) {
  const { top: e, right: t, bottom: o, left: s } = r;
  return [
    { x: s, y: e },
    { x: t, y: e },
    { x: t, y: o },
    { x: s, y: o }
  ];
}
h(X, "getPointsFromRect");
function K(r, e) {
  const { x: t, y: o } = r;
  let s = !1;
  for (let n = 0, a = e.length - 1; n < e.length; a = n++) {
    const v = e[n], u = e[a], l = v.x, p = v.y, f = u.x, d = u.y;
    p > o != d > o && t < (f - l) * (o - p) / (d - p) + l && (s = !s);
  }
  return s;
}
h(K, "isPointInPolygon");
function V(r) {
  const e = r.slice();
  return e.sort((t, o) => t.x < o.x ? -1 : t.x > o.x ? 1 : t.y < o.y ? -1 : t.y > o.y ? 1 : 0), $(e);
}
h(V, "getHull");
function $(r) {
  if (r.length <= 1) return r.slice();
  const e = [];
  for (let o = 0; o < r.length; o++) {
    const s = r[o];
    for (; e.length >= 2; ) {
      const n = e[e.length - 1], a = e[e.length - 2];
      if ((n.x - a.x) * (s.y - a.y) >= (n.y - a.y) * (s.x - a.x)) e.pop();
      else break;
    }
    e.push(s);
  }
  e.pop();
  const t = [];
  for (let o = r.length - 1; o >= 0; o--) {
    const s = r[o];
    for (; t.length >= 2; ) {
      const n = t[t.length - 1], a = t[t.length - 2];
      if ((n.x - a.x) * (s.y - a.y) >= (n.y - a.y) * (s.x - a.x)) t.pop();
      else break;
    }
    t.push(s);
  }
  return t.pop(), e.length === 1 && t.length === 1 && e[0].x === t[0].x && e[0].y === t[0].y ? e : e.concat(t);
}
h($, "getHullPresorted");
var Ge = de, je = ve, Fe = he, Be = ge, Ue = Ce;
export {
  Ue as Content,
  Be as Portal,
  Ge as Provider,
  je as Root,
  ve as Tooltip,
  Ce as TooltipContent,
  ge as TooltipPortal,
  de as TooltipProvider,
  he as TooltipTrigger,
  Fe as Trigger,
  Ne as createTooltipScope
};
