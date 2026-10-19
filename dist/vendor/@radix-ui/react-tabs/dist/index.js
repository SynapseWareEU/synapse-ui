import * as b from "react";
import { composeEventHandlers as p } from "../../primitive/dist/index.js";
import { createContextScope as P } from "../../react-context/dist/index.js";
import { createRovingFocusGroupScope as R, Root as S, Item as M } from "../../react-roving-focus/dist/index.js";
import { Presence as x } from "../../react-presence/dist/index.js";
import { Primitive as g } from "../../react-primitive/dist/index.js";
import { useDirection as y } from "../../react-direction/dist/index.js";
import { useControllableState as E } from "../../react-use-controllable-state/dist/index.js";
import { useId as F } from "../../react-id/dist/index.js";
import { jsx as d } from "react/jsx-runtime";
var w = Object.defineProperty, v = (i, e) => w(i, "name", { value: e, configurable: !0 }), C = "Tabs", [D, X] = P(C, [
  R
]), A = R(), [V, I] = D(C), G = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, l) {
    const {
      __scopeTabs: s,
      value: t,
      onValueChange: a,
      defaultValue: c,
      orientation: o = "horizontal",
      dir: u,
      activationMode: m = "automatic",
      ...T
    } = e, n = y(u), [r, f] = E({
      prop: t,
      onChange: a,
      defaultProp: c ?? "",
      caller: C
    });
    return /* @__PURE__ */ d(
      V,
      {
        scope: s,
        baseId: F(),
        value: r,
        onValueChange: f,
        orientation: o,
        dir: n,
        activationMode: m,
        children: /* @__PURE__ */ d(
          g.div,
          {
            dir: n,
            "data-orientation": o,
            ...T,
            ref: l
          }
        )
      }
    );
  }, "Tabs")
), L = "TabsList", N = /* @__PURE__ */ b.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ v(function(e, l) {
    const { __scopeTabs: s, loop: t = !0, ...a } = e, c = I(L, s), o = A(s);
    return /* @__PURE__ */ d(
      S,
      {
        asChild: !0,
        ...o,
        orientation: c.orientation,
        dir: c.dir,
        loop: t,
        children: /* @__PURE__ */ d(
          g.div,
          {
            role: "tablist",
            "aria-orientation": c.orientation,
            ...a,
            ref: l
          }
        )
      }
    );
  }, "TabsList")
), k = "TabsTrigger", $ = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ v(function(e, l) {
    const { __scopeTabs: s, value: t, disabled: a = !1, ...c } = e, o = I(k, s), u = A(s), m = _(o.baseId, t), T = h(o.baseId, t), n = t === o.value;
    return /* @__PURE__ */ d(
      M,
      {
        asChild: !0,
        ...u,
        focusable: !a,
        active: n,
        children: /* @__PURE__ */ d(
          g.button,
          {
            type: "button",
            role: "tab",
            "aria-selected": n,
            "aria-controls": T,
            "data-state": n ? "active" : "inactive",
            "data-disabled": a ? "" : void 0,
            disabled: a,
            id: m,
            ...c,
            ref: l,
            onMouseDown: p(e.onMouseDown, (r) => {
              !a && r.button === 0 && r.ctrlKey === !1 ? o.onValueChange(t) : r.preventDefault();
            }),
            onKeyDown: p(e.onKeyDown, (r) => {
              a || r.target !== r.currentTarget || [" ", "Enter"].includes(r.key) && o.onValueChange(t);
            }),
            onFocus: p(e.onFocus, () => {
              const r = o.activationMode !== "manual";
              !n && !a && r && o.onValueChange(t);
            })
          }
        )
      }
    );
  }, "TabsTrigger")
), K = "TabsContent", j = /* @__PURE__ */ b.forwardRef(
  /* @__PURE__ */ v(function(e, l) {
    const { __scopeTabs: s, value: t, forceMount: a, children: c, ...o } = e, u = I(K, s), m = _(u.baseId, t), T = h(u.baseId, t), n = t === u.value, r = b.useRef(n);
    return b.useEffect(() => {
      const f = requestAnimationFrame(() => r.current = !1);
      return () => cancelAnimationFrame(f);
    }, []), /* @__PURE__ */ d(x, { present: a || n, children: ({ present: f }) => /* @__PURE__ */ d(
      g.div,
      {
        "data-state": n ? "active" : "inactive",
        "data-orientation": u.orientation,
        role: "tabpanel",
        "aria-labelledby": m,
        hidden: !f,
        id: T,
        tabIndex: 0,
        ...o,
        ref: l,
        style: {
          ...e.style,
          animationDuration: r.current ? "0s" : void 0
        },
        children: f && c
      }
    ) });
  }, "TabsContent")
);
function _(i, e) {
  return `${i}-trigger-${e}`;
}
v(_, "makeTriggerId");
function h(i, e) {
  return `${i}-content-${e}`;
}
v(h, "makeContentId");
var Y = G, Z = N, ee = $, te = j;
export {
  te as Content,
  Z as List,
  Y as Root,
  G as Tabs,
  j as TabsContent,
  N as TabsList,
  $ as TabsTrigger,
  ee as Trigger,
  X as createTabsScope
};
