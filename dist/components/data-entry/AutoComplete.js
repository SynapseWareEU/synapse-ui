import { jsxs as Y, jsx as l, Fragment as Ee } from "react/jsx-runtime";
import { useId as Me, useState as C, useRef as X } from "react";
import { useOutsideClick as Ae } from "../../hooks/useOutsideClick.js";
import { cn as re } from "../../utils/cn.js";
import { useFieldState as Te } from "./Form.js";
import { fieldClearPadding as $e, Input as ze, inputSizeClass as Pe, FieldClearButton as Re } from "./Input.js";
import { SelectOptionLabel as oe } from "./Select.js";
function _e(t, r) {
  return r.label.toLowerCase().includes(t.toLowerCase());
}
function ke(t, r) {
  const f = t.toLowerCase();
  return r.label.toLowerCase().includes(f) || (r.code ?? "").toLowerCase().includes(f);
}
function Fe(t) {
  return t.code ? t.label ? `${t.code} ${t.label}` : t.code : t.label;
}
const je = (t) => `${t} suggestions`, Ue = "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none", ie = "p-su2 text-small text-ink-2 text-start", We = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";
function He(t, r) {
  if (!r) return t;
  const f = t.toLowerCase();
  if (f.length !== t.length) return t;
  const x = f.indexOf(r.toLowerCase());
  if (x === -1) return t;
  const O = x + r.length;
  return /* @__PURE__ */ Y(Ee, { children: [
    t.slice(0, x),
    /* @__PURE__ */ l("span", { className: "font-medium", children: t.slice(x, O) }),
    t.slice(O)
  ] });
}
function Ge({ option: t, query: r }) {
  return /* @__PURE__ */ Y("span", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ l("span", { className: "block", children: /* @__PURE__ */ l(oe, { option: t, label: He(t.label, r) }) }),
    t.description ? /* @__PURE__ */ l("span", { className: "block text-small text-ink-2", children: t.description }) : null
  ] });
}
const Je = "No matches";
function Ke({
  value: t,
  defaultValue: r = "",
  placeholder: f,
  disabled: x,
  size: O,
  options: w = [],
  filterOption: de,
  className: ue,
  id: ce,
  name: R,
  allowClear: fe,
  loading: g,
  notFoundContent: ve,
  selectedValue: Z,
  picker: a = !1,
  onSearch: v,
  listLabel: me = "Suggestions",
  loadingContent: be = "Searching…",
  countLabel: he = je,
  clearLabel: pe,
  "aria-label": xe,
  "aria-labelledby": we,
  onChange: _,
  onSelect: k,
  onClear: F,
  onFocus: j,
  onBlur: U,
  onKeyDown: W,
  onClick: H,
  ...ge
}) {
  var ne;
  const L = Me(), { size: E, disabled: M } = Te(O, x), [ye, Ce] = C(r), [N, i] = C(!1), [q, m] = C(null), G = X(null), I = X(!0), B = X(null), [d, K] = C(null), [A, Ne] = C(), [Ie, S] = C(!1), ee = t !== void 0, u = ee ? t : ye, c = a ? w.find((e) => e.value === u) ?? ((A == null ? void 0 : A.value) === u ? A : void 0) : void 0, b = a ? d ?? (c ? Fe(c) : u) : u, T = a && d === null && (c != null && c.code) ? c : void 0, te = de ?? (a ? ke : _e), o = a ? d && !v ? w.filter((e) => te(d, e)) : w : b && I.current ? w.filter((e) => te(b, e)) : w, De = a ? d : b && I.current ? b : null, J = (e, s) => {
    const n = o.length;
    if (!n) return 0;
    let h = e;
    for (let p = 0; p < n; p++)
      if (h = (h + s + n) % n, !o[h].disabled) return h;
    return Math.max(e, 0);
  }, Q = Math.max(0, Math.min(q ?? 0, o.length - 1)), y = q === null && a && !d ? u === "" ? -1 : o.findIndex((e) => e.value === u) : (ne = o[Q]) != null && ne.disabled ? J(Q, 1) : Q, $ = g ? void 0 : o[y], z = (e) => {
    ee || Ce(e), _ == null || _(e);
  }, P = () => {
    d !== null && (K(null), v == null || v(""));
  }, ae = (e) => {
    e.disabled || (I.current = !1, a ? (Ne(e), P(), z(e.value)) : z(e.label), k == null || k(e.value, e), m(null), i(!1));
  }, Oe = (e) => {
    var n, h;
    if (i(!0), m(null), !a) {
      I.current = !0, z(e.target.value);
      return;
    }
    let s = e.target.value;
    if (d === null && c) {
      const p = e.nativeEvent;
      (n = p.inputType) != null && n.startsWith("delete") ? s = "" : (h = p.inputType) != null && h.startsWith("insert") && p.data != null && (s = p.data);
    }
    K(s), v == null || v(s);
  }, le = () => {
    var e;
    a && d === null && c && ((e = B.current) == null || e.select());
  };
  Ae(G, () => i(!1), N);
  const Le = (e) => {
    if (W == null || W(e), !e.defaultPrevented) {
      if (a && e.key === "Enter" && e.preventDefault(), !N) {
        (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), i(!0));
        return;
      }
      if (e.key === "ArrowDown")
        e.preventDefault(), m(J(y, 1));
      else if (e.key === "ArrowUp")
        e.preventDefault(), m(J(Math.max(y, 0), -1));
      else if (e.key === "Enter") {
        if (e.preventDefault(), g) return;
        $ && !$.disabled ? ae($) : i(!1);
      } else e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), i(!1), a && (P(), m(null)));
    }
  }, se = !!(fe && (a ? u : b) && !M), V = N && (a || g || o.length > 0 || w.length > 0), D = se ? $e(E) : void 0;
  return /* @__PURE__ */ Y("div", { ref: G, className: re("relative w-full", ue), children: [
    /* @__PURE__ */ l(
      ze,
      {
        ...ge,
        ref: B,
        id: ce,
        name: a ? void 0 : R,
        role: "combobox",
        "aria-label": xe,
        "aria-labelledby": we,
        "aria-expanded": N,
        "aria-controls": V ? L : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": V && $ ? `${L}-${y}` : void 0,
        className: T ? "caret-transparent selection:bg-transparent selection:text-transparent" : void 0,
        style: T ? { color: "transparent", paddingInlineEnd: D } : D != null ? { paddingInlineEnd: D } : void 0,
        value: b,
        placeholder: f,
        disabled: M,
        size: E,
        onChange: Oe,
        onFocus: (e) => {
          i(!0), S(!0), le(), j == null || j(e);
        },
        onClick: (e) => {
          i(!0), le(), H == null || H(e);
        },
        onBlur: (e) => {
          var s;
          (s = G.current) != null && s.contains(e.relatedTarget) || i(!1), S(!1), P(), a && m(null), U == null || U(e);
        },
        onKeyDown: Le,
        autoComplete: "off"
      }
    ),
    a && R ? /* @__PURE__ */ l("input", { type: "hidden", name: R, value: u, disabled: M }) : null,
    T ? (
      // The box at rest (§2.2, the reference pair). It sits where the input's text is: the same
      // padding, border width and type size, so the pair starts at the text's x.
      /* @__PURE__ */ l(
        "span",
        {
          "aria-hidden": "true",
          "data-su-picker-value": "",
          className: re(
            "absolute inset-0 flex items-center min-w-0 pointer-events-none border border-solid border-transparent font-sans text-ink [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4",
            Pe[E],
            // Focused at rest, the next key replaces it: stepped back, as a placeholder is.
            (Ie || M) && "text-ink-3 [&_span]:text-ink-3"
          ),
          style: D != null ? { paddingInlineEnd: D } : void 0,
          children: /* @__PURE__ */ l(oe, { option: T })
        }
      )
    ) : null,
    se && /* @__PURE__ */ l(
      Re,
      {
        size: E,
        label: pe,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => {
          I.current = !0, a && P(), z(""), F == null || F(), m(null), i(!0);
        }
      }
    ),
    /* @__PURE__ */ l(
      "span",
      {
        "aria-live": "polite",
        className: "absolute w-px h-px overflow-hidden [clip-path:inset(50%)]",
        children: N && !g ? he(o.length) : ""
      }
    ),
    V && /* @__PURE__ */ l(
      "div",
      {
        id: L,
        className: Ue,
        role: "listbox",
        "aria-label": me,
        "aria-busy": g || void 0,
        children: g ? /* @__PURE__ */ l("div", { className: ie, children: be }) : o.length === 0 ? /* @__PURE__ */ l("div", { className: ie, children: ve ?? Je }) : o.map((e, s) => /* @__PURE__ */ l(
          "button",
          {
            id: `${L}-${s}`,
            ref: s === y ? (n) => void (n == null ? void 0 : n.scrollIntoView({ block: "nearest" })) : void 0,
            tabIndex: -1,
            type: "button",
            role: "option",
            "aria-selected": Z !== void 0 ? e.value === Z : a ? e.value === u : e.label === b,
            "data-active": s === y || void 0,
            "aria-disabled": e.disabled || void 0,
            "data-disabled": e.disabled || void 0,
            className: We,
            onMouseDown: (n) => n.preventDefault(),
            onClick: () => ae(e),
            children: /* @__PURE__ */ l(Ge, { option: e, query: De })
          },
          e.value
        ))
      }
    )
  ] });
}
export {
  Ke as AutoComplete,
  Ge as ComboboxOptionContent,
  Je as NO_MATCHES,
  ie as comboboxNoticeClass,
  We as comboboxOptionClass,
  Ue as comboboxPanelClass
};
