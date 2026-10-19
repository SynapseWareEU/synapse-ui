import { jsx as a } from "react/jsx-runtime";
import { MeshGradient as h } from "../../vendor/@paper-design/shaders-react/dist/shaders/mesh-gradient.js";
import { cn as f } from "../../utils/cn.js";
import { meshBrandColors as l } from "./palette.js";
import { useShaderSpeed as c } from "./useShaderSpeed.js";
function S({
  colors: e = [...l],
  distortion: r = 0.45,
  swirl: o = 0.12,
  grainMixer: t = 0.08,
  grainOverlay: s = 0.05,
  speed: m = 0.25,
  className: n,
  style: d,
  ...i
}) {
  const p = c(m);
  return /* @__PURE__ */ a(
    h,
    {
      colors: e,
      distortion: r,
      swirl: o,
      grainMixer: t,
      grainOverlay: s,
      speed: p,
      className: f("block w-full rounded-none", n),
      style: { width: "100%", height: 220, ...d },
      ...i
    }
  );
}
export {
  S as MeshGradient
};
