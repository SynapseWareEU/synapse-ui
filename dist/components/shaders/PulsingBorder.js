import { jsx as g } from "react/jsx-runtime";
import { PulsingBorder as B } from "../../vendor/@paper-design/shaders-react/dist/shaders/pulsing-border.js";
import { cn as P } from "../../utils/cn.js";
import { shaderPalette as b, beamBrandColors as w } from "./palette.js";
import { useShaderSpeed as x } from "./useShaderSpeed.js";
function N({
  colors: r = [...w],
  colorBack: e = b.paper,
  roundness: o = 0,
  thickness: s = 0.08,
  softness: t = 0.45,
  bloom: d = 0.08,
  intensity: m = 0.35,
  spots: n = 3,
  spotSize: i = 0.4,
  pulse: p = 0.2,
  smoke: l = 0,
  speed: a = 0.55,
  className: u,
  style: f,
  ...c
}) {
  const h = x(a);
  return /* @__PURE__ */ g(
    B,
    {
      colors: r,
      colorBack: e,
      roundness: o,
      thickness: s,
      softness: t,
      bloom: d,
      intensity: m,
      spots: n,
      spotSize: i,
      pulse: p,
      smoke: l,
      speed: h,
      className: P("block w-full rounded-none", u),
      style: { width: "100%", height: 220, ...f },
      ...c
    }
  );
}
export {
  N as PulsingBorder
};
