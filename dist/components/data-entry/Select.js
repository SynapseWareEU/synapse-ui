import { jsxs as l, Fragment as u, jsx as e } from "react/jsx-runtime";
import { Root as k, SelectTrigger as S, SelectValue as N, Icon as I, Portal as C, Content as y, ScrollUpButton as z, SelectViewport as B, Item as T, ItemText as D, ItemIndicator as j, ScrollDownButton as F } from "../../vendor/@radix-ui/react-select/dist/index.js";
import { cn as d } from "../../utils/cn.js";
import { useFormItemContext as P, useFieldState as U } from "./Form.js";
import { selectTriggerSizeClass as V, selectTriggerClass as $ } from "./Input.js";
import h from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
import O from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronUp.js";
import L from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
function R({ option: s, label: n }) {
  const r = n ?? s.label;
  return s.code ? /* @__PURE__ */ l("span", { className: "inline-flex max-w-full items-baseline gap-su2 align-top", children: [
    /* @__PURE__ */ e("span", { className: "shrink-0 font-mono font-medium", children: s.code }),
    " ",
    /* @__PURE__ */ e("span", { className: "min-w-0 truncate text-ink-2", children: r })
  ] }) : /* @__PURE__ */ e(u, { children: r });
}
const q = "relative flex items-center gap-su2 min-w-0 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 rounded-su-tag font-sans text-body text-ink cursor-pointer select-none outline-none data-[highlighted]:bg-surface-hover data-[state=checked]:bg-action-subtle data-[state=checked]:data-[highlighted]:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[highlighted]:outline-2 contrast-more:data-[highlighted]:outline-solid contrast-more:data-[highlighted]:outline-ink contrast-more:data-[highlighted]:-outline-offset-2 forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-solid forced-colors:data-[highlighted]:-outline-offset-2", m = "flex items-center justify-center h-[var(--su-space-6)] bg-surface-overlay text-ink-3 cursor-default";
function W({
  value: s,
  defaultValue: n,
  placeholder: r = "Select…",
  disabled: g,
  size: p,
  options: c = [],
  className: x,
  children: f,
  prefix: i,
  onValueChange: v
}) {
  const a = P(), { size: b, disabled: w } = U(p, g), o = i != null && i !== !1 && i !== "";
  return /* @__PURE__ */ l(
    k,
    {
      value: s,
      defaultValue: n,
      disabled: w,
      onValueChange: v,
      children: [
        /* @__PURE__ */ l(
          S,
          {
            id: a == null ? void 0 : a.id,
            className: d(
              $,
              V[b],
              o ? "w-auto max-w-full whitespace-nowrap" : "w-full",
              x
            ),
            "aria-describedby": a == null ? void 0 : a.descriptionId,
            "aria-invalid": a != null && a.error ? !0 : void 0,
            children: [
              /* @__PURE__ */ l("span", { className: "flex-1 min-w-0 truncate", children: [
                o && /* @__PURE__ */ l(u, { children: [
                  /* @__PURE__ */ e("span", { className: "text-ink-2", children: i }),
                  " "
                ] }),
                /* @__PURE__ */ e(N, { placeholder: /* @__PURE__ */ e("span", { className: "text-ink-3", children: r }) })
              ] }),
              /* @__PURE__ */ e(I, { className: "flex shrink-0 text-ink-3", children: /* @__PURE__ */ e(h, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
            ]
          }
        ),
        /* @__PURE__ */ e(C, { children: /* @__PURE__ */ l(
          y,
          {
            className: "su-popover overflow-hidden p-0 min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] max-h-[min(var(--su-dropdown-max-h),var(--radix-select-content-available-height))] animate-su-dropdown-in motion-reduce:animate-none",
            position: "popper",
            sideOffset: 4,
            children: [
              /* @__PURE__ */ e(z, { className: m, "aria-hidden": "true", children: /* @__PURE__ */ e(O, { size: 16, stroke: 1.75, "aria-hidden": "true" }) }),
              /* @__PURE__ */ e(B, { className: "p-su1", children: f ?? (c.length === 0 ? (
                // A blank popover reads as broken; say it's empty on purpose.
                /* @__PURE__ */ e("div", { className: "p-su2 text-small text-ink-2 text-start", children: "No options" })
              ) : c.map((t) => /* @__PURE__ */ l(
                T,
                {
                  value: t.value,
                  disabled: t.disabled,
                  textValue: t.code ? `${t.code} ${t.label}` : void 0,
                  className: d(
                    q,
                    // With a description the row is two lines: 5 + 20 + 18 + 5 = 48.
                    t.description ? "py-[5px]" : "py-[6px]"
                  ),
                  children: [
                    /* @__PURE__ */ l("span", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("span", { className: "block truncate", children: /* @__PURE__ */ e(D, { children: /* @__PURE__ */ e(R, { option: t }) }) }),
                      t.description ? /* @__PURE__ */ e("span", { className: "block truncate text-small text-ink-2", children: t.description }) : null
                    ] }),
                    /* @__PURE__ */ e(j, { className: "flex shrink-0 text-action-text", children: /* @__PURE__ */ e(L, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
                  ]
                },
                t.value
              ))) }),
              /* @__PURE__ */ e(F, { className: m, "aria-hidden": "true", children: /* @__PURE__ */ e(h, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  W as Select,
  R as SelectOptionLabel,
  $ as selectTriggerClass,
  V as selectTriggerSizeClass
};
