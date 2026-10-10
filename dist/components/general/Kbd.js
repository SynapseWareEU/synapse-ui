import { jsx as n } from "react/jsx-runtime";
import { forwardRef as i } from "react";
import { cn as c } from "../../utils/cn.js";
const f = /^[←↑→↓]$/, a = i(function({ className: r, children: o, ...t }, e) {
  const s = typeof o == "string" && f.test(o.trim());
  return /* @__PURE__ */ n(
    "kbd",
    {
      ref: e,
      className: c(
        "box-border inline-flex h-[20px] shrink-0 items-center justify-center whitespace-nowrap",
        "rounded-su-tag bg-fill font-sans text-micro font-medium text-ink-2 not-italic",
        // Forced colours drop the fill; a hairline keeps the key visible.
        "forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
        s ? "px-[4px]" : "px-[6px]",
        r
      ),
      ...t,
      children: o
    }
  );
});
export {
  a as Kbd
};
