import * as f from "react";
import { clamp as re } from "../../number/dist/index.js";
import { composeEventHandlers as I } from "../../primitive/dist/index.js";
import { useComposedRefs as B } from "../../react-compose-refs/dist/index.js";
import { createContextScope as Pe } from "../../react-context/dist/index.js";
import { useControllableState as Re } from "../../react-use-controllable-state/dist/index.js";
import { useDirection as xe } from "../../react-direction/dist/index.js";
import { usePrevious as _e } from "../../react-use-previous/dist/index.js";
import { useSize as Te } from "../../react-use-size/dist/index.js";
import { Primitive as k } from "../../react-primitive/dist/index.js";
import { createCollection as Ee } from "../../react-collection/dist/index.js";
import { jsx as h, jsxs as Ce, Fragment as ye } from "react/jsx-runtime";
var De = Object.defineProperty, c = (r, e) => De(r, "name", { value: e, configurable: !0 }), oe = ["PageUp", "PageDown"], ie = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], se = {
  "from-left": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-right": ["Home", "PageDown", "ArrowDown", "ArrowRight"],
  "from-bottom": ["Home", "PageDown", "ArrowDown", "ArrowLeft"],
  "from-top": ["Home", "PageDown", "ArrowUp", "ArrowLeft"]
}, N = "Slider", [j, Me, Ve] = Ee(N), [G, Ze] = Pe(N, [
  Ve
]), [Ie, F] = G(N), et = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, n) {
    const {
      name: o,
      min: i = 0,
      max: t = 100,
      step: l = 1,
      orientation: a = "horizontal",
      disabled: u = !1,
      minStepsBetweenThumbs: d = 0,
      defaultValue: S = [i],
      value: p,
      onValueChange: s = /* @__PURE__ */ c(() => {
      }, "onValueChange"),
      onValueCommit: m = /* @__PURE__ */ c(() => {
      }, "onValueCommit"),
      inverted: v = !1,
      form: g,
      ...w
    } = e, R = f.useRef(/* @__PURE__ */ new Set()), P = f.useRef(0), x = f.useRef(!1), E = a === "horizontal" ? Be : Ae, [T, W] = f.useState(null), L = B(n, W), [C = [], O] = Re({
      prop: p,
      defaultProp: S,
      onChange: /* @__PURE__ */ c((b) => {
        var A;
        (A = [...R.current][P.current]) == null || A.focus({
          preventScroll: !0,
          focusVisible: x.current
        }), x.current = !1, s(b);
      }, "onChange")
    }), q = f.useRef(C), we = f.useRef(C);
    f.useEffect(() => {
      const b = g ? T == null ? void 0 : T.ownerDocument.getElementById(g) : T == null ? void 0 : T.closest("form");
      if (b instanceof HTMLFormElement) {
        const y = /* @__PURE__ */ c(() => O(we.current), "reset");
        return b.addEventListener("reset", y), () => b.removeEventListener("reset", y);
      }
    }, [T, g, O]);
    function J(b) {
      const y = Se(C, b);
      M(b, y);
    }
    c(J, "handleSlideStart");
    function Q(b) {
      M(b, P.current);
    }
    c(Q, "handleSlideMove");
    function Z() {
      String(C) !== String(q.current) && m(C);
    }
    c(Z, "handleSlideEnd");
    function M(b, y, { commit: A } = { commit: !1 }) {
      const ee = X(l), U = H(Math.round((b - i) / l) * l + i, ee), K = re(U, [i, t]);
      O((V = []) => {
        const D = fe(V, K, y);
        if (ge(D, d * l)) {
          P.current = D.indexOf(K);
          const te = String(D) !== String(V);
          return te && A && m(D), te ? D : V;
        } else
          return V;
      });
    }
    return c(M, "updateValues"), /* @__PURE__ */ h(
      Ie,
      {
        scope: e.__scopeSlider,
        name: o,
        disabled: u,
        min: i,
        max: t,
        valueIndexToChangeRef: P,
        thumbs: R.current,
        values: C,
        orientation: a,
        form: g,
        children: /* @__PURE__ */ h(j.Provider, { scope: e.__scopeSlider, children: /* @__PURE__ */ h(j.Slot, { scope: e.__scopeSlider, children: /* @__PURE__ */ h(
          E,
          {
            "aria-disabled": u,
            "data-disabled": u ? "" : void 0,
            ...w,
            ref: L,
            onPointerDown: I(w.onPointerDown, () => {
              u || (q.current = C, x.current = !1);
            }),
            min: i,
            max: t,
            inverted: v,
            onSlideStart: u ? void 0 : J,
            onSlideMove: u ? void 0 : Q,
            onSlideEnd: u ? void 0 : Z,
            onHomeKeyDown: () => {
              u || (x.current = !0, M(i, 0, { commit: !0 }));
            },
            onEndKeyDown: () => {
              u || (x.current = !0, M(t, C.length - 1, { commit: !0 }));
            },
            onStepKeyDown: ({ event: b, direction: y }) => {
              if (!u) {
                x.current = !0;
                const U = oe.includes(b.key) || b.shiftKey && ie.includes(b.key) ? 10 : 1, K = P.current, V = C[K], D = be(V, {
                  min: i,
                  step: l,
                  direction: y,
                  multiplier: U
                });
                M(D, K, { commit: !0 });
              }
            }
          }
        ) }) })
      }
    );
  }, "Slider")
), [ae, le] = G(N, {
  startEdge: "left",
  endEdge: "right",
  size: "width",
  direction: 1
}), Be = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, n) {
    const {
      min: o,
      max: i,
      dir: t,
      inverted: l,
      onSlideStart: a,
      onSlideMove: u,
      onSlideEnd: d,
      onStepKeyDown: S,
      ...p
    } = e, [s, m] = f.useState(null), v = B(n, m), g = f.useRef(void 0), w = xe(t), R = w === "ltr", P = R && !l || !R && l;
    function x(_) {
      const E = g.current || s.getBoundingClientRect(), T = [0, E.width], L = z(T, P ? [o, i] : [i, o]);
      return g.current = E, L(_ - E.left);
    }
    return c(x, "getValueFromPointer"), /* @__PURE__ */ h(
      ae,
      {
        scope: e.__scopeSlider,
        startEdge: P ? "left" : "right",
        endEdge: P ? "right" : "left",
        direction: P ? 1 : -1,
        size: "width",
        children: /* @__PURE__ */ h(
          ce,
          {
            dir: w,
            "data-orientation": "horizontal",
            ...p,
            ref: v,
            style: {
              ...p.style,
              "--radix-slider-thumb-transform": "translateX(-50%)"
            },
            onSlideStart: (_) => {
              const E = x(_.clientX);
              a == null || a(E);
            },
            onSlideMove: (_) => {
              const E = x(_.clientX);
              u == null || u(E);
            },
            onSlideEnd: () => {
              g.current = void 0, d == null || d();
            },
            onStepKeyDown: (_) => {
              const T = se[P ? "from-left" : "from-right"].includes(_.key);
              S == null || S({ event: _, direction: T ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderHorizontal")
), Ae = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const {
      min: o,
      max: i,
      inverted: t,
      onSlideStart: l,
      onSlideMove: a,
      onSlideEnd: u,
      onStepKeyDown: d,
      ...S
    } = e, p = f.useRef(null), s = B(n, p), m = f.useRef(void 0), v = !t;
    function g(w) {
      const R = m.current || p.current.getBoundingClientRect(), P = [0, R.height], _ = z(P, v ? [i, o] : [o, i]);
      return m.current = R, _(w - R.top);
    }
    return c(g, "getValueFromPointer"), /* @__PURE__ */ h(
      ae,
      {
        scope: e.__scopeSlider,
        startEdge: v ? "bottom" : "top",
        endEdge: v ? "top" : "bottom",
        size: "height",
        direction: v ? 1 : -1,
        children: /* @__PURE__ */ h(
          ce,
          {
            "data-orientation": "vertical",
            ...S,
            ref: s,
            style: {
              ...S.style,
              "--radix-slider-thumb-transform": "translateY(50%)"
            },
            onSlideStart: (w) => {
              const R = g(w.clientY);
              l == null || l(R);
            },
            onSlideMove: (w) => {
              const R = g(w.clientY);
              a == null || a(R);
            },
            onSlideEnd: () => {
              m.current = void 0, u == null || u();
            },
            onStepKeyDown: (w) => {
              const P = se[v ? "from-bottom" : "from-top"].includes(w.key);
              d == null || d({ event: w, direction: P ? -1 : 1 });
            }
          }
        )
      }
    );
  }, "SliderVertical")
), ce = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const {
      __scopeSlider: o,
      onSlideStart: i,
      onSlideMove: t,
      onSlideEnd: l,
      onHomeKeyDown: a,
      onEndKeyDown: u,
      onStepKeyDown: d,
      ...S
    } = e, p = F(N, o);
    return /* @__PURE__ */ h(
      k.span,
      {
        ...S,
        ref: n,
        onKeyDown: I(e.onKeyDown, (s) => {
          s.key === "Home" ? (a(s), s.preventDefault()) : s.key === "End" ? (u(s), s.preventDefault()) : oe.concat(ie).includes(s.key) && (d(s), s.preventDefault());
        }),
        onPointerDown: I(e.onPointerDown, (s) => {
          const m = s.target;
          m.setPointerCapture(s.pointerId), s.preventDefault(), p.thumbs.has(m) ? m.focus({ preventScroll: !0, focusVisible: !1 }) : i(s);
        }),
        onPointerMove: I(e.onPointerMove, (s) => {
          s.target.hasPointerCapture(s.pointerId) && t(s);
        }),
        onPointerUp: I(e.onPointerUp, (s) => {
          const m = s.target;
          m.hasPointerCapture(s.pointerId) && (m.releasePointerCapture(s.pointerId), l(s));
        })
      }
    );
  }, "SliderImpl")
), Ke = "SliderTrack", tt = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, ...i } = e, t = F(Ke, o);
    return /* @__PURE__ */ h(
      k.span,
      {
        "data-disabled": t.disabled ? "" : void 0,
        "data-orientation": t.orientation,
        ...i,
        ref: n
      }
    );
  }, "SliderTrack")
), ne = "SliderRange", nt = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, ...i } = e, t = F(ne, o), l = le(ne, o), a = f.useRef(null), u = B(n, a), d = t.values.length, S = t.values.map(
      (m) => $(m, t.min, t.max)
    ), p = d > 1 ? Math.min(...S) : 0, s = 100 - Math.max(...S);
    return /* @__PURE__ */ h(
      k.span,
      {
        "data-orientation": t.orientation,
        "data-disabled": t.disabled ? "" : void 0,
        ...i,
        ref: u,
        style: {
          ...e.style,
          [l.startEdge]: p + "%",
          [l.endEdge]: s + "%"
        }
      }
    );
  }, "SliderRange")
), He = "SliderThumb", [ke, ue] = G(He), Ne = "SliderThumbProvider";
function de(r) {
  const {
    __scopeSlider: e,
    name: n,
    children: o,
    // @ts-expect-error internal render prop
    internal_do_not_use_render: i
  } = r, t = F(Ne, e), l = Me(e), [a, u] = f.useState(null), d = f.useMemo(
    () => a ? l().findIndex((w) => w.ref.current === a) : -1,
    [l, a]
  ), S = Te(a), p = a ? !!t.form || !!a.closest("form") : !0, s = t.values[d], m = n ?? (t.name ? t.name + (t.values.length > 1 ? "[]" : "") : void 0), v = s === void 0 ? 0 : $(s, t.min, t.max);
  f.useEffect(() => {
    if (a)
      return t.thumbs.add(a), () => {
        t.thumbs.delete(a);
      };
  }, [a, t.thumbs]);
  const g = {
    value: s,
    name: m,
    form: t.form,
    isFormControl: p,
    index: d,
    thumb: a,
    onThumbChange: u,
    percent: v,
    size: S
  };
  return /* @__PURE__ */ h(ke, { scope: e, ...g, children: ve(i) ? i(g) : o });
}
c(de, "SliderThumbProvider");
var Y = "SliderThumbTrigger", Fe = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, ...i } = e, t = F(Y, o), l = le(Y, o), { index: a, value: u, percent: d, size: S, onThumbChange: p } = ue(
      Y,
      o
    ), s = B(n, p), m = me(a, t.values.length), v = S == null ? void 0 : S[l.size], g = v ? he(v, d, l.direction) : 0;
    return /* @__PURE__ */ h(
      "span",
      {
        style: {
          transform: "var(--radix-slider-thumb-transform)",
          position: "absolute",
          [l.startEdge]: `calc(${d}% + ${g}px)`
        },
        children: /* @__PURE__ */ h(j.ItemSlot, { scope: o, children: /* @__PURE__ */ h(
          k.span,
          {
            role: "slider",
            "aria-label": e["aria-label"] || m,
            "aria-valuemin": t.min,
            "aria-valuenow": u,
            "aria-valuemax": t.max,
            "aria-orientation": t.orientation,
            "data-orientation": t.orientation,
            "data-disabled": t.disabled ? "" : void 0,
            tabIndex: t.disabled ? void 0 : 0,
            ...i,
            ref: s,
            style: u === void 0 ? { display: "none" } : e.style,
            onFocus: I(e.onFocus, () => {
              t.valueIndexToChangeRef.current = a;
            })
          }
        ) })
      }
    );
  }, "SliderThumbTrigger")
), rt = /* @__PURE__ */ f.forwardRef(
  /* @__PURE__ */ c(function(e, n) {
    const { __scopeSlider: o, name: i, ...t } = e;
    return /* @__PURE__ */ h(
      de,
      {
        __scopeSlider: o,
        name: i,
        internal_do_not_use_render: ({ index: l, isFormControl: a }) => /* @__PURE__ */ Ce(ye, { children: [
          /* @__PURE__ */ h(
            Fe,
            {
              ...t,
              ref: n,
              __scopeSlider: o
            }
          ),
          a ? /* @__PURE__ */ h(
            Le,
            {
              __scopeSlider: o
            },
            l
          ) : null
        ] })
      }
    );
  }, "SliderThumb")
), ze = "SliderBubbleInput", Le = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function({ __scopeSlider: e, ...n }, o) {
    const { value: i, name: t, form: l } = ue(ze, e), a = f.useRef(null), u = B(a, o), d = _e(i);
    return f.useEffect(() => {
      const S = a.current;
      if (!S) return;
      const p = window.HTMLInputElement.prototype, m = Object.getOwnPropertyDescriptor(p, "value").set;
      if (d !== i && m) {
        const v = new Event("input", { bubbles: !0 });
        m.call(S, i), S.dispatchEvent(v);
      }
    }, [d, i]), /* @__PURE__ */ h(
      k.input,
      {
        style: { display: "none" },
        name: t,
        form: l,
        ...n,
        ref: u,
        defaultValue: i
      }
    );
  }, "SliderBubbleInput")
);
function fe(r = [], e, n) {
  const o = [...r];
  return o[n] = e, o.sort((i, t) => i - t);
}
c(fe, "getNextSortedValues");
function $(r, e, n) {
  const t = 100 / (n - e) * (r - e);
  return re(t, [0, 100]);
}
c($, "convertValueToPercentage");
function me(r, e) {
  return e > 2 ? `Value ${r + 1} of ${e}` : e === 2 ? ["Minimum", "Maximum"][r] : void 0;
}
c(me, "getLabel");
function Se(r, e) {
  if (r.length === 1) return 0;
  const n = r.map((i) => Math.abs(i - e)), o = Math.min(...n);
  return n.indexOf(o);
}
c(Se, "getClosestValueIndex");
function he(r, e, n) {
  const o = r / 2, t = z([0, 50], [0, o]);
  return (o - t(e) * n) * n;
}
c(he, "getThumbInBoundsOffset");
function pe(r) {
  return r.slice(0, -1).map((e, n) => r[n + 1] - e);
}
c(pe, "getStepsBetweenValues");
function ge(r, e) {
  if (e > 0) {
    const n = pe(r);
    return Math.min(...n) >= e;
  }
  return !0;
}
c(ge, "hasMinStepsBetweenValues");
function z(r, e) {
  return (n) => {
    if (r[0] === r[1] || e[0] === e[1]) return e[0];
    const o = (e[1] - e[0]) / (r[1] - r[0]);
    return e[0] + o * (n - r[0]);
  };
}
c(z, "linearScale");
function X(r) {
  if (!Number.isFinite(r)) return 0;
  const e = r.toString();
  if (e.includes("e")) {
    const [o, i] = e.split("e"), t = o.split(".")[1] || "", l = Number(i);
    return Math.max(0, t.length - l);
  }
  const n = e.split(".")[1];
  return n ? n.length : 0;
}
c(X, "getDecimalCount");
function H(r, e) {
  const n = Math.pow(10, e);
  return Math.round(r * n) / n;
}
c(H, "roundValue");
function be(r, {
  min: e,
  step: n,
  direction: o,
  multiplier: i
}) {
  const t = X(n), l = (r - e) / n, a = Math.round(l), u = H(a * n + e, t) === H(r, t);
  let d;
  return u ? d = a + i * o : o > 0 ? d = Math.ceil(l) : d = Math.floor(l), H(d * n + e, t);
}
c(be, "getNextStepValue");
function ve(r) {
  return typeof r == "function";
}
c(ve, "isFunction");
export {
  nt as Range,
  et as Root,
  et as Slider,
  nt as SliderRange,
  rt as SliderThumb,
  tt as SliderTrack,
  rt as Thumb,
  tt as Track,
  Ze as createSliderScope,
  Le as unstable_BubbleInput,
  Le as unstable_SliderBubbleInput,
  de as unstable_SliderThumbProvider,
  Fe as unstable_SliderThumbTrigger,
  de as unstable_ThumbProvider,
  Fe as unstable_ThumbTrigger
};
