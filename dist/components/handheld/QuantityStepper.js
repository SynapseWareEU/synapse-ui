import { jsx as t, jsxs as k } from "react/jsx-runtime";
import { forwardRef as $e, useId as De, useState as W } from "react";
import { cn as m } from "../../utils/cn.js";
import { cleanDecimal as X, decimalText as O, compareDecimal as Q, showDecimal as Z, stepDecimal as Me } from "./decimal.js";
import { describedBy as C, HandheldErrorLine as Fe, hhQuestionClass as _e, hhSecondaryClass as V, HH_STROKE as P, hhTransition as Ee, hhFieldBorder as He } from "./shared.js";
import Ke from "../../vendor/@tabler/icons-react/dist/esm/icons/IconMinus.js";
import ze from "../../vendor/@tabler/icons-react/dist/esm/icons/IconPlus.js";
function Oe(h) {
  if (h == null) return "—";
  const [f, b] = String(h).split("."), l = f.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return b ? `${l},${b}` : l;
}
const ee = (h) => h.preventDefault(), Ye = $e(
  function({
    value: f,
    defaultValue: b = null,
    onChange: l,
    decimalValue: v,
    defaultDecimalValue: j,
    onDecimalChange: y,
    decimalSeparator: q = ".",
    scale: te,
    min: A = 0,
    max: T,
    step: B = 1,
    stepButtons: ne = !0,
    unit: i,
    variant: R = "field",
    label: S,
    labelAs: se,
    error: $,
    invalid: re,
    disabled: c,
    decrementLabel: oe,
    incrementLabel: ie,
    inputProps: o,
    className: ae,
    "aria-label": U,
    ...le
  }, ce) {
    const de = De(), d = (o == null ? void 0 : o.id) ?? `su-qty-${de}`, D = `${d}-error`, [ue, me] = W(b), s = f !== void 0 ? f : ue, p = $ != null && $ !== !1, Y = re ?? p, r = v !== void 0 || j !== void 0 || y !== void 0, [he, fe] = W(j ?? ""), n = X(v !== void 0 ? v : he), M = O(A) ?? "0", u = O(T), F = O(B) ?? "1", N = Number(A), x = T === void 0 ? void 0 : Number(T), _ = Number(B), xe = (e) => Math.min(Math.max(e, N), x ?? Number.POSITIVE_INFINITY), L = (e) => {
      f === void 0 && me(e), l == null || l(e);
    }, G = (e) => {
      v === void 0 && fe(e), y == null || y(e);
    }, E = (e) => {
      r ? G(Me(n === "" ? M : n, F, e, M, u)) : L(xe((s ?? N) + e * _));
    }, be = r ? n !== "" && Q(n, M) <= 0 : s != null && s <= N, ve = r ? n !== "" && u !== void 0 && Q(n, u) >= 0 : s != null && x != null && s >= x, ye = (e) => {
      if (r) {
        const I = X(e.currentTarget.value, te);
        G(
          I !== "" && u !== void 0 && Q(I, u) > 0 ? u : I
        );
        return;
      }
      const a = e.currentTarget.value.replace(/\D/g, "");
      L(a === "" ? null : Math.min(Number(a), x ?? Number.POSITIVE_INFINITY));
    }, pe = (e) => {
      var a;
      (a = o == null ? void 0 : o.onKeyDown) == null || a.call(o, e), !e.defaultPrevented && (e.key === "ArrowUp" || e.key === "ArrowDown") && (e.preventDefault(), E(e.key === "ArrowUp" ? 1 : -1));
    }, Ne = typeof i == "string" || typeof i == "number" ? ` ${i}` : "", H = S != null && S !== !1, ge = r ? n === "" : s == null, g = r ? Z(n, q) : s == null ? "" : String(s), we = r ? n === "" ? "—" : Z(n, q, !0) : Oe(s), Ie = r ? n === "" ? void 0 : Number(n) : s ?? void 0, K = se, z = H ? /* @__PURE__ */ t("label", { htmlFor: d, className: m(_e, !K && "mb-su3"), children: S }) : null, ke = /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": oe ?? `Decrease by ${r ? F : _}`,
        "aria-controls": d,
        disabled: c || be,
        onMouseDown: ee,
        onClick: () => E(-1),
        className: V,
        children: /* @__PURE__ */ t(Ke, { size: 28, stroke: P, "aria-hidden": !0 })
      }
    ), Te = /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": ie ?? `Increase by ${r ? F : _}`,
        "aria-controls": d,
        disabled: c || ve,
        onMouseDown: ee,
        onClick: () => E(1),
        className: V,
        children: /* @__PURE__ */ t(ze, { size: 28, stroke: P, "aria-hidden": !0 })
      }
    );
    let w;
    if (R === "output")
      w = /* @__PURE__ */ k(
        "output",
        {
          id: d,
          "aria-live": "polite",
          "aria-label": H ? void 0 : U,
          "aria-describedby": C(p && D),
          className: m(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            c ? "text-ink-3" : "text-ink"
          ),
          children: [
            /* @__PURE__ */ t("span", { className: "text-hh-big font-semibold su-tabular truncate", children: we }),
            i != null ? /* @__PURE__ */ t("span", { className: "shrink-0 text-hh-key text-ink-2", children: i }) : null
          ]
        }
      );
    else {
      const { className: e, style: a, onKeyDown: I, ...J } = o ?? {}, Se = g.length > 0 ? {
        fontSize: `max(var(--su-hh-text-body), min(var(--su-hh-text-big), calc(100cqw / ${(g.length * 0.62).toFixed(2)})))`
      } : void 0;
      w = /* @__PURE__ */ k(
        "div",
        {
          className: m(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            He({ invalid: Y, disabled: c, active: !0 }),
            Ee
          ),
          children: [
            /* @__PURE__ */ t("span", { className: "flex flex-1 min-w-0 [container-type:inline-size]", children: /* @__PURE__ */ t(
              "input",
              {
                ref: ce,
                type: "text",
                role: "spinbutton",
                inputMode: "none",
                autoComplete: "off",
                "aria-label": H ? void 0 : U,
                "aria-valuenow": Ie,
                "aria-valuemin": N,
                "aria-valuemax": x,
                "aria-valuetext": ge ? void 0 : `${g}${Ne}`,
                "aria-invalid": Y || void 0,
                ...J,
                id: d,
                value: g,
                disabled: c,
                onChange: ye,
                onKeyDown: pe,
                "aria-describedby": C(J["aria-describedby"], p && D),
                style: { ...Se, ...a },
                className: m(
                  "flex-1 min-w-0 h-[60px] m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                  "text-end font-sans text-[length:var(--su-hh-text-big)] leading-[60px] font-semibold su-tabular",
                  "text-inherit caret-transparent disabled:cursor-not-allowed",
                  e
                )
              }
            ) }),
            c ? null : /* @__PURE__ */ t("span", { "aria-hidden": !0, className: "shrink-0 w-[2px] h-[44px] ms-su1 bg-action forced-colors:bg-[Highlight]" }),
            i != null ? /* @__PURE__ */ t("span", { className: "shrink-0 self-end ms-[10px] text-hh-value font-medium text-ink-2", children: i }) : null
          ]
        }
      );
    }
    return /* @__PURE__ */ k("div", { className: m("flex flex-col font-sans", ae), ...le, children: [
      z && K ? /* @__PURE__ */ t(K, { className: "m-0 mb-su3", children: z }) : z,
      ne ? /* @__PURE__ */ k(
        "div",
        {
          className: m(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            R === "output" ? "items-center" : "items-stretch"
          ),
          children: [
            ke,
            w,
            Te
          ]
        }
      ) : w,
      p ? /* @__PURE__ */ t(Fe, { id: D, children: $ }) : null
    ] });
  }
);
export {
  Ye as QuantityStepper
};
