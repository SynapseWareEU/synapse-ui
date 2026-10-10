import * as c from "react";
import { composeEventHandlers as b } from "../../primitive/dist/index.js";
import { createCollection as z } from "../../react-collection/dist/index.js";
import { useComposedRefs as q } from "../../react-compose-refs/dist/index.js";
import { createContextScope as J } from "../../react-context/dist/index.js";
import { useId as Q } from "../../react-id/dist/index.js";
import { Primitive as L } from "../../react-primitive/dist/index.js";
import { useCallbackRef as W } from "../../react-use-callback-ref/dist/index.js";
import { useControllableState as X } from "../../react-use-controllable-state/dist/index.js";
import { useDirection as Z } from "../../react-direction/dist/index.js";
import { useLayoutEffect as $ } from "../../react-use-layout-effect/dist/index.js";
import { useIsHydrated as ee } from "../../react-use-is-hydrated/dist/index.js";
import { jsx as p } from "react/jsx-runtime";
var oe = Object.defineProperty, v = (o, e) => oe(o, "name", { value: e, configurable: !0 }), P = "rovingFocusGroup.onEntryFocus", te = { bubbles: !1, cancelable: !0 }, S = "RovingFocusGroup", [D, N, re] = z(S), [ne, Se] = J(
  S,
  [re]
), [ce, se] = ne(S), ue = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, s) {
    return /* @__PURE__ */ p(D.Provider, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(D.Slot, { scope: e.__scopeRovingFocusGroup, children: /* @__PURE__ */ p(ie, { ...e, ref: s }) }) });
  }, "RovingFocusGroup")
), ie = /* @__PURE__ */ c.forwardRef(/* @__PURE__ */ v(function(e, s) {
  const {
    __scopeRovingFocusGroup: r,
    orientation: a,
    loop: y = !1,
    dir: _,
    currentTabStopId: R,
    defaultCurrentTabStopId: h,
    onCurrentTabStopIdChange: A,
    onEntryFocus: I,
    preventScrollOnEntryFocus: u = !1,
    ...E
  } = e, w = c.useRef(null), F = q(s, w), g = Z(_), [T, d] = X({
    prop: R,
    defaultProp: h ?? null,
    onChange: A,
    caller: S
  }), [t, l] = c.useState(!1), C = W(I), f = N(r), i = c.useRef(!1), [B, O] = c.useState(0);
  return c.useEffect(() => {
    const n = w.current;
    if (n)
      return n.addEventListener(P, C), () => n.removeEventListener(P, C);
  }, [C]), /* @__PURE__ */ p(
    ce,
    {
      scope: r,
      orientation: a,
      dir: g,
      loop: y,
      currentTabStopId: T,
      onItemFocus: c.useCallback(
        (n) => d(n),
        [d]
      ),
      onItemShiftTab: c.useCallback(() => l(!0), []),
      onFocusableItemAdd: c.useCallback(
        () => O((n) => n + 1),
        []
      ),
      onFocusableItemRemove: c.useCallback(
        () => O((n) => n - 1),
        []
      ),
      children: /* @__PURE__ */ p(
        L.div,
        {
          tabIndex: t || B === 0 ? -1 : 0,
          "data-orientation": a,
          ...E,
          ref: F,
          style: { outline: "none", ...e.style },
          onMouseDown: b(e.onMouseDown, () => {
            i.current = !0;
          }),
          onFocus: b(e.onFocus, (n) => {
            const H = !i.current;
            if (n.target === n.currentTarget && H && !t) {
              const K = new CustomEvent(P, te);
              if (n.currentTarget.dispatchEvent(K), !K.defaultPrevented) {
                const G = f().filter((m) => m.focusable), Y = G.find((m) => m.active), j = G.find((m) => m.id === T), V = [Y, j, ...G].filter(
                  Boolean
                ).map((m) => m.ref.current);
                x(V, u);
              }
            }
            i.current = !1;
          }),
          onBlur: b(e.onBlur, () => l(!1))
        }
      )
    }
  );
}, "RovingFocusGroupImpl")), ae = "RovingFocusGroupItem", fe = /* @__PURE__ */ c.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, s) {
    const {
      __scopeRovingFocusGroup: r,
      focusable: a = !0,
      active: y = !1,
      tabStopId: _,
      children: R,
      ...h
    } = e, A = Q(), I = _ || A, u = se(ae, r), E = u.currentTabStopId === I, w = N(r), { onFocusableItemAdd: F, onFocusableItemRemove: g, currentTabStopId: T } = u, d = ee();
    return $(() => {
      if (!(!d || !a))
        return F(), () => g();
    }, [d, a, F, g]), c.useEffect(() => {
      if (!(d || !a))
        return F(), () => g();
    }, [d, a, F, g]), /* @__PURE__ */ p(
      D.ItemSlot,
      {
        scope: r,
        id: I,
        focusable: a,
        active: y,
        children: /* @__PURE__ */ p(
          L.span,
          {
            tabIndex: E ? 0 : -1,
            "data-orientation": u.orientation,
            ...h,
            ref: s,
            onMouseDown: b(e.onMouseDown, (t) => {
              a ? u.onItemFocus(I) : t.preventDefault();
            }),
            onFocus: b(e.onFocus, () => u.onItemFocus(I)),
            onKeyDown: b(e.onKeyDown, (t) => {
              if (t.key === "Tab" && t.shiftKey) {
                u.onItemShiftTab();
                return;
              }
              if (t.target !== t.currentTarget) return;
              const l = k(t, u.orientation, u.dir);
              if (l !== void 0) {
                if (t.metaKey || t.ctrlKey || t.altKey || t.shiftKey) return;
                t.preventDefault();
                let f = w().filter((i) => i.focusable).map((i) => i.ref.current);
                if (l === "last") f.reverse();
                else if (l === "prev" || l === "next") {
                  l === "prev" && f.reverse();
                  const i = f.indexOf(t.currentTarget);
                  f = u.loop ? U(f, i + 1) : f.slice(i + 1);
                }
                setTimeout(() => x(f));
              }
            }),
            children: typeof R == "function" ? R({ isCurrentTabStop: E, hasTabStop: T != null }) : R
          }
        )
      }
    );
  }, "RovingFocusGroupItem")
), le = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
function M(o, e) {
  return e !== "rtl" ? o : o === "ArrowLeft" ? "ArrowRight" : o === "ArrowRight" ? "ArrowLeft" : o;
}
v(M, "getDirectionAwareKey");
function k(o, e, s) {
  const r = M(o.key, s);
  if (!(e === "vertical" && ["ArrowLeft", "ArrowRight"].includes(r)) && !(e === "horizontal" && ["ArrowUp", "ArrowDown"].includes(r)))
    return le[r];
}
v(k, "getFocusIntent");
function x(o, e = !1) {
  const s = document.activeElement;
  for (const r of o)
    if (r === s || (r.focus({ preventScroll: e }), document.activeElement !== s)) return;
}
v(x, "focusFirst");
function U(o, e) {
  return o.map((s, r) => o[(e + r) % o.length]);
}
v(U, "wrapArray");
var ye = ue, _e = fe;
export {
  _e as Item,
  ye as Root,
  ue as RovingFocusGroup,
  fe as RovingFocusGroupItem,
  Se as createRovingFocusGroupScope
};
