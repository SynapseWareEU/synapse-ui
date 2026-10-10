import * as a from "react";
import { useLayoutEffect as M } from "../../react-use-layout-effect/dist/index.js";
var T = Object.defineProperty, c = (n, e) => T(n, "name", { value: e, configurable: !0 });
function O(n, e) {
  return a.useReducer((r, t) => e[r][t] ?? r, n);
}
c(O, "useStateMachine");
var C = /* @__PURE__ */ c((n) => {
  const { present: e, children: r } = n, t = E(e), o = typeof r == "function" ? r({ present: t.isPresent }) : a.Children.only(r), s = v(t.ref, S(o));
  return typeof r == "function" || t.isPresent ? a.cloneElement(o, { ref: s }) : null;
}, "Presence");
function E(n) {
  const [e, r] = a.useState(), t = a.useRef(null), o = a.useRef(n), s = a.useRef("none"), i = a.useRef(void 0), d = n ? "mounted" : "unmounted", [R, f] = O(d, {
    mounted: {
      UNMOUNT: "unmounted",
      ANIMATION_OUT: "unmountSuspended"
    },
    unmountSuspended: {
      MOUNT: "mounted",
      ANIMATION_END: "unmounted"
    },
    unmounted: {
      MOUNT: "mounted"
    }
  });
  return a.useEffect(() => {
    R === "mounted" ? (s.current = i.current ?? p(t.current), i.current = void 0) : s.current = "none";
  }, [R]), M(() => {
    const u = t.current, m = o.current;
    if (m !== n) {
      const A = s.current, l = p(u);
      n ? (i.current = l, f("MOUNT")) : l === "none" || (u == null ? void 0 : u.display) === "none" ? f("UNMOUNT") : f(m && A !== l ? "ANIMATION_OUT" : "UNMOUNT"), o.current = n;
    }
  }, [n, f]), M(() => {
    if (e) {
      let u;
      const m = e.ownerDocument.defaultView ?? window, N = /* @__PURE__ */ c((l) => {
        const y = p(t.current).includes(CSS.escape(l.animationName));
        if (l.target === e && y && (f("ANIMATION_END"), !o.current)) {
          const P = e.style.animationFillMode;
          e.style.animationFillMode = "forwards", u = m.setTimeout(() => {
            e.style.animationFillMode === "forwards" && (e.style.animationFillMode = P);
          });
        }
      }, "handleAnimationEnd"), A = /* @__PURE__ */ c((l) => {
        l.target === e && (s.current = p(t.current));
      }, "handleAnimationStart");
      return e.addEventListener("animationstart", A), e.addEventListener("animationcancel", N), e.addEventListener("animationend", N), () => {
        m.clearTimeout(u), e.removeEventListener("animationstart", A), e.removeEventListener("animationcancel", N), e.removeEventListener("animationend", N);
      };
    } else
      f("ANIMATION_END");
  }, [e, f]), {
    isPresent: ["mounted", "unmountSuspended"].includes(R),
    ref: a.useCallback((u) => {
      if (u) {
        const m = getComputedStyle(u);
        t.current = m, i.current = p(m);
      } else
        t.current = null;
      r(u);
    }, [])
  };
}
c(E, "usePresence");
function g(n, e) {
  if (typeof n == "function")
    return n(e);
  n != null && (n.current = e);
}
c(g, "setRef");
function v(...n) {
  const e = a.useRef(n);
  return e.current = n, a.useCallback((r) => {
    const t = e.current;
    let o = !1;
    const s = t.map((i) => {
      const d = g(i, r);
      return !o && typeof d == "function" && (o = !0), d;
    });
    if (o)
      return () => {
        for (let i = 0; i < s.length; i++) {
          const d = s[i];
          typeof d == "function" ? d() : g(t[i], null);
        }
      };
  }, []);
}
c(v, "useStableComposedRefs");
function p(n) {
  return (n == null ? void 0 : n.animationName) || "none";
}
c(p, "getAnimationName");
function S(n) {
  var t, o;
  let e = (t = Object.getOwnPropertyDescriptor(n.props, "ref")) == null ? void 0 : t.get, r = e && "isReactWarning" in e && e.isReactWarning;
  return r ? n.ref : (e = (o = Object.getOwnPropertyDescriptor(n, "ref")) == null ? void 0 : o.get, r = e && "isReactWarning" in e && e.isReactWarning, r ? n.props.ref : n.props.ref || n.ref);
}
c(S, "getElementRef");
export {
  C as Presence
};
