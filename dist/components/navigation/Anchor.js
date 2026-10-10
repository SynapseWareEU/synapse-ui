import { jsx as v } from "react/jsx-runtime";
import { useState as z, useRef as b, useEffect as L } from "react";
import { cn as B } from "../../utils/cn.js";
function D(s) {
  const i = s.lastIndexOf("#");
  return i >= 0 ? s.slice(i + 1) : s;
}
const S = "flex flex-col m-0 p-0 list-none border-s-2 border-s-solid border-s-border", T = "flex items-center min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] -ms-[2px] py-su1 px-su3 border-s-2 border-s-solid font-sans text-small break-words no-underline rounded-e-su-tag su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none hover:no-underline", j = "border-s-transparent text-ink-2 font-normal [@media(hover:hover)]:hover:text-ink", F = "border-s-action text-ink font-medium forced-colors:border-s-[Highlight]";
function q({
  items: s,
  offset: i = 80,
  getContainer: w,
  onChange: f,
  className: I,
  ...K
}) {
  const d = s.map((t) => D(t.href)), [x, g] = z(() => d[0] ?? ""), a = d.includes(x) ? x : d[0] ?? "", l = b(w);
  l.current = w;
  const k = b(0), y = d.join("|");
  L(() => {
    var m;
    const t = y.split("|"), n = ((m = l.current) == null ? void 0 : m.call(l)) ?? null, e = n ?? window;
    let r = 0;
    const c = () => {
      if (r = 0, Date.now() < k.current) return;
      const p = t.map((o) => document.getElementById(o)).filter((o) => o !== null), C = n ? n.getBoundingClientRect().top : 0, h = p.map((o) => ({ el: o, top: o.getBoundingClientRect().top - C })).filter((o) => o.top <= i + 1).sort((o, N) => o.top - N.top).pop(), A = (h == null ? void 0 : h.el) ?? p[0];
      A && g(A.id);
    }, u = () => {
      r || (r = requestAnimationFrame(c));
    };
    return c(), e.addEventListener("scroll", u, { passive: !0 }), window.addEventListener("resize", u, { passive: !0 }), () => {
      r && cancelAnimationFrame(r), e.removeEventListener("scroll", u), window.removeEventListener("resize", u);
    };
  }, [y, i]);
  const E = b(a);
  if (L(() => {
    E.current !== a && (E.current = a, f == null || f(`#${a}`));
  }, [a, f]), s.length === 0) return null;
  const $ = (t, n) => {
    var p;
    if (t.defaultPrevented || t.button !== 0 || t.metaKey || t.ctrlKey || t.shiftKey || t.altKey)
      return;
    const e = document.getElementById(n);
    if (!e) return;
    t.preventDefault(), g(n);
    const r = ((p = l.current) == null ? void 0 : p.call(l)) ?? null, c = e.getBoundingClientRect().top, u = r ? c - r.getBoundingClientRect().top + r.scrollTop - i : c + window.scrollY - i, m = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    k.current = Date.now() + (m ? 700 : 0), (r ?? window).scrollTo({ top: u, behavior: m ? "smooth" : "auto" }), history.replaceState(null, "", `#${n}`), e.setAttribute("tabindex", "-1"), e.focus({ preventScroll: !0 }), e.addEventListener(
      "blur",
      () => e.removeAttribute("tabindex"),
      { once: !0 }
    );
  };
  return /* @__PURE__ */ v(
    "nav",
    {
      className: B("font-sans", I),
      "aria-label": "Page sections",
      ...K,
      children: /* @__PURE__ */ v("ul", { className: S, children: s.map((t, n) => {
        const e = d[n], r = a === e;
        return /* @__PURE__ */ v("li", { children: /* @__PURE__ */ v(
          "a",
          {
            href: `#${e}`,
            className: B(
              T,
              // Picked, not overridden: two same-property utilities would
              // race on source order in the generated CSS.
              r ? F : j
            ),
            "aria-current": r ? "location" : void 0,
            title: t.title,
            onClick: (c) => $(c, e),
            children: t.title
          }
        ) }, `${e}-${n}`);
      }) })
    }
  );
}
export {
  q as Anchor
};
