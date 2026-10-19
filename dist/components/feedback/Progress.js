import { jsxs as x, jsx as e, Fragment as D } from "react/jsx-runtime";
import { Root as b, Indicator as F } from "../../vendor/@radix-ui/react-progress/dist/index.js";
import { cn as r } from "../../utils/cn.js";
const L = {
  normal: "bg-ink",
  success: "bg-success",
  error: "bg-danger"
}, I = {
  normal: "stroke-ink",
  success: "stroke-success",
  error: "stroke-danger"
}, P = "forced-colors:[forced-color-adjust:none]", B = `overflow-hidden rounded-su-bar bg-fill ${P} forced-colors:[outline:1px_solid_CanvasText]`, R = "shrink-0 text-small text-ink su-tabular whitespace-nowrap", V = "h-full w-full bg-no-repeat bg-[length:230%_100%] bg-[linear-gradient(90deg,transparent_43.48%,var(--su-ink)_43.48%,var(--su-ink)_56.52%,transparent_56.52%)] animate-shimmer animate-duration-[1.2s] animate-ease-[var(--su-ease-in-out)] motion-reduce:animate-none motion-reduce:bg-[position:76.92%_0]", v = (g, c, d) => Math.min(d, Math.max(c, g));
function H({
  type: g = "line",
  size: c,
  value: d = 0,
  max: N = 100,
  showInfo: W = !1,
  status: u = "normal",
  blocked: y,
  steps: p,
  inline: m = !1,
  format: h,
  className: $,
  ...k
}) {
  const t = N > 0 ? N : 100, a = d == null, l = a ? null : v(d, 0, t), o = l == null ? 0 : l / t * 100, _ = a || !y ? 0 : v(y / t * 100, 0, 100 - o), A = !a && o >= 100, M = u === "normal" && A ? "success" : u, C = (W || h !== void 0) && !a, T = h ? h(Math.round(o), l ?? 0, t) : `${Math.round(o)}%`;
  if (g === "circle") {
    const s = c ?? 40, i = 4, n = s / 2, f = (s - i) / 2;
    return /* @__PURE__ */ x(
      b,
      {
        className: r("relative shrink-0", P, $),
        value: l,
        max: t,
        style: { width: s, height: s },
        ...k,
        children: [
          /* @__PURE__ */ x(
            "svg",
            {
              viewBox: `0 0 ${s} ${s}`,
              width: s,
              height: s,
              fill: "none",
              "aria-hidden": "true",
              className: a ? "animate-spin animate-duration-[1.2s] motion-reduce:animate-none" : void 0,
              children: [
                /* @__PURE__ */ e("circle", { cx: n, cy: n, r: f, strokeWidth: i, className: "stroke-fill" }),
                a || o > 0 ? /* @__PURE__ */ e(
                  "circle",
                  {
                    cx: n,
                    cy: n,
                    r: f,
                    strokeWidth: i,
                    strokeLinecap: "round",
                    pathLength: 100,
                    strokeDasharray: a ? "30 70" : `${o} 100`,
                    transform: `rotate(-90 ${n} ${n})`,
                    className: r(
                      I[M],
                      !a && "[transition-property:stroke-dasharray] duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)]"
                    )
                  }
                ) : null
              ]
            }
          ),
          C ? /* @__PURE__ */ e(
            "span",
            {
              "aria-hidden": "true",
              className: "absolute inset-0 grid place-items-center text-small font-semibold text-ink su-tabular",
              children: T
            }
          ) : null
        ]
      }
    );
  }
  const j = c ?? 4, w = p && p > 1 ? Math.floor(p) : 0;
  return /* @__PURE__ */ x(
    "div",
    {
      className: r(
        m ? "inline-flex max-w-full" : "flex w-full",
        "items-center gap-su2 align-middle",
        $
      ),
      children: [
        w ? /* @__PURE__ */ e(
          b,
          {
            className: r("flex gap-[3px]", m ? "w-[48px] shrink-0" : "flex-1 min-w-0"),
            value: l,
            max: t,
            style: { height: j },
            ...k,
            children: Array.from({ length: w }, (s, i) => {
              const n = l == null ? 0 : v(Math.round((l * w / t - i) * 1e6) / 1e6, 0, 1), f = n >= 1;
              return /* @__PURE__ */ e("span", { className: r("flex-1 min-w-0 h-full flex", B), children: n > 0 ? /* @__PURE__ */ e(
                "span",
                {
                  className: r(
                    "h-full",
                    f && u !== "error" ? "bg-success" : L[u]
                  ),
                  style: { width: `${n * 100}%` }
                }
              ) : null }, i);
            })
          }
        ) : /* @__PURE__ */ e(
          b,
          {
            className: r("flex", B, m ? "w-[48px] shrink-0" : "flex-1 min-w-0"),
            value: l,
            max: t,
            style: { height: j },
            ...k,
            children: a ? /* @__PURE__ */ e("div", { className: V }) : /* @__PURE__ */ x(D, { children: [
              /* @__PURE__ */ e(
                F,
                {
                  className: r(
                    "h-full shrink-0 transition-[width] duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)]",
                    L[M]
                  ),
                  style: { width: `${o}%`, transform: "none" }
                }
              ),
              _ > 0 ? /* @__PURE__ */ e("div", { className: "h-full shrink-0 bg-danger", style: { width: `${_}%` } }) : null
            ] })
          }
        ),
        C ? /* @__PURE__ */ e(
          "span",
          {
            "aria-hidden": "true",
            className: r(R, !h && !m && "min-w-[36px] text-end"),
            children: T
          }
        ) : null
      ]
    }
  );
}
export {
  H as Progress
};
