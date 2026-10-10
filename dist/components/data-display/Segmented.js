import { jsx as r } from "react/jsx-runtime";
import { Root as c, Item as m } from "../../vendor/@radix-ui/react-toggle-group/dist/index.js";
import { useState as p } from "react";
import { cn as o } from "../../utils/cn.js";
function h({
  options: n,
  block: s = !1,
  className: i,
  value: a,
  defaultValue: d,
  onValueChange: t,
  ...l
}) {
  const [u, f] = p(d);
  return /* @__PURE__ */ r(
    c,
    {
      type: "single",
      value: a ?? u ?? "",
      onValueChange: (e) => {
        e && (a === void 0 && f(e), t == null || t(e));
      },
      className: o(
        // Track: 36 high, padding 3, gap 2, radius 6, fill. `block` is a grid of equal columns.
        "h-[36px] p-[3px] gap-[2px] items-center rounded-su-control bg-fill font-sans",
        s ? "grid grid-flow-col auto-cols-fr w-full" : "inline-flex",
        i
      ),
      ...l,
      children: n.map((e) => /* @__PURE__ */ r(
        m,
        {
          value: e.value,
          disabled: e.disabled,
          className: o(
            // Item: 30 high, padding 0 12, radius 4, 1px border, 14/20 500; icon 16 with gap 8.
            "inline-flex items-center justify-center gap-su2 min-w-0 h-[30px] px-su3 rounded-su-tag border border-solid font-sans text-[14px] leading-[20px] font-medium whitespace-nowrap cursor-pointer",
            "transition-[background-color,border-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
            "su-focus-ring",
            // Selected: raised thumb with a hairline, ink text. No shadow.
            "data-[state=on]:bg-control-raised data-[state=on]:border-border data-[state=on]:enabled:text-ink",
            // Unselected: transparent, ink-2; ink under a pointer. Disabled: ink-3, no opacity.
            "data-[state=off]:bg-transparent data-[state=off]:border-transparent data-[state=off]:enabled:text-ink-2",
            "[@media(hover:hover)]:data-[state=off]:enabled:hover:text-ink",
            "disabled:text-ink-3 disabled:cursor-not-allowed"
          ),
          children: e.label
        },
        e.value
      ))
    }
  );
}
export {
  h as Segmented
};
