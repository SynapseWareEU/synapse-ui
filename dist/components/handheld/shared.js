import { jsxs as s, jsx as n } from "react/jsx-runtime";
import { cn as t } from "../../utils/cn.js";
import d from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCircleX.js";
const a = 1.75, c = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", b = "block font-sans text-hh-question font-semibold text-ink", h = t(
  "inline-flex items-center justify-center shrink-0 m-0 p-0",
  "size-[var(--su-hh-control-lg)] rounded-[var(--su-hh-radius)]",
  "bg-surface text-ink border border-solid border-border-strong su-focus-ring cursor-pointer",
  "[@media(hover:hover)]:enabled:hover:bg-surface-2 enabled:active:bg-fill",
  "disabled:bg-fill disabled:border-fill disabled:text-ink-3 disabled:cursor-not-allowed",
  c
);
function m({
  invalid: r,
  disabled: o,
  active: e
}) {
  return o ? "border-border bg-surface-2 text-ink-3 cursor-not-allowed" : r ? "border-danger bg-surface text-ink" : e ? "border-action bg-surface text-ink" : "border-border-strong bg-surface text-ink focus-within:border-action";
}
function x({ id: r, className: o, children: e, ...i }) {
  return /* @__PURE__ */ s(
    "p",
    {
      id: r,
      ...i,
      className: t(
        "flex items-center gap-su2 mt-su2 mb-0 min-h-su6",
        "font-sans text-hh-body font-medium text-danger-text",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold",
        o
      ),
      children: [
        /* @__PURE__ */ n(d, { size: 20, stroke: a, "aria-hidden": !0, className: "shrink-0" }),
        /* @__PURE__ */ n("span", { className: "min-w-0", children: e })
      ]
    }
  );
}
function g(...r) {
  return (o) => {
    for (const e of r)
      typeof e == "function" ? e(o) : e && (e.current = o);
  };
}
function k(...r) {
  return r.filter(Boolean).join(" ") || void 0;
}
export {
  a as HH_STROKE,
  x as HandheldErrorLine,
  k as describedBy,
  m as hhFieldBorder,
  b as hhQuestionClass,
  h as hhSecondaryClass,
  c as hhTransition,
  g as mergeRefs
};
