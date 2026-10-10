import { jsxs as i, jsx as l } from "react/jsx-runtime";
import { useId as f } from "react";
import { cn as d } from "../../utils/cn.js";
import { Badge as h } from "./Badge.js";
function k({
  title: r,
  count: e,
  extra: s,
  footer: n,
  flush: o = !1,
  bodyClassName: m,
  className: t,
  children: u,
  "aria-labelledby": c,
  ...b
}) {
  const a = f(), p = r != null || e != null || s != null;
  return /* @__PURE__ */ i(
    "section",
    {
      "aria-labelledby": c ?? (r != null ? a : void 0),
      className: d("su-panel text-ink font-sans", t),
      ...b,
      children: [
        p ? /* @__PURE__ */ i("div", { className: "flex items-center gap-su2 min-h-[var(--su-panel-header)] px-su4 border-b border-solid border-border", children: [
          r != null ? /* @__PURE__ */ l(
            "h3",
            {
              id: a,
              className: "m-0 min-w-0 truncate text-section font-semibold text-ink",
              children: r
            }
          ) : null,
          e != null ? typeof e == "number" ? /* @__PURE__ */ l(h, { count: e, showZero: !0 }) : e : null,
          s != null ? /* @__PURE__ */ l("div", { className: "flex items-center gap-su2 ms-auto shrink-0", children: s }) : null
        ] }) : null,
        /* @__PURE__ */ l("div", { className: d(o ? void 0 : "p-su4", m), children: u }),
        n != null ? /* @__PURE__ */ l("div", { className: "flex items-center gap-su2 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2", children: n }) : null
      ]
    }
  );
}
export {
  k as Panel
};
