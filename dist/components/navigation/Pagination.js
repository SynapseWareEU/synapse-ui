import { jsxs as h, Fragment as j, jsx as t } from "react/jsx-runtime";
import { cn as p } from "../../utils/cn.js";
import _ from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
import q from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
function v(o, r) {
  return Array.from({ length: Math.max(0, r - o + 1) }, (s, a) => o + a);
}
function B(o, r, s) {
  if (r <= 1) return r === 1 ? [1] : [];
  const a = 2 * s + 5;
  if (r <= a) return v(1, r);
  const u = 2 * s + 3;
  return o <= s + 3 ? [...v(1, u), "ellipsis", r] : o >= r - (s + 2) ? [1, "ellipsis", ...v(r - u + 1, r)] : [1, "ellipsis", ...v(o - s, o + s), "ellipsis", r];
}
const T = "relative inline-flex items-center justify-center h-[var(--su-control-xs)] min-w-[var(--su-control-xs)] rounded-su-control select-none font-sans text-small font-medium su-tabular", J = "[@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:left-1/2 [@media(hover:none)]:after:top-1/2 [@media(hover:none)]:after:-translate-x-1/2 [@media(hover:none)]:after:-translate-y-1/2 [@media(hover:none)]:after:w-[var(--su-hit-target)] [@media(hover:none)]:after:h-[var(--su-hit-target)]", L = p(
  T,
  J,
  "m-0",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "su-focus-ring"
), $ = "bg-transparent text-ink-2 cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:none)]:active:bg-surface-hover", Q = "bg-action-subtle text-action-text cursor-default forced-colors:outline forced-colors:outline-2 forced-colors:outline-offset-[-2px] forced-colors:outline-[Highlight]", D = "bg-transparent text-ink-3 cursor-not-allowed", V = "bg-fill text-ink-3 cursor-not-allowed", R = "inline-flex items-center h-[var(--su-control-xs)] m-0 p-0 bg-transparent rounded-su-tag font-sans text-small font-medium su-focus-ring text-action-text underline-offset-[3px] decoration-1 [@media(hover:hover)]:hover:enabled:text-action-text-hover [@media(hover:hover)]:hover:enabled:underline active:enabled:text-action-press disabled:text-ink-3 disabled:cursor-not-allowed";
function W({ back: o }) {
  return /* @__PURE__ */ t("span", { "aria-hidden": "true", className: "flex rtl:-scale-x-100", children: /* @__PURE__ */ t(o ? _ : q, { size: 16, stroke: 1.75, focusable: "false" }) });
}
function z({
  current: o,
  total: r,
  totalPages: s,
  pageSize: a,
  onChange: u,
  siblingCount: I = 1,
  disabled: i,
  hideOnSinglePage: w,
  variant: G = "numbered",
  hasNext: H,
  labels: c,
  className: y,
  ...k
}) {
  const N = (c == null ? void 0 : c.previous) ?? "Previous page", b = (c == null ? void 0 : c.next) ?? "Next page", C = a ? r : s ?? r, E = a ? Math.ceil((r ?? 0) / a) : s ?? r ?? 1, d = Math.max(0, Math.trunc(E) || 0);
  if (G === "keyset") {
    const e = Math.max(1, Math.trunc(o) || 1), l = e > 1, f = H ?? (C !== void 0 && e < d);
    if (w && !l && !f) return null;
    const m = (g) => {
      i || g < 1 || u == null || u(g, a);
    };
    return /* @__PURE__ */ h(
      "nav",
      {
        className: p(
          "inline-flex flex-wrap items-center gap-su2 font-sans text-small text-ink-2",
          y
        ),
        "aria-label": "Pagination",
        "aria-busy": i || void 0,
        ...k,
        children: [
          a ? /* @__PURE__ */ h(j, { children: [
            /* @__PURE__ */ t("span", { children: c != null && c.perPage ? c.perPage(a) : `${a} per page` }),
            /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "·" })
          ] }) : null,
          l ? /* @__PURE__ */ h(j, { children: [
            /* @__PURE__ */ t(
              "button",
              {
                type: "button",
                className: R,
                disabled: i,
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
              className: R,
              disabled: i || !f,
              onClick: () => m(e + 1),
              children: b
            }
          ),
          /* @__PURE__ */ t("span", { className: "sr-only", "aria-live": "polite", children: `Page ${e}` })
        ]
      }
    );
  }
  const n = Math.min(Math.max(1, Math.trunc(o) || 1), Math.max(1, d)), M = B(n, d, I);
  if (M.length === 0 || w && d <= 1) return null;
  const F = n > 1, K = n < d, x = (e) => {
    i || e < 1 || e > d || e === n || u == null || u(e, a);
  }, U = (e) => {
    const l = e.currentTarget.closest("[dir='rtl']") !== null, f = l ? "ArrowRight" : "ArrowLeft", m = l ? "ArrowLeft" : "ArrowRight", A = {
      [f]: n - 1,
      [m]: n + 1,
      ArrowUp: n - 1,
      ArrowDown: n + 1,
      Home: 1,
      End: d
    }[e.key];
    A !== void 0 && (e.preventDefault(), x(A));
  }, P = (e) => {
    const l = (e === "prev" ? F : K) && !i, f = e === "prev" ? N : b;
    return /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
      "button",
      {
        type: "button",
        className: p(L, "w-[var(--su-control-xs)]", l ? $ : D),
        "aria-disabled": !l || void 0,
        "aria-label": f,
        title: f,
        onClick: () => x(e === "prev" ? n - 1 : n + 1),
        children: /* @__PURE__ */ t(W, { back: e === "prev" })
      }
    ) });
  };
  return /* @__PURE__ */ h(
    "nav",
    {
      className: p("inline-flex flex-wrap items-center justify-center max-w-full", y),
      "aria-label": "Pagination",
      "aria-busy": i || void 0,
      onKeyDown: U,
      ...k,
      children: [
        /* @__PURE__ */ h(
          "ul",
          {
            role: "list",
            className: "flex flex-wrap items-center justify-center gap-su1 [@media(hover:none)]:gap-su4 m-0 p-0 list-none",
            children: [
              P("prev"),
              M.map(
                (e, l) => e === "ellipsis" ? /* @__PURE__ */ t("li", { children: /* @__PURE__ */ h("span", { className: p(T, "px-su2 text-ink-3"), children: [
                  /* @__PURE__ */ t("span", { "aria-hidden": "true", children: "…" }),
                  /* @__PURE__ */ t("span", { className: "sr-only", children: "More pages" })
                ] }) }, l === 1 ? "ellipsis-start" : "ellipsis-end") : /* @__PURE__ */ t("li", { children: /* @__PURE__ */ t(
                  "button",
                  {
                    type: "button",
                    className: p(
                      L,
                      "px-su2",
                      e === n ? i ? V : Q : i ? D : $
                    ),
                    "aria-label": `Page ${e}`,
                    "aria-current": e === n ? "page" : void 0,
                    "aria-disabled": i || void 0,
                    onClick: () => x(e),
                    children: e
                  }
                ) }, e)
              ),
              P("next")
            ]
          }
        ),
        /* @__PURE__ */ t("span", { className: "sr-only", "aria-live": "polite", children: `Page ${n} of ${d}` })
      ]
    }
  );
}
export {
  z as Pagination,
  v as paginationRange
};
