import { jsx as e } from "react/jsx-runtime";
import { BorderBeam as f } from "../../vendor/border-beam/dist/index.es.js";
import { useConfig as p } from "../../ConfigProvider.js";
import { useShaderSpeed as l } from "../shaders/useShaderSpeed.js";
import { cn as h } from "../../utils/cn.js";
function C({
  duration: r,
  size: o = "md",
  active: t = !0,
  strength: m = 1,
  theme: a,
  className: s,
  style: i,
  children: n,
  ...d
}) {
  const { theme: c } = p(), u = l(1);
  return /* @__PURE__ */ e(
    f,
    {
      size: o,
      duration: r,
      active: t && u > 0,
      strength: m,
      colorVariant: "ocean",
      theme: a ?? c,
      staticColors: !0,
      borderRadius: 0,
      className: h("w-full rounded-none", s),
      style: i,
      ...d,
      children: /* @__PURE__ */ e("div", { className: "su-frame p-su5 text-body", children: n })
    }
  );
}
export {
  C as BorderBeam
};
