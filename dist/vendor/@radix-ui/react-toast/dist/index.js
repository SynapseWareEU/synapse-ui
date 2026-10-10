import * as o from "react";
import * as Te from "react-dom";
import { composeEventHandlers as S } from "../../primitive/dist/index.js";
import { useComposedRefs as re } from "../../react-compose-refs/dist/index.js";
import { createCollection as ve } from "../../react-collection/dist/index.js";
import { createContextScope as we } from "../../react-context/dist/index.js";
import { Branch as Ee, Root as ye } from "../../react-dismissable-layer/dist/index.js";
import { Portal as Pe } from "../../react-portal/dist/index.js";
import { Presence as he } from "../../react-presence/dist/index.js";
import { Primitive as V, dispatchDiscreteCustomEvent as Ce } from "../../react-primitive/dist/index.js";
import { useCallbackRef as X } from "../../react-use-callback-ref/dist/index.js";
import { useControllableState as xe } from "../../react-use-controllable-state/dist/index.js";
import { useLayoutEffect as be } from "../../react-use-layout-effect/dist/index.js";
import { VisuallyHidden as se } from "../../react-visually-hidden/dist/index.js";
import { jsx as p, jsxs as Q, Fragment as ae } from "react/jsx-runtime";
var Re = Object.defineProperty, u = (i, e) => Re(i, "name", { value: e, configurable: !0 }), ie = "ToastProvider", [Z, ce, ge] = ve("Toast"), [ue, st] = we("Toast", [ge]), [Se, Y] = ue(ie), Fe = /* @__PURE__ */ u((i) => {
  const {
    __scopeToast: e,
    label: n = "Notification",
    duration: t = 5e3,
    swipeDirection: a = "right",
    swipeThreshold: l = 50,
    announcerContainer: w,
    children: m
  } = i, [T, y] = o.useState(null), [r, R] = o.useState(0), b = o.useRef(!1);
  return n.trim() || console.error(
    `Invalid prop \`label\` supplied to \`${ie}\`. Expected non-empty \`string\`.`
  ), /* @__PURE__ */ p(Z.Provider, { scope: e, children: /* @__PURE__ */ p(
    Se,
    {
      scope: e,
      label: n,
      duration: t,
      swipeDirection: a,
      swipeThreshold: l,
      toastCount: r,
      viewport: T,
      onViewportChange: y,
      onToastAdd: o.useCallback(() => R((A) => A + 1), []),
      onToastRemove: o.useCallback(() => R((A) => A - 1), []),
      isClosePausedRef: b,
      announcerContainer: w,
      children: m
    }
  ) });
}, "ToastProvider"), Ie = "ToastViewport", _e = ["F8"], G = "toast.viewportPause", J = "toast.viewportResume", Ae = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ u(function(e, n) {
    const {
      __scopeToast: t,
      hotkey: a = _e,
      label: l = "Notifications ({hotkey})",
      ...w
    } = e, m = Y(Ie, t), T = ce(t), y = o.useRef(null), r = o.useRef(null), R = o.useRef(null), b = o.useRef(null), A = re(n, b, m.onViewportChange), j = a.join("+").replace(/Key/g, "").replace(/Digit/g, ""), D = m.toastCount > 0;
    o.useEffect(() => {
      const c = /* @__PURE__ */ u((v) => {
        var C;
        a.length !== 0 && a.every((E) => v[E] || v.code === E) && ((C = b.current) == null || C.focus());
      }, "handleKeyDown");
      return document.addEventListener("keydown", c), () => document.removeEventListener("keydown", c);
    }, [a]), o.useEffect(() => {
      const c = y.current, v = b.current;
      if (D && c && v) {
        const f = /* @__PURE__ */ u(() => {
          if (!m.isClosePausedRef.current) {
            const h = new CustomEvent(G);
            v.dispatchEvent(h), m.isClosePausedRef.current = !0;
          }
        }, "handlePause"), C = /* @__PURE__ */ u(() => {
          if (m.isClosePausedRef.current) {
            const h = new CustomEvent(J);
            v.dispatchEvent(h), m.isClosePausedRef.current = !1;
          }
        }, "handleResume"), E = /* @__PURE__ */ u((h) => {
          !c.contains(h.relatedTarget) && C();
        }, "handleFocusOutResume"), P = /* @__PURE__ */ u(() => {
          c.contains(document.activeElement) || C();
        }, "handlePointerLeaveResume");
        return c.addEventListener("focusin", f), c.addEventListener("focusout", E), c.addEventListener("pointermove", f), c.addEventListener("pointerleave", P), window.addEventListener("blur", f), window.addEventListener("focus", C), () => {
          c.removeEventListener("focusin", f), c.removeEventListener("focusout", E), c.removeEventListener("pointermove", f), c.removeEventListener("pointerleave", P), window.removeEventListener("blur", f), window.removeEventListener("focus", C);
        };
      }
    }, [D, m.isClosePausedRef]);
    const d = o.useCallback(
      ({ tabbingDirection: c }) => {
        const f = T().map((C) => {
          const E = C.ref.current, P = [E, ...fe(E)];
          return c === "forwards" ? P : P.reverse();
        });
        return (c === "forwards" ? f.reverse() : f).flat();
      },
      [T]
    );
    return o.useEffect(() => {
      const c = b.current;
      if (c) {
        const v = /* @__PURE__ */ u((f) => {
          var P, h, L;
          const C = f.altKey || f.ctrlKey || f.metaKey;
          if (f.key === "Tab" && !C) {
            const M = document.activeElement, F = f.shiftKey;
            if (f.target === c && F) {
              (P = r.current) == null || P.focus();
              return;
            }
            const I = d({ tabbingDirection: F ? "backwards" : "forwards" }), O = I.findIndex((K) => K === M);
            U(I.slice(O + 1)) ? f.preventDefault() : F ? (h = r.current) == null || h.focus() : (L = R.current) == null || L.focus();
          }
        }, "handleKeyDown");
        return c.addEventListener("keydown", v), () => c.removeEventListener("keydown", v);
      }
    }, [T, d]), /* @__PURE__ */ Q(
      Ee,
      {
        ref: y,
        role: "region",
        "aria-label": l.replace("{hotkey}", j),
        tabIndex: -1,
        style: { pointerEvents: D ? void 0 : "none" },
        children: [
          D && /* @__PURE__ */ p(
            oe,
            {
              ref: r,
              onFocusFromOutsideViewport: () => {
                const c = d({
                  tabbingDirection: "forwards"
                });
                U(c);
              }
            }
          ),
          /* @__PURE__ */ p(Z.Slot, { scope: t, children: /* @__PURE__ */ p(V.ol, { tabIndex: -1, ...w, ref: A }) }),
          D && /* @__PURE__ */ p(
            oe,
            {
              ref: R,
              onFocusFromOutsideViewport: () => {
                const c = d({
                  tabbingDirection: "backwards"
                });
                U(c);
              }
            }
          )
        ]
      }
    );
  }, "ToastViewport")
), De = "ToastFocusProxy", oe = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(e, n) {
    const { __scopeToast: t, onFocusFromOutsideViewport: a, ...l } = e, w = Y(De, t);
    return /* @__PURE__ */ p(
      se,
      {
        tabIndex: 0,
        ...l,
        ref: n,
        style: { position: "fixed" },
        onFocus: (m) => {
          var r;
          const T = m.relatedTarget;
          !((r = w.viewport) != null && r.contains(T)) && a();
        }
      }
    );
  }, "ToastFocusProxy")
), $ = "Toast", Le = "toast.swipeStart", Oe = "toast.swipeMove", Me = "toast.swipeCancel", Ne = "toast.swipeEnd", ke = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(e, n) {
    const { forceMount: t, open: a, defaultOpen: l, onOpenChange: w, ...m } = e, [T, y] = xe({
      prop: a,
      defaultProp: l ?? !0,
      onChange: w,
      caller: $
    });
    return /* @__PURE__ */ p(he, { present: t || T, children: /* @__PURE__ */ p(
      He,
      {
        open: T,
        ...m,
        ref: n,
        onClose: () => y(!1),
        onPause: X(e.onPause),
        onResume: X(e.onResume),
        onSwipeStart: S(e.onSwipeStart, (r) => {
          r.currentTarget.setAttribute("data-swipe", "start");
        }),
        onSwipeMove: S(e.onSwipeMove, (r) => {
          const { x: R, y: b } = r.detail.delta;
          r.currentTarget.setAttribute("data-swipe", "move"), r.currentTarget.style.setProperty("--radix-toast-swipe-move-x", `${R}px`), r.currentTarget.style.setProperty("--radix-toast-swipe-move-y", `${b}px`);
        }),
        onSwipeCancel: S(e.onSwipeCancel, (r) => {
          r.currentTarget.setAttribute("data-swipe", "cancel"), r.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), r.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), r.currentTarget.style.removeProperty("--radix-toast-swipe-end-x"), r.currentTarget.style.removeProperty("--radix-toast-swipe-end-y");
        }),
        onSwipeEnd: S(e.onSwipeEnd, (r) => {
          const { x: R, y: b } = r.detail.delta;
          r.currentTarget.setAttribute("data-swipe", "end"), r.currentTarget.style.removeProperty("--radix-toast-swipe-move-x"), r.currentTarget.style.removeProperty("--radix-toast-swipe-move-y"), r.currentTarget.style.setProperty("--radix-toast-swipe-end-x", `${R}px`), r.currentTarget.style.setProperty("--radix-toast-swipe-end-y", `${b}px`), y(!1);
        })
      }
    ) });
  }, "Toast")
), [Ve, Ke] = ue($, {
  onClose() {
  }
}), He = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ u(function(e, n) {
    const {
      __scopeToast: t,
      type: a = "foreground",
      duration: l,
      open: w,
      onClose: m,
      onEscapeKeyDown: T,
      onPause: y,
      onResume: r,
      onSwipeStart: R,
      onSwipeMove: b,
      onSwipeCancel: A,
      onSwipeEnd: j,
      ...D
    } = e, d = Y($, t), c = ce(t), [v, f] = o.useState(null), C = re(n, f), E = o.useRef(null), P = o.useRef(null), h = l || d.duration, L = o.useRef(0), M = o.useRef(h), F = o.useRef(0), { onToastAdd: B, onToastRemove: q } = d, I = X(() => {
      var x;
      (v == null ? void 0 : v.contains(document.activeElement)) && ((x = d.viewport) == null || x.focus()), m();
    }), O = o.useCallback(
      (s) => {
        !s || s === 1 / 0 || (window.clearTimeout(F.current), L.current = (/* @__PURE__ */ new Date()).getTime(), F.current = window.setTimeout(I, s));
      },
      [I]
    );
    o.useEffect(() => {
      const s = d.viewport;
      if (s) {
        const x = /* @__PURE__ */ u(() => {
          O(M.current), r == null || r();
        }, "handleResume"), g = /* @__PURE__ */ u(() => {
          const _ = (/* @__PURE__ */ new Date()).getTime() - L.current;
          M.current = M.current - _, window.clearTimeout(F.current), y == null || y();
        }, "handlePause");
        return s.addEventListener(G, g), s.addEventListener(J, x), () => {
          s.removeEventListener(G, g), s.removeEventListener(J, x);
        };
      }
    }, [d.viewport, h, y, r, O]), o.useEffect(() => {
      w && !d.isClosePausedRef.current && O(h);
    }, [w, h, d.isClosePausedRef, O]), o.useEffect(() => () => {
      window.clearTimeout(F.current);
    }, []), o.useEffect(() => (B(), () => q()), [B, q]);
    const K = o.useMemo(() => v ? ee(v) : null, [v]);
    return d.viewport ? /* @__PURE__ */ Q(ae, { children: [
      K && /* @__PURE__ */ p(
        We,
        {
          __scopeToast: t,
          role: "status",
          "aria-live": a === "foreground" ? "assertive" : "polite",
          children: K
        }
      ),
      /* @__PURE__ */ p(Ve, { scope: t, onClose: I, children: Te.createPortal(
        /* @__PURE__ */ p(Z.ItemSlot, { scope: t, children: /* @__PURE__ */ p(
          ye,
          {
            asChild: !0,
            onEscapeKeyDown: S(T, (s) => {
              c().some(
                (g) => {
                  var _;
                  return (_ = g.ref.current) == null ? void 0 : _.contains(s.target);
                }
              ) || I();
            }),
            children: /* @__PURE__ */ p(
              V.li,
              {
                tabIndex: 0,
                "data-state": w ? "open" : "closed",
                "data-swipe-direction": d.swipeDirection,
                ...D,
                ref: C,
                style: { userSelect: "none", touchAction: "none", ...e.style },
                onKeyDown: S(e.onKeyDown, (s) => {
                  s.key === "Escape" && (T == null || T(s.nativeEvent), s.nativeEvent.defaultPrevented || I());
                }),
                onPointerDown: S(e.onPointerDown, (s) => {
                  s.button === 0 && (E.current = { x: s.clientX, y: s.clientY });
                }),
                onPointerMove: S(e.onPointerMove, (s) => {
                  if (!E.current) return;
                  const x = s.clientX - E.current.x, g = s.clientY - E.current.y, _ = !!P.current, N = ["left", "right"].includes(d.swipeDirection), H = ["left", "up"].includes(d.swipeDirection) ? Math.min : Math.max, pe = N ? H(0, x) : 0, me = N ? 0 : H(0, g), z = s.pointerType === "touch" ? 10 : 2, W = { x: pe, y: me }, te = { originalEvent: s, delta: W };
                  _ ? (P.current = W, k(Oe, b, te, {
                    discrete: !1
                  })) : ne(W, d.swipeDirection, z) ? (P.current = W, k(Le, R, te, {
                    discrete: !1
                  }), s.target.setPointerCapture(s.pointerId)) : (Math.abs(x) > z || Math.abs(g) > z) && (E.current = null);
                }),
                onPointerUp: S(e.onPointerUp, (s) => {
                  const x = P.current, g = s.target;
                  if (g.hasPointerCapture(s.pointerId) && g.releasePointerCapture(s.pointerId), P.current = null, E.current = null, x) {
                    const _ = s.currentTarget, N = { originalEvent: s, delta: x };
                    ne(x, d.swipeDirection, d.swipeThreshold) ? k(Ne, j, N, {
                      discrete: !0
                    }) : k(
                      Me,
                      A,
                      N,
                      {
                        discrete: !0
                      }
                    ), _.addEventListener("click", (H) => H.preventDefault(), {
                      once: !0
                    });
                  }
                })
              }
            )
          }
        ) }),
        d.viewport
      ) })
    ] }) : null;
  }, "ToastImpl")
), We = /* @__PURE__ */ u((i) => {
  const { __scopeToast: e, children: n, ...t } = i, a = Y($, e), [l, w] = o.useState(!1), [m, T] = o.useState(!1);
  return le(() => w(!0)), o.useEffect(() => {
    const y = window.setTimeout(() => T(!0), 1e3);
    return () => window.clearTimeout(y);
  }, []), m ? null : /* @__PURE__ */ p(Pe, { asChild: !0, container: a.announcerContainer || void 0, children: /* @__PURE__ */ p(se, { ...t, children: l && /* @__PURE__ */ Q(ae, { children: [
    a.label,
    " ",
    n
  ] }) }) });
}, "ToastAnnounce"), Ue = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ u(function(e, n) {
    const { __scopeToast: t, ...a } = e;
    return /* @__PURE__ */ p(V.div, { ...a, ref: n });
  }, "ToastDescription")
), Xe = "ToastClose", Ye = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ u(function(e, n) {
    const { __scopeToast: t, ...a } = e, l = Ke(Xe, t);
    return /* @__PURE__ */ p($e, { asChild: !0, children: /* @__PURE__ */ p(
      V.button,
      {
        type: "button",
        ...a,
        ref: n,
        onClick: S(e.onClick, l.onClose)
      }
    ) });
  }, "ToastClose")
), $e = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ u(function(e, n) {
  const { __scopeToast: t, altText: a, ...l } = e;
  return /* @__PURE__ */ p(
    V.div,
    {
      "data-radix-toast-announce-exclude": "",
      "data-radix-toast-announce-alt": a || void 0,
      ...l,
      ref: n
    }
  );
}, "ToastAnnounceExclude"));
function ee(i) {
  const e = [];
  return Array.from(i.childNodes).forEach((t) => {
    if (t.nodeType === t.TEXT_NODE && t.textContent && e.push(t.textContent), de(t)) {
      const a = t.ariaHidden || t.hidden || t.style.display === "none", l = t.dataset.radixToastAnnounceExclude === "";
      if (!a)
        if (l) {
          const w = t.dataset.radixToastAnnounceAlt;
          w && e.push(w);
        } else
          e.push(...ee(t));
    }
  }), e;
}
u(ee, "getAnnounceTextContent");
function k(i, e, n, { discrete: t }) {
  const a = n.originalEvent.currentTarget, l = new CustomEvent(i, { bubbles: !0, cancelable: !0, detail: n });
  e && a.addEventListener(i, e, { once: !0 }), t ? Ce(a, l) : a.dispatchEvent(l);
}
u(k, "handleAndDispatchCustomEvent");
var ne = /* @__PURE__ */ u((i, e, n = 0) => {
  const t = Math.abs(i.x), a = Math.abs(i.y), l = t > a;
  return e === "left" || e === "right" ? l && t > n : !l && a > n;
}, "isDeltaInDirection");
function le(i = () => {
}) {
  const e = X(i);
  be(() => {
    let n = 0, t = 0;
    return n = window.requestAnimationFrame(() => t = window.requestAnimationFrame(e)), () => {
      window.cancelAnimationFrame(n), window.cancelAnimationFrame(t);
    };
  }, [e]);
}
u(le, "useNextFrame");
function de(i) {
  return i.nodeType === i.ELEMENT_NODE;
}
u(de, "isHTMLElement");
function fe(i) {
  const e = [], n = document.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ u((t) => {
      const a = t.tagName === "INPUT" && t.type === "hidden";
      return t.disabled || t.hidden || a ? NodeFilter.FILTER_SKIP : t.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; n.nextNode(); ) e.push(n.currentNode);
  return e;
}
u(fe, "getTabbableCandidates");
function U(i) {
  const e = document.activeElement;
  return i.some((n) => n === e ? !0 : (n.focus(), document.activeElement !== e));
}
u(U, "focusFirst");
var at = Fe, it = Ae, ct = ke, ut = Ue, lt = Ye;
export {
  lt as Close,
  ut as Description,
  at as Provider,
  ct as Root,
  ke as Toast,
  Ye as ToastClose,
  Ue as ToastDescription,
  Fe as ToastProvider,
  Ae as ToastViewport,
  it as Viewport,
  st as createToastScope
};
