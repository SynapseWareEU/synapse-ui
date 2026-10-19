import { jsxs as Y, jsx as f } from "react/jsx-runtime";
import { useId as Z, useState as b, useRef as j, useMemo as ee, useCallback as te } from "react";
import { useOutsideClick as se } from "../../hooks/useOutsideClick.js";
import { cn as B } from "../../utils/cn.js";
import { comboboxPanelClass as oe, NO_MATCHES as re, comboboxNoticeClass as ne, comboboxOptionClass as ae, ComboboxOptionContent as le } from "./AutoComplete.js";
import { useFormItemContext as ie, useFieldState as ce } from "./Form.js";
import { inputClass as de } from "./Input.js";
import { textareaSizeClass as ue } from "./TextArea.js";
function fe(m, g, p) {
  const n = m.slice(0, g), v = n.lastIndexOf(p);
  if (v === -1) return null;
  const x = n.slice(v + p.length);
  return /\s/.test(x) ? null : x;
}
function ge({
  value: m,
  defaultValue: g = "",
  placeholder: p,
  prefix: n = "@",
  disabled: v,
  size: x,
  options: N = [],
  className: K,
  onChange: h,
  onSelect: k
}) {
  var Q;
  const o = ie(), { size: L, disabled: H } = ce(x, v), C = Z(), [P, U] = b(g), [l, q] = b(!1), [d, A] = b(null), [_, I] = b(0), [S, z] = b(0), M = j(null), R = j(null), w = m !== void 0, i = w ? m : P, r = ee(() => {
    if (d == null) return [];
    const e = d.toLowerCase();
    return N.filter((t) => t.label.toLowerCase().includes(e));
  }, [d, N]), D = (e, t) => {
    const s = r.length;
    if (!s) return 0;
    let c = e;
    for (let u = 0; u < s; u++)
      if (c = (c + t + s) % s, !r[c].disabled) return c;
    return Math.max(e, 0);
  }, O = Math.max(0, Math.min(_, r.length - 1)), a = (Q = r[O]) != null && Q.disabled ? D(O, 1) : O, $ = r[a], T = te(
    (e) => {
      w || U(e), h == null || h(e);
    },
    [w, h]
  ), y = () => {
    q(!1), A(null);
  };
  se(M, y, l);
  const E = (e, t) => {
    const s = fe(e, t, n);
    A(s), q(s != null), I(0);
  }, G = (e) => {
    const t = e.target.value, s = e.target.selectionStart ?? t.length;
    T(t), z(s), E(t, s);
  }, F = (e) => {
    const t = R.current;
    if (!t || d == null || e.disabled) return;
    const s = i.slice(0, S), c = i.slice(S), u = s.lastIndexOf(n), X = `${i.slice(0, u)}${n}${e.label} ${c}`;
    T(X), k == null || k(e), y(), requestAnimationFrame(() => {
      const V = u + n.length + e.label.length + 1;
      t.focus(), t.setSelectionRange(V, V);
    });
  }, J = (e) => {
    if (!(!l || r.length === 0))
      if (e.key === "ArrowDown")
        e.preventDefault(), I(D(a, 1));
      else if (e.key === "ArrowUp")
        e.preventDefault(), I(D(a, -1));
      else if (e.key === "Enter" || e.key === "Tab") {
        if (!$) return;
        e.preventDefault(), F($);
      } else e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), y());
  }, W = (e) => {
    var t;
    (t = M.current) != null && t.contains(e.relatedTarget) || y();
  };
  return /* @__PURE__ */ Y("div", { ref: M, className: B("relative w-full", K), children: [
    /* @__PURE__ */ f(
      "textarea",
      {
        ref: R,
        id: o == null ? void 0 : o.id,
        value: i,
        placeholder: p,
        disabled: H,
        role: "combobox",
        "aria-expanded": l,
        "aria-controls": l ? C : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": l && $ ? `${C}-${a}` : void 0,
        onChange: G,
        onKeyDown: J,
        onBlur: W,
        onClick: (e) => {
          const t = e.currentTarget.selectionStart ?? i.length;
          z(t), E(i, t);
        },
        className: B(de, "block m-0 resize-y", ue[L]),
        required: o == null ? void 0 : o.required,
        "aria-describedby": o == null ? void 0 : o.descriptionId,
        "aria-invalid": o != null && o.error ? !0 : void 0
      }
    ),
    l && /* @__PURE__ */ f("div", { id: C, className: oe, role: "listbox", "aria-label": "Mentions", children: r.length === 0 ? /* @__PURE__ */ f("div", { className: ne, children: re }) : r.map((e, t) => /* @__PURE__ */ f(
      "button",
      {
        id: `${C}-${t}`,
        ref: t === a ? (s) => void (s == null ? void 0 : s.scrollIntoView({ block: "nearest" })) : void 0,
        tabIndex: -1,
        type: "button",
        role: "option",
        "aria-selected": t === a,
        "data-active": t === a || void 0,
        "aria-disabled": e.disabled || void 0,
        "data-disabled": e.disabled || void 0,
        className: ae,
        onMouseDown: (s) => s.preventDefault(),
        onClick: () => F(e),
        children: /* @__PURE__ */ f(le, { option: e, query: d })
      },
      e.value
    )) })
  ] });
}
export {
  ge as Mentions
};
