import { jsxs as i, jsx as o } from "react/jsx-runtime";
import { cn as s } from "../../utils/cn.js";
function l({ size: e, className: n, style: t }) {
  const r = typeof e == "number" ? e : void 0;
  return /* @__PURE__ */ i(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      "aria-hidden": "true",
      focusable: "false",
      className: s(
        "block shrink-0 animate-spin motion-reduce:animate-none",
        e === "inherit" && "size-[1em]",
        n
      ),
      style: {
        animationDuration: "800ms",
        ...r ? { width: r, height: r } : null,
        ...t
      },
      children: [
        /* @__PURE__ */ o(
          "circle",
          {
            cx: "12",
            cy: "12",
            r: "10",
            strokeWidth: 2,
            vectorEffect: "non-scaling-stroke",
            className: "[stroke:var(--su-spin-track,var(--su-border))] forced-colors:[stroke:GrayText]"
          }
        ),
        /* @__PURE__ */ o(
          "path",
          {
            d: "M12 2a10 10 0 0 1 10 10",
            stroke: "currentColor",
            strokeWidth: 2,
            strokeLinecap: "round",
            vectorEffect: "non-scaling-stroke"
          }
        )
      ]
    }
  );
}
export {
  l as RingSpinner
};
