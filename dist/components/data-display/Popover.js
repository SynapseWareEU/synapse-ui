import { jsxs as c, jsx as o } from "react/jsx-runtime";
import { Root as l, Trigger as u, Portal as m, Content as p } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { cn as h } from "../../utils/cn.js";
function x({
  trigger: r,
  content: e,
  side: a = "bottom",
  align: t = "center",
  sideOffset: d = 4,
  contentClassName: n,
  container: s,
  ...i
}) {
  return /* @__PURE__ */ c(l, { ...i, children: [
    /* @__PURE__ */ o(u, { asChild: !0, children: r }),
    /* @__PURE__ */ o(m, { container: s, children: /* @__PURE__ */ o(
      p,
      {
        side: a,
        align: t,
        sideOffset: d,
        className: h(
          "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
          "font-sans text-body text-ink su-focus-ring",
          // `data-side` holds exactly one value, so only one of these animations ever applies.
          "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
          n
        ),
        children: /* @__PURE__ */ o("div", { className: "max-h-[calc(var(--radix-popover-content-available-height)-2*var(--su-space-2)-2px)] overflow-y-auto", children: e })
      }
    ) })
  ] });
}
export {
  x as Popover
};
