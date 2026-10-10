import { jsxs as e, jsx as s } from "react/jsx-runtime";
import { cn as d } from "../../utils/cn.js";
import { HH_STROKE as a } from "./shared.js";
import g from "../../vendor/@tabler/icons-react/dist/esm/icons/IconVolume.js";
import b from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
import k from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const w = {
  success: "bg-success-strong",
  danger: "bg-danger-strong"
}, u = "m-0 min-w-0 break-words text-hh-band-line";
function z({
  tone: n = "success",
  title: h,
  signal: o,
  icon: r,
  instruction: l,
  children: t,
  className: f,
  role: p,
  ...x
}) {
  const i = r === void 0 ? n === "success" ? /* @__PURE__ */ s(b, { size: 24, stroke: a, "aria-hidden": !0 }) : /* @__PURE__ */ s(k, { size: 24, stroke: a, "aria-hidden": !0 }) : r, c = t != null && t !== !1, m = l != null && l !== !1;
  return /* @__PURE__ */ e(
    "div",
    {
      role: p ?? (n === "danger" ? "alert" : "status"),
      className: d(
        "flex flex-col justify-center gap-[6px] w-full min-h-[88px] p-su4 m-0",
        "font-sans text-on-action",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold [&_code]:text-inherit",
        w[n],
        f
      ),
      ...x,
      children: [
        /* @__PURE__ */ e("div", { className: "flex items-start gap-su2 min-h-su7 min-w-0", children: [
          i ? /* @__PURE__ */ s("span", { className: "inline-flex items-center shrink-0 h-su7 [&>svg]:block", children: i }) : null,
          /* @__PURE__ */ s("span", { className: "min-w-0 break-words text-hh-primary font-semibold", children: h }),
          o ? /* @__PURE__ */ e("span", { className: "flex items-center gap-[6px] shrink-0 h-su7 ms-auto text-small font-semibold whitespace-nowrap", children: [
            /* @__PURE__ */ s(g, { size: 16, stroke: a, "aria-hidden": !0, className: "shrink-0" }),
            o
          ] }) : null
        ] }),
        c || m ? /* @__PURE__ */ e("div", { className: "flex flex-col min-w-0", children: [
          c ? /* @__PURE__ */ s("div", { className: u, children: t }) : null,
          m ? /* @__PURE__ */ s("p", { className: d(u, "font-semibold"), children: l }) : null
        ] }) : null
      ]
    }
  );
}
export {
  z as ResultBand
};
