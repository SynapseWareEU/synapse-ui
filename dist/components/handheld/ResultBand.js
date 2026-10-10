import { jsxs as s, jsx as e } from "react/jsx-runtime";
import { cn as d } from "../../utils/cn.js";
import { HH_STROKE as a } from "./shared.js";
import g from "../../vendor/@tabler/icons-react/dist/esm/icons/IconVolume.js";
import N from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
import b from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const k = {
  success: "bg-success-strong",
  danger: "bg-danger-strong"
}, u = "m-0 min-w-0 truncate text-hh-band-line";
function z({
  tone: n = "success",
  title: f,
  signal: o,
  icon: r,
  instruction: l,
  children: t,
  className: h,
  role: p,
  ...x
}) {
  const i = r === void 0 ? n === "success" ? /* @__PURE__ */ e(N, { size: 24, stroke: a, "aria-hidden": !0 }) : /* @__PURE__ */ e(b, { size: 24, stroke: a, "aria-hidden": !0 }) : r, c = t != null && t !== !1, m = l != null && l !== !1;
  return /* @__PURE__ */ s(
    "div",
    {
      role: p ?? (n === "danger" ? "alert" : "status"),
      className: d(
        "flex flex-col justify-center gap-[6px] w-full min-h-[88px] p-su4 m-0",
        "font-sans text-on-action",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold [&_code]:text-inherit",
        k[n],
        h
      ),
      ...x,
      children: [
        /* @__PURE__ */ s("div", { className: "flex items-center gap-su2 h-su7 min-w-0", children: [
          i ? /* @__PURE__ */ e("span", { className: "inline-flex shrink-0 [&>svg]:block", children: i }) : null,
          /* @__PURE__ */ e("span", { className: "min-w-0 truncate text-hh-primary font-semibold", children: f }),
          o ? /* @__PURE__ */ s("span", { className: "flex items-center gap-[6px] shrink-0 ms-auto text-small font-semibold whitespace-nowrap", children: [
            /* @__PURE__ */ e(g, { size: 16, stroke: a, "aria-hidden": !0, className: "shrink-0" }),
            o
          ] }) : null
        ] }),
        c || m ? /* @__PURE__ */ s("div", { className: "flex flex-col min-w-0", children: [
          c ? /* @__PURE__ */ e("div", { className: u, children: t }) : null,
          m ? /* @__PURE__ */ e("p", { className: d(u, "font-semibold"), children: l }) : null
        ] }) : null
      ]
    }
  );
}
export {
  z as ResultBand
};
