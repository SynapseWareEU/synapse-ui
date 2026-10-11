import { jsx as t, jsxs as u, Fragment as T } from "react/jsx-runtime";
import { useContext as d, useMemo as O, forwardRef as q, useCallback as Q, useSyncExternalStore as U, createContext as S, Children as X, isValidElement as Y } from "react";
import { cn as o } from "../../utils/cn.js";
import { statusDotToneClass as I } from "./StatusDot.js";
const y = S("default"), j = S(void 0), w = S({
  line: "single",
  expanded: !1
}), b = S(!1), _ = S({ hidden: !1, sticky: !1 }), Z = { sm: 640, md: 768, lg: 1024, xl: 1280 }, ee = () => () => {
};
function te(n) {
  const e = n ? `(min-width: ${Z[n]}px)` : void 0, a = Q(
    (r) => {
      if (!e || typeof window > "u" || !window.matchMedia) return () => {
      };
      const s = window.matchMedia(e);
      return s.addEventListener("change", r), () => s.removeEventListener("change", r);
    },
    [e]
  );
  return U(
    e ? a : ee,
    () => e != null && typeof window < "u" && window.matchMedia ? !window.matchMedia(e).matches : !1,
    () => !1
  );
}
function E({ size: n, children: e, className: a }) {
  return /* @__PURE__ */ t(
    "svg",
    {
      width: n,
      height: n,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.75,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      className: o("shrink-0", a),
      children: e
    }
  );
}
const R = (n) => n === "nested" ? "px-[calc(var(--su-table-gap)/2)] first:ps-[15px] last:pe-[15px]" : "px-[calc(var(--su-table-gap)/2)] first:ps-su4 last:pe-su4", $ = "border-b border-solid border-border", F = (n) => n === "nested" ? "px-[15px]" : "px-su4", A = "border-b border-solid border-border last:border-b-0", P = "block min-w-0 p-0 empty:hidden", ne = "[&:has(>[data-su-stack-end])]:before:content-empty [&:has(>[data-su-stack-end])]:before:order-1 [&:has(>[data-su-stack-end])]:before:basis-full [&>[data-su-stack-end]~*]:order-2 [&:has(>[data-su-stack-end])>:not([data-su-stack-end]~*)]:-mb-[2px]";
function K(n, e, a) {
  return o(n === "first" && !a ? "pt-[10px] pb-0 align-top" : n === "meta" ? "pt-0 pb-[9px] align-top" : "py-[3px] align-middle", n === "first" && !a || e ? void 0 : $);
}
function x({
  striped: n,
  bordered: e,
  size: a = "default",
  empty: r,
  footer: s,
  footerWrap: l = !1,
  loading: i = !1,
  stack: c,
  header: p,
  headerHidden: h = !1,
  stickyHeader: v = !1,
  panelClassName: g,
  columnGap: m,
  className: f,
  style: k,
  children: M,
  ...D
}) {
  const B = te(c), H = d(b), N = c ? B : H, C = v && !N, G = O(() => ({ hidden: h, sticky: C }), [h, C]);
  return /* @__PURE__ */ t(y.Provider, { value: a, children: /* @__PURE__ */ t(j.Provider, { value: void 0, children: /* @__PURE__ */ t(b.Provider, { value: N, children: /* @__PURE__ */ t(_.Provider, { value: G, children: /* @__PURE__ */ u("div", { className: o("su-panel font-sans text-ink", C && "flex flex-col min-h-0", g), children: [
    p != null ? /* @__PURE__ */ t(
      "div",
      {
        className: o(
          // 5 above and below, not 6: with the 1px rule that leaves 28 of the nested 40 and
          // 32 of the 44, so a small button or a 32 control does not grow the strip.
          "flex flex-wrap items-center gap-x-su3 gap-y-su1 shrink-0 py-[5px] border-b border-solid border-border text-body text-ink",
          a === "nested" ? "min-h-[40px] px-[15px]" : "min-h-[var(--su-panel-header)] px-su4"
        ),
        children: p
      }
    ) : null,
    /* @__PURE__ */ t(
      "div",
      {
        className: N ? "relative" : C ? "relative flex-1 min-h-0 overflow-auto" : "relative overflow-x-auto",
        children: /* @__PURE__ */ t(
          "table",
          {
            "aria-busy": i || void 0,
            role: N ? "list" : void 0,
            style: {
              "--su-table-gap": m != null ? `${m}px` : "var(--su-table-column-gap)",
              ...k
            },
            className: o(
              N ? "block w-full text-start" : "w-full border-separate [border-spacing:0] text-start",
              a === "nested" ? "text-small" : "text-body",
              f
            ),
            ...D,
            children: M
          }
        )
      }
    ),
    r,
    s != null ? (
      // The block padding is opt-in: a footer that pads itself (the app's pager) would grow
      // by it. 5 with the 1px rule leaves 33 of the 44, so a 32 control still fits one line.
      /* @__PURE__ */ t(
        "div",
        {
          className: o(
            "flex items-center gap-x-su2 shrink-0 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2",
            l && "flex-wrap gap-y-su1 py-[5px]"
          ),
          children: s
        }
      )
    ) : null
  ] }) }) }) }) });
}
function ae({ className: n, children: e, ...a }) {
  const r = d(b);
  return /* @__PURE__ */ t(j.Provider, { value: "head", children: /* @__PURE__ */ t("thead", { className: o(r && "hidden", n), ...a, children: e }) });
}
function se({ className: n, children: e, ...a }) {
  const r = d(b);
  return /* @__PURE__ */ t(j.Provider, { value: "body", children: /* @__PURE__ */ t("tbody", { role: r ? "none" : void 0, className: o(r && "block", n), ...a, children: e }) });
}
function re(n) {
  let e = 0, a = 0;
  return X.forEach(n, (r) => {
    if (!Y(r)) return;
    const s = Math.max(1, r.props.colSpan ?? 1);
    e += s, (r.props.rowSpan ?? 1) > 1 && (a += s);
  }), { total: e, spanned: a };
}
function oe({
  selected: n = !1,
  expanded: e = !1,
  meta: a,
  metaStart: r = 2,
  metaRowProps: s,
  className: l,
  children: i,
  ...c
}) {
  const p = d(j), h = d(y), v = d(b), g = d(_);
  if (p === "head")
    return /* @__PURE__ */ t(
      "tr",
      {
        className: o(
          // A hidden header row takes no height; its cells are still the columns' headers.
          g.hidden ? void 0 : h === "nested" ? "h-[var(--su-row-nested-header)]" : "h-[var(--su-row-header)]",
          l
        ),
        ...c,
        children: i
      }
    );
  const m = n ? "bg-action-subtle [@media(hover:hover)]:hover:bg-action-subtle-hover" : e ? "bg-surface-2 [@media(hover:hover)]:hover:bg-surface-hover" : "[@media(hover:hover)]:hover:bg-surface-hover", f = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", k = h === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]";
  if (v)
    return /* @__PURE__ */ t(w.Provider, { value: { line: "single", expanded: e }, children: /* @__PURE__ */ u(
      "tr",
      {
        role: "listitem",
        "data-state": n ? "selected" : void 0,
        className: o(
          "flex flex-wrap items-baseline gap-x-su3 gap-y-[2px] py-su2",
          ne,
          F(h),
          e ? void 0 : A,
          m,
          f,
          l
        ),
        ...c,
        children: [
          i,
          a != null ? /* @__PURE__ */ t("td", { className: o(P, "basis-full order-last"), children: a }) : null
        ]
      }
    ) });
  if (a == null)
    return /* @__PURE__ */ t(w.Provider, { value: { line: "single", expanded: e }, children: /* @__PURE__ */ t(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: o(k, m, f, "[&:last-child>*]:border-b-0", l),
        ...c,
        children: i
      }
    ) });
  const { total: M, spanned: D } = re(i), B = Math.max(0, Math.min(r - 1, M - 1)), H = Math.max(1, M - B - D), N = n ? "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-action-subtle-hover" : "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-surface-hover", C = n ? "[@media(hover:hover)]:[&:hover+tr]:bg-action-subtle-hover" : "[@media(hover:hover)]:[&:hover+tr]:bg-surface-hover";
  return /* @__PURE__ */ u(T, { children: [
    /* @__PURE__ */ t(w.Provider, { value: { line: "first", expanded: e }, children: /* @__PURE__ */ t(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: o(
          "h-[30px] [&:nth-last-child(2)>*]:border-b-0",
          m,
          N,
          C,
          f,
          l
        ),
        ...c,
        children: i
      }
    ) }),
    /* @__PURE__ */ t(w.Provider, { value: { line: "meta", expanded: e }, children: /* @__PURE__ */ u(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        ...s,
        className: o(
          "h-[30px]",
          m,
          f,
          "[&:last-child>*]:border-b-0",
          s == null ? void 0 : s.className
        ),
        children: [
          Array.from({ length: B }, (G, J) => /* @__PURE__ */ t(z, {}, J)),
          /* @__PURE__ */ t(z, { colSpan: H, children: a })
        ]
      }
    ) })
  ] });
}
function le({
  numeric: n = !1,
  sort: e,
  onSort: a,
  facet: r,
  className: s,
  children: l,
  ...i
}) {
  const c = d(j), p = d(y), { line: h, expanded: v } = d(w), g = d(b), m = d(_);
  if (c === "body")
    return /* @__PURE__ */ t(
      "th",
      {
        className: o(
          g ? P : R(p),
          g ? void 0 : K(h, v, (i.rowSpan ?? 1) > 1),
          "[font-weight:inherit]",
          n && !g ? "text-end" : "text-start",
          s
        ),
        ...i,
        children: l
      }
    );
  if (m.hidden)
    return /* @__PURE__ */ t("th", { "aria-sort": e, className: o("h-0 p-0 border-0 font-normal text-start", s), ...i, children: /* @__PURE__ */ t("span", { className: "absolute w-px h-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]", children: l }) });
  const f = e === "ascending" || e === "descending", k = f ? /* @__PURE__ */ u(E, { size: 14, children: [
    /* @__PURE__ */ t("path", { d: "M12 5l0 14" }),
    e === "ascending" ? /* @__PURE__ */ u(T, { children: [
      /* @__PURE__ */ t("path", { d: "M18 11l-6 -6" }),
      /* @__PURE__ */ t("path", { d: "M6 11l6 -6" })
    ] }) : /* @__PURE__ */ u(T, { children: [
      /* @__PURE__ */ t("path", { d: "M18 13l-6 6" }),
      /* @__PURE__ */ t("path", { d: "M6 13l6 6" })
    ] })
  ] }) : null, M = a ? /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      onClick: a,
      className: "inline-flex items-center gap-su1 min-w-0 p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer whitespace-nowrap su-focus-ring [@media(hover:hover)]:hover:text-ink",
      children: [
        l,
        k
      ]
    }
  ) : k ? /* @__PURE__ */ u(T, { children: [
    l,
    k
  ] }) : l;
  return /* @__PURE__ */ t(
    "th",
    {
      "aria-sort": e,
      className: o(
        R(p),
        "py-[4px] align-middle bg-surface-2 font-sans font-medium whitespace-nowrap",
        // Pinned to the top of the panel's scroller; the rule travels with the cell.
        m.sticky && "sticky top-0 z-[1]",
        $,
        p === "nested" ? "text-micro" : "text-small",
        f ? "text-ink" : "text-ink-2",
        n ? "text-end" : "text-start",
        s
      ),
      ...i,
      children: r != null || k || a ? /* @__PURE__ */ u("span", { className: "inline-flex items-center gap-su1 min-w-0 max-w-full align-middle", children: [
        M,
        r
      ] }) : l
    }
  );
}
const V = {
  text: void 0,
  id: "su-id whitespace-nowrap",
  idSecondary: "font-mono text-small text-ink-2 whitespace-nowrap",
  secondary: "text-ink-2",
  number: "su-tabular whitespace-nowrap",
  empty: "text-ink-3",
  control: "w-px whitespace-nowrap",
  actions: "w-px whitespace-nowrap"
}, L = "max-w-full [overflow-wrap:anywhere]", ie = {
  ...V,
  id: `su-id ${L}`,
  idSecondary: `font-mono text-small text-ink-2 ${L}`,
  number: `su-tabular ${L}`,
  control: "shrink-0 whitespace-nowrap",
  actions: "shrink-0 ms-auto whitespace-nowrap"
};
function z({
  numeric: n = !1,
  kind: e = "text",
  stackEnd: a = !1,
  className: r,
  children: s,
  rowSpan: l,
  ...i
}) {
  const c = d(y), { line: p, expanded: h } = d(w), v = d(b), g = n || e === "number" || e === "actions", m = e === "empty" && s == null ? "—" : s;
  if (v)
    return /* @__PURE__ */ t(
      "td",
      {
        rowSpan: l,
        "data-su-stack-end": a ? "" : void 0,
        className: o(
          P,
          ie[e],
          a && "shrink-0 ms-auto",
          n && e !== "number" ? `su-tabular ${L}` : void 0,
          r
        ),
        ...i,
        children: m
      }
    );
  const f = p === "first" && (l ?? 1) <= 1 && (e === "control" || e === "actions");
  return /* @__PURE__ */ t(
    "td",
    {
      rowSpan: l,
      className: o(
        R(c),
        K(p, h, (l ?? 1) > 1),
        V[e],
        n && e !== "number" ? "su-tabular whitespace-nowrap" : void 0,
        g ? "text-end" : void 0,
        r
      ),
      ...i,
      children: f && m != null ? /* @__PURE__ */ t("span", { className: o("flex items-center h-[20px]", e === "actions" && "justify-end"), children: m }) : m
    }
  );
}
function de({ className: n, children: e, ...a }) {
  const r = d(y), s = d(b);
  return /* @__PURE__ */ t(w.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ t(
    "tr",
    {
      role: s ? "listitem" : void 0,
      className: o(
        s ? "flex items-center gap-su2 min-h-[var(--su-row-group)]" : "h-[var(--su-row-group)] [&:last-child>*]:border-b-0",
        s ? F(r) : void 0,
        s ? A : void 0,
        "bg-surface-2 text-small font-semibold text-ink",
        n
      ),
      ...a,
      children: e
    }
  ) });
}
const ce = q(
  function({ expanded: e = !1, type: a = "button", className: r, ...s }, l) {
    return /* @__PURE__ */ t(
      "button",
      {
        ref: l,
        type: a,
        "aria-expanded": e,
        className: o(
          // On a touch screen the 24 box is a 44 target, as on Button.
          "inline-flex items-center justify-center shrink-0 size-[24px] p-0 border-none rounded-su-tag bg-transparent text-ink-3 cursor-pointer align-middle su-focus-ring [@media(hover:none)]:su-hit-44",
          "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
          "[@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink",
          r
        ),
        ...s,
        children: /* @__PURE__ */ t(E, { size: 16, className: e ? void 0 : "rtl:-scale-x-100", children: e ? /* @__PURE__ */ t("path", { d: "M6 9l6 6l6 -6" }) : /* @__PURE__ */ t("path", { d: "M9 6l6 6l-6 6" }) })
      }
    );
  }
), ue = q(function({ count: e, active: a = !1, type: r = "button", className: s, ...l }, i) {
  const c = a || (e ?? 0) > 0;
  return /* @__PURE__ */ u(
    "button",
    {
      ref: i,
      type: r,
      className: o(
        "inline-flex items-center shrink-0 h-[24px] p-0 border-none rounded-su-tag font-sans cursor-pointer align-middle su-focus-ring [@media(hover:none)]:su-hit-44",
        "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
        c ? "gap-[2px] ps-[5px] pe-[6px] bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover" : "justify-center w-[24px] bg-transparent text-ink-3 [@media(hover:hover)]:hover:bg-fill data-[state=open]:bg-fill",
        s
      ),
      ...l,
      children: [
        /* @__PURE__ */ t(E, { size: 14, children: /* @__PURE__ */ t("path", { d: "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" }) }),
        c && e ? /* @__PURE__ */ t("span", { className: "text-micro font-semibold su-tabular", children: e }) : null
      ]
    }
  );
});
function he({
  colSpan: n,
  rowProps: e,
  startInset: a,
  strip: r = !1,
  className: s,
  style: l,
  children: i,
  ...c
}) {
  const p = d(y), h = d(b);
  return /* @__PURE__ */ t(
    "tr",
    {
      role: h ? "listitem" : void 0,
      ...e,
      className: o(h && "block", "[&:last-child>*]:border-b-0", e == null ? void 0 : e.className),
      children: /* @__PURE__ */ t(
        "td",
        {
          colSpan: n,
          className: o(
            // Stacked: no disclosure column to line up behind, so the block starts at the row's edge.
            h ? "block pt-su3" : "pt-su3 ps-[56px] pe-su4",
            r ? "pb-su3" : "pb-su4",
            h ? F(p) : void 0,
            "bg-surface-2",
            $,
            s
          ),
          style: a != null && !h ? { paddingInlineStart: a, ...l } : l,
          ...c,
          children: i
        }
      )
    }
  );
}
function pe({
  colSpan: n,
  startColumn: e = 1,
  action: a,
  className: r,
  children: s,
  ...l
}) {
  const i = d(y), c = d(b), p = c ? 0 : Math.max(0, Math.min(e - 1, n - 1));
  return /* @__PURE__ */ t(w.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ u(
    "tr",
    {
      role: c ? "listitem" : void 0,
      className: o(
        c ? "block" : "h-[var(--su-row-group)]",
        "text-small [&:last-child>*]:border-b-0",
        r
      ),
      ...l,
      children: [
        Array.from({ length: p }, (h, v) => /* @__PURE__ */ t(z, {}, v)),
        /* @__PURE__ */ t(
          "td",
          {
            colSpan: n - p,
            className: o(
              // Stacked: 9 + 18 + 9 keeps the fold line at 36.
              c ? "block py-[9px]" : "py-[4px] align-middle",
              c ? F(i) : R(i),
              $
            ),
            children: /* @__PURE__ */ u("span", { className: "inline-flex items-baseline gap-su3 flex-wrap", children: [
              /* @__PURE__ */ t("span", { className: "text-ink-2", children: s }),
              a != null ? /* @__PURE__ */ t("span", { className: "font-medium", children: a }) : null
            ] })
          }
        )
      ]
    }
  ) });
}
const W = {
  neutral: "text-neutral-text",
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text"
};
function me({ tone: n, lead: e, action: a, className: r, children: s, ...l }) {
  return d(b) ? /* @__PURE__ */ u("span", { className: o("block min-w-0 break-words text-small text-ink-2", r), ...l, children: [
    n ? /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: o(
          "inline-block size-[6px] me-[6px] align-middle rounded-su-round forced-colors:[forced-color-adjust:none]",
          I[n]
        )
      }
    ) : null,
    e != null ? /* @__PURE__ */ u(T, { children: [
      /* @__PURE__ */ t("span", { className: o("font-medium", n ? W[n] : "text-ink"), children: e }),
      " "
    ] }) : null,
    s,
    a != null ? /* @__PURE__ */ u(T, { children: [
      " ",
      /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" }),
      " ",
      /* @__PURE__ */ t("span", { className: "font-medium", children: a })
    ] }) : null
  ] }) : /* @__PURE__ */ u(
    "span",
    {
      className: o(
        "flex items-center gap-[6px] min-w-0 text-small text-ink-2 whitespace-nowrap",
        r
      ),
      ...l,
      children: [
        n ? /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: o(
              "inline-block shrink-0 size-[6px] rounded-su-round forced-colors:[forced-color-adjust:none]",
              I[n]
            )
          }
        ) : null,
        e != null ? /* @__PURE__ */ t("span", { className: o("shrink-0 font-medium", n ? W[n] : "text-ink"), children: e }) : null,
        s != null ? /* @__PURE__ */ t("span", { className: "min-w-0 truncate", children: s }) : null,
        a != null ? /* @__PURE__ */ u(T, { children: [
          /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ t("span", { className: "shrink-0 font-medium", children: a })
        ] }) : null
      ]
    }
  );
}
function be({ columns: n, className: e, ...a }) {
  const r = d(y), s = d(b);
  return /* @__PURE__ */ t(w.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ t(
    "tr",
    {
      "aria-hidden": "true",
      className: o(
        r === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]",
        s ? "flex items-center gap-su3" : "[&:last-child>*]:border-b-0",
        s ? F(r) : void 0,
        s ? A : void 0,
        e
      ),
      ...a,
      children: Array.from({ length: n }, (l, i) => /* @__PURE__ */ t(z, { className: s ? "flex-1" : void 0, children: /* @__PURE__ */ t("span", { className: "block h-[12px] w-full max-w-[160px] rounded-su-tag su-skeleton-active" }) }, i))
    }
  ) });
}
x.Head = ae;
x.Body = se;
x.Row = oe;
x.Th = le;
x.Td = z;
x.GroupRow = de;
x.Disclosure = ce;
x.Facet = ue;
x.Detail = he;
x.FoldRow = pe;
x.Meta = me;
x.SkeletonRow = be;
export {
  x as Table,
  se as TableBody,
  he as TableDetail,
  ce as TableDisclosure,
  ue as TableFacet,
  pe as TableFoldRow,
  de as TableGroupRow,
  ae as TableHead,
  me as TableMeta,
  oe as TableRow,
  be as TableSkeletonRow,
  z as TableTd,
  le as TableTh
};
