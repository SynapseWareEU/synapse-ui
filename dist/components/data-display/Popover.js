import { jsxs as i, jsx as o } from "react/jsx-runtime";
import { Root as c, Trigger as l, Portal as u, Content as m } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { cn as p } from "../../utils/cn.js";
function b({
  trigger: e,
  content: r,
  side: a = "bottom",
  align: t = "center",
  contentClassName: s,
  container: d,
  ...n
}) {
  return /* @__PURE__ */ i(c, { ...n, children: [
    /* @__PURE__ */ o(l, { asChild: !0, children: e }),
    /* @__PURE__ */ o(u, { container: d, children: /* @__PURE__ */ o(
      m,
      {
        side: a,
        align: t,
        sideOffset: 4,
        className: p(
          "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
          "font-sans text-body text-ink su-focus-ring",
          // `data-side` holds exactly one value, so only one of these animations ever applies.
          "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
          s
        ),
        children: /* @__PURE__ */ o("div", { className: "max-h-[calc(var(--radix-popover-content-available-height)-2*var(--su-space-2)-2px)] overflow-y-auto", children: r })
      }
    ) })
  ] });
}
export {
  b as Popover
};
