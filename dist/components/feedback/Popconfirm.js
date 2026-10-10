import { jsxs as i, jsx as t } from "react/jsx-runtime";
import { Root as S, Trigger as j, Portal as A, Content as K } from "../../vendor/@radix-ui/react-popover/dist/index.js";
import { useState as b, useId as w, useRef as B } from "react";
import { Button as x } from "../general/Button.js";
function J({
  title: y = "Are you sure?",
  description: o,
  okText: h = "OK",
  cancelText: g = "Cancel",
  onConfirm: a,
  onCancel: n,
  disabled: d,
  okDanger: k,
  danger: D,
  children: z,
  open: c,
  defaultOpen: I,
  onOpenChange: l
}) {
  const N = k ?? D ?? !1, [P, R] = b(I ?? !1), [r, f] = b(!1), O = c ?? P, u = w(), m = w(), p = B(null), s = (e) => {
    c === void 0 && R(e), l == null || l(e);
  };
  return /* @__PURE__ */ i(S, { modal: !0, open: d ? !1 : O, onOpenChange: s, children: [
    /* @__PURE__ */ t(j, { asChild: !0, disabled: d, children: z }),
    /* @__PURE__ */ t(A, { children: /* @__PURE__ */ i(
      K,
      {
        role: "alertdialog",
        "aria-labelledby": u,
        "aria-describedby": o ? m : void 0,
        side: "bottom",
        align: "start",
        sideOffset: 4,
        collisionPadding: 8,
        onOpenAutoFocus: (e) => {
          var v;
          e.preventDefault(), (v = p.current) == null || v.focus();
        },
        onEscapeKeyDown: (e) => {
          r && e.preventDefault();
        },
        onInteractOutside: (e) => {
          r && e.preventDefault();
        },
        className: "z-[var(--su-z-dropdown)] box-border w-[320px] max-w-[calc(100vw-var(--su-space-8))] flex flex-col gap-su2 p-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay outline-none animate-su-dropdown-in motion-reduce:animate-none",
        children: [
          /* @__PURE__ */ t("div", { id: u, className: "text-body font-semibold text-ink [overflow-wrap:anywhere]", children: y }),
          o ? /* @__PURE__ */ t("div", { id: m, className: "text-small text-ink-2 [overflow-wrap:anywhere]", children: o }) : null,
          /* @__PURE__ */ i("div", { className: "mt-su1 flex flex-wrap items-center gap-su2", children: [
            /* @__PURE__ */ t(
              x,
              {
                variant: "primary",
                size: "sm",
                danger: N,
                loading: r,
                onClick: () => {
                  const e = a == null ? void 0 : a();
                  if (!e || typeof e.then != "function") {
                    s(!1);
                    return;
                  }
                  f(!0), Promise.resolve(e).then(
                    () => s(!1),
                    () => {
                    }
                    // rejection: stay open, caller surfaces the error
                  ).finally(() => f(!1));
                },
                children: h
              }
            ),
            /* @__PURE__ */ t(x, { ref: p, size: "sm", disabled: r, onClick: () => {
              n == null || n(), s(!1);
            }, children: g })
          ] })
        ]
      }
    ) })
  ] });
}
export {
  J as Popconfirm
};
