import * as r from "react";
import { composeEventHandlers as _ } from "../../primitive/dist/index.js";
import { createCollection as Ve } from "../../react-collection/dist/index.js";
import { useComposedRefs as k } from "../../react-compose-refs/dist/index.js";
import { createContextScope as Be } from "../../react-context/dist/index.js";
import { useDirection as Ye } from "../../react-direction/dist/index.js";
import { DismissableLayer as je } from "../../react-dismissable-layer/dist/index.js";
import { useFocusGuards as Xe } from "../../react-focus-guards/dist/index.js";
import { FocusScope as He } from "../../react-focus-scope/dist/index.js";
import { useId as me } from "../../react-id/dist/index.js";
import { createPopperScope as Me, Root as he, Anchor as We, Content as ze } from "../../react-popper/dist/index.js";
import { Portal as Ze } from "../../react-portal/dist/index.js";
import { Presence as H } from "../../react-presence/dist/index.js";
import { Primitive as N, dispatchDiscreteCustomEvent as $e } from "../../react-primitive/dist/index.js";
import { createRovingFocusGroupScope as Ce, Root as qe, Item as Je } from "../../react-roving-focus/dist/index.js";
import { createSlot as Qe } from "../../react-slot/dist/index.js";
import { useCallbackRef as oe } from "../../react-use-callback-ref/dist/index.js";
import { hideOthers as en } from "../../../aria-hidden/dist/es2015/index.js";
import nn from "../../../react-remove-scroll/dist/es2015/Combination.js";
import { jsx as i } from "react/jsx-runtime";
var tn = Object.defineProperty, f = (c, e) => tn(c, "name", { value: e, configurable: !0 }), ne = ["Enter", " "], on = ["ArrowDown", "PageUp", "Home"], ge = ["ArrowUp", "PageDown", "End"], rn = [...on, ...ge], cn = {
  ltr: [...ne, "ArrowRight"],
  rtl: [...ne, "ArrowLeft"]
}, un = {
  ltr: ["ArrowLeft"],
  rtl: ["ArrowRight"]
}, W = "Menu", [G, an, sn] = Ve(W), [T, et] = Be(W, [
  sn,
  Me,
  Ce
]), z = Me(), ve = Ce(), [_e, b] = T(W), [ln, U] = T(W), dn = /* @__PURE__ */ f((c) => {
  const { __scopeMenu: e, open: t = !1, children: n, dir: o, onOpenChange: s, modal: u = !0 } = c, m = z(e), [M, p] = r.useState(null), g = r.useRef(!1), h = oe(s), d = Ye(o);
  return r.useEffect(() => {
    const a = /* @__PURE__ */ f(() => {
      g.current = !0, document.addEventListener("pointerdown", C, { capture: !0, once: !0 }), document.addEventListener("pointermove", C, { capture: !0, once: !0 });
    }, "handleKeyDown"), C = /* @__PURE__ */ f(() => g.current = !1, "handlePointer");
    return document.addEventListener("keydown", a, { capture: !0 }), () => {
      document.removeEventListener("keydown", a, { capture: !0 }), document.removeEventListener("pointerdown", C, { capture: !0 }), document.removeEventListener("pointermove", C, { capture: !0 });
    };
  }, []), r.useEffect(() => {
    if (!t)
      return;
    const a = /* @__PURE__ */ f(() => h(!1), "handleBlur");
    return window.addEventListener("blur", a), () => window.removeEventListener("blur", a);
  }, [t, h]), /* @__PURE__ */ i(he, { ...m, children: /* @__PURE__ */ i(
    _e,
    {
      scope: e,
      open: t,
      onOpenChange: h,
      content: M,
      onContentChange: p,
      children: /* @__PURE__ */ i(
        ln,
        {
          scope: e,
          onClose: r.useCallback(() => h(!1), [h]),
          isUsingKeyboardRef: g,
          dir: d,
          modal: u,
          children: n
        }
      )
    }
  ) });
}, "Menu"), Ie = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...o } = e, s = z(n);
    return /* @__PURE__ */ i(We, { ...s, ...o, ref: t });
  }, "MenuAnchor")
), Re = "MenuPortal", [fn, Se] = T(Re, {
  forceMount: void 0
}), mn = /* @__PURE__ */ f((c) => {
  const { __scopeMenu: e, forceMount: t, children: n, container: o } = c, s = b(Re, e);
  return /* @__PURE__ */ i(fn, { scope: e, forceMount: t, children: /* @__PURE__ */ i(H, { present: t || s.open, children: /* @__PURE__ */ i(Ze, { asChild: !0, container: o, children: n }) }) });
}, "MenuPortal"), R = "MenuContent", [pn, re] = T(R), Mn = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const n = Se(R, e.__scopeMenu), { forceMount: o = n.forceMount, ...s } = e, u = b(R, e.__scopeMenu), m = U(R, e.__scopeMenu);
    return /* @__PURE__ */ i(G.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ i(H, { present: o || u.open, children: /* @__PURE__ */ i(G.Slot, { scope: e.__scopeMenu, children: m.modal ? /* @__PURE__ */ i(hn, { ...s, ref: t }) : /* @__PURE__ */ i(Cn, { ...s, ref: t }) }) }) });
  }, "MenuContent")
), hn = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const n = b(R, e.__scopeMenu), o = r.useRef(null), s = k(t, o);
    return r.useEffect(() => {
      const u = o.current;
      if (u) return en(u);
    }, []), /* @__PURE__ */ i(
      ce,
      {
        ...e,
        ref: s,
        trapFocus: n.open,
        disableOutsidePointerEvents: n.open,
        disableOutsideScroll: !0,
        onFocusOutside: _(
          e.onFocusOutside,
          (u) => u.preventDefault(),
          { checkForDefaultPrevented: !1 }
        ),
        onDismiss: () => n.onOpenChange(!1)
      }
    );
  }, "MenuRootContentModal")
), Cn = /* @__PURE__ */ r.forwardRef(/* @__PURE__ */ f(function(e, t) {
  const n = b(R, e.__scopeMenu);
  return /* @__PURE__ */ i(
    ce,
    {
      ...e,
      ref: t,
      trapFocus: !1,
      disableOutsidePointerEvents: !1,
      disableOutsideScroll: !1,
      onDismiss: () => n.onOpenChange(!1)
    }
  );
}, "MenuRootContentNonModal")), gn = Qe("MenuContent.ScrollLock"), ce = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const {
      __scopeMenu: n,
      loop: o = !1,
      trapFocus: s,
      onOpenAutoFocus: u,
      onCloseAutoFocus: m,
      disableOutsidePointerEvents: M,
      onEntryFocus: p,
      onEscapeKeyDown: g,
      onPointerDownOutside: h,
      onFocusOutside: d,
      onInteractOutside: a,
      onDismiss: C,
      disableOutsideScroll: v,
      ...E
    } = e, A = b(R, n), x = U(R, n), $ = z(n), V = ve(n), F = an(n), [Fe, ie] = r.useState(null), B = r.useRef(null), Le = k(t, B, A.onContentChange), Y = r.useRef(0), j = r.useRef(""), Ge = r.useRef(0), q = r.useRef(null), se = r.useRef("right"), J = r.useRef(0), Ke = v ? nn : r.Fragment, Ne = v ? { as: gn, allowPinchZoom: !0 } : void 0, Ue = /* @__PURE__ */ f((l) => {
      var D, de;
      const I = j.current + l, S = F().filter((P) => !P.disabled), w = document.activeElement, Q = (D = S.find((P) => P.ref.current === w)) == null ? void 0 : D.textValue, ee = S.map((P) => P.textValue), le = Oe(ee, I, Q), L = (de = S.find((P) => P.textValue === le)) == null ? void 0 : de.ref.current;
      (/* @__PURE__ */ f((function P(fe) {
        j.current = fe, window.clearTimeout(Y.current), fe !== "" && (Y.current = window.setTimeout(() => P(""), 1e3));
      }), "updateSearch"))(I), L && setTimeout(() => L.focus());
    }, "handleTypeaheadSearch");
    r.useEffect(() => () => window.clearTimeout(Y.current), []), Xe();
    const y = r.useCallback((l) => {
      var S, w;
      return se.current === ((S = q.current) == null ? void 0 : S.side) && Ae(l, (w = q.current) == null ? void 0 : w.area);
    }, []);
    return /* @__PURE__ */ i(
      pn,
      {
        scope: n,
        searchRef: j,
        onItemEnter: r.useCallback(
          (l) => {
            y(l) && l.preventDefault();
          },
          [y]
        ),
        onItemLeave: r.useCallback(
          (l) => {
            var I;
            y(l) || ((I = B.current) == null || I.focus(), ie(null));
          },
          [y]
        ),
        onTriggerLeave: r.useCallback(
          (l) => {
            y(l) && l.preventDefault();
          },
          [y]
        ),
        pointerGraceTimerRef: Ge,
        onPointerGraceIntentChange: r.useCallback((l) => {
          q.current = l;
        }, []),
        children: /* @__PURE__ */ i(Ke, { ...Ne, children: /* @__PURE__ */ i(
          He,
          {
            asChild: !0,
            trapped: s,
            onMountAutoFocus: _(u, (l) => {
              var I;
              l.preventDefault(), (I = B.current) == null || I.focus({ preventScroll: !0 });
            }),
            onUnmountAutoFocus: m,
            children: /* @__PURE__ */ i(
              je,
              {
                asChild: !0,
                disableOutsidePointerEvents: M,
                onEscapeKeyDown: g,
                onPointerDownOutside: h,
                onFocusOutside: d,
                onInteractOutside: a,
                onDismiss: C,
                children: /* @__PURE__ */ i(
                  qe,
                  {
                    asChild: !0,
                    ...V,
                    dir: x.dir,
                    orientation: "vertical",
                    loop: o,
                    currentTabStopId: Fe,
                    onCurrentTabStopIdChange: ie,
                    onEntryFocus: _(p, (l) => {
                      x.isUsingKeyboardRef.current || l.preventDefault();
                    }),
                    preventScrollOnEntryFocus: !0,
                    children: /* @__PURE__ */ i(
                      ze,
                      {
                        role: "menu",
                        "aria-orientation": "vertical",
                        "data-state": ae(A.open),
                        "data-radix-menu-content": "",
                        dir: x.dir,
                        ...$,
                        ...E,
                        ref: Le,
                        style: { outline: "none", ...E.style },
                        onKeyDown: _(E.onKeyDown, (l) => {
                          const S = l.target.closest("[data-radix-menu-content]") === l.currentTarget, w = l.ctrlKey || l.altKey || l.metaKey, Q = l.key.length === 1;
                          S && (l.key === "Tab" && l.preventDefault(), !w && Q && Ue(l.key));
                          const ee = B.current;
                          if (l.target !== ee || !rn.includes(l.key)) return;
                          l.preventDefault();
                          const L = F().filter((D) => !D.disabled).map((D) => D.ref.current);
                          ge.includes(l.key) && L.reverse(), ye(L);
                        }),
                        onBlur: _(e.onBlur, (l) => {
                          l.currentTarget.contains(l.target) || (window.clearTimeout(Y.current), j.current = "");
                        }),
                        onPointerMove: _(
                          e.onPointerMove,
                          O((l) => {
                            const I = l.target, S = J.current !== l.clientX;
                            if (l.currentTarget.contains(I) && S) {
                              const w = l.clientX > J.current ? "right" : "left";
                              se.current = w, J.current = l.clientX;
                            }
                          })
                        )
                      }
                    )
                  }
                )
              }
            )
          }
        ) })
      }
    );
  }, "MenuContentImpl")
), Pe = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ i(N.div, { role: "group", ...o, ref: t });
  }, "MenuGroup")
), vn = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ i(N.div, { ...o, ref: t });
  }, "MenuLabel")
), te = "MenuItem", pe = "menu.itemSelect", ue = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const { disabled: n = !1, onSelect: o, ...s } = e, u = r.useRef(null), m = U(te, e.__scopeMenu), M = re(te, e.__scopeMenu), p = k(t, u), g = r.useRef(!1), h = /* @__PURE__ */ f(() => {
      const d = u.current;
      if (!n && d) {
        const a = new CustomEvent(pe, { bubbles: !0, cancelable: !0 });
        d.addEventListener(pe, (C) => o == null ? void 0 : o(C), { once: !0 }), $e(d, a), a.defaultPrevented ? g.current = !1 : m.onClose();
      }
    }, "handleSelect");
    return /* @__PURE__ */ i(
      we,
      {
        ...s,
        ref: p,
        disabled: n,
        onClick: _(e.onClick, h),
        onPointerDown: (d) => {
          var a;
          (a = e.onPointerDown) == null || a.call(e, d), g.current = !0;
        },
        onPointerUp: _(e.onPointerUp, (d) => {
          var a;
          g.current || (a = d.currentTarget) == null || a.click();
        }),
        onKeyDown: _(e.onKeyDown, (d) => {
          n || d.target !== d.currentTarget || M.searchRef.current !== "" && d.key === " " || ne.includes(d.key) && (d.currentTarget.click(), d.preventDefault());
        })
      }
    );
  }, "MenuItem")
), we = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, disabled: o = !1, textValue: s, ...u } = e, m = re(te, n), M = ve(n), p = r.useRef(null), g = k(t, p), [h, d] = r.useState(!1), [a, C] = r.useState("");
    return r.useEffect(() => {
      const v = p.current;
      v && C((v.textContent ?? "").trim());
    }, [u.children]), /* @__PURE__ */ i(
      G.ItemSlot,
      {
        scope: n,
        disabled: o,
        textValue: s ?? a,
        children: /* @__PURE__ */ i(Je, { asChild: !0, ...M, focusable: !o, children: /* @__PURE__ */ i(
          N.div,
          {
            role: "menuitem",
            "data-highlighted": h ? "" : void 0,
            "aria-disabled": o || void 0,
            "data-disabled": o ? "" : void 0,
            ...u,
            ref: g,
            onPointerMove: _(
              e.onPointerMove,
              O((v) => {
                o ? m.onItemLeave(v) : (m.onItemEnter(v), v.defaultPrevented || v.currentTarget.focus({ preventScroll: !0 }));
              })
            ),
            onPointerLeave: _(
              e.onPointerLeave,
              O((v) => m.onItemLeave(v))
            ),
            onFocus: _(e.onFocus, () => d(!0)),
            onBlur: _(e.onBlur, () => d(!1))
          }
        ) })
      }
    );
  }, "MenuItemImpl")
), _n = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const { checked: n = !1, onCheckedChange: o, ...s } = e;
    return /* @__PURE__ */ i(Ee, { scope: e.__scopeMenu, checked: n, children: /* @__PURE__ */ i(
      ue,
      {
        role: "menuitemcheckbox",
        "aria-checked": K(n) ? "mixed" : n,
        ...s,
        ref: t,
        "data-state": Z(n),
        onSelect: _(
          s.onSelect,
          () => o == null ? void 0 : o(K(n) ? !0 : !n),
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "MenuCheckboxItem")
), In = "MenuRadioGroup", [Rn, Sn] = T(
  In,
  { value: void 0, onValueChange: /* @__PURE__ */ f(() => {
  }, "onValueChange") }
), Pn = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { value: n, onValueChange: o, ...s } = e, u = oe(o);
    return /* @__PURE__ */ i(Rn, { scope: e.__scopeMenu, value: n, onValueChange: u, children: /* @__PURE__ */ i(Pe, { ...s, ref: t }) });
  }, "MenuRadioGroup")
), wn = "MenuRadioItem", bn = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { value: n, ...o } = e, s = Sn(wn, e.__scopeMenu), u = n === s.value;
    return /* @__PURE__ */ i(Ee, { scope: e.__scopeMenu, checked: u, children: /* @__PURE__ */ i(
      ue,
      {
        role: "menuitemradio",
        "aria-checked": u,
        ...o,
        ref: t,
        "data-state": Z(u),
        onSelect: _(
          o.onSelect,
          () => {
            var m;
            return (m = s.onValueChange) == null ? void 0 : m.call(s, n);
          },
          { checkForDefaultPrevented: !1 }
        )
      }
    ) });
  }, "MenuRadioItem")
), be = "MenuItemIndicator", [Ee, En] = T(
  be,
  { checked: !1 }
), xn = /* @__PURE__ */ r.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, forceMount: o, ...s } = e, u = En(be, n);
    return /* @__PURE__ */ i(
      H,
      {
        present: o || K(u.checked) || u.checked === !0,
        children: /* @__PURE__ */ i(
          N.span,
          {
            ...s,
            ref: t,
            "data-state": Z(u.checked)
          }
        )
      }
    );
  }, "MenuItemIndicator")
), Tn = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const { __scopeMenu: n, ...o } = e;
    return /* @__PURE__ */ i(
      N.div,
      {
        role: "separator",
        "aria-orientation": "horizontal",
        ...o,
        ref: t
      }
    );
  }, "MenuSeparator")
), xe = "MenuSub", [yn, Te] = T(xe), Dn = /* @__PURE__ */ f((c) => {
  const { __scopeMenu: e, children: t, open: n = !1, onOpenChange: o } = c, s = b(xe, e), u = z(e), [m, M] = r.useState(null), [p, g] = r.useState(null), h = oe(o);
  return r.useEffect(() => (s.open === !1 && h(!1), () => h(!1)), [s.open, h]), /* @__PURE__ */ i(he, { ...u, children: /* @__PURE__ */ i(
    _e,
    {
      scope: e,
      open: n,
      onOpenChange: h,
      content: p,
      onContentChange: g,
      children: /* @__PURE__ */ i(
        yn,
        {
          scope: e,
          contentId: me(),
          triggerId: me(),
          trigger: m,
          onTriggerChange: M,
          children: t
        }
      )
    }
  ) });
}, "MenuSub"), X = "MenuSubTrigger", On = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const n = b(X, e.__scopeMenu), o = U(X, e.__scopeMenu), s = Te(X, e.__scopeMenu), u = re(X, e.__scopeMenu), m = r.useRef(null), { pointerGraceTimerRef: M, onPointerGraceIntentChange: p } = u, g = { __scopeMenu: e.__scopeMenu }, h = r.useCallback(() => {
      m.current && window.clearTimeout(m.current), m.current = null;
    }, []);
    r.useEffect(() => h, [h]), r.useEffect(() => {
      const a = M.current;
      return () => {
        window.clearTimeout(a), p(null);
      };
    }, [M, p]);
    const d = k(t, s.onTriggerChange);
    return /* @__PURE__ */ i(Ie, { asChild: !0, ...g, children: /* @__PURE__ */ i(
      we,
      {
        id: s.triggerId,
        "aria-haspopup": "menu",
        "aria-expanded": n.open,
        "aria-controls": n.open ? s.contentId : void 0,
        "data-state": ae(n.open),
        ...e,
        ref: d,
        onClick: (a) => {
          var C;
          (C = e.onClick) == null || C.call(e, a), !(e.disabled || a.defaultPrevented) && (a.currentTarget.focus(), n.open || n.onOpenChange(!0));
        },
        onPointerMove: _(
          e.onPointerMove,
          O((a) => {
            u.onItemEnter(a), !a.defaultPrevented && !e.disabled && !n.open && !m.current && (u.onPointerGraceIntentChange(null), m.current = window.setTimeout(() => {
              n.onOpenChange(!0), h();
            }, 100));
          })
        ),
        onPointerLeave: _(
          e.onPointerLeave,
          O((a) => {
            var v, E;
            h();
            const C = (v = n.content) == null ? void 0 : v.getBoundingClientRect();
            if (C) {
              const A = (E = n.content) == null ? void 0 : E.dataset.side, x = A === "right", $ = x ? -5 : 5, V = C[x ? "left" : "right"], F = C[x ? "right" : "left"];
              u.onPointerGraceIntentChange({
                area: [
                  // Apply a bleed on clientX to ensure that our exit point is
                  // consistently within polygon bounds
                  { x: a.clientX + $, y: a.clientY },
                  { x: V, y: C.top },
                  { x: F, y: C.top },
                  { x: F, y: C.bottom },
                  { x: V, y: C.bottom }
                ],
                side: A
              }), window.clearTimeout(M.current), M.current = window.setTimeout(
                () => u.onPointerGraceIntentChange(null),
                300
              );
            } else {
              if (u.onTriggerLeave(a), a.defaultPrevented) return;
              u.onPointerGraceIntentChange(null);
            }
          })
        ),
        onKeyDown: _(e.onKeyDown, (a) => {
          var v;
          e.disabled || a.target !== a.currentTarget || u.searchRef.current !== "" && a.key === " " || cn[o.dir].includes(a.key) && (n.onOpenChange(!0), (v = n.content) == null || v.focus(), a.preventDefault());
        })
      }
    ) });
  }, "MenuSubTrigger")
), kn = "MenuSubContent", An = /* @__PURE__ */ r.forwardRef(
  /* @__PURE__ */ f(function(e, t) {
    const n = Se(R, e.__scopeMenu), { forceMount: o = n.forceMount, align: s = "start", ...u } = e, m = b(R, e.__scopeMenu), M = U(R, e.__scopeMenu), p = Te(kn, e.__scopeMenu), g = r.useRef(null), h = k(t, g);
    return /* @__PURE__ */ i(G.Provider, { scope: e.__scopeMenu, children: /* @__PURE__ */ i(H, { present: o || m.open, children: /* @__PURE__ */ i(G.Slot, { scope: e.__scopeMenu, children: /* @__PURE__ */ i(
      ce,
      {
        id: p.contentId,
        "aria-labelledby": p.triggerId,
        ...u,
        ref: h,
        align: s,
        side: M.dir === "rtl" ? "left" : "right",
        disableOutsidePointerEvents: !1,
        disableOutsideScroll: !1,
        trapFocus: !1,
        onOpenAutoFocus: (d) => {
          var a;
          M.isUsingKeyboardRef.current && ((a = g.current) == null || a.focus()), d.preventDefault();
        },
        onCloseAutoFocus: (d) => d.preventDefault(),
        onFocusOutside: _(e.onFocusOutside, (d) => {
          d.target !== p.trigger && m.onOpenChange(!1);
        }),
        onEscapeKeyDown: _(e.onEscapeKeyDown, (d) => {
          M.onClose(), d.preventDefault();
        }),
        onKeyDown: _(e.onKeyDown, (d) => {
          var v;
          const a = d.currentTarget.contains(d.target), C = un[M.dir].includes(d.key);
          a && C && (m.onOpenChange(!1), (v = p.trigger) == null || v.focus(), d.preventDefault());
        })
      }
    ) }) }) });
  }, "MenuSubContent")
);
function ae(c) {
  return c ? "open" : "closed";
}
f(ae, "getOpenState");
function K(c) {
  return c === "indeterminate";
}
f(K, "isIndeterminate");
function Z(c) {
  return K(c) ? "indeterminate" : c ? "checked" : "unchecked";
}
f(Z, "getCheckedState");
function ye(c) {
  const e = document.activeElement;
  for (const t of c)
    if (t === e || (t.focus(), document.activeElement !== e)) return;
}
f(ye, "focusFirst");
function De(c, e) {
  return c.map((t, n) => c[(e + n) % c.length]);
}
f(De, "wrapArray");
function Oe(c, e, t) {
  const o = e.length > 1 && Array.from(e).every((p) => p === e[0]) ? e[0] : e, s = t ? c.indexOf(t) : -1;
  let u = De(c, Math.max(s, 0));
  o.length === 1 && (u = u.filter((p) => p !== t));
  const M = u.find(
    (p) => p.toLowerCase().startsWith(o.toLowerCase())
  );
  return M !== t ? M : void 0;
}
f(Oe, "getNextMatch");
function ke(c, e) {
  const { x: t, y: n } = c;
  let o = !1;
  for (let s = 0, u = e.length - 1; s < e.length; u = s++) {
    const m = e[s], M = e[u], p = m.x, g = m.y, h = M.x, d = M.y;
    g > n != d > n && t < (h - p) * (n - g) / (d - g) + p && (o = !o);
  }
  return o;
}
f(ke, "isPointInPolygon");
function Ae(c, e) {
  if (!e) return !1;
  const t = { x: c.clientX, y: c.clientY };
  return ke(t, e);
}
f(Ae, "isPointerInGraceArea");
function O(c) {
  return (e) => e.pointerType === "mouse" ? c(e) : void 0;
}
f(O, "whenMouse");
var nt = dn, tt = Ie, ot = mn, rt = Mn, ct = Pe, ut = vn, at = ue, it = _n, st = Pn, lt = bn, dt = xn, ft = Tn, mt = Dn, pt = On, Mt = An;
export {
  tt as Anchor,
  it as CheckboxItem,
  rt as Content,
  ct as Group,
  at as Item,
  dt as ItemIndicator,
  ut as Label,
  dn as Menu,
  Ie as MenuAnchor,
  _n as MenuCheckboxItem,
  Mn as MenuContent,
  Pe as MenuGroup,
  ue as MenuItem,
  xn as MenuItemIndicator,
  vn as MenuLabel,
  mn as MenuPortal,
  Pn as MenuRadioGroup,
  bn as MenuRadioItem,
  Tn as MenuSeparator,
  Dn as MenuSub,
  An as MenuSubContent,
  On as MenuSubTrigger,
  ot as Portal,
  st as RadioGroup,
  lt as RadioItem,
  nt as Root,
  ft as Separator,
  mt as Sub,
  Mt as SubContent,
  pt as SubTrigger,
  et as createMenuScope
};
