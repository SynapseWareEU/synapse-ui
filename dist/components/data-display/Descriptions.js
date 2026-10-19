import { jsxs as e, jsx as s } from "react/jsx-runtime";
import { cn as n } from "../../utils/cn.js";
function f({
  title: i,
  extra: a,
  items: r,
  column: t = 2,
  bordered: d = !1,
  layout: c = "vertical",
  className: o,
  ...u
}) {
  const m = c === "horizontal";
  return /* @__PURE__ */ e("div", { className: n("font-sans text-ink", d && "su-frame p-su4", o), children: [
    i != null || a != null ? /* @__PURE__ */ e("div", { className: "flex items-center justify-between gap-su3 mb-su3", children: [
      /* @__PURE__ */ s("div", { className: "min-w-0 text-body font-semibold text-ink", children: i }),
      a != null ? /* @__PURE__ */ s("div", { className: "shrink-0 text-small text-ink-2", children: a }) : null
    ] }) : null,
    /* @__PURE__ */ s(
      "dl",
      {
        className: n(
          "grid gap-x-su4 m-0 p-0 max-sm:![grid-template-columns:minmax(0,1fr)]",
          m ? "gap-y-0" : "gap-y-su4"
        ),
        style: { gridTemplateColumns: `repeat(${t}, minmax(0, 1fr))` },
        ...u,
        children: r.map((l, p) => /* @__PURE__ */ e(
          "div",
          {
            className: n(
              "min-w-0 max-sm:![grid-column:auto]",
              m ? "grid grid-cols-[160px_minmax(0,1fr)] gap-x-su4 items-baseline min-h-[32px] py-[6px] max-sm:grid-cols-1 max-sm:gap-y-su1" : "flex flex-col gap-su1"
            ),
            style: l.span ? { gridColumn: `span ${l.span}` } : void 0,
            children: [
              /* @__PURE__ */ s("dt", { className: "m-0 su-label", children: l.label }),
              /* @__PURE__ */ s("dd", { className: "m-0 min-w-0 text-body text-ink su-tabular break-words", children: l.value ?? /* @__PURE__ */ s("span", { className: "text-ink-3", children: "—" }) })
            ]
          },
          p
        ))
      }
    )
  ] });
}
export {
  f as Descriptions
};
