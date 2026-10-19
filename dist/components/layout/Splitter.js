import { jsxs as N, jsx as p } from "react/jsx-runtime";
import { useState as U, useRef as b, useId as j } from "react";
import { cn as f } from "../../utils/cn.js";
const D = "overflow-auto bg-surface";
function Y({
  direction: I = "horizontal",
  defaultSize: m = 50,
  size: g,
  onSizeChange: d,
  min: i = 20,
  max: s = 80,
  first: T,
  second: A,
  separatorLabel: R = "Resize panes",
  className: _,
  ref: c,
  ...z
}) {
  const v = (e) => Math.min(s, Math.max(i, e)), [C, M] = U(() => v(m)), a = b(null), w = b(0), x = b(0), y = j(), r = I === "horizontal", o = i < s, n = v(g ?? C), h = (e) => {
    const t = v(e);
    g === void 0 && M(t), d == null || d(t);
  }, k = () => r && !!a.current && getComputedStyle(a.current).direction === "rtl";
  return /* @__PURE__ */ N(
    "div",
    {
      ref: (e) => {
        a.current = e, typeof c == "function" ? c(e) : c && (c.current = e);
      },
      className: f(
        // A panel: surface, 1px border, radius 8 (overflow-hidden keeps the panes inside the corners).
        "flex w-full h-full su-panel",
        r ? "flex-row" : "flex-col",
        _
      ),
      ...z,
      children: [
        /* @__PURE__ */ p(
          "div",
          {
            id: y,
            className: D,
            style: r ? { width: `${n}%` } : { height: `${n}%` },
            children: T
          }
        ),
        /* @__PURE__ */ p(
          "div",
          {
            className: f(
              // An 8-wide handle around a 1px border line. On desk the 8px is the target; touch
              // screens get a 44px hit pad from the `after:` overlay.
              // ponytail: on touch the overlay eats pointer events 18px into each pane (a pane
              // scrollbar hugging the divider included).
              "relative z-1 shrink-0 flex items-center justify-center touch-none",
              "su-focus-ring",
              "before:content-[''] before:absolute before:bg-border forced-colors:before:bg-[CanvasText] before:[transition:background-color_var(--su-duration-fast)_var(--su-ease-out),width_var(--su-duration-fast)_var(--su-ease-out),height_var(--su-duration-fast)_var(--su-ease-out)] motion-reduce:before:transition-none",
              "[@media(hover:none)]:after:content-[''] [@media(hover:none)]:after:absolute",
              r ? "w-[var(--su-space-2)] min-w-[var(--su-space-2)] before:top-0 before:bottom-0 before:left-1/2 before:w-px before:-translate-x-1/2 [@media(hover:none)]:after:top-0 [@media(hover:none)]:after:bottom-0 [@media(hover:none)]:after:left-[-18px] [@media(hover:none)]:after:right-[-18px]" : "h-[var(--su-space-2)] min-h-[var(--su-space-2)] before:left-0 before:right-0 before:top-1/2 before:h-px before:-translate-y-1/2 [@media(hover:none)]:after:left-0 [@media(hover:none)]:after:right-0 [@media(hover:none)]:after:top-[-18px] [@media(hover:none)]:after:bottom-[-18px]",
              // Hover or drag: the line becomes a 2px action line. Focus: the outline.
              o ? f(
                r ? "cursor-col-resize" : "cursor-row-resize",
                "[@media(hover:hover)]:hover:before:bg-action active:before:bg-action forced-colors:active:before:bg-[Highlight]",
                r ? "[@media(hover:hover)]:hover:before:w-[2px] active:before:w-[2px]" : "[@media(hover:hover)]:hover:before:h-[2px] active:before:h-[2px]"
              ) : "cursor-default"
            ),
            role: "separator",
            tabIndex: o ? 0 : void 0,
            "aria-label": R,
            "aria-controls": y,
            "aria-disabled": o ? void 0 : !0,
            "aria-orientation": r ? "vertical" : "horizontal",
            "aria-valuemin": i,
            "aria-valuemax": s,
            "aria-valuenow": Math.round(n),
            "aria-valuetext": `${Math.round(n)}%`,
            onPointerDown: (e) => {
              !o || e.pointerType === "mouse" && e.button !== 0 || (e.preventDefault(), e.currentTarget.focus(), e.currentTarget.setPointerCapture(e.pointerId), w.current = r ? e.clientX : e.clientY, x.current = n);
            },
            onPointerMove: (e) => {
              if (!e.currentTarget.hasPointerCapture(e.pointerId) || !a.current)
                return;
              const t = a.current.getBoundingClientRect(), u = r ? t.width : t.height;
              if (!u) return;
              const l = ((r ? e.clientX : e.clientY) - w.current) * (k() ? -1 : 1);
              h(x.current + l / u * 100);
            },
            onPointerUp: (e) => {
              e.currentTarget.hasPointerCapture(e.pointerId) && e.currentTarget.releasePointerCapture(e.pointerId);
            },
            onDoubleClick: () => o && h(m),
            onKeyDown: (e) => {
              if (!o) return;
              const t = k(), u = r ? t ? "ArrowRight" : "ArrowLeft" : "ArrowUp", l = r ? t ? "ArrowLeft" : "ArrowRight" : "ArrowDown";
              if (![u, l, "Home", "End", "PageUp", "PageDown"].includes(e.key)) return;
              e.preventDefault();
              const P = e.key === "PageUp" || e.key === "PageDown" ? 10 : 2, H = e.key === l || e.key === "PageDown";
              h(
                e.key === "Home" ? i : e.key === "End" ? s : n + (H ? P : -P)
              );
            }
          }
        ),
        /* @__PURE__ */ p("div", { className: f(D, "flex-1"), children: A })
      ]
    }
  );
}
export {
  Y as Splitter
};
