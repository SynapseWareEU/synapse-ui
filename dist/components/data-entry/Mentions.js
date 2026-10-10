import { jsxs as Y, jsx as f } from "react/jsx-runtime";
import { useId as Z, useState as b, useRef as j, useMemo as ee, useCallback as te } from "react";
import { useOutsideClick as se } from "../../hooks/useOutsideClick.js";
import { cn as B } from "../../utils/cn.js";
import { comboboxPanelClass as ne, NO_MATCHES as oe, comboboxNoticeClass as re, comboboxOptionClass as ae, ComboboxOptionContent as le } from "./AutoComplete.js";
import { useFormItemContext as ie, useFieldState as ce } from "./Form.js";
import { inputClass as ue } from "./Input.js";
function de(m, C, p) {
  const r = m.slice(0, C), x = r.lastIndexOf(p);
  if (x === -1) return null;
  const h = r.slice(x + p.length);
  return /\s/.test(h) ? null : h;
}
const fe = {
  sm: "min-h-[72px] px-su2 py-su2 text-control",
  md: "min-h-[80px] px-su3 py-su2 text-control",
  lg: "min-h-[88px] px-[14px] py-su2 text-section"
};
function ge({
  value: m,
  defaultValue: C = "",
  placeholder: p,
  prefix: r = "@",
  disabled: x,
  size: h,
  options: N = [],
  className: K,
  onChange: v,
  onSelect: k
}) {
  var Q;
  const n = ie(), { size: L, disabled: H } = ce(h, x), y = Z(), [P, U] = b(C), [l, q] = b(!1), [u, A] = b(null), [_, I] = b(0), [S, z] = b(0), M = j(null), R = j(null), w = m !== void 0, i = w ? m : P, o = ee(() => {
    if (u == null) return [];
    const e = u.toLowerCase();
    return N.filter((t) => t.label.toLowerCase().includes(e));
  }, [u, N]), D = (e, t) => {
    const s = o.length;
    if (!s) return 0;
    let c = e;
    for (let d = 0; d < s; d++)
      if (c = (c + t + s) % s, !o[c].disabled) return c;
    return Math.max(e, 0);
  }, O = Math.max(0, Math.min(_, o.length - 1)), a = (Q = o[O]) != null && Q.disabled ? D(O, 1) : O, $ = o[a], T = te(
    (e) => {
      w || U(e), v == null || v(e);
    },
    [w, v]
  ), g = () => {
    q(!1), A(null);
  };
  se(M, g, l);
  const E = (e, t) => {
    const s = de(e, t, r);
    A(s), q(s != null), I(0);
  }, G = (e) => {
    const t = e.target.value, s = e.target.selectionStart ?? t.length;
    T(t), z(s), E(t, s);
  }, F = (e) => {
    const t = R.current;
    if (!t || u == null || e.disabled) return;
    const s = i.slice(0, S), c = i.slice(S), d = s.lastIndexOf(r), X = `${i.slice(0, d)}${r}${e.label} ${c}`;
    T(X), k == null || k(e), g(), requestAnimationFrame(() => {
      const V = d + r.length + e.label.length + 1;
      t.focus(), t.setSelectionRange(V, V);
    });
  }, J = (e) => {
    if (!(!l || o.length === 0))
      if (e.key === "ArrowDown")
        e.preventDefault(), I(D(a, 1));
      else if (e.key === "ArrowUp")
        e.preventDefault(), I(D(a, -1));
      else if (e.key === "Enter" || e.key === "Tab") {
        if (!$) return;
        e.preventDefault(), F($);
      } else e.key === "Escape" && (e.preventDefault(), e.stopPropagation(), g());
  }, W = (e) => {
    var t;
    (t = M.current) != null && t.contains(e.relatedTarget) || g();
  };
  return /* @__PURE__ */ Y("div", { ref: M, className: B("relative w-full", K), children: [
    /* @__PURE__ */ f(
      "textarea",
      {
        ref: R,
        id: n == null ? void 0 : n.id,
        value: i,
        placeholder: p,
        disabled: H,
        role: "combobox",
        "aria-expanded": l,
        "aria-controls": l ? y : void 0,
        "aria-autocomplete": "list",
        "aria-activedescendant": l && $ ? `${y}-${a}` : void 0,
        onChange: G,
        onKeyDown: J,
        onBlur: W,
        onClick: (e) => {
          const t = e.currentTarget.selectionStart ?? i.length;
          z(t), E(i, t);
        },
        className: B(ue, "block m-0 resize-y", fe[L]),
        required: n == null ? void 0 : n.required,
        "aria-describedby": n == null ? void 0 : n.descriptionId,
        "aria-invalid": n != null && n.error ? !0 : void 0
      }
    ),
    l && /* @__PURE__ */ f("div", { id: y, className: ne, role: "listbox", "aria-label": "Mentions", children: o.length === 0 ? /* @__PURE__ */ f("div", { className: re, children: oe }) : o.map((e, t) => /* @__PURE__ */ f(
      "button",
      {
        id: `${y}-${t}`,
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
        children: /* @__PURE__ */ f(le, { option: e, query: u })
      },
      e.value
    )) })
  ] });
}
export {
  ge as Mentions
};
