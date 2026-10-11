import { jsx as t, jsxs as I } from "react/jsx-runtime";
import { forwardRef as Se, useId as $e, useState as W } from "react";
import { cn as m } from "../../utils/cn.js";
import { cleanDecimal as X, decimalText as O, compareDecimal as Q, showDecimal as Z, stepDecimal as De } from "./decimal.js";
import { describedBy as C, HandheldErrorLine as Me, hhQuestionClass as Fe, hhSecondaryClass as V, HH_STROKE as P, hhTransition as _e, hhFieldBorder as Ee } from "./shared.js";
import He from "../../vendor/@tabler/icons-react/dist/esm/icons/IconMinus.js";
import Ke from "../../vendor/@tabler/icons-react/dist/esm/icons/IconPlus.js";
function ze(h) {
  if (h == null) return "—";
  const [f, b] = String(h).split("."), l = f.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return b ? `${l},${b}` : l;
}
const ee = (h) => h.preventDefault(), Ue = Se(
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
    max: k,
    step: B = 1,
    unit: i,
    variant: R = "field",
    label: T,
    labelAs: ne,
    error: S,
    invalid: se,
    disabled: c,
    decrementLabel: oe,
    incrementLabel: re,
    inputProps: r,
    className: ie,
    "aria-label": U,
    ...ae
  }, le) {
    const ce = $e(), d = (r == null ? void 0 : r.id) ?? `su-qty-${ce}`, $ = `${d}-error`, [de, ue] = W(b), s = f !== void 0 ? f : de, p = S != null && S !== !1, Y = se ?? p, o = v !== void 0 || j !== void 0 || y !== void 0, [me, he] = W(j ?? ""), n = X(v !== void 0 ? v : me), D = O(A) ?? "0", u = O(k), M = O(B) ?? "1", N = Number(A), x = k === void 0 ? void 0 : Number(k), F = Number(B), fe = (e) => Math.min(Math.max(e, N), x ?? Number.POSITIVE_INFINITY), L = (e) => {
      f === void 0 && ue(e), l == null || l(e);
    }, G = (e) => {
      v === void 0 && he(e), y == null || y(e);
    }, _ = (e) => {
      o ? G(De(n === "" ? D : n, M, e, D, u)) : L(fe((s ?? N) + e * F));
    }, xe = o ? n !== "" && Q(n, D) <= 0 : s != null && s <= N, be = o ? n !== "" && u !== void 0 && Q(n, u) >= 0 : s != null && x != null && s >= x, ve = (e) => {
      if (o) {
        const w = X(e.currentTarget.value, te);
        G(
          w !== "" && u !== void 0 && Q(w, u) > 0 ? u : w
        );
        return;
      }
      const a = e.currentTarget.value.replace(/\D/g, "");
      L(a === "" ? null : Math.min(Number(a), x ?? Number.POSITIVE_INFINITY));
    }, ye = (e) => {
      var a;
      (a = r == null ? void 0 : r.onKeyDown) == null || a.call(r, e), !e.defaultPrevented && (e.key === "ArrowUp" || e.key === "ArrowDown") && (e.preventDefault(), _(e.key === "ArrowUp" ? 1 : -1));
    }, pe = typeof i == "string" || typeof i == "number" ? ` ${i}` : "", E = T != null && T !== !1, Ne = o ? n === "" : s == null, g = o ? Z(n, q) : s == null ? "" : String(s), ge = o ? n === "" ? "—" : Z(n, q, !0) : ze(s), we = o ? n === "" ? void 0 : Number(n) : s ?? void 0, H = ne, K = E ? /* @__PURE__ */ t("label", { htmlFor: d, className: m(Fe, !H && "mb-su3"), children: T }) : null, Ie = /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": oe ?? `Decrease by ${o ? M : F}`,
        "aria-controls": d,
        disabled: c || xe,
        onMouseDown: ee,
        onClick: () => _(-1),
        className: V,
        children: /* @__PURE__ */ t(He, { size: 28, stroke: P, "aria-hidden": !0 })
      }
    ), ke = /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        "aria-label": re ?? `Increase by ${o ? M : F}`,
        "aria-controls": d,
        disabled: c || be,
        onMouseDown: ee,
        onClick: () => _(1),
        className: V,
        children: /* @__PURE__ */ t(Ke, { size: 28, stroke: P, "aria-hidden": !0 })
      }
    );
    let z;
    if (R === "output")
      z = /* @__PURE__ */ I(
        "output",
        {
          id: d,
          "aria-live": "polite",
          "aria-label": E ? void 0 : U,
          "aria-describedby": C(p && $),
          className: m(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            c ? "text-ink-3" : "text-ink"
          ),
          children: [
            /* @__PURE__ */ t("span", { className: "text-hh-big font-semibold su-tabular truncate", children: ge }),
            i != null ? /* @__PURE__ */ t("span", { className: "shrink-0 text-hh-key text-ink-2", children: i }) : null
          ]
        }
      );
    else {
      const { className: e, style: a, onKeyDown: w, ...J } = r ?? {}, Te = g.length > 0 ? {
        fontSize: `max(var(--su-hh-text-body), min(var(--su-hh-text-big), calc(100cqw / ${(g.length * 0.62).toFixed(2)})))`
      } : void 0;
      z = /* @__PURE__ */ I(
        "div",
        {
          className: m(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            Ee({ invalid: Y, disabled: c, active: !0 }),
            _e
          ),
          children: [
            /* @__PURE__ */ t("span", { className: "flex flex-1 min-w-0 [container-type:inline-size]", children: /* @__PURE__ */ t(
              "input",
              {
                ref: le,
                type: "text",
                role: "spinbutton",
                inputMode: "none",
                autoComplete: "off",
                "aria-label": E ? void 0 : U,
                "aria-valuenow": we,
                "aria-valuemin": N,
                "aria-valuemax": x,
                "aria-valuetext": Ne ? void 0 : `${g}${pe}`,
                "aria-invalid": Y || void 0,
                ...J,
                id: d,
                value: g,
                disabled: c,
                onChange: ve,
                onKeyDown: ye,
                "aria-describedby": C(J["aria-describedby"], p && $),
                style: { ...Te, ...a },
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
    return /* @__PURE__ */ I("div", { className: m("flex flex-col font-sans", ie), ...ae, children: [
      K && H ? /* @__PURE__ */ t(H, { className: "m-0 mb-su3", children: K }) : K,
      /* @__PURE__ */ I(
        "div",
        {
          className: m(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            R === "output" ? "items-center" : "items-stretch"
          ),
          children: [
            Ie,
            z,
            ke
          ]
        }
      ),
      p ? /* @__PURE__ */ t(Me, { id: $, children: S }) : null
    ] });
  }
);
export {
  Ue as QuantityStepper
};
