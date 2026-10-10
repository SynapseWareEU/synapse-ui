import { jsxs as k, jsx as t } from "react/jsx-runtime";
import { useRef as z, useState as I, useCallback as j, useEffect as y } from "react";
import { cn as m } from "../../utils/cn.js";
import M from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
import R from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
const N = "relative inline-flex shrink-0 items-center justify-center size-[var(--su-control-sm)] border border-solid rounded-su-control cursor-pointer transition-[background-color,border-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none enabled:border-border-strong enabled:bg-surface enabled:text-ink-2 [@media(hover:hover)]:[&:enabled:hover:not(:active)]:bg-surface-2 enabled:active:bg-fill su-focus-ring disabled:border-fill disabled:bg-fill disabled:text-ink-3 disabled:cursor-not-allowed [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:-inset-[6px]";
function w() {
  var i;
  return typeof window < "u" && ((i = window.matchMedia) != null && i.call(window, "(prefers-reduced-motion: reduce)").matches) ? "auto" : "smooth";
}
function A({ className: i, children: c, ...f }) {
  const l = z(null), [o, C] = I({
    atStart: !0,
    atEnd: !0,
    active: 0,
    count: 0
  }), n = j(() => {
    const r = l.current;
    if (!r) return;
    const e = Array.from(r.children), s = Math.abs(r.scrollLeft), d = s <= 1, b = s + r.clientWidth >= r.scrollWidth - 1;
    let u = 0;
    if (b && e.length) u = e.length - 1;
    else if (e.length) {
      const a = e[0].offsetLeft;
      let p = 1 / 0;
      e.forEach((E, L) => {
        const x = Math.abs(Math.abs(E.offsetLeft - a) - s);
        x < p && (p = x, u = L);
      });
    }
    const g = e.length;
    C(
      (a) => a.atStart === d && a.atEnd === b && a.active === u && a.count === g ? a : { atStart: d, atEnd: b, active: u, count: g }
    );
  }, []);
  y(() => {
    const r = l.current;
    if (!r) return;
    n(), r.addEventListener("scroll", n, { passive: !0 });
    const e = new ResizeObserver(n);
    return e.observe(r), () => {
      r.removeEventListener("scroll", n), e.disconnect();
    };
  }, [n]), y(n, [c, n]);
  const h = (r) => getComputedStyle(r).direction === "rtl" ? -1 : 1, v = (r) => {
    const e = l.current;
    e && e.scrollBy({ left: r * h(e) * e.clientWidth * 0.85, behavior: w() });
  }, S = (r) => {
    const e = l.current, s = e ? Array.from(e.children) : [];
    if (!e || !s[r]) return;
    const d = Math.abs(s[r].offsetLeft - s[0].offsetLeft);
    e.scrollTo({ left: h(e) * d, behavior: w() });
  };
  return /* @__PURE__ */ k(
    "div",
    {
      role: "region",
      "aria-roledescription": "carousel",
      "aria-label": "Carousel",
      className: m("relative flex flex-col gap-su3", i),
      ...f,
      children: [
        /* @__PURE__ */ k("div", { className: "flex items-center gap-su2", children: [
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: N,
              onClick: () => v(-1),
              disabled: o.atStart,
              "aria-label": "Previous",
              children: /* @__PURE__ */ t(M, { size: 18, stroke: 1.75, "aria-hidden": !0, className: "rtl:-scale-x-100" })
            }
          ),
          /* @__PURE__ */ t(
            "div",
            {
              ref: l,
              tabIndex: 0,
              className: "flex flex-1 min-w-0 gap-su3 overflow-x-auto snap-x snap-mandatory py-su1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden su-focus-ring",
              children: c
            }
          ),
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: N,
              onClick: () => v(1),
              disabled: o.atEnd,
              "aria-label": "Next",
              children: /* @__PURE__ */ t(R, { size: 18, stroke: 1.75, "aria-hidden": !0, className: "rtl:-scale-x-100" })
            }
          )
        ] }),
        o.count > 1 ? (
          // 8px dots: border-strong, the current one ink. Each sits in a 16 box so it can be clicked.
          /* @__PURE__ */ t("div", { role: "group", "aria-label": "Slides", className: "flex items-center justify-center", children: Array.from({ length: o.count }, (r, e) => /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              "aria-label": `Slide ${e + 1} of ${o.count}`,
              "aria-current": e === o.active ? "true" : void 0,
              onClick: () => S(e),
              className: "group inline-flex items-center justify-center size-[16px] rounded-su-round bg-transparent cursor-pointer su-focus-ring",
              children: /* @__PURE__ */ t(
                "span",
                {
                  "aria-hidden": !0,
                  className: m(
                    "block size-[8px] rounded-su-round transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                    e === o.active ? "bg-ink" : "bg-border-strong [@media(hover:hover)]:group-hover:bg-ink-3"
                  )
                }
              )
            },
            e
          )) })
        ) : null
      ]
    }
  );
}
function B({ className: i, children: c, ...f }) {
  return /* @__PURE__ */ t(
    "div",
    {
      role: "group",
      "aria-roledescription": "slide",
      className: m(
        // 85% basis leaves the next slide peeking; Carousel's scroll() uses the same ratio.
        // A radius-8 surface with a hairline; it clips its content to the corners.
        "flex-[0_0_85%] snap-start overflow-hidden rounded-su-surface border border-solid border-border bg-surface",
        i
      ),
      ...f,
      children: c
    }
  );
}
A.Item = B;
export {
  A as Carousel,
  B as CarouselItem
};
