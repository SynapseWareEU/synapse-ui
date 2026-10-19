import { jsx as t, jsxs as o, Fragment as k } from "react/jsx-runtime";
import { useState as g, useEffect as p } from "react";
import { cn as d } from "../../utils/cn.js";
const x = { sm: 14, md: 16, lg: 20 };
function N({ px: e }) {
  const r = e / 2, i = (e - 2) / 2;
  return /* @__PURE__ */ o(
    "svg",
    {
      width: e,
      height: e,
      viewBox: `0 0 ${e} ${e}`,
      fill: "none",
      "aria-hidden": "true",
      className: "shrink-0 animate-spin animate-duration-[800ms] motion-reduce:animate-none",
      children: [
        /* @__PURE__ */ t("circle", { cx: r, cy: r, r: i, strokeWidth: 2, className: "stroke-border" }),
        /* @__PURE__ */ t(
          "circle",
          {
            cx: r,
            cy: r,
            r: i,
            strokeWidth: 2,
            strokeLinecap: "round",
            pathLength: 100,
            strokeDasharray: "25 75",
            className: "stroke-current"
          }
        )
      ]
    }
  );
}
function w({
  spinning: e = !0,
  tip: r,
  size: i = "md",
  delay: s,
  className: c,
  children: l,
  ...u
}) {
  const [f, a] = g(!s);
  p(() => {
    if (!s) {
      a(!0);
      return;
    }
    if (!e) {
      a(!1);
      return;
    }
    const v = setTimeout(() => a(!0), s);
    return () => clearTimeout(v);
  }, [e, s]);
  const n = e && f, h = typeof i == "number" ? i : x[i], m = /* @__PURE__ */ o(k, { children: [
    /* @__PURE__ */ t(N, { px: h }),
    r ? /* @__PURE__ */ t("span", { className: "text-small text-ink-2", children: r }) : /* @__PURE__ */ t("span", { className: "sr-only", children: "Loading" })
  ] });
  return l ? /* @__PURE__ */ o(
    "div",
    {
      className: d("relative", c),
      "aria-busy": n || void 0,
      ...u,
      children: [
        /* @__PURE__ */ t("div", { inert: n || void 0, children: l }),
        n ? /* @__PURE__ */ t(
          "div",
          {
            className: "absolute inset-0 z-[1] flex items-center justify-center gap-su2 rounded-[inherit] bg-surface font-sans text-ink-2",
            role: "status",
            "aria-live": "polite",
            children: m
          }
        ) : null
      ]
    }
  ) : /* @__PURE__ */ t(
    "div",
    {
      className: d("inline-flex items-center justify-center gap-su2 font-sans text-ink-2", c),
      role: "status",
      "aria-live": "polite",
      "aria-busy": n || void 0,
      ...u,
      children: n ? m : null
    }
  );
}
export {
  w as Spin
};
