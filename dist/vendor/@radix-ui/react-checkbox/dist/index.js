import * as r from "react";
import { useComposedRefs as q } from "../../react-compose-refs/dist/index.js";
import { createContextScope as H } from "../../react-context/dist/index.js";
import { composeEventHandlers as y } from "../../primitive/dist/index.js";
import { useControllableState as z } from "../../react-use-controllable-state/dist/index.js";
import { useSize as G } from "../../react-use-size/dist/index.js";
import { Presence as K } from "../../react-presence/dist/index.js";
import { Primitive as B } from "../../react-primitive/dist/index.js";
import { jsx as x, jsxs as X, Fragment as J } from "react/jsx-runtime";
var Q = Object.defineProperty, h = (n, c) => Q(n, "name", { value: c, configurable: !0 }), T = "Checkbox", [V, fe] = H(T), [W, w] = V(T);
function A(n) {
  const {
    __scopeCheckbox: c,
    checked: f,
    children: s,
    defaultChecked: a,
    disabled: l,
    form: e,
    name: i,
    onCheckedChange: t,
    required: u,
    value: v = "on",
    // @ts-expect-error
    internal_do_not_use_render: C
  } = n, [b, k] = z({
    prop: f,
    defaultProp: a ?? !1,
    onChange: t,
    caller: T
  }), [I, g] = r.useState(null), [_, R] = r.useState(null), P = r.useRef(!1), [o, d] = r.useReducer(
    (m) => m + 1,
    0
  ), E = I ? !!e || !!I.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), S = {
    checked: b,
    disabled: l,
    setChecked: k,
    control: I,
    setControl: g,
    name: i,
    form: e,
    value: v,
    hasConsumerStoppedPropagationRef: P,
    userInteractionCount: o,
    onUserInteraction: d,
    required: u,
    defaultChecked: p(a) ? !1 : a,
    isFormControl: E,
    bubbleInput: _,
    setBubbleInput: R
  };
  return /* @__PURE__ */ x(
    W,
    {
      scope: c,
      ...S,
      children: F(C) ? C(S) : s
    }
  );
}
h(A, "CheckboxProvider");
var Y = "CheckboxTrigger", Z = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ h(function({ __scopeCheckbox: c, onKeyDown: f, onClick: s, ...a }, l) {
    const {
      control: e,
      value: i,
      disabled: t,
      checked: u,
      required: v,
      setControl: C,
      setChecked: b,
      hasConsumerStoppedPropagationRef: k,
      onUserInteraction: I,
      isFormControl: g,
      bubbleInput: _
    } = w(Y, c), R = q(l, C), P = r.useRef(u);
    return r.useEffect(() => {
      const o = e == null ? void 0 : e.form;
      if (o) {
        const d = /* @__PURE__ */ h(() => b(P.current), "reset");
        return o.addEventListener("reset", d), () => o.removeEventListener("reset", d);
      }
    }, [e, b]), /* @__PURE__ */ x(
      B.button,
      {
        type: "button",
        role: "checkbox",
        "aria-checked": p(u) ? "mixed" : u,
        "aria-required": v,
        "data-state": M(u),
        "data-disabled": t ? "" : void 0,
        disabled: t,
        value: i,
        ...a,
        ref: R,
        onKeyDown: y(f, (o) => {
          o.key === "Enter" && o.preventDefault();
        }),
        onClick: y(s, (o) => {
          I(), b((d) => p(d) ? !0 : !d), _ && g && (k.current = o.isPropagationStopped(), k.current || o.stopPropagation());
        })
      }
    );
  }, "CheckboxTrigger")
), le = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ h(function(c, f) {
    const {
      __scopeCheckbox: s,
      name: a,
      checked: l,
      defaultChecked: e,
      required: i,
      disabled: t,
      value: u,
      onCheckedChange: v,
      form: C,
      ...b
    } = c;
    return /* @__PURE__ */ x(
      A,
      {
        __scopeCheckbox: s,
        checked: l,
        defaultChecked: e,
        disabled: t,
        required: i,
        onCheckedChange: v,
        name: a,
        form: C,
        value: u,
        internal_do_not_use_render: ({ isFormControl: k }) => /* @__PURE__ */ X(J, { children: [
          /* @__PURE__ */ x(
            Z,
            {
              ...b,
              ref: f,
              __scopeCheckbox: s
            }
          ),
          k && /* @__PURE__ */ x(
            te,
            {
              __scopeCheckbox: s
            }
          )
        ] })
      }
    );
  }, "Checkbox")
), $ = "CheckboxIndicator", be = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ h(function(c, f) {
    const { __scopeCheckbox: s, forceMount: a, ...l } = c, e = w($, s);
    return /* @__PURE__ */ x(
      K,
      {
        present: a || p(e.checked) || e.checked === !0,
        children: /* @__PURE__ */ x(
          B.span,
          {
            "data-state": M(e.checked),
            "data-disabled": e.disabled ? "" : void 0,
            ...l,
            ref: f,
            style: { pointerEvents: "none", ...c.style }
          }
        )
      }
    );
  }, "CheckboxIndicator")
), ee = "CheckboxBubbleInput", te = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ h(function({ __scopeCheckbox: c, onClick: f, ...s }, a) {
    const {
      control: l,
      hasConsumerStoppedPropagationRef: e,
      userInteractionCount: i,
      checked: t,
      defaultChecked: u,
      required: v,
      disabled: C,
      name: b,
      value: k,
      form: I,
      bubbleInput: g,
      setBubbleInput: _
    } = w(ee, c), R = q(a, _), P = G(l), o = r.useRef(!1), d = r.useRef(t), E = r.useRef(i);
    r.useEffect(() => {
      const m = g;
      if (!m) return;
      const O = window.HTMLInputElement.prototype, N = Object.getOwnPropertyDescriptor(
        O,
        "checked"
      ).set, U = i !== E.current;
      E.current = i;
      const j = d.current !== t;
      d.current = t;
      const D = !(U && e.current);
      if (j && N) {
        o.current = !U;
        const L = new Event("click", { bubbles: D });
        m.indeterminate = p(t), N.call(m, p(t) ? !1 : t), m.dispatchEvent(L), o.current = !1;
      }
    }, [g, t, e, i]);
    const S = r.useRef(p(t) ? !1 : t);
    return /* @__PURE__ */ x(
      B.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: u ?? S.current,
        required: v,
        disabled: C,
        name: b,
        value: k,
        form: I,
        ...s,
        tabIndex: -1,
        ref: R,
        onClick: y(f, (m) => {
          o.current && m.stopPropagation();
        }),
        style: {
          ...s.style,
          ...P,
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
  }, "CheckboxBubbleInput")
);
function F(n) {
  return typeof n == "function";
}
h(F, "isFunction");
function p(n) {
  return n === "indeterminate";
}
h(p, "isIndeterminate");
function M(n) {
  return p(n) ? "indeterminate" : n ? "checked" : "unchecked";
}
h(M, "getState");
export {
  le as Checkbox,
  be as CheckboxIndicator,
  be as Indicator,
  le as Root,
  fe as createCheckboxScope,
  te as unstable_BubbleInput,
  te as unstable_CheckboxBubbleInput,
  A as unstable_CheckboxProvider,
  Z as unstable_CheckboxTrigger,
  A as unstable_Provider,
  Z as unstable_Trigger
};
