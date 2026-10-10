import { jsxs as i, jsx as n } from "react/jsx-runtime";
import { cn as t } from "../../utils/cn.js";
import s from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCircleX.js";
const d = 1.75, a = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", l = "block font-sans text-hh-question font-semibold text-ink", b = t(
  "inline-flex items-center justify-center shrink-0 m-0 p-0",
  "size-[var(--su-hh-control-lg)] rounded-[var(--su-hh-radius)]",
  "bg-surface text-ink border border-solid border-border-strong su-focus-ring cursor-pointer",
  "[@media(hover:hover)]:enabled:hover:bg-surface-2 enabled:active:bg-fill",
  "disabled:bg-fill disabled:border-fill disabled:text-ink-3 disabled:cursor-not-allowed",
  a
);
function h({
  invalid: e,
  disabled: r,
  active: o
}) {
  return r ? "border-border bg-surface-2 text-ink-3 cursor-not-allowed" : e ? "border-danger bg-surface text-ink" : o ? "border-action bg-surface text-ink" : "border-border-strong bg-surface text-ink focus-within:border-action";
}
function m({ id: e, children: r }) {
  return /* @__PURE__ */ i(
    "p",
    {
      id: e,
      className: t(
        "flex items-center gap-su2 mt-su2 mb-0 min-h-su6",
        "font-sans text-hh-body font-medium text-danger-text",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold"
      ),
      children: [
        /* @__PURE__ */ n(s, { size: 20, stroke: d, "aria-hidden": !0, className: "shrink-0" }),
        /* @__PURE__ */ n("span", { className: "min-w-0", children: r })
      ]
    }
  );
}
function x(...e) {
  return (r) => {
    for (const o of e)
      typeof o == "function" ? o(r) : o && (o.current = r);
  };
}
function g(...e) {
  return e.filter(Boolean).join(" ") || void 0;
}
export {
  d as HH_STROKE,
  m as HandheldErrorLine,
  g as describedBy,
  h as hhFieldBorder,
  l as hhQuestionClass,
  b as hhSecondaryClass,
  a as hhTransition,
  x as mergeRefs
};
