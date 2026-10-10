import { jsx as r, jsxs as p } from "react/jsx-runtime";
import { Provider as y, Root as b, Description as _, Close as C, Viewport as N } from "../../vendor/@radix-ui/react-toast/dist/index.js";
import { useState as k, useCallback as D, useMemo as M, useEffect as I, useContext as z, createContext as P } from "react";
import { useConfig as E } from "../../ConfigProvider.js";
import { iconDefaults as d } from "../general/Icon.js";
import { cn as u } from "../../utils/cn.js";
import { toneIcon as R, toneTextClass as T, dismissButtonClass as j } from "./shared.js";
import A from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const f = P(null);
let B = 0;
const O = 4500;
function q({
  children: s,
  closeLabel: t = "Dismiss"
}) {
  const [m, l] = k([]), { direction: x } = E(), a = D((e) => {
    const o = `msg-${++B}`;
    l((c) => [...c, { ...e, id: o }]);
  }, []), i = M(
    () => ({
      open: a,
      success: (e) => a({ content: e, type: "success" }),
      error: (e) => a({ content: e, type: "error" }),
      info: (e) => a({ content: e, type: "info" }),
      warning: (e) => a({ content: e, type: "warning" })
    }),
    [a]
  );
  return I(() => (n._api = i, () => {
    n._api === i && (n._api = null);
  }), [i]), /* @__PURE__ */ r(f.Provider, { value: i, children: /* @__PURE__ */ p(y, { swipeDirection: x === "rtl" ? "right" : "left", children: [
    s,
    m.map((e) => {
      const o = e.type ?? "info", c = R[o], w = e.duration === 0;
      return /* @__PURE__ */ r(
        b,
        {
          type: o === "error" ? "foreground" : "background",
          className: u(
            "box-border flex min-h-[48px] py-su3 px-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay su-focus-ring",
            "data-[state=open]:animate-su-rise-in motion-reduce:animate-none",
            "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform data-[swipe=cancel]:duration-[var(--su-duration-fast)] data-[swipe=cancel]:ease-[var(--su-ease-out)]"
          ),
          duration: w ? 1 / 0 : e.duration ?? O,
          onOpenChange: (g) => {
            g || l((v) => v.filter((h) => h.id !== e.id));
          },
          children: /* @__PURE__ */ p("div", { className: "my-auto w-full flex items-start gap-[10px]", children: [
            /* @__PURE__ */ r("span", { "aria-hidden": !0, className: u("shrink-0 flex mt-[1px]", T[o]), children: e.icon ?? /* @__PURE__ */ r(c, { size: 18, ...d }) }),
            /* @__PURE__ */ r(_, { className: "flex-1 min-w-0 text-body text-ink [overflow-wrap:anywhere]", children: e.content }),
            e.action ? /* @__PURE__ */ r("div", { className: "shrink-0 text-body font-medium", children: e.action }) : null,
            /* @__PURE__ */ r(C, { className: u(j, "-my-su1 -me-su1"), "aria-label": t, children: /* @__PURE__ */ r(A, { size: 16, ...d }) })
          ] })
        },
        e.id
      );
    }),
    /* @__PURE__ */ r(N, { className: "fixed bottom-su6 start-[calc(var(--su-content-inset-start,0px)+var(--su-page-pad-x))] z-[var(--su-z-toast)] m-0 p-0 list-none flex flex-col gap-su2 w-[min(var(--su-toast-width),calc(100vw-var(--su-page-pad-x)*2))] outline-none" })
  ] }) });
}
function H() {
  const s = z(f);
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
  q as MessageProvider,
  n as message,
  H as useMessage
};
