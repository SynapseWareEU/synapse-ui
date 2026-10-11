import { jsxs as t, jsx as e } from "react/jsx-runtime";
import { Dialog as D, DialogTrigger as N, DialogPortal as C, DialogOverlay as k, Content as j, DialogTitle as x, Close as z, Description as T } from "../../vendor/@radix-ui/react-dialog/dist/index.js";
import { useRef as v } from "react";
import { iconDefaults as A } from "../general/Icon.js";
import { cn as a } from "../../utils/cn.js";
import { closeButtonClass as B } from "./shared.js";
import E from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
function G({
  title: s,
  description: n,
  placement: g = "right",
  width: i,
  footer: u,
  children: w,
  trigger: d,
  closeLabel: y = "Close drawer",
  ...c
}) {
  var b, p;
  const o = v(null), m = v(!1);
  if (c.open && !m.current) {
    o.current = document.activeElement;
    for (let l = 0; l < 4; l++) {
      const r = (p = (b = o.current) == null ? void 0 : b.closest("[role=menu]")) == null ? void 0 : p.getAttribute("aria-labelledby"), h = r && document.getElementById(r);
      if (!h) break;
      o.current = h;
    }
  }
  m.current = c.open === !0;
  const f = g === "left";
  return /* @__PURE__ */ t(D, { ...c, children: [
    d ? /* @__PURE__ */ e(N, { asChild: !0, children: d }) : null,
    /* @__PURE__ */ t(C, { children: [
      /* @__PURE__ */ e(k, { className: "su-overlay" }),
      /* @__PURE__ */ e(
        j,
        {
          className: a(
            "fixed top-0 bottom-0 z-[var(--su-z-modal)] max-w-[100vw] sm:max-w-[calc(100vw-var(--su-space-8))] outline-none animate-su-fade-in motion-reduce:animate-none",
            f ? "left-0" : "right-0",
            i === void 0 && "w-[var(--su-drawer-width)]"
          ),
          style: i !== void 0 ? { width: i } : void 0,
          onCloseAutoFocus: (l) => {
            var r;
            d || (l.preventDefault(), (r = o.current) == null || r.focus());
          },
          ...n ? {} : { "aria-describedby": void 0 },
          children: /* @__PURE__ */ t(
            "div",
            {
              className: a(
                "h-full w-full flex flex-col bg-surface-overlay text-ink font-sans shadow-su-overlay border-solid border-border motion-reduce:animate-none",
                f ? "border-r animate-su-slide-in-left" : "border-l animate-su-slide-in"
              ),
              children: [
                /* @__PURE__ */ t(
                  "div",
                  {
                    className: a(
                      "flex-none flex items-center gap-su3 h-[var(--su-drawer-header)] ps-su6 pe-su3",
                      s ? "border-b border-solid border-border" : void 0
                    ),
                    children: [
                      s ? /* @__PURE__ */ e(x, { className: "flex-1 min-w-0 m-0 truncate font-sans text-section font-semibold text-ink text-start", children: s }) : /* @__PURE__ */ e(x, { className: "sr-only", children: "Drawer" }),
                      /* @__PURE__ */ e(z, { asChild: !0, children: /* @__PURE__ */ e("button", { type: "button", className: a(B, "ms-auto"), "aria-label": y, children: /* @__PURE__ */ e(E, { size: 18, ...A }) }) })
                    ]
                  }
                ),
                n ? /* @__PURE__ */ e(T, { className: "sr-only", children: n }) : null,
                /* @__PURE__ */ e("div", { className: "flex-1 min-h-0 overflow-auto p-su6 flex flex-col gap-su4 text-body text-ink [&>:first-child]:mt-0 [&>:last-child]:mb-0", children: w }),
                u ? /* @__PURE__ */ e("div", { className: "flex-none flex flex-wrap items-center justify-start gap-su2 min-h-[var(--su-drawer-footer)] py-su3 px-su6 border-t border-solid border-border", children: u }) : null
              ]
            }
          )
        }
      )
    ] })
  ] });
}
export {
  G as Drawer
};
