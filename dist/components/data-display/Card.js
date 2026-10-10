import { jsx as n, jsxs as r, Fragment as x } from "react/jsx-runtime";
import { cn as b } from "../../utils/cn.js";
import { Panel as p } from "./Panel.js";
function v() {
  return /* @__PURE__ */ n(
    "svg",
    {
      width: "16",
      height: "16",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 1.75,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      className: "shrink-0 text-ink-3 rtl:-scale-x-100",
      children: /* @__PURE__ */ n("path", { d: "M9 6l6 6l-6 6" })
    }
  );
}
function y({
  code: e,
  title: l,
  extra: i,
  state: k,
  bordered: N,
  interactive: h = !1,
  variant: f = "card",
  href: o,
  className: u,
  children: a,
  ...t
}) {
  if (f === "panel")
    return /* @__PURE__ */ n(
      p,
      {
        title: e != null || l != null ? /* @__PURE__ */ r("span", { className: "inline-flex items-baseline gap-su2 min-w-0", children: [
          e != null ? /* @__PURE__ */ n("span", { className: "font-mono text-small font-normal text-ink-2 shrink-0", children: e }) : null,
          l
        ] }) : void 0,
        extra: i,
        className: u,
        ...t,
        children: a
      }
    );
  const d = e != null || l != null || i != null, s = o != null, c = b(
    "block bg-surface text-ink font-sans border border-solid border-border rounded-su-surface p-su4",
    (s || h) && "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:border-border-strong",
    s && "no-underline su-focus-ring",
    u
  ), m = /* @__PURE__ */ r(x, { children: [
    d ? /* @__PURE__ */ r("div", { className: "flex items-start justify-between gap-su3", children: [
      /* @__PURE__ */ r("div", { className: "flex flex-col min-w-0", children: [
        e != null ? /* @__PURE__ */ n("span", { className: "font-mono text-small text-ink-2", children: e }) : null,
        l != null || s ? /* @__PURE__ */ r("div", { className: "flex items-center gap-su1 min-w-0 min-h-[20px]", children: [
          l != null ? /* @__PURE__ */ n("span", { className: "min-w-0 text-body font-semibold text-ink text-balance", children: l }) : null,
          s ? /* @__PURE__ */ n(v, {}) : null
        ] }) : null
      ] }),
      i != null ? /* @__PURE__ */ n("div", { className: "shrink-0 text-small text-ink-2", children: i }) : null
    ] }) : null,
    a != null ? /* @__PURE__ */ n("div", { className: d ? "mt-su3" : void 0, children: a }) : null
  ] });
  return s ? /* @__PURE__ */ n(
    "a",
    {
      href: o,
      className: c,
      ...t,
      children: m
    }
  ) : /* @__PURE__ */ n("div", { className: c, ...t, children: m });
}
export {
  y as Card
};
