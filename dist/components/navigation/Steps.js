import { jsxs as p, jsx as t } from "react/jsx-runtime";
import { cn as a } from "../../utils/cn.js";
import v from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
const h = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", N = {
  wait: "bg-surface text-ink-2 border border-solid border-border-strong",
  process: "bg-action text-on-action",
  finish: "bg-ink text-surface",
  error: "bg-danger text-on-action"
}, y = a(
  "inline-flex items-center justify-center shrink-0 size-[20px] rounded-su-round",
  "font-sans text-micro font-semibold su-tabular [&>svg]:size-[12px]",
  "forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
  h
), _ = {
  finish: "bg-ink",
  process: "bg-action",
  error: "bg-danger",
  wait: "bg-border"
}, g = {
  wait: "not started",
  process: "current",
  finish: "completed",
  error: "error"
};
function w(d, s, f, u) {
  return u.status ?? (d < s ? "finish" : d > s ? "wait" : f);
}
function j({
  current: d = 0,
  items: s,
  direction: f = "horizontal",
  status: u = "process",
  type: k = "default",
  counter: l,
  className: x,
  ...b
}) {
  if (s.length === 0) return null;
  const i = f !== "vertical", c = Math.trunc(d);
  if (k === "bar") {
    const n = Math.min(Math.max(c + 1, 1), s.length), e = l === !1 || l === null ? null : typeof l == "function" ? l(n, s.length) : l ?? `Step ${n} of ${s.length}`;
    return /* @__PURE__ */ p("nav", { className: a("w-full font-sans", x), "aria-label": "Progress", ...b, children: [
      e != null && e !== !1 ? /* @__PURE__ */ t(
        "div",
        {
          className: "flex justify-end mb-[9px] text-small text-ink-2 su-tabular [[data-density=handheld]_&]:text-hh-step [[data-density=handheld]_&]:font-medium",
          "aria-hidden": "true",
          children: e
        }
      ) : null,
      /* @__PURE__ */ t("ol", { role: "list", className: "flex gap-su1 m-0 p-0 list-none", children: s.map((r, o) => {
        const m = w(o, c, u, r);
        return /* @__PURE__ */ t(
          "li",
          {
            className: a(
              "flex-1 min-w-0 h-[4px] rounded-su-bar forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
              _[m],
              h
            ),
            "data-status": m,
            "aria-current": o === c ? "step" : void 0,
            children: /* @__PURE__ */ p("span", { className: "sr-only", children: [
              `Step ${o + 1} of ${s.length}, ${g[m]}: `,
              r.title
            ] })
          },
          r.key ?? o
        );
      }) })
    ] });
  }
  return /* @__PURE__ */ t(
    "nav",
    {
      className: a("w-full font-sans", x),
      "aria-label": "Progress",
      ...b,
      children: /* @__PURE__ */ t(
        "ol",
        {
          role: "list",
          className: a(
            "flex flex-col items-stretch w-full m-0 p-0 list-none",
            i && "min-[533px]:flex-row min-[533px]:items-start min-[533px]:gap-su4"
          ),
          children: s.map((n, e) => {
            const r = w(e, c, u, n), o = e === s.length - 1;
            return /* @__PURE__ */ p(
              "li",
              {
                className: a(
                  "relative flex items-start gap-su2 min-w-0",
                  i && (o ? "min-[533px]:flex-[0_1_auto]" : "min-[533px]:flex-[1_1_auto]")
                ),
                "data-status": r,
                "aria-current": e === c ? "step" : void 0,
                children: [
                  /* @__PURE__ */ t(
                    "span",
                    {
                      className: a(y, N[r]),
                      "aria-hidden": "true",
                      children: n.icon ?? (r === "finish" ? /* @__PURE__ */ t(v, { size: 12, stroke: 3 }) : r === "error" ? "!" : e + 1)
                    }
                  ),
                  /* @__PURE__ */ p(
                    "div",
                    {
                      className: a(
                        // The marker and the title's line box are both 20 tall, so they share a centre.
                        "grow min-w-0",
                        i && "min-[533px]:grow-0",
                        !o && "pb-su4",
                        !o && i && "min-[533px]:pb-0"
                      ),
                      children: [
                        /* @__PURE__ */ t("span", { className: "sr-only", children: `Step ${e + 1} of ${s.length}, ${g[r]}: ` }),
                        /* @__PURE__ */ t(
                          "span",
                          {
                            className: a(
                              "block text-body font-medium break-words",
                              r === "wait" ? "text-ink-2" : "text-ink"
                            ),
                            children: n.title
                          }
                        ),
                        n.description ? /* @__PURE__ */ t("span", { className: "block mt-su1 text-small text-ink-2 break-words", children: n.description }) : null
                      ]
                    }
                  ),
                  o ? null : /* @__PURE__ */ t(
                    "span",
                    {
                      className: a(
                        // Stacked: down the marker column, 4 clear of each marker.
                        "absolute [inset-inline-start:calc((var(--su-space-5)-1px)/2)] top-[calc(var(--su-space-5)+var(--su-space-1))] bottom-su1 w-px",
                        i && "min-[533px]:static min-[533px]:h-px min-[533px]:w-auto min-[533px]:flex-[1_1_0%] min-[533px]:self-start min-[533px]:min-w-[var(--su-space-4)] min-[533px]:mt-[calc((var(--su-space-5)-1px)/2)]",
                        r === "finish" ? "bg-ink" : "bg-border",
                        h
                      ),
                      "aria-hidden": "true"
                    }
                  )
                ]
              },
              n.key ?? e
            );
          })
        }
      )
    }
  );
}
export {
  j as Steps
};
