import { jsxs as u, jsx as e } from "react/jsx-runtime";
import { iconDefaults as d } from "../general/Icon.js";
import { cn as a } from "../../utils/cn.js";
import { toneIcon as p, toneTextClass as w } from "./shared.js";
const h = (t) => /^\d/.test(t);
function j({
  status: t = "info",
  title: n,
  subTitle: s,
  extra: o,
  icon: m,
  children: r,
  className: c,
  ...x
}) {
  const l = h(t), i = l ? "neutral" : t, f = p[i];
  return /* @__PURE__ */ u(
    "div",
    {
      className: a(
        "box-border w-full max-w-[480px] mx-auto flex flex-col items-center text-center py-su10 px-su6 font-sans",
        c
      ),
      ...x,
      children: [
        /* @__PURE__ */ e(
          "div",
          {
            "aria-hidden": "true",
            className: a(
              "flex items-center justify-center",
              l ? "text-display font-semibold text-ink-2 su-tabular" : w[i]
            ),
            children: m ?? (l ? t : /* @__PURE__ */ e(f, { size: 32, ...d }))
          }
        ),
        n ? /* @__PURE__ */ e("div", { className: "mt-su4 max-w-full text-title font-semibold text-ink [overflow-wrap:anywhere]", children: n }) : null,
        s ? /* @__PURE__ */ e("div", { className: "mt-su2 max-w-[420px] text-body text-ink-2 [overflow-wrap:anywhere]", children: s }) : null,
        o ? /* @__PURE__ */ e("div", { className: "mt-su6 flex flex-wrap items-center justify-center gap-su2", children: o }) : null,
        r ? /* @__PURE__ */ e("div", { className: "mt-su6 w-full", children: r }) : null
      ]
    }
  );
}
export {
  j as Result
};
