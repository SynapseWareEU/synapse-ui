import { jsx as n, jsxs as S } from "react/jsx-runtime";
import { forwardRef as Fe, useId as _e, useState as Z } from "react";
import { cn as m } from "../../utils/cn.js";
import { cleanDecimal as C, decimalText as q, compareDecimal as A, showDecimal as V, stepDecimal as Ee } from "./decimal.js";
import { describedBy as P, HandheldErrorLine as He, hhQuestionClass as Ke, hhSecondaryClass as ee, HH_STROKE as te, hhTransition as ze, hhFieldBorder as Oe } from "./shared.js";
import Qe from "../../vendor/@tabler/icons-react/dist/esm/icons/IconMinus.js";
import je from "../../vendor/@tabler/icons-react/dist/esm/icons/IconPlus.js";
function qe(h) {
  if (h == null) return "—";
  const [f, b] = String(h).split("."), l = f.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return b ? `${l},${b}` : l;
}
const ne = (h) => h.preventDefault(), Je = Fe(
  function({
    value: f,
    defaultValue: b = null,
    onChange: l,
    decimalValue: v,
    defaultDecimalValue: B,
    onDecimalChange: y,
    decimalSeparator: R = ".",
    scale: se,
    keepTyped: N = !1,
    min: U = 0,
    max: $,
    step: Y = 1,
    stepButtons: re = !0,
    unit: a,
    variant: L = "field",
    label: D,
    labelAs: oe,
    error: M,
    invalid: ae,
    disabled: c,
    decrementLabel: ie,
    incrementLabel: le,
    inputProps: o,
    className: ce,
    "aria-label": G,
    ...de
  }, ue) {
    const me = _e(), d = (o == null ? void 0 : o.id) ?? `su-qty-${me}`, F = `${d}-error`, [he, fe] = Z(b), r = f !== void 0 ? f : he, p = M != null && M !== !1, J = ae ?? p, s = v !== void 0 || B !== void 0 || y !== void 0, [xe, be] = Z(B ?? ""), g = v !== void 0 ? v : xe, t = C(g), _ = q(U) ?? "0", u = q($), E = q(Y) ?? "1", w = Number(U), x = $ === void 0 ? void 0 : Number($), H = Number(Y), ve = (e) => Math.min(Math.max(e, w), x ?? Number.POSITIVE_INFINITY), W = (e) => {
      f === void 0 && fe(e), l == null || l(e);
    }, K = (e) => {
      v === void 0 && be(e), y == null || y(e);
    }, z = (e) => {
      s ? K(Ee(t === "" ? _ : t, E, e, _, u)) : W(ve((r ?? w) + e * H));
    }, ye = s ? t !== "" && A(t, _) <= 0 : r != null && r <= w, Ne = s ? t !== "" && u !== void 0 && A(t, u) >= 0 : r != null && x != null && r >= x, pe = (e) => {
      if (s && N) {
        K(e.currentTarget.value);
        return;
      }
      if (s) {
        const k = C(e.currentTarget.value, se);
        K(
          k !== "" && u !== void 0 && A(k, u) > 0 ? u : k
        );
        return;
      }
      const i = e.currentTarget.value.replace(/\D/g, "");
      W(i === "" ? null : Math.min(Number(i), x ?? Number.POSITIVE_INFINITY));
    }, ge = (e) => {
      var i;
      (i = o == null ? void 0 : o.onKeyDown) == null || i.call(o, e), !e.defaultPrevented && (e.key === "ArrowUp" || e.key === "ArrowDown") && (e.preventDefault(), z(e.key === "ArrowUp" ? 1 : -1));
    }, we = typeof a == "string" || typeof a == "number" ? ` ${a}` : "", O = D != null && D !== !1, Ie = s ? N ? g === "" : t === "" : r == null, I = s ? N ? g : V(t, R) : r == null ? "" : String(r), Te = s ? t === "" ? "—" : V(t, R, !0) : qe(r), ke = !N || g.replace(",", ".") === t, Se = s ? t === "" || !ke ? void 0 : Number(t) : r ?? void 0, Q = oe, j = O ? /* @__PURE__ */ n("label", { htmlFor: d, className: m(Ke, !Q && "mb-su3"), children: D }) : null, $e = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": ie ?? `Decrease by ${s ? E : H}`,
        "aria-controls": d,
        disabled: c || ye,
        onMouseDown: ne,
        onClick: () => z(-1),
        className: ee,
        children: /* @__PURE__ */ n(Qe, { size: 28, stroke: te, "aria-hidden": !0 })
      }
    ), De = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": le ?? `Increase by ${s ? E : H}`,
        "aria-controls": d,
        disabled: c || Ne,
        onMouseDown: ne,
        onClick: () => z(1),
        className: ee,
        children: /* @__PURE__ */ n(je, { size: 28, stroke: te, "aria-hidden": !0 })
      }
    );
    let T;
    if (L === "output")
      T = /* @__PURE__ */ S(
        "output",
        {
          id: d,
          "aria-live": "polite",
          "aria-label": O ? void 0 : G,
          "aria-describedby": P(p && F),
          className: m(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            c ? "text-ink-3" : "text-ink"
          ),
          children: [
            /* @__PURE__ */ n("span", { className: "text-hh-big font-semibold su-tabular truncate", children: Te }),
            a != null ? /* @__PURE__ */ n("span", { className: "shrink-0 text-hh-key text-ink-2", children: a }) : null
          ]
        }
      );
    else {
      const { className: e, style: i, onKeyDown: k, ...X } = o ?? {}, Me = I.length > 0 ? {
        fontSize: `max(var(--su-hh-text-body), min(var(--su-hh-text-big), calc(100cqw / ${(I.length * 0.62).toFixed(2)})))`
      } : void 0;
      T = /* @__PURE__ */ S(
        "div",
        {
          className: m(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            Oe({ invalid: J, disabled: c, active: !0 }),
            ze
          ),
          children: [
            /* @__PURE__ */ n("span", { className: "flex flex-1 min-w-0 [container-type:inline-size]", children: /* @__PURE__ */ n(
              "input",
              {
                ref: ue,
                type: "text",
                role: "spinbutton",
                inputMode: "none",
                autoComplete: "off",
                "aria-label": O ? void 0 : G,
                "aria-valuenow": Se,
                "aria-valuemin": w,
                "aria-valuemax": x,
                "aria-valuetext": Ie ? void 0 : `${I}${we}`,
                "aria-invalid": J || void 0,
                ...X,
                id: d,
                value: I,
                disabled: c,
                onChange: pe,
                onKeyDown: ge,
                "aria-describedby": P(X["aria-describedby"], p && F),
                style: { ...Me, ...i },
                className: m(
                  "flex-1 min-w-0 h-[60px] m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                  "text-end font-sans text-[length:var(--su-hh-text-big)] leading-[60px] font-semibold su-tabular",
                  "text-inherit caret-transparent disabled:cursor-not-allowed",
                  e
                )
              }
            ) }),
            c ? null : /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "shrink-0 w-[2px] h-[44px] ms-su1 bg-action forced-colors:bg-[Highlight]" }),
            a != null ? /* @__PURE__ */ n("span", { className: "shrink-0 self-end ms-[10px] text-hh-value font-medium text-ink-2", children: a }) : null
          ]
        }
      );
    }
    return /* @__PURE__ */ S("div", { className: m("flex flex-col font-sans", ce), ...de, children: [
      j && Q ? /* @__PURE__ */ n(Q, { className: "m-0 mb-su3", children: j }) : j,
      re ? /* @__PURE__ */ S(
        "div",
        {
          className: m(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            L === "output" ? "items-center" : "items-stretch"
          ),
          children: [
            $e,
            T,
            De
          ]
        }
      ) : T,
      p ? /* @__PURE__ */ n(He, { id: F, children: M }) : null
    ] });
  }
);
export {
  Je as QuantityStepper
};
