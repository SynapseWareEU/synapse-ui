import { jsxs as X, jsx as s, Fragment as Ee } from "react/jsx-runtime";
import { useId as ke, useState as g, useRef as V } from "react";
import { useOutsideClick as Ae } from "../../hooks/useOutsideClick.js";
import { cn as le } from "../../utils/cn.js";
import { useFieldState as Me } from "./Form.js";
import { fieldClearPadding as Te, Input as $e, inputSizeClass as ze, FieldClearButton as Pe } from "./Input.js";
import { SelectOptionLabel as re } from "./Select.js";
function Re(t, r) {
  return r.label.toLowerCase().includes(t.toLowerCase());
}
function _e(t, r) {
  const c = t.toLowerCase();
  return r.label.toLowerCase().includes(c) || (r.code ?? "").toLowerCase().includes(c);
}
function Fe(t) {
  return t.code ? t.label ? `${t.code} ${t.label}` : t.code : t.label;
}
const je = (t) => `${t} suggestions`, Ue = "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none", ne = "p-su2 text-small text-ink-2 text-start", We = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";
function He(t, r) {
  if (!r) return t;
  const c = t.toLowerCase();
  if (c.length !== t.length) return t;
  const h = c.indexOf(r.toLowerCase());
  if (h === -1) return t;
  const O = h + r.length;
  return /* @__PURE__ */ X(Ee, { children: [
    t.slice(0, h),
    /* @__PURE__ */ s("span", { className: "font-medium", children: t.slice(h, O) }),
    t.slice(O)
  ] });
}
function Ge({ option: t, query: r }) {
  return /* @__PURE__ */ X("span", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ s("span", { className: "block", children: /* @__PURE__ */ s(re, { option: t, label: He(t.label, r) }) }),
    t.description ? /* @__PURE__ */ s("span", { className: "block text-small text-ink-2", children: t.description }) : null
  ] });
}
const Je = "No matches";
function Ke({
  value: t,
  defaultValue: r = "",
  placeholder: c,
  disabled: h,
  size: O,
  options: p = [],
  filterOption: ie,
  className: oe,
  id: de,
  name: ue,
  allowClear: ce,
  loading: x,
  notFoundContent: fe,
  selectedValue: Y,
  picker: a = !1,
  onSearch: f,
  listLabel: me = "Suggestions",
  loadingContent: ve = "Searching…",
  countLabel: be = je,
  clearLabel: he,
  "aria-label": pe,
  "aria-labelledby": xe,
  onChange: z,
  onSelect: P,
  onClear: R,
  onFocus: _,
  onBlur: F,
  onKeyDown: j,
  onClick: U,
  ...we
}) {
  var se;
  const L = ke(), { size: E, disabled: W } = Me(O, h), [ge, ye] = g(r), [y, i] = g(!1), [Ce, C] = g(0), H = V(null), N = V(!0), Z = V(null), [d, q] = g(null), [k, Ne] = g(), [De, B] = g(!1), K = t !== void 0, D = K ? t : ge, u = a ? p.find((e) => e.value === D) ?? ((k == null ? void 0 : k.value) === D ? k : void 0) : void 0, m = a ? d ?? (u ? Fe(u) : D) : D, A = a && d === null && (u != null && u.code) ? u : void 0, S = ie ?? (a ? _e : Re), o = a ? d && !f ? p.filter((e) => S(d, e)) : p : m && N.current ? p.filter((e) => S(m, e)) : p, Ie = a ? d : m && N.current ? m : null, G = (e, l) => {
    const n = o.length;
    if (!n) return 0;
    let v = e;
    for (let b = 0; b < n; b++)
      if (v = (v + l + n) % n, !o[v].disabled) return v;
    return Math.max(e, 0);
  }, J = Math.max(0, Math.min(Ce, o.length - 1)), w = (se = o[J]) != null && se.disabled ? G(J, 1) : J, M = x ? void 0 : o[w], T = (e) => {
    K || ye(e), z == null || z(e);
  }, $ = () => {
    d !== null && (q(null), f == null || f(""));
  }, ee = (e) => {
    e.disabled || (N.current = !1, a ? (Ne(e), $(), T(e.value)) : T(e.label), P == null || P(e.value, e), C(0), i(!1));
  }, Oe = (e) => {
    var n, v;
    if (i(!0), C(0), !a) {
      N.current = !0, T(e.target.value);
      return;
    }
    let l = e.target.value;
    if (d === null && u) {
      const b = e.nativeEvent;
      (n = b.inputType) != null && n.startsWith("delete") ? l = "" : (v = b.inputType) != null && v.startsWith("insert") && b.data != null && (l = b.data);
    }
    q(l), f == null || f(l);
  }, te = () => {
    var e;
    a && d === null && u && ((e = Z.current) == null || e.select());
  };
  Ae(H, () => i(!1), y);
  const Le = (e) => {
    if (j == null || j(e), !e.defaultPrevented) {
      if (a && e.key === "Enter" && e.preventDefault(), !y) {
        (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), i(!0));
        return;
      }
      if (e.key === "ArrowDown")
        e.preventDefault(), C(G(w, 1));
      else if (e.key === "ArrowUp")
        e.preventDefault(), C(G(w, -1));
      else if (e.key === "Enter") {
        if (e.preventDefault(), x) return;
        M && !M.disabled ? ee(M) : i(!1);
      } else e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), i(!1), a && $());
    }
  }, ae = !!(ce && m && !W), Q = y && (a || x || o.length > 0 || p.length > 0), I = ae ? Te(E) : void 0;
  return /* @__PURE__ */ X("div", { ref: H, className: le("relative w-full", oe), children: [
    /* @__PURE__ */ s(
      $e,
      {
        ...we,
        ref: Z,
        id: de,
        name: ue,
        role: "combobox",
        "aria-label": pe,
        "aria-labelledby": xe,
        "aria-expanded": y,
        "aria-controls": Q ? L : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": Q && M ? `${L}-${w}` : void 0,
        className: A ? "caret-transparent selection:bg-transparent selection:text-transparent" : void 0,
        style: A ? { color: "transparent", paddingInlineEnd: I } : I != null ? { paddingInlineEnd: I } : void 0,
        value: m,
        placeholder: c,
        disabled: W,
        size: E,
        onChange: Oe,
        onFocus: (e) => {
          i(!0), B(!0), te(), _ == null || _(e);
        },
        onClick: (e) => {
          i(!0), te(), U == null || U(e);
        },
        onBlur: (e) => {
          var l;
          (l = H.current) != null && l.contains(e.relatedTarget) || i(!1), B(!1), $(), F == null || F(e);
        },
        onKeyDown: Le,
        autoComplete: "off"
      }
    ),
    A ? (
      // The box at rest (§2.2, the reference pair). It sits where the input's text is: the same
      // padding, border width and type size, so the pair starts at the text's x.
      /* @__PURE__ */ s(
        "span",
        {
          "aria-hidden": "true",
          "data-su-picker-value": "",
          className: le(
            "absolute inset-0 flex items-center min-w-0 pointer-events-none border border-solid border-transparent font-sans text-ink [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4",
            ze[E],
            // Focused at rest, the next key replaces it: stepped back, as a placeholder is.
            (De || W) && "text-ink-3 [&_span]:text-ink-3"
          ),
          style: I != null ? { paddingInlineEnd: I } : void 0,
          children: /* @__PURE__ */ s(re, { option: A })
        }
      )
    ) : null,
    ae && /* @__PURE__ */ s(
      Pe,
      {
        size: E,
        label: he,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => {
          N.current = !0, a && $(), T(""), R == null || R(), C(0), i(!0);
        }
      }
    ),
    /* @__PURE__ */ s(
      "span",
      {
        "aria-live": "polite",
        className: "absolute w-px h-px overflow-hidden [clip-path:inset(50%)]",
        children: y && !x ? be(o.length) : ""
      }
    ),
    Q && /* @__PURE__ */ s(
      "div",
      {
        id: L,
        className: Ue,
        role: "listbox",
        "aria-label": me,
        "aria-busy": x || void 0,
        children: x ? /* @__PURE__ */ s("div", { className: ne, children: ve }) : o.length === 0 ? /* @__PURE__ */ s("div", { className: ne, children: fe ?? Je }) : o.map((e, l) => /* @__PURE__ */ s(
          "button",
          {
            id: `${L}-${l}`,
            ref: l === w ? (n) => void (n == null ? void 0 : n.scrollIntoView({ block: "nearest" })) : void 0,
            tabIndex: -1,
            type: "button",
            role: "option",
            "aria-selected": Y !== void 0 ? e.value === Y : a ? e.value === D : e.label === m,
            "data-active": l === w || void 0,
            "aria-disabled": e.disabled || void 0,
            "data-disabled": e.disabled || void 0,
            className: We,
            onMouseDown: (n) => n.preventDefault(),
            onClick: () => ee(e),
            children: /* @__PURE__ */ s(Ge, { option: e, query: Ie })
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
  ne as comboboxNoticeClass,
  We as comboboxOptionClass,
  Ue as comboboxPanelClass
};
