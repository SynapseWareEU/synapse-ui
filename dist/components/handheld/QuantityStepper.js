import { jsx as n, jsxs as g } from "react/jsx-runtime";
import { forwardRef as Ie, useId as ke, useState as J } from "react";
import { cn as h } from "../../utils/cn.js";
import { compareDecimal as O, showDecimal as W, decimalText as Q, cleanDecimal as Te, stepDecimal as De } from "./decimal.js";
import { describedBy as X, HandheldErrorLine as Me, hhQuestionClass as $e, hhSecondaryClass as Z, HH_STROKE as C, hhTransition as Se, hhFieldBorder as _e } from "./shared.js";
import Ee from "../../vendor/@tabler/icons-react/dist/esm/icons/IconMinus.js";
import Fe from "../../vendor/@tabler/icons-react/dist/esm/icons/IconPlus.js";
function He(f) {
  if (f == null) return "—";
  const [x, v] = String(f).split("."), i = x.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return v ? `${i},${v}` : i;
}
const V = (f) => f.preventDefault(), ze = Ie(
  function({
    value: x,
    defaultValue: v = null,
    onChange: i,
    decimalValue: y,
    defaultDecimalValue: j,
    onDecimalChange: N,
    decimalSeparator: A = ".",
    scale: P,
    min: B = 0,
    max: I,
    step: q = 1,
    unit: a,
    variant: z = "field",
    label: k,
    labelAs: ee,
    error: T,
    invalid: te,
    disabled: l,
    decrementLabel: ne,
    incrementLabel: se,
    inputProps: o,
    className: re,
    "aria-label": R,
    ...oe
  }, ae) {
    const ie = ke(), c = (o == null ? void 0 : o.id) ?? `su-qty-${ie}`, D = `${c}-error`, [le, ce] = J(v), s = x !== void 0 ? x : le, p = T != null && T !== !1, U = te ?? p, r = y !== void 0 || j !== void 0 || N !== void 0, [de, ue] = J(j ?? ""), t = y !== void 0 ? y : de, M = Q(B) ?? "0", d = Q(I), $ = Q(q) ?? "1", w = Number(B), b = I === void 0 ? void 0 : Number(I), S = Number(q), me = (e) => Math.min(Math.max(e, w), b ?? Number.POSITIVE_INFINITY), Y = (e) => {
      x === void 0 && ce(e), i == null || i(e);
    }, L = (e) => {
      y === void 0 && ue(e), N == null || N(e);
    }, _ = (e) => {
      r ? L(De(t === "" ? M : t, $, e, M, d)) : Y(me((s ?? w) + e * S));
    }, he = r ? t !== "" && O(t, M) <= 0 : s != null && s <= w, fe = r ? t !== "" && d !== void 0 && O(t, d) >= 0 : s != null && b != null && s >= b, xe = (e) => {
      if (r) {
        const m = Te(e.currentTarget.value, P);
        L(
          m !== "" && d !== void 0 && O(m, d) > 0 ? d : m
        );
        return;
      }
      const u = e.currentTarget.value.replace(/\D/g, "");
      Y(u === "" ? null : Math.min(Number(u), b ?? Number.POSITIVE_INFINITY));
    }, be = (e) => {
      var u;
      (u = o == null ? void 0 : o.onKeyDown) == null || u.call(o, e), !e.defaultPrevented && (e.key === "ArrowUp" || e.key === "ArrowDown") && (e.preventDefault(), _(e.key === "ArrowUp" ? 1 : -1));
    }, ve = typeof a == "string" || typeof a == "number" ? ` ${a}` : "", E = k != null && k !== !1, ye = r ? t === "" : s == null, G = r ? W(t, A) : s == null ? "" : String(s), Ne = r ? t === "" ? "—" : W(t, A, !0) : He(s), pe = r ? t === "" ? void 0 : Number(t) : s ?? void 0, F = ee, H = E ? /* @__PURE__ */ n("label", { htmlFor: c, className: h($e, !F && "mb-su3"), children: k }) : null, we = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": ne ?? `Decrease by ${r ? $ : S}`,
        "aria-controls": c,
        disabled: l || he,
        onMouseDown: V,
        onClick: () => _(-1),
        className: Z,
        children: /* @__PURE__ */ n(Ee, { size: 28, stroke: C, "aria-hidden": !0 })
      }
    ), ge = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": se ?? `Increase by ${r ? $ : S}`,
        "aria-controls": c,
        disabled: l || fe,
        onMouseDown: V,
        onClick: () => _(1),
        className: Z,
        children: /* @__PURE__ */ n(Fe, { size: 28, stroke: C, "aria-hidden": !0 })
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
          "aria-describedby": X(p && D),
          className: h(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            l ? "text-ink-3" : "text-ink"
          ),
          children: [
            /* @__PURE__ */ n("span", { className: "text-hh-big font-semibold su-tabular truncate", children: Ne }),
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
                ref: ae,
                type: "text",
                role: "spinbutton",
                inputMode: "none",
                autoComplete: "off",
                "aria-label": E ? void 0 : R,
                "aria-valuenow": pe,
                "aria-valuemin": w,
                "aria-valuemax": b,
                "aria-valuetext": ye ? void 0 : `${G}${ve}`,
                "aria-invalid": U || void 0,
                ...m,
                id: c,
                value: G,
                disabled: l,
                onChange: xe,
                onKeyDown: be,
                "aria-describedby": X(m["aria-describedby"], p && D),
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
    return /* @__PURE__ */ g("div", { className: h("flex flex-col font-sans", re), ...oe, children: [
      H && F ? /* @__PURE__ */ n(F, { className: "m-0 mb-su3", children: H }) : H,
      /* @__PURE__ */ g(
        "div",
        {
          className: h(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            z === "output" ? "items-center" : "items-stretch"
          ),
          children: [
            we,
            K,
            ge
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
