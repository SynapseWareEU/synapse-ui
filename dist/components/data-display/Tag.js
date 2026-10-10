import { jsxs as t, Fragment as f, jsx as n } from "react/jsx-runtime";
import { cn as i } from "../../utils/cn.js";
const p = {
  default: "bg-neutral-tint text-neutral-text",
  neutral: "bg-neutral-tint text-neutral-text",
  info: "bg-info-tint text-info-text",
  accent: "bg-action-subtle text-action-text",
  success: "bg-success-tint text-success-text",
  warning: "bg-warning-tint text-warning-text",
  danger: "bg-danger-tint text-danger-text"
}, m = {
  default: "bg-neutral",
  neutral: "bg-neutral",
  info: "bg-info",
  accent: void 0,
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger"
}, l = "forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]";
function h(e, r, o) {
  return e || (typeof r == "string" ? `Remove the ${r.replace(/:\s*$/, "")} filter` : typeof o == "string" ? `Remove ${o}` : "Remove tag");
}
function w({
  color: e = "default",
  dot: r = !1,
  closable: o = !1,
  onClose: g,
  filterLabel: s,
  closeLabel: x,
  className: c,
  children: a,
  ...u
}) {
  if (o)
    return /* @__PURE__ */ t(
      "span",
      {
        className: i(
          "inline-flex items-center gap-[4px] h-[28px] ps-[8px] pe-[4px] rounded-su-tag bg-action-subtle text-action-text font-sans text-small font-normal whitespace-nowrap",
          l,
          c
        ),
        ...u,
        children: [
          /* @__PURE__ */ t("span", { className: "min-w-0 truncate", children: [
            s != null ? /* @__PURE__ */ t(f, { children: [
              /* @__PURE__ */ n("span", { className: "font-medium", children: s }),
              " "
            ] }) : null,
            a
          ] }),
          /* @__PURE__ */ n(
            "button",
            {
              type: "button",
              className: "inline-flex items-center justify-center shrink-0 size-[20px] p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:bg-action-subtle-hover [@media(hover:none)]:su-hit-44",
              onClick: g,
              "aria-label": h(x, s, a),
              children: /* @__PURE__ */ t(
                "svg",
                {
                  width: "14",
                  height: "14",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  stroke: "currentColor",
                  strokeWidth: 1.75,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  "aria-hidden": "true",
                  children: [
                    /* @__PURE__ */ n("path", { d: "M18 6l-12 12" }),
                    /* @__PURE__ */ n("path", { d: "M6 6l12 12" })
                  ]
                }
              )
            }
          )
        ]
      }
    );
  const d = r ? m[e] : void 0;
  return /* @__PURE__ */ t(
    "span",
    {
      className: i(
        "inline-flex items-center gap-[6px] h-[22px] px-[8px] rounded-su-tag font-sans text-micro font-medium whitespace-nowrap",
        p[e],
        l,
        c
      ),
      ...u,
      children: [
        d ? /* @__PURE__ */ n(
          "span",
          {
            "aria-hidden": "true",
            className: i(
              "inline-block shrink-0 size-[6px] rounded-su-round forced-colors:[forced-color-adjust:none]",
              d
            )
          }
        ) : null,
        a
      ]
    }
  );
}
export {
  w as Tag
};
