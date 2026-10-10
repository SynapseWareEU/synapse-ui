import { jsxs as N, jsx as i } from "react/jsx-runtime";
import { Root as q, Trigger as B, Portal as K, Content as U } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { useState as C, useRef as G, useMemo as H, useCallback as J, useEffect as Q } from "react";
import { cn as S } from "../../utils/cn.js";
import { useFormItemContext as V, useFieldState as W } from "./Form.js";
import { selectTriggerSizeClass as X, selectTriggerClass as Y } from "./Input.js";
import Z from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
import _ from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
import $ from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
function z(l, f) {
  var v;
  const n = [l], m = [];
  let d = l;
  for (const p of f) {
    const a = d.find((o) => o.value === p);
    if (!a) break;
    m.push(a.label), (v = a.children) != null && v.length && (d = a.children, n.push(d));
  }
  return { columns: n, labels: m };
}
const ee = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag font-sans text-body text-start outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none contrast-more:focus-visible:outline-2 contrast-more:focus-visible:outline-solid contrast-more:focus-visible:outline-ink contrast-more:focus-visible:-outline-offset-2 forced-colors:focus-visible:outline-2 forced-colors:focus-visible:outline-solid forced-colors:focus-visible:-outline-offset-2", te = {
  idle: "bg-transparent text-ink cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover focus-visible:bg-surface-hover",
  active: "bg-action-subtle text-ink cursor-pointer [@media(hover:hover)]:hover:bg-action-subtle-hover focus-visible:bg-action-subtle-hover",
  disabled: "bg-transparent text-ink-3 cursor-not-allowed"
};
function h(l, f = 0) {
  const n = l == null ? void 0 : l.querySelectorAll("button:not(:disabled)");
  n != null && n.length && n[Math.max(0, Math.min(f, n.length - 1))].focus();
}
function ue({
  value: l,
  defaultValue: f = [],
  placeholder: n = "Select…",
  disabled: m,
  options: d = [],
  notFoundContent: v = "No options",
  className: p,
  onChange: a
}) {
  const o = V(), { size: E, disabled: L } = W(void 0, m), [P, j] = C(f), [F, A] = C(!1), [x, D] = C(null), g = G(null), k = l !== void 0, b = k ? l : P, { columns: w, labels: O } = H(() => z(d, b), [d, b]), y = O.length > 0 ? O.join(" / ") : null, M = J(
    (t) => {
      const { labels: e } = z(d, t);
      k || j(t), a == null || a(t, e);
    },
    [k, a, d]
  ), I = (t, e) => {
    var u;
    if (e.disabled) return;
    const s = b.slice(0, t);
    s[t] = e.value, M(s), (u = e.children) != null && u.length || A(!1);
  };
  Q(() => {
    var t;
    x !== null && (h((t = g.current) == null ? void 0 : t.children[x]), D(null));
  }, [x, w]);
  const T = (t) => {
    var u;
    const e = document.activeElement, s = e == null ? void 0 : e.closest("[data-column]");
    if (s)
      if (t.key === "ArrowDown" || t.key === "ArrowUp") {
        t.preventDefault();
        const r = [...s.querySelectorAll("button:not(:disabled)")].indexOf(e);
        h(s, r + (t.key === "ArrowDown" ? 1 : -1));
      } else if (t.key === "ArrowRight") {
        t.preventDefault();
        const c = Number(s.getAttribute("data-column")), r = (u = w[c]) == null ? void 0 : u[Number(e == null ? void 0 : e.dataset.index)];
        s.nextElementSibling && b[c] === (r == null ? void 0 : r.value) ? h(s.nextElementSibling) : r && (e != null && e.dataset.branch) && (I(c, r), D(c + 1));
      } else t.key === "ArrowLeft" && (t.preventDefault(), h(s.previousElementSibling));
  };
  return /* @__PURE__ */ N(q, { open: F, onOpenChange: A, children: [
    /* @__PURE__ */ i(B, { asChild: !0, children: /* @__PURE__ */ N(
      "button",
      {
        type: "button",
        id: o == null ? void 0 : o.id,
        disabled: L,
        className: S(Y, X[E], "w-full", p),
        "aria-haspopup": "listbox",
        "aria-describedby": o == null ? void 0 : o.descriptionId,
        "aria-invalid": o != null && o.error ? !0 : void 0,
        title: y ?? void 0,
        children: [
          /* @__PURE__ */ i("span", { className: S("flex-1 min-w-0 truncate", !y && "text-ink-3"), children: y ?? n }),
          /* @__PURE__ */ i(Z, { size: 16, stroke: 1.75, "aria-hidden": "true", className: "shrink-0 text-ink-3" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(K, { children: /* @__PURE__ */ i(
      U,
      {
        ref: g,
        role: "listbox",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        className: "su-popover flex p-0 max-w-[calc(100vw-var(--su-space-4))] overflow-x-auto animate-su-dropdown-in motion-reduce:animate-none",
        onKeyDown: T,
        onOpenAutoFocus: (t) => {
          var e;
          t.preventDefault(), h((e = g.current) == null ? void 0 : e.children[0]);
        },
        children: w.map((t, e) => /* @__PURE__ */ i(
          "div",
          {
            "data-column": e,
            className: "w-[200px] shrink-0 max-h-[var(--su-dropdown-max-h)] overflow-y-auto overscroll-contain p-su1 border-e border-solid border-border last:border-e-0",
            children: t.length === 0 ? /* @__PURE__ */ i("div", { className: "p-su2 text-small text-ink-2 text-start", children: v }) : t.map((s, u) => {
              var R;
              const c = b[e] === s.value, r = !!((R = s.children) != null && R.length);
              return /* @__PURE__ */ N(
                "button",
                {
                  type: "button",
                  role: "option",
                  tabIndex: -1,
                  "data-index": u,
                  "data-branch": r ? "true" : void 0,
                  "aria-selected": c,
                  disabled: s.disabled,
                  className: S(
                    ee,
                    te[s.disabled ? "disabled" : c ? "active" : "idle"]
                  ),
                  onClick: () => I(e, s),
                  children: [
                    /* @__PURE__ */ i("span", { className: "flex-1 min-w-0 truncate", children: s.label }),
                    r ? /* @__PURE__ */ i(
                      _,
                      {
                        size: 14,
                        stroke: 1.75,
                        "aria-hidden": "true",
                        className: "shrink-0 text-ink-3 rtl:-scale-x-100"
                      }
                    ) : c ? /* @__PURE__ */ i(
                      $,
                      {
                        size: 16,
                        stroke: 1.75,
                        "aria-hidden": "true",
                        className: "shrink-0 text-action-text"
                      }
                    ) : null
                  ]
                },
                s.value
              );
            })
          },
          e
        ))
      }
    ) })
  ] });
}
export {
  ue as Cascader
};
