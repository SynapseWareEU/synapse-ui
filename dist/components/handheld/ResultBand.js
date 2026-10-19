import { jsxs as e, jsx as s } from "react/jsx-runtime";
import { cn as d } from "../../utils/cn.js";
import { HH_STROKE as t } from "./shared.js";
import w from "../../vendor/@tabler/icons-react/dist/esm/icons/IconVolume.js";
import g from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCheck.js";
import b from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
const N = {
  success: "bg-success-strong",
  danger: "bg-danger-strong"
}, f = "m-0 min-w-0 break-words text-hh-band-line";
function z({
  tone: l = "success",
  title: u,
  signal: i,
  icon: r,
  instruction: n,
  children: a,
  className: p,
  role: h,
  ...x
}) {
  const o = r === void 0 ? l === "success" ? /* @__PURE__ */ s(g, { size: 24, stroke: t, "aria-hidden": !0 }) : /* @__PURE__ */ s(b, { size: 24, stroke: t, "aria-hidden": !0 }) : r, m = a != null && a !== !1, c = n != null && n !== !1;
  return /* @__PURE__ */ e(
    "div",
    {
      role: h ?? (l === "danger" ? "alert" : "status"),
      className: d(
        "flex flex-col justify-center gap-[6px] w-full min-h-[88px] p-su4 m-0",
        "font-sans text-on-action",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold [&_code]:text-inherit",
        N[l],
        p
      ),
      ...x,
      children: [
        /* @__PURE__ */ e("div", { className: "flex flex-wrap items-start gap-x-su2 min-h-su7 min-w-0", children: [
          /* @__PURE__ */ e("span", { className: "flex items-start gap-su2 min-w-0 max-w-full", children: [
            o ? /* @__PURE__ */ s("span", { className: "inline-flex items-center shrink-0 h-su7 [&>svg]:block", children: o }) : null,
            /* @__PURE__ */ s("span", { className: "min-w-0 break-words text-hh-primary font-semibold", children: u })
          ] }),
          i ? /* @__PURE__ */ e("span", { className: "flex items-start gap-[6px] min-w-0 max-w-full ms-auto text-small font-semibold", children: [
            /* @__PURE__ */ s("span", { className: "inline-flex items-center shrink-0 h-su7", children: /* @__PURE__ */ s(w, { size: 16, stroke: t, "aria-hidden": !0 }) }),
            /* @__PURE__ */ s("span", { className: "min-w-0 break-words py-[5px]", children: i })
          ] }) : null
        ] }),
        m || c ? /* @__PURE__ */ e("div", { className: "flex flex-col min-w-0", children: [
          m ? /* @__PURE__ */ s("div", { className: f, children: a }) : null,
          c ? /* @__PURE__ */ s("p", { className: d(f, "font-semibold"), children: n }) : null
        ] }) : null
      ]
    }
  );
}
export {
  z as ResultBand
};
