import { jsxs as l, jsx as e } from "react/jsx-runtime";
import { Dialog as k, DialogTrigger as z, DialogPortal as j, DialogOverlay as B, Content as T, Close as I, Description as c, DialogTitle as m } from "../../vendor/@radix-ui/react-dialog/dist/index.js";
import { iconDefaults as M } from "../general/Icon.js";
import { cn as u } from "../../utils/cn.js";
import { closeButtonClass as O } from "./shared.js";
import P from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const X = {
  sm: "w-[400px]",
  md: "w-[var(--su-modal-width)]",
  lg: "w-[var(--su-palette-width)]"
};
function J({
  title: o,
  description: a,
  showDescription: r = !1,
  footer: t,
  size: x = "md",
  width: s,
  children: f,
  trigger: n,
  closable: i = !0,
  closeLabel: v = "Close",
  "aria-label": h = "Dialog",
  onEscapeKeyDown: p,
  onPointerDownOutside: b,
  onInteractOutside: g,
  onOpenAutoFocus: y,
  onCloseAutoFocus: D,
  ...w
}) {
  const N = !!o || i, d = o ? /* @__PURE__ */ e(m, { className: "flex-1 min-w-0 m-0 truncate font-sans text-section font-semibold text-ink text-start", children: o }) : /* @__PURE__ */ e(m, { className: "sr-only", children: h }), C = !!a && r;
  return /* @__PURE__ */ l(k, { ...w, children: [
    n ? /* @__PURE__ */ e(z, { asChild: !0, children: n }) : null,
    /* @__PURE__ */ l(j, { children: [
      /* @__PURE__ */ e(B, { className: "su-overlay" }),
      /* @__PURE__ */ l(
        T,
        {
          className: u(
            // `start`/`end` + auto margins centre it without a transform, so the rise keyframe
            // (which animates `transform`) cannot knock it off centre.
            "fixed top-[var(--su-modal-top)] start-[var(--su-content-inset-start,0px)] end-0 mx-auto z-[var(--su-z-modal)] box-border",
            // The inset comes off the width too: a rail at phone width must not push the dialog
            // past the far edge.
            "max-w-[calc(100vw-var(--su-content-inset-start,0px)-var(--su-space-8))] max-h-[calc(100vh-var(--su-modal-top)*2)] flex flex-col overflow-hidden",
            "rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay outline-none",
            "animate-su-scale-in motion-reduce:animate-none",
            s === void 0 && X[x]
          ),
          style: s !== void 0 ? { width: s } : void 0,
          onEscapeKeyDown: p,
          onPointerDownOutside: b,
          onInteractOutside: g,
          onOpenAutoFocus: y,
          onCloseAutoFocus: D,
          ...a ? {} : { "aria-describedby": void 0 },
          children: [
            N ? (
              // Header 56 (the drawer's height token): padding 0 12 0 24.
              /* @__PURE__ */ l("div", { className: "flex-none flex items-center gap-su3 h-[var(--su-drawer-header)] ps-su6 pe-su3", children: [
                d,
                i ? /* @__PURE__ */ e(I, { asChild: !0, children: /* @__PURE__ */ e("button", { type: "button", className: u(O, "ms-auto"), "aria-label": v, children: /* @__PURE__ */ e(P, { size: 18, ...M }) }) }) : null
              ] })
            ) : d,
            a && !r ? /* @__PURE__ */ e(c, { className: "sr-only", children: a }) : null,
            /* @__PURE__ */ l("div", { className: "flex-1 min-h-0 overflow-auto p-su6 flex flex-col gap-su4 text-body text-ink-2 text-start [&>:first-child]:mt-0 [&>:last-child]:mb-0", children: [
              C ? /* @__PURE__ */ e(c, { className: "m-0 text-body text-ink-2", children: a }) : null,
              f
            ] }),
            t ? (
              // Footer 64 (the drawer's height token): border-top, padding 0 24, gap 8.
              /* @__PURE__ */ e("div", { className: "flex-none flex flex-wrap items-center justify-start gap-su2 min-h-[var(--su-drawer-footer)] py-su3 px-su6 border-t border-solid border-border", children: t })
            ) : null
          ]
        }
      )
    ] })
  ] });
}
export {
  J as Modal
};
