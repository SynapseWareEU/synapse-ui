import { jsx as s } from "react/jsx-runtime";
import { cn as n } from "../../utils/cn.js";
function u({
  offsetTop: i,
  offsetBottom: r,
  className: t,
  children: c,
  style: m,
  ...o
}) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: n("sticky z-[var(--su-z-sticky)]", t),
      style: {
        top: r === void 0 ? i ?? 0 : i,
        bottom: r,
        ...m
      },
      ...o,
      children: c
    }
  );
}
export {
  u as Affix
};
