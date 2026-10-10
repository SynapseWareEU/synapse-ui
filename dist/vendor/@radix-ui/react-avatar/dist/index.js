import * as d from "react";
import { createContextScope as E } from "../../react-context/dist/index.js";
import { useCallbackRef as S } from "../../react-use-callback-ref/dist/index.js";
import { useLayoutEffect as p } from "../../react-use-layout-effect/dist/index.js";
import { Primitive as f } from "../../react-primitive/dist/index.js";
import { jsx as g } from "react/jsx-runtime";
var R = Object.defineProperty, c = (e, i) => R(e, "name", { value: i, configurable: !0 }), I = "Avatar", [w, O] = E(I), b = [
  0,
  () => {
  }
], [T, L] = w(I), U = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(i, t) {
    const { __scopeAvatar: u, ...r } = i, [a, n] = d.useState("idle"), [s, o] = _();
    return /* @__PURE__ */ g(
      T,
      {
        scope: u,
        imageLoadingStatus: a,
        setImageLoadingStatus: n,
        imageCount: s,
        setImageCount: o,
        children: /* @__PURE__ */ g(f.span, { ...r, ref: t })
      }
    );
  }, "Avatar")
), P = "AvatarImage", j = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ c(function(i, t) {
    const { __scopeAvatar: u, src: r, onLoadingStatusChange: a, ...n } = i, s = L(P, u);
    s.setImageCount;
    const o = C(r, {
      referrerPolicy: n.referrerPolicy,
      crossOrigin: n.crossOrigin,
      loadingStatus: s.imageLoadingStatus,
      setLoadingStatus: s.setImageLoadingStatus
    }), m = S((l) => {
      a == null || a(l);
    }), A = d.useRef(o);
    return p(() => {
      const l = A.current;
      A.current = o, o !== l && m(o);
    }, [o, m]), o === "loaded" ? /* @__PURE__ */ g(f.img, { ...n, ref: t, src: r }) : null;
  }, "AvatarImage")
), h = "AvatarFallback", G = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ c(function(i, t) {
    const { __scopeAvatar: u, delayMs: r, ...a } = i, n = L(h, u), [s, o] = d.useState(r === void 0);
    return d.useEffect(() => {
      if (r !== void 0) {
        const m = window.setTimeout(() => o(!0), r);
        return () => window.clearTimeout(m);
      }
    }, [r]), s && n.imageLoadingStatus !== "loaded" ? /* @__PURE__ */ g(f.span, { ...a, ref: t }) : null;
  }, "AvatarFallback")
);
function C(e, {
  loadingStatus: i,
  setLoadingStatus: t,
  referrerPolicy: u,
  crossOrigin: r
}) {
  return p(() => {
    if (!e) {
      t("error");
      return;
    }
    const a = new window.Image(), n = /* @__PURE__ */ c((o) => {
      const m = o.currentTarget;
      t(v(m));
    }, "handleLoad"), s = /* @__PURE__ */ c(() => t("error"), "handleError");
    return a.addEventListener("load", n), a.addEventListener("error", s), u && (a.referrerPolicy = u), a.crossOrigin = r ?? null, a.src = e, t(v(a)), () => {
      a.removeEventListener("load", n), a.removeEventListener("error", s), t("idle");
    };
  }, [e, r, u, t]), i;
}
c(C, "useImageLoadingStatus");
function v(e) {
  return e.complete ? e.naturalWidth > 0 ? "loaded" : "error" : "loading";
}
c(v, "getImageLoadingStatus");
function _() {
  return b;
}
c(_, "useImageCount");
function k(e) {
}
c(k, "useUpdateImageCount");
export {
  U as Avatar,
  G as AvatarFallback,
  j as AvatarImage,
  G as Fallback,
  j as Image,
  U as Root,
  O as createAvatarScope
};
