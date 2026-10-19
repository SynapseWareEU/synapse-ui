import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { cn as i } from "../../utils/cn.js";
function h({
  title: l,
  value: r,
  prefix: s,
  suffix: a,
  description: n,
  compact: c = !1,
  className: d,
  ...m
}) {
  return /* @__PURE__ */ t("div", { className: i("flex flex-col gap-su1 font-sans", d), ...m, children: [
    l ? /* @__PURE__ */ e("div", { className: "su-label", children: l }) : null,
    /* @__PURE__ */ t("div", { className: "flex items-baseline gap-su2 min-w-0", children: [
      s ? /* @__PURE__ */ e("span", { className: "inline-flex items-center self-center shrink-0 text-ink-3 [&_svg]:size-[16px]", children: s }) : null,
      /* @__PURE__ */ e(
        "span",
        {
          className: i(
            "min-w-0 break-words font-semibold text-ink su-tabular",
            c ? "text-[length:var(--su-text-title)] leading-[var(--su-leading-title)]" : "text-[length:var(--su-text-display)] leading-[var(--su-leading-display)]"
          ),
          children: r
        }
      ),
      a ? /* @__PURE__ */ e("span", { className: "shrink-0 text-small text-ink-2", children: a }) : null
    ] }),
    n ? /* @__PURE__ */ e("div", { className: "text-small text-ink-2", children: n }) : null
  ] });
}
export {
  h as Statistic
};
