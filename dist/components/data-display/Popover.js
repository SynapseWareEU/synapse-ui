import { jsxs as w, jsx as o } from "react/jsx-runtime";
import { Root as y, Trigger as C, Anchor as E, Portal as j, Content as z } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { useState as A, useEffect as B } from "react";
import { cn as N } from "../../utils/cn.js";
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
function M({
  trigger: r,
  content: e,
  side: l = "bottom",
  align: c = "center",
  sideOffset: m = 4,
  alignOffset: p,
  collisionPadding: v,
  anchorRef: t,
  contentClassName: f,
  container: b,
  "aria-label": g,
  ...h
}) {
  const { onOpenChange: n, ...a } = h, [d, s] = A(
    () => t ? { current: i(t) } : void 0
  ), x = a.open;
  return B(() => {
    s(t ? { current: i(t) } : void 0);
  }, [t, x]), /* @__PURE__ */ w(
    y,
    {
      ...a,
      onOpenChange: (u) => {
        u && t && s({ current: i(t) }), n == null || n(u);
      },
      children: [
        /* @__PURE__ */ o(C, { asChild: !0, children: r }),
        d ? /* @__PURE__ */ o(E, { virtualRef: d }) : null,
        /* @__PURE__ */ o(j, { container: b, children: /* @__PURE__ */ o(
          z,
          {
            side: l,
            align: c,
            sideOffset: m,
            alignOffset: p,
            collisionPadding: v,
            "aria-label": g,
            className: N(
              "z-[var(--su-z-dropdown)] p-su2 border border-solid border-border rounded-su-surface bg-surface-overlay shadow-su-overlay",
              "font-sans text-body text-ink su-focus-ring",
              // `data-side` holds exactly one value, so only one of these animations ever applies.
              "data-[side=bottom]:animate-su-dropdown-in data-[side=left]:animate-su-dropdown-in data-[side=right]:animate-su-dropdown-in data-[side=top]:animate-su-scale-in",
              f
            ),
            children: /* @__PURE__ */ o("div", { className: "-m-su2 p-su2 max-h-[calc(var(--radix-popover-content-available-height)-2px)] overflow-y-auto rounded-[inherit]", children: e })
          }
        ) })
      ]
    }
  );
}
export {
  M as Popover
};
