import * as p from "react";
import { composeEventHandlers as C } from "../../primitive/dist/index.js";
import { useComposedRefs as _ } from "../../react-compose-refs/dist/index.js";
import { createContextScope as D } from "../../react-context/dist/index.js";
import { DismissableLayer as M } from "../../react-dismissable-layer/dist/index.js";
import { useFocusGuards as I } from "../../react-focus-guards/dist/index.js";
import { FocusScope as T } from "../../react-focus-scope/dist/index.js";
import { useId as k } from "../../react-id/dist/index.js";
import { createPopperScope as A, Root as y, Anchor as N, Content as G } from "../../react-popper/dist/index.js";
import { Portal as L } from "../../react-portal/dist/index.js";
import { Presence as b } from "../../react-presence/dist/index.js";
import { Primitive as j } from "../../react-primitive/dist/index.js";
import { createSlot as H } from "../../react-slot/dist/index.js";
import { useControllableState as K } from "../../react-use-controllable-state/dist/index.js";
import { hideOthers as $ } from "../../../aria-hidden/dist/es2015/index.js";
import U from "../../../react-remove-scroll/dist/es2015/Combination.js";
import { jsx as i } from "react/jsx-runtime";
var V = Object.defineProperty, d = (u, e) => V(u, "name", { value: e, configurable: !0 }), R = "Popover", [F, Ce] = D(R, [
  A
]), O = A(), [Z, P] = F(R), q = /* @__PURE__ */ d((u) => {
  const {
    __scopePopover: e,
    children: s,
    open: n,
    defaultOpen: c,
    onOpenChange: t,
    modal: o = !1
  } = u, r = O(e), a = p.useRef(null), [f, l] = p.useState(!1), [h, v] = K({
    prop: n,
    defaultProp: c ?? !1,
    onChange: t,
    caller: R
  });
  return /* @__PURE__ */ i(y, { ...r, children: /* @__PURE__ */ i(
    Z,
    {
      scope: e,
      contentId: k(),
      triggerRef: a,
      open: h,
      onOpenChange: v,
      onOpenToggle: p.useCallback(() => v((g) => !g), [v]),
      hasCustomAnchor: f,
      onCustomAnchorAdd: p.useCallback(() => l(!0), []),
      onCustomAnchorRemove: p.useCallback(() => l(!1), []),
      modal: o,
      children: s
    }
  ) });
}, "Popover"), z = "PopoverTrigger", B = /* @__PURE__ */ p.forwardRef(
  /* @__PURE__ */ d(function(e, s) {
    const { __scopePopover: n, ...c } = e, t = P(z, n), o = O(n), r = _(s, t.triggerRef), a = /* @__PURE__ */ i(
      j.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": t.open,
        "aria-controls": t.open ? t.contentId : void 0,
        "data-state": x(t.open),
        ...c,
        ref: r,
        onClick: C(e.onClick, t.onOpenToggle)
      }
    );
    return t.hasCustomAnchor ? a : /* @__PURE__ */ i(N, { asChild: !0, ...o, children: a });
  }, "PopoverTrigger")
), E = "PopoverPortal", [J, Q] = F(E, {
  forceMount: void 0
}), W = /* @__PURE__ */ d((u) => {
  const { __scopePopover: e, forceMount: s, children: n, container: c } = u, t = P(E, e);
  return /* @__PURE__ */ i(J, { scope: e, forceMount: s, children: /* @__PURE__ */ i(b, { present: s || t.open, children: /* @__PURE__ */ i(L, { asChild: !0, container: c, children: n }) }) });
}, "PopoverPortal"), m = "PopoverContent", X = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const n = Q(m, e.__scopePopover), { forceMount: c = n.forceMount, ...t } = e, o = P(m, e.__scopePopover);
    return /* @__PURE__ */ i(b, { present: c || o.open, children: o.modal ? /* @__PURE__ */ i(ee, { ...t, ref: s }) : /* @__PURE__ */ i(oe, { ...t, ref: s }) });
  }, "PopoverContent")
), Y = H("PopoverContent.RemoveScroll"), ee = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const n = P(m, e.__scopePopover), c = p.useRef(null), t = _(s, c), o = p.useRef(!1);
    return p.useEffect(() => {
      const r = c.current;
      if (r) return $(r);
    }, []), /* @__PURE__ */ i(U, { as: Y, allowPinchZoom: !0, children: /* @__PURE__ */ i(
      w,
      {
        ...e,
        ref: t,
        trapFocus: n.open,
        disableOutsidePointerEvents: !0,
        onCloseAutoFocus: C(e.onCloseAutoFocus, (r) => {
          var a;
          r.preventDefault(), o.current || (a = n.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: C(
          e.onPointerDownOutside,
          (r) => {
            const a = r.detail.originalEvent, f = a.button === 0 && a.ctrlKey === !0, l = a.button === 2 || f;
            o.current = l;
          },
          { checkForDefaultPrevented: !1 }
        ),
        onFocusOutside: C(
          e.onFocusOutside,
          (r) => r.preventDefault(),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "PopoverContentModal")
), oe = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const n = P(m, e.__scopePopover), c = p.useRef(!1), t = p.useRef(!1);
    return /* @__PURE__ */ i(
      w,
      {
        ...e,
        ref: s,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (o) => {
          var r, a;
          (r = e.onCloseAutoFocus) == null || r.call(e, o), o.defaultPrevented || (c.current || (a = n.triggerRef.current) == null || a.focus(), o.preventDefault()), c.current = !1, t.current = !1;
        },
        onInteractOutside: (o) => {
          var f, l;
          (f = e.onInteractOutside) == null || f.call(e, o), o.defaultPrevented || (c.current = !0, o.detail.originalEvent.type === "pointerdown" && (t.current = !0));
          const r = o.target;
          ((l = n.triggerRef.current) == null ? void 0 : l.contains(r)) && o.preventDefault(), o.detail.originalEvent.type === "focusin" && t.current && o.preventDefault();
        }
      }
    );
  }, "PopoverContentNonModal")
), w = /* @__PURE__ */ p.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ d(function(e, s) {
    const {
      __scopePopover: n,
      trapFocus: c,
      onOpenAutoFocus: t,
      onCloseAutoFocus: o,
      disableOutsidePointerEvents: r,
      onEscapeKeyDown: a,
      onPointerDownOutside: f,
      onFocusOutside: l,
      onInteractOutside: h,
      ...v
    } = e, g = P(m, n), S = O(n);
    return I(), /* @__PURE__ */ i(
      T,
      {
        asChild: !0,
        loop: !0,
        trapped: c,
        onMountAutoFocus: t,
        onUnmountAutoFocus: o,
        children: /* @__PURE__ */ i(
          M,
          {
            asChild: !0,
            disableOutsidePointerEvents: r,
            onInteractOutside: h,
            onEscapeKeyDown: a,
            onPointerDownOutside: f,
            onFocusOutside: l,
            onDismiss: () => g.onOpenChange(!1),
            deferPointerDownOutside: !0,
            children: /* @__PURE__ */ i(
              G,
              {
                "data-state": x(g.open),
                role: "dialog",
                id: g.contentId,
                ...S,
                ...v,
                ref: s,
                style: {
                  ...v.style,
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
function x(u) {
  return u ? "open" : "closed";
}
d(x, "getState");
var he = q, Re = B, Oe = W, xe = X;
export {
  xe as Content,
  q as Popover,
  X as PopoverContent,
  W as PopoverPortal,
  B as PopoverTrigger,
  Oe as Portal,
  he as Root,
  Re as Trigger,
  Ce as createPopoverScope
};
