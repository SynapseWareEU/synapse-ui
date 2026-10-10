import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { Root as d } from "../../vendor/@radix-ui/react-separator/dist/index.js";
import { cn as e } from "../../utils/cn.js";
const i = {
  none: "",
  compact: "my-su2",
  default: "my-su4"
}, x = {
  none: "",
  compact: "mx-su1",
  default: "mx-su2"
};
function v({
  orientation: s = "horizontal",
  decorative: u = !0,
  strength: p = "hairline",
  spacing: a = "default",
  labelPlacement: l = "center",
  children: n,
  className: t,
  asChild: m,
  ...c
}) {
  const o = e(
    "shrink-0 forced-colors:bg-[CanvasText]",
    p === "strong" ? "bg-border-strong" : "bg-border"
  );
  return n != null && n !== !1 && s === "horizontal" ? /* @__PURE__ */ f(
    "div",
    {
      className: e(
        "flex items-center gap-su3",
        i[a],
        t
      ),
      ...c,
      children: [
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": !0,
            className: e(
              o,
              "h-px",
              l === "start" ? "w-[var(--su-space-2)]" : "flex-1"
            )
          }
        ),
        /* @__PURE__ */ r("span", { className: "su-label whitespace-nowrap", children: n }),
        /* @__PURE__ */ r(
          "span",
          {
            "aria-hidden": !0,
            className: e(o, "h-px", l === "end" ? "w-[var(--su-space-2)]" : "flex-1")
          }
        )
      ]
    }
  ) : /* @__PURE__ */ r(
    d,
    {
      asChild: m,
      decorative: u,
      orientation: s,
      className: e(
        o,
        s === "vertical" ? e(
          // 1×20, centred on the line it separates (header, toolbar).
          "w-px h-[20px] self-center inline-block align-middle",
          x[a]
        ) : e("h-px w-full", i[a]),
        t
      ),
      ...c
    }
  );
}
export {
  v as Divider
};
