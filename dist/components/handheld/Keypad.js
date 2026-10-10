import { jsx as i } from "react/jsx-runtime";
import { cn as c } from "../../utils/cn.js";
import { HH_STROKE as p, hhTransition as b } from "./shared.js";
import m from "../../vendor/@tabler/icons-react/dist/esm/icons/IconBackspace.js";
const f = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "backspace",
  "0",
  "00"
];
function D(e, r, a = 9) {
  if (r === "backspace") return e.slice(0, -1);
  const o = (e === "0" ? r : e + r).replace(/^0+(?=\d)/, "");
  return o.length > a ? e : o;
}
const h = (e) => e.preventDefault();
function w({
  onKey: e,
  keys: r = f,
  disabled: a,
  backspaceLabel: n = "Delete last digit",
  className: o,
  "aria-label": d = "Numeric keypad",
  ...l
}) {
  return /* @__PURE__ */ i(
    "div",
    {
      role: "group",
      "aria-label": d,
      className: c(
        "grid grid-cols-3 auto-rows-[var(--su-hh-control-md)] gap-su2 font-sans",
        o
      ),
      ...l,
      children: r.map((t, u) => {
        const s = t === "backspace";
        return /* @__PURE__ */ i(
          "button",
          {
            type: "button",
            disabled: a,
            "aria-label": s ? n : void 0,
            onMouseDown: h,
            onClick: () => e == null ? void 0 : e(t),
            className: c(
              "flex items-center justify-center min-w-0 m-0 p-0 rounded-[var(--su-hh-radius)] bg-fill",
              "text-hh-keypad font-medium su-tabular su-focus-ring cursor-pointer select-none",
              "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
              "[@media(hover:hover)]:enabled:hover:bg-border enabled:active:bg-border-strong",
              "disabled:text-ink-3 disabled:cursor-not-allowed",
              s ? "text-ink-2" : "text-ink",
              b
            ),
            children: s ? /* @__PURE__ */ i(m, { size: 28, stroke: p, "aria-hidden": !0 }) : t
          },
          `${t}-${u}`
        );
      })
    }
  );
}
export {
  f as KEYPAD_DEFAULT_KEYS,
  w as Keypad,
  D as applyKeypadKey
};
