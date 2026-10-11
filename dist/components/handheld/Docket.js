import { jsx as t, jsxs as k } from "react/jsx-runtime";
import { useContext as _, createContext as j } from "react";
import { cn as e } from "../../utils/cn.js";
import { HH_STROKE as D, hhTransition as R } from "./shared.js";
import T from "../../vendor/@tabler/icons-react/dist/esm/icons/IconChevronRight.js";
const v = j(null);
function L({ readOnly: r = !1, className: c, children: o, ...a }) {
  const i = r ? "dl" : "ul";
  return /* @__PURE__ */ t(v.Provider, { value: { readOnly: r }, children: /* @__PURE__ */ t(i, { className: e("m-0 p-0 list-none bg-surface font-sans", c), ...a, children: o }) });
}
const H = "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[-2px]";
function S({
  label: r,
  value: c,
  sub: o,
  mono: a = !0,
  readOnly: i,
  wrap: d = !1,
  valueProps: s,
  className: m,
  disabled: f,
  type: C = "button",
  ...u
}) {
  const n = _(v), O = i ?? (n == null ? void 0 : n.readOnly) ?? !1, l = o != null && o !== !1, h = d ? "text-end [overflow-wrap:anywhere]" : "truncate", x = e(
    "justify-self-end max-w-full min-w-0 m-0 text-hh-value font-semibold",
    h,
    a ? "font-mono" : "font-sans su-tabular",
    f ? "text-ink-3" : "text-ink"
  ), b = e(
    "col-start-1 col-end-3 row-start-2 justify-self-end max-w-full min-w-0 m-0 text-hh-band-line text-ink-2",
    h
  ), w = e(
    "col-start-1 row-start-1 m-0 text-hh-key font-medium text-ink-2",
    d ? "self-start py-[3px]" : "self-center"
  ), p = e(
    "grid w-full gap-x-su3 px-su4 m-0 bg-surface text-ink text-start font-sans",
    "border-b border-solid border-border rounded-su-row",
    // Wrapping: the same heights as floors, the padding a one-line row has around its text
    // (56 = 12 + 30 + 12 + the rule, 64 = 5 + 30 + 22 + 5 + the rule), and rows that take their
    // content's height.
    d ? l ? "min-h-[var(--su-hh-control-lg)] py-[5px] content-center" : "min-h-[var(--su-hh-control-md)] py-[12px] content-center" : l ? "h-[var(--su-hh-control-lg)] grid-rows-[30px_22px] content-center" : "h-[var(--su-hh-control-md)] items-center"
  );
  if (O) {
    const g = (
      // A read-only row is not a button: of the rest props it takes the ones any element does.
      /* @__PURE__ */ k(
        "div",
        {
          ...u,
          className: e(p, "grid-cols-[auto_minmax(0,1fr)]", m),
          children: [
            /* @__PURE__ */ t("dt", { className: w, children: r }),
            /* @__PURE__ */ t("dd", { ...s, className: e(x, "col-start-2 row-start-1", s == null ? void 0 : s.className), children: c }),
            l ? /* @__PURE__ */ t("dd", { className: b, children: o }) : null
          ]
        }
      )
    );
    if (n != null && n.readOnly) return g;
    const y = /* @__PURE__ */ t("dl", { className: "m-0 p-0", children: g });
    return n ? /* @__PURE__ */ t("li", { className: "m-0 p-0", children: y }) : y;
  }
  const N = /* @__PURE__ */ k(
    "button",
    {
      type: C,
      disabled: f,
      className: e(
        p,
        "grid-cols-[auto_minmax(0,1fr)_18px] cursor-pointer",
        "[@media(hover:hover)]:enabled:hover:bg-surface-hover enabled:active:bg-fill",
        "disabled:cursor-not-allowed",
        H,
        R,
        m
      ),
      ...u,
      children: [
        /* @__PURE__ */ t("span", { className: w, children: r }),
        /* @__PURE__ */ t("span", { ...s, className: e(x, "col-start-2 row-start-1", s == null ? void 0 : s.className), children: c }),
        l ? /* @__PURE__ */ t("span", { className: b, children: o }) : null,
        /* @__PURE__ */ t(
          T,
          {
            size: 18,
            stroke: D,
            "aria-hidden": !0,
            className: e("col-start-3 row-start-1 self-center text-ink-3", l && "row-end-3")
          }
        )
      ]
    }
  );
  return n && !n.readOnly ? /* @__PURE__ */ t("li", { className: "m-0 p-0", children: N }) : N;
}
export {
  L as Docket,
  S as DocketRow
};
