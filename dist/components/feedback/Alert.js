import { jsx as e, jsxs as a } from "react/jsx-runtime";
import { iconDefaults as i } from "../general/Icon.js";
import { cn as l } from "../../utils/cn.js";
import { toneIcon as h, toneTextClass as k, dismissButtonClass as N, toneSurfaceClass as v } from "./shared.js";
import C from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
function I({
  type: s = "neutral",
  title: n,
  closable: d = !1,
  onClose: m,
  showIcon: u = !1,
  icon: c,
  action: t,
  compact: f = !1,
  className: x,
  children: r,
  ...b
}) {
  const p = h[s], o = c ?? (u ? /* @__PURE__ */ e(p, { size: 16, ...i }) : null);
  return /* @__PURE__ */ a(
    "div",
    {
      role: s === "error" || s === "warning" ? "alert" : "status",
      className: l(
        "w-full box-border flex items-start gap-su2 py-[10px] px-su3 rounded-su-surface border border-solid font-sans text-body text-ink",
        v[s],
        x
      ),
      ...b,
      children: [
        o ? /* @__PURE__ */ e("span", { "aria-hidden": !0, className: l("shrink-0 flex mt-[2px] leading-none", k[s]), children: o }) : null,
        /* @__PURE__ */ a("div", { className: "flex-1 min-w-0 break-words", children: [
          n ? /* @__PURE__ */ e("div", { className: "text-body font-medium text-ink", children: n }) : null,
          r ? /* @__PURE__ */ e("div", { className: l(f ? "text-small" : "text-body", "text-ink-2"), children: r }) : null
        ] }),
        t ? /* @__PURE__ */ e("div", { className: "shrink-0 text-body font-medium", children: t }) : null,
        d ? /* @__PURE__ */ e("button", { type: "button", className: l(N, "-m-su1"), onClick: m, "aria-label": "Close alert", children: /* @__PURE__ */ e(C, { size: 16, ...i }) }) : null
      ]
    }
  );
}
export {
  I as Alert
};
