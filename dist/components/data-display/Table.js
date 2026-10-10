import { jsx as e, jsxs as c, Fragment as w } from "react/jsx-runtime";
import { forwardRef as z, useContext as v, createContext as C, Children as _, isValidElement as B } from "react";
import { cn as l } from "../../utils/cn.js";
import { statusDotToneClass as A } from "./StatusDot.js";
const g = C("default"), k = C(void 0), b = C({
  line: "single",
  expanded: !1
});
function P({ size: n, children: t, className: r }) {
  return /* @__PURE__ */ e(
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
      className: l("shrink-0", r),
      children: t
    }
  );
}
const y = (n) => n === "nested" ? "px-su2 first:ps-[15px] last:pe-[15px]" : "px-su2 first:ps-su4 last:pe-su4", T = "border-b border-solid border-border";
function j(n, t, r) {
  return l(n === "first" && !r ? "pt-[10px] pb-0 align-top" : n === "meta" ? "pt-0 pb-[9px] align-top" : "py-[3px] align-middle", n === "first" && !r || t ? void 0 : T);
}
function u({
  striped: n,
  bordered: t,
  size: r = "default",
  empty: s,
  footer: a,
  loading: o = !1,
  className: i,
  children: d,
  ...h
}) {
  return /* @__PURE__ */ e(g.Provider, { value: r, children: /* @__PURE__ */ e(k.Provider, { value: void 0, children: /* @__PURE__ */ c("div", { className: "su-panel font-sans text-ink", children: [
    /* @__PURE__ */ e("div", { className: "relative overflow-x-auto", children: /* @__PURE__ */ e(
      "table",
      {
        "aria-busy": o || void 0,
        className: l(
          "w-full border-separate [border-spacing:0] text-start",
          r === "nested" ? "text-small" : "text-body",
          i
        ),
        ...h,
        children: d
      }
    ) }),
    s,
    a != null ? /* @__PURE__ */ e("div", { className: "flex items-center gap-su2 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2", children: a }) : null
  ] }) }) });
}
function G({ className: n, children: t, ...r }) {
  return /* @__PURE__ */ e(k.Provider, { value: "head", children: /* @__PURE__ */ e("thead", { className: n, ...r, children: t }) });
}
function L({ className: n, children: t, ...r }) {
  return /* @__PURE__ */ e(k.Provider, { value: "body", children: /* @__PURE__ */ e("tbody", { className: n, ...r, children: t }) });
}
function E(n) {
  let t = 0, r = 0;
  return _.forEach(n, (s) => {
    if (!B(s)) return;
    const a = Math.max(1, s.props.colSpan ?? 1);
    t += a, (s.props.rowSpan ?? 1) > 1 && (r += a);
  }), { total: t, spanned: r };
}
function I({
  selected: n = !1,
  expanded: t = !1,
  meta: r,
  metaStart: s = 2,
  className: a,
  children: o,
  ...i
}) {
  const d = v(k), h = v(g);
  if (d === "head")
    return /* @__PURE__ */ e(
      "tr",
      {
        className: l(
          h === "nested" ? "h-[var(--su-row-nested-header)]" : "h-[var(--su-row-header)]",
          a
        ),
        ...i,
        children: o
      }
    );
  const p = n ? "bg-action-subtle [@media(hover:hover)]:hover:bg-action-subtle-hover" : t ? "bg-surface-2 [@media(hover:hover)]:hover:bg-surface-hover" : "[@media(hover:hover)]:hover:bg-surface-hover", m = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", f = h === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]";
  if (r == null)
    return /* @__PURE__ */ e(b.Provider, { value: { line: "single", expanded: t }, children: /* @__PURE__ */ e(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: l(f, p, m, "[&:last-child>*]:border-b-0", a),
        ...i,
        children: o
      }
    ) });
  const { total: x, spanned: M } = E(o), R = Math.max(0, Math.min(s - 1, x - 1)), F = Math.max(1, x - R - M), D = n ? "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-action-subtle-hover" : "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-surface-hover", H = n ? "[@media(hover:hover)]:[&:hover+tr]:bg-action-subtle-hover" : "[@media(hover:hover)]:[&:hover+tr]:bg-surface-hover";
  return /* @__PURE__ */ c(w, { children: [
    /* @__PURE__ */ e(b.Provider, { value: { line: "first", expanded: t }, children: /* @__PURE__ */ e(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: l(
          "h-[30px] [&:nth-last-child(2)>*]:border-b-0",
          p,
          D,
          H,
          m,
          a
        ),
        ...i,
        children: o
      }
    ) }),
    /* @__PURE__ */ e(b.Provider, { value: { line: "meta", expanded: t }, children: /* @__PURE__ */ c(
      "tr",
      {
        "data-state": n ? "selected" : void 0,
        className: l("h-[30px]", p, m, "[&:last-child>*]:border-b-0"),
        children: [
          Array.from({ length: R }, (Z, S) => /* @__PURE__ */ e(N, {}, S)),
          /* @__PURE__ */ e(N, { colSpan: F, children: r })
        ]
      }
    ) })
  ] });
}
function V({
  numeric: n = !1,
  sort: t,
  onSort: r,
  facet: s,
  className: a,
  children: o,
  ...i
}) {
  const d = v(k), h = v(g), { line: p, expanded: m } = v(b);
  if (d === "body")
    return /* @__PURE__ */ e(
      "th",
      {
        className: l(
          y(h),
          j(p, m, (i.rowSpan ?? 1) > 1),
          "[font-weight:inherit]",
          n ? "text-end" : "text-start",
          a
        ),
        ...i,
        children: o
      }
    );
  const f = t === "ascending" || t === "descending", x = f ? /* @__PURE__ */ c(P, { size: 14, children: [
    /* @__PURE__ */ e("path", { d: "M12 5l0 14" }),
    t === "ascending" ? /* @__PURE__ */ c(w, { children: [
      /* @__PURE__ */ e("path", { d: "M18 11l-6 -6" }),
      /* @__PURE__ */ e("path", { d: "M6 11l6 -6" })
    ] }) : /* @__PURE__ */ c(w, { children: [
      /* @__PURE__ */ e("path", { d: "M18 13l-6 6" }),
      /* @__PURE__ */ e("path", { d: "M6 13l6 6" })
    ] })
  ] }) : null, M = r ? /* @__PURE__ */ c(
    "button",
    {
      type: "button",
      onClick: r,
      className: "inline-flex items-center gap-su1 p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer whitespace-nowrap su-focus-ring [@media(hover:hover)]:hover:text-ink",
      children: [
        o,
        x
      ]
    }
  ) : x ? /* @__PURE__ */ c(w, { children: [
    o,
    x
  ] }) : o;
  return /* @__PURE__ */ e(
    "th",
    {
      "aria-sort": t,
      className: l(
        y(h),
        "py-[4px] align-middle bg-surface-2 font-sans font-medium whitespace-nowrap",
        T,
        h === "nested" ? "text-micro" : "text-small",
        f ? "text-ink" : "text-ink-2",
        n ? "text-end" : "text-start",
        a
      ),
      ...i,
      children: s != null || x || r ? /* @__PURE__ */ c("span", { className: "inline-flex items-center gap-su1 align-middle", children: [
        M,
        s
      ] }) : o
    }
  );
}
const W = {
  text: void 0,
  id: "su-id whitespace-nowrap",
  idSecondary: "font-mono text-small text-ink-2 whitespace-nowrap",
  secondary: "text-ink-2",
  number: "su-tabular whitespace-nowrap",
  empty: "text-ink-3",
  control: "w-px whitespace-nowrap",
  actions: "w-px whitespace-nowrap"
};
function N({
  numeric: n = !1,
  kind: t = "text",
  className: r,
  children: s,
  rowSpan: a,
  ...o
}) {
  const i = v(g), { line: d, expanded: h } = v(b), p = n || t === "number" || t === "actions", m = t === "empty" && s == null ? "—" : s, f = d === "first" && (a ?? 1) <= 1 && (t === "control" || t === "actions");
  return /* @__PURE__ */ e(
    "td",
    {
      rowSpan: a,
      className: l(
        y(i),
        j(d, h, (a ?? 1) > 1),
        W[t],
        n && t !== "number" ? "su-tabular whitespace-nowrap" : void 0,
        p ? "text-end" : void 0,
        r
      ),
      ...o,
      children: f && m != null ? /* @__PURE__ */ e("span", { className: l("flex items-center h-[20px]", t === "actions" && "justify-end"), children: m }) : m
    }
  );
}
function q({ className: n, children: t, ...r }) {
  return /* @__PURE__ */ e(b.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ e(
    "tr",
    {
      className: l(
        "h-[var(--su-row-group)] bg-surface-2 text-small font-semibold text-ink [&:last-child>*]:border-b-0",
        n
      ),
      ...r,
      children: t
    }
  ) });
}
const J = z(
  function({ expanded: t = !1, type: r = "button", className: s, ...a }, o) {
    return /* @__PURE__ */ e(
      "button",
      {
        ref: o,
        type: r,
        "aria-expanded": t,
        className: l(
          "inline-flex items-center justify-center shrink-0 size-[24px] p-0 border-none rounded-su-tag bg-transparent text-ink-3 cursor-pointer align-middle su-focus-ring",
          "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
          "[@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink",
          s
        ),
        ...a,
        children: /* @__PURE__ */ e(P, { size: 16, className: t ? void 0 : "rtl:-scale-x-100", children: t ? /* @__PURE__ */ e("path", { d: "M6 9l6 6l6 -6" }) : /* @__PURE__ */ e("path", { d: "M9 6l6 6l-6 6" }) })
      }
    );
  }
), K = z(function({ count: t, active: r = !1, type: s = "button", className: a, ...o }, i) {
  const d = r || (t ?? 0) > 0;
  return /* @__PURE__ */ c(
    "button",
    {
      ref: i,
      type: s,
      className: l(
        "inline-flex items-center shrink-0 h-[24px] p-0 border-none rounded-su-tag font-sans cursor-pointer align-middle su-focus-ring",
        "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
        d ? "gap-[2px] ps-[5px] pe-[6px] bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover" : "justify-center w-[24px] bg-transparent text-ink-3 [@media(hover:hover)]:hover:bg-fill data-[state=open]:bg-fill",
        a
      ),
      ...o,
      children: [
        /* @__PURE__ */ e(P, { size: 14, children: /* @__PURE__ */ e("path", { d: "M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" }) }),
        d && t ? /* @__PURE__ */ e("span", { className: "text-micro font-semibold su-tabular", children: t }) : null
      ]
    }
  );
});
function O({ colSpan: n, className: t, children: r, ...s }) {
  return /* @__PURE__ */ e("tr", { className: "[&:last-child>*]:border-b-0", children: /* @__PURE__ */ e(
    "td",
    {
      colSpan: n,
      className: l("pt-su3 pb-su4 ps-[56px] pe-su4 bg-surface-2", T, t),
      ...s,
      children: r
    }
  ) });
}
function Q({
  colSpan: n,
  startColumn: t = 1,
  action: r,
  className: s,
  children: a,
  ...o
}) {
  const i = v(g), d = Math.max(0, Math.min(t - 1, n - 1));
  return /* @__PURE__ */ e(b.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ c(
    "tr",
    {
      className: l("h-[var(--su-row-group)] text-small [&:last-child>*]:border-b-0", s),
      ...o,
      children: [
        Array.from({ length: d }, (h, p) => /* @__PURE__ */ e(N, {}, p)),
        /* @__PURE__ */ e("td", { colSpan: n - d, className: l(y(i), "py-[4px] align-middle", T), children: /* @__PURE__ */ c("span", { className: "inline-flex items-baseline gap-su3 flex-wrap", children: [
          /* @__PURE__ */ e("span", { className: "text-ink-2", children: a }),
          r != null ? /* @__PURE__ */ e("span", { className: "font-medium", children: r }) : null
        ] }) })
      ]
    }
  ) });
}
const U = {
  neutral: "text-neutral-text",
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text"
};
function X({ tone: n, lead: t, action: r, className: s, children: a, ...o }) {
  return /* @__PURE__ */ c(
    "span",
    {
      className: l(
        "flex items-center gap-[6px] min-w-0 text-small text-ink-2 whitespace-nowrap",
        s
      ),
      ...o,
      children: [
        n ? /* @__PURE__ */ e(
          "span",
          {
            "aria-hidden": "true",
            className: l(
              "inline-block shrink-0 size-[6px] rounded-su-round forced-colors:[forced-color-adjust:none]",
              A[n]
            )
          }
        ) : null,
        t != null ? /* @__PURE__ */ e("span", { className: l("shrink-0 font-medium", n ? U[n] : "text-ink"), children: t }) : null,
        a != null ? /* @__PURE__ */ e("span", { className: "min-w-0 truncate", children: a }) : null,
        r != null ? /* @__PURE__ */ c(w, { children: [
          /* @__PURE__ */ e("span", { "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ e("span", { className: "shrink-0 font-medium", children: r })
        ] }) : null
      ]
    }
  );
}
function Y({ columns: n, className: t, ...r }) {
  const s = v(g);
  return /* @__PURE__ */ e(b.Provider, { value: { line: "single", expanded: !1 }, children: /* @__PURE__ */ e(
    "tr",
    {
      "aria-hidden": "true",
      className: l(
        s === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]",
        "[&:last-child>*]:border-b-0",
        t
      ),
      ...r,
      children: Array.from({ length: n }, (a, o) => /* @__PURE__ */ e(N, { children: /* @__PURE__ */ e("span", { className: "block h-[12px] w-full max-w-[160px] rounded-su-tag su-skeleton-active" }) }, o))
    }
  ) });
}
u.Head = G;
u.Body = L;
u.Row = I;
u.Th = V;
u.Td = N;
u.GroupRow = q;
u.Disclosure = J;
u.Facet = K;
u.Detail = O;
u.FoldRow = Q;
u.Meta = X;
u.SkeletonRow = Y;
export {
  u as Table,
  L as TableBody,
  O as TableDetail,
  J as TableDisclosure,
  K as TableFacet,
  Q as TableFoldRow,
  q as TableGroupRow,
  G as TableHead,
  X as TableMeta,
  I as TableRow,
  Y as TableSkeletonRow,
  N as TableTd,
  V as TableTh
};
