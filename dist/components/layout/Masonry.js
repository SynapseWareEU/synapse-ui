import { jsx as h } from "react/jsx-runtime";
import { forwardRef as k, useRef as B, Children as C, useLayoutEffect as G } from "react";
import { cn as x } from "../../utils/cn.js";
import { space as i } from "../../utils/space.js";
const N = (o) => typeof o == "number" ? `${o}px` : o, L = k(function({ columns: w = 3, minColumnWidth: l, gap: n = 3, className: $, itemClassName: R, style: M, children: b, ...v }, s) {
  const d = B(null), a = Math.max(1, Math.trunc(w) || 1), [m, f] = Array.isArray(n) ? n : [n, n], u = C.toArray(b);
  return G(() => {
    const t = d.current;
    if (!t) return;
    const c = () => {
      const r = parseFloat(getComputedStyle(t).getPropertyValue("--su-masonry-rg")) || 0, e = [...t.children], A = e.map((y) => Math.max(1, y.offsetHeight + Math.round(r)));
      e.forEach((y, E) => {
        y.style.gridRowEnd = `span ${A[E]}`;
      });
    };
    c();
    let g = t.getBoundingClientRect().width;
    const p = new ResizeObserver((r) => {
      for (const e of r)
        if (e.target === t) {
          if (e.contentRect.width === g) return;
          g = e.contentRect.width;
        }
      c();
    });
    p.observe(t);
    for (const r of t.children) p.observe(r);
    return () => p.disconnect();
  }, [u.length, a, m, f, l]), /* @__PURE__ */ h(
    "div",
    {
      ...v,
      ref: (t) => {
        d.current = t, typeof s == "function" ? s(t) : s && (s.current = t);
      },
      className: x(
        // 0px rows + 1px row-gap: span from measured height packs under neighbour.
        "grid w-full items-start !auto-rows-[0px] !gap-y-px",
        $
      ),
      style: {
        ...M,
        gridTemplateColumns: l ? `repeat(auto-fill, minmax(max(${N(l)}, calc((100% - ${a - 1} * ${i(m)}) / ${a})), 1fr))` : `repeat(${a}, minmax(0, 1fr))`,
        columnGap: i(m),
        "--su-masonry-rg": i(f),
        // Every item's span includes a trailing gap, so the grid ends one gap
        // below its last item. Pull that phantom row back off.
        marginBottom: u.length ? `calc(${i(f)} * -1)` : void 0
      },
      children: u.map((t, c) => /* @__PURE__ */ h("div", { className: x("min-w-0", R), children: t }, t.key ?? c))
    }
  );
});
export {
  L as Masonry
};
