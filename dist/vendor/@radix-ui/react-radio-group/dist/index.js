import * as t from "react";
import { composeEventHandlers as k } from "../../primitive/dist/index.js";
import { useComposedRefs as S } from "../../react-compose-refs/dist/index.js";
import { createContextScope as L } from "../../react-context/dist/index.js";
import { Primitive as w } from "../../react-primitive/dist/index.js";
import { createRovingFocusGroupScope as U, Root as X, Item as Y } from "../../react-roving-focus/dist/index.js";
import { useControllableState as J } from "../../react-use-controllable-state/dist/index.js";
import { useDirection as Q } from "../../react-direction/dist/index.js";
import { useSize as Z } from "../../react-use-size/dist/index.js";
import { Presence as $ } from "../../react-presence/dist/index.js";
import { jsx as u, jsxs as ee, Fragment as oe } from "react/jsx-runtime";
var re = Object.defineProperty, d = (s, n) => re(s, "name", { value: n, configurable: !0 }), N = "Radio", [te, O] = L(N), [ne, y] = te(N);
function K(s) {
  const {
    __scopeRadio: n,
    checked: a = !1,
    children: r,
    disabled: i,
    form: o,
    name: e,
    onCheck: p,
    required: R,
    value: v = "on",
    // @ts-expect-error
    internal_do_not_use_render: m
  } = s, [l, c] = t.useState(null), [I, _] = t.useState(null), b = t.useRef(!1), [G, C] = t.useReducer(
    (P) => P + 1,
    0
  ), g = l ? !!o || !!l.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), f = {
    checked: a,
    disabled: i,
    required: R,
    name: e,
    form: o,
    value: v,
    control: l,
    setControl: c,
    hasConsumerStoppedPropagationRef: b,
    userInteractionCount: G,
    onUserInteraction: C,
    isFormControl: g,
    bubbleInput: I,
    setBubbleInput: _,
    onCheck: /* @__PURE__ */ d(() => p == null ? void 0 : p(), "onCheck")
  };
  return /* @__PURE__ */ u(ne, { scope: n, ...f, children: V(m) ? m(f) : r });
}
d(K, "RadioProvider");
var ae = "RadioTrigger", ie = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ d(function({ __scopeRadio: n, onClick: a, ...r }, i) {
    const {
      checked: o,
      disabled: e,
      value: p,
      setControl: R,
      onCheck: v,
      hasConsumerStoppedPropagationRef: m,
      onUserInteraction: l,
      isFormControl: c,
      bubbleInput: I
    } = y(ae, n), _ = S(i, R);
    return /* @__PURE__ */ u(
      w.button,
      {
        type: "button",
        role: "radio",
        "aria-checked": o,
        "data-state": D(o),
        "data-disabled": e ? "" : void 0,
        disabled: e,
        value: p,
        ...r,
        ref: _,
        onClick: k(a, (b) => {
          o || (l(), v()), I && c && (m.current = b.isPropagationStopped(), m.current || b.stopPropagation());
        })
      }
    );
  }, "RadioTrigger")
), se = "RadioIndicator", ce = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ d(function(n, a) {
    const { __scopeRadio: r, forceMount: i, ...o } = n, e = y(se, r);
    return /* @__PURE__ */ u($, { present: i || e.checked, children: /* @__PURE__ */ u(
      w.span,
      {
        "data-state": D(e.checked),
        "data-disabled": e.disabled ? "" : void 0,
        ...o,
        ref: a
      }
    ) });
  }, "RadioIndicator")
), ue = "RadioBubbleInput", de = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ d(function({ __scopeRadio: n, onClick: a, ...r }, i) {
    const {
      control: o,
      checked: e,
      required: p,
      disabled: R,
      name: v,
      value: m,
      form: l,
      bubbleInput: c,
      setBubbleInput: I,
      hasConsumerStoppedPropagationRef: _,
      userInteractionCount: b
    } = y(ue, n), G = S(i, I), C = Z(o), g = t.useRef(!1), f = t.useRef(e), P = t.useRef(b);
    t.useEffect(() => {
      const h = c;
      if (!h) return;
      const E = window.HTMLInputElement.prototype, x = Object.getOwnPropertyDescriptor(
        E,
        "checked"
      ).set, M = b !== P.current;
      P.current = b;
      const H = f.current !== e;
      f.current = e;
      const z = !(M && _.current);
      if (H && x) {
        g.current = !M;
        const W = new Event("click", { bubbles: z });
        x.call(h, e), h.dispatchEvent(W), g.current = !1;
      }
    }, [c, e, _, b]);
    const A = t.useRef(e);
    return /* @__PURE__ */ u(
      w.input,
      {
        type: "radio",
        "aria-hidden": !0,
        defaultChecked: A.current,
        required: p,
        disabled: R,
        name: v,
        value: m,
        form: l,
        ...r,
        tabIndex: -1,
        ref: G,
        onClick: k(a, (h) => {
          g.current && h.stopPropagation();
        }),
        style: {
          ...r.style,
          ...C,
          position: "absolute",
          pointerEvents: "none",
          opacity: 0,
          margin: 0,
          // We transform because the input is absolutely positioned but we have
          // rendered it **after** the button. This pulls it back to sit on top
          // of the button.
          transform: "translateX(-100%)"
        }
      }
    );
  }, "RadioBubbleInput")
);
function V(s) {
  return typeof s == "function";
}
d(V, "isFunction");
function D(s) {
  return s ? "checked" : "unchecked";
}
d(D, "getState");
var pe = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"], F = "RadioGroup", [le, ye] = L(F, [
  U,
  O
]), q = U(), T = O(), [fe, Re] = le(F), Te = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ d(function(n, a) {
    const {
      __scopeRadioGroup: r,
      name: i,
      form: o,
      defaultValue: e,
      value: p,
      required: R = !1,
      disabled: v = !1,
      orientation: m,
      dir: l,
      loop: c = !0,
      onValueChange: I,
      ..._
    } = n, b = q(r), G = Q(l), [C, g] = J({
      prop: p,
      defaultProp: e ?? null,
      onChange: I,
      caller: F
    }), [f, P] = t.useState(null), A = S(a, P), h = t.useRef(C);
    return t.useEffect(() => {
      const E = o ? f == null ? void 0 : f.ownerDocument.getElementById(o) : f == null ? void 0 : f.closest("form");
      if (E instanceof HTMLFormElement) {
        const B = /* @__PURE__ */ d(() => g(h.current), "reset");
        return E.addEventListener("reset", B), () => E.removeEventListener("reset", B);
      }
    }, [f, o, g]), /* @__PURE__ */ u(
      fe,
      {
        scope: r,
        name: i,
        form: o,
        required: R,
        disabled: v,
        value: C,
        onValueChange: g,
        children: /* @__PURE__ */ u(
          X,
          {
            asChild: !0,
            ...b,
            orientation: m,
            dir: G,
            loop: c,
            children: /* @__PURE__ */ u(
              w.div,
              {
                role: "radiogroup",
                "aria-required": R,
                "aria-orientation": m,
                "data-disabled": v ? "" : void 0,
                dir: G,
                ..._,
                ref: A
              }
            )
          }
        )
      }
    );
  }, "RadioGroup")
), me = "RadioGroupItemProvider", ve = "RadioGroupItemTrigger";
function j(s) {
  const {
    __scopeRadioGroup: n,
    value: a,
    disabled: r,
    children: i,
    // @ts-expect-error
    internal_do_not_use_render: o
  } = s, e = Re(me, n), p = T(n), R = e.disabled || r;
  return /* @__PURE__ */ u(
    K,
    {
      ...p,
      checked: e.value === a,
      disabled: R,
      required: e.required,
      name: e.name,
      form: e.form,
      value: a,
      onCheck: () => e.onValueChange(a),
      internal_do_not_use_render: o,
      children: i
    }
  );
}
d(j, "RadioGroupItemProvider");
var be = /* @__PURE__ */ t.forwardRef(/* @__PURE__ */ d(function(n, a) {
  const { __scopeRadioGroup: r, ...i } = n, o = q(r), e = T(r), { checked: p, disabled: R } = y(ve, e.__scopeRadio), v = t.useRef(null), m = S(a, v), l = t.useRef(!1);
  return t.useEffect(() => {
    const c = /* @__PURE__ */ d((_) => {
      pe.includes(_.key) && (l.current = !0);
    }, "handleKeyDown"), I = /* @__PURE__ */ d(() => l.current = !1, "handleKeyUp");
    return document.addEventListener("keydown", c), document.addEventListener("keyup", I), () => {
      document.removeEventListener("keydown", c), document.removeEventListener("keyup", I);
    };
  }, []), /* @__PURE__ */ u(
    Y,
    {
      asChild: !0,
      ...o,
      focusable: !R,
      active: p,
      children: /* @__PURE__ */ u(
        ie,
        {
          ...e,
          ...i,
          ref: m,
          onKeyDown: k(i.onKeyDown, (c) => {
            c.key === "Enter" && c.preventDefault();
          }),
          onFocus: k(i.onFocus, () => {
            var c;
            l.current && ((c = v.current) == null || c.click());
          })
        }
      )
    }
  );
}, "RadioGroupItemTrigger")), Ae = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ d(function(n, a) {
    const { __scopeRadioGroup: r, value: i, disabled: o, ...e } = n;
    return /* @__PURE__ */ u(
      j,
      {
        __scopeRadioGroup: r,
        value: i,
        disabled: o,
        internal_do_not_use_render: ({ isFormControl: p }) => /* @__PURE__ */ ee(oe, { children: [
          /* @__PURE__ */ u(
            be,
            {
              ...e,
              ref: a,
              __scopeRadioGroup: r
            }
          ),
          p && /* @__PURE__ */ u(
            Ie,
            {
              __scopeRadioGroup: r
            }
          )
        ] })
      }
    );
  }, "RadioGroupItem")
), Ie = /* @__PURE__ */ t.forwardRef(/* @__PURE__ */ d(function(n, a) {
  const { __scopeRadioGroup: r, ...i } = n, o = T(r);
  return /* @__PURE__ */ u(de, { ...o, ...i, ref: a });
}, "RadioGroupItemBubbleInput")), Be = /* @__PURE__ */ t.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(n, a) {
    const { __scopeRadioGroup: r, ...i } = n, o = T(r);
    return /* @__PURE__ */ u(ce, { ...o, ...i, ref: a });
  }, "RadioGroupIndicator")
);
export {
  Be as Indicator,
  Ae as Item,
  Te as RadioGroup,
  Be as RadioGroupIndicator,
  Ae as RadioGroupItem,
  Te as Root,
  ye as createRadioGroupScope,
  Ie as unstable_ItemBubbleInput,
  j as unstable_ItemProvider,
  be as unstable_ItemTrigger,
  Ie as unstable_RadioGroupItemBubbleInput,
  j as unstable_RadioGroupItemProvider,
  be as unstable_RadioGroupItemTrigger
};
