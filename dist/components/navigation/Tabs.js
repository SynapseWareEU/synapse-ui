import { jsx as n, jsxs as o } from "react/jsx-runtime";
import { Root as d, Content as c, List as v, Trigger as u } from "../../vendor/@radix-ui/react-tabs/dist/index.js";
import { useConfig as b } from "../../ConfigProvider.js";
import { cn as i } from "../../utils/cn.js";
function C({ className: e, dir: t, ...a }) {
  const { direction: r } = b();
  return /* @__PURE__ */ n(
    d,
    {
      dir: t ?? r,
      className: i(
        "font-sans data-[orientation=vertical]:flex data-[orientation=vertical]:items-start data-[orientation=vertical]:gap-su6",
        e
      ),
      ...a
    }
  );
}
const m = "min-w-0 flex-1 overflow-x-auto p-[5px] -m-[5px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden";
function N({ className: e, extra: t, ...a }) {
  return /* @__PURE__ */ o("div", { className: "flex max-w-full items-stretch", children: [
    /* @__PURE__ */ n("div", { className: m, children: /* @__PURE__ */ n(
      v,
      {
        className: i(
          // 40 tall (each trigger pulls 1px down over the hairline), 24 between tabs.
          "flex w-max min-w-full gap-su6 border-b border-b-solid border-b-border",
          // Vertical: page-nav rows (as in Menu), 2 apart, no rule.
          "data-[orientation=vertical]:w-auto data-[orientation=vertical]:min-w-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:gap-[2px] data-[orientation=vertical]:border-b-0",
          e
        ),
        ...a
      }
    ) }),
    t ? /* @__PURE__ */ n("div", { className: "shrink-0 self-center ps-su4", children: t }) : null
  ] });
}
const x = i(
  "relative inline-flex shrink-0 items-center justify-center gap-[6px] whitespace-nowrap",
  "h-[var(--su-tab-height)] [@media(hover:none)]:h-[var(--su-hit-target)] p-0 -mb-px [appearance:none]",
  "border-b-2 border-solid border-b-transparent bg-transparent",
  "font-sans text-body font-medium text-ink-2 cursor-pointer su-focus-ring",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "[@media(hover:hover)]:[&:not([data-state=active]):enabled:hover]:text-ink",
  "disabled:text-ink-3 disabled:cursor-not-allowed",
  "data-[state=active]:text-ink data-[state=active]:border-b-action",
  "forced-colors:data-[state=active]:border-b-[Highlight]",
  // Vertical: a page-nav row (36, padding 0 12, radius 6); selection is a fill, not a rule.
  "data-[orientation=vertical]:w-full data-[orientation=vertical]:h-[var(--su-control-md)] data-[orientation=vertical]:justify-between data-[orientation=vertical]:mb-0 data-[orientation=vertical]:px-su3 data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:rounded-su-control",
  "[&[data-orientation=vertical]:not([data-state=active]):enabled]:text-ink",
  "[@media(hover:hover)]:data-[orientation=vertical]:hover:not-disabled:bg-surface-hover",
  "data-[orientation=vertical]:data-[state=active]:bg-action-subtle",
  "data-[orientation=vertical]:data-[state=active]:text-action-text",
  "[@media(hover:hover)]:data-[orientation=vertical]:data-[state=active]:hover:bg-action-subtle-hover"
), f = i(
  "inline-flex shrink-0 items-center justify-center h-[18px] min-w-[18px] px-[6px] rounded-su-pill font-sans text-micro font-medium su-tabular",
  "[[data-orientation=vertical]>&]:h-auto [[data-orientation=vertical]>&]:min-w-0 [[data-orientation=vertical]>&]:px-0",
  "[[data-orientation=vertical]>&]:text-small [[data-orientation=vertical]>&]:font-normal",
  "[[data-orientation=vertical][data-state]>&]:bg-transparent"
), h = {
  neutral: "bg-fill text-ink-2 [[data-state=active]>&]:bg-action-subtle [[data-state=active]>&]:text-action-text",
  danger: "bg-danger-tint text-danger-text"
};
function T({
  className: e,
  children: t,
  count: a,
  countVariant: r = "neutral",
  ...s
}) {
  const l = a != null && a !== !1;
  return /* @__PURE__ */ o(u, { className: i(x, e), ...s, children: [
    t,
    l ? /* @__PURE__ */ n("span", { className: i(f, h[r]), children: a }) : null
  ] });
}
function j({ className: e, ...t }) {
  return /* @__PURE__ */ n(
    c,
    {
      className: i(
        "mt-su4 su-focus-ring text-ink text-body",
        "data-[state=active]:animate-su-fade-in motion-reduce:animate-none",
        "data-[orientation=vertical]:mt-0 data-[orientation=vertical]:flex-1 data-[orientation=vertical]:min-w-0",
        e
      ),
      ...t
    }
  );
}
export {
  C as Tabs,
  j as TabsContent,
  N as TabsList,
  T as TabsTrigger
};
