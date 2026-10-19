import { jsxs as m, jsx as t } from "react/jsx-runtime";
import { Avatar as c, AvatarImage as f, AvatarFallback as x } from "../../vendor/@radix-ui/react-avatar/dist/index.js";
import { forwardRef as d } from "react";
import { cn as p } from "../../utils/cn.js";
const u = {
  sm: "size-[24px] text-micro",
  md: "size-[28px] text-micro",
  lg: "size-[40px] text-[14px] leading-[20px]"
}, g = d(function({ src: e, alt: r, fallback: s, size: a = "md", className: i, children: l, ...n }, o) {
  return /* @__PURE__ */ m(
    c,
    {
      ref: o,
      className: p(
        "inline-flex items-center justify-center overflow-hidden rounded-su-round bg-fill text-ink-2 font-sans font-semibold shrink-0 select-none",
        u[a],
        i
      ),
      ...n,
      children: [
        e ? /* @__PURE__ */ t(
          f,
          {
            className: "size-full object-cover",
            src: e,
            alt: r ?? ""
          }
        ) : null,
        /* @__PURE__ */ t(
          x,
          {
            className: "flex items-center justify-center size-full",
            delayMs: 200,
            children: s ?? l ?? "?"
          }
        )
      ]
    }
  );
});
export {
  g as Avatar
};
