import { jsx as h } from "react/jsx-runtime";
import { Dithering as f } from "../../vendor/@paper-design/shaders-react/dist/shaders/dithering.js";
import { cn as c } from "../../utils/cn.js";
import { shaderPalette as e } from "./palette.js";
import { useShaderSpeed as l } from "./useShaderSpeed.js";
function S({
  colorBack: r = e.paper,
  colorFront: t = e.action,
  shape: o = "wave",
  type: i = "4x4",
  size: n = 2,
  speed: m = 0.35,
  className: p,
  style: s,
  ...a
}) {
  const d = l(m);
  return /* @__PURE__ */ h(
    f,
    {
      colorBack: r,
      colorFront: t,
      shape: o,
      type: i,
      size: n,
      speed: d,
      className: c("block w-full rounded-none", p),
      style: { width: "100%", height: 220, ...s },
      ...a
    }
  );
}
export {
  S as Dithering
};
