import { jsxs as n, jsx as e, Fragment as p } from "react/jsx-runtime";
import { Root as I, SelectTrigger as C, SelectValue as y, Icon as z, Portal as T, Content as B, ScrollUpButton as D, SelectViewport as _, Item as j, ItemText as F, ItemIndicator as P, ScrollDownButton as U } from "../../vendor/@radix-ui/react-select/dist/index.js";
import { cn as d } from "../../utils/cn.js";
import { useFormItemContext as V, useFieldState as $ } from "./Form.js";
import { selectTriggerSizeClass as O, selectTriggerClass as L } from "./Input.js";
import g from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
import R from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronUp.js";
import q from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
const A = "relative [&_[data-su-code]]:font-semibold [@media(hover:none)]:before:content-empty [@media(hover:none)]:before:absolute [@media(hover:none)]:before:inset-[min(0px,calc((100%_-_var(--su-hit-target))/2))] inline-flex items-center gap-su2 min-w-0 w-auto max-w-full font-sans font-normal text-start text-ink whitespace-nowrap cursor-pointer bg-transparent border-0 rounded-su-control su-focus-ring transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill data-[state=open]:bg-fill disabled:text-ink-3 disabled:cursor-not-allowed", E = {
  sm: "min-h-[var(--su-control-sm)] px-su2 text-control",
  md: "min-h-[var(--su-control-md)] px-[10px] text-control",
  lg: "min-h-[var(--su-control-lg)] px-su3 text-section [[data-density=handheld]_&]:text-control"
};
function G({ option: s, label: i }) {
  const l = i ?? s.label;
  return s.code ? /* @__PURE__ */ n("span", { className: "inline-flex max-w-full items-baseline gap-su2 align-top", children: [
    /* @__PURE__ */ e("span", { "data-su-code": "", className: "shrink-0 font-mono font-medium", children: s.code }),
    " ",
    /* @__PURE__ */ e("span", { className: "min-w-0 truncate text-ink-2", children: l })
  ] }) : /* @__PURE__ */ e(p, { children: l });
}
const H = "relative flex items-center gap-su2 min-w-0 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 rounded-su-tag font-sans text-body text-ink cursor-pointer select-none outline-none data-[highlighted]:bg-surface-hover data-[state=checked]:bg-action-subtle data-[state=checked]:data-[highlighted]:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[highlighted]:outline-2 contrast-more:data-[highlighted]:outline-solid contrast-more:data-[highlighted]:outline-ink contrast-more:data-[highlighted]:-outline-offset-2 forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-solid forced-colors:data-[highlighted]:-outline-offset-2", x = "flex items-center justify-center h-[var(--su-space-6)] bg-surface-overlay text-ink-3 cursor-default";
function ee({
  value: s,
  defaultValue: i,
  placeholder: l = "Select…",
  disabled: f,
  size: v,
  options: h = [],
  className: u,
  children: b,
  prefix: r,
  variant: w = "outlined",
  onValueChange: k,
  ...S
}) {
  const a = V(), { size: m, disabled: N } = $(v, f), o = r != null && r !== !1 && r !== "", c = w === "ghost";
  return /* @__PURE__ */ n(
    I,
    {
      value: s,
      defaultValue: i,
      disabled: N,
      onValueChange: k,
      children: [
        /* @__PURE__ */ n(
          C,
          {
            id: a == null ? void 0 : a.id,
            className: c ? d(A, E[m], u) : d(
              L,
              O[m],
              o ? "w-auto max-w-full whitespace-nowrap" : "w-full",
              u
            ),
            "aria-describedby": a == null ? void 0 : a.descriptionId,
            "aria-invalid": a != null && a.error ? !0 : void 0,
            ...S,
            children: [
              o && c ? /* @__PURE__ */ e("span", { className: "inline-flex items-center shrink-0 text-ink-2", children: r }) : null,
              /* @__PURE__ */ n("span", { className: "flex-1 min-w-0 truncate", children: [
                o && !c && /* @__PURE__ */ n(p, { children: [
                  /* @__PURE__ */ e("span", { className: "text-ink-2", children: r }),
                  " "
                ] }),
                /* @__PURE__ */ e(y, { placeholder: /* @__PURE__ */ e("span", { className: "text-ink-3", children: l }) })
              ] }),
              /* @__PURE__ */ e(z, { className: "flex shrink-0 text-ink-3", children: /* @__PURE__ */ e(g, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
            ]
          }
        ),
        /* @__PURE__ */ e(T, { children: /* @__PURE__ */ n(
          B,
          {
            className: "su-popover overflow-hidden p-0 min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] max-h-[min(var(--su-dropdown-max-h),var(--radix-select-content-available-height))] animate-su-dropdown-in motion-reduce:animate-none",
            position: "popper",
            sideOffset: 4,
            children: [
              /* @__PURE__ */ e(D, { className: x, "aria-hidden": "true", children: /* @__PURE__ */ e(R, { size: 16, stroke: 1.75, "aria-hidden": "true" }) }),
              /* @__PURE__ */ e(_, { className: "p-su1", children: b ?? (h.length === 0 ? (
                // A blank popover reads as broken; say it's empty on purpose.
                /* @__PURE__ */ e("div", { className: "p-su2 text-small text-ink-2 text-start", children: "No options" })
              ) : h.map((t) => /* @__PURE__ */ n(
                j,
                {
                  value: t.value,
                  disabled: t.disabled,
                  textValue: t.code ? `${t.code} ${t.label}` : void 0,
                  className: d(
                    H,
                    // With a description the row is two lines: 5 + 20 + 18 + 5 = 48.
                    t.description ? "py-[5px]" : "py-[6px]"
                  ),
                  children: [
                    /* @__PURE__ */ n("span", { className: "flex-1 min-w-0", children: [
                      /* @__PURE__ */ e("span", { className: "block truncate", children: /* @__PURE__ */ e(F, { children: /* @__PURE__ */ e(G, { option: t }) }) }),
                      t.description ? /* @__PURE__ */ e("span", { className: "block truncate text-small text-ink-2", children: t.description }) : null
                    ] }),
                    /* @__PURE__ */ e(P, { className: "flex shrink-0 text-action-text", children: /* @__PURE__ */ e(q, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
                  ]
                },
                t.value
              ))) }),
              /* @__PURE__ */ e(U, { className: x, "aria-hidden": "true", children: /* @__PURE__ */ e(g, { size: 16, stroke: 1.75, "aria-hidden": "true" }) })
            ]
          }
        ) })
      ]
    }
  );
}
export {
  ee as Select,
  G as SelectOptionLabel,
  L as selectTriggerClass,
  O as selectTriggerSizeClass
};
