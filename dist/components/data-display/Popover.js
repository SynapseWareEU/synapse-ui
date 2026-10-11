import { jsxs as h, jsx as o } from "react/jsx-runtime";
import { Root as x, Trigger as w, Anchor as y, Portal as C, Content as E } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { useState as j, useEffect as z } from "react";
import { cn as A } from "../../utils/cn.js";
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
function k({
  trigger: r,
  content: e,
  side: l = "bottom",
  align: c = "center",
  sideOffset: m = 4,
  anchorRef: t,
  contentClassName: p,
  container: v,
  "aria-label": f,
  ...b
}) {
  const { onOpenChange: n, ...a } = b, [d, s] = j(
    () => t ? { current: i(t) } : void 0
  ), g = a.open;
  return z(() => {
    s(t ? { current: i(t) } : void 0);
  }, [t, g]), /* @__PURE__ */ h(
    x,
    {
      ...a,
      onOpenChange: (u) => {
        u && t && s({ current: i(t) }), n == null || n(u);
      },
      children: [
        /* @__PURE__ */ o(w, { asChild: !0, children: r }),
        d ? /* @__PURE__ */ o(y, { virtualRef: d }) : null,
        /* @__PURE__ */ o(C, { container: v, children: /* @__PURE__ */ o(
          E,
          {
            side: l,
            align: c,
            sideOffset: m,
            "aria-label": f,
            className: A(
              "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
              "font-sans text-body text-ink su-focus-ring",
              // `data-side` holds exactly one value, so only one of these animations ever applies.
              "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
              p
            ),
            children: /* @__PURE__ */ o("div", { className: "-m-su2 p-su2 max-h-[calc(var(--radix-popover-content-available-height)-2px)] overflow-y-auto rounded-[inherit]", children: e })
          }
        ) })
      ]
    }
  );
}
export {
  k as Popover
};
