import { jsxs as c, jsx as s } from "react/jsx-runtime";
import { iconDefaults as u } from "../general/Icon.js";
import { cn as r } from "../../utils/cn.js";
import { toneIcon as x, toneTextClass as p, dismissButtonClass as v } from "./shared.js";
import b from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
function h({
  type: t = "info",
  title: a,
  description: e,
  icon: o,
  action: i,
  onClose: n,
  className: m,
  children: l,
  ...d
}) {
  const f = x[t];
  return /* @__PURE__ */ c(
    "div",
    {
      className: r(
        "box-border flex items-start gap-[10px] py-su3 px-su4 rounded-su-surface border border-solid border-border bg-surface-overlay text-ink font-sans shadow-su-overlay",
        m
      ),
      role: t === "error" ? "alert" : "status",
      ...d,
      children: [
        /* @__PURE__ */ s(
          "span",
          {
            className: r("shrink-0 flex mt-[1px]", p[t]),
            "aria-hidden": o ? void 0 : !0,
            children: o ?? /* @__PURE__ */ s(f, { size: 18, ...u })
          }
        ),
        /* @__PURE__ */ c("div", { className: "flex-1 min-w-0 [overflow-wrap:anywhere]", children: [
          a ? /* @__PURE__ */ s("div", { className: "text-body font-medium text-ink", children: a }) : null,
          e || l ? /* @__PURE__ */ s("div", { className: "text-small text-ink-2", children: e ?? l }) : null,
          i ? /* @__PURE__ */ s("div", { className: "mt-su2 flex flex-wrap items-center gap-su2", children: i }) : null
        ] }),
        n ? /* @__PURE__ */ s(
          "button",
          {
            type: "button",
            className: r(v, "-m-su1"),
            onClick: n,
            "aria-label": "Dismiss notification",
            children: /* @__PURE__ */ s(b, { size: 16, ...u })
          }
        ) : null
      ]
    }
  );
}
function N({ className: t, children: a, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: r(
        "fixed bottom-su6 start-[calc(var(--su-content-inset-start,0px)+var(--su-page-pad-x))] z-[var(--su-z-toast)] flex flex-col gap-su2 w-[min(var(--su-toast-width),calc(100vw-var(--su-content-inset-start,0px)-var(--su-page-pad-x)*2))]",
        t
      ),
      ...e,
      children: a
    }
  );
}
h.Stack = N;
export {
  h as Notification,
  N as NotificationStack
};
