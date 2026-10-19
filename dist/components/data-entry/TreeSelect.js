import { jsxs as v, jsx as r, Fragment as O } from "react/jsx-runtime";
import { Root as P, Trigger as M, Portal as V, Content as $ } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { useState as y, useMemo as q, useCallback as G } from "react";
import { cn as C } from "../../utils/cn.js";
import { CheckboxMark as H } from "./Checkbox.js";
import { useFormItemContext as J, useFieldState as K } from "./Form.js";
import { selectTriggerSizeClass as L, selectTriggerClass as Q } from "./Input.js";
import A from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
import U from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
function N(s, a) {
  for (const o of s) {
    if (o.key === a) return o.title;
    if (o.children) {
      const l = N(o.children, a);
      if (l) return l;
    }
  }
  return null;
}
const W = "flex items-center gap-su1 w-full min-w-0 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] pe-su2 py-0 rounded-su-tag transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", X = {
  idle: "text-ink [@media(hover:hover)]:hover:bg-surface-hover",
  selected: "bg-action-subtle text-ink [@media(hover:hover)]:hover:bg-action-subtle-hover",
  disabled: "text-ink-3"
}, Y = "inline-flex items-center justify-center shrink-0 size-[var(--su-control-mini)] p-0 rounded-su-tag bg-transparent text-ink-3 cursor-pointer su-focus-ring focus-visible:-outline-offset-2 transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill [@media(hover:hover)]:hover:enabled:text-ink disabled:cursor-not-allowed [@media(hover:none)]:su-hit-44", Z = "group/cb flex items-center gap-su2 flex-1 self-stretch min-w-0 p-0 rounded-su-tag bg-transparent font-sans text-body text-start cursor-pointer su-focus-ring focus-visible:-outline-offset-2 disabled:cursor-not-allowed";
function I({
  node: s,
  depth: a,
  expanded: o,
  selected: l,
  multiple: p,
  disabled: c,
  onToggleExpand: d,
  onSelect: b
}) {
  var g;
  const n = !!((g = s.children) != null && g.length), t = o.has(s.key), m = p ? Array.isArray(l) && l.includes(s.key) : l === s.key, u = c || s.disabled;
  return /* @__PURE__ */ v(O, { children: [
    /* @__PURE__ */ v(
      "div",
      {
        role: "treeitem",
        "aria-level": a + 1,
        "aria-selected": m,
        "aria-expanded": n ? t : void 0,
        className: C(
          W,
          X[u ? "disabled" : m ? "selected" : "idle"]
        ),
        style: { paddingInlineStart: `calc(var(--su-space-2) + ${a * 20}px)` },
        children: [
          n ? /* @__PURE__ */ r(
            "button",
            {
              type: "button",
              className: Y,
              "aria-label": t ? "Collapse" : "Expand",
              "aria-expanded": t,
              disabled: u,
              onClick: () => d(s.key),
              children: t ? /* @__PURE__ */ r(A, { size: 16, stroke: 1.75, "aria-hidden": "true" }) : /* @__PURE__ */ r(U, { size: 16, stroke: 1.75, "aria-hidden": "true", className: "rtl:-scale-x-100" })
            }
          ) : /* @__PURE__ */ r("span", { className: "shrink-0 size-[var(--su-control-mini)]", "aria-hidden": "true" }),
          /* @__PURE__ */ v(
            "button",
            {
              type: "button",
              disabled: u,
              className: Z,
              onClick: () => b(s.key),
              children: [
                p && /* @__PURE__ */ r(H, { checked: m, disabled: u }),
                /* @__PURE__ */ r("span", { className: "min-w-0 truncate", children: s.title })
              ]
            }
          )
        ]
      }
    ),
    n && t && /* @__PURE__ */ r("div", { role: "group", children: s.children.map((x) => /* @__PURE__ */ r(
      I,
      {
        node: x,
        depth: a + 1,
        expanded: o,
        selected: l,
        multiple: p,
        disabled: c,
        onToggleExpand: d,
        onSelect: b
      },
      x.key
    )) })
  ] });
}
function le(s) {
  const {
    value: a,
    defaultValue: o,
    placeholder: l = "Select…",
    disabled: p,
    treeData: c = [],
    multiple: d = !1,
    className: b,
    onChange: n
  } = s, t = J(), { size: m, disabled: u } = K(void 0, p), [g, x] = y(o), [T, S] = y(!1), [j, D] = y(/* @__PURE__ */ new Set()), k = a !== void 0, i = k ? a : g, w = q(() => d && Array.isArray(i) ? i.length === 0 ? null : i.map((e) => N(c, e) ?? e).join(", ") : typeof i == "string" ? N(c, i) ?? i : null, [i, c, d]), z = G(
    (e) => {
      k || x(e), n == null || n(e);
    },
    [k, d, n]
  ), E = (e) => {
    if (d) {
      const f = Array.isArray(i) ? i : [], h = f.includes(e) ? f.filter((F) => F !== e) : [...f, e];
      z(h);
    } else
      z(e), S(!1);
  }, R = (e) => {
    D((f) => {
      const h = new Set(f);
      return h.has(e) ? h.delete(e) : h.add(e), h;
    });
  }, B = /* @__PURE__ */ v(
    "button",
    {
      type: "button",
      id: t == null ? void 0 : t.id,
      disabled: u,
      className: C(Q, L[m], "w-full", b),
      "aria-haspopup": "tree",
      "aria-describedby": t == null ? void 0 : t.descriptionId,
      "aria-invalid": t != null && t.error ? !0 : void 0,
      title: w ?? void 0,
      children: [
        /* @__PURE__ */ r("span", { className: C("flex-1 min-w-0 truncate", !w && "text-ink-3"), children: w ?? l }),
        /* @__PURE__ */ r(A, { size: 16, stroke: 1.75, "aria-hidden": "true", className: "shrink-0 text-ink-3" })
      ]
    }
  );
  return /* @__PURE__ */ v(P, { open: T, onOpenChange: S, children: [
    /* @__PURE__ */ r(M, { asChild: !0, children: B }),
    /* @__PURE__ */ r(V, { children: /* @__PURE__ */ r(
      $,
      {
        role: "tree",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        className: "su-popover overflow-auto overscroll-contain w-[var(--radix-popover-trigger-width)] max-h-[var(--su-dropdown-max-h)] animate-su-dropdown-in motion-reduce:animate-none",
        children: c.length === 0 ? /* @__PURE__ */ r("p", { className: "m-0 p-su2 text-small text-ink-2 text-start", children: "No options" }) : c.map((e) => /* @__PURE__ */ r(
          I,
          {
            node: e,
            depth: 0,
            expanded: j,
            selected: i,
            multiple: d,
            disabled: u,
            onToggleExpand: R,
            onSelect: E
          },
          e.key
        ))
      }
    ) })
  ] });
}
export {
  le as TreeSelect
};
