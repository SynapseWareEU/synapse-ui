import { jsx as t, jsxs as u, Fragment as k } from "react/jsx-runtime";
import { useContext as d, forwardRef as L, useCallback as K, useSyncExternalStore as V, createContext as j, Children as $, isValidElement as J } from "react";
import { cn as o } from "../../utils/cn.js";
import { statusDotToneClass as E } from "./StatusDot.js";
const w = j("default"), T = j(void 0), g = j({
  line: "single",
  expanded: !1
}), b = j(!1), O = { sm: 640, md: 768, lg: 1024, xl: 1280 }, Q = () => () => {
};
function U(n) {
  const e = n ? `(min-width: ${O[n]}px)` : void 0, s = K(
    (a) => {
      if (!e || typeof window > "u" || !window.matchMedia) return () => {
      };
      const r = window.matchMedia(e);
      return r.addEventListener("change", a), () => r.removeEventListener("change", a);
    },
    [e]
  );
  return V(
    e ? s : Q,
    () => e != null && typeof window < "u" && window.matchMedia ? !window.matchMedia(e).matches : !1,
    () => !1
  );
}
function F({ size: n, children: e, className: s }) {
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
      className: o("shrink-0", s),
      children: e
    }
  );
}
const z = (n) => n === "nested" ? "px-su2 first:ps-[15px] last:pe-[15px]" : "px-su2 first:ps-su4 last:pe-su4", S = "border-b border-solid border-border", M = (n) => n === "nested" ? "px-[15px]" : "px-su4", R = "border-b border-solid border-border last:border-b-0", B = "block min-w-0 p-0 empty:hidden";
function _(n, e, s) {
  return o(n === "first" && !s ? "pt-[10px] pb-0 align-top" : n === "meta" ? "pt-0 pb-[9px] align-top" : "py-[3px] align-middle", n === "first" && !s || e ? void 0 : S);
}
function v({
  striped: n,
  bordered: e,
  size: s = "default",
  empty: a,
  footer: r,
  loading: l = !1,
  stack: i,
  className: c,
  children: m,
  ...f
}) {
  const x = U(i), h = d(b), p = i ? x : h;
  return /* @__PURE__ */ t(w.Provider, { value: s, children: /* @__PURE__ */ t(T.Provider, { value: void 0, children: /* @__PURE__ */ t(b.Provider, { value: p, children: /* @__PURE__ */ u("div", { className: "su-panel font-sans text-ink", children: [
    /* @__PURE__ */ t("div", { className: p ? "relative" : "relative overflow-x-auto", children: /* @__PURE__ */ t(
      "table",
      {
        "aria-busy": l || void 0,
        role: p ? "list" : void 0,
        className: o(
          p ? "block w-full text-start" : "w-full border-separate [border-spacing:0] text-start",
          s === "nested" ? "text-small" : "text-body",
          c
        ),
        ...f,
        children: m
      }
    ) }),
    a,
    r != null ? /* @__PURE__ */ t("div", { className: "flex items-center gap-su2 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2", children: r }) : null
  ] }) }) }) });
}
function X({ className: n, children: e, ...s }) {
  const a = d(b);
  return /* @__PURE__ */ t(T.Provider, { value: "head", children: /* @__PURE__ */ t("thead", { className: o(a && "hidden", n), ...s, children: e }) });
}
function Y({ className: n, children: e, ...s }) {
  const a = d(b);
  return /* @__PURE__ */ t(T.Provider, { value: "body", children: /* @__PURE__ */ t("tbody", { role: a ? "none" : void 0, className: o(a && "block", n), ...s, children: e }) });
}
function Z(n) {
  let e = 0, s = 0;
  return $.forEach(n, (a) => {
    if (!J(a)) return;
    const r = Math.max(1, a.props.colSpan ?? 1);
    e += r, (a.props.rowSpan ?? 1) > 1 && (s += r);
  }), { total: e, spanned: s };
}
function ee({
  selected: n = !1,
  expanded: e = !1,
  meta: s,
  metaStart: a = 2,
  metaRowProps: r,
  className: l,
  children: i,
  ...c
}) {
  const m = d(T), f = d(w), x = d(b);
  if (m === "head")
    return /* @__PURE__ */ t(
      "tr",
      {
        className: o(
          f === "nested" ? "h-[var(--su-row-nested-header)]" : "h-[var(--su-row-header)]",
          l
        ),
        ...c,
        children: i
      }
    );
  const h = n ? "bg-action-subtle [@media(hover:hover)]:hover:bg-action-subtle-hover" : e ? "bg-surface-2 [@media(hover:hover)]:hover:bg-surface-hover" : "[@media(hover:hover)]:hover:bg-surface-hover", p = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", N = f === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]";
  if (x)
    return /* @__PURE__ */ t(g.Provider, { value: { line: "single", expanded: e }, children: /* @__PURE__ */ u(
      "tr",
      {
        role: "listitem",
        "data-state": n ? "selected" : void 0,
        className: o(
          "flex flex-wrap items-baseline gap-x-su3 gap-y-[2px] py-su2",
          M(f),
          e ? void 0 : R,
          h,
          p,
          l
        ),
        ...c,
        children: [
          i,
          s != null ? /* @__PURE__ */ t("td", { className: o(B, "basis-full order-last"), children: s }) : null
        ]
      }
    ) });
  if (s == null)
    return /* @__PURE__ */ t(g.Provider, { value: { line: "single", expanded: e }, children: /* @__PURE__ */ t(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: o(N, h, p, "[&:last-child>*]:border-b-0", l),
        ...c,
        children: i
      }
    ) });
  const { total: C, spanned: G } = Z(i), D = Math.max(0, Math.min(a - 1, C - 1)), I = Math.max(1, C - D - G), P = n ? "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-action-subtle-hover" : "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-surface-hover", W = n ? "[@media(hover:hover)]:[&:hover+tr]:bg-action-subtle-hover" : "[@media(hover:hover)]:[&:hover+tr]:bg-surface-hover";
  return /* @__PURE__ */ u(k, { children: [
    /* @__PURE__ */ t(g.Provider, { value: { line: "first", expanded: e }, children: /* @__PURE__ */ t(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: o(
          "h-[30px] [&:nth-last-child(2)>*]:border-b-0",
          h,
          P,
          W,
          p,
          l
        ),
        ...c,
        children: i
      }
    ) }),
    /* @__PURE__ */ t(g.Provider, { value: { line: "meta", expanded: e }, children: /* @__PURE__ */ u(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        ...r,
        className: o(
          "h-[30px]",
          h,
          p,
          "[&:last-child>*]:border-b-0",
          r == null ? void 0 : r.className
        ),
        children: [
          Array.from({ length: D }, (ce, q) => /* @__PURE__ */ t(y, {}, q)),
          /* @__PURE__ */ t(y, { colSpan: I, children: s })
        ]
      }
    ) })
  ] });
}
function te({
  numeric: n = !1,
  sort: e,
  onSort: s,
  facet: a,
  className: r,
  children: l,
  ...i
}) {
  const c = d(T), m = d(w), { line: f, expanded: x } = d(g), h = d(b);
  if (c === "body")
    return /* @__PURE__ */ t(
      "th",
      {
        className: o(
          h ? B : z(m),
          h ? void 0 : _(f, x, (i.rowSpan ?? 1) > 1),
          "[font-weight:inherit]",
          n && !h ? "text-end" : "text-start",
          r
        ),
        ...i,
        children: l
      }
    );
  const p = e === "ascending" || e === "descending", N = p ? /* @__PURE__ */ u(F, { size: 14, children: [
    /* @__PURE__ */ t("path", { d: "M12 5l0 14" }),
    e === "ascending" ? /* @__PURE__ */ u(k, { children: [
      /* @__PURE__ */ t("path", { d: "M18 11l-6 -6" }),
      /* @__PURE__ */ t("path", { d: "M6 11l6 -6" })
    ] }) : /* @__PURE__ */ u(k, { children: [
      /* @__PURE__ */ t("path", { d: "M18 13l-6 6" }),
      /* @__PURE__ */ t("path", { d: "M6 13l6 6" })
    ] })
  ] }) : null, C = s ? /* @__PURE__ */ u(
    "button",
    {
      type: "button",
      onClick: s,
      className: "inline-flex items-center gap-su1 min-w-0 p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer whitespace-nowrap su-focus-ring [@media(hover:hover)]:hover:text-ink",
      children: [
        l,
        N
      ]
    }
  ) : N ? /* @__PURE__ */ u(k, { children: [
    l,
    N
  ] }) : l;
  return /* @__PURE__ */ t(
    "th",
    {
      "aria-sort": e,
      className: o(
        z(m),
        "py-[4px] align-middle bg-surface-2 font-sans font-medium whitespace-nowrap",
        S,
        m === "nested" ? "text-micro" : "text-small",
        p ? "text-ink" : "text-ink-2",
        n ? "text-end" : "text-start",
        r
      ),
      ...i,
      children: a != null || N || s ? /* @__PURE__ */ u("span", { className: "inline-flex items-center gap-su1 min-w-0 max-w-full align-middle", children: [
        C,
        a
      ] }) : l
    }
  );
}
const A = {
  text: void 0,
  id: "su-id whitespace-nowrap",
  idSecondary: "font-mono text-small text-ink-2 whitespace-nowrap",
  secondary: "text-ink-2",
  number: "su-tabular whitespace-nowrap",
  empty: "text-ink-3",
  control: "w-px whitespace-nowrap",
  actions: "w-px whitespace-nowrap"
}, ne = {
  ...A,
  control: "shrink-0 whitespace-nowrap",
  actions: "shrink-0 ms-auto whitespace-nowrap"
};
function y({
  numeric: n = !1,
  kind: e = "text",
  className: s,
  children: a,
  rowSpan: r,
  ...l
}) {
  const i = d(w), { line: c, expanded: m } = d(g), f = d(b), x = n || e === "number" || e === "actions", h = e === "empty" && a == null ? "—" : a;
  if (f)
    return /* @__PURE__ */ t(
      "td",
      {
        rowSpan: r,
        className: o(
          B,
          ne[e],
          n && e !== "number" ? "su-tabular whitespace-nowrap" : void 0,
          s
        ),
        ...l,
        children: h
      }
    );
  const p = c === "first" && (r ?? 1) <= 1 && (e === "control" || e === "actions");
  return /* @__PURE__ */ t(
    "td",
    {
      rowSpan: r,
      className: o(
        z(i),
        _(c, m, (r ?? 1) > 1),
        A[e],
        n && e !== "number" ? "su-tabular whitespace-nowrap" : void 0,
        x ? "text-end" : void 0,
        s
      ),
      ...l,
      children: p && h != null ? /* @__PURE__ */ t("span", { className: o("flex items-center h-[20px]", e === "actions" && "justify-end"), children: h }) : h
    }
  );
}
function se({ className: n, children: e, ...s }) {
  const a = d(w), r = d(b);
  return /* @__PURE__ */ t(g.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ t(
    "tr",
    {
      role: r ? "listitem" : void 0,
      className: o(
        r ? "flex items-center gap-su2 min-h-[var(--su-row-group)]" : "h-[var(--su-row-group)] [&:last-child>*]:border-b-0",
        r ? M(a) : void 0,
        r ? R : void 0,
        "bg-surface-2 text-small font-semibold text-ink",
        n
      ),
      ...s,
      children: e
    }
  ) });
}
const re = L(
  function({ expanded: e = !1, type: s = "button", className: a, ...r }, l) {
    return /* @__PURE__ */ t(
      "button",
      {
        ref: l,
        type: s,
        "aria-expanded": e,
        className: o(
          "inline-flex items-center justify-center shrink-0 size-[24px] p-0 border-none rounded-su-tag bg-transparent text-ink-3 cursor-pointer align-middle su-focus-ring",
          "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
          "[@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink",
          a
        ),
        ...r,
        children: /* @__PURE__ */ t(F, { size: 16, className: e ? void 0 : "rtl:-scale-x-100", children: e ? /* @__PURE__ */ t("path", { d: "M6 9l6 6l6 -6" }) : /* @__PURE__ */ t("path", { d: "M9 6l6 6l-6 6" }) })
      }
    );
  }
), ae = L(function({ count: e, active: s = !1, type: a = "button", className: r, ...l }, i) {
  const c = s || (e ?? 0) > 0;
  return /* @__PURE__ */ u(
    "button",
    {
      ref: i,
      type: a,
      className: o(
        "inline-flex items-center shrink-0 h-[24px] p-0 border-none rounded-su-tag font-sans cursor-pointer align-middle su-focus-ring",
        "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
        c ? "gap-[2px] ps-[5px] pe-[6px] bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover" : "justify-center w-[24px] bg-transparent text-ink-3 [@media(hover:hover)]:hover:bg-fill data-[state=open]:bg-fill",
        r
      ),
      ...l,
      children: [
        /* @__PURE__ */ t(F, { size: 14, children: /* @__PURE__ */ t("path", { d: "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" }) }),
        c && e ? /* @__PURE__ */ t("span", { className: "text-micro font-semibold su-tabular", children: e }) : null
      ]
    }
  );
});
function oe({ colSpan: n, rowProps: e, className: s, children: a, ...r }) {
  const l = d(w), i = d(b);
  return /* @__PURE__ */ t(
    "tr",
    {
      role: i ? "listitem" : void 0,
      ...e,
      className: o(i && "block", "[&:last-child>*]:border-b-0", e == null ? void 0 : e.className),
      children: /* @__PURE__ */ t(
        "td",
        {
          colSpan: n,
          className: o(
            // Stacked: no disclosure column to line up behind, so the block starts at the row's edge.
            i ? "block pt-su3 pb-su4" : "pt-su3 pb-su4 ps-[56px] pe-su4",
            i ? M(l) : void 0,
            "bg-surface-2",
            S,
            s
          ),
          ...r,
          children: a
        }
      )
    }
  );
}
function le({
  colSpan: n,
  startColumn: e = 1,
  action: s,
  className: a,
  children: r,
  ...l
}) {
  const i = d(w), c = d(b), m = c ? 0 : Math.max(0, Math.min(e - 1, n - 1));
  return /* @__PURE__ */ t(g.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ u(
    "tr",
    {
      role: c ? "listitem" : void 0,
      className: o(
        c ? "block" : "h-[var(--su-row-group)]",
        "text-small [&:last-child>*]:border-b-0",
        a
      ),
      ...l,
      children: [
        Array.from({ length: m }, (f, x) => /* @__PURE__ */ t(y, {}, x)),
        /* @__PURE__ */ t(
          "td",
          {
            colSpan: n - m,
            className: o(
              // Stacked: 9 + 18 + 9 keeps the fold line at 36.
              c ? "block py-[9px]" : "py-[4px] align-middle",
              c ? M(i) : z(i),
              S
            ),
            children: /* @__PURE__ */ u("span", { className: "inline-flex items-baseline gap-su3 flex-wrap", children: [
              /* @__PURE__ */ t("span", { className: "text-ink-2", children: r }),
              s != null ? /* @__PURE__ */ t("span", { className: "font-medium", children: s }) : null
            ] })
          }
        )
      ]
    }
  ) });
}
const H = {
  neutral: "text-neutral-text",
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text"
};
function ie({ tone: n, lead: e, action: s, className: a, children: r, ...l }) {
  return d(b) ? /* @__PURE__ */ u("span", { className: o("block min-w-0 break-words text-small text-ink-2", a), ...l, children: [
    n ? /* @__PURE__ */ t(
      "span",
      {
        "aria-hidden": "true",
        className: o(
          "inline-block size-[6px] me-[6px] align-middle rounded-su-round forced-colors:[forced-color-adjust:none]",
          E[n]
        )
      }
    ) : null,
    e != null ? /* @__PURE__ */ u(k, { children: [
      /* @__PURE__ */ t("span", { className: o("font-medium", n ? H[n] : "text-ink"), children: e }),
      " "
    ] }) : null,
    r,
    s != null ? /* @__PURE__ */ u(k, { children: [
      " ",
      /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" }),
      " ",
      /* @__PURE__ */ t("span", { className: "font-medium", children: s })
    ] }) : null
  ] }) : /* @__PURE__ */ u(
    "span",
    {
      className: o(
        "flex items-center gap-[6px] min-w-0 text-small text-ink-2 whitespace-nowrap",
        a
      ),
      ...l,
      children: [
        n ? /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: o(
              "inline-block shrink-0 size-[6px] rounded-su-round forced-colors:[forced-color-adjust:none]",
              E[n]
            )
          }
        ) : null,
        e != null ? /* @__PURE__ */ t("span", { className: o("shrink-0 font-medium", n ? H[n] : "text-ink"), children: e }) : null,
        r != null ? /* @__PURE__ */ t("span", { className: "min-w-0 truncate", children: r }) : null,
        s != null ? /* @__PURE__ */ u(k, { children: [
          /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ t("span", { className: "shrink-0 font-medium", children: s })
        ] }) : null
      ]
    }
  );
}
function de({ columns: n, className: e, ...s }) {
  const a = d(w), r = d(b);
  return /* @__PURE__ */ t(g.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ t(
    "tr",
    {
      "aria-hidden": "true",
      className: o(
        a === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]",
        r ? "flex items-center gap-su3" : "[&:last-child>*]:border-b-0",
        r ? M(a) : void 0,
        r ? R : void 0,
        e
      ),
      ...s,
      children: Array.from({ length: n }, (l, i) => /* @__PURE__ */ t(y, { className: r ? "flex-1" : void 0, children: /* @__PURE__ */ t("span", { className: "block h-[12px] w-full max-w-[160px] rounded-su-tag su-skeleton-active" }) }, i))
    }
  ) });
}
v.Head = X;
v.Body = Y;
v.Row = ee;
v.Th = te;
v.Td = y;
v.GroupRow = se;
v.Disclosure = re;
v.Facet = ae;
v.Detail = oe;
v.FoldRow = le;
v.Meta = ie;
v.SkeletonRow = de;
export {
  v as Table,
  Y as TableBody,
  oe as TableDetail,
  re as TableDisclosure,
  ae as TableFacet,
  le as TableFoldRow,
  se as TableGroupRow,
  X as TableHead,
  ie as TableMeta,
  ee as TableRow,
  de as TableSkeletonRow,
  y as TableTd,
  te as TableTh
};
