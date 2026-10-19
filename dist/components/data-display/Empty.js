import { jsxs as a, jsx as l } from "react/jsx-runtime";
import { cn as u } from "../../utils/cn.js";
function c() {
  return /* @__PURE__ */ a(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.75,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      children: [
        /* @__PURE__ */ l("path", { d: "M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" }),
        /* @__PURE__ */ l("path", { d: "M4 13h3l3 3h4l3 -3h3" })
      ]
    }
  );
}
function f({
  image: i,
  title: n,
  description: o,
  compact: d = !1,
  className: r,
  children: e,
  ...m
}) {
  const t = o !== void 0 ? o : n == null ? "No data" : null;
  if (d)
    return /* @__PURE__ */ a("div", { className: u("p-su2 font-sans text-small text-ink-2", r), ...m, children: [
      n != null ? /* @__PURE__ */ l("p", { className: "m-0 font-medium text-ink", children: n }) : null,
      t != null ? /* @__PURE__ */ l("p", { className: "m-0", children: t }) : null,
      e ? /* @__PURE__ */ l("div", { className: "mt-su2", children: e }) : null
    ] });
  const s = i === !1 ? null : i ?? /* @__PURE__ */ l(c, {});
  return /* @__PURE__ */ a(
    "div",
    {
      className: u(
        "flex flex-col items-center justify-center text-center p-su6 font-sans",
        r
      ),
      ...m,
      children: [
        s != null ? /* @__PURE__ */ l("div", { className: "flex text-ink-3", "aria-hidden": "true", children: s }) : null,
        n != null ? /* @__PURE__ */ l(
          "h3",
          {
            className: u(
              "m-0 text-empty-title font-semibold text-ink",
              s != null ? "mt-su3" : void 0
            ),
            children: n
          }
        ) : null,
        t != null ? /* @__PURE__ */ l(
          "p",
          {
            className: u(
              "m-0 max-w-[420px] text-body text-ink-2",
              n != null ? "mt-su1" : s != null ? "mt-su3" : void 0
            ),
            children: t
          }
        ) : null,
        e ? /* @__PURE__ */ l("div", { className: "mt-su4", children: e }) : null
      ]
    }
  );
}
export {
  f as Empty
};
