import { jsx as a, jsxs as j } from "react/jsx-runtime";
import { useRef as T, useState as A } from "react";
import { cn as v } from "../../utils/cn.js";
import q from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
const B = "flex items-center gap-su1 w-full min-h-[var(--su-control-sm)] pe-su2 ps-[calc(var(--su-space-2)+var(--su-tree-depth,0)*20px)] rounded-su-row font-sans text-body text-start transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] su-focus-ring focus-visible:outline-offset-[-2px]";
function z({
  node: s,
  depth: d,
  expanded: o,
  selected: f,
  focusKey: h,
  toggle: i,
  select: p
}) {
  var b;
  const l = !!((b = s.children) != null && b.length), c = o.has(s.key), m = f.has(s.key);
  return /* @__PURE__ */ j("div", { className: "block", role: "none", children: [
    /* @__PURE__ */ j(
      "button",
      {
        type: "button",
        role: "treeitem",
        "data-key": s.key,
        "aria-level": d + 1,
        "aria-selected": m,
        "aria-expanded": l ? c : void 0,
        tabIndex: s.key === h ? 0 : -1,
        className: v(
          B,
          // One background and one text colour per state (no opacity for disabled).
          s.disabled ? "bg-transparent text-ink-3 cursor-not-allowed" : m ? "bg-action-subtle text-ink cursor-pointer [@media(hover:hover)]:hover:bg-action-subtle-hover" : "bg-transparent text-ink cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover"
        ),
        style: { "--su-tree-depth": d },
        disabled: s.disabled,
        onClick: () => p(s.key),
        children: [
          l ? (
            // 24 mini ghost toggle, 16 ink-3 chevron (right → down). The ::before stretches its
            // tap area to the full 32 row height without moving the glyph or the label.
            /* @__PURE__ */ a(
              "span",
              {
                "aria-hidden": !0,
                className: v(
                  "relative inline-flex shrink-0 items-center justify-center size-[var(--su-control-mini)] rounded-su-tag text-ink-3",
                  "before:content-empty before:absolute before:-inset-[4px]",
                  !s.disabled && "[@media(hover:hover)]:hover:bg-fill"
                ),
                onClick: (u) => {
                  u.stopPropagation(), i(s.key);
                },
                children: /* @__PURE__ */ a(
                  q,
                  {
                    size: 16,
                    stroke: 1.75,
                    className: v(
                      "transition-transform duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                      c ? "rotate-0" : "-rotate-90 rtl:rotate-90"
                    )
                  }
                )
              }
            )
          ) : /* @__PURE__ */ a("span", { className: "shrink-0 size-[var(--su-control-mini)]", "aria-hidden": !0 }),
          /* @__PURE__ */ a("span", { className: "flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap", children: s.title })
        ]
      }
    ),
    l && c ? /* @__PURE__ */ a("div", { role: "group", children: s.children.map((u) => /* @__PURE__ */ a(
      z,
      {
        node: u,
        depth: d + 1,
        expanded: o,
        selected: f,
        focusKey: h,
        toggle: i,
        select: p
      },
      u.key
    )) }) : null
  ] });
}
function V({
  treeData: s,
  defaultExpandedKeys: d = [],
  selectedKeys: o,
  defaultSelectedKeys: f = [],
  className: h,
  onSelect: i,
  ...p
}) {
  const l = T(null), [c, m] = A(() => new Set(d)), [b, u] = A(() => new Set(f)), [k, w] = A(), D = o ? new Set(o) : b, x = [], S = (e) => {
    var r;
    for (const t of e)
      t.disabled || x.push(t.key), (r = t.children) != null && r.length && c.has(t.key) && S(t.children);
  };
  S(s);
  const E = k && x.includes(k) ? k : x[0], y = (e) => {
    m((r) => {
      const t = new Set(r);
      return t.delete(e) || t.add(e), t;
    });
  }, O = (e) => {
    w(e), o || u(/* @__PURE__ */ new Set([e])), i == null || i(e);
  }, F = () => {
    var e;
    return Array.from(
      ((e = l.current) == null ? void 0 : e.querySelectorAll('[role="treeitem"]:not([disabled])')) ?? []
    );
  }, I = (e) => {
    const r = F(), t = r.indexOf(document.activeElement);
    if (t < 0) return;
    const g = r[t], C = g.dataset.key, K = Number(g.getAttribute("aria-level")), N = g.getAttribute("aria-expanded");
    let n;
    switch (e.key) {
      case "ArrowDown":
        n = r[t + 1];
        break;
      case "ArrowUp":
        n = r[t - 1];
        break;
      case "Home":
        n = r[0];
        break;
      case "End":
        n = r[r.length - 1];
        break;
      case "ArrowRight":
        N === "false" ? y(C) : N === "true" && (n = r[t + 1]);
        break;
      case "ArrowLeft":
        N === "true" ? y(C) : n = r.slice(0, t).reverse().find((R) => Number(R.getAttribute("aria-level")) < K);
        break;
      default:
        return;
    }
    e.preventDefault(), n && (w(n.dataset.key), n.focus());
  };
  return /* @__PURE__ */ a(
    "div",
    {
      ref: l,
      className: v(
        // Panel: surface, 1px border, radius 8 (a caller's utilities still override the skin).
        "su-panel py-su1",
        h
      ),
      role: "tree",
      onKeyDown: I,
      onFocus: (e) => {
        var t;
        const r = (t = e.target.dataset) == null ? void 0 : t.key;
        r && w(r);
      },
      ...p,
      children: s.map((e) => /* @__PURE__ */ a(
        z,
        {
          node: e,
          depth: 0,
          expanded: c,
          selected: D,
          focusKey: E,
          toggle: y,
          select: O
        },
        e.key
      ))
    }
  );
}
export {
  V as Tree
};
