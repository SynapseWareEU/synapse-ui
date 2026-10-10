import { jsx as l } from "react/jsx-runtime";
import { cn as e } from "../../utils/cn.js";
import { space as p } from "../../utils/space.js";
const d = 24, n = (o) => typeof o == "number" ? p(o) : o;
function m({ gutter: o = 0, className: s, style: a, ...c }) {
  const [r, i] = Array.isArray(o) ? o : [o, o];
  return /* @__PURE__ */ l(
    "div",
    {
      className: e("flex flex-wrap", s),
      style: {
        // Always written — even "0px" — so a nested Row resets the
        // inherited gutter instead of doubling it.
        "--su-grid-pad-x": r ? `calc(${n(r)} / 2)` : "0px",
        marginInline: r ? `calc(${n(r)} / -2)` : void 0,
        // Vertical gutter is row-gap, not padding: it applies only BETWEEN
        // wrapped lines, so the Row is never taller than its content.
        rowGap: i ? n(i) : void 0,
        ...a
      },
      ...c
    }
  );
}
function x({
  span: o = d,
  offset: s = 0,
  className: a,
  style: c,
  ...r
}) {
  return /* @__PURE__ */ l(
    "div",
    {
      className: e(
        "box-border min-w-0 grow-0 shrink-0 px-[var(--su-grid-pad-x,0)]",
        "basis-[calc(var(--su-col-span)/24*100%)] max-w-[calc(var(--su-col-span)/24*100%)]",
        s > 0 && "ms-[calc(var(--su-col-offset)/24*100%)]",
        o === 0 && "hidden",
        a
      ),
      style: {
        "--su-col-span": o,
        "--su-col-offset": s || void 0,
        ...c
      },
      ...r
    }
  );
}
const v = { Row: m, Col: x };
export {
  x as Col,
  v as Grid,
  m as Row
};
