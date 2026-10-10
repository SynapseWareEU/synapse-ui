import * as t from "react";
import { composeEventHandlers as M } from "../../primitive/dist/index.js";
import { useComposedRefs as U } from "../../react-compose-refs/dist/index.js";
import { createContextScope as O } from "../../react-context/dist/index.js";
import { useControllableState as z } from "../../react-use-controllable-state/dist/index.js";
import { useSize as D } from "../../react-use-size/dist/index.js";
import { Primitive as E } from "../../react-primitive/dist/index.js";
import { jsx as v, jsxs as G, Fragment as W } from "react/jsx-runtime";
var X = Object.defineProperty, m = (c, s) => X(c, "name", { value: s, configurable: !0 }), T = "Switch", [J, ae] = O(T), [K, B] = J(T);
function q(c) {
  const {
    __scopeSwitch: s,
    checked: d,
    children: n,
    defaultChecked: a,
    disabled: e,
    form: i,
    name: u,
    onCheckedChange: r,
    required: f,
    value: S = "on",
    // @ts-expect-error
    internal_do_not_use_render: h
  } = c, [l, b] = z({
    prop: d,
    defaultProp: a ?? !1,
    onChange: r,
    caller: T
  }), [w, g] = t.useState(null), [k, _] = t.useState(null), R = t.useRef(!1), [o, p] = t.useReducer(
    (C) => C + 1,
    0
  ), I = w ? !!i || !!w.closest("form") : (
    // We set this to true by default so that events bubble to forms without JS (SSR)
    !0
  ), P = {
    checked: l,
    setChecked: b,
    disabled: e,
    control: w,
    setControl: g,
    name: u,
    form: i,
    value: S,
    hasConsumerStoppedPropagationRef: R,
    userInteractionCount: o,
    onUserInteraction: p,
    required: f,
    defaultChecked: a,
    isFormControl: I,
    bubbleInput: k,
    setBubbleInput: _
  };
  return /* @__PURE__ */ v(K, { scope: s, ...P, children: H(h) ? h(P) : n });
}
m(q, "SwitchProvider");
var Q = "SwitchTrigger", V = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ m(function({ __scopeSwitch: s, onClick: d, ...n }, a) {
    const {
      control: e,
      form: i,
      value: u,
      disabled: r,
      checked: f,
      required: S,
      setControl: h,
      setChecked: l,
      hasConsumerStoppedPropagationRef: b,
      onUserInteraction: w,
      isFormControl: g,
      bubbleInput: k
    } = B(Q, s), _ = U(a, h), R = t.useRef(f);
    return t.useEffect(() => {
      const o = i ? e == null ? void 0 : e.ownerDocument.getElementById(i) : e == null ? void 0 : e.form;
      if (o instanceof HTMLFormElement) {
        const p = /* @__PURE__ */ m(() => l(R.current), "reset");
        return o.addEventListener("reset", p), () => o.removeEventListener("reset", p);
      }
    }, [e, i, l]), /* @__PURE__ */ v(
      E.button,
      {
        type: "button",
        role: "switch",
        "aria-checked": f,
        "aria-required": S,
        "data-state": x(f),
        "data-disabled": r ? "" : void 0,
        disabled: r,
        value: u,
        ...n,
        ref: _,
        onClick: M(d, (o) => {
          w(), l((p) => !p), k && g && (b.current = o.isPropagationStopped(), b.current || o.stopPropagation());
        })
      }
    );
  }, "SwitchTrigger")
), ue = /* @__PURE__ */ t.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ m(function(s, d) {
    const {
      __scopeSwitch: n,
      name: a,
      checked: e,
      defaultChecked: i,
      required: u,
      disabled: r,
      value: f,
      onCheckedChange: S,
      form: h,
      ...l
    } = s;
    return /* @__PURE__ */ v(
      q,
      {
        __scopeSwitch: n,
        checked: e,
        defaultChecked: i,
        disabled: r,
        required: u,
        onCheckedChange: S,
        name: a,
        form: h,
        value: f,
        internal_do_not_use_render: ({ isFormControl: b }) => /* @__PURE__ */ G(W, { children: [
          /* @__PURE__ */ v(
            V,
            {
              ...l,
              ref: d,
              __scopeSwitch: n
            }
          ),
          b && /* @__PURE__ */ v(
            $,
            {
              __scopeSwitch: n
            }
          )
        ] })
      }
    );
  }, "Switch")
), Y = "SwitchThumb", de = /* @__PURE__ */ t.forwardRef(
  /* @__PURE__ */ m(function(s, d) {
    const { __scopeSwitch: n, ...a } = s, e = B(Y, n);
    return /* @__PURE__ */ v(
      E.span,
      {
        "data-state": x(e.checked),
        "data-disabled": e.disabled ? "" : void 0,
        ...a,
        ref: d
      }
    );
  }, "SwitchThumb")
), Z = "SwitchBubbleInput", $ = /* @__PURE__ */ t.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ m(function({ __scopeSwitch: s, onClick: d, ...n }, a) {
    const {
      control: e,
      hasConsumerStoppedPropagationRef: i,
      userInteractionCount: u,
      checked: r,
      defaultChecked: f,
      required: S,
      disabled: h,
      name: l,
      value: b,
      form: w,
      bubbleInput: g,
      setBubbleInput: k
    } = B(Z, s), _ = U(a, k), R = D(e), o = t.useRef(!1), p = t.useRef(r), I = t.useRef(u);
    t.useEffect(() => {
      const C = g;
      if (!C) return;
      const L = window.HTMLInputElement.prototype, y = Object.getOwnPropertyDescriptor(
        L,
        "checked"
      ).set, F = u !== I.current;
      I.current = u;
      const N = p.current !== r;
      p.current = r;
      const j = !(F && i.current);
      if (N && y) {
        o.current = !F;
        const A = new Event("click", { bubbles: j });
        y.call(C, r), C.dispatchEvent(A), o.current = !1;
      }
    }, [g, r, i, u]);
    const P = t.useRef(r);
    return /* @__PURE__ */ v(
      E.input,
      {
        type: "checkbox",
        "aria-hidden": !0,
        defaultChecked: f ?? P.current,
        required: S,
        disabled: h,
        name: l,
        value: b,
        form: w,
        ...n,
        tabIndex: -1,
        ref: _,
        onClick: M(d, (C) => {
          o.current && C.stopPropagation();
        }),
        style: {
          ...n.style,
          ...R,
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
  }, "SwitchBubbleInput")
);
function H(c) {
  return typeof c == "function";
}
m(H, "isFunction");
function x(c) {
  return c ? "checked" : "unchecked";
}
m(x, "getState");
export {
  ue as Root,
  ue as Switch,
  de as SwitchThumb,
  de as Thumb,
  ae as createSwitchScope,
  $ as unstable_BubbleInput,
  q as unstable_Provider,
  $ as unstable_SwitchBubbleInput,
  q as unstable_SwitchProvider,
  V as unstable_SwitchTrigger,
  V as unstable_Trigger
};
