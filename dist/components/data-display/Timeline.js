import { jsxs as n, jsx as t } from "react/jsx-runtime";
import { cn as s } from "../../utils/cn.js";
const u = {
  default: "bg-neutral",
  accent: "bg-action",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger"
}, p = {
  default: "text-ink-3",
  accent: "text-action-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text"
}, a = "relative grid grid-cols-[16px_minmax(0,1fr)] gap-x-su3 pb-su4 last:pb-0", b = "not-last:before:content-empty not-last:before:absolute not-last:before:start-[7.5px] not-last:before:-bottom-[6px] not-last:before:w-px not-last:before:bg-border", l = { dot: "not-last:before:top-[14px]", mark: "not-last:before:top-[18px]" };
function g({ items: c, pending: r, className: i, ...d }) {
  return /* @__PURE__ */ n("ol", { className: s("m-0 p-0 list-none font-sans", i), ...d, children: [
    c.map((e, x) => {
      const o = e.color ?? "default";
      return /* @__PURE__ */ n(
        "li",
        {
          className: s(
            a,
            b,
            e.dot != null ? l.mark : l.dot
          ),
          children: [
            e.dot != null ? /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: s(
                  "relative z-[1] flex items-center justify-center size-[16px] mt-[2px]",
                  p[o]
                ),
                children: e.dot
              }
            ) : /* @__PURE__ */ t(
              "span",
              {
                "aria-hidden": "true",
                className: s(
                  "relative z-[1] block justify-self-center size-[8px] mt-[6px] rounded-su-round",
                  u[o]
                )
              }
            ),
            /* @__PURE__ */ n("div", { className: "min-w-0", children: [
              e.title ? /* @__PURE__ */ t("div", { className: "text-body text-ink", children: e.title }) : null,
              e.description ? /* @__PURE__ */ t("div", { className: "text-small text-ink-2", children: e.description }) : null
            ] })
          ]
        },
        x
      );
    }),
    r ? /* @__PURE__ */ n("li", { className: a, children: [
      /* @__PURE__ */ t(
        "span",
        {
          "aria-hidden": "true",
          className: "relative z-[1] block justify-self-center size-[8px] mt-[6px] rounded-su-round border-[1.5px] border-solid border-ink-3 bg-transparent"
        }
      ),
      /* @__PURE__ */ t("div", { className: "min-w-0 text-body text-ink-2", children: r })
    ] }) : null
  ] });
}
export {
  g as Timeline
};
