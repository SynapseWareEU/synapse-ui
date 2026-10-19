import { jsx as a, jsxs as n } from "react/jsx-runtime";
import { Root as l, Item as x, Header as b, Trigger as v, Content as g } from "../../vendor/@radix-ui/react-accordion/dist/index.js";
import { cn as s } from "../../utils/cn.js";
import N from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronDown.js";
function o(t) {
  return t.map((e) => /* @__PURE__ */ n(
    x,
    {
      value: e.key,
      className: "border-b border-solid border-border last:border-b-0 data-[state=open]:bg-surface-2",
      disabled: e.disabled,
      children: [
        /* @__PURE__ */ n(
          b,
          {
            className: s(
              "m-0 flex w-full items-center",
              // Pointer-only hover; `:not([data-disabled])` also makes it outrank the open fill.
              "[@media(hover:hover)]:[&:not([data-disabled]):hover]:bg-surface-hover",
              e.extra != null && "gap-su2 pe-su4"
            ),
            children: [
              /* @__PURE__ */ n(
                v,
                {
                  className: s(
                    "group flex flex-1 min-w-0 min-h-[var(--su-panel-header)] items-center gap-su2 py-su3 ps-su4 bg-transparent",
                    "font-sans text-body font-medium text-ink text-start cursor-pointer",
                    e.extra != null ? "pe-0" : "pe-su4",
                    "disabled:cursor-not-allowed disabled:text-ink-3",
                    // The panel clips its corners, so the ring sits inside the row.
                    "su-focus-ring focus-visible:outline-offset-[-2px]"
                  ),
                  children: [
                    /* @__PURE__ */ a(
                      "span",
                      {
                        "aria-hidden": !0,
                        className: "inline-flex shrink-0 items-center justify-center size-[var(--su-control-mini)] text-ink-3",
                        children: /* @__PURE__ */ a(
                          N,
                          {
                            size: 16,
                            stroke: 1.75,
                            className: s(
                              "-rotate-90 rtl:rotate-90 group-data-[state=open]:rotate-0",
                              "transition-transform duration-[var(--su-duration-normal)] ease-[var(--su-ease-out)]"
                            )
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ a("span", { className: "flex-1 min-w-0", children: e.label })
                  ]
                }
              ),
              e.extra != null ? (
                // font-normal: the header is an <h3>, whose UA bold would otherwise reach the extra.
                /* @__PURE__ */ a("span", { className: "shrink-0 font-sans text-small font-normal text-ink-2", children: e.extra })
              ) : null
            ]
          }
        ),
        /* @__PURE__ */ a(
          g,
          {
            className: s(
              "overflow-hidden data-[state=open]:animate-su-slide-down data-[state=closed]:animate-su-slide-up",
              "motion-reduce:data-[state]:animate-none"
            ),
            children: /* @__PURE__ */ a("div", { className: "pt-0 pe-su4 pb-su4 ps-[calc(var(--su-space-4)+var(--su-control-mini)+var(--su-space-2))] text-body text-ink-2", children: e.children })
          }
        )
      ]
    },
    e.key
  ));
}
function w(t) {
  const { items: e, className: i } = t, r = s("su-panel", i);
  if (t.type === "multiple") {
    const { defaultValue: p, value: f, onValueChange: h } = t;
    return /* @__PURE__ */ a(
      l,
      {
        type: "multiple",
        className: r,
        defaultValue: p,
        value: f,
        onValueChange: h,
        children: o(e)
      }
    );
  }
  const { collapsible: u = !0, defaultValue: d, value: c, onValueChange: m } = t;
  return /* @__PURE__ */ a(
    l,
    {
      type: "single",
      collapsible: u,
      className: r,
      defaultValue: d,
      value: c,
      onValueChange: m,
      children: o(e)
    }
  );
}
export {
  w as Collapse
};
