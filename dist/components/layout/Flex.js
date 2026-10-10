import { jsx as C } from "react/jsx-runtime";
import { forwardRef as I } from "react";
import { cn as E } from "../../utils/cn.js";
import { space as P, ALIGN_CLASS as l, GAP_CLASS as R } from "../../utils/space.js";
import { SPACE_PRESET as T } from "./Space.js";
const c = {
  row: "flex-row",
  column: "flex-col",
  "row-reverse": "flex-row-reverse",
  "column-reverse": "flex-col-reverse"
}, a = {
  start: "justify-start",
  "flex-start": "justify-start",
  center: "justify-center",
  end: "justify-end",
  "flex-end": "justify-end",
  "space-between": "justify-between",
  "space-around": "justify-around",
  "space-evenly": "justify-evenly"
}, d = {
  wrap: "flex-wrap",
  nowrap: "flex-nowrap",
  "wrap-reverse": "flex-wrap-reverse"
}, G = I(function({
  direction: p,
  vertical: v,
  align: r,
  justify: o,
  wrap: f,
  gap: e,
  inline: x = !1,
  as: m,
  className: u,
  style: w,
  children: y,
  ...S
}, j) {
  const A = m ?? "div", t = p ?? (v ? "column" : void 0), s = f === !0 ? "wrap" : f === !1 ? "nowrap" : f, n = typeof e == "number" ? Math.max(0, e) : typeof e == "string" ? T[e] : void 0, i = n === void 0 ? void 0 : R[n];
  return /* @__PURE__ */ C(
    A,
    {
      ref: j,
      className: E(
        x ? "inline-flex" : "flex",
        t && c[t],
        r && l[r],
        o && a[o],
        s && d[s],
        i,
        u
      ),
      style: {
        flexDirection: t && !c[t] ? t : void 0,
        alignItems: r && !l[r] ? r : void 0,
        justifyContent: o && !a[o] ? o : void 0,
        flexWrap: s && !d[s] ? s : void 0,
        gap: i ? void 0 : n !== void 0 ? P(n) : typeof e == "string" ? e : void 0,
        // style wins over the props above, matching Space/Grid.
        ...w
      },
      ...S,
      children: y
    }
  );
});
export {
  G as Flex
};
