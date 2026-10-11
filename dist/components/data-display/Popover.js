import { jsxs as x, jsx as o } from "react/jsx-runtime";
import { Root as w, Trigger as y, Anchor as C, Portal as E, Content as j } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { useState as z, useEffect as A } from "react";
import { cn as B } from "../../utils/cn.js";
function i(r) {
  return {
    getBoundingClientRect: () => {
      var e;
      return ((e = r.current) == null ? void 0 : e.getBoundingClientRect()) ?? new DOMRect();
    },
    // Read by the positioning library: whose scrollers to listen to.
    get contextElement() {
      const e = r.current;
      return typeof Element < "u" && e instanceof Element ? e : void 0;
    }
  };
}
function D({
  trigger: r,
  content: e,
  side: l = "bottom",
  align: c = "center",
  sideOffset: m = 4,
  alignOffset: p,
  anchorRef: t,
  contentClassName: v,
  container: f,
  "aria-label": b,
  ...g
}) {
  const { onOpenChange: n, ...a } = g, [d, s] = z(
    () => t ? { current: i(t) } : void 0
  ), h = a.open;
  return A(() => {
    s(t ? { current: i(t) } : void 0);
  }, [t, h]), /* @__PURE__ */ x(
    w,
    {
      ...a,
      onOpenChange: (u) => {
        u && t && s({ current: i(t) }), n == null || n(u);
      },
      children: [
        /* @__PURE__ */ o(y, { asChild: !0, children: r }),
        d ? /* @__PURE__ */ o(C, { virtualRef: d }) : null,
        /* @__PURE__ */ o(E, { container: f, children: /* @__PURE__ */ o(
          j,
          {
            side: l,
            align: c,
            sideOffset: m,
            alignOffset: p,
            "aria-label": b,
            className: B(
              "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
              "font-sans text-body text-ink su-focus-ring",
              // `data-side` holds exactly one value, so only one of these animations ever applies.
              "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
              v
            ),
            children: /* @__PURE__ */ o("div", { className: "-m-su2 p-su2 max-h-[calc(var(--radix-popover-content-available-height)-2px)] overflow-y-auto rounded-[inherit]", children: e })
          }
        ) })
      ]
    }
  );
}
export {
  D as Popover
};
