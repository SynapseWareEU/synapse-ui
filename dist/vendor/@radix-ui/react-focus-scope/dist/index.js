import * as m from "react";
import { useComposedRefs as D } from "../../react-compose-refs/dist/index.js";
import { Primitive as H } from "../../react-primitive/dist/index.js";
import { useCallbackRef as O } from "../../react-use-callback-ref/dist/index.js";
import { jsx as j } from "react/jsx-runtime";
var W = Object.defineProperty, c = (e, t) => W(e, "name", { value: t, configurable: !0 }), F = "focusScope.autoFocusOnMount", y = "focusScope.autoFocusOnUnmount", g = { bubbles: !1, cancelable: !0 }, J = /* @__PURE__ */ m.forwardRef(
  /* @__PURE__ */ c(function(t, n) {
    const {
      loop: s = !1,
      trapped: l = !1,
      onMountAutoFocus: A,
      onUnmountAutoFocus: M,
      ...K
    } = t, [o, w] = m.useState(null), v = O(A), E = O(M), h = m.useRef(null), V = D(n, w), f = m.useRef({
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }).current;
    m.useEffect(() => {
      if (l) {
        let u = function(a) {
          if (f.paused || !o) return;
          const r = a.target;
          o.contains(r) ? h.current = r : d(h.current, { select: !0 });
        }, p = function(a) {
          if (f.paused || !o) return;
          const r = a.relatedTarget;
          r !== null && (o.contains(r) || d(h.current, { select: !0 }));
        }, i = function(a) {
          if (document.activeElement === document.body)
            for (const C of a)
              C.removedNodes.length > 0 && d(o);
        };
        c(u, "handleFocusIn"), c(p, "handleFocusOut"), c(i, "handleMutations"), document.addEventListener("focusin", u), document.addEventListener("focusout", p);
        const b = new MutationObserver(i);
        return o && b.observe(o, { childList: !0, subtree: !0 }), () => {
          document.removeEventListener("focusin", u), document.removeEventListener("focusout", p), b.disconnect();
        };
      }
    }, [l, o, f.paused]), m.useEffect(() => {
      if (o) {
        k.add(f);
        const u = document.activeElement;
        if (!o.contains(u)) {
          const i = new CustomEvent(F, g);
          o.addEventListener(F, v), o.dispatchEvent(i), i.defaultPrevented || (I(_(N(o)), { select: !0 }), document.activeElement === u && d(o));
        }
        return () => {
          o.removeEventListener(F, v), setTimeout(() => {
            const i = new CustomEvent(y, g);
            o.addEventListener(y, E), o.dispatchEvent(i), i.defaultPrevented || d(u ?? document.body, { select: !0 }), o.removeEventListener(y, E), k.remove(f);
          }, 0);
        };
      }
    }, [o, v, E, f]);
    const x = m.useCallback(
      (u) => {
        if (!s && !l || f.paused) return;
        const p = u.key === "Tab" && !u.altKey && !u.ctrlKey && !u.metaKey, i = document.activeElement;
        if (p && i) {
          const b = u.currentTarget, [a, r] = L(b);
          a && r ? !u.shiftKey && i === r ? (u.preventDefault(), s && d(a, { select: !0 })) : u.shiftKey && i === a && (u.preventDefault(), s && d(r, { select: !0 })) : i === b && u.preventDefault();
        }
      },
      [s, l, f.paused]
    );
    return /* @__PURE__ */ j(H.div, { tabIndex: -1, ...K, ref: V, onKeyDown: x });
  }, "FocusScope")
);
function I(e, { select: t = !1 } = {}) {
  const n = document.activeElement;
  for (const s of e)
    if (d(s, { select: t }), document.activeElement !== n) return;
}
c(I, "focusFirst");
function L(e) {
  const t = N(e), n = T(t, e), s = T(t.reverse(), e);
  return [n, s];
}
c(L, "getTabbableEdges");
function N(e) {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: /* @__PURE__ */ c((s) => {
      const l = s.tagName === "INPUT" && s.type === "hidden";
      return s.disabled || s.hidden || l ? NodeFilter.FILTER_SKIP : s.tabIndex >= 0 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }, "acceptNode")
  });
  for (; n.nextNode(); ) t.push(n.currentNode);
  return t;
}
c(N, "getTabbableCandidates");
function T(e, t) {
  const n = typeof t.checkVisibility == "function" && t.checkVisibility({ checkVisibilityCSS: !0 });
  for (const s of e)
    if (!(n ? !s.checkVisibility({ checkVisibilityCSS: !0 }) : P(s, { upTo: t })))
      return s;
}
c(T, "findVisible");
function P(e, { upTo: t }) {
  if (getComputedStyle(e).visibility === "hidden") return !0;
  for (; e; ) {
    if (t !== void 0 && e === t) return !1;
    if (getComputedStyle(e).display === "none") return !0;
    e = e.parentElement;
  }
  return !1;
}
c(P, "isHidden");
function R(e) {
  return e instanceof HTMLInputElement && "select" in e;
}
c(R, "isSelectableInput");
function d(e, { select: t = !1 } = {}) {
  if (e && e.focus) {
    const n = document.activeElement;
    e.focus({ preventScroll: !0 }), e !== n && R(e) && t && e.select();
  }
}
c(d, "focus");
var k = U();
function U() {
  let e = [];
  return {
    add(t) {
      const n = e[0];
      t !== n && (n == null || n.pause()), e = S(e, t), e.unshift(t);
    },
    remove(t) {
      var n;
      e = S(e, t), (n = e[0]) == null || n.resume();
    }
  };
}
c(U, "createFocusScopesStack");
function S(e, t) {
  const n = [...e], s = n.indexOf(t);
  return s !== -1 && n.splice(s, 1), n;
}
c(S, "arrayRemove");
function _(e) {
  return e.filter((t) => t.tagName !== "A");
}
c(_, "removeLinks");
export {
  J as FocusScope
};
