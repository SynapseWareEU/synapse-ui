import { jsx as n, jsxs as g } from "react/jsx-runtime";
import { forwardRef as ke, useId as Te, useState as J } from "react";
import { cn as h } from "../../utils/cn.js";
import { cleanDecimal as W, decimalText as O, compareDecimal as Q, showDecimal as X, stepDecimal as De } from "./decimal.js";
import { describedBy as Z, HandheldErrorLine as Me, hhQuestionClass as $e, hhSecondaryClass as C, HH_STROKE as V, hhTransition as Se, hhFieldBorder as _e } from "./shared.js";
import Ee from "../../vendor/@tabler/icons-react/dist/esm/icons/IconMinus.js";
import Fe from "../../vendor/@tabler/icons-react/dist/esm/icons/IconPlus.js";
function He(f) {
  if (f == null) return "—";
  const [x, v] = String(f).split("."), i = x.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return v ? `${i},${v}` : i;
}
const P = (f) => f.preventDefault(), ze = ke(
  function({
    value: x,
    defaultValue: v = null,
    onChange: i,
    decimalValue: y,
    defaultDecimalValue: j,
    onDecimalChange: N,
    decimalSeparator: A = ".",
    scale: ee,
    min: B = 0,
    max: I,
    step: q = 1,
    unit: a,
    variant: z = "field",
    label: k,
    labelAs: te,
    error: T,
    invalid: ne,
    disabled: l,
    decrementLabel: se,
    incrementLabel: re,
    inputProps: o,
    className: oe,
    "aria-label": R,
    ...ae
  }, ie) {
    const le = Te(), c = (o == null ? void 0 : o.id) ?? `su-qty-${le}`, D = `${c}-error`, [ce, de] = J(v), s = x !== void 0 ? x : ce, p = T != null && T !== !1, U = ne ?? p, r = y !== void 0 || j !== void 0 || N !== void 0, [ue, me] = J(j ?? ""), t = W(y !== void 0 ? y : ue), M = O(B) ?? "0", d = O(I), $ = O(q) ?? "1", w = Number(B), b = I === void 0 ? void 0 : Number(I), S = Number(q), he = (e) => Math.min(Math.max(e, w), b ?? Number.POSITIVE_INFINITY), Y = (e) => {
      x === void 0 && de(e), i == null || i(e);
    }, L = (e) => {
      y === void 0 && me(e), N == null || N(e);
    }, _ = (e) => {
      r ? L(De(t === "" ? M : t, $, e, M, d)) : Y(he((s ?? w) + e * S));
    }, fe = r ? t !== "" && Q(t, M) <= 0 : s != null && s <= w, xe = r ? t !== "" && d !== void 0 && Q(t, d) >= 0 : s != null && b != null && s >= b, be = (e) => {
      if (r) {
        const m = W(e.currentTarget.value, ee);
        L(
          m !== "" && d !== void 0 && Q(m, d) > 0 ? d : m
        );
        return;
      }
      const u = e.currentTarget.value.replace(/\D/g, "");
      Y(u === "" ? null : Math.min(Number(u), b ?? Number.POSITIVE_INFINITY));
    }, ve = (e) => {
      var u;
      (u = o == null ? void 0 : o.onKeyDown) == null || u.call(o, e), !e.defaultPrevented && (e.key === "ArrowUp" || e.key === "ArrowDown") && (e.preventDefault(), _(e.key === "ArrowUp" ? 1 : -1));
    }, ye = typeof a == "string" || typeof a == "number" ? ` ${a}` : "", E = k != null && k !== !1, Ne = r ? t === "" : s == null, G = r ? X(t, A) : s == null ? "" : String(s), pe = r ? t === "" ? "—" : X(t, A, !0) : He(s), we = r ? t === "" ? void 0 : Number(t) : s ?? void 0, F = te, H = E ? /* @__PURE__ */ n("label", { htmlFor: c, className: h($e, !F && "mb-su3"), children: k }) : null, ge = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": se ?? `Decrease by ${r ? $ : S}`,
        "aria-controls": c,
        disabled: l || fe,
        onMouseDown: P,
        onClick: () => _(-1),
        className: C,
        children: /* @__PURE__ */ n(Ee, { size: 28, stroke: V, "aria-hidden": !0 })
      }
    ), Ie = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": re ?? `Increase by ${r ? $ : S}`,
        "aria-controls": c,
        disabled: l || xe,
        onMouseDown: P,
        onClick: () => _(1),
        className: C,
        children: /* @__PURE__ */ n(Fe, { size: 28, stroke: V, "aria-hidden": !0 })
      }
    );
    let K;
    if (z === "output")
      K = /* @__PURE__ */ g(
        "output",
        {
          id: c,
          "aria-live": "polite",
          "aria-label": E ? void 0 : R,
          "aria-describedby": Z(p && D),
          className: h(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            l ? "text-ink-3" : "text-ink"
          ),
          children: [
            /* @__PURE__ */ n("span", { className: "text-hh-big font-semibold su-tabular truncate", children: pe }),
            a != null ? /* @__PURE__ */ n("span", { className: "shrink-0 text-hh-key text-ink-2", children: a }) : null
          ]
        }
      );
    else {
      const { className: e, onKeyDown: u, ...m } = o ?? {};
      K = /* @__PURE__ */ g(
        "div",
        {
          className: h(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            _e({ invalid: U, disabled: l, active: !0 }),
            Se
          ),
          children: [
            /* @__PURE__ */ n(
              "input",
              {
                ref: ie,
                type: "text",
                role: "spinbutton",
                inputMode: "none",
                autoComplete: "off",
                "aria-label": E ? void 0 : R,
                "aria-valuenow": we,
                "aria-valuemin": w,
                "aria-valuemax": b,
                "aria-valuetext": Ne ? void 0 : `${G}${ye}`,
                "aria-invalid": U || void 0,
                ...m,
                id: c,
                value: G,
                disabled: l,
                onChange: be,
                onKeyDown: ve,
                "aria-describedby": Z(m["aria-describedby"], p && D),
                className: h(
                  "flex-1 min-w-0 h-[60px] m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                  "text-end font-sans text-[length:var(--su-hh-text-big)] leading-[60px] font-semibold su-tabular",
                  "text-inherit caret-transparent disabled:cursor-not-allowed",
                  e
                )
              }
            ),
            l ? null : /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "shrink-0 w-[2px] h-[44px] ms-su1 bg-action forced-colors:bg-[Highlight]" }),
            a != null ? /* @__PURE__ */ n("span", { className: "shrink-0 self-end ms-[10px] text-hh-value font-medium text-ink-2", children: a }) : null
          ]
        }
      );
    }
    return /* @__PURE__ */ g("div", { className: h("flex flex-col font-sans", oe), ...ae, children: [
      H && F ? /* @__PURE__ */ n(F, { className: "m-0 mb-su3", children: H }) : H,
      /* @__PURE__ */ g(
        "div",
        {
          className: h(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            z === "output" ? "items-center" : "items-stretch"
          ),
          children: [
            ge,
            K,
            Ie
          ]
        }
      ),
      p ? /* @__PURE__ */ n(Me, { id: D, children: T }) : null
    ] });
  }
);
export {
  ze as QuantityStepper
};
