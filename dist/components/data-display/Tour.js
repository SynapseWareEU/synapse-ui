import { jsx as i, jsxs as u } from "react/jsx-runtime";
import { useState as g, useEffect as y } from "react";
import { Dialog as E, DialogPortal as A, DialogOverlay as R, Content as I, DialogTitle as L, Close as D, Description as M } from "../../vendor/@radix-ui/react-dialog/dist/index.js";
import { Button as w } from "../general/Button.js";
import { cn as k } from "../../utils/cn.js";
import O from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const n = 4, v = 12, T = 320, x = 16, j = 160;
function H(o) {
  const d = window.innerWidth, s = window.innerHeight, a = s - (o.bottom + n) - v - x, l = o.top - n - v - x;
  if (Math.max(a, l) < j) return null;
  const m = Math.max(x, Math.min(o.left - n, d - T - x));
  return a >= l ? { top: o.bottom + n + v, left: m, maxHeight: a } : { bottom: s - o.top + n + v, left: m, maxHeight: l };
}
function q({
  open: o = !1,
  steps: d,
  current: s,
  defaultCurrent: a = 0,
  onChange: l,
  onClose: m
}) {
  const [N, b] = g(a), [c, z] = g(null), r = s ?? N, t = d[r];
  y(() => {
    o && s === void 0 && b(a);
  }, [o, s, a]), y(() => {
    if (!o || !t) return;
    const e = document.querySelector(t.target);
    e == null || e.scrollIntoView({ block: "center", behavior: "instant" });
    const f = () => z((e == null ? void 0 : e.getBoundingClientRect()) ?? null);
    return f(), window.addEventListener("resize", f), window.addEventListener("scroll", f, !0), () => {
      window.removeEventListener("resize", f), window.removeEventListener("scroll", f, !0);
    };
  }, [o, t == null ? void 0 : t.target]);
  const h = (e) => {
    e < 0 || e > d.length - 1 || (s === void 0 && b(e), l == null || l(e));
  }, _ = (e) => {
    if (e.key === "ArrowRight") h(r + 1);
    else if (e.key === "ArrowLeft") h(r - 1);
    else return;
    e.preventDefault();
  }, p = c ? H(c) : null;
  return /* @__PURE__ */ i(
    E,
    {
      open: o && !!t,
      onOpenChange: (e) => {
        e || m == null || m();
      },
      children: /* @__PURE__ */ u(A, { children: [
        /* @__PURE__ */ i(R, { className: "fixed inset-0 z-[var(--su-z-max)] animate-su-fade-in motion-reduce:animate-none", children: c ? /* @__PURE__ */ i(
          "div",
          {
            className: "fixed rounded-su-surface pointer-events-none shadow-[0_0_0_9999px_var(--su-scrim)]",
            style: {
              top: c.top - n,
              left: c.left - n,
              width: c.width + n * 2,
              height: c.height + n * 2
            }
          }
        ) : /* @__PURE__ */ i("div", { className: "absolute inset-0 bg-[var(--su-scrim)]" }) }),
        /* @__PURE__ */ u(
          I,
          {
            onKeyDown: _,
            style: p ?? void 0,
            className: k(
              "fixed z-[var(--su-z-max)] w-[min(320px,calc(100%-var(--su-space-8)))] overflow-y-auto p-su4",
              "rounded-su-surface border border-solid border-border bg-surface-overlay shadow-su-overlay",
              "font-sans text-ink su-focus-ring animate-su-dropdown-in motion-reduce:animate-none",
              // No room beside the target (or no target): a centred sheet near the bottom edge.
              // Centred with auto margins, not a translate, so the entry keyframe's transform
              // can't knock it sideways while it plays.
              p ? void 0 : "bottom-su8 inset-x-0 mx-auto max-h-[70vh]"
            ),
            children: [
              /* @__PURE__ */ u("div", { className: "flex items-start gap-su2", children: [
                /* @__PURE__ */ i(L, { className: "flex-1 min-w-0 m-0 text-body font-semibold text-ink", children: (t == null ? void 0 : t.title) ?? "Take a tour" }),
                /* @__PURE__ */ i(
                  D,
                  {
                    "aria-label": "Close tour",
                    className: k(
                      "inline-flex shrink-0 items-center justify-center size-[var(--su-control-sm)] -my-[6px] -me-su2 rounded-su-control bg-transparent text-ink-2 cursor-pointer",
                      "transition-[background-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                      "[@media(hover:hover)]:[&:hover:not(:active)]:bg-fill [@media(hover:hover)]:hover:text-ink active:bg-border su-focus-ring",
                      "relative [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:-inset-[6px]"
                    ),
                    children: /* @__PURE__ */ i(O, { size: 18, stroke: 1.75, "aria-hidden": !0 })
                  }
                )
              ] }),
              /* @__PURE__ */ i(M, { className: "mt-su1 mb-0 text-small text-ink-2", children: t == null ? void 0 : t.description }),
              /* @__PURE__ */ u("div", { className: "flex items-center justify-between flex-wrap gap-su2 mt-su4", children: [
                /* @__PURE__ */ u("span", { className: "text-small text-ink-2 su-tabular", children: [
                  r + 1,
                  " of ",
                  d.length
                ] }),
                /* @__PURE__ */ u("div", { className: "flex gap-su2", children: [
                  r > 0 && /* @__PURE__ */ i(w, { size: "sm", onClick: () => h(r - 1), children: "Back" }),
                  r < d.length - 1 ? /* @__PURE__ */ i(w, { variant: "primary", size: "sm", onClick: () => h(r + 1), children: "Next" }) : /* @__PURE__ */ i(D, { asChild: !0, children: /* @__PURE__ */ i(w, { variant: "primary", size: "sm", children: "Done" }) })
                ] })
              ] })
            ]
          }
        )
      ] })
    }
  );
}
export {
  q as Tour
};
