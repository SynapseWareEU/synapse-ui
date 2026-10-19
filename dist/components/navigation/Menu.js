import { jsx as a, jsxs as u, Fragment as M } from "react/jsx-runtime";
import { useState as O, useEffect as j } from "react";
import { Root as z, Trigger as B, Content as I } from "../../vendor/@radix-ui/react-collapsible/dist/index.js";
import { Icon as w } from "../general/Icon.js";
import { cn as i } from "../../utils/cn.js";
import L from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
const k = {
  page: "ps-[calc(var(--su-space-3)+var(--su-menu-depth)*var(--su-space-3))] pe-su3",
  panel: "ps-[calc(var(--su-space-2)+var(--su-menu-depth)*var(--su-space-3))] pe-su2"
}, T = {
  page: "min-h-[var(--su-control-md)] [@media(hover:none)]:min-h-[var(--su-hit-target)] rounded-su-control font-medium",
  panel: "min-h-[var(--su-row)] [@media(hover:none)]:min-h-[var(--su-hit-target)] rounded-su-tag font-normal"
}, D = "group relative flex items-center gap-su2 w-full m-0 font-sans text-body text-start no-underline cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none disabled:cursor-not-allowed";
function N(e, r) {
  const t = r.disabled ? "bg-transparent text-ink-3" : r.selected ? "bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover forced-colors:outline forced-colors:outline-2 forced-colors:outline-offset-[-2px] forced-colors:outline-[Highlight]" : i(
    "bg-transparent [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:none)]:active:bg-surface-hover",
    r.danger ? "text-danger-text" : r.trail ? "text-action-text" : "text-ink"
  );
  return i(D, T[e], k[e], t);
}
function E(e) {
  return e.disabled || e.danger ? "text-current" : e.selected ? "text-action-text" : "text-ink-2";
}
const F = "su-label flex items-center min-h-[var(--su-row-overlay)]";
function y(e, r) {
  return r ? e.some(
    (t) => t.key === r || y(t.children ?? [], r)
  ) : !1;
}
const m = (e) => e != null && e !== !1;
function C(e, r, t) {
  const s = m(e.count);
  return /* @__PURE__ */ u(M, { children: [
    e.icon && /* @__PURE__ */ a(w, { size: "md", className: i("shrink-0", E({ ...t, danger: e.danger })), children: e.icon }),
    /* @__PURE__ */ a("span", { className: "flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap", children: e.label }),
    m(e.exception) ? /* @__PURE__ */ a("span", { className: "shrink-0 whitespace-nowrap text-small font-medium text-danger-text", children: e.exception }) : null,
    s || r === "panel" ? /* @__PURE__ */ a(
      "span",
      {
        className: i(
          "shrink-0 whitespace-nowrap text-small font-normal su-tabular",
          r === "panel" && "w-[40px] text-end",
          t.selected ? "text-action-text" : t.disabled ? "text-ink-3" : "text-ink-2",
          // The panel keeps the 40px column on every row so counts line up; an empty one is inert.
          !s && "invisible"
        ),
        "aria-hidden": s ? void 0 : !0,
        children: e.count
      }
    ) : null
  ] });
}
function h(e) {
  return e.title ?? (typeof e.label == "string" ? e.label : void 0);
}
function H({
  item: e,
  selectedKey: r,
  depth: t,
  variant: s,
  onSelect: o
}) {
  const l = y(e.children ?? [], r) && !e.disabled, [d, n] = O(l);
  return j(() => {
    l && n(!0);
  }, [l]), /* @__PURE__ */ u(z, { open: d, onOpenChange: n, disabled: e.disabled, children: [
    /* @__PURE__ */ u(
      B,
      {
        className: N(s, {
          trail: l && !d,
          danger: e.danger,
          disabled: e.disabled
        }),
        title: h(e),
        children: [
          C(e, s, { disabled: e.disabled }),
          /* @__PURE__ */ a(
            w,
            {
              size: "md",
              className: "shrink-0 text-ink-3 transition-transform duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)] motion-reduce:transition-none group-data-[state=open]:rotate-180",
              children: /* @__PURE__ */ a(L, {})
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ a(I, { className: "overflow-hidden data-[state=open]:animate-su-collapse-down data-[state=closed]:animate-su-collapse-up motion-reduce:animate-none", children: /* @__PURE__ */ a(
      f,
      {
        items: e.children ?? [],
        selectedKey: r,
        depth: t + 1,
        variant: s,
        onSelect: o,
        className: s === "page" ? "pt-[2px]" : void 0
      }
    ) })
  ] });
}
function f({ items: e, selectedKey: r, depth: t, variant: s, onSelect: o, className: l }) {
  const d = { "--su-menu-depth": t };
  return /* @__PURE__ */ a(
    "ul",
    {
      className: i(
        "flex flex-col m-0 p-0 list-none",
        s === "page" && "gap-[2px]",
        l
      ),
      style: d,
      children: e.map((n) => {
        var b, v;
        if (n.type === "divider")
          return /* @__PURE__ */ a("li", { role: "separator", className: "h-px my-su1 su-rule" }, n.key);
        if (n.type === "group")
          return /* @__PURE__ */ u("li", { children: [
            /* @__PURE__ */ a("span", { className: i(F, k[s]), children: n.label }),
            (b = n.children) != null && b.length ? /* @__PURE__ */ a(
              f,
              {
                items: n.children,
                selectedKey: r,
                depth: t,
                variant: s,
                onSelect: o
              }
            ) : null
          ] }, n.key);
        if ((v = n.children) != null && v.length)
          return /* @__PURE__ */ a("li", { children: /* @__PURE__ */ a(
            H,
            {
              item: n,
              selectedKey: r,
              depth: t,
              variant: s,
              onSelect: o
            }
          ) }, n.key);
        const c = r === n.key && !n.disabled, x = N(s, {
          selected: c,
          danger: n.danger,
          disabled: n.disabled
        }), g = C(n, s, {
          selected: c,
          disabled: n.disabled
        });
        return /* @__PURE__ */ a("li", { children: n.href && !n.disabled ? /* @__PURE__ */ a(
          "a",
          {
            href: n.href,
            className: x,
            title: h(n),
            "aria-current": c ? "page" : void 0,
            onClick: (p) => o == null ? void 0 : o(n.key, p),
            children: g
          }
        ) : /* @__PURE__ */ a(
          "button",
          {
            type: "button",
            disabled: n.disabled,
            className: x,
            title: h(n),
            "aria-current": c ? "true" : void 0,
            onClick: (p) => o == null ? void 0 : o(n.key, p),
            children: g
          }
        ) }, n.key);
      })
    }
  );
}
function P({
  items: e,
  selectedKey: r,
  onSelect: t,
  variant: s = "page",
  className: o,
  "aria-label": l = "Menu",
  ...d
}) {
  return e.length ? /* @__PURE__ */ a(
    "nav",
    {
      className: i(
        "font-sans text-ink",
        s === "panel" && "su-popover w-[288px] max-w-full p-su2",
        o
      ),
      "aria-label": l,
      ...d,
      children: /* @__PURE__ */ a(
        f,
        {
          items: e,
          selectedKey: r,
          depth: 0,
          variant: s,
          onSelect: t
        }
      )
    }
  ) : null;
}
export {
  P as Menu
};
