import { jsx as d, jsxs as g } from "react/jsx-runtime";
import { cn as t } from "../../utils/cn.js";
const b = {
  default: "bg-fill text-ink-2",
  neutral: "bg-fill text-ink-2",
  accent: "bg-action-subtle text-action-text",
  info: "bg-info-tint text-info-text",
  success: "bg-success-tint text-success-text",
  warning: "bg-warning-tint text-warning-text",
  danger: "bg-danger-tint text-danger-text"
}, p = {
  default: "bg-neutral",
  neutral: "bg-neutral",
  accent: "bg-action",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger"
}, h = "inline-flex items-center justify-center h-[18px] min-w-[18px] px-[6px] rounded-su-pill font-sans text-[12px] leading-[16px] font-medium whitespace-nowrap su-tabular forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]", w = "inline-block shrink-0 size-[8px] rounded-su-round forced-colors:[forced-color-adjust:none]", m = "absolute top-[15%] end-[15%] [box-shadow:0_0_0_2px_var(--su-surface)]", v = "absolute -top-[6px] -end-[6px] [box-shadow:0_0_0_2px_var(--su-surface)]";
function j({
  count: n,
  dot: e = !1,
  max: i = 99,
  showZero: x = !1,
  variant: a = "default",
  className: l,
  children: s,
  title: f,
  ...r
}) {
  const u = e || n !== void 0 && (x || n > 0), o = n !== void 0 && n > i ? `${i}+` : n, c = u ? /* @__PURE__ */ d(
    "span",
    {
      className: t(
        e ? t(w, p[a]) : t(h, b[a]),
        s ? e ? m : v : void 0
      ),
      "aria-hidden": e,
      title: e ? void 0 : f ?? (o === void 0 ? void 0 : String(o)),
      children: !e && o
    }
  ) : null;
  return s ? /* @__PURE__ */ g("span", { className: t("relative inline-flex", l), ...r, children: [
    s,
    c
  ] }) : /* @__PURE__ */ d("span", { className: t("inline-flex", l), ...r, children: c });
}
export {
  j as Badge
};
