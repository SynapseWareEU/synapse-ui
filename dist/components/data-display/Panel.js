import { jsxs as i, jsx as l } from "react/jsx-runtime";
import { useId as h } from "react";
import { cn as d } from "../../utils/cn.js";
import { Badge as x } from "./Badge.js";
function y({
  title: r,
  titleAs: o = "h3",
  count: e,
  extra: s,
  footer: n,
  flush: t = !1,
  bodyClassName: m,
  className: u,
  children: c,
  "aria-labelledby": b,
  ...p
}) {
  const a = h(), f = r != null || e != null || s != null;
  return /* @__PURE__ */ i(
    "section",
    {
      "aria-labelledby": b ?? (r != null ? a : void 0),
      className: d("su-panel text-ink font-sans", u),
      ...p,
      children: [
        f ? /* @__PURE__ */ i("div", { className: "flex items-center gap-su2 min-h-[var(--su-panel-header)] px-su4 border-b border-solid border-border", children: [
          r != null ? /* @__PURE__ */ l(
            o,
            {
              id: a,
              className: "m-0 min-w-0 truncate text-section font-semibold text-ink",
              children: r
            }
          ) : null,
          e != null ? typeof e == "number" ? /* @__PURE__ */ l(x, { count: e, showZero: !0 }) : e : null,
          s != null ? /* @__PURE__ */ l("div", { className: "flex items-center gap-su2 ms-auto shrink-0", children: s }) : null
        ] }) : null,
        /* @__PURE__ */ l("div", { className: d(t ? void 0 : "p-su4", m), children: c }),
        n != null ? /* @__PURE__ */ l("div", { className: "flex items-center gap-su2 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2", children: n }) : null
      ]
    }
  );
}
export {
  y as Panel
};
