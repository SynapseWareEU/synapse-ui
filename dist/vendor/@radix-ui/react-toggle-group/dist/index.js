import * as g from "react";
import { createContextScope as V } from "../../react-context/dist/index.js";
import { Primitive as T } from "../../react-primitive/dist/index.js";
import { createRovingFocusGroupScope as P, Root as M, Item as y } from "../../react-roving-focus/dist/index.js";
import { Toggle as A } from "../../react-toggle/dist/index.js";
import { useControllableState as _ } from "../../react-use-controllable-state/dist/index.js";
import { useDirection as F } from "../../react-direction/dist/index.js";
import { jsx as l } from "react/jsx-runtime";
var w = Object.defineProperty, i = (c, e) => w(c, "name", { value: e, configurable: !0 }), f = "ToggleGroup", [C, z] = V(f, [
  P
]), h = P(), H = /* @__PURE__ */ g.forwardRef(/* @__PURE__ */ i(function(e, r) {
  const { type: u, ...t } = e;
  if (u === "single")
    return /* @__PURE__ */ l(D, { role: "radiogroup", ...t, ref: r });
  if (u === "multiple")
    return /* @__PURE__ */ l(E, { role: "toolbar", ...t, ref: r });
  throw new Error(`Missing prop \`type\` expected on \`${f}\``);
}, "ToggleGroup")), [b, x] = C(f), D = /* @__PURE__ */ g.forwardRef(/* @__PURE__ */ i(function(e, r) {
  const {
    value: u,
    defaultValue: t,
    onValueChange: n = /* @__PURE__ */ i(() => {
    }, "onValueChange"),
    ...p
  } = e, [a, o] = _({
    prop: u,
    defaultProp: t ?? "",
    onChange: n,
    caller: f
  });
  return /* @__PURE__ */ l(
    b,
    {
      scope: e.__scopeToggleGroup,
      type: "single",
      value: g.useMemo(() => a ? [a] : [], [a]),
      onItemActivate: o,
      onItemDeactivate: g.useCallback(() => o(""), [o]),
      children: /* @__PURE__ */ l(S, { ...p, ref: r })
    }
  );
}, "ToggleGroupImplSingle")), E = /* @__PURE__ */ g.forwardRef(/* @__PURE__ */ i(function(e, r) {
  const {
    value: u,
    defaultValue: t,
    onValueChange: n = /* @__PURE__ */ i(() => {
    }, "onValueChange"),
    ...p
  } = e, [a, o] = _({
    prop: u,
    defaultProp: t ?? [],
    onChange: n,
    caller: f
  }), s = g.useCallback(
    (m) => o((v = []) => [...v, m]),
    [o]
  ), G = g.useCallback(
    (m) => o((v = []) => v.filter((R) => R !== m)),
    [o]
  );
  return /* @__PURE__ */ l(
    b,
    {
      scope: e.__scopeToggleGroup,
      type: "multiple",
      value: a,
      onItemActivate: s,
      onItemDeactivate: G,
      children: /* @__PURE__ */ l(S, { ...p, ref: r })
    }
  );
}, "ToggleGroupImplMultiple")), [k, O] = C(f), S = /* @__PURE__ */ g.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, r) {
    const {
      __scopeToggleGroup: u,
      disabled: t = !1,
      rovingFocus: n = !0,
      orientation: p,
      dir: a,
      loop: o = !0,
      ...s
    } = e, G = h(u), m = F(a), v = { dir: m, ...s };
    return /* @__PURE__ */ l(k, { scope: u, rovingFocus: n, disabled: t, children: n ? /* @__PURE__ */ l(
      M,
      {
        asChild: !0,
        ...G,
        orientation: p,
        dir: m,
        loop: o,
        children: /* @__PURE__ */ l(T.div, { ...v, ref: r })
      }
    ) : /* @__PURE__ */ l(T.div, { ...v, ref: r }) });
  }, "ToggleGroupImpl")
), d = "ToggleGroupItem", J = /* @__PURE__ */ g.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, r) {
    const u = x(d, e.__scopeToggleGroup), t = O(d, e.__scopeToggleGroup), n = h(e.__scopeToggleGroup), p = u.value.includes(e.value), a = t.disabled || e.disabled, o = { ...e, pressed: p, disabled: a }, s = g.useRef(null);
    return t.rovingFocus ? /* @__PURE__ */ l(
      y,
      {
        asChild: !0,
        ...n,
        focusable: !a,
        active: p,
        ref: s,
        children: /* @__PURE__ */ l(I, { ...o, ref: r })
      }
    ) : /* @__PURE__ */ l(I, { ...o, ref: r });
  }, "ToggleGroupItem")
), I = /* @__PURE__ */ g.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ i(function(e, r) {
    const { __scopeToggleGroup: u, value: t, ...n } = e, p = x(d, u), a = { role: "radio", "aria-checked": e.pressed, "aria-pressed": void 0 }, o = p.type === "single" ? a : void 0;
    return /* @__PURE__ */ l(
      A,
      {
        ...o,
        ...n,
        ref: r,
        onPressedChange: (s) => {
          s ? p.onItemActivate(t) : p.onItemDeactivate(t);
        }
      }
    );
  }, "ToggleGroupItemImpl")
);
export {
  J as Item,
  H as Root,
  H as ToggleGroup,
  J as ToggleGroupItem,
  z as createToggleGroupScope
};
