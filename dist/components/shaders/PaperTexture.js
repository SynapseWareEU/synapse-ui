import { jsx as c } from "react/jsx-runtime";
import { PaperTexture as d } from "../../vendor/@paper-design/shaders-react/dist/shaders/paper-texture.js";
import { cn as h } from "../../utils/cn.js";
import { shaderPalette as e } from "./palette.js";
function b({
  colorBack: r = e.paper,
  colorFront: t = e.ink2,
  contrast: o = 0.28,
  roughness: p = 0.35,
  fiber: a = 0.25,
  fiberSize: m = 0.22,
  crumples: i = 0.2,
  folds: n = 0.35,
  foldCount: u = 4,
  drops: f = 0.12,
  className: l,
  style: s,
  ...x
}) {
  return /* @__PURE__ */ c(
    d,
    {
      colorBack: r,
      colorFront: t,
      contrast: o,
      roughness: p,
      fiber: a,
      fiberSize: m,
      crumples: i,
      folds: n,
      foldCount: u,
      drops: f,
      className: h("block w-full rounded-none", l),
      style: { width: "100%", height: 220, ...s },
      ...x
    }
  );
}
export {
  b as PaperTexture
};
