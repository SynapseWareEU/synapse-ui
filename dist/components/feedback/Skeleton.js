import { jsx as t, Fragment as v, jsxs as k } from "react/jsx-runtime";
import { cn as s } from "../../utils/cn.js";
function N(n, u) {
  return u ? "rounded-su-round" : typeof n == "number" && n <= 16 ? "rounded-su-tag" : "rounded-su-control";
}
function F({
  active: n = !0,
  width: u,
  height: r = 12,
  circle: a = !1,
  rows: e,
  loading: x,
  label: l = "Loading",
  children: y,
  className: o,
  style: d,
  ...i
}) {
  if (x === !1) return /* @__PURE__ */ t(v, { children: y });
  const f = s("bg-fill", N(r, a), n && "su-skeleton-active"), c = l == null ? { "aria-hidden": !0 } : { role: "status", "aria-busy": !0 }, m = l == null ? null : /* @__PURE__ */ t("span", { className: "sr-only", children: l });
  return e && e > 1 ? /* @__PURE__ */ k(
    "div",
    {
      className: s("w-full flex flex-col gap-su2", o),
      style: d,
      ...c,
      ...i,
      children: [
        m,
        Array.from({ length: e }).map((b, p) => /* @__PURE__ */ t(
          "div",
          {
            "aria-hidden": "true",
            className: f,
            style: { width: p === e - 1 ? "70%" : "100%", height: r }
          },
          p
        ))
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: s(f, o),
      style: { width: a ? r : u, height: r, ...d },
      ...c,
      ...i,
      children: m
    }
  );
}
export {
  F as Skeleton
};
