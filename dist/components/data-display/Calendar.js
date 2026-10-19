import { jsxs as p, jsx as i, Fragment as B } from "react/jsx-runtime";
import { useState as D, useEffect as C, useMemo as H, useRef as J } from "react";
import { useConfig as Q } from "../../ConfigProvider.js";
import { cn as c } from "../../utils/cn.js";
import { Segmented as X } from "./Segmented.js";
import Z from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
import ee from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
function A({ back: r }) {
  return /* @__PURE__ */ i(r ? Z : ee, { size: 16, stroke: 1.75, "aria-hidden": !0, className: "rtl:-scale-x-100" });
}
function L(r, t) {
  return r.getFullYear() === t.getFullYear() && r.getMonth() === t.getMonth() && r.getDate() === t.getDate();
}
function k(r, t) {
  return r.getFullYear() === t.getFullYear() && r.getMonth() === t.getMonth();
}
function T(r, t, m) {
  return new Date(r, t, Math.min(m, new Date(r, t + 1, 0).getDate()));
}
function te(r) {
  var t, m;
  try {
    const u = new Intl.Locale(r), y = (m = ((t = u.getWeekInfo) == null ? void 0 : t.call(u)) ?? u.weekInfo) == null ? void 0 : m.firstDay;
    return y ? y % 7 : 0;
  } catch {
    return 0;
  }
}
const j = "relative inline-flex shrink-0 items-center justify-center size-[var(--su-control-xs)] rounded-su-control bg-transparent text-ink-2 cursor-pointer transition-[background-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] [@media(hover:hover)]:[&:hover:not(:active)]:bg-fill [@media(hover:hover)]:hover:text-ink active:bg-border su-focus-ring [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:-inset-[8px]", K = "grid-cols-[repeat(7,40px)]", re = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -7,
  ArrowDown: 7
};
function ue({
  value: r,
  fullscreen: t = !1,
  dateRender: m,
  disabledDate: u,
  defaultValue: y,
  onChange: M,
  className: P,
  ...E
}) {
  const { locale: f } = Q(), b = te(f), R = Array.from(
    { length: 7 },
    (e, o) => new Intl.DateTimeFormat(f, { weekday: "short" }).format(
      // 4 Jan 2026 is a Sunday; the weekday cycles every 7 days.
      new Date(2026, 0, 4 + b + o)
    )
  ), [_, z] = D(() => y ?? /* @__PURE__ */ new Date()), x = r ?? _, [h, Y] = D("month"), [s, w] = D(
    () => new Date(x.getFullYear(), x.getMonth(), 1)
  ), F = r == null ? void 0 : r.getFullYear(), N = r == null ? void 0 : r.getMonth();
  C(() => {
    F !== void 0 && N !== void 0 && w(new Date(F, N, 1));
  }, [F, N]);
  const G = H(() => {
    const e = new Date(s.getFullYear(), s.getMonth(), 1), o = new Date(s.getFullYear(), s.getMonth() + 1, 0), n = [];
    for (let a = 0; a < (e.getDay() - b + 7) % 7; a++) n.push(null);
    for (let a = 1; a <= o.getDate(); a++)
      n.push(new Date(s.getFullYear(), s.getMonth(), a));
    return n;
  }, [s, b]), I = J(null), [d, O] = D(null), U = d && k(d, s) ? d.getDate() : k(x, s) ? x.getDate() : k(/* @__PURE__ */ new Date(), s) ? (/* @__PURE__ */ new Date()).getDate() : 1;
  C(() => {
    var e, o;
    d && ((o = (e = I.current) == null ? void 0 : e.querySelector(`[data-day="${d.getDate()}"]`)) == null || o.focus());
  }, [d]);
  const V = (e) => {
    u != null && u(e) || (r || z(e), M == null || M(e));
  }, S = (e) => {
    w((o) => new Date(o.getFullYear(), o.getMonth() + e, 1));
  }, W = (e, o) => {
    const [n, a, g] = [o.getFullYear(), o.getMonth(), o.getDate()], v = re[e.key];
    let l = null;
    v !== void 0 ? l = new Date(n, a, g + v) : e.key === "Home" ? l = new Date(n, a, g - (o.getDay() - b + 7) % 7) : e.key === "End" ? l = new Date(n, a, g + 6 - (o.getDay() - b + 7) % 7) : e.key === "PageUp" ? l = T(n, a - (e.shiftKey ? 12 : 1), g) : e.key === "PageDown" && (l = T(n, a + (e.shiftKey ? 12 : 1), g)), l && (e.preventDefault(), O(l), k(l, s) || w(new Date(l.getFullYear(), l.getMonth(), 1)));
  }, $ = s.toLocaleDateString(f, {
    month: "long",
    year: "numeric"
  }), q = /* @__PURE__ */ new Date();
  return /* @__PURE__ */ p(
    "div",
    {
      className: c(
        // Panel: surface, 1px border, radius 8. Not `su-panel`: that clips, and the day cells'
        // focus rings sit in the 12/16 padding.
        "bg-surface border border-solid border-border rounded-su-surface font-sans text-ink",
        t ? "w-full p-su4" : "w-max p-su3",
        P
      ),
      ...E,
      children: [
        /* @__PURE__ */ p(
          "div",
          {
            className: c(
              "flex flex-wrap items-center justify-between gap-su2",
              t ? "mb-su3" : "min-h-[var(--su-control-sm)] mb-su2"
            ),
            children: [
              /* @__PURE__ */ i(
                "span",
                {
                  className: c(
                    "font-semibold text-ink su-tabular",
                    t ? "text-section" : "text-body"
                  ),
                  children: h === "year" ? s.getFullYear() : $
                }
              ),
              /* @__PURE__ */ p("div", { className: "flex items-center gap-su2 ms-auto", children: [
                t && /* @__PURE__ */ i(
                  X,
                  {
                    value: h,
                    onValueChange: (e) => Y(e),
                    options: [
                      { value: "month", label: "Month" },
                      { value: "year", label: "Year" }
                    ]
                  }
                ),
                /* @__PURE__ */ p("div", { className: "inline-flex items-center gap-su1", children: [
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      className: j,
                      onClick: () => S(h === "year" ? -12 : -1),
                      "aria-label": h === "year" ? "Previous year" : "Previous month",
                      children: /* @__PURE__ */ i(A, { back: !0 })
                    }
                  ),
                  /* @__PURE__ */ i(
                    "button",
                    {
                      type: "button",
                      className: j,
                      onClick: () => S(h === "year" ? 12 : 1),
                      "aria-label": h === "year" ? "Next year" : "Next month",
                      children: /* @__PURE__ */ i(A, {})
                    }
                  )
                ] })
              ] })
            ]
          }
        ),
        h === "year" ? /* @__PURE__ */ i("div", { className: "grid grid-cols-3 gap-su2", children: Array.from({ length: 12 }, (e, o) => {
          const n = o === s.getMonth();
          return /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-current": n ? "true" : void 0,
              className: c(
                "min-h-[72px] border border-solid rounded-su-control text-body cursor-pointer transition-[background-color,border-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] su-focus-ring",
                // Current month: the v2 selection (action-subtle + action-text), weight unchanged.
                n ? "border-action-subtle bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover [@media(hover:hover)]:hover:border-action-subtle-hover" : "border-border bg-surface text-ink [@media(hover:hover)]:hover:bg-surface-2"
              ),
              onClick: () => {
                w(new Date(s.getFullYear(), o, 1)), Y("month");
              },
              children: new Intl.DateTimeFormat(f, { month: "long" }).format(
                new Date(s.getFullYear(), o, 1)
              )
            },
            o
          );
        }) }) : /* @__PURE__ */ p(B, { children: [
          /* @__PURE__ */ i("div", { className: c("grid", t ? "grid-cols-7" : K), children: R.map((e) => /* @__PURE__ */ i(
            "span",
            {
              className: c(
                "h-[24px] text-micro font-medium text-ink-2",
                t ? "flex items-center px-su2 text-start" : "grid place-items-center"
              ),
              children: e
            },
            e
          )) }),
          /* @__PURE__ */ i(
            "div",
            {
              ref: I,
              className: c("grid", t ? "grid-cols-7" : K),
              children: G.map((e, o) => {
                if (!e)
                  return /* @__PURE__ */ i(
                    "span",
                    {
                      className: c(
                        t ? "min-h-[92px] max-md:min-h-14 border-t border-solid border-border" : m ? "min-h-[52px]" : "h-[40px]"
                      )
                    },
                    `empty-${o}`
                  );
                const n = L(e, x), a = (u == null ? void 0 : u(e)) ?? !1, g = !n && !a && L(e, q), v = n ? "text-on-action font-medium" : a ? "text-ink-3" : g ? "text-action-text font-semibold" : "text-ink";
                return /* @__PURE__ */ p(
                  "button",
                  {
                    type: "button",
                    "data-day": e.getDate(),
                    tabIndex: e.getDate() === U ? 0 : -1,
                    className: c(
                      // Alignment and padding live only in the branches: `cn()` is a plain join, so a
                      // base `place-items-center` would beat the fullscreen `place-items-start`.
                      "group grid text-small su-tabular su-focus-ring transition-[background-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                      a ? "cursor-not-allowed" : "cursor-pointer",
                      t ? c(
                        // A top-ruled cell stays square: a radius would leave arc stubs at every join.
                        "min-h-[92px] max-md:min-h-14 rounded-su-row border-t border-solid border-border place-items-start content-start gap-su1 p-su2 max-md:p-su1 text-start",
                        n ? "bg-action-subtle [@media(hover:hover)]:hover:bg-action-subtle-hover" : a ? "bg-transparent" : "bg-transparent [@media(hover:hover)]:hover:bg-surface-hover"
                      ) : c(
                        // Compact: the whole 40×40 cell is the DatePicker day chip (radius 6).
                        "w-[40px] place-items-center rounded-su-control",
                        m ? "min-h-[52px] content-center gap-0 px-0 py-su1" : "h-[40px] p-0",
                        v,
                        n ? "bg-action [@media(hover:hover)]:hover:bg-action-hover" : a ? "bg-transparent" : "bg-transparent [@media(hover:hover)]:hover:bg-surface-hover"
                      )
                    ),
                    "aria-label": e.toLocaleDateString(f, {
                      dateStyle: "full"
                    }),
                    "aria-pressed": n,
                    "aria-disabled": a || void 0,
                    onClick: () => V(e),
                    onKeyDown: (l) => W(l, e),
                    children: [
                      /* @__PURE__ */ i(
                        "span",
                        {
                          className: c(
                            "grid place-items-center",
                            // Fullscreen: the number is its own chip; selected fills it with action.
                            t && c(
                              "h-[var(--su-control-xs)] min-w-0 px-su2 rounded-su-control",
                              v,
                              n ? "bg-action" : void 0
                            )
                          ),
                          children: e.getDate()
                        }
                      ),
                      m && /* @__PURE__ */ i(
                        "span",
                        {
                          className: c(
                            "block max-w-full overflow-hidden text-micro text-ellipsis whitespace-nowrap",
                            !t && n ? "text-on-action" : "text-ink-2",
                            t && "ps-su2"
                          ),
                          children: m(e)
                        }
                      )
                    ]
                  },
                  e.toISOString()
                );
              })
            }
          )
        ] })
      ]
    }
  );
}
export {
  ue as Calendar
};
