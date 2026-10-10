import { jsx as u, Fragment as b, jsxs as y } from "react/jsx-runtime";
import { cn as t } from "../../utils/cn.js";
function x(r, a) {
  return a ? "rounded-su-round" : typeof r == "number" && r <= 16 ? "rounded-su-tag" : "rounded-su-control";
}
function g({
  active: r = !0,
  width: a,
  height: e = 12,
  circle: l = !1,
  rows: n,
  loading: m,
  children: p,
  className: s,
  style: o,
  ...d
}) {
  if (m === !1) return /* @__PURE__ */ u(b, { children: p });
  const i = t("bg-fill", x(e, l), r && "su-skeleton-active"), f = /* @__PURE__ */ u("span", { className: "sr-only", children: "Loading" });
  return n && n > 1 ? /* @__PURE__ */ y(
    "div",
    {
      className: t("w-full flex flex-col gap-su2", s),
      style: o,
      role: "status",
      "aria-busy": "true",
      ...d,
      children: [
        f,
        Array.from({ length: n }).map((v, c) => /* @__PURE__ */ u(
          "div",
          {
            "aria-hidden": "true",
            className: i,
            style: { width: c === n - 1 ? "70%" : "100%", height: e }
          },
          c
        ))
      ]
    }
  ) : /* @__PURE__ */ u(
    "div",
    {
      className: t(i, s),
      style: { width: l ? e : a, height: e, ...o },
      role: "status",
      "aria-busy": "true",
      ...d,
      children: f
    }
  );
}
export {
  g as Skeleton
};
