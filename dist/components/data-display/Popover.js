import { jsxs as u, jsx as o } from "react/jsx-runtime";
import { Root as c, Trigger as m, Portal as p, Content as h } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { cn as b } from "../../utils/cn.js";
function g({
  trigger: r,
  content: a,
  side: e = "bottom",
  align: t = "center",
  sideOffset: d = 4,
  contentClassName: i,
  container: n,
  "aria-label": s,
  ...l
}) {
  return /* @__PURE__ */ u(c, { ...l, children: [
    /* @__PURE__ */ o(m, { asChild: !0, children: r }),
    /* @__PURE__ */ o(p, { container: n, children: /* @__PURE__ */ o(
      h,
      {
        side: e,
        align: t,
        sideOffset: d,
        "aria-label": s,
        className: b(
          "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
          "font-sans text-body text-ink su-focus-ring",
          // `data-side` holds exactly one value, so only one of these animations ever applies.
          "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
          i
        ),
        children: /* @__PURE__ */ o("div", { className: "-m-su2 p-su2 max-h-[calc(var(--radix-popover-content-available-height)-2px)] overflow-y-auto rounded-[inherit]", children: a })
      }
    ) })
  ] });
}
export {
  g as Popover
};
