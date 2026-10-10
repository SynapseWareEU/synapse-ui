import * as c from "react";
import { Primitive as U } from "../../react-primitive/dist/index.js";
import { Presence as X } from "../../react-presence/dist/index.js";
import { createContextScope as oe } from "../../react-context/dist/index.js";
import { useComposedRefs as R } from "../../react-compose-refs/dist/index.js";
import { useCallbackRef as C } from "../../react-use-callback-ref/dist/index.js";
import { useDirection as te } from "../../react-direction/dist/index.js";
import { useLayoutEffect as ne } from "../../react-use-layout-effect/dist/index.js";
import { clamp as le } from "../../number/dist/index.js";
import { composeEventHandlers as E } from "../../primitive/dist/index.js";
import { jsx as b, jsxs as ce, Fragment as ie } from "react/jsx-runtime";
var ae = Object.defineProperty, f = (t, e) => ae(t, "name", { value: e, configurable: !0 });
function G(t, e) {
  return c.useReducer((o, r) => e[o][r] ?? o, t);
}
f(G, "useStateMachine");
var J = "ScrollArea", [K, Oe] = oe(J), [se, P] = K(J), ue = /* @__PURE__ */ c.forwardRef(
  /* @__PURE__ */ f(function(e, o) {
    const {
      __scopeScrollArea: r,
      type: u = "hover",
      dir: n,
      scrollHideDelay: l = 600,
      ...i
    } = e, [a, s] = c.useState(null), [S, h] = c.useState(null), [m, d] = c.useState(null), [p, w] = c.useState(null), [y, Y] = c.useState(null), [T, O] = c.useState(0), [N, z] = c.useState(0), [I, x] = c.useState(!1), [V, L] = c.useState(!1), v = R(o, s), g = te(n);
    return /* @__PURE__ */ b(
      se,
      {
        scope: r,
        type: u,
        dir: g,
        scrollHideDelay: l,
        scrollArea: a,
        viewport: S,
        onViewportChange: h,
        content: m,
        onContentChange: d,
        scrollbarX: p,
        onScrollbarXChange: w,
        scrollbarXEnabled: I,
        onScrollbarXEnabledChange: x,
        scrollbarY: y,
        onScrollbarYChange: Y,
        scrollbarYEnabled: V,
        onScrollbarYEnabledChange: L,
        onCornerWidthChange: O,
        onCornerHeightChange: z,
        children: /* @__PURE__ */ b(
          U.div,
          {
            dir: g,
            ...i,
            ref: v,
            style: {
              position: "relative",
              // Pass corner sizes as CSS vars to reduce re-renders of context consumers
              "--radix-scroll-area-corner-width": T + "px",
              "--radix-scroll-area-corner-height": N + "px",
              ...e.style
            }
          }
        )
      }
    );
  }, "ScrollArea")
), de = "ScrollAreaViewport", fe = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { __scopeScrollArea: r, children: u, nonce: n, ...l } = e, i = P(de, r), a = c.useRef(null), s = R(o, a, i.onViewportChange);
    return /* @__PURE__ */ ce(ie, { children: [
      /* @__PURE__ */ b(Se, { nonce: n }),
      /* @__PURE__ */ b(
        U.div,
        {
          "data-radix-scroll-area-viewport": "",
          ...l,
          ref: s,
          style: {
            /**
             * We don't support `visible` because the intention is to have at least one scrollbar
             * if this component is used and `visible` will behave like `auto` in that case
             * https://developer.mozilla.org/en-US/docs/Web/CSS/overflow#description
             *
             * We don't handle `auto` because the intention is for the native implementation
             * to be hidden if using this component. We just want to ensure the node is scrollable
             * so could have used either `scroll` or `auto` here. We picked `scroll` to prevent
             * the browser from having to work out whether to render native scrollbars or not,
             * we tell it to with the intention of hiding them in CSS.
             */
            overflowX: i.scrollbarXEnabled ? "scroll" : "hidden",
            overflowY: i.scrollbarYEnabled ? "scroll" : "hidden",
            ...e.style
          },
          children: /* @__PURE__ */ b("div", { ref: i.onContentChange, style: { minWidth: "100%", display: "table" }, children: u })
        }
      )
    ] });
  }, "ScrollAreaViewport")
), Se = /* @__PURE__ */ c.memo(
  /* @__PURE__ */ f(function({ nonce: e }) {
    return /* @__PURE__ */ b(
      "style",
      {
        dangerouslySetInnerHTML: {
          __html: "[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}"
        },
        nonce: e
      }
    );
  }, "ScrollAreaViewportStyle"),
  (t, e) => t.nonce === e.nonce
), A = "ScrollAreaScrollbar", he = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { forceMount: r, ...u } = e, n = P(A, e.__scopeScrollArea), { onScrollbarXEnabledChange: l, onScrollbarYEnabledChange: i } = n, a = e.orientation === "horizontal";
    return c.useEffect(() => (a ? l(!0) : i(!0), () => {
      a ? l(!1) : i(!1);
    }), [a, l, i]), n.type === "hover" ? /* @__PURE__ */ b(be, { ...u, ref: o, forceMount: r }) : n.type === "scroll" ? /* @__PURE__ */ b(me, { ...u, ref: o, forceMount: r }) : n.type === "auto" ? /* @__PURE__ */ b(Q, { ...u, ref: o, forceMount: r }) : n.type === "always" ? /* @__PURE__ */ b(B, { ...u, ref: o, "data-state": "visible" }) : null;
  }, "ScrollAreaScrollbar")
), be = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { forceMount: r, ...u } = e, n = P(A, e.__scopeScrollArea), [l, i] = c.useState(!1);
  return c.useEffect(() => {
    const a = n.scrollArea;
    let s = 0;
    if (a) {
      const S = /* @__PURE__ */ f(() => {
        window.clearTimeout(s), i(!0);
      }, "handlePointerEnter"), h = /* @__PURE__ */ f(() => {
        s = window.setTimeout(() => i(!1), n.scrollHideDelay);
      }, "handlePointerLeave");
      return a.addEventListener("pointerenter", S), a.addEventListener("pointerleave", h), () => {
        window.clearTimeout(s), a.removeEventListener("pointerenter", S), a.removeEventListener("pointerleave", h);
      };
    }
  }, [n.scrollArea, n.scrollHideDelay]), /* @__PURE__ */ b(X, { present: r || l, children: /* @__PURE__ */ b(
    Q,
    {
      "data-state": l ? "visible" : "hidden",
      ...u,
      ref: o
    }
  ) });
}, "ScrollAreaScrollbarHover")), me = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { forceMount: r, ...u } = e, n = P(A, e.__scopeScrollArea), l = e.orientation === "horizontal", i = H(() => s("SCROLL_END"), 100), [a, s] = G("hidden", {
    hidden: {
      SCROLL: "scrolling"
    },
    scrolling: {
      SCROLL_END: "idle",
      POINTER_ENTER: "interacting"
    },
    interacting: {
      SCROLL: "interacting",
      POINTER_LEAVE: "idle"
    },
    idle: {
      HIDE: "hidden",
      SCROLL: "scrolling",
      POINTER_ENTER: "interacting"
    }
  });
  return c.useEffect(() => {
    if (a === "idle") {
      const S = window.setTimeout(() => s("HIDE"), n.scrollHideDelay);
      return () => window.clearTimeout(S);
    }
  }, [a, n.scrollHideDelay, s]), c.useEffect(() => {
    const S = n.viewport, h = l ? "scrollLeft" : "scrollTop";
    if (S) {
      let m = S[h];
      const d = /* @__PURE__ */ f(() => {
        const p = S[h];
        m !== p && (s("SCROLL"), i()), m = p;
      }, "handleScroll");
      return S.addEventListener("scroll", d), () => S.removeEventListener("scroll", d);
    }
  }, [n.viewport, l, s, i]), /* @__PURE__ */ b(X, { present: r || a !== "hidden", children: /* @__PURE__ */ b(
    B,
    {
      "data-state": a === "hidden" ? "hidden" : "visible",
      ...u,
      ref: o,
      onPointerEnter: E(e.onPointerEnter, () => s("POINTER_ENTER")),
      onPointerLeave: E(e.onPointerLeave, () => s("POINTER_LEAVE"))
    }
  ) });
}, "ScrollAreaScrollbarScroll")), Q = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const r = P(A, e.__scopeScrollArea), { forceMount: u, ...n } = e, [l, i] = c.useState(!1), a = e.orientation === "horizontal", s = H(() => {
    if (r.viewport) {
      const S = r.viewport.offsetWidth < r.viewport.scrollWidth, h = r.viewport.offsetHeight < r.viewport.scrollHeight;
      i(a ? S : h);
    }
  }, 10);
  return D(r.viewport, s), D(r.content, s), /* @__PURE__ */ b(X, { present: u || l, children: /* @__PURE__ */ b(
    B,
    {
      "data-state": l ? "visible" : "hidden",
      ...n,
      ref: o
    }
  ) });
}, "ScrollAreaScrollbarAuto")), B = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { orientation: r = "vertical", ...u } = e, n = P(A, e.__scopeScrollArea), l = c.useRef(null), i = c.useRef(0), [a, s] = c.useState({
    content: 0,
    viewport: 0,
    scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 }
  }), S = j(a.viewport, a.content), h = {
    ...u,
    sizes: a,
    onSizesChange: s,
    hasThumb: S > 0 && S < 1,
    onThumbChange: /* @__PURE__ */ f((d) => l.current = d, "onThumbChange"),
    onThumbPointerUp: /* @__PURE__ */ f(() => i.current = 0, "onThumbPointerUp"),
    onThumbPointerDown: /* @__PURE__ */ f((d) => i.current = d, "onThumbPointerDown")
  };
  function m(d, p) {
    return re(d, i.current, a, p);
  }
  return f(m, "getScrollPosition"), r === "horizontal" ? /* @__PURE__ */ b(
    pe,
    {
      ...h,
      ref: o,
      onThumbPositionChange: () => {
        if (n.viewport && l.current) {
          const d = n.viewport.scrollLeft, p = F(d, a, n.dir);
          l.current.style.transform = `translate3d(${p}px, 0, 0)`;
        }
      },
      onWheelScroll: (d) => {
        n.viewport && (n.viewport.scrollLeft = d);
      },
      onDragScroll: (d) => {
        n.viewport && (n.viewport.scrollLeft = m(d, n.dir));
      }
    }
  ) : r === "vertical" ? /* @__PURE__ */ b(
    ve,
    {
      ...h,
      ref: o,
      onThumbPositionChange: () => {
        if (n.viewport && l.current) {
          const d = n.viewport.scrollTop, p = F(d, a);
          l.current.style.transform = `translate3d(0, ${p}px, 0)`;
        }
      },
      onWheelScroll: (d) => {
        n.viewport && (n.viewport.scrollTop = d);
      },
      onDragScroll: (d) => {
        n.viewport && (n.viewport.scrollTop = m(d));
      }
    }
  ) : null;
}, "ScrollAreaScrollbarVisible")), pe = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { sizes: r, onSizesChange: u, ...n } = e, l = P(A, e.__scopeScrollArea), [i, a] = c.useState(), s = c.useRef(null), S = R(o, s, l.onScrollbarXChange);
  return c.useEffect(() => {
    s.current && a(getComputedStyle(s.current));
  }, [s]), /* @__PURE__ */ b(
    ee,
    {
      "data-orientation": "horizontal",
      ...n,
      ref: S,
      sizes: r,
      style: {
        bottom: 0,
        left: l.dir === "rtl" ? "var(--radix-scroll-area-corner-width)" : 0,
        right: l.dir === "ltr" ? "var(--radix-scroll-area-corner-width)" : 0,
        "--radix-scroll-area-thumb-width": W(r) + "px",
        ...e.style
      },
      onThumbPointerDown: (h) => e.onThumbPointerDown(h.x),
      onDragScroll: (h) => e.onDragScroll(h.x),
      onWheelScroll: (h, m) => {
        if (l.viewport) {
          const d = l.viewport.scrollLeft + h.deltaX;
          e.onWheelScroll(d), $(d, m) && h.preventDefault();
        }
      },
      onResize: () => {
        s.current && l.viewport && i && u({
          content: l.viewport.scrollWidth,
          viewport: l.viewport.offsetWidth,
          scrollbar: {
            size: s.current.clientWidth,
            paddingStart: _(i.paddingLeft),
            paddingEnd: _(i.paddingRight)
          }
        });
      }
    }
  );
}, "ScrollAreaScrollbarX")), ve = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const { sizes: r, onSizesChange: u, ...n } = e, l = P(A, e.__scopeScrollArea), [i, a] = c.useState(), s = c.useRef(null), S = R(o, s, l.onScrollbarYChange);
  return c.useEffect(() => {
    s.current && a(getComputedStyle(s.current));
  }, [s]), /* @__PURE__ */ b(
    ee,
    {
      "data-orientation": "vertical",
      ...n,
      ref: S,
      sizes: r,
      style: {
        top: 0,
        right: l.dir === "ltr" ? 0 : void 0,
        left: l.dir === "rtl" ? 0 : void 0,
        bottom: "var(--radix-scroll-area-corner-height)",
        "--radix-scroll-area-thumb-height": W(r) + "px",
        ...e.style
      },
      onThumbPointerDown: (h) => e.onThumbPointerDown(h.y),
      onDragScroll: (h) => e.onDragScroll(h.y),
      onWheelScroll: (h, m) => {
        if (l.viewport) {
          const d = l.viewport.scrollTop + h.deltaY;
          e.onWheelScroll(d), $(d, m) && h.preventDefault();
        }
      },
      onResize: () => {
        s.current && l.viewport && i && u({
          content: l.viewport.scrollHeight,
          viewport: l.viewport.offsetHeight,
          scrollbar: {
            size: s.current.clientHeight,
            paddingStart: _(i.paddingTop),
            paddingEnd: _(i.paddingBottom)
          }
        });
      }
    }
  );
}, "ScrollAreaScrollbarY")), [we, Z] = K(A), ee = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ f(function(e, o) {
  const {
    __scopeScrollArea: r,
    sizes: u,
    hasThumb: n,
    onThumbChange: l,
    onThumbPointerUp: i,
    onThumbPointerDown: a,
    onThumbPositionChange: s,
    onDragScroll: S,
    onWheelScroll: h,
    onResize: m,
    ...d
  } = e, p = P(A, r), [w, y] = c.useState(null), Y = R(o, y), T = c.useRef(null), O = c.useRef(""), N = p.viewport, z = u.content - u.viewport, I = C(h), x = C(s), V = H(m, 10);
  function L(v) {
    if (T.current) {
      const g = v.clientX - T.current.left, M = v.clientY - T.current.top;
      S({ x: g, y: M });
    }
  }
  return f(L, "handleDragScroll"), c.useEffect(() => {
    const v = /* @__PURE__ */ f((g) => {
      const M = g.target;
      (w == null ? void 0 : w.contains(M)) && I(g, z);
    }, "handleWheel");
    return document.addEventListener("wheel", v, { passive: !1 }), () => document.removeEventListener("wheel", v, { passive: !1 });
  }, [N, w, z, I]), c.useEffect(x, [u, x]), D(w, V), D(p.content, V), /* @__PURE__ */ b(
    we,
    {
      scope: r,
      scrollbar: w,
      hasThumb: n,
      onThumbChange: C(l),
      onThumbPointerUp: C(i),
      onThumbPositionChange: x,
      onThumbPointerDown: C(a),
      children: /* @__PURE__ */ b(
        U.div,
        {
          ...d,
          ref: Y,
          style: { position: "absolute", ...d.style },
          onPointerDown: E(e.onPointerDown, (v) => {
            v.button === 0 && (v.target.setPointerCapture(v.pointerId), T.current = w.getBoundingClientRect(), O.current = document.body.style.webkitUserSelect, document.body.style.webkitUserSelect = "none", p.viewport && (p.viewport.style.scrollBehavior = "auto"), L(v));
          }),
          onPointerMove: E(e.onPointerMove, L),
          onPointerUp: E(e.onPointerUp, (v) => {
            const g = v.target;
            g.hasPointerCapture(v.pointerId) && g.releasePointerCapture(v.pointerId), document.body.style.webkitUserSelect = O.current, p.viewport && (p.viewport.style.scrollBehavior = ""), T.current = null;
          })
        }
      )
    }
  );
}, "ScrollAreaScrollbarImpl")), k = "ScrollAreaThumb", ge = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { forceMount: r, ...u } = e, n = Z(k, e.__scopeScrollArea);
    return /* @__PURE__ */ b(X, { present: r || n.hasThumb, children: /* @__PURE__ */ b(Pe, { ref: o, ...u }) });
  }, "ScrollAreaThumb")
), Pe = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, o) {
    const { __scopeScrollArea: r, style: u, ...n } = e, l = P(k, r), i = Z(k, r), { onThumbPositionChange: a } = i, s = R(o, i.onThumbChange), S = c.useRef(void 0), h = H(() => {
      S.current && (S.current(), S.current = void 0);
    }, 100);
    return c.useEffect(() => {
      const m = l.viewport;
      if (m) {
        const d = /* @__PURE__ */ f(() => {
          if (h(), !S.current) {
            const p = Ae(m, a);
            S.current = p, a();
          }
        }, "handleScroll");
        return a(), m.addEventListener("scroll", d), () => m.removeEventListener("scroll", d);
      }
    }, [l.viewport, h, a]), /* @__PURE__ */ b(
      U.div,
      {
        "data-state": i.hasThumb ? "visible" : "hidden",
        ...n,
        ref: s,
        style: {
          width: "var(--radix-scroll-area-thumb-width)",
          height: "var(--radix-scroll-area-thumb-height)",
          ...u
        },
        onPointerDownCapture: E(e.onPointerDownCapture, (m) => {
          const p = m.target.getBoundingClientRect(), w = m.clientX - p.left, y = m.clientY - p.top;
          i.onThumbPointerDown({ x: w, y });
        }),
        onPointerUp: E(e.onPointerUp, i.onThumbPointerUp)
      }
    );
  }, "ScrollAreaThumbImpl")
);
function _(t) {
  return t ? parseInt(t, 10) : 0;
}
f(_, "toInt");
function j(t, e) {
  const o = t / e;
  return isNaN(o) ? 0 : o;
}
f(j, "getThumbRatio");
function W(t) {
  const e = j(t.viewport, t.content), o = t.scrollbar.paddingStart + t.scrollbar.paddingEnd, r = (t.scrollbar.size - o) * e;
  return Math.max(r, 18);
}
f(W, "getThumbSize");
function re(t, e, o, r = "ltr") {
  const u = W(o), n = u / 2, l = e || n, i = u - l, a = o.scrollbar.paddingStart + l, s = o.scrollbar.size - o.scrollbar.paddingEnd - i, S = o.content - o.viewport, h = r === "ltr" ? [0, S] : [S * -1, 0];
  return q([a, s], h)(t);
}
f(re, "getScrollPositionFromPointer");
function F(t, e, o = "ltr") {
  const r = W(e), u = e.scrollbar.paddingStart + e.scrollbar.paddingEnd, n = e.scrollbar.size - u, l = e.content - e.viewport, i = n - r, a = o === "ltr" ? [0, l] : [l * -1, 0], s = le(t, a);
  return q([0, l], [0, i])(s);
}
f(F, "getThumbOffsetFromScroll");
function q(t, e) {
  return (o) => {
    if (t[0] === t[1] || e[0] === e[1]) return e[0];
    const r = (e[1] - e[0]) / (t[1] - t[0]);
    return e[0] + r * (o - t[0]);
  };
}
f(q, "linearScale");
function $(t, e) {
  return t > 0 && t < e;
}
f($, "isScrollingWithinScrollbarBounds");
var Ae = /* @__PURE__ */ f((t, e = () => {
}) => {
  let o = { left: t.scrollLeft, top: t.scrollTop }, r = 0;
  return (/* @__PURE__ */ f((function u() {
    const n = { left: t.scrollLeft, top: t.scrollTop }, l = o.left !== n.left, i = o.top !== n.top;
    (l || i) && e(), o = n, r = window.requestAnimationFrame(u);
  }), "loop"))(), () => window.cancelAnimationFrame(r);
}, "addUnlinkedScrollListener");
function H(t, e) {
  const o = C(t), r = c.useRef(0);
  return c.useEffect(() => () => window.clearTimeout(r.current), []), c.useCallback(() => {
    window.clearTimeout(r.current), r.current = window.setTimeout(o, e);
  }, [o, e]);
}
f(H, "useDebounceCallback");
function D(t, e) {
  const o = C(e);
  ne(() => {
    let r = 0;
    if (t) {
      const u = new ResizeObserver(() => {
        cancelAnimationFrame(r), r = window.requestAnimationFrame(o);
      });
      return u.observe(t), () => {
        window.cancelAnimationFrame(r), u.unobserve(t);
      };
    }
  }, [t, o]);
}
f(D, "useResizeObserver");
var ze = ue, Ie = fe, Ve = he, Me = ge;
export {
  ze as Root,
  ue as ScrollArea,
  he as ScrollAreaScrollbar,
  ge as ScrollAreaThumb,
  fe as ScrollAreaViewport,
  Ve as Scrollbar,
  Me as Thumb,
  Ie as Viewport,
  Oe as createScrollAreaScope
};
