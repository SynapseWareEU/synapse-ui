import * as o from "react";
import { composeEventHandlers as O } from "../../primitive/dist/index.js";
import { createContextScope as w } from "../../react-context/dist/index.js";
import { useControllableState as A } from "../../react-use-controllable-state/dist/index.js";
import { useLayoutEffect as S } from "../../react-use-layout-effect/dist/index.js";
import { useComposedRefs as D } from "../../react-compose-refs/dist/index.js";
import { Primitive as R } from "../../react-primitive/dist/index.js";
import { Presence as L } from "../../react-presence/dist/index.js";
import { useId as M } from "../../react-id/dist/index.js";
import { jsx as p } from "react/jsx-runtime";
var k = Object.defineProperty, f = (a, t) => k(a, "name", { value: t, configurable: !0 }), h = "Collapsible", [F, Z] = w(h), [j, P] = F(h), B = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ f(function(t, i) {
    const {
      __scopeCollapsible: l,
      open: r,
      defaultOpen: e,
      disabled: c,
      onOpenChange: s,
      ...b
    } = t, [u, d] = A({
      prop: r,
      defaultProp: e ?? !1,
      onChange: s,
      caller: h
    });
    return /* @__PURE__ */ p(
      j,
      {
        scope: l,
        disabled: c,
        contentId: M(),
        open: u,
        onOpenToggle: o.useCallback(() => d((g) => !g), [d]),
        children: /* @__PURE__ */ p(
          R.div,
          {
            "data-state": C(u),
            "data-disabled": c ? "" : void 0,
            ...b,
            ref: i
          }
        )
      }
    );
  }, "Collapsible")
), G = "CollapsibleTrigger", $ = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(t, i) {
    const { __scopeCollapsible: l, ...r } = t, e = P(G, l);
    return /* @__PURE__ */ p(
      R.button,
      {
        type: "button",
        "aria-controls": e.open ? e.contentId : void 0,
        "aria-expanded": e.open || !1,
        "data-state": C(e.open),
        "data-disabled": e.disabled ? "" : void 0,
        disabled: e.disabled,
        ...r,
        ref: i,
        onClick: O(t.onClick, e.onOpenToggle)
      }
    );
  }, "CollapsibleTrigger")
), T = "CollapsibleContent", q = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(t, i) {
    const { forceMount: l, ...r } = t, e = P(T, t.__scopeCollapsible);
    return /* @__PURE__ */ p(L, { present: l || e.open, children: ({ present: c }) => /* @__PURE__ */ p(H, { ...r, ref: i, present: c }) });
  }, "CollapsibleContent")
), H = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ f(function(t, i) {
  const { __scopeCollapsible: l, present: r, children: e, ...c } = t, s = P(T, l), [b, u] = o.useState(r), d = o.useRef(null), g = D(i, d), _ = o.useRef(0), x = _.current, y = o.useRef(0), E = y.current, v = s.open || b, I = o.useRef(v), m = o.useRef(void 0);
  return o.useEffect(() => {
    const n = requestAnimationFrame(() => I.current = !1);
    return () => cancelAnimationFrame(n);
  }, []), S(() => {
    const n = d.current;
    if (n) {
      m.current = m.current || {
        transitionDuration: n.style.transitionDuration,
        animationName: n.style.animationName
      }, n.style.transitionDuration = "0s", n.style.animationName = "none";
      const N = n.getBoundingClientRect();
      _.current = N.height, y.current = N.width, I.current || (n.style.transitionDuration = m.current.transitionDuration, n.style.animationName = m.current.animationName), u(r);
    }
  }, [s.open, r]), /* @__PURE__ */ p(
    R.div,
    {
      "data-state": C(s.open),
      "data-disabled": s.disabled ? "" : void 0,
      id: s.contentId,
      hidden: !v,
      ...c,
      ref: g,
      style: {
        "--radix-collapsible-content-height": x ? `${x}px` : void 0,
        "--radix-collapsible-content-width": E ? `${E}px` : void 0,
        ...t.style
      },
      children: v && e
    }
  );
}, "CollapsibleContentImpl"));
function C(a) {
  return a ? "open" : "closed";
}
f(C, "getState");
var ee = B, te = $, oe = q;
export {
  B as Collapsible,
  q as CollapsibleContent,
  $ as CollapsibleTrigger,
  oe as Content,
  ee as Root,
  te as Trigger,
  Z as createCollapsibleScope
};
