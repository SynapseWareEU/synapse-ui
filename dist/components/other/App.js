import { jsx as n, jsxs as l, Fragment as C } from "react/jsx-runtime";
import { Provider as N, Root as O, Viewport as I } from "../../vendor/@radix-ui/react-toast/dist/index.js";
import { useContext as T, useState as k, useCallback as m, useMemo as u, createContext as j } from "react";
import { ConfigProvider as z, useConfig as R } from "../../ConfigProvider.js";
import { MessageProvider as B, useMessage as D } from "../feedback/Message.js";
import { Modal as E } from "../feedback/Modal.js";
import { Notification as F } from "../feedback/Notification.js";
import { Button as w } from "../general/Button.js";
import { TooltipProvider as K } from "../data-display/Tooltip.js";
const A = j(null);
let S = 0;
function V({ children: e }) {
  const c = D(), { direction: p } = R(), [M, d] = k([]), [t, f] = k({ open: !1 }), g = m(
    (o) => d((i) => i.filter((s) => s.key !== o)),
    []
  ), h = u(
    () => ({
      open: (o) => d((i) => [...i, { ...o, key: ++S }]),
      destroy: () => d([])
    }),
    []
  ), a = m(() => f({ open: !1 }), []), v = m(() => {
    var o;
    (o = t.onCancel) == null || o.call(t), a();
  }, [t, a]), x = u(
    () => ({
      confirm: (o) => f({ ...o, open: !0, kind: "confirm" }),
      info: (o) => f({ ...o, open: !0, kind: "info" }),
      destroy: a
    }),
    [a]
  ), b = u(
    () => ({
      message: c,
      notification: h,
      modal: x
    }),
    [c, h, x]
  );
  return /* @__PURE__ */ l(A.Provider, { value: b, children: [
    /* @__PURE__ */ l(N, { swipeDirection: p === "rtl" ? "right" : "left", children: [
      e,
      M.map(({ key: o, duration: i, type: s, onClose: r, ...y }) => /* @__PURE__ */ n(
        O,
        {
          type: s === "error" ? "foreground" : "background",
          duration: i === 0 ? 1 / 0 : i ?? 4500,
          onOpenChange: (P) => {
            P || (r == null || r(), g(o));
          },
          children: /* @__PURE__ */ n(
            F,
            {
              ...y,
              type: s,
              role: "none",
              onClose: () => {
                r == null || r(), g(o);
              }
            }
          )
        },
        o
      )),
      /* @__PURE__ */ n(I, { className: "fixed bottom-[var(--su-page-pad-phone)] start-[var(--su-page-pad-phone)] md:bottom-[var(--su-page-pad-y)] md:start-[var(--su-page-pad-x)] z-[var(--su-z-toast)] m-0 p-0 list-none flex flex-col gap-su2 w-[min(var(--su-toast-width),calc(100vw-var(--su-space-8)))] outline-none" })
    ] }),
    /* @__PURE__ */ n(
      E,
      {
        open: t.open,
        onOpenChange: (o) => !o && v(),
        title: t.title,
        width: 400,
        footer: /* @__PURE__ */ l(C, { children: [
          /* @__PURE__ */ n(
            w,
            {
              variant: "primary",
              danger: t.danger,
              onClick: () => {
                var o;
                (o = t.onOk) == null || o.call(t), a();
              },
              children: t.okText ?? "OK"
            }
          ),
          t.kind === "confirm" ? /* @__PURE__ */ n(w, { onClick: v, children: t.cancelText ?? "Cancel" }) : null
        ] }),
        children: t.content
      }
    )
  ] });
}
function Y({ children: e, closeLabel: c, ...p }) {
  return /* @__PURE__ */ n(z, { ...p, children: /* @__PURE__ */ n(K, { children: /* @__PURE__ */ n(B, { closeLabel: c, children: /* @__PURE__ */ n(V, { children: e }) }) }) });
}
function Z() {
  const e = T(A);
  if (!e) throw new Error("useApp must be used within App");
  return e;
}
export {
  Y as App,
  Z as useApp
};
