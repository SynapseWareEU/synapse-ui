import { jsxs as n, Fragment as x, jsx as e } from "react/jsx-runtime";
import { Root as N, SelectTrigger as I, SelectValue as C, Icon as y, Portal as z, Content as T, ScrollUpButton as B, SelectViewport as D, Item as j, ItemText as F, ItemIndicator as P, ScrollDownButton as U } from "../../vendor/@radix-ui/react-select/dist/index.js";
import { cn as o } from "../../utils/cn.js";
import { useFormItemContext as V, useFieldState as $ } from "./Form.js";
import { selectTriggerSizeClass as O, selectTriggerClass as L } from "./Input.js";
import m from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
import R from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronUp.js";
import _ from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
const q = "inline-flex items-center gap-su2 min-w-0 w-auto max-w-full font-sans font-normal text-start text-ink whitespace-nowrap cursor-pointer bg-transparent border-0 rounded-su-control su-focus-ring transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill data-[state=open]:bg-fill disabled:text-ink-3 disabled:cursor-not-allowed", A = {
  sm: "min-h-[var(--su-control-sm)] px-su2 text-control",
  md: "min-h-[var(--su-control-md)] px-[10px] text-control",
  lg: "min-h-[var(--su-control-lg)] px-su3 text-section [[data-density=handheld]_&]:text-control"
};
function E({ option: r, label: i }) {
  const s = i ?? r.label;
  return r.code ? /* @__PURE__ */ n("span", { className: "inline-flex max-w-full items-baseline gap-su2 align-top", children: [
    /* @__PURE__ */ e("span", { className: "shrink-0 font-mono font-medium", children: r.code }),
    " ",
    /* @__PURE__ */ e("span", { className: "min-w-0 truncate text-ink-2", children: s })
  ] }) : /* @__PURE__ */ e(x, { children: s });
}
const G = "relative flex items-center gap-su2 min-w-0 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 rounded-su-tag font-sans text-body text-ink cursor-pointer select-none outline-none data-[highlighted]:bg-surface-hover data-[state=checked]:bg-action-subtle data-[state=checked]:data-[highlighted]:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[highlighted]:outline-2 contrast-more:data-[highlighted]:outline-solid contrast-more:data-[highlighted]:outline-ink contrast-more:data-[highlighted]:-outline-offset-2 forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-solid forced-colors:data-[highlighted]:-outline-offset-2", g = "flex items-center justify-center h-[var(--su-space-6)] bg-surface-overlay text-ink-3 cursor-default";
function Z({
  value: r,
  defaultValue: i,
  placeholder: s = "Select…",
  disabled: p,
  size: f,
  options: c = [],
  className: d,
  children: v,
  prefix: l,
  variant: b = "outlined",
  onValueChange: w,
  ...k
}) {
  const a = V(), { size: h, disabled: S } = $(f, p), u = l != null && l !== !1 && l !== "";
  return /* @__PURE__ */ n(
    N,
    {
      value: r,
      defaultValue: i,
      disabled: S,
      onValueChange: w,
      children: [
        /* @__PURE__ */ n(
          I,
          {
            id: a == null ? void 0 : a.id,
            className: b === "ghost" ? o(q, A[h], d) : o(
              L,
              O[h],
              u ? "w-auto max-w-full whitespace-nowrap" : "w-full",
              d
            ),
            "aria-describedby": a == null ? void 0 : a.descriptionId,
            "aria-invalid": a != null && a.error ? !0 : void 0,
            ...k,
            children: [
              /* @__PURE__ */ n("span", { className: "flex-1 min-w-0 truncate", children: [
                u && /* @__PURE__ */ n(x, { children: [
                  /* @__PURE__ */ e("span", { className: "text-ink-2", children: l }),
                  " "
                ] }),
                /* @__PURE__ */ e(C, { placeholder: /* @__PURE__ */ e("span", { className: "text-ink-3", children: s }) })
              ] }),
              /* @__PURE__ */ e(y, { className: "flex shrink-0 text-ink-3", children: /* @__PURE__ */ e(m, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
            ]
          }
        ),
        /* @__PURE__ */ e(z, { children: /* @__PURE__ */ n(
          T,
          {
            className: "su-popover overflow-hidden p-0 min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] max-h-[min(var(--su-dropdown-max-h),var(--radix-select-content-available-height))] animate-su-dropdown-in motion-reduce:animate-none",
            position: "popper",
            sideOffset: 4,
            children: [
              /* @__PURE__ */ e(B, { className: g, "aria-hidden": "true", children: /* @__PURE__ */ e(R, { size: 16, stroke: 1.75, "aria-hidden": "true" }) }),
              /* @__PURE__ */ e(D, { className: "p-su1", children: v ?? (c.length === 0 ? (
                // A blank popover reads as broken; say it's empty on purpose.
                /* @__PURE__ */ e("div", { className: "p-su2 text-small text-ink-2 text-start", children: "No options" })
              ) : c.map((t) => /* @__PURE__ */ n(
                j,
                {
                  value: t.value,
                  disabled: t.disabled,
                  textValue: t.code ? `${t.code} ${t.label}` : void 0,
                  className: o(
                    G,
                    // With a description the row is two lines: 5 + 20 + 18 + 5 = 48.
                    t.description ? "py-[5px]" : "py-[6px]"
                  ),
                  children: [
                    /* @__PURE__ */ n("span", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("span", { className: "block truncate", children: /* @__PURE__ */ e(F, { children: /* @__PURE__ */ e(E, { option: t }) }) }),
                      t.description ? /* @__PURE__ */ e("span", { className: "block truncate text-small text-ink-2", children: t.description }) : null
                    ] }),
                    /* @__PURE__ */ e(P, { className: "flex shrink-0 text-action-text", children: /* @__PURE__ */ e(_, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
                  ]
                },
                t.value
              ))) }),
              /* @__PURE__ */ e(U, { className: g, "aria-hidden": "true", children: /* @__PURE__ */ e(m, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  Z as Select,
  E as SelectOptionLabel,
  L as selectTriggerClass,
  O as selectTriggerSizeClass
};
