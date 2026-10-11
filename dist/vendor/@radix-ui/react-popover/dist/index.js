import * as i from "react";
import { composeEventHandlers as h } from "../../primitive/dist/index.js";
import { useComposedRefs as _ } from "../../react-compose-refs/dist/index.js";
import { createContextScope as D } from "../../react-context/dist/index.js";
import { DismissableLayer as I } from "../../react-dismissable-layer/dist/index.js";
import { useFocusGuards as T } from "../../react-focus-guards/dist/index.js";
import { FocusScope as N } from "../../react-focus-scope/dist/index.js";
import { useId as k } from "../../react-id/dist/index.js";
import { createPopperScope as x, Root as y, Anchor as E, Content as G } from "../../react-popper/dist/index.js";
import { Portal as H } from "../../react-portal/dist/index.js";
import { Presence as b } from "../../react-presence/dist/index.js";
import { Primitive as L } from "../../react-primitive/dist/index.js";
import { createSlot as j } from "../../react-slot/dist/index.js";
import { useControllableState as K } from "../../react-use-controllable-state/dist/index.js";
import { hideOthers as $ } from "../../../aria-hidden/dist/es2015/index.js";
import U from "../../../react-remove-scroll/dist/es2015/Combination.js";
import { jsx as p } from "react/jsx-runtime";
var V = Object.defineProperty, f = (u, o) => V(u, "name", { value: o, configurable: !0 }), A = "Popover", [F, Ao] = D(A, [
  x
]), C = x(), [Z, v] = F(A), q = /* @__PURE__ */ f((u) => {
  const {
    __scopePopover: o,
    children: s,
    open: n,
    defaultOpen: c,
    onOpenChange: t,
    modal: e = !1
  } = u, r = C(o), a = i.useRef(null), [d, l] = i.useState(!1), [R, P] = K({
    prop: n,
    defaultProp: c ?? !1,
    onChange: t,
    caller: A
  });
  return /* @__PURE__ */ p(y, { ...r, children: /* @__PURE__ */ p(
    Z,
    {
      scope: o,
      contentId: k(),
      triggerRef: a,
      open: R,
      onOpenChange: P,
      onOpenToggle: i.useCallback(() => P((g) => !g), [P]),
      hasCustomAnchor: d,
      onCustomAnchorAdd: i.useCallback(() => l(!0), []),
      onCustomAnchorRemove: i.useCallback(() => l(!1), []),
      modal: e,
      children: s
    }
  ) });
}, "Popover"), z = "PopoverAnchor", B = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ f(function(o, s) {
    const { __scopePopover: n, ...c } = o, t = v(z, n), e = C(n), { onCustomAnchorAdd: r, onCustomAnchorRemove: a } = t;
    return i.useEffect(() => (r(), () => a()), [r, a]), /* @__PURE__ */ p(E, { ...e, ...c, ref: s });
  }, "PopoverAnchor")
), J = "PopoverTrigger", Q = /* @__PURE__ */ i.forwardRef(
  /* @__PURE__ */ f(function(o, s) {
    const { __scopePopover: n, ...c } = o, t = v(J, n), e = C(n), r = _(s, t.triggerRef), a = /* @__PURE__ */ p(
      L.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": t.open,
        "aria-controls": t.open ? t.contentId : void 0,
        "data-state": O(t.open),
        ...c,
        ref: r,
        onClick: h(o.onClick, t.onOpenToggle)
      }
    );
    return t.hasCustomAnchor ? a : /* @__PURE__ */ p(E, { asChild: !0, ...e, children: a });
  }, "PopoverTrigger")
), w = "PopoverPortal", [W, X] = F(w, {
  forceMount: void 0
}), Y = /* @__PURE__ */ f((u) => {
  const { __scopePopover: o, forceMount: s, children: n, container: c } = u, t = v(w, o);
  return /* @__PURE__ */ p(W, { scope: o, forceMount: s, children: /* @__PURE__ */ p(b, { present: s || t.open, children: /* @__PURE__ */ p(H, { asChild: !0, container: c, children: n }) }) });
}, "PopoverPortal"), m = "PopoverContent", oo = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, s) {
    const n = X(m, o.__scopePopover), { forceMount: c = n.forceMount, ...t } = o, e = v(m, o.__scopePopover);
    return /* @__PURE__ */ p(b, { present: c || e.open, children: e.modal ? /* @__PURE__ */ p(to, { ...t, ref: s }) : /* @__PURE__ */ p(ro, { ...t, ref: s }) });
  }, "PopoverContent")
), eo = j("PopoverContent.RemoveScroll"), to = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, s) {
    const n = v(m, o.__scopePopover), c = i.useRef(null), t = _(s, c), e = i.useRef(!1);
    return i.useEffect(() => {
      const r = c.current;
      if (r) return $(r);
    }, []), /* @__PURE__ */ p(U, { as: eo, allowPinchZoom: !0, children: /* @__PURE__ */ p(
      S,
      {
        ...o,
        ref: t,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: h(o.onCloseAutoFocus, (r) => {
          var a;
          r.preventDefault(), e.current || (a = n.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: h(
          o.onPointerDownOutside,
          (r) => {
            const a = r.detail.originalEvent, d = a.button === 0 && a.ctrlKey === !0, l = a.button === 2 || d;
            e.current = l;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: h(
          o.onFocusOutside,
          (r) => r.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "PopoverContentModal")
), ro = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, s) {
    const n = v(m, o.__scopePopover), c = i.useRef(!1), t = i.useRef(!1);
    return /* @__PURE__ */ p(
      S,
      {
        ...o,
        ref: s,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (e) => {
          var r, a;
          (r = o.onCloseAutoFocus) == null || r.call(o, e), e.defaultPrevented || (c.current || (a = n.triggerRef.current) == null || a.focus(), e.preventDefault()), c.current = !1, t.current = !1;
        },
        onInteractOutside: (e) => {
          var d, l;
          (d = o.onInteractOutside) == null || d.call(o, e), e.defaultPrevented || (c.current = !0, e.detail.originalEvent.type === "pointerdown" && (t.current = !0));
          const r = e.target;
          ((l = n.triggerRef.current) == null ? void 0 : l.contains(r)) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && t.current && e.preventDefault();
        }
      }
    );
  }, "PopoverContentNonModal")
), S = /* @__PURE__ */ i.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, s) {
    const {
      __scopePopover: n,
      trapFocus: c,
      onOpenAutoFocus: t,
      onCloseAutoFocus: e,
      disableOutsidePointerEvents: r,
      onEscapeKeyDown: a,
      onPointerDownOutside: d,
      onFocusOutside: l,
      onInteractOutside: R,
      ...P
    } = o, g = v(m, n), M = C(n);
    return T(), /* @__PURE__ */ p(
      N,
      {
        asChild: !0,
        loop: !0,
        trapped: c,
        onMountAutoFocus: t,
        onUnmountAutoFocus: e,
        children: /* @__PURE__ */ p(
          I,
          {
            asChild: !0,
            disableOutsidePointerEvents: r,
            onInteractOutside: R,
            onEscapeKeyDown: a,
            onPointerDownOutside: d,
            onFocusOutside: l,
            onDismiss: () => g.onOpenChange(!1),
            deferPointerDownOutside: !0,
            children: /* @__PURE__ */ p(
              G,
              {
                "data-state": O(g.open),
                role: "dialog",
                id: g.contentId,
                ...M,
                ...P,
                ref: s,
                style: {
                  ...P.style,
                  "--radix-popover-content-transform-origin": "var(--radix-popper-transform-origin)",
                  "--radix-popover-content-available-width": "var(--radix-popper-available-width)",
                  "--radix-popover-content-available-height": "var(--radix-popper-available-height)",
                  "--radix-popover-trigger-width": "var(--radix-popper-anchor-width)",
                  "--radix-popover-trigger-height": "var(--radix-popper-anchor-height)"
                }
              }
            )
          }
        )
      }
    );
  }, "PopoverContentImpl")
);
function O(u) {
  return u ? "open" : "closed";
}
f(O, "getState");
var Oo = q, _o = B, xo = Q, Eo = Y, bo = oo;
export {
  _o as Anchor,
  bo as Content,
  q as Popover,
  B as PopoverAnchor,
  oo as PopoverContent,
  Y as PopoverPortal,
  Q as PopoverTrigger,
  Eo as Portal,
  Oo as Root,
  xo as Trigger,
  Ao as createPopoverScope
};
