import { jsxs as b, jsx as e, Fragment as k } from "react/jsx-runtime";
import { Root as M, Viewport as R, Scrollbar as T, Thumb as z } from "../../vendor/@radix-ui/react-scroll-area/dist/index.js";
import { useRef as S, useState as v, useEffect as H, Children as I } from "react";
import { cn as u } from "../../utils/cn.js";
const j = "[&:has([data-radix-scroll-area-viewport]:focus-visible)]:outline-2 [&:has([data-radix-scroll-area-viewport]:focus-visible)]:outline-solid [&:has([data-radix-scroll-area-viewport]:focus-visible)]:outline-focus [&:has([data-radix-scroll-area-viewport]:focus-visible)]:outline-offset-[var(--su-focus-ring-offset)]";
function C({
  height: s = 240,
  itemHeight: n = 48,
  overscan: l = 4,
  virtual: a = !0,
  className: h,
  children: d,
  style: m,
  ...f
}) {
  const p = S(null), [x, w] = v(0), [g, N] = v(
    typeof s == "number" ? s : 240
  );
  H(() => {
    if (!p.current) return;
    const r = new ResizeObserver(
      ([t]) => N(t.contentRect.height)
    );
    return r.observe(p.current), () => r.disconnect();
  }, []);
  const o = I.toArray(d), c = Math.max(1, n), i = Math.max(
    0,
    Math.min(o.length - 1, Math.floor(x / c) - l)
  ), y = Math.min(
    o.length,
    i + Math.ceil(g / c) + l * 2
  );
  return /* @__PURE__ */ b(
    M,
    {
      className: u(
        // Framed as a Panel: surface, 1px border, radius 8.
        "su-panel font-sans text-body text-ink",
        j,
        h
      ),
      style: { height: s, ...m },
      ...f,
      children: [
        /* @__PURE__ */ e(
          R,
          {
            ref: p,
            tabIndex: 0,
            className: "size-full",
            onScroll: (r) => w(r.currentTarget.scrollTop),
            children: a ? /* @__PURE__ */ e(
              "div",
              {
                role: "list",
                style: { height: o.length * c, position: "relative" },
                children: /* @__PURE__ */ e(
                  "div",
                  {
                    style: {
                      position: "absolute",
                      top: i * c,
                      width: "100%"
                    },
                    children: o.slice(i, y).map((r, t) => /* @__PURE__ */ e(
                      "div",
                      {
                        role: "listitem",
                        "aria-setsize": o.length,
                        "aria-posinset": i + t + 1,
                        className: u(
                          "overflow-hidden",
                          i + t > 0 && "border-t border-solid border-border"
                        ),
                        style: { height: c },
                        children: r
                      },
                      i + t
                    ))
                  }
                )
              }
            ) : /* @__PURE__ */ e("div", { role: "list", children: o.map((r, t) => /* @__PURE__ */ e(
              "div",
              {
                role: "listitem",
                "aria-setsize": o.length,
                "aria-posinset": t + 1,
                className: u(t > 0 && "border-t border-solid border-border"),
                children: r
              },
              t
            )) })
          }
        ),
        /* @__PURE__ */ e(
          T,
          {
            className: "flex w-[8px] p-[2px] touch-none",
            orientation: "vertical",
            children: /* @__PURE__ */ e(z, { className: "flex-1 rounded-su-pill bg-border-strong" })
          }
        )
      ]
    }
  );
}
function L({
  title: s,
  description: n,
  avatar: l,
  extra: a,
  className: h,
  children: d,
  ...m
}) {
  const f = s || n || l || a;
  return /* @__PURE__ */ e(
    "div",
    {
      className: u(
        // Same row as List.Item: padding 0 16, gap 12, centred in the virtual row's fixed height.
        "flex items-center gap-su3 h-full min-h-[var(--su-row)] px-su4 font-sans text-body text-ink not-first:border-t not-first:border-solid not-first:border-border",
        h
      ),
      ...m,
      children: f ? /* @__PURE__ */ b(k, { children: [
        l ? /* @__PURE__ */ e("div", { className: "flex shrink-0 items-center", children: l }) : null,
        /* @__PURE__ */ b("div", { className: "flex-1 min-w-0", children: [
          s ? /* @__PURE__ */ e("div", { className: "truncate", children: s }) : null,
          n ? /* @__PURE__ */ e("div", { className: "truncate text-small text-ink-2", children: n }) : null,
          d
        ] }),
        a ? /* @__PURE__ */ e("div", { className: "shrink-0 whitespace-nowrap text-small text-ink-2", children: a }) : null
      ] }) : /* @__PURE__ */ e("div", { className: "flex-1 min-w-0 truncate", children: d })
    }
  );
}
C.Item = L;
export {
  C as Listy,
  L as ListyItem
};
