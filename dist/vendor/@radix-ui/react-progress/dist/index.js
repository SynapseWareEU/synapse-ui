import * as f from "react";
import { createContextScope as $ } from "../../react-context/dist/index.js";
import { Primitive as g } from "../../react-primitive/dist/index.js";
import { jsx as d } from "react/jsx-runtime";
var E = Object.defineProperty, o = (r, e) => E(r, "name", { value: e, configurable: !0 }), P = "Progress", m = 100, [M, w] = $(P), [h, R] = M(P), S = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ o(function(e, u) {
    const {
      __scopeProgress: l,
      value: t = null,
      max: a,
      getValueLabel: N = x,
      ...V
    } = e;
    (a || a === 0) && !v(a) && console.error(b(`${a}`, "Progress"));
    const n = v(a) ? a : m;
    t !== null && !c(t, n) && console.error(I(`${t}`, "Progress"));
    const s = c(t, n) ? t : null, _ = i(s) ? N(s, n) : void 0;
    return /* @__PURE__ */ d(h, { scope: l, value: s, max: n, children: /* @__PURE__ */ d(
      g.div,
      {
        "aria-valuemax": n,
        "aria-valuemin": 0,
        "aria-valuenow": i(s) ? s : void 0,
        "aria-valuetext": _,
        role: "progressbar",
        "data-state": p(s, n),
        "data-value": s ?? void 0,
        "data-max": n,
        ...V,
        ref: u
      }
    ) });
  }, "Progress")
), A = "ProgressIndicator", L = /* @__PURE__ */ f.forwardRef(
  // blank line to reduce diff noise
  /* @__PURE__ */ o(function(e, u) {
    const { __scopeProgress: l, ...t } = e, a = R(A, l);
    return /* @__PURE__ */ d(
      g.div,
      {
        "data-state": p(a.value, a.max),
        "data-value": a.value ?? void 0,
        "data-max": a.max,
        ...t,
        ref: u
      }
    );
  }, "ProgressIndicator")
);
function x(r, e) {
  return `${Math.round(r / e * 100)}%`;
}
o(x, "defaultGetValueLabel");
function p(r, e) {
  return r == null ? "indeterminate" : r === e ? "complete" : "loading";
}
o(p, "getProgressState");
function i(r) {
  return typeof r == "number";
}
o(i, "isNumber");
function v(r) {
  return i(r) && !isNaN(r) && r > 0;
}
o(v, "isValidMaxNumber");
function c(r, e) {
  return i(r) && !isNaN(r) && r <= e && r >= 0;
}
o(c, "isValidValueNumber");
function b(r, e) {
  return `Invalid prop \`max\` of value \`${r}\` supplied to \`${e}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${m}\`.`;
}
o(b, "getInvalidMaxError");
function I(r, e) {
  return `Invalid prop \`value\` of value \`${r}\` supplied to \`${e}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${m} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
o(I, "getInvalidValueError");
var y = S, G = L;
export {
  G as Indicator,
  S as Progress,
  L as ProgressIndicator,
  y as Root,
  w as createProgressScope
};
