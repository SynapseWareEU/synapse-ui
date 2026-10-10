import { jsx as u } from "react/jsx-runtime";
import { NeuroNoise as f } from "../../vendor/@paper-design/shaders-react/dist/shaders/neuro-noise.js";
import { cn as N } from "../../utils/cn.js";
import { shaderPalette as e } from "./palette.js";
import { useShaderSpeed as c } from "./useShaderSpeed.js";
function S({
  colorFront: o = e.mint,
  colorMid: r = e.action,
  colorBack: t = e.navy,
  brightness: i = 0.12,
  contrast: s = 0.35,
  speed: m = 0.4,
  className: n,
  style: p,
  ...a
}) {
  const d = c(m);
  return /* @__PURE__ */ u(
    f,
    {
      colorFront: o,
      colorMid: r,
      colorBack: t,
      brightness: i,
      contrast: s,
      speed: d,
      className: N("block w-full rounded-none", n),
      style: { width: "100%", height: 220, ...p },
      ...a
    }
  );
}
export {
  S as NeuroNoise
};
