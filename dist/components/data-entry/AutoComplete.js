import { jsxs as V, jsx as a, Fragment as ke } from "react/jsx-runtime";
import { useId as Ee, useState as x, useRef as Q } from "react";
import { useOutsideClick as Te } from "../../hooks/useOutsideClick.js";
import { cn as le } from "../../utils/cn.js";
import { useFieldState as Ae } from "./Form.js";
import { fieldClearPadding as Me, Input as $e, inputSizeClass as ze, FieldClearButton as Pe } from "./Input.js";
import { SelectOptionLabel as re } from "./Select.js";
function Re(t, r) {
  return r.label.toLowerCase().includes(t.toLowerCase());
}
function _e(t, r) {
  const f = t.toLowerCase();
  return r.label.toLowerCase().includes(f) || (r.code ?? "").toLowerCase().includes(f);
}
function Fe(t) {
  return t.code ? t.label ? `${t.code} ${t.label}` : t.code : t.label;
}
const je = (t) => `${t} suggestions`, Ue = "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none", ne = "p-su2 text-small text-ink-2 text-start", He = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";
function We(t, r) {
  if (!r) return t;
  const f = t.toLowerCase();
  if (f.length !== t.length) return t;
  const b = f.indexOf(r.toLowerCase());
  if (b === -1) return t;
  const D = b + r.length;
  return /* @__PURE__ */ V(ke, { children: [
    t.slice(0, b),
    /* @__PURE__ */ a("span", { className: "font-medium", children: t.slice(b, D) }),
    t.slice(D)
  ] });
}
function Ge({ option: t, query: r }) {
  return /* @__PURE__ */ V("span", { className: "flex-1 min-w-0", children: [
    /* @__PURE__ */ a("span", { className: "block", children: /* @__PURE__ */ a(re, { option: t, label: We(t.label, r) }) }),
    t.description ? /* @__PURE__ */ a("span", { className: "block text-small text-ink-2", children: t.description }) : null
  ] });
}
const Je = "No matches";
function Ke({
  value: t,
  defaultValue: r = "",
  placeholder: f,
  disabled: b,
  size: D,
  options: p = [],
  filterOption: ie,
  className: oe,
  id: de,
  name: ue,
  allowClear: ce,
  loading: I,
  notFoundContent: fe,
  selectedValue: X,
  picker: s = !1,
  onSearch: m,
  listLabel: me = "Suggestions",
  loadingContent: ve = "Searching…",
  countLabel: be = je,
  clearLabel: pe,
  "aria-label": he,
  "aria-labelledby": xe,
  onChange: M,
  onSelect: $,
  onClear: z,
  onFocus: P,
  onBlur: R,
  onKeyDown: _,
  onClick: F,
  ...we
}) {
  var ae;
  const O = Ee(), { size: L, disabled: j } = Ae(D, b), [ge, ye] = x(r), [w, i] = x(!1), [Ce, g] = x(0), U = Q(null), y = Q(!0), Y = Q(null), [u, Z] = x(null), [k, Ne] = x(), [De, q] = x(!1), B = t !== void 0, C = B ? t : ge, c = s ? p.find((e) => e.value === C) ?? ((k == null ? void 0 : k.value) === C ? k : void 0) : void 0, v = s ? u ?? (c ? Fe(c) : C) : C, E = s && u === null && (c != null && c.code) ? c : void 0, K = ie ?? (s ? _e : Re), o = s ? u && !m ? p.filter((e) => K(u, e)) : p : v && y.current ? p.filter((e) => K(v, e)) : p, Ie = s ? u : v && y.current ? v : null, H = (e, l) => {
    const n = o.length;
    if (!n) return 0;
    let d = e;
    for (let se = 0; se < n; se++)
      if (d = (d + l + n) % n, !o[d].disabled) return d;
    return Math.max(e, 0);
  }, W = Math.max(0, Math.min(Ce, o.length - 1)), h = (ae = o[W]) != null && ae.disabled ? H(W, 1) : W, T = o[h], A = (e) => {
    B || ye(e), M == null || M(e);
  }, G = () => {
    u !== null && (Z(null), m == null || m(""));
  }, S = (e) => {
    e.disabled || (y.current = !1, s ? (Ne(e), G(), A(e.value)) : A(e.label), $ == null || $(e.value, e), g(0), i(!1));
  }, Oe = (e) => {
    var n;
    if (i(!0), g(0), !s) {
      y.current = !0, A(e.target.value);
      return;
    }
    let l = e.target.value;
    if (u === null && c) {
      const d = e.nativeEvent;
      (n = d.inputType) != null && n.startsWith("delete") ? l = "" : d.inputType === "insertText" && d.data != null && (l = d.data);
    }
    Z(l), m == null || m(l);
  }, ee = () => {
    var e;
    s && u === null && c && ((e = Y.current) == null || e.select());
  };
  Te(U, () => i(!1), w);
  const Le = (e) => {
    if (_ == null || _(e), !e.defaultPrevented) {
      if (s && e.key === "Enter" && e.preventDefault(), !w) {
        (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), i(!0));
        return;
      }
      e.key === "ArrowDown" ? (e.preventDefault(), g(H(h, 1))) : e.key === "ArrowUp" ? (e.preventDefault(), g(H(h, -1))) : e.key === "Enter" ? (e.preventDefault(), T && !T.disabled ? S(T) : i(!1)) : e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), i(!1));
    }
  }, te = !!(ce && v && !j), J = w && (s || I || o.length > 0 || p.length > 0), N = te ? Me(L) : void 0;
  return /* @__PURE__ */ V("div", { ref: U, className: le("relative w-full", oe), children: [
    /* @__PURE__ */ a(
      $e,
      {
        ...we,
        ref: Y,
        id: de,
        name: ue,
        role: "combobox",
        "aria-label": he,
        "aria-labelledby": xe,
        "aria-expanded": w,
        "aria-controls": J ? O : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": J && T ? `${O}-${h}` : void 0,
        className: E ? "caret-transparent selection:bg-transparent selection:text-transparent" : void 0,
        style: E ? { color: "transparent", paddingInlineEnd: N } : N != null ? { paddingInlineEnd: N } : void 0,
        value: v,
        placeholder: f,
        disabled: j,
        size: L,
        onChange: Oe,
        onFocus: (e) => {
          i(!0), q(!0), ee(), P == null || P(e);
        },
        onClick: (e) => {
          i(!0), ee(), F == null || F(e);
        },
        onBlur: (e) => {
          var l;
          (l = U.current) != null && l.contains(e.relatedTarget) || i(!1), q(!1), G(), R == null || R(e);
        },
        onKeyDown: Le,
        autoComplete: "off"
      }
    ),
    E ? (
      // The box at rest (§2.2, the reference pair). It sits where the input's text is: the same
      // padding, border width and type size, so the pair starts at the text's x.
      /* @__PURE__ */ a(
        "span",
        {
          "aria-hidden": "true",
          "data-su-picker-value": "",
          className: le(
            "absolute inset-0 flex items-center min-w-0 pointer-events-none border border-solid border-transparent font-sans text-ink [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4",
            ze[L],
            // Focused at rest, the next key replaces it: stepped back, as a placeholder is.
            (De || j) && "text-ink-3 [&_span]:text-ink-3"
          ),
          style: N != null ? { paddingInlineEnd: N } : void 0,
          children: /* @__PURE__ */ a(re, { option: E })
        }
      )
    ) : null,
    te && /* @__PURE__ */ a(
      Pe,
      {
        size: L,
        label: pe,
        onMouseDown: (e) => e.preventDefault(),
        onClick: () => {
          y.current = !0, s && G(), A(""), z == null || z(), g(0), i(!0);
        }
      }
    ),
    /* @__PURE__ */ a(
      "span",
      {
        "aria-live": "polite",
        className: "absolute w-px h-px overflow-hidden [clip-path:inset(50%)]",
        children: w && !I ? be(o.length) : ""
      }
    ),
    J && /* @__PURE__ */ a(
      "div",
      {
        id: O,
        className: Ue,
        role: "listbox",
        "aria-label": me,
        "aria-busy": I || void 0,
        children: I ? /* @__PURE__ */ a("div", { className: ne, children: ve }) : o.length === 0 ? /* @__PURE__ */ a("div", { className: ne, children: fe ?? Je }) : o.map((e, l) => /* @__PURE__ */ a(
          "button",
          {
            id: `${O}-${l}`,
            ref: l === h ? (n) => void (n == null ? void 0 : n.scrollIntoView({ block: "nearest" })) : void 0,
            tabIndex: -1,
            type: "button",
            role: "option",
            "aria-selected": X !== void 0 ? e.value === X : s ? e.value === C : e.label === v,
            "data-active": l === h || void 0,
            "aria-disabled": e.disabled || void 0,
            "data-disabled": e.disabled || void 0,
            className: He,
            onMouseDown: (n) => n.preventDefault(),
            onClick: () => S(e),
            children: /* @__PURE__ */ a(Ge, { option: e, query: Ie })
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
  He as comboboxOptionClass,
  Ue as comboboxPanelClass
};
