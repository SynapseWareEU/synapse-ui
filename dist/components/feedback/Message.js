import { jsx as r, jsxs as d } from "react/jsx-runtime";
import { Provider as h, Root as y, Description as b, Close as _, Viewport as C } from "../../vendor/@radix-ui/react-toast/dist/index.js";
import { useState as N, useCallback as k, useMemo as D, useEffect as M, useContext as I, createContext as z } from "react";
import { useConfig as P } from "../../ConfigProvider.js";
import { iconDefaults as f } from "../general/Icon.js";
import { cn as u } from "../../utils/cn.js";
import { toneIcon as E, toneTextClass as R, dismissButtonClass as T } from "./shared.js";
import j from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const m = z(null);
let A = 0;
const B = 4500;
function $({ children: s }) {
  const [t, l] = N([]), { direction: x } = P(), a = k((e) => {
    const o = `msg-${++A}`;
    l((c) => [...c, { ...e, id: o }]);
  }, []), i = D(
    () => ({
      open: a,
      success: (e) => a({ content: e, type: "success" }),
      error: (e) => a({ content: e, type: "error" }),
      info: (e) => a({ content: e, type: "info" }),
      warning: (e) => a({ content: e, type: "warning" })
    }),
    [a]
  );
  return M(() => (n._api = i, () => {
    n._api === i && (n._api = null);
  }), [i]), /* @__PURE__ */ r(m.Provider, { value: i, children: /* @__PURE__ */ d(h, { swipeDirection: x === "rtl" ? "right" : "left", children: [
    s,
    t.map((e) => {
      const o = e.type ?? "info", c = E[o], p = e.duration === 0;
      return /* @__PURE__ */ r(
        y,
        {
          type: o === "error" ? "foreground" : "background",
          className: u(
            "box-border flex min-h-[48px] py-su3 px-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay su-focus-ring",
            "data-[state=open]:animate-su-rise-in motion-reduce:animate-none",
            "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-[var(--su-duration-fast)] data-[swipe=cancel]:ease-[var(--su-ease-out)]"
          ),
          duration: p ? 1 / 0 : e.duration ?? B,
          onOpenChange: (w) => {
            w || l((g) => g.filter((v) => v.id !== e.id));
          },
          children: /* @__PURE__ */ d("div", { className: "my-auto w-full flex items-start gap-[10px]", children: [
            /* @__PURE__ */ r("span", { "aria-hidden": !0, className: u("shrink-0 flex mt-[1px]", R[o]), children: e.icon ?? /* @__PURE__ */ r(c, { size: 18, ...f }) }),
            /* @__PURE__ */ r(b, { className: "flex-1 min-w-0 text-body text-ink [overflow-wrap:anywhere]", children: e.content }),
            e.action ? /* @__PURE__ */ r("div", { className: "shrink-0 text-body font-medium", children: e.action }) : null,
            p ? /* @__PURE__ */ r(_, { className: u(T, "-my-su1 -me-su1"), "aria-label": "Dismiss", children: /* @__PURE__ */ r(j, { size: 16, ...f }) }) : null
          ] })
        },
        e.id
      );
    }),
    /* @__PURE__ */ r(C, { className: "fixed bottom-su6 start-[calc(var(--su-content-inset-start,0px)+var(--su-page-pad-x))] z-[var(--su-z-toast)] m-0 p-0 list-none flex flex-col gap-su2 w-[min(var(--su-toast-width),calc(100vw-var(--su-page-pad-x)*2))] outline-none" })
  ] }) });
}
function q() {
  const s = I(m);
  if (!s) throw new Error("useMessage must be used within MessageProvider");
  return s;
}
const n = {
  _api: null,
  useBind(s) {
    n._api = s;
  },
  open(s) {
    var t;
    (t = n._api) == null || t.open(s);
  },
  success(s) {
    var t;
    (t = n._api) == null || t.success(s);
  },
  error(s) {
    var t;
    (t = n._api) == null || t.error(s);
  },
  info(s) {
    var t;
    (t = n._api) == null || t.info(s);
  },
  warning(s) {
    var t;
    (t = n._api) == null || t.warning(s);
  }
};
export {
  $ as MessageProvider,
  n as message,
  q as useMessage
};
