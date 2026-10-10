import { jsxs as x, jsx as n } from "react/jsx-runtime";
import { forwardRef as W, useId as X, useState as Z } from "react";
import { cn as c } from "../../utils/cn.js";
import { describedBy as T, HandheldErrorLine as P, hhSecondaryClass as _, HH_STROKE as E, hhTransition as ee, hhFieldBorder as te, hhQuestionClass as ne } from "./shared.js";
import ae from "../../vendor/@tabler/icons-react/dist/esm/icons/IconMinus.js";
import re from "../../vendor/@tabler/icons-react/dist/esm/icons/IconPlus.js";
function le(d) {
  if (d == null) return "—";
  const [u, m] = String(d).split("."), l = u.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return m ? `${l},${m}` : l;
}
const F = (d) => d.preventDefault(), he = W(
  function({
    value: u,
    defaultValue: m = null,
    onChange: l,
    min: f = 0,
    max: h,
    step: y = 1,
    unit: r,
    variant: k = "field",
    label: v,
    error: g,
    invalid: K,
    disabled: s,
    decrementLabel: H,
    incrementLabel: Q,
    inputProps: a,
    className: j,
    "aria-label": D,
    ...A
  }, B) {
    const C = X(), o = (a == null ? void 0 : a.id) ?? `su-qty-${C}`, p = `${o}-error`, [O, z] = Z(m), t = u !== void 0 ? u : O, b = g != null && g !== !1, M = K ?? b, R = (e) => Math.min(Math.max(e, f), h ?? Number.POSITIVE_INFINITY), S = (e) => {
      u === void 0 && z(e), l == null || l(e);
    }, N = (e) => S(R((t ?? f) + e * y)), U = t != null && t <= f, V = t != null && h != null && t >= h, Y = (e) => {
      const i = e.currentTarget.value.replace(/\D/g, "");
      S(i === "" ? null : Math.min(Number(i), h ?? Number.POSITIVE_INFINITY));
    }, q = (e) => {
      var i;
      (i = a == null ? void 0 : a.onKeyDown) == null || i.call(a, e), !e.defaultPrevented && (e.key === "ArrowUp" || e.key === "ArrowDown") && (e.preventDefault(), N(e.key === "ArrowUp" ? 1 : -1));
    }, L = typeof r == "string" || typeof r == "number" ? ` ${r}` : "", I = v != null && v !== !1, G = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": H ?? `Decrease by ${y}`,
        "aria-controls": o,
        disabled: s || U,
        onMouseDown: F,
        onClick: () => N(-1),
        className: _,
        children: /* @__PURE__ */ n(ae, { size: 28, stroke: E, "aria-hidden": !0 })
      }
    ), J = /* @__PURE__ */ n(
      "button",
      {
        type: "button",
        "aria-label": Q ?? `Increase by ${y}`,
        "aria-controls": o,
        disabled: s || V,
        onMouseDown: F,
        onClick: () => N(1),
        className: _,
        children: /* @__PURE__ */ n(re, { size: 28, stroke: E, "aria-hidden": !0 })
      }
    );
    let w;
    if (k === "output")
      w = /* @__PURE__ */ x(
        "output",
        {
          id: o,
          "aria-live": "polite",
          "aria-label": I ? void 0 : D,
          "aria-describedby": T(b && p),
          className: c(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            s ? "text-ink-3" : "text-ink"
          ),
          children: [
            /* @__PURE__ */ n("span", { className: "text-hh-big font-semibold su-tabular truncate", children: le(t) }),
            r != null ? /* @__PURE__ */ n("span", { className: "shrink-0 text-hh-key text-ink-2", children: r }) : null
          ]
        }
      );
    else {
      const { className: e, onKeyDown: i, ...$ } = a ?? {};
      w = /* @__PURE__ */ x(
        "div",
        {
          className: c(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            te({ invalid: M, disabled: s, active: !0 }),
            ee
          ),
          children: [
            /* @__PURE__ */ n(
              "input",
              {
                ref: B,
                type: "text",
                role: "spinbutton",
                inputMode: "none",
                autoComplete: "off",
                "aria-label": I ? void 0 : D,
                "aria-valuenow": t ?? void 0,
                "aria-valuemin": f,
                "aria-valuemax": h,
                "aria-valuetext": t != null ? `${t}${L}` : void 0,
                "aria-invalid": M || void 0,
                ...$,
                id: o,
                value: t == null ? "" : String(t),
                disabled: s,
                onChange: Y,
                onKeyDown: q,
                "aria-describedby": T($["aria-describedby"], b && p),
                className: c(
                  "flex-1 min-w-0 h-[60px] m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                  "text-end font-sans text-[length:var(--su-hh-text-big)] leading-[60px] font-semibold su-tabular",
                  "text-inherit caret-transparent disabled:cursor-not-allowed",
                  e
                )
              }
            ),
            s ? null : /* @__PURE__ */ n("span", { "aria-hidden": !0, className: "shrink-0 w-[2px] h-[44px] ms-su1 bg-action forced-colors:bg-[Highlight]" }),
            r != null ? /* @__PURE__ */ n("span", { className: "shrink-0 self-end ms-[10px] text-hh-value font-medium text-ink-2", children: r }) : null
          ]
        }
      );
    }
    return /* @__PURE__ */ x("div", { className: c("flex flex-col font-sans", j), ...A, children: [
      I ? /* @__PURE__ */ n("label", { htmlFor: o, className: c(ne, "mb-su3"), children: v }) : null,
      /* @__PURE__ */ x(
        "div",
        {
          className: c(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            k === "output" ? "items-center" : "items-stretch"
          ),
          children: [
            G,
            w,
            J
          ]
        }
      ),
      b ? /* @__PURE__ */ n(P, { id: p, children: g }) : null
    ] });
  }
);
export {
  he as QuantityStepper
};
