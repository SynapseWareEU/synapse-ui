import { jsx as a, jsxs as t } from "react/jsx-runtime";
import { cn as r } from "../../utils/cn.js";
import d from "../../vendor/@tabler/icons-react/dist/esm/icons/IconArrowLeft.js";
import p from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
const m = "block max-w-[24ch] overflow-hidden text-ellipsis whitespace-nowrap", f = r(
  "[&_a]:text-ink-2 [&_a]:font-medium [&_a]:no-underline [&_a]:rounded-su-tag",
  "[&_a]:transition-colors [&_a]:duration-[var(--su-duration-fast)] [&_a]:ease-[var(--su-ease-out)]",
  "[@media(hover:hover)]:[&_a:hover]:text-ink [@media(hover:hover)]:[&_a:hover]:underline",
  "[&_a:hover]:decoration-1 [&_a:hover]:underline-offset-[3px]",
  "[&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-focus [&_a:focus-visible]:outline-offset-[var(--su-focus-ring-offset)]",
  "[@media(hover:none)]:[&_a]:py-[12px] [@media(hover:none)]:[&_a]:-my-[12px]"
), x = r(
  f,
  "[&_a]:block [&_a]:max-w-[24ch] [&_a]:overflow-hidden [&_a]:text-ellipsis [&_a]:whitespace-nowrap",
  "[&_a[aria-current]]:text-ink"
);
function v() {
  return /* @__PURE__ */ a(p, { size: 14, stroke: 1.75 });
}
function g({
  items: n,
  separator: u,
  variant: h = "trail",
  className: o,
  ...s
}) {
  if (n.length === 0) return null;
  if (h === "back") {
    const e = n.length > 1 ? n[n.length - 2] : n[0];
    if (!e) return null;
    const i = typeof e.label == "string" ? e.label : void 0, l = /* @__PURE__ */ a("span", { "aria-hidden": "true", className: "flex shrink-0 rtl:-scale-x-100", children: /* @__PURE__ */ a(d, { size: 16, stroke: 1.75 }) });
    return /* @__PURE__ */ a(
      "nav",
      {
        className: r("flex font-sans text-small", f, o),
        "aria-label": "Breadcrumb",
        ...s,
        children: e.href ? /* @__PURE__ */ t(
          "a",
          {
            href: e.href,
            onClick: e.onClick,
            title: i,
            className: "inline-flex items-center gap-su1 min-h-[20px] max-w-full",
            children: [
              l,
              /* @__PURE__ */ a("span", { className: "min-w-0 overflow-hidden text-ellipsis whitespace-nowrap", children: e.label })
            ]
          }
        ) : /* @__PURE__ */ t("span", { className: "inline-flex items-center gap-su1 min-h-[20px] max-w-full text-ink-2 font-medium", children: [
          l,
          e.label
        ] })
      }
    );
  }
  return /* @__PURE__ */ a(
    "nav",
    {
      className: r("font-sans text-small", o),
      "aria-label": "Breadcrumb",
      ...s,
      children: /* @__PURE__ */ a("ol", { role: "list", className: "flex flex-wrap items-center gap-su1 m-0 p-0 list-none", children: n.map((e, i) => {
        const l = i === n.length - 1, c = typeof e.label == "string" ? e.label : void 0;
        return /* @__PURE__ */ t(
          "li",
          {
            className: r("inline-flex items-center gap-su1 min-w-0", x),
            children: [
              i > 0 && /* @__PURE__ */ a(
                "span",
                {
                  className: "flex shrink-0 select-none text-ink-3 rtl:-scale-x-100",
                  "aria-hidden": "true",
                  children: u ?? /* @__PURE__ */ a(v, {})
                }
              ),
              e.href ? /* @__PURE__ */ a(
                "a",
                {
                  href: e.href,
                  onClick: e.onClick,
                  title: c,
                  "aria-current": l ? "page" : void 0,
                  children: e.label
                }
              ) : /* @__PURE__ */ a(
                "span",
                {
                  className: r(
                    m,
                    "font-medium",
                    l ? "text-ink" : "text-ink-2"
                  ),
                  title: c,
                  "aria-current": l ? "page" : void 0,
                  children: e.label
                }
              )
            ]
          },
          e.key ?? i
        );
      }) })
    }
  );
}
export {
  g as Breadcrumb
};
