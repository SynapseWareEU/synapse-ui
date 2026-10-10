import { jsxs as E, jsx as a, Fragment as te } from "react/jsx-runtime";
import { useId as ae, useState as z, useRef as F } from "react";
import { useOutsideClick as oe } from "../../hooks/useOutsideClick.js";
import { cn as re } from "../../utils/cn.js";
import { useFieldState as ie } from "./Form.js";
import { Input as se, fieldClearPadding as ne, FieldClearButton as le } from "./Input.js";
import { SelectOptionLabel as ce } from "./Select.js";
function de(t, i) {
  return i.label.toLowerCase().includes(t.toLowerCase());
}
const ue = "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none", H = "p-su2 text-small text-ink-2 text-start", fe = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";
function me(t, i) {
  if (!i) return t;
  const v = t.toLowerCase();
  if (v.length !== t.length) return t;
  const c = v.indexOf(i.toLowerCase());
  if (c === -1) return t;
  const h = c + i.length;
  return /* @__PURE__ */ E(te, { children: [
    t.slice(0, c),
    /* @__PURE__ */ a("span", { className: "font-medium", children: t.slice(c, h) }),
    t.slice(h)
  ] });
}
function ve({ option: t, query: i }) {
  return /* @__PURE__ */ E("span", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ a("span", { className: "block", children: /* @__PURE__ */ a(ce, { option: t, label: me(t.label, i) }) }),
    t.description ? /* @__PURE__ */ a("span", { className: "block text-small text-ink-2", children: t.description }) : null
  ] });
}
const he = "No matches";
function Ce({
  value: t,
  defaultValue: i = "",
  placeholder: v,
  disabled: c,
  size: h,
  options: g = [],
  filterOption: _ = de,
  className: G,
  id: J,
  name: Q,
  allowClear: V,
  loading: p,
  notFoundContent: W,
  selectedValue: P,
  "aria-label": X,
  "aria-labelledby": Y,
  onChange: k,
  onSelect: y,
  onClear: C,
  onFocus: D,
  onBlur: N
}) {
  var T;
  const b = ae(), { size: I, disabled: R } = ie(h, c), [Z, q] = z(i), [u, o] = z(!1), [B, f] = z(0), O = F(null), m = F(!0), S = t !== void 0, l = S ? t : Z, s = l && m.current ? g.filter((e) => _(l, e)) : g, A = (e, n) => {
    const r = s.length;
    if (!r) return 0;
    let x = e;
    for (let U = 0; U < r; U++)
      if (x = (x + n + r) % r, !s[x].disabled) return x;
    return Math.max(e, 0);
  }, M = Math.max(0, Math.min(B, s.length - 1)), d = (T = s[M]) != null && T.disabled ? A(M, 1) : M, w = s[d], L = (e) => {
    S || q(e), k == null || k(e);
  }, j = (e) => {
    e.disabled || (m.current = !1, L(e.label), y == null || y(e.value, e), f(0), o(!1));
  };
  oe(O, () => o(!1), u);
  const ee = (e) => {
    if (!u) {
      (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), o(!0));
      return;
    }
    e.key === "ArrowDown" ? (e.preventDefault(), f(A(d, 1))) : e.key === "ArrowUp" ? (e.preventDefault(), f(A(d, -1))) : e.key === "Enter" ? (e.preventDefault(), w && !w.disabled ? j(w) : o(!1)) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), o(!1));
  }, K = !!(V && l && !R), $ = u && (p || s.length > 0 || g.length > 0);
  return /* @__PURE__ */ E("div", { ref: O, className: re("relative w-full", G), children: [
    /* @__PURE__ */ a(
      se,
      {
        id: J,
        name: Q,
        role: "combobox",
        "aria-label": X,
        "aria-labelledby": Y,
        "aria-expanded": u,
        "aria-controls": $ ? b : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": $ && w ? `${b}-${d}` : void 0,
        style: K ? { paddingInlineEnd: ne(I) } : void 0,
        value: l,
        placeholder: v,
        disabled: R,
        size: I,
        onChange: (e) => {
          m.current = !0, L(e.target.value), o(!0), f(0);
        },
        onFocus: (e) => {
          o(!0), D == null || D(e);
        },
        onClick: () => o(!0),
        onBlur: (e) => {
          var n;
          (n = O.current) != null && n.contains(e.relatedTarget) || o(!1), N == null || N(e);
        },
        onKeyDown: ee,
        autoComplete: "off"
      }
    ),
    K && /* @__PURE__ */ a(
      le,
      {
        size: I,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => {
          m.current = !0, L(""), C == null || C(), f(0), o(!0);
        }
      }
    ),
    /* @__PURE__ */ a(
      "span",
      {
        "aria-live": "polite",
        className: "absolute w-px h-px overflow-hidden [clip-path:inset(50%)]",
        children: u && !p ? `${s.length} suggestions` : ""
      }
    ),
    $ && /* @__PURE__ */ a(
      "div",
      {
        id: b,
        className: ue,
        role: "listbox",
        "aria-label": "Suggestions",
        "aria-busy": p || void 0,
        children: p ? /* @__PURE__ */ a("div", { className: H, children: "Searching…" }) : s.length === 0 ? /* @__PURE__ */ a("div", { className: H, children: W ?? he }) : s.map((e, n) => /* @__PURE__ */ a(
          "button",
          {
            id: `${b}-${n}`,
            ref: n === d ? (r) => void (r == null ? void 0 : r.scrollIntoView({ block: "nearest" })) : void 0,
            tabIndex: -1,
            type: "button",
            role: "option",
            "aria-selected": P !== void 0 ? e.value === P : e.label === l,
            "data-active": n === d || void 0,
            "aria-disabled": e.disabled || void 0,
            "data-disabled": e.disabled || void 0,
            className: fe,
            onMouseDown: (r) => r.preventDefault(),
            onClick: () => j(e),
            children: /* @__PURE__ */ a(
              ve,
              {
                option: e,
                query: l && m.current ? l : null
              }
            )
          },
          e.value
        ))
      }
    )
  ] });
}
export {
  Ce as AutoComplete,
  ve as ComboboxOptionContent,
  he as NO_MATCHES,
  H as comboboxNoticeClass,
  fe as comboboxOptionClass,
  ue as comboboxPanelClass
};
