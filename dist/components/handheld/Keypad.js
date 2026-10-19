import { jsx as d } from "react/jsx-runtime";
import { cn as l } from "../../utils/cn.js";
import { HH_STROKE as b, hhTransition as f } from "./shared.js";
import h from "../../vendor/@tabler/icons-react/dist/esm/icons/IconBackspace.js";
const g = [
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
], _ = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "decimal",
  "0",
  "backspace"
];
function w(e, r, s = 9, t) {
  if (r === "backspace") return e.slice(0, -1);
  if (r === "decimal")
    return e.includes(".") || t === 0 ? e : e === "" ? "0." : `${e}.`;
  const a = (e === "0" ? r : e + r).replace(/^0+(?=\d)/, ""), i = a.indexOf(".");
  return i !== -1 && t != null && a.length - i - 1 > t || a.length - (i === -1 ? 0 : 1) > s ? e : a;
}
const x = (e) => e.preventDefault();
function A({
  onKey: e,
  keys: r = g,
  disabled: s,
  backspaceLabel: t = "Delete last digit",
  decimalSeparator: c = ".",
  decimalLabel: a = "Decimal separator",
  className: i,
  "aria-label": p = "Numeric keypad",
  ...m
}) {
  return /* @__PURE__ */ d(
    "div",
    {
      role: "group",
      "aria-label": p,
      className: l(
        "grid grid-cols-3 auto-rows-[var(--su-hh-control-md)] gap-su2 font-sans",
        i
      ),
      ...m,
      children: r.map((o, u) => {
        const n = o === "backspace";
        return /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            disabled: s,
            "aria-label": n ? t : o === "decimal" ? a : void 0,
            "data-key": o,
            onMouseDown: x,
            onClick: () => e == null ? void 0 : e(o),
            className: l(
              "flex items-center justify-center min-w-0 m-0 p-0 rounded-[var(--su-hh-radius)] bg-fill",
              "text-hh-keypad font-medium su-tabular su-focus-ring cursor-pointer select-none",
              "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
              "[@media(hover:hover)]:enabled:hover:bg-border enabled:active:bg-border-strong",
              "disabled:text-ink-3 disabled:cursor-not-allowed",
              n ? "text-ink-2" : "text-ink",
              f
            ),
            children: n ? /* @__PURE__ */ d(h, { size: 28, stroke: b, "aria-hidden": !0 }) : o === "decimal" ? c : o
          },
          `${o}-${u}`
        );
      })
    }
  );
}
export {
  _ as KEYPAD_DECIMAL_KEYS,
  g as KEYPAD_DEFAULT_KEYS,
  A as Keypad,
  w as applyKeypadKey
};
