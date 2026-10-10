import { jsxs as m, jsx as n } from "react/jsx-runtime";
import { useId as se, useState as b, useCallback as re, useMemo as F } from "react";
import { cn as S } from "../../utils/cn.js";
import { Button as q } from "../general/Button.js";
import { iconDefaults as D, Icon as ne } from "../general/Icon.js";
import { Checkbox as ae, CheckboxMark as oe } from "./Checkbox.js";
import { useFormContext as ie, useFormItemContext as ce, FormItemIsolate as de } from "./Form.js";
import { inputSizeClass as ue, inputClass as me } from "./Input.js";
import fe from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
import be from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronLeft.js";
import he from "../../vendor/@tabler/icons-react/dist/esm/icons/IconSearch.js";
const xe = "su-panel flex flex-col min-w-0 flex-[0_1_280px]", pe = "flex items-center gap-su2 min-h-[36px] px-su3 border-b border-solid border-border bg-surface-2", ve = "flex items-center gap-su2 h-[32px] px-su3 text-body outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none focus-visible:bg-action-subtle", ge = "group/cb cursor-pointer text-ink [@media(hover:hover)]:[&:not(:focus-visible):hover]:bg-surface-hover", ke = "cursor-not-allowed text-ink-3";
function Le({
  dataSource: h = [],
  targetKeys: T,
  defaultTargetKeys: _ = [],
  disabled: H,
  titles: A = ["Source", "Target"],
  showSearch: O = !1,
  searchPlaceholder: M = "Search",
  className: Q,
  onChange: x
}) {
  const R = ie(), c = ce(), i = H ?? R.disabled, U = se(), [G, J] = b(_), [v, g] = b([]), [k, C] = b([]), [E, V] = b({ source: "", target: "" }), [N, W] = b({ source: 0, target: 0 }), I = T !== void 0, d = I ? T : G, L = re(
    (e) => {
      I || J(e), x == null || x(e);
    },
    [I, x]
  ), X = F(
    () => h.filter((e) => !d.includes(e.value)),
    [h, d]
  ), Y = F(
    () => h.filter((e) => d.includes(e.value)),
    [h, d]
  ), $ = (e, r, a) => {
    if (i || a) return;
    (r === "source" ? g : C)(
      (s) => s.includes(e) ? s.filter((o) => o !== e) : [...s, e]
    );
  }, Z = (e, r) => {
    if (i || r.length === 0) return;
    (e === "source" ? g : C)(
      (l) => r.every((s) => l.includes(s)) ? l.filter((s) => !r.includes(s)) : [...l, ...r.filter((s) => !l.includes(s))]
    );
  }, z = (e = v) => {
    i || e.length === 0 || (L([...d, ...e.filter((r) => !d.includes(r))]), g([]));
  }, K = (e = k) => {
    i || e.length === 0 || (L(d.filter((r) => !e.includes(r))), C([]));
  }, P = (e, r) => {
    var o;
    const a = Array.from(
      e.currentTarget.querySelectorAll('[role="option"]')
    );
    if (a.length === 0) return;
    const l = a.indexOf(document.activeElement);
    let s;
    if (e.key === "ArrowDown") s = Math.min(l + 1, a.length - 1);
    else if (e.key === "ArrowUp") s = Math.max(l - 1, 0);
    else if (e.key === "Home") s = 0;
    else if (e.key === "End") s = a.length - 1;
    else return;
    e.preventDefault(), W((u) => ({ ...u, [r]: s })), (o = a[s]) == null || o.focus();
  }, j = (e, r, a, l) => {
    const s = E[l].trim().toLowerCase(), o = s ? r.filter((t) => t.label.toLowerCase().includes(s)) : r, u = o.filter((t) => !t.disabled).map((t) => t.value), B = u.filter((t) => a.includes(t)).length, ee = u.length > 0 && B === u.length ? !0 : B > 0 ? "indeterminate" : !1, te = o.findIndex((t) => !t.disabled), le = !i && o[N[l]] && !o[N[l]].disabled ? N[l] : te;
    return /* @__PURE__ */ m("div", { className: xe, children: [
      /* @__PURE__ */ m("div", { className: pe, children: [
        /* @__PURE__ */ n(de, { children: /* @__PURE__ */ n(
          ae,
          {
            id: `${U}-${l}-all`,
            "aria-label": `Select all in ${e}`,
            checked: ee,
            disabled: i || u.length === 0,
            onCheckedChange: () => Z(l, u),
            className: "shrink-0"
          }
        ) }),
        /* @__PURE__ */ n("span", { className: "min-w-0 flex-1 truncate text-small font-medium text-ink-2", children: e }),
        /* @__PURE__ */ m("span", { className: "shrink-0 text-small font-medium text-ink-2 su-tabular", children: [
          a.length,
          "/",
          r.length
        ] })
      ] }),
      O && /* @__PURE__ */ n("div", { className: "p-su2 border-b border-solid border-border", children: /* @__PURE__ */ m("div", { className: "relative flex items-center", children: [
        /* @__PURE__ */ n(ne, { className: "absolute start-su2 size-[16px] text-ink-3 pointer-events-none", children: /* @__PURE__ */ n(he, { ...D }) }),
        /* @__PURE__ */ n(
          "input",
          {
            type: "search",
            value: E[l],
            placeholder: M,
            "aria-label": `${M}: ${e}`,
            disabled: i,
            onChange: (t) => {
              const w = t.target.value;
              V((p) => ({ ...p, [l]: w }));
            },
            className: S(me, ue.sm, "ps-[32px]")
          }
        )
      ] }) }),
      /* @__PURE__ */ n(
        "div",
        {
          className: "flex-1 overflow-auto max-h-[240px] py-su1",
          role: "listbox",
          "aria-label": e,
          "aria-multiselectable": "true",
          "aria-describedby": c == null ? void 0 : c.descriptionId,
          "aria-invalid": c != null && c.error ? !0 : void 0,
          onKeyDown: (t) => P(t, l),
          children: o.length === 0 ? /* @__PURE__ */ n("div", { className: "px-su3 py-su2 text-small text-ink-2 text-center", children: "No items" }) : o.map((t, w) => {
            const p = a.includes(t.value), f = !!(i || t.disabled);
            return /* @__PURE__ */ m(
              "div",
              {
                role: "option",
                tabIndex: !f && w === le ? 0 : -1,
                "aria-disabled": f,
                "aria-selected": p,
                onKeyDown: (y) => {
                  (y.key === " " || y.key === "Enter") && (y.preventDefault(), $(t.value, l, t.disabled));
                },
                className: S(
                  ve,
                  f ? ke : ge
                ),
                onClick: () => $(t.value, l, t.disabled),
                onDoubleClick: () => {
                  f || (l === "source" ? z([t.value]) : K([t.value]));
                },
                children: [
                  /* @__PURE__ */ n(oe, { checked: p, disabled: f }),
                  /* @__PURE__ */ n("span", { className: "min-w-0 truncate", children: t.label })
                ]
              },
              t.value
            );
          })
        }
      )
    ] });
  };
  return /* @__PURE__ */ m(
    "div",
    {
      id: c == null ? void 0 : c.id,
      className: S("flex items-stretch w-full gap-su3", Q),
      role: "group",
      children: [
        j(A[0], X, v, "source"),
        /* @__PURE__ */ m("div", { className: "flex flex-col justify-center gap-su2 shrink-0", children: [
          /* @__PURE__ */ n(
            q,
            {
              variant: "default",
              size: "sm",
              icon: /* @__PURE__ */ n(fe, { ...D, className: "rtl:rotate-180" }),
              disabled: i || v.length === 0,
              onClick: () => z(),
              "aria-label": "Move to target"
            }
          ),
          /* @__PURE__ */ n(
            q,
            {
              variant: "default",
              size: "sm",
              icon: /* @__PURE__ */ n(be, { ...D, className: "rtl:rotate-180" }),
              disabled: i || k.length === 0,
              onClick: () => K(),
              "aria-label": "Move to source"
            }
          )
        ] }),
        j(A[1], Y, k, "target")
      ]
    }
  );
}
export {
  Le as Transfer
};
