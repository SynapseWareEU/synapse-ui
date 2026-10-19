import { jsx as d } from "react/jsx-runtime";
import { forwardRef as L, Children as N } from "react";
import { cn as P } from "../../utils/cn.js";
import { ALIGN_CLASS as u, space as _, GAP_CLASS as g } from "../../utils/space.js";
const R = { small: 2, middle: 4, large: 6 }, j = R, S = (o) => typeof o == "number" ? o : j[o] ?? o, s = (o) => typeof o == "number" ? _(o) : o, Y = L(function({
  size: r = "middle",
  direction: v = "horizontal",
  orientation: y,
  vertical: A,
  align: e,
  wrap: x = !1,
  separator: l,
  block: C = !1,
  className: w,
  children: c,
  style: E,
  ...G
}, b) {
  const a = A ?? (y ?? v) === "vertical", [h, I] = Array.isArray(r) ? r : [r, r], t = S(h), m = S(I), n = t === m, p = n && typeof t == "number" ? g[t] : void 0;
  return /* @__PURE__ */ d(
    "div",
    {
      ref: b,
      className: P(
        C ? "flex w-full" : "inline-flex",
        a && "flex-col",
        e ? u[e] : a ? "items-start" : "items-center",
        x && !a && "flex-wrap",
        p,
        w
      ),
      style: {
        gap: p || !n ? void 0 : s(t),
        columnGap: n ? void 0 : s(t),
        rowGap: n ? void 0 : s(m),
        alignItems: e && !u[e] ? e : void 0,
        // style wins over the props above, matching Flex/Grid.
        ...E
      },
      ...G,
      children: l == null ? c : N.toArray(c).flatMap(
        (f, i) => i === 0 ? [f] : [
          // `contents` keeps the separator itself the flex item, so a
          // `<Divider orientation="vertical">` (1×20) centres on the row.
          /* @__PURE__ */ d("span", { "aria-hidden": "true", className: "contents", children: l }, `sep-${i}`),
          f
        ]
      )
    }
  );
});
export {
  R as SPACE_PRESET,
  Y as Space
};
