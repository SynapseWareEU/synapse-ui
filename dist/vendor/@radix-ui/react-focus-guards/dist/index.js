import * as s from "react";
var c = Object.defineProperty, a = (e, n) => c(e, "name", { value: n, configurable: !0 }), o = 0, t = null;
function d(e) {
  return u(), e.children;
}
a(d, "FocusGuards");
function u() {
  s.useEffect(() => {
    t || (t = { start: r(), end: r() });
    const { start: e, end: n } = t;
    return document.body.firstElementChild !== e && document.body.insertAdjacentElement("afterbegin", e), document.body.lastElementChild !== n && document.body.insertAdjacentElement("beforeend", n), o++, () => {
      o === 1 && (t == null || t.start.remove(), t == null || t.end.remove(), t = null), o = Math.max(0, o - 1);
    };
  }, []);
}
a(u, "useFocusGuards");
function r() {
  const e = document.createElement("span");
  return e.setAttribute("data-radix-focus-guard", ""), e.tabIndex = 0, e.style.outline = "none", e.style.opacity = "0", e.style.position = "fixed", e.style.pointerEvents = "none", e;
}
a(r, "createFocusGuard");
export {
  d as FocusGuards,
  d as Root,
  u as useFocusGuards
};
