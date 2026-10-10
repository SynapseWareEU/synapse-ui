import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { iconDefaults as i } from "../general/Icon.js";
import { cn as l } from "../../utils/cn.js";
import { toneIcon as k, toneTextClass as N, dismissButtonClass as v, toneSurfaceClass as C } from "./shared.js";
import g from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
function A({
  type: s = "neutral",
  title: n,
  closable: d = !1,
  onClose: m,
  closeLabel: u = "Close alert",
  showIcon: c = !1,
  icon: f,
  action: t,
  compact: x = !1,
  className: b,
  children: r,
  ...p
}) {
  const h = k[s], o = f ?? (c ? /* @__PURE__ */ e(h, { size: 16, ...i }) : null);
  return /* @__PURE__ */ a(
    "div",
    {
      role: s === "error" || s === "warning" ? "alert" : "status",
      className: l(
        "w-full box-border flex items-start gap-su2 py-[10px] px-su3 rounded-su-surface border border-solid font-sans text-body text-ink",
        C[s],
        b
      ),
      ...p,
      children: [
        o ? /* @__PURE__ */ e("span", { "aria-hidden": !0, className: l("shrink-0 flex mt-[2px] leading-none", N[s]), children: o }) : null,
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0 break-words", children: [
          n ? /* @__PURE__ */ e("div", { className: "text-body font-medium text-ink", children: n }) : null,
          r ? /* @__PURE__ */ e("div", { className: l(x ? "text-small" : "text-body", "text-ink-2"), children: r }) : null
        ] }),
        t ? /* @__PURE__ */ e("div", { className: "shrink-0 text-body font-medium", children: t }) : null,
        d ? /* @__PURE__ */ e("button", { type: "button", className: l(v, "-m-su1"), onClick: m, "aria-label": u, children: /* @__PURE__ */ e(g, { size: 16, ...i }) }) : null
      ]
    }
  );
}
export {
  A as Alert
};
