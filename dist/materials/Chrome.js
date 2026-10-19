import { jsx as t } from "react/jsx-runtime";
import { cn as c } from "../utils/cn.js";
const u = {
  subtle: "su-chrome",
  default: "su-chrome",
  strong: "su-chrome-strong"
};
function f({
  as: o = "div",
  strength: r = "default",
  className: s,
  children: e,
  ...m
}) {
  return /* @__PURE__ */ t(o, { className: c(u[r], s), ...m, children: e });
}
export {
  f as Chrome,
  u as chromeRimClass
};
