import { jsx as l } from "react/jsx-runtime";
import { DotGrid as c } from "../../vendor/@paper-design/shaders-react/dist/shaders/dot-grid.js";
import { cn as u } from "../../utils/cn.js";
import { shaderPalette as r } from "./palette.js";
function w({
  colorBack: o = r.paper,
  colorFill: t = r.ink2,
  colorStroke: e = r.action,
  shape: i = "square",
  size: m = 2,
  gapX: n = 24,
  gapY: a = 24,
  strokeWidth: d = 0,
  className: p,
  style: s,
  ...f
}) {
  return /* @__PURE__ */ l(
    c,
    {
      colorBack: o,
      colorFill: t,
      colorStroke: e,
      shape: i,
      size: m,
      gapX: n,
      gapY: a,
      strokeWidth: d,
      className: u("block w-full rounded-none", p),
      style: { width: "100%", height: 220, ...s },
      ...f
    }
  );
}
export {
  w as DotGrid
};
