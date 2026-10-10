import * as i from "react";
import { composeEventHandlers as g } from "../../primitive/dist/index.js";
import { useComposedRefs as S } from "../../react-compose-refs/dist/index.js";
import { createContextScope as C } from "../../react-context/dist/index.js";
import { useControllableState as v } from "../../react-use-controllable-state/dist/index.js";
import { Primitive as R } from "../../react-primitive/dist/index.js";
import { createMenuScope as b, Root as _, Anchor as x, Portal as P, Content as O, Group as T, Label as G, Item as y, CheckboxItem as k, RadioGroup as E, RadioItem as A, ItemIndicator as L, Separator as N, Sub as K, SubTrigger as j, SubContent as F } from "../../react-menu/dist/index.js";
import { useId as M } from "../../react-id/dist/index.js";
import { jsx as u } from "react/jsx-runtime";
var $ = Object.defineProperty, c = (a, o) => $(a, "name", { value: o, configurable: !0 }), D = "DropdownMenu", [H, go] = C(
  D,
  [b]
), s = b(), [U, h] = H(D), W = /* @__PURE__ */ c((a) => {
  const {
    __scopeDropdownMenu: o,
    children: t,
    dir: e,
    open: r,
    defaultOpen: n,
    onOpenChange: d,
    modal: w = !0
  } = a, f = s(o), p = i.useRef(null), [m, l] = v({
    prop: r,
    defaultProp: n ?? !1,
    onChange: d,
    caller: D
  });
  return /* @__PURE__ */ u(
    U,
    {
      scope: o,
      triggerId: M(),
      triggerRef: p,
      contentId: M(),
      open: m,
      onOpenChange: l,
      onOpenToggle: i.useCallback(() => l((I) => !I), [l]),
      modal: w,
      children: /* @__PURE__ */ u(_, { ...f, open: m, onOpenChange: l, dir: e, modal: w, children: t })
    }
  );
}, "DropdownMenu"), q = "DropdownMenuTrigger", z = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(o, t) {
    const { __scopeDropdownMenu: e, disabled: r = !1, ...n } = o, d = h(q, e), w = s(e), f = S(t, d.triggerRef);
    return /* @__PURE__ */ u(x, { asChild: !0, ...w, children: /* @__PURE__ */ u(
      R.button,
      {
        type: "button",
        id: d.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": d.open,
        "aria-controls": d.open ? d.contentId : void 0,
        "data-state": d.open ? "open" : "closed",
        "data-disabled": r ? "" : void 0,
        disabled: r,
        ...n,
        ref: f,
        onPointerDown: g(o.onPointerDown, (p) => {
          !r && p.button === 0 && p.ctrlKey === !1 && (d.onOpenToggle(), d.open || p.preventDefault());
        }),
        onKeyDown: g(o.onKeyDown, (p) => {
          r || (["Enter", " "].includes(p.key) && d.onOpenToggle(), p.key === "ArrowDown" && d.onOpenChange(!0), ["Enter", " ", "ArrowDown"].includes(p.key) && p.preventDefault());
        })
      }
    ) });
  }, "DropdownMenuTrigger")
), B = /* @__PURE__ */ c((a) => {
  const { __scopeDropdownMenu: o, ...t } = a, e = s(o);
  return /* @__PURE__ */ u(P, { ...e, ...t });
}, "DropdownMenuPortal"), J = "DropdownMenuContent", Q = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(o, t) {
    const { __scopeDropdownMenu: e, ...r } = o, n = h(J, e), d = s(e), w = i.useRef(!1);
    return /* @__PURE__ */ u(
      O,
      {
        id: n.contentId,
        "aria-labelledby": n.triggerId,
        ...d,
        ...r,
        ref: t,
        onCloseAutoFocus: g(o.onCloseAutoFocus, (f) => {
          var p;
          w.current || (p = n.triggerRef.current) == null || p.focus(), w.current = !1, f.preventDefault();
        }),
        onInteractOutside: g(o.onInteractOutside, (f) => {
          const p = f.detail.originalEvent, m = p.button === 0 && p.ctrlKey === !0, l = p.button === 2 || m;
          (!n.modal || l) && (w.current = !0);
        }),
        style: {
          ...o.style,
          "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
          "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
          "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
          "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
          "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
        }
      }
    );
  }, "DropdownMenuContent")
), V = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(o, t) {
    const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
    return /* @__PURE__ */ u(T, { ...n, ...r, ref: t });
  }, "DropdownMenuGroup")
), X = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(o, t) {
    const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
    return /* @__PURE__ */ u(G, { ...n, ...r, ref: t });
  }, "DropdownMenuLabel")
), Y = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ c(function(o, t) {
    const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
    return /* @__PURE__ */ u(y, { ...n, ...r, ref: t });
  }, "DropdownMenuItem")
), Z = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(k, { ...n, ...r, ref: t });
}, "DropdownMenuCheckboxItem")), oo = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(E, { ...n, ...r, ref: t });
}, "DropdownMenuRadioGroup")), eo = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(A, { ...n, ...r, ref: t });
}, "DropdownMenuRadioItem")), ro = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(L, { ...n, ...r, ref: t });
}, "DropdownMenuItemIndicator")), no = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(N, { ...n, ...r, ref: t });
}, "DropdownMenuSeparator")), to = /* @__PURE__ */ c((a) => {
  const { __scopeDropdownMenu: o, children: t, open: e, onOpenChange: r, defaultOpen: n } = a, d = s(o), [w, f] = v({
    prop: e,
    defaultProp: n ?? !1,
    onChange: r,
    caller: "DropdownMenuSub"
  });
  return /* @__PURE__ */ u(K, { ...d, open: w, onOpenChange: f, children: t });
}, "DropdownMenuSub"), ao = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(j, { ...n, ...r, ref: t });
}, "DropdownMenuSubTrigger")), po = /* @__PURE__ */ i.forwardRef(/* @__PURE__ */ c(function(o, t) {
  const { __scopeDropdownMenu: e, ...r } = o, n = s(e);
  return /* @__PURE__ */ u(
    F,
    {
      ...n,
      ...r,
      ref: t,
      style: {
        ...o.style,
        "--radix-dropdown-menu-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-dropdown-menu-content-available-width": "var(--radix-popper-available-width)",
        "--radix-dropdown-menu-content-available-height": "var(--radix-popper-available-height)",
        "--radix-dropdown-menu-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-dropdown-menu-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "DropdownMenuSubContent")), Do = W, Mo = z, vo = B, bo = Q, ho = V, Io = X, So = Y, Co = Z, Ro = oo, _o = eo, xo = ro, Po = no, Oo = to, To = ao, Go = po;
export {
  Co as CheckboxItem,
  bo as Content,
  W as DropdownMenu,
  Z as DropdownMenuCheckboxItem,
  Q as DropdownMenuContent,
  V as DropdownMenuGroup,
  Y as DropdownMenuItem,
  ro as DropdownMenuItemIndicator,
  X as DropdownMenuLabel,
  B as DropdownMenuPortal,
  oo as DropdownMenuRadioGroup,
  eo as DropdownMenuRadioItem,
  no as DropdownMenuSeparator,
  to as DropdownMenuSub,
  po as DropdownMenuSubContent,
  ao as DropdownMenuSubTrigger,
  z as DropdownMenuTrigger,
  ho as Group,
  So as Item,
  xo as ItemIndicator,
  Io as Label,
  vo as Portal,
  Ro as RadioGroup,
  _o as RadioItem,
  Do as Root,
  Po as Separator,
  Oo as Sub,
  Go as SubContent,
  To as SubTrigger,
  Mo as Trigger,
  go as createDropdownMenuScope
};
