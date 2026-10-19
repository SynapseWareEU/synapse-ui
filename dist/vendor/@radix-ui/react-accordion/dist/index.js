import * as d from "react";
import { createContextScope as B } from "../../react-context/dist/index.js";
import { createCollection as F } from "../../react-collection/dist/index.js";
import { useComposedRefs as J } from "../../react-compose-refs/dist/index.js";
import { composeEventHandlers as Q } from "../../primitive/dist/index.js";
import { useControllableState as K } from "../../react-use-controllable-state/dist/index.js";
import { Primitive as L } from "../../react-primitive/dist/index.js";
import { Root as W, Trigger as X, Content as Z, createCollapsibleScope as j } from "../../react-collapsible/dist/index.js";
import { useId as $ } from "../../react-id/dist/index.js";
import { useDirection as oo } from "../../react-direction/dist/index.js";
import { jsx as t } from "react/jsx-runtime";
var eo = Object.defineProperty, s = (p, e) => eo(p, "name", { value: e, configurable: !0 }), f = "Accordion", ro = ["Home", "End", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"], [k, no, to] = F(f), [b, To] = B(f, [
  to,
  j
]), D = j(), co = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ s(function(e, c) {
    const { type: o, ...n } = e, i = n, r = n;
    return /* @__PURE__ */ t(k.Provider, { scope: e.__scopeAccordion, children: o === "multiple" ? /* @__PURE__ */ t(so, { ...r, ref: c }) : /* @__PURE__ */ t(lo, { ...i, ref: c }) });
  }, "Accordion")
), [z, io] = b(f), [G, ao] = b(
  f,
  { collapsible: !1 }
), lo = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ s(function(e, c) {
    const {
      value: o,
      defaultValue: n,
      onValueChange: i = /* @__PURE__ */ s(() => {
      }, "onValueChange"),
      collapsible: r = !1,
      ...l
    } = e, [a, u] = K({
      prop: o,
      defaultProp: n ?? "",
      onChange: i,
      caller: f
    });
    return /* @__PURE__ */ t(
      z,
      {
        scope: e.__scopeAccordion,
        value: d.useMemo(() => a ? [a] : [], [a]),
        onItemOpen: u,
        onItemClose: d.useCallback(() => r && u(""), [r, u]),
        children: /* @__PURE__ */ t(G, { scope: e.__scopeAccordion, collapsible: r, children: /* @__PURE__ */ t(U, { ...l, ref: c }) })
      }
    );
  }, "AccordionImplSingle")
), so = /* @__PURE__ */ d.forwardRef(/* @__PURE__ */ s(function(e, c) {
  const {
    value: o,
    defaultValue: n,
    onValueChange: i = /* @__PURE__ */ s(() => {
    }, "onValueChange"),
    ...r
  } = e, [l, a] = K({
    prop: o,
    defaultProp: n ?? [],
    onChange: i,
    caller: f
  }), u = d.useCallback(
    (C) => a((A = []) => [...A, C]),
    [a]
  ), v = d.useCallback(
    (C) => a((A = []) => A.filter((x) => x !== C)),
    [a]
  );
  return /* @__PURE__ */ t(
    z,
    {
      scope: e.__scopeAccordion,
      value: l,
      onItemOpen: u,
      onItemClose: v,
      children: /* @__PURE__ */ t(G, { scope: e.__scopeAccordion, collapsible: !0, children: /* @__PURE__ */ t(U, { ...r, ref: c }) })
    }
  );
}, "AccordionImplMultiple")), [po, h] = b(f), U = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ s(function(e, c) {
    const { __scopeAccordion: o, disabled: n, dir: i, orientation: r = "vertical", ...l } = e, a = d.useRef(null), u = J(a, c), v = no(o), A = oo(i) === "ltr", x = Q(e.onKeyDown, (g) => {
      var y;
      if (!ro.includes(g.key)) return;
      const Y = g.target, _ = v().filter((E) => {
        var V;
        return !((V = E.ref.current) != null && V.disabled);
      }), I = _.findIndex((E) => E.ref.current === Y), O = _.length;
      if (I === -1) return;
      g.preventDefault();
      let m = I;
      const P = 0, w = O - 1, R = /* @__PURE__ */ s(() => {
        m = I + 1, m > w && (m = P);
      }, "moveNext"), S = /* @__PURE__ */ s(() => {
        m = I - 1, m < P && (m = w);
      }, "movePrev");
      switch (g.key) {
        case "Home":
          m = P;
          break;
        case "End":
          m = w;
          break;
        case "ArrowRight":
          r === "horizontal" && (A ? R() : S());
          break;
        case "ArrowDown":
          r === "vertical" && R();
          break;
        case "ArrowLeft":
          r === "horizontal" && (A ? S() : R());
          break;
        case "ArrowUp":
          r === "vertical" && S();
          break;
      }
      const q = m % O;
      (y = _[q].ref.current) == null || y.focus();
    });
    return /* @__PURE__ */ t(
      po,
      {
        scope: o,
        disabled: n,
        direction: i,
        orientation: r,
        children: /* @__PURE__ */ t(k.Slot, { scope: o, children: /* @__PURE__ */ t(
          L.div,
          {
            ...l,
            "data-orientation": r,
            ref: u,
            onKeyDown: n ? void 0 : x
          }
        ) })
      }
    );
  }, "AccordionImpl")
), T = "AccordionItem", [fo, M] = b(T), uo = /* @__PURE__ */ d.forwardRef(
  /* @__PURE__ */ s(function(e, c) {
    const { __scopeAccordion: o, value: n, ...i } = e, r = h(T, o), l = io(T, o), a = D(o), u = $(), v = n && l.value.includes(n) || !1, C = r.disabled || e.disabled;
    return /* @__PURE__ */ t(
      fo,
      {
        scope: o,
        open: v,
        disabled: C,
        triggerId: u,
        children: /* @__PURE__ */ t(
          W,
          {
            "data-orientation": r.orientation,
            "data-state": N(v),
            ...a,
            ...i,
            ref: c,
            disabled: C,
            open: v,
            onOpenChange: (A) => {
              A ? l.onItemOpen(n) : l.onItemClose(n);
            }
          }
        )
      }
    );
  }, "AccordionItem")
), mo = "AccordionHeader", Ao = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ s(function(e, c) {
    const { __scopeAccordion: o, ...n } = e, i = h(f, o), r = M(mo, o);
    return /* @__PURE__ */ t(
      L.h3,
      {
        "data-orientation": i.orientation,
        "data-state": N(r.open),
        "data-disabled": r.disabled ? "" : void 0,
        ...n,
        ref: c
      }
    );
  }, "AccordionHeader")
), H = "AccordionTrigger", vo = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ s(function(e, c) {
    const { __scopeAccordion: o, ...n } = e, i = h(f, o), r = M(H, o), l = ao(H, o), a = D(o);
    return /* @__PURE__ */ t(k.ItemSlot, { scope: o, children: /* @__PURE__ */ t(
      X,
      {
        "aria-disabled": r.open && !l.collapsible || void 0,
        "data-orientation": i.orientation,
        id: r.triggerId,
        ...a,
        ...n,
        ref: c
      }
    ) });
  }, "AccordionTrigger")
), Co = "AccordionContent", go = /* @__PURE__ */ d.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ s(function(e, c) {
    const { __scopeAccordion: o, ...n } = e, i = h(f, o), r = M(Co, o), l = D(o);
    return /* @__PURE__ */ t(
      Z,
      {
        role: "region",
        "aria-labelledby": r.triggerId,
        "data-orientation": i.orientation,
        ...l,
        ...n,
        ref: c,
        style: {
          "--radix-accordion-content-height": "var(--radix-collapsible-content-height)",
          "--radix-accordion-content-width": "var(--radix-collapsible-content-width)",
          ...e.style
        }
      }
    );
  }, "AccordionContent")
);
function N(p) {
  return p ? "open" : "closed";
}
s(N, "getState");
var ko = co, Do = uo, Mo = Ao, No = vo, Oo = go;
export {
  co as Accordion,
  go as AccordionContent,
  Ao as AccordionHeader,
  uo as AccordionItem,
  vo as AccordionTrigger,
  Oo as Content,
  Mo as Header,
  Do as Item,
  ko as Root,
  No as Trigger,
  To as createAccordionScope
};
