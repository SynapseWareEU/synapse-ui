import { jsx as e, jsxs as o } from "react/jsx-runtime";
import { useState as b } from "react";
import { Dialog as p, DialogTrigger as x, DialogPortal as h, DialogOverlay as y, Content as w, DialogTitle as N, Close as C } from "../../vendor/@radix-ui/react-dialog/dist/index.js";
import { cn as s } from "../../utils/cn.js";
import j from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const D = "inline-flex shrink-0 items-center justify-center size-[var(--su-hit-target)] rounded-su-control bg-transparent text-on-action cursor-pointer transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] [@media(hover:hover)]:[&:hover:not(:active)]:bg-[color-mix(in_srgb,var(--su-on-action)_16%,transparent)] active:bg-[color-mix(in_srgb,var(--su-on-action)_24%,transparent)] su-focus-ring focus-visible:outline-on-action";
function P({
  src: a,
  alt: i = "",
  fallback: n,
  width: l,
  height: c,
  preview: d = !1,
  className: u,
  onError: t,
  ...f
}) {
  const [g, v] = b();
  if (!a || g === a) {
    const r = (typeof n == "string" ? n : i) || "Image unavailable";
    return /* @__PURE__ */ e(
      "span",
      {
        className: s(
          "inline-flex items-center justify-center min-w-12 min-h-12 p-su2 rounded-su-surface border border-solid border-border bg-surface-2 font-sans text-small text-ink-2 text-center",
          u
        ),
        style: { width: l, height: c },
        role: "img",
        "aria-label": r,
        children: n ?? (i ? i.slice(0, 1).toUpperCase() : r)
      }
    );
  }
  const m = /* @__PURE__ */ e(
    "img",
    {
      src: a,
      alt: i,
      width: l,
      height: c,
      className: s("block max-w-full object-cover rounded-su-surface", u),
      onError: (r) => {
        v(a), t == null || t(r);
      },
      ...f
    }
  );
  return d ? /* @__PURE__ */ o(p, { children: [
    /* @__PURE__ */ e(x, { asChild: !0, children: /* @__PURE__ */ e(
      "button",
      {
        type: "button",
        className: s(
          // Same radius as the image so the focus ring follows its corners.
          "p-0 rounded-su-surface bg-transparent cursor-zoom-in",
          "transition-opacity duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
          "[@media(hover:hover)]:hover:opacity-80",
          "su-focus-ring"
        ),
        "aria-label": `Preview ${i || "image"}`,
        children: m
      }
    ) }),
    /* @__PURE__ */ o(h, { children: [
      /* @__PURE__ */ e(y, { className: "su-overlay-strong" }),
      /* @__PURE__ */ o(
        w,
        {
          className: "fixed inset-[5vh_5vw] z-[var(--su-z-modal)] flex flex-col gap-su4 font-sans animate-su-scale-in motion-reduce:animate-none",
          "aria-describedby": void 0,
          children: [
            /* @__PURE__ */ o("div", { className: "flex items-center gap-su3", children: [
              /* @__PURE__ */ e(N, { className: "flex-1 min-w-0 m-0 overflow-hidden text-ellipsis whitespace-nowrap text-body font-medium text-on-action", children: i || "Image preview" }),
              /* @__PURE__ */ e(C, { "aria-label": "Close preview", className: D, children: /* @__PURE__ */ e(j, { size: 20, stroke: 1.75, "aria-hidden": !0 }) })
            ] }),
            /* @__PURE__ */ e("div", { className: "flex flex-1 min-h-0 items-center justify-center", children: /* @__PURE__ */ e(
              "img",
              {
                src: a,
                alt: i,
                className: "block max-w-full max-h-full object-contain rounded-su-surface"
              }
            ) })
          ]
        }
      )
    ] })
  ] }) : m;
}
export {
  P as Image
};
