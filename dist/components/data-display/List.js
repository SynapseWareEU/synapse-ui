import { jsx as i, jsxs as c } from "react/jsx-runtime";
import { cn as d } from "../../utils/cn.js";
function h({
  title: l,
  description: t,
  extra: s,
  avatar: r,
  interactive: n = !1,
  className: f,
  children: m,
  onClick: u,
  onKeyDown: o,
  ...x
}) {
  const a = n && u != null, b = t != null;
  return /* @__PURE__ */ c(
    "li",
    {
      className: d(
        // Row: padding 0 16, gap 12, content centred. 48 with a second line, 40 without.
        "flex items-center gap-su3 px-su4 py-su1 font-sans text-body text-ink",
        b ? "min-h-[var(--su-row-exception)]" : "min-h-[var(--su-row)]",
        n && "cursor-pointer transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:bg-surface-hover outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[-2px]",
        f
      ),
      onClick: u,
      onKeyDown: a ? (e) => {
        o == null || o(e), !e.defaultPrevented && (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.currentTarget.click());
      } : o,
      ...a ? { role: "button", tabIndex: 0 } : null,
      ...x,
      children: [
        r ? /* @__PURE__ */ i("div", { className: "flex shrink-0 items-center", children: r }) : null,
        /* @__PURE__ */ c("div", { className: "flex-1 min-w-0", children: [
          l ? /* @__PURE__ */ i("div", { className: "truncate text-body text-ink", children: l }) : null,
          t ? /* @__PURE__ */ i("div", { className: "truncate text-small text-ink-2", children: t }) : null,
          m
        ] }),
        s ? /* @__PURE__ */ i("div", { className: "shrink-0 whitespace-nowrap text-body font-medium text-ink-2", children: s }) : null
      ]
    }
  );
}
function v({ bordered: l = !1, split: t = !0, className: s, children: r, ...n }) {
  return /* @__PURE__ */ i(
    "ul",
    {
      role: "list",
      className: d(
        "m-0 p-0 list-none",
        l && "su-panel",
        t && "[&>li+li]:border-t [&>li+li]:border-solid [&>li+li]:border-border",
        s
      ),
      ...n,
      children: r
    }
  );
}
v.Item = h;
export {
  v as List,
  h as ListItem
};
