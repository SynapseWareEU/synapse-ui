import { jsx as t, jsxs as u } from "react/jsx-runtime";
import { Root as w, CheckboxItem as k, ItemIndicator as g, Portal as p, Content as C, Group as I, Item as N, Label as D, RadioGroup as S, RadioItem as R, Separator as y, Sub as G, SubContent as z, SubTrigger as T, Trigger as m } from "../../vendor/@radix-ui/react-dropdown-menu/dist/index.js";
import { cn as o } from "../../utils/cn.js";
import { useConfig as j } from "../../ConfigProvider.js";
import { Button as B } from "../general/Button.js";
import L from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
import P from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
function K(e) {
  const { direction: a } = j();
  return /* @__PURE__ */ t(w, { dir: a, ...e });
}
const d = {
  default: "data-[state=open]:bg-surface-2",
  secondary: "data-[state=open]:bg-surface-2",
  dashed: "data-[state=open]:bg-surface-2 data-[state=open]:text-ink",
  ghost: "data-[state=open]:bg-fill data-[state=open]:text-ink",
  primary: "data-[state=open]:bg-action-hover",
  text: "data-[state=open]:text-action-text-hover data-[state=open]:underline"
};
function Q({
  className: e,
  asChild: a,
  children: r,
  variant: n,
  size: i,
  icon: s,
  iconPlacement: c,
  ...h
}) {
  return a ? /* @__PURE__ */ t(
    m,
    {
      asChild: !0,
      className: o(d[n ?? "ghost"] ?? d.ghost, e),
      ...h,
      children: r
    }
  ) : /* @__PURE__ */ t(m, { asChild: !0, children: /* @__PURE__ */ t(
    B,
    {
      variant: n,
      size: i,
      icon: s,
      iconPlacement: c,
      className: o(
        d[n ?? "default"] ?? d.default,
        e
      ),
      ...h,
      children: r
    }
  ) });
}
const b = "su-popover min-w-[max(var(--su-menu-width),var(--radix-dropdown-menu-trigger-width,0px))] max-w-[min(calc(100vw-var(--su-space-4)),320px)] max-h-[var(--radix-dropdown-menu-content-available-height)] overflow-y-auto overscroll-contain origin-[var(--radix-dropdown-menu-content-transform-origin)] animate-su-dropdown-in motion-reduce:animate-none";
function U({
  className: e,
  sideOffset: a = 4,
  align: r = "start",
  collisionPadding: n = 8,
  container: i,
  forceMount: s,
  ...c
}) {
  return /* @__PURE__ */ t(p, { container: i, forceMount: s, children: /* @__PURE__ */ t(
    C,
    {
      sideOffset: a,
      align: r,
      collisionPadding: n,
      forceMount: s,
      className: o(b, e),
      ...c
    }
  ) });
}
const f = "relative flex items-center gap-su2 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 rounded-su-tag font-sans text-body text-start outline-none cursor-default select-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [&>svg]:size-[16px] [&>svg]:shrink-0 contrast-more:data-[highlighted]:outline contrast-more:data-[highlighted]:outline-1 contrast-more:data-[highlighted]:outline-offset-[-1px] contrast-more:data-[highlighted]:outline-[var(--su-border-strong)] forced-colors:data-[highlighted]:outline forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-offset-[-2px] forced-colors:data-[highlighted]:outline-[Highlight] data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed [&[data-disabled]>svg]:text-ink-3", x = "text-ink data-[highlighted]:bg-surface-hover [&>svg]:text-ink-2", $ = "text-danger-text data-[highlighted]:bg-danger-tint", l = `${f} ${x}`;
function V({ className: e, danger: a, ...r }) {
  return /* @__PURE__ */ t(
    N,
    {
      className: o(f, a ? $ : x, e),
      ...r
    }
  );
}
function W({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    y,
    {
      className: o("h-px my-su1 -mx-su1 su-rule", e),
      ...a
    }
  );
}
function X({ className: e, ...a }) {
  return /* @__PURE__ */ t(
    D,
    {
      className: o(
        "su-label flex items-center min-h-[var(--su-row-overlay)] px-su2",
        e
      ),
      ...a
    }
  );
}
function Y(e) {
  return /* @__PURE__ */ t(I, { ...e });
}
function Z(e) {
  return /* @__PURE__ */ t(G, { ...e });
}
function _({
  className: e,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ u(
    T,
    {
      className: o(l, "data-[state=open]:bg-surface-hover", e),
      ...r,
      children: [
        a,
        /* @__PURE__ */ t(
          "span",
          {
            "aria-hidden": "true",
            className: "ms-auto flex shrink-0 text-ink-3 rtl:-scale-x-100",
            children: /* @__PURE__ */ t(P, { size: 16, stroke: 1.75 })
          }
        )
      ]
    }
  );
}
function M({
  className: e,
  sideOffset: a = 4,
  ...r
}) {
  return /* @__PURE__ */ t(p, { children: /* @__PURE__ */ t(
    z,
    {
      sideOffset: a,
      className: o(b, e),
      ...r
    }
  ) });
}
const v = "relative inline-flex shrink-0 items-center justify-center size-[16px] border border-solid border-border-control bg-surface text-on-action [[data-state=checked]>&]:bg-action [[data-state=checked]>&]:border-action [[data-state=indeterminate]>&]:bg-action [[data-state=indeterminate]>&]:border-action [[data-disabled]>&]:bg-fill [[data-disabled]>&]:border-border [[data-disabled][data-state=checked]>&]:bg-border-strong [[data-disabled][data-state=checked]>&]:border-border-strong [[data-disabled][data-state=indeterminate]>&]:bg-border-strong [[data-disabled][data-state=indeterminate]>&]:border-border-strong";
function ee({
  className: e,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ u(k, { className: o(l, e), ...r, children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", className: o(v, "rounded-su-tag"), children: /* @__PURE__ */ t(g, { className: "flex", children: r.checked === "indeterminate" ? /* @__PURE__ */ t("span", { className: "block w-[8px] h-[2px] rounded-[1px] bg-current" }) : /* @__PURE__ */ t(L, { size: 12, stroke: 3 }) }) }),
    a
  ] });
}
function te(e) {
  return /* @__PURE__ */ t(S, { ...e });
}
function ae({
  className: e,
  children: a,
  ...r
}) {
  return /* @__PURE__ */ u(R, { className: o(l, e), ...r, children: [
    /* @__PURE__ */ t("span", { "aria-hidden": "true", className: o(v, "rounded-su-round"), children: /* @__PURE__ */ t(g, { className: "block size-[6px] rounded-su-round bg-current" }) }),
    a
  ] });
}
export {
  K as Dropdown,
  ee as DropdownCheckboxItem,
  U as DropdownContent,
  Y as DropdownGroup,
  V as DropdownItem,
  X as DropdownLabel,
  te as DropdownRadioGroup,
  ae as DropdownRadioItem,
  W as DropdownSeparator,
  Z as DropdownSub,
  M as DropdownSubContent,
  _ as DropdownSubTrigger,
  Q as DropdownTrigger,
  l as dropdownItemClass
};
