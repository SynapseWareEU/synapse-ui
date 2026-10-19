import { jsx as s } from "react/jsx-runtime";
import { Warp as a } from "../../vendor/@paper-design/shaders-react/dist/shaders/warp.js";
import { cn as n } from "../../utils/cn.js";
import { warpBrandColors as d } from "./palette.js";
import { useShaderSpeed as i } from "./useShaderSpeed.js";
function w({
  colors: r = [...d],
  speed: o = 0.3,
  className: e,
  style: p,
  ...t
}) {
  const m = i(o);
  return /* @__PURE__ */ s(
    a,
    {
      colors: r,
      speed: m,
      className: n("block w-full rounded-none", e),
      style: { width: "100%", height: 220, ...p },
      ...t
    }
  );
}
export {
  w as Warp
};
