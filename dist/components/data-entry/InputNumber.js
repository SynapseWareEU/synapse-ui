import { jsx as b } from "react/jsx-runtime";
import { useState as v, useCallback as L } from "react";
import { cn as g } from "../../utils/cn.js";
import { Input as q } from "./Input.js";
function A(l, i, e) {
  let t = l;
  return i != null && t < i && (t = i), e != null && t > e && (t = e), t;
}
function C(l) {
  const [i, e] = String(l).toLowerCase().split("e"), t = (i.split(".")[1] ?? "").length;
  return Math.min(100, Math.max(0, t - Number(e ?? 0)));
}
function x(l, i, e, t) {
  return Number(A(l, i, e).toFixed(C(t)));
}
function O({
  value: l,
  defaultValue: i,
  min: e,
  max: t,
  step: c = 1,
  disabled: I,
  size: h,
  className: k,
  suffix: M,
  onChange: s,
  id: S,
  onBlur: a,
  onKeyDown: f,
  ...j
}) {
  const [w, z] = v(i), [E, p] = v(null), o = l !== void 0, n = o ? l : w, m = L(
    (r) => {
      o || z(r), s == null || s(r);
    },
    [o, s]
  ), F = (r) => {
    const u = r.target.value;
    if (p(u), u === "" || u === "-") {
      m(void 0);
      return;
    }
    const N = Number(u);
    Number.isNaN(N) || m(N);
  }, d = () => {
    if (p(null), n != null) {
      const r = x(n, e, t, c);
      r !== n && m(r);
    }
  };
  return /* @__PURE__ */ b("div", { className: g("w-[160px] max-w-full", k), children: /* @__PURE__ */ b(
    q,
    {
      ...j,
      type: "number",
      id: S,
      size: h,
      disabled: I,
      suffix: M,
      value: E ?? n ?? "",
      min: e,
      max: t,
      step: c,
      onChange: F,
      onBlur: (r) => {
        d(), a == null || a(r);
      },
      onKeyDown: (r) => {
        r.key === "Enter" && (n != null && x(n, e, t, c) !== n && r.preventDefault(), d()), f == null || f(r);
      }
    }
  ) });
}
export {
  O as InputNumber
};
