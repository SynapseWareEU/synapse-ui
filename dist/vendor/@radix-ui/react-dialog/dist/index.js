import * as l from "react";
import { composeEventHandlers as D } from "../../primitive/dist/index.js";
import { useComposedRefs as P } from "../../react-compose-refs/dist/index.js";
import { createContextScope as w } from "../../react-context/dist/index.js";
import { useId as R } from "../../react-id/dist/index.js";
import { useControllableState as N } from "../../react-use-controllable-state/dist/index.js";
import { useDismissableLayerSurface as L, DismissableLayer as k } from "../../react-dismissable-layer/dist/index.js";
import { FocusScope as G } from "../../react-focus-scope/dist/index.js";
import { Portal as j } from "../../react-portal/dist/index.js";
import { Presence as O } from "../../react-presence/dist/index.js";
import { Primitive as C } from "../../react-primitive/dist/index.js";
import { useFocusGuards as H } from "../../react-focus-guards/dist/index.js";
import { useLayoutEffect as I } from "../../react-use-layout-effect/dist/index.js";
import K from "../../../react-remove-scroll/dist/es2015/Combination.js";
import { hideOthers as U } from "../../../aria-hidden/dist/es2015/index.js";
import { createSlot as V } from "../../react-slot/dist/index.js";
import { jsx as s, Fragment as Y } from "react/jsx-runtime";
var Z = Object.defineProperty, f = (c, o) => Z(c, "name", { value: o, configurable: !0 }), h = "Dialog", [y, ve] = w(h), [q, g] = y(h), Re = /* @__PURE__ */ f((c) => {
  const {
    __scopeDialog: o,
    children: i,
    open: n,
    defaultOpen: r,
    onOpenChange: t,
    modal: e = !0
  } = c, a = l.useRef(null), u = l.useRef(null), [p, d] = N({
    prop: n,
    defaultProp: r ?? !1,
    onChange: t,
    caller: h
  }), [x, b] = l.useState(0), [A, F] = l.useState(0);
  return /* @__PURE__ */ s(
    q,
    {
      scope: o,
      triggerRef: a,
      contentRef: u,
      contentId: R(),
      titleId: R(),
      descriptionId: R(),
      titlePresent: x > 0,
      descriptionPresent: A > 0,
      setTitleCount: b,
      setDescriptionCount: F,
      open: p,
      onOpenChange: d,
      onOpenToggle: l.useCallback(() => d((S) => !S), [d]),
      modal: e,
      children: i
    }
  );
}, "Dialog"), z = "DialogTrigger", _e = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ f(function(o, i) {
    const { __scopeDialog: n, ...r } = o, t = g(z, n), e = P(i, t.triggerRef);
    return /* @__PURE__ */ s(
      C.button,
      {
        type: "button",
        "aria-haspopup": "dialog",
        "aria-expanded": t.open,
        "aria-controls": t.open ? t.contentId : void 0,
        "data-state": v(t.open),
        ...r,
        ref: e,
        onClick: D(o.onClick, t.onOpenToggle)
      }
    );
  }, "DialogTrigger")
), E = "DialogPortal", [B, T] = y(E, {
  forceMount: void 0
}), Pe = /* @__PURE__ */ f((c) => {
  const { __scopeDialog: o, forceMount: i, children: n, container: r } = c, t = g(E, o);
  return /* @__PURE__ */ s(B, { scope: o, forceMount: i, children: l.Children.map(n, (e) => /* @__PURE__ */ s(O, { present: i || t.open, children: /* @__PURE__ */ s(j, { asChild: !0, container: r, children: e }) })) });
}, "DialogPortal"), _ = "DialogOverlay", Oe = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ f(function(o, i) {
    const n = T(_, o.__scopeDialog), { forceMount: r = n.forceMount, ...t } = o, e = g(_, o.__scopeDialog);
    return e.modal ? /* @__PURE__ */ s(O, { present: r || e.open, children: /* @__PURE__ */ s(Q, { ...t, ref: i }) }) : null;
  }, "DialogOverlay")
), J = V("DialogOverlay.RemoveScroll"), Q = /* @__PURE__ */ l.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, i) {
    const { __scopeDialog: n, ...r } = o, t = g(_, n), e = L(), a = P(i, e);
    return (
      // Make sure `Content` is scrollable even when it doesn't live inside `RemoveScroll`
      // ie. when `Overlay` and `Content` are siblings
      /* @__PURE__ */ s(K, { as: J, allowPinchZoom: !0, shards: [t.contentRef], children: /* @__PURE__ */ s(
        C.div,
        {
          "data-state": v(t.open),
          ...r,
          ref: a,
          style: { pointerEvents: "auto", ...r.style }
        }
      ) })
    );
  }, "DialogOverlayImpl")
), m = "DialogContent", he = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ f(function(o, i) {
    const n = T(m, o.__scopeDialog), { forceMount: r = n.forceMount, ...t } = o, e = g(m, o.__scopeDialog);
    return /* @__PURE__ */ s(O, { present: r || e.open, children: e.modal ? /* @__PURE__ */ s(W, { ...t, ref: i }) : /* @__PURE__ */ s(X, { ...t, ref: i }) });
  }, "DialogContent")
), W = /* @__PURE__ */ l.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, i) {
    const n = g(m, o.__scopeDialog), r = l.useRef(null), t = P(i, n.contentRef, r);
    return l.useEffect(() => {
      const e = r.current;
      if (e) return U(e);
    }, []), /* @__PURE__ */ s(
      M,
      {
        ...o,
        ref: t,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        onCloseAutoFocus: D(o.onCloseAutoFocus, (e) => {
          var a;
          e.preventDefault(), (a = n.triggerRef.current) == null || a.focus();
        }),
        onPointerDownOutside: D(o.onPointerDownOutside, (e) => {
          const a = e.detail.originalEvent, u = a.button === 0 && a.ctrlKey === !0;
          (a.button === 2 || u) && e.preventDefault();
        }),
        onFocusOutside: D(
          o.onFocusOutside,
          (e) => e.preventDefault()
        )
      }
    );
  }, "DialogContentModal")
), X = /* @__PURE__ */ l.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, i) {
    const n = g(m, o.__scopeDialog), r = l.useRef(!1), t = l.useRef(!1);
    return /* @__PURE__ */ s(
      M,
      {
        ...o,
        ref: i,
        trapFocus: !1,
        disableOutsidePointerEvents: !1,
        onCloseAutoFocus: (e) => {
          var a, u;
          (a = o.onCloseAutoFocus) == null || a.call(o, e), e.defaultPrevented || (r.current || (u = n.triggerRef.current) == null || u.focus(), e.preventDefault()), r.current = !1, t.current = !1;
        },
        onInteractOutside: (e) => {
          var p, d;
          (p = o.onInteractOutside) == null || p.call(o, e), e.defaultPrevented || (r.current = !0, e.detail.originalEvent.type === "pointerdown" && (t.current = !0));
          const a = e.target;
          ((d = n.triggerRef.current) == null ? void 0 : d.contains(a)) && e.preventDefault(), e.detail.originalEvent.type === "focusin" && t.current && e.preventDefault();
        }
      }
    );
  }, "DialogContentNonModal")
), M = /* @__PURE__ */ l.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, i) {
    const { __scopeDialog: n, trapFocus: r, onOpenAutoFocus: t, onCloseAutoFocus: e, ...a } = o, u = g(m, n);
    return H(), /* @__PURE__ */ s(Y, { children: /* @__PURE__ */ s(
      G,
      {
        asChild: !0,
        loop: !0,
        trapped: r,
        onMountAutoFocus: t,
        onUnmountAutoFocus: e,
        children: /* @__PURE__ */ s(
          k,
          {
            role: "dialog",
            id: u.contentId,
            "aria-describedby": u.descriptionPresent ? u.descriptionId : void 0,
            "aria-labelledby": u.titlePresent ? u.titleId : void 0,
            "data-state": v(u.open),
            ...a,
            ref: i,
            deferPointerDownOutside: !0,
            onDismiss: () => u.onOpenChange(!1)
          }
        )
      }
    ) });
  }, "DialogContentImpl")
), $ = "DialogTitle", Ie = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ f(function(o, i) {
    const { __scopeDialog: n, ...r } = o, t = g($, n), { setTitleCount: e } = t;
    return I(() => (e((a) => a + 1), () => e((a) => a - 1)), [e]), /* @__PURE__ */ s(C.h2, { id: t.titleId, ...r, ref: i });
  }, "DialogTitle")
), ee = "DialogDescription", ye = /* @__PURE__ */ l.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(o, i) {
    const { __scopeDialog: n, ...r } = o, t = g(ee, n), { setDescriptionCount: e } = t;
    return I(() => (e((a) => a + 1), () => e((a) => a - 1)), [e]), /* @__PURE__ */ s(C.p, { id: t.descriptionId, ...r, ref: i });
  }, "DialogDescription")
), oe = "DialogClose", Ee = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ f(function(o, i) {
    const { __scopeDialog: n, ...r } = o, t = g(oe, n);
    return /* @__PURE__ */ s(
      C.button,
      {
        type: "button",
        ...r,
        ref: i,
        onClick: D(o.onClick, () => t.onOpenChange(!1))
      }
    );
  }, "DialogClose")
);
function v(c) {
  return c ? "open" : "closed";
}
f(v, "getState");
export {
  Ee as Close,
  he as Content,
  ye as Description,
  Re as Dialog,
  Ee as DialogClose,
  he as DialogContent,
  ye as DialogDescription,
  Oe as DialogOverlay,
  Pe as DialogPortal,
  Ie as DialogTitle,
  _e as DialogTrigger,
  Oe as Overlay,
  Pe as Portal,
  Re as Root,
  Ie as Title,
  _e as Trigger,
  ve as createDialogScope
};
