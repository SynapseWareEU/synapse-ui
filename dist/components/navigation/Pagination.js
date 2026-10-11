import { jsxs as h, Fragment as L, jsx as t } from "react/jsx-runtime";
import { cn as p } from "../../utils/cn.js";
import _ from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
import q from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
function v(a, r) {
  return Array.from({ length: Math.max(0, r - a + 1) }, (i, s) => a + s);
}
function B(a, r, i) {
  if (r <= 1) return r === 1 ? [1] : [];
  const s = 2 * i + 5;
  if (r <= s) return v(1, r);
  const u = 2 * i + 3;
  return a <= i + 3 ? [...v(1, u), "ellipsis", r] : a >= r - (i + 2) ? [1, "ellipsis", ...v(r - u + 1, r)] : [1, "ellipsis", ...v(a - i, a + i), "ellipsis", r];
}
const I = "relative inline-flex items-center justify-center h-[var(--su-control-xs)] min-w-[var(--su-control-xs)] rounded-su-control select-none font-sans text-small font-medium su-tabular", J = "[@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:left-1/2 [@media(hover:none)]:after:top-1/2 [@media(hover:none)]:after:-translate-x-1/2 [@media(hover:none)]:after:-translate-y-1/2 [@media(hover:none)]:after:w-[var(--su-hit-target)] [@media(hover:none)]:after:h-[var(--su-hit-target)]", $ = p(
  I,
  J,
  "m-0",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "su-focus-ring"
), D = "bg-transparent text-ink-2 cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:none)]:active:bg-surface-hover", Q = "bg-action-subtle text-action-text cursor-default forced-colors:outline forced-colors:outline-2 forced-colors:outline-offset-[-2px] forced-colors:outline-[Highlight]", R = "bg-transparent text-ink-3 cursor-not-allowed", V = "bg-fill text-ink-3 cursor-not-allowed", T = "inline-flex items-center h-[var(--su-control-xs)] m-0 p-0 bg-transparent rounded-su-tag font-sans text-small font-medium su-focus-ring text-action-text underline-offset-[3px] decoration-1 [@media(hover:hover)]:hover:enabled:text-action-text-hover [@media(hover:hover)]:hover:enabled:underline active:enabled:text-action-press disabled:text-ink-3 disabled:cursor-not-allowed";
function W({ back: a }) {
  return /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "flex rtl:-scale-x-100", children: /* @__PURE__ */ t(a ? _ : q, { size: 16, stroke: 1.75, focusable: "false" }) });
}
function z({
  current: a,
  total: r,
  totalPages: i,
  pageSize: s,
  onChange: u,
  siblingCount: b = 1,
  disabled: c,
  hideOnSinglePage: w,
  variant: G = "numbered",
  hasNext: H,
  labels: n,
  className: y,
  ...k
}) {
  const N = (n == null ? void 0 : n.previous) ?? "Previous page", M = (n == null ? void 0 : n.next) ?? "Next page", C = s ? r : i ?? r, E = s ? Math.ceil((r ?? 0) / s) : i ?? r ?? 1, d = Math.max(0, Math.trunc(E) || 0);
  if (G === "keyset") {
    const e = Math.max(1, Math.trunc(a) || 1), l = e > 1, f = H ?? (C !== void 0 && e < d);
    if (w && !l && !f) return null;
    const m = (g) => {
      c || g < 1 || u == null || u(g, s);
    };
    return /* @__PURE__ */ h(
      "nav",
      {
        className: p(
          "inline-flex flex-wrap items-center gap-su2 font-sans text-small text-ink-2",
          y
        ),
        "aria-label": "Pagination",
        "aria-busy": c || void 0,
        ...k,
        children: [
          s ? /* @__PURE__ */ h(L, { children: [
            /* @__PURE__ */ t("span", { children: n != null && n.perPage ? n.perPage(s) : `${s} per page` }),
            /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" })
          ] }) : null,
          l ? /* @__PURE__ */ h(L, { children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: T,
                disabled: c,
                onClick: () => m(e - 1),
                children: N
              }
            ),
            /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" })
          ] }) : null,
          /* @__PURE__ */ t(
            "button",
            {
              type: "button",
              className: T,
              disabled: c || !f,
              onClick: () => m(e + 1),
              children: M
            }
          ),
          (n == null ? void 0 : n.page) === null ? null : /* @__PURE__ */ t("span", { className: "sr-only", "aria-live": "polite", children: n != null && n.page ? n.page(e) : `Page ${e}` })
        ]
      }
    );
  }
  const o = Math.min(Math.max(1, Math.trunc(a) || 1), Math.max(1, d)), P = B(o, d, b);
  if (P.length === 0 || w && d <= 1) return null;
  const F = o > 1, K = o < d, x = (e) => {
    c || e < 1 || e > d || e === o || u == null || u(e, s);
  }, U = (e) => {
    const l = e.currentTarget.closest("[dir='rtl']") !== null, f = l ? "ArrowRight" : "ArrowLeft", m = l ? "ArrowLeft" : "ArrowRight", j = {
      [f]: o - 1,
      [m]: o + 1,
      ArrowUp: o - 1,
      ArrowDown: o + 1,
      Home: 1,
      End: d
    }[e.key];
    j !== void 0 && (e.preventDefault(), x(j));
  }, A = (e) => {
    const l = (e === "prev" ? F : K) && !c, f = e === "prev" ? N : M;
    return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: p($, "w-[var(--su-control-xs)]", l ? D : R),
        "aria-disabled": !l || void 0,
        "aria-label": f,
        title: f,
        onClick: () => x(e === "prev" ? o - 1 : o + 1),
        children: /* @__PURE__ */ t(W, { back: e === "prev" })
      }
    ) });
  };
  return /* @__PURE__ */ h(
    "nav",
    {
      className: p("inline-flex flex-wrap items-center justify-center max-w-full", y),
      "aria-label": "Pagination",
      "aria-busy": c || void 0,
      onKeyDown: U,
      ...k,
      children: [
        /* @__PURE__ */ h(
          "ul",
          {
            role: "list",
            className: "flex flex-wrap items-center justify-center gap-su1 [@media(hover:none)]:gap-su4 m-0 p-0 list-none",
            children: [
              A("prev"),
              P.map(
                (e, l) => e === "ellipsis" ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ h("span", { className: p(I, "px-su2 text-ink-3"), children: [
                  /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "…" }),
                  /* @__PURE__ */ t("span", { className: "sr-only", children: "More pages" })
                ] }) }, l === 1 ? "ellipsis-start" : "ellipsis-end") : /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    className: p(
                      $,
                      "px-su2",
                      e === o ? c ? V : Q : c ? R : D
                    ),
                    "aria-label": `Page ${e}`,
                    "aria-current": e === o ? "page" : void 0,
                    "aria-disabled": c || void 0,
                    onClick: () => x(e),
                    children: e
                  }
                ) }, e)
              ),
              A("next")
            ]
          }
        ),
        /* @__PURE__ */ t("span", { className: "sr-only", "aria-live": "polite", children: `Page ${o} of ${d}` })
      ]
    }
  );
}
export {
  z as Pagination,
  v as paginationRange
};
