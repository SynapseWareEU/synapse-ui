import { jsxs as E, jsx as a, Fragment as ee } from "react/jsx-runtime";
import { useId as te, useState as z, useRef as U } from "react";
import { useOutsideClick as ae } from "../../hooks/useOutsideClick.js";
import { cn as oe } from "../../utils/cn.js";
import { useFieldState as re } from "./Form.js";
import { Input as ie, fieldClearPadding as se, FieldClearButton as ne } from "./Input.js";
import { SelectOptionLabel as le } from "./Select.js";
function ce(t, i) {
  return i.label.toLowerCase().includes(t.toLowerCase());
}
const de = "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none", F = "p-su2 text-small text-ink-2 text-start", ue = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";
function fe(t, i) {
  if (!i) return t;
  const v = t.toLowerCase();
  if (v.length !== t.length) return t;
  const c = v.indexOf(i.toLowerCase());
  if (c === -1) return t;
  const h = c + i.length;
  return /* @__PURE__ */ E(ee, { children: [
    t.slice(0, c),
    /* @__PURE__ */ a("span", { className: "font-medium", children: t.slice(c, h) }),
    t.slice(h)
  ] });
}
function me({ option: t, query: i }) {
  return /* @__PURE__ */ E("span", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ a("span", { className: "block", children: /* @__PURE__ */ a(le, { option: t, label: fe(t.label, i) }) }),
    t.description ? /* @__PURE__ */ a("span", { className: "block text-small text-ink-2", children: t.description }) : null
  ] });
}
const ve = "No matches";
function ye({
  value: t,
  defaultValue: i = "",
  placeholder: v,
  disabled: c,
  size: h,
  options: g = [],
  filterOption: H = ce,
  className: V,
  id: _,
  name: G,
  allowClear: J,
  loading: p,
  notFoundContent: Q,
  "aria-label": W,
  "aria-labelledby": X,
  onChange: k,
  onSelect: y,
  onClear: C,
  onFocus: D,
  onBlur: N
}) {
  var K;
  const b = te(), { size: I, disabled: P } = re(h, c), [Y, Z] = z(i), [u, o] = z(!1), [q, f] = z(0), O = U(null), m = U(!0), R = t !== void 0, l = R ? t : Y, s = l && m.current ? g.filter((e) => H(l, e)) : g, A = (e, n) => {
    const r = s.length;
    if (!r) return 0;
    let x = e;
    for (let T = 0; T < r; T++)
      if (x = (x + n + r) % r, !s[x].disabled) return x;
    return Math.max(e, 0);
  }, M = Math.max(0, Math.min(q, s.length - 1)), d = (K = s[M]) != null && K.disabled ? A(M, 1) : M, w = s[d], L = (e) => {
    R || Z(e), k == null || k(e);
  }, S = (e) => {
    e.disabled || (m.current = !1, L(e.label), y == null || y(e.value, e), f(0), o(!1));
  };
  ae(O, () => o(!1), u);
  const B = (e) => {
    if (!u) {
      (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), o(!0));
      return;
    }
    e.key === "ArrowDown" ? (e.preventDefault(), f(A(d, 1))) : e.key === "ArrowUp" ? (e.preventDefault(), f(A(d, -1))) : e.key === "Enter" ? (e.preventDefault(), w && !w.disabled ? S(w) : o(!1)) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), o(!1));
  }, j = !!(J && l && !P), $ = u && (p || s.length > 0 || g.length > 0);
  return /* @__PURE__ */ E("div", { ref: O, className: oe("relative w-full", V), children: [
    /* @__PURE__ */ a(
      ie,
      {
        id: _,
        name: G,
        role: "combobox",
        "aria-label": W,
        "aria-labelledby": X,
        "aria-expanded": u,
        "aria-controls": $ ? b : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": $ && w ? `${b}-${d}` : void 0,
        style: j ? { paddingInlineEnd: se(I) } : void 0,
        value: l,
        placeholder: v,
        disabled: P,
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
        onKeyDown: B,
        autoComplete: "off"
      }
    ),
    j && /* @__PURE__ */ a(
      ne,
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
        className: de,
        role: "listbox",
        "aria-label": "Suggestions",
        "aria-busy": p || void 0,
        children: p ? /* @__PURE__ */ a("div", { className: F, children: "Searching…" }) : s.length === 0 ? /* @__PURE__ */ a("div", { className: F, children: Q ?? ve }) : s.map((e, n) => /* @__PURE__ */ a(
          "button",
          {
            id: `${b}-${n}`,
            ref: n === d ? (r) => void (r == null ? void 0 : r.scrollIntoView({ block: "nearest" })) : void 0,
            tabIndex: -1,
            type: "button",
            role: "option",
            "aria-selected": e.label === l,
            "data-active": n === d || void 0,
            "aria-disabled": e.disabled || void 0,
            "data-disabled": e.disabled || void 0,
            className: ue,
            onMouseDown: (r) => r.preventDefault(),
            onClick: () => S(e),
            children: /* @__PURE__ */ a(
              me,
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
  ye as AutoComplete,
  me as ComboboxOptionContent,
  ve as NO_MATCHES,
  F as comboboxNoticeClass,
  ue as comboboxOptionClass,
  de as comboboxPanelClass
};
