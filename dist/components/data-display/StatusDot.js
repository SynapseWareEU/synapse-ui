import { jsx as t } from "react/jsx-runtime";
import { cn as a } from "../../utils/cn.js";
const l = {
  neutral: "bg-neutral",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger"
};
function b({
  tone: e = "neutral",
  pending: s = !1,
  size: i = 8,
  label: n,
  className: d,
  ...r
}) {
  const o = n ?? r["aria-label"] ?? r["aria-labelledby"];
  return /* @__PURE__ */ t(
    "span",
    {
      role: o ? "img" : void 0,
      "aria-label": n,
      "aria-hidden": o ? void 0 : !0,
      className: a(
        "inline-block shrink-0 rounded-su-round",
        i === 6 ? "size-[6px]" : "size-[8px]",
        s ? "bg-transparent border-[1.5px] border-solid border-ink-3" : a(l[e], "forced-colors:[forced-color-adjust:none]"),
        d
      ),
      ...r
    }
  );
}
export {
  b as StatusDot,
  l as statusDotToneClass
};
