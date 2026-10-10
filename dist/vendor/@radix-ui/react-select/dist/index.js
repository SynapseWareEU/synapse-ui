import * as o from "react";
import * as Oe from "react-dom";
import { clamp as be } from "../../number/dist/index.js";
import { composeEventHandlers as D } from "../../primitive/dist/index.js";
import { createCollection as Ue } from "../../react-collection/dist/index.js";
import { useComposedRefs as F } from "../../react-compose-refs/dist/index.js";
import { createContextScope as We } from "../../react-context/dist/index.js";
import { useDirection as Ke } from "../../react-direction/dist/index.js";
import { DismissableLayer as Ge } from "../../react-dismissable-layer/dist/index.js";
import { useFocusGuards as ze } from "../../react-focus-guards/dist/index.js";
import { FocusScope as Ye } from "../../react-focus-scope/dist/index.js";
import { useId as Ne } from "../../react-id/dist/index.js";
import { createPopperScope as Ae, Anchor as je, Content as qe, Root as Xe } from "../../react-popper/dist/index.js";
import { Portal as Ze } from "../../react-portal/dist/index.js";
import { Presence as $e } from "../../react-presence/dist/index.js";
import { Primitive as U } from "../../react-primitive/dist/index.js";
import { createSlot as Je } from "../../react-slot/dist/index.js";
import { useCallbackRef as Ce } from "../../react-use-callback-ref/dist/index.js";
import { useControllableState as Re } from "../../react-use-controllable-state/dist/index.js";
import { useLayoutEffect as X } from "../../react-use-layout-effect/dist/index.js";
import { usePrevious as Qe } from "../../react-use-previous/dist/index.js";
import { VISUALLY_HIDDEN_STYLES as et } from "../../react-visually-hidden/dist/index.js";
import { hideOthers as tt } from "../../../aria-hidden/dist/es2015/index.js";
import ot from "../../../react-remove-scroll/dist/es2015/Combination.js";
import { jsx as p, jsxs as fe, Fragment as Ie } from "react/jsx-runtime";
var nt = Object.defineProperty, g = (S, r) => nt(S, "name", { value: r, configurable: !0 }), rt = [" ", "Enter", "ArrowUp", "ArrowDown"], lt = [" ", "Enter"], ie = "Select", [me, he, ct] = Ue(ie), [ne, qt] = We(ie, [
  ct,
  Ae
]), xe = Ae(), [st, Z] = ne(ie), [it, at] = ne(ie);
function Be(S) {
  const {
    __scopeSelect: r,
    children: a,
    open: e,
    defaultOpen: d,
    onOpenChange: c,
    value: u,
    defaultValue: l,
    onValueChange: n,
    dir: t,
    name: v,
    autoComplete: w,
    disabled: x,
    required: y,
    form: P,
    // @ts-expect-error internal render prop used by `Select` to compose its default parts
    internal_do_not_use_render: _
  } = S, s = xe(r), [m, I] = o.useState(null), [f, i] = o.useState(null), [E, M] = o.useState(!1), $ = Ke(t), [A, L] = Re({
    prop: e,
    defaultProp: d ?? !1,
    onChange: c,
    caller: ie
  }), [J, z] = Re({
    prop: u,
    defaultProp: l,
    onChange: n,
    caller: ie
  }), W = o.useRef(null), K = o.useRef(J);
  o.useEffect(() => {
    const O = P ? m == null ? void 0 : m.ownerDocument.getElementById(P) : m == null ? void 0 : m.form;
    if (O instanceof HTMLFormElement) {
      const H = /* @__PURE__ */ g(() => z(K.current), "reset");
      return O.addEventListener("reset", H), () => O.removeEventListener("reset", H);
    }
  }, [P, m, z]);
  const Q = m ? !!P || !!m.closest("form") : !0, [G, V] = o.useState(/* @__PURE__ */ new Set()), Y = Ne(), j = Array.from(G).map((O) => O.props.value).join(";"), q = o.useCallback((O) => {
    V((H) => new Set(H).add(O));
  }, []), k = o.useCallback((O) => {
    V((H) => {
      const ce = new Set(H);
      return ce.delete(O), ce;
    });
  }, []), le = {
    required: y,
    trigger: m,
    onTriggerChange: I,
    valueNode: f,
    onValueNodeChange: i,
    valueNodeHasChildren: E,
    onValueNodeHasChildrenChange: M,
    contentId: Y,
    value: J,
    onValueChange: z,
    open: A,
    onOpenChange: L,
    dir: $,
    triggerPointerDownPosRef: W,
    disabled: x,
    name: v,
    autoComplete: w,
    form: P,
    nativeOptions: G,
    nativeSelectKey: j,
    isFormControl: Q
  };
  return /* @__PURE__ */ p(Xe, { ...s, children: /* @__PURE__ */ p(st, { scope: r, ...le, children: /* @__PURE__ */ p(me.Provider, { scope: r, children: /* @__PURE__ */ p(
    it,
    {
      scope: r,
      onNativeOptionAdd: q,
      onNativeOptionRemove: k,
      children: He(_) ? _(le) : a
    }
  ) }) }) });
}
g(Be, "SelectProvider");
var Xt = /* @__PURE__ */ g((S) => {
  const { __scopeSelect: r, children: a, ...e } = S;
  return /* @__PURE__ */ p(
    Be,
    {
      __scopeSelect: r,
      ...e,
      internal_do_not_use_render: ({ isFormControl: d }) => /* @__PURE__ */ fe(Ie, { children: [
        a,
        d ? /* @__PURE__ */ p(
          yt,
          {
            __scopeSelect: r
          }
        ) : null
      ] })
    }
  );
}, "Select"), dt = "SelectTrigger", Zt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e, disabled: d = !1, ...c } = r, u = xe(e), l = Z(dt, e), n = l.disabled || d, t = F(a, l.onTriggerChange), v = he(e), w = o.useRef("touch"), [x, y, P] = ye((s) => {
      const m = v().filter((i) => !i.disabled), I = m.find((i) => i.value === l.value), f = Pe(m, s, I);
      f !== void 0 && l.onValueChange(f.value);
    }), _ = /* @__PURE__ */ g((s) => {
      n || (l.onOpenChange(!0), P()), s && (l.triggerPointerDownPosRef.current = {
        x: Math.round(s.pageX),
        y: Math.round(s.pageY)
      });
    }, "handleOpen");
    return /* @__PURE__ */ p(je, { asChild: !0, ...u, children: /* @__PURE__ */ p(
      U.button,
      {
        type: "button",
        role: "combobox",
        "aria-controls": l.open ? l.contentId : void 0,
        "aria-expanded": l.open,
        "aria-required": l.required,
        "aria-autocomplete": "none",
        dir: l.dir,
        "data-state": l.open ? "open" : "closed",
        disabled: n,
        "data-disabled": n ? "" : void 0,
        "data-placeholder": de(l.value) ? "" : void 0,
        ...c,
        ref: t,
        onClick: D(c.onClick, (s) => {
          s.currentTarget.focus(), w.current !== "mouse" && _(s);
        }),
        onPointerDown: D(c.onPointerDown, (s) => {
          w.current = s.pointerType;
          const m = s.target;
          m.hasPointerCapture(s.pointerId) && m.releasePointerCapture(s.pointerId), s.button === 0 && s.ctrlKey === !1 && s.pointerType === "mouse" && (_(s), s.preventDefault());
        }),
        onKeyDown: D(c.onKeyDown, (s) => {
          const m = x.current !== "";
          !(s.ctrlKey || s.altKey || s.metaKey) && s.key.length === 1 && y(s.key), !(m && s.key === " ") && rt.includes(s.key) && (_(), s.preventDefault());
        })
      }
    ) });
  }, "SelectTrigger")
), ut = "SelectValue", $t = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e, className: d, style: c, children: u, placeholder: l = "", ...n } = r, t = Z(ut, e), { onValueNodeHasChildrenChange: v } = t, w = u !== void 0, x = F(a, t.onValueNodeChange);
    X(() => {
      v(w);
    }, [v, w]);
    const y = de(t.value);
    return /* @__PURE__ */ p(
      U.span,
      {
        ...n,
        asChild: y ? !1 : n.asChild,
        ref: x,
        style: { pointerEvents: "none" },
        children: /* @__PURE__ */ p(o.Fragment, { children: y ? l : u }, y ? "placeholder" : "value")
      }
    );
  }, "SelectValue")
), Jt = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e, children: d, ...c } = r;
    return /* @__PURE__ */ p(U.span, { "aria-hidden": !0, ...c, ref: a, children: d || "▼" });
  }, "SelectIcon")
), pt = "SelectPortal", [ft, mt] = ne(pt, {
  forceMount: void 0
}), Qt = /* @__PURE__ */ g((S) => {
  const { __scopeSelect: r, forceMount: a, ...e } = S;
  return /* @__PURE__ */ p(ft, { scope: S.__scopeSelect, forceMount: a, children: /* @__PURE__ */ p(Ze, { asChild: !0, ...e }) });
}, "SelectPortal"), oe = "SelectContent", eo = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const e = mt(oe, r.__scopeSelect), { forceMount: d = e.forceMount, ...c } = r, u = Z(oe, r.__scopeSelect), [l, n] = o.useState();
    return X(() => {
      n(new DocumentFragment());
    }, []), /* @__PURE__ */ p($e, { present: d || u.open, children: ({ present: t }) => t ? /* @__PURE__ */ p(vt, { ...c, ref: a }) : /* @__PURE__ */ p(ht, { ...c, fragment: l }) });
  }, "SelectContent")
), ht = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(r, a) {
  const { __scopeSelect: e, children: d, fragment: c } = r;
  return c ? Oe.createPortal(
    /* @__PURE__ */ p(Le, { scope: e, children: /* @__PURE__ */ p(me.Slot, { scope: e, children: /* @__PURE__ */ p("div", { ref: a, children: d }) }) }),
    c
  ) : null;
}, "SelectContentFragment")), B = 10, [Le, re] = ne(oe), St = Je("SelectContent.RemoveScroll"), vt = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e } = r, {
      position: d = "item-aligned",
      onCloseAutoFocus: c,
      onEscapeKeyDown: u,
      onPointerDownOutside: l,
      //
      // PopperContent props
      side: n,
      sideOffset: t,
      align: v,
      alignOffset: w,
      arrowPadding: x,
      collisionBoundary: y,
      collisionPadding: P,
      sticky: _,
      hideWhenDetached: s,
      avoidCollisions: m,
      //
      ...I
    } = r, f = Z(oe, e), [i, E] = o.useState(null), [M, $] = o.useState(null), A = F(a, E), [L, J] = o.useState(null), [z, W] = o.useState(
      null
    ), K = he(e), [Q, G] = o.useState(!1), V = o.useRef(!1);
    o.useEffect(() => {
      if (i) return tt(i);
    }, [i]), ze();
    const Y = o.useCallback(
      (h) => {
        const [R, ...N] = K().map((T) => T.ref.current), [b] = N.slice(-1), C = document.activeElement;
        for (const T of h)
          if (T === C || (T == null || T.scrollIntoView({ block: "nearest" }), T === R && M && (M.scrollTop = 0), T === b && M && (M.scrollTop = M.scrollHeight), T == null || T.focus(), document.activeElement !== C)) return;
      },
      [K, M]
    ), j = o.useCallback(
      () => Y([L, i]),
      [Y, L, i]
    );
    o.useEffect(() => {
      Q && j();
    }, [Q, j]);
    const { onOpenChange: q, triggerPointerDownPosRef: k } = f;
    o.useEffect(() => {
      if (i) {
        let h = { x: 0, y: 0 };
        const R = /* @__PURE__ */ g((b) => {
          var C, T;
          h = {
            x: Math.abs(Math.round(b.pageX) - (((C = k.current) == null ? void 0 : C.x) ?? 0)),
            y: Math.abs(Math.round(b.pageY) - (((T = k.current) == null ? void 0 : T.y) ?? 0))
          };
        }, "handlePointerMove"), N = /* @__PURE__ */ g((b) => {
          h.x <= 10 && h.y <= 10 ? b.preventDefault() : b.composedPath().includes(i) || q(!1), document.removeEventListener("pointermove", R), k.current = null;
        }, "handlePointerUp");
        return k.current !== null && (document.addEventListener("pointermove", R), document.addEventListener("pointerup", N, { capture: !0, once: !0 })), () => {
          document.removeEventListener("pointermove", R), document.removeEventListener("pointerup", N, { capture: !0 });
        };
      }
    }, [i, q, k]), o.useEffect(() => {
      const h = /* @__PURE__ */ g(() => q(!1), "close");
      return window.addEventListener("blur", h), window.addEventListener("resize", h), () => {
        window.removeEventListener("blur", h), window.removeEventListener("resize", h);
      };
    }, [q]);
    const [le, O] = ye((h) => {
      const R = K().filter((C) => !C.disabled), N = R.find((C) => C.ref.current === document.activeElement), b = Pe(R, h, N);
      b && setTimeout(() => {
        var C;
        return (C = b.ref.current) == null ? void 0 : C.focus();
      });
    }), H = o.useCallback(
      (h, R, N) => {
        const b = !V.current && !N;
        (f.value !== void 0 && f.value === R || b) && (J(h), b && (V.current = !0));
      },
      [f.value]
    ), ce = o.useCallback(() => i == null ? void 0 : i.focus(), [i]), se = o.useCallback(
      (h, R, N) => {
        const b = !V.current && !N;
        (f.value !== void 0 && f.value === R || b) && W(h);
      },
      [f.value]
    ), ue = d === "popper" ? _e : gt, ae = ue === _e ? {
      side: n,
      sideOffset: t,
      align: v,
      alignOffset: w,
      arrowPadding: x,
      collisionBoundary: y,
      collisionPadding: P,
      sticky: _,
      hideWhenDetached: s,
      avoidCollisions: m
    } : {};
    return /* @__PURE__ */ p(
      Le,
      {
        scope: e,
        content: i,
        viewport: M,
        onViewportChange: $,
        itemRefCallback: H,
        selectedItem: L,
        onItemLeave: ce,
        itemTextRefCallback: se,
        focusSelectedItem: j,
        selectedItemText: z,
        position: d,
        isPositioned: Q,
        searchRef: le,
        children: /* @__PURE__ */ p(ot, { as: St, allowPinchZoom: !0, children: /* @__PURE__ */ p(
          Ye,
          {
            asChild: !0,
            trapped: f.open,
            onMountAutoFocus: (h) => {
              h.preventDefault();
            },
            onUnmountAutoFocus: D(c, (h) => {
              var R;
              (R = f.trigger) == null || R.focus({ preventScroll: !0 }), h.preventDefault();
            }),
            children: /* @__PURE__ */ p(
              Ge,
              {
                asChild: !0,
                disableOutsidePointerEvents: !0,
                onEscapeKeyDown: u,
                onPointerDownOutside: l,
                onFocusOutside: (h) => h.preventDefault(),
                onDismiss: () => f.onOpenChange(!1),
                children: /* @__PURE__ */ p(
                  ue,
                  {
                    role: "listbox",
                    id: f.contentId,
                    "data-state": f.open ? "open" : "closed",
                    dir: f.dir,
                    onContextMenu: (h) => h.preventDefault(),
                    ...I,
                    ...ae,
                    onPlaced: () => G(!0),
                    ref: A,
                    style: {
                      // flex layout so we can place the scroll buttons properly
                      display: "flex",
                      flexDirection: "column",
                      // reset the outline by default as the content MAY get focused
                      outline: "none",
                      ...I.style
                    },
                    onKeyDown: D(I.onKeyDown, (h) => {
                      const R = h.ctrlKey || h.altKey || h.metaKey;
                      if (h.key === "Tab" && h.preventDefault(), !R && h.key.length === 1 && O(h.key), ["ArrowUp", "ArrowDown", "Home", "End"].includes(h.key)) {
                        let b = K().filter((C) => !C.disabled).map((C) => C.ref.current);
                        if (["ArrowUp", "End"].includes(h.key) && (b = b.slice().reverse()), ["ArrowUp", "ArrowDown"].includes(h.key)) {
                          const C = h.target, T = b.indexOf(C);
                          b = b.slice(T + 1);
                        }
                        setTimeout(() => Y(b)), h.preventDefault();
                      }
                    })
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }, "SelectContentImpl")
), gt = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(r, a) {
  const { __scopeSelect: e, onPlaced: d, ...c } = r, u = Z(oe, e), l = re(oe, e), [n, t] = o.useState(null), [v, w] = o.useState(null), x = F(a, w), y = he(e), P = o.useRef(!1), _ = o.useRef(!0), { viewport: s, selectedItem: m, selectedItemText: I, focusSelectedItem: f } = l, i = o.useCallback(() => {
    if (u.trigger && u.valueNode && n && v && s && m && I) {
      const A = u.trigger.getBoundingClientRect(), L = v.getBoundingClientRect(), J = u.valueNode.getBoundingClientRect(), z = I.getBoundingClientRect();
      if (u.dir !== "rtl") {
        const C = z.left - L.left, T = J.left - C, ee = A.left - T, te = A.width + ee, Se = Math.max(te, L.width), ve = window.innerWidth - B, ge = be(T, [
          B,
          // Prevents the content from going off the starting edge of the
          // viewport. It may still go off the ending edge, but this can be
          // controlled by the user since they may want to manage overflow in a
          // specific way.
          // https://github.com/radix-ui/primitives/issues/2049
          Math.max(B, ve - Se)
        ]);
        n.style.minWidth = te + "px", n.style.left = ge + "px";
      } else {
        const C = L.right - z.right, T = window.innerWidth - J.right - C, ee = window.innerWidth - A.right - T, te = A.width + ee, Se = Math.max(te, L.width), ve = window.innerWidth - B, ge = be(T, [
          B,
          Math.max(B, ve - Se)
        ]);
        n.style.minWidth = te + "px", n.style.right = ge + "px";
      }
      const W = y(), K = window.innerHeight - B * 2, Q = s.scrollHeight, G = window.getComputedStyle(v), V = parseInt(G.borderTopWidth, 10), Y = parseInt(G.paddingTop, 10), j = parseInt(G.borderBottomWidth, 10), q = parseInt(G.paddingBottom, 10), k = V + Y + Q + q + j, le = Math.min(m.offsetHeight * 5, k), O = window.getComputedStyle(s), H = parseInt(O.paddingTop, 10), ce = parseInt(O.paddingBottom, 10), se = A.top + A.height / 2 - B, ue = K - se, ae = m.offsetHeight / 2, h = m.offsetTop + ae, R = V + Y + h, N = k - R;
      if (R <= se) {
        const C = W.length > 0 && m === W[W.length - 1].ref.current;
        n.style.bottom = "0px";
        const T = v.clientHeight - s.offsetTop - s.offsetHeight, ee = Math.max(
          ue,
          ae + // viewport might have padding bottom, include it to avoid a scrollable viewport
          (C ? ce : 0) + T + j
        ), te = R + ee;
        n.style.height = te + "px";
      } else {
        const C = W.length > 0 && m === W[0].ref.current;
        n.style.top = "0px";
        const ee = Math.max(
          se,
          V + s.offsetTop + // viewport might have padding top, include it to avoid a scrollable viewport
          (C ? H : 0) + ae
        ) + N;
        n.style.height = ee + "px", s.scrollTop = R - se + s.offsetTop;
      }
      n.style.margin = `${B}px 0`, n.style.minHeight = le + "px", n.style.maxHeight = K + "px", d == null || d(), requestAnimationFrame(() => P.current = !0);
    }
  }, [
    y,
    u.trigger,
    u.valueNode,
    n,
    v,
    s,
    m,
    I,
    u.dir,
    d
  ]);
  X(() => i(), [i]);
  const [E, M] = o.useState();
  X(() => {
    v && M(window.getComputedStyle(v).zIndex);
  }, [v]);
  const $ = o.useCallback(
    (A) => {
      A && _.current === !0 && (i(), f == null || f(), _.current = !1);
    },
    [i, f]
  );
  return /* @__PURE__ */ p(
    wt,
    {
      scope: e,
      contentWrapper: n,
      shouldExpandOnScrollRef: P,
      onScrollButtonChange: $,
      children: /* @__PURE__ */ p(
        "div",
        {
          ref: t,
          style: {
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            zIndex: E
          },
          children: /* @__PURE__ */ p(
            U.div,
            {
              ...c,
              ref: x,
              style: {
                // When we get the height of the content, it includes borders. If we were to set
                // the height without having `boxSizing: 'border-box'` it would be too big.
                boxSizing: "border-box",
                // We need to ensure the content doesn't get taller than the wrapper
                maxHeight: "100%",
                ...c.style
              }
            }
          )
        }
      )
    }
  );
}, "SelectItemAlignedPosition")), _e = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(r, a) {
  const {
    __scopeSelect: e,
    align: d = "start",
    collisionPadding: c = B,
    ...u
  } = r, l = xe(e);
  return /* @__PURE__ */ p(
    qe,
    {
      ...l,
      ...u,
      ref: a,
      align: d,
      collisionPadding: c,
      style: {
        // Ensure border-box for floating-ui calculations
        boxSizing: "border-box",
        ...u.style,
        "--radix-select-content-transform-origin": "var(--radix-popper-transform-origin)",
        "--radix-select-content-available-width": "var(--radix-popper-available-width)",
        "--radix-select-content-available-height": "var(--radix-popper-available-height)",
        "--radix-select-trigger-width": "var(--radix-popper-anchor-width)",
        "--radix-select-trigger-height": "var(--radix-popper-anchor-height)"
      }
    }
  );
}, "SelectPopperPosition")), [wt, Te] = ne(oe, {}), Ee = "SelectViewport", to = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e, nonce: d, ...c } = r, u = re(Ee, e), l = Te(Ee, e), n = F(a, u.onViewportChange), t = o.useRef(0);
    return /* @__PURE__ */ fe(Ie, { children: [
      /* @__PURE__ */ p(
        "style",
        {
          dangerouslySetInnerHTML: {
            __html: "[data-radix-select-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-select-viewport]::-webkit-scrollbar{display:none}"
          },
          nonce: d
        }
      ),
      /* @__PURE__ */ p(me.Slot, { scope: e, children: /* @__PURE__ */ p(
        U.div,
        {
          "data-radix-select-viewport": "",
          role: "presentation",
          ...c,
          ref: n,
          style: {
            // we use position: 'relative' here on the `viewport` so that when we call
            // `selectedItem.offsetTop` in calculations, the offset is relative to the viewport
            // (independent of the scrollUpButton).
            position: "relative",
            flex: 1,
            // Viewport should only be scrollable in the vertical direction.
            // This won't work in vertical writing modes, so we'll need to
            // revisit this if/when that is supported
            // https://developer.chrome.com/blog/vertical-form-controls
            overflow: "hidden auto",
            ...c.style
          },
          onScroll: D(c.onScroll, (v) => {
            const w = v.currentTarget, { contentWrapper: x, shouldExpandOnScrollRef: y } = l;
            if (y != null && y.current && x) {
              const P = Math.abs(t.current - w.scrollTop);
              if (P > 0) {
                const _ = window.innerHeight - B * 2, s = parseFloat(x.style.minHeight), m = parseFloat(x.style.height), I = Math.max(s, m);
                if (I < _) {
                  const f = I + P, i = Math.min(_, f), E = f - i;
                  x.style.height = i + "px", x.style.bottom === "0px" && (w.scrollTop = E > 0 ? E : 0, x.style.justifyContent = "flex-end");
                }
              }
            }
            t.current = w.scrollTop;
          })
        }
      ) })
    ] });
  }, "SelectViewport")
), Ct = "SelectGroup", [oo, no] = ne(Ct), we = "SelectItem", [It, Ve] = ne(we), ro = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const {
      __scopeSelect: e,
      value: d,
      disabled: c = !1,
      textValue: u,
      ...l
    } = r, n = Z(we, e), t = re(we, e), v = n.value === d, [w, x] = o.useState(u ?? ""), [y, P] = o.useState(!1), _ = Ce(
      (i) => {
        var E;
        return (E = t.itemRefCallback) == null ? void 0 : E.call(t, i, d, c);
      }
    ), s = F(a, _), m = Ne(), I = o.useRef("touch"), f = /* @__PURE__ */ g(() => {
      c || (n.onValueChange(d), n.onOpenChange(!1));
    }, "handleSelect");
    return /* @__PURE__ */ p(
      It,
      {
        scope: e,
        value: d,
        disabled: c,
        textId: m,
        isSelected: v,
        onItemTextChange: o.useCallback((i) => {
          x((E) => E || ((i == null ? void 0 : i.textContent) ?? "").trim());
        }, []),
        children: /* @__PURE__ */ p(
          me.ItemSlot,
          {
            scope: e,
            value: d,
            disabled: c,
            textValue: w,
            children: /* @__PURE__ */ p(
              U.div,
              {
                role: "option",
                "aria-labelledby": m,
                "data-highlighted": y ? "" : void 0,
                "aria-selected": v && y,
                "data-state": v ? "checked" : "unchecked",
                "aria-disabled": c || void 0,
                "data-disabled": c ? "" : void 0,
                tabIndex: c ? void 0 : -1,
                ...l,
                ref: s,
                onFocus: D(l.onFocus, () => P(!0)),
                onBlur: D(l.onBlur, () => P(!1)),
                onClick: D(l.onClick, () => {
                  I.current !== "mouse" && f();
                }),
                onPointerUp: D(l.onPointerUp, () => {
                  I.current === "mouse" && f();
                }),
                onPointerDown: D(l.onPointerDown, (i) => {
                  I.current = i.pointerType;
                }),
                onPointerMove: D(l.onPointerMove, (i) => {
                  var E;
                  I.current = i.pointerType, c ? (E = t.onItemLeave) == null || E.call(t) : I.current === "mouse" && i.currentTarget.focus({ preventScroll: !0 });
                }),
                onPointerLeave: D(l.onPointerLeave, (i) => {
                  var E;
                  i.currentTarget === document.activeElement && ((E = t.onItemLeave) == null || E.call(t));
                }),
                onKeyDown: D(l.onKeyDown, (i) => {
                  var M;
                  c || i.target !== i.currentTarget || ((M = t.searchRef) == null ? void 0 : M.current) !== "" && i.key === " " || (lt.includes(i.key) && f(), i.key === " " && i.preventDefault());
                })
              }
            )
          }
        )
      }
    );
  }, "SelectItem")
), pe = "SelectItemText", lo = /* @__PURE__ */ o.forwardRef(
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e, className: d, style: c, ...u } = r, l = Z(pe, e), n = re(pe, e), t = Ve(pe, e), v = at(pe, e), [w, x] = o.useState(null), y = Ce(
      (f) => {
        var i;
        return (i = n.itemTextRefCallback) == null ? void 0 : i.call(n, f, t.value, t.disabled);
      }
    ), P = F(
      a,
      x,
      t.onItemTextChange,
      y
    ), _ = w == null ? void 0 : w.textContent, s = o.useMemo(
      () => /* @__PURE__ */ p("option", { value: t.value, disabled: t.disabled, children: _ }, t.value),
      [t.disabled, t.value, _]
    ), { onNativeOptionAdd: m, onNativeOptionRemove: I } = v;
    return X(() => (m(s), () => I(s)), [m, I, s]), /* @__PURE__ */ fe(Ie, { children: [
      /* @__PURE__ */ p(U.span, { id: t.textId, ...u, ref: P }),
      t.isSelected && l.valueNode && !l.valueNodeHasChildren && !de(l.value) ? Oe.createPortal(u.children, l.valueNode) : null
    ] });
  }, "SelectItemText")
), xt = "SelectItemIndicator", co = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function(r, a) {
    const { __scopeSelect: e, ...d } = r;
    return Ve(xt, e).isSelected ? /* @__PURE__ */ p(U.span, { "aria-hidden": !0, ...d, ref: a }) : null;
  }, "SelectItemIndicator")
), Me = "SelectScrollUpButton", so = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(r, a) {
  const e = re(Me, r.__scopeSelect), d = Te(Me, r.__scopeSelect), [c, u] = o.useState(!1), l = F(a, d.onScrollButtonChange);
  return X(() => {
    if (e.viewport && e.isPositioned) {
      let n = function() {
        const v = t.scrollTop > 0;
        u(v);
      };
      g(n, "handleScroll");
      const t = e.viewport;
      return n(), t.addEventListener("scroll", n), () => t.removeEventListener("scroll", n);
    }
  }, [e.viewport, e.isPositioned]), c ? /* @__PURE__ */ p(
    ke,
    {
      ...r,
      ref: l,
      onAutoScroll: () => {
        const { viewport: n, selectedItem: t } = e;
        n && t && (n.scrollTop = n.scrollTop - t.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollUpButton")), De = "SelectScrollDownButton", io = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(r, a) {
  const e = re(De, r.__scopeSelect), d = Te(De, r.__scopeSelect), [c, u] = o.useState(!1), l = F(a, d.onScrollButtonChange);
  return X(() => {
    if (e.viewport && e.isPositioned) {
      let n = function() {
        const v = t.scrollHeight - t.clientHeight, w = Math.ceil(t.scrollTop) < v;
        u(w);
      };
      g(n, "handleScroll");
      const t = e.viewport;
      return n(), t.addEventListener("scroll", n), () => t.removeEventListener("scroll", n);
    }
  }, [e.viewport, e.isPositioned]), c ? /* @__PURE__ */ p(
    ke,
    {
      ...r,
      ref: l,
      onAutoScroll: () => {
        const { viewport: n, selectedItem: t } = e;
        n && t && (n.scrollTop = n.scrollTop + t.offsetHeight);
      }
    }
  ) : null;
}, "SelectScrollDownButton")), ke = /* @__PURE__ */ o.forwardRef(/* @__PURE__ */ g(function(r, a) {
  const { __scopeSelect: e, onAutoScroll: d, ...c } = r, u = re("SelectScrollButton", e), l = o.useRef(null), n = he(e), t = o.useCallback(() => {
    l.current !== null && (window.clearInterval(l.current), l.current = null);
  }, []);
  return o.useEffect(() => () => t(), [t]), X(() => {
    var w;
    const v = n().find((x) => x.ref.current === document.activeElement);
    (w = v == null ? void 0 : v.ref.current) == null || w.scrollIntoView({ block: "nearest" });
  }, [n]), /* @__PURE__ */ p(
    U.div,
    {
      "aria-hidden": !0,
      ...c,
      ref: a,
      style: { flexShrink: 0, ...c.style },
      onPointerDown: D(c.onPointerDown, () => {
        l.current === null && (l.current = window.setInterval(d, 50));
      }),
      onPointerMove: D(c.onPointerMove, () => {
        var v;
        (v = u.onItemLeave) == null || v.call(u), l.current === null && (l.current = window.setInterval(d, 50));
      }),
      onPointerLeave: D(c.onPointerLeave, () => {
        t();
      })
    }
  );
}, "SelectScrollButtonImpl")), Tt = "SelectBubbleInput", yt = /* @__PURE__ */ o.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ g(function({ __scopeSelect: r, ...a }, e) {
    const d = Z(Tt, r), { value: c, onValueChange: u, required: l, disabled: n, name: t, autoComplete: v, form: w } = d, { nativeOptions: x, nativeSelectKey: y } = d, P = o.useRef(null), _ = F(e, P), s = c ?? "", m = Qe(s), I = Array.from(x).some(
      (f) => (f.props.value ?? "") === ""
    );
    return o.useEffect(() => {
      const f = P.current;
      if (!f) return;
      const i = window.HTMLSelectElement.prototype, M = Object.getOwnPropertyDescriptor(
        i,
        "value"
      ).set;
      if (m !== s && M) {
        const $ = new Event("change", { bubbles: !0 });
        M.call(f, s), f.dispatchEvent($);
      }
    }, [m, s]), /* @__PURE__ */ fe(
      U.select,
      {
        "aria-hidden": !0,
        required: l,
        tabIndex: -1,
        name: t,
        autoComplete: v,
        disabled: n,
        form: w,
        onChange: (f) => u(f.target.value),
        ...a,
        style: { ...et, ...a.style },
        ref: _,
        defaultValue: s,
        children: [
          de(c) && !I ? /* @__PURE__ */ p("option", { value: "" }) : null,
          Array.from(x)
        ]
      },
      y
    );
  }, "SelectBubbleInput")
);
function He(S) {
  return typeof S == "function";
}
g(He, "isFunction");
function de(S) {
  return S === "" || S === void 0;
}
g(de, "shouldShowPlaceholder");
function ye(S) {
  const r = Ce(S), a = o.useRef(""), e = o.useRef(0), d = o.useCallback(
    (u) => {
      const l = a.current + u;
      r(l), (/* @__PURE__ */ g((function n(t) {
        a.current = t, window.clearTimeout(e.current), t !== "" && (e.current = window.setTimeout(() => n(""), 1e3));
      }), "updateSearch"))(l);
    },
    [r]
  ), c = o.useCallback(() => {
    a.current = "", window.clearTimeout(e.current);
  }, []);
  return o.useEffect(() => () => window.clearTimeout(e.current), []), [a, d, c];
}
g(ye, "useTypeaheadSearch");
function Pe(S, r, a) {
  const d = r.length > 1 && Array.from(r).every((t) => t === r[0]) ? r[0] : r, c = a ? S.indexOf(a) : -1;
  let u = Fe(S, Math.max(c, 0));
  d.length === 1 && (u = u.filter((t) => t !== a));
  const n = u.find(
    (t) => t.textValue.toLowerCase().startsWith(d.toLowerCase())
  );
  return n !== a ? n : void 0;
}
g(Pe, "findNextItem");
function Fe(S, r) {
  return S.map((a, e) => S[(r + e) % S.length]);
}
g(Fe, "wrapArray");
export {
  eo as Content,
  Jt as Icon,
  ro as Item,
  co as ItemIndicator,
  lo as ItemText,
  Qt as Portal,
  Xt as Root,
  io as ScrollDownButton,
  so as ScrollUpButton,
  Xt as Select,
  eo as SelectContent,
  Jt as SelectIcon,
  ro as SelectItem,
  co as SelectItemIndicator,
  lo as SelectItemText,
  Qt as SelectPortal,
  io as SelectScrollDownButton,
  so as SelectScrollUpButton,
  Zt as SelectTrigger,
  $t as SelectValue,
  to as SelectViewport,
  Zt as Trigger,
  $t as Value,
  to as Viewport,
  qt as createSelectScope,
  yt as unstable_BubbleInput,
  Be as unstable_Provider,
  yt as unstable_SelectBubbleInput,
  Be as unstable_SelectProvider
};
