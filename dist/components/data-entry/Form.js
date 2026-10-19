import { jsx as l, jsxs as i } from "react/jsx-runtime";
import { Root as _ } from "../../vendor/@radix-ui/react-label/dist/index.js";
import { useId as b, useContext as g, createContext as y } from "react";
import { cn as d } from "../../utils/cn.js";
import { Icon as C, iconDefaults as w } from "../general/Icon.js";
import z from "../../vendor/@tabler/icons-react/dist/esm/icons/IconAlertCircle.js";
const f = y({ layout: "vertical" }), h = y(null);
function a() {
  return g(f);
}
function $() {
  return g(h);
}
function B({ children: e }) {
  return /* @__PURE__ */ l(h.Provider, { value: null, children: e });
}
function E(e, s) {
  const n = a();
  return {
    size: e ?? n.size ?? "md",
    disabled: s ?? n.disabled
  };
}
const k = "block mb-su1 su-label", P = {
  sm: "min-h-[var(--su-control-sm)]",
  md: "min-h-[var(--su-control-md)]",
  lg: "min-h-[var(--su-control-lg)]"
};
function N({
  layout: e = "vertical",
  disabled: s,
  size: n = "md",
  labelWidth: o,
  className: t,
  style: r,
  children: c,
  ...m
}) {
  return /* @__PURE__ */ l(f.Provider, { value: { layout: e, disabled: s, size: n }, children: /* @__PURE__ */ l(
    "form",
    {
      className: d(
        "flex flex-col",
        e === "horizontal" ? "su-panel self-start" : "gap-su4",
        t
      ),
      style: o != null ? {
        ...r,
        "--su-form-label-width": typeof o == "number" ? `${o}px` : o
      } : r,
      ...m,
      children: c
    }
  ) });
}
function v({ className: e, children: s, optional: n, ...o }) {
  const t = $(), r = n ?? (t == null ? void 0 : t.optional);
  return /* @__PURE__ */ i(
    _,
    {
      htmlFor: t == null ? void 0 : t.id,
      id: t == null ? void 0 : t.labelId,
      className: d(k, e),
      ...o,
      children: [
        s,
        r != null && r !== !1 && /* @__PURE__ */ i("span", { className: "font-normal", children: [
          " ",
          r === !0 ? "(optional)" : r
        ] })
      ]
    }
  );
}
function G({
  label: e,
  required: s,
  optional: n,
  help: o,
  error: t,
  className: r,
  children: c
}) {
  const { layout: m, size: F = "md" } = a(), u = b(), x = m === "horizontal", p = `${u}-description`, I = t ? /* @__PURE__ */ i(
    "div",
    {
      id: p,
      className: "flex items-start gap-[6px] mt-su1 text-small text-danger-text [[data-density=handheld]_&]:text-hh-body [[data-density=handheld]_&]:font-medium",
      role: "alert",
      children: [
        /* @__PURE__ */ l(C, { className: "size-[14px] mt-[2px] [[data-density=handheld]_&]:size-[18px] [[data-density=handheld]_&]:mt-[3px]", children: /* @__PURE__ */ l(z, { ...w }) }),
        /* @__PURE__ */ l("span", { className: "min-w-0", children: t })
      ]
    }
  ) : o ? /* @__PURE__ */ l(
    "div",
    {
      id: p,
      className: "mt-su1 text-small text-ink-2 [[data-density=handheld]_&]:text-hh-body",
      children: o
    }
  ) : null;
  return /* @__PURE__ */ l(
    h.Provider,
    {
      value: {
        id: u,
        required: s,
        optional: n,
        error: t,
        descriptionId: t || o ? p : void 0,
        labelId: e != null ? `${u}-label` : void 0
      },
      children: /* @__PURE__ */ i(
        "div",
        {
          className: d(
            // the wrapper gap is the single source of the label/field gap inside an
            // item; the label's own bottom margin (for standalone use) is zeroed.
            "flex [&>label]:mb-0",
            x ? "flex-row items-start gap-su4 px-su6 py-su3 first:pt-su5 last:pb-su5" : "flex-col gap-su1",
            r
          ),
          children: [
            x ? (
              // always rendered, even unlabelled, so rows stay aligned in a mixed form
              /* @__PURE__ */ l(
                "div",
                {
                  className: d(
                    "flex items-center flex-[0_0_var(--su-form-label-width,120px)] [&>label]:mb-0",
                    P[F]
                  ),
                  children: e != null && /* @__PURE__ */ l(v, { children: e })
                }
              )
            ) : e != null && /* @__PURE__ */ l(v, { children: e }),
            /* @__PURE__ */ i("div", { className: x ? "flex-1 min-w-0" : void 0, children: [
              c,
              I
            ] })
          ]
        }
      )
    }
  );
}
function A({ title: e, description: s, className: n, children: o }) {
  const t = a(), r = b();
  return /* @__PURE__ */ i(
    "div",
    {
      role: "group",
      "aria-labelledby": e != null ? `${r}-title` : void 0,
      "aria-describedby": s != null ? `${r}-description` : void 0,
      className: d(
        "grid grid-cols-1 gap-y-su4 px-su6 py-su5 border-t border-solid border-border first:border-t-0",
        "md:grid-cols-[240px_minmax(0,1fr)] md:gap-x-[40px]",
        n
      ),
      children: [
        /* @__PURE__ */ i("div", { className: "flex flex-col gap-su1 min-w-0", children: [
          e != null && /* @__PURE__ */ l(
            "div",
            {
              id: `${r}-title`,
              className: "text-section font-semibold text-ink [[data-density=handheld]_&]:text-hh-flow",
              children: e
            }
          ),
          s != null && /* @__PURE__ */ l(
            "div",
            {
              id: `${r}-description`,
              className: "text-small text-ink-2 [[data-density=handheld]_&]:text-hh-body",
              children: s
            }
          )
        ] }),
        /* @__PURE__ */ l(f.Provider, { value: { ...t, layout: "vertical" }, children: /* @__PURE__ */ l("div", { className: "grid grid-cols-1 items-start gap-x-su6 gap-y-su4 sm:grid-cols-[repeat(2,minmax(0,1fr))]", children: o }) })
      ]
    }
  );
}
function S({ className: e, children: s }) {
  const { layout: n } = a();
  return n !== "horizontal" ? /* @__PURE__ */ l("div", { className: d("flex flex-wrap items-center gap-su2", e), children: s }) : /* @__PURE__ */ i(
    "div",
    {
      className: d(
        "grid grid-cols-1 items-center min-h-[64px] px-su6 py-su3 border-t border-solid border-border first:border-t-0",
        "md:grid-cols-[240px_minmax(0,1fr)] md:gap-x-[40px]",
        e
      ),
      children: [
        /* @__PURE__ */ l("div", { "aria-hidden": "true", className: "hidden md:block" }),
        /* @__PURE__ */ l("div", { className: "flex flex-wrap items-center gap-su2", children: s })
      ]
    }
  );
}
N.Section = A;
N.Actions = S;
export {
  N as Form,
  S as FormActions,
  G as FormItem,
  B as FormItemIsolate,
  v as FormLabel,
  A as FormSection,
  k as formLabelClass,
  E as useFieldState,
  a as useFormContext,
  $ as useFormItemContext
};
