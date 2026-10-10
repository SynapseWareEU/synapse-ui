import { jsxs as r, jsx as e } from "react/jsx-runtime";
import { Dialog as w, DialogTrigger as D, DialogPortal as g, DialogOverlay as y, Content as N, DialogTitle as f, Close as C, Description as j } from "../../vendor/@radix-ui/react-dialog/dist/index.js";
import { useRef as p } from "react";
import { iconDefaults as k } from "../general/Icon.js";
import { cn as o } from "../../utils/cn.js";
import { closeButtonClass as z } from "./shared.js";
import O from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
function R({
  title: l,
  description: a,
  placement: b = "right",
  width: s,
  footer: i,
  children: h,
  trigger: n,
  closeLabel: x = "Close drawer",
  ...t
}) {
  const d = p(null), c = p(!1);
  t.open && !c.current && (d.current = document.activeElement), c.current = t.open === !0;
  const u = b === "left";
  return /* @__PURE__ */ r(w, { ...t, children: [
    n ? /* @__PURE__ */ e(D, { asChild: !0, children: n }) : null,
    /* @__PURE__ */ r(g, { children: [
      /* @__PURE__ */ e(y, { className: "su-overlay" }),
      /* @__PURE__ */ e(
        N,
        {
          className: o(
            "fixed top-0 bottom-0 z-[var(--su-z-modal)] max-w-[calc(100vw-var(--su-space-8))] outline-none animate-su-fade-in motion-reduce:animate-none",
            u ? "left-0" : "right-0",
            s === void 0 && "w-[var(--su-drawer-width)]"
          ),
          style: s !== void 0 ? { width: s } : void 0,
          onCloseAutoFocus: (v) => {
            var m;
            n || (v.preventDefault(), (m = d.current) == null || m.focus());
          },
          ...a ? {} : { "aria-describedby": void 0 },
          children: /* @__PURE__ */ r(
            "div",
            {
              className: o(
                "h-full w-full flex flex-col bg-surface-overlay text-ink font-sans shadow-su-overlay border-solid border-border motion-reduce:animate-none",
                u ? "border-r animate-su-slide-in-left" : "border-l animate-su-slide-in"
              ),
              children: [
                /* @__PURE__ */ r(
                  "div",
                  {
                    className: o(
                      "flex-none flex items-center gap-su3 h-[var(--su-drawer-header)] ps-su6 pe-su3",
                      l ? "border-b border-solid border-border" : void 0
                    ),
                    children: [
                      l ? /* @__PURE__ */ e(f, { className: "flex-1 min-w-0 m-0 truncate font-sans text-section font-semibold text-ink text-start", children: l }) : /* @__PURE__ */ e(f, { className: "sr-only", children: "Drawer" }),
                      /* @__PURE__ */ e(C, { asChild: !0, children: /* @__PURE__ */ e("button", { type: "button", className: o(z, "ms-auto"), "aria-label": x, children: /* @__PURE__ */ e(O, { size: 18, ...k }) }) })
                    ]
                  }
                ),
                a ? /* @__PURE__ */ e(j, { className: "sr-only", children: a }) : null,
                /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-auto p-su6 flex flex-col gap-su4 text-body text-ink [&>:first-child]:mt-0 [&>:last-child]:mb-0", children: h }),
                i ? /* @__PURE__ */ e("div", { className: "flex-none flex flex-wrap items-center justify-start gap-su2 min-h-[var(--su-drawer-footer)] py-su3 px-su6 border-t border-solid border-border", children: i }) : null
              ]
            }
          )
        }
      )
    ] })
  ] });
}
export {
  R as Drawer
};
