import { jsx as t, jsxs as w } from "react/jsx-runtime";
import { useContext as y, createContext as C } from "react";
import { cn as s } from "../../utils/cn.js";
import { HH_STROKE as O, hhTransition as _ } from "./shared.js";
import j from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
const v = C(null);
function F({ readOnly: o = !1, className: r, children: n, ...a }) {
  const i = o ? "dl" : "ul";
  return /* @__PURE__ */ t(v.Provider, { value: { readOnly: o }, children: /* @__PURE__ */ t(i, { className: s("m-0 p-0 list-none bg-surface font-sans", r), ...a, children: n }) });
}
const D = "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[-2px]";
function I({
  label: o,
  value: r,
  sub: n,
  mono: a = !0,
  readOnly: i,
  className: c,
  disabled: u,
  type: g = "button",
  ...N
}) {
  const e = y(v), k = i ?? (e == null ? void 0 : e.readOnly) ?? !1, l = n != null && n !== !1, d = s(
    "justify-self-end max-w-full min-w-0 m-0 truncate text-hh-value font-semibold",
    a ? "font-mono" : "font-sans su-tabular",
    u ? "text-ink-3" : "text-ink"
  ), m = "col-start-1 col-end-3 row-start-2 justify-self-end max-w-full min-w-0 m-0 truncate text-hh-band-line text-ink-2", f = "col-start-1 row-start-1 self-center m-0 text-hh-key font-medium text-ink-2", h = s(
    "grid w-full gap-x-su3 px-su4 m-0 bg-surface text-ink text-start font-sans",
    "border-b border-solid border-border rounded-su-row",
    l ? "h-[var(--su-hh-control-lg)] grid-rows-[30px_22px] content-center" : "h-[var(--su-hh-control-md)] items-center"
  );
  if (k) {
    const p = /* @__PURE__ */ w("div", { className: s(h, "grid-cols-[auto_minmax(0,1fr)]", c), children: [
      /* @__PURE__ */ t("dt", { className: f, children: o }),
      /* @__PURE__ */ t("dd", { className: s(d, "col-start-2 row-start-1"), children: r }),
      l ? /* @__PURE__ */ t("dd", { className: m, children: n }) : null
    ] });
    if (e != null && e.readOnly) return p;
    const b = /* @__PURE__ */ t("dl", { className: "m-0 p-0", children: p });
    return e ? /* @__PURE__ */ t("li", { className: "m-0 p-0", children: b }) : b;
  }
  const x = /* @__PURE__ */ w(
    "button",
    {
      type: g,
      disabled: u,
      className: s(
        h,
        "grid-cols-[auto_minmax(0,1fr)_18px] cursor-pointer",
        "[@media(hover:hover)]:enabled:hover:bg-surface-hover enabled:active:bg-fill",
        "disabled:cursor-not-allowed",
        D,
        _,
        c
      ),
      ...N,
      children: [
        /* @__PURE__ */ t("span", { className: f, children: o }),
        /* @__PURE__ */ t("span", { className: s(d, "col-start-2 row-start-1"), children: r }),
        l ? /* @__PURE__ */ t("span", { className: m, children: n }) : null,
        /* @__PURE__ */ t(
          j,
          {
            size: 18,
            stroke: O,
            "aria-hidden": !0,
            className: s("col-start-3 row-start-1 self-center text-ink-3", l && "row-end-3")
          }
        )
      ]
    }
  );
  return e && !e.readOnly ? /* @__PURE__ */ t("li", { className: "m-0 p-0", children: x }) : x;
}
export {
  F as Docket,
  I as DocketRow
};
