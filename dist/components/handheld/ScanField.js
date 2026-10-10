import { jsxs as f, jsx as r } from "react/jsx-runtime";
import { forwardRef as A, useId as G, useRef as R, useState as J, useEffect as K } from "react";
import { cn as o } from "../../utils/cn.js";
import { describedBy as P, mergeRefs as U, HH_STROKE as S, HandheldErrorLine as V, hhQuestionClass as W, hhTransition as T, hhFieldBorder as X } from "./shared.js";
import Y from "../../vendor/@tabler/icons-react/dist/esm/icons/IconKeyboard.js";
import Z from "../../vendor/@tabler/icons-react/dist/esm/icons/IconBarcode.js";
const ie = A(function({
  label: h,
  error: s,
  invalid: B,
  icon: m,
  keyboardToggle: F = !0,
  keyboardLabel: H = "Keyboard",
  keyboardOpen: p,
  defaultKeyboardOpen: I = !1,
  onKeyboardOpenChange: i,
  onScan: b,
  className: z,
  id: C,
  disabled: l,
  onKeyDown: a,
  inputMode: j,
  "aria-describedby": $,
  "aria-invalid": x,
  ...d
}, L) {
  const M = G(), n = C ?? `su-scan-${M}`, v = `${n}-error`, g = R(null), c = s != null && s !== !1, k = B ?? (x === !0 || x === "true" || c), [O, Q] = J(I), t = p ?? O, u = R(!1);
  K(() => {
    var e;
    u.current && (u.current = !1, (e = g.current) == null || e.focus());
  }, [t]);
  const _ = () => {
    const e = !t;
    u.current = !0, p === void 0 && Q(e), i == null || i(e);
  }, q = (e) => {
    if (a == null || a(e), !b || e.defaultPrevented || e.key !== "Enter" || e.nativeEvent.isComposing)
      return;
    e.preventDefault();
    const E = e.currentTarget, w = E.value.trim();
    w && (b(w), d.value === void 0 && (E.value = ""));
  }, y = m === void 0 ? /* @__PURE__ */ r(Z, { size: 24, stroke: S, "aria-hidden": !0 }) : m, N = F && !d.readOnly;
  return /* @__PURE__ */ f("div", { className: o("flex flex-col font-sans", z), children: [
    h != null ? /* @__PURE__ */ r("label", { htmlFor: n, className: o(W, "mb-su3"), children: h }) : null,
    /* @__PURE__ */ f(
      "div",
      {
        className: o(
          "flex items-center gap-su3 h-[var(--su-hh-control-lg)] min-w-0",
          "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
          N ? "pl-su4 pr-su2" : "px-su4",
          X({ invalid: k, disabled: l }),
          T
        ),
        children: [
          y ? /* @__PURE__ */ r("span", { className: "inline-flex shrink-0 text-ink-3 [&>svg]:block", children: y }) : null,
          /* @__PURE__ */ r(
            "input",
            {
              ref: U(L, g),
              id: n,
              type: "text",
              autoComplete: "off",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              enterKeyHint: "enter",
              ...d,
              inputMode: j ?? (t ? "text" : "none"),
              disabled: l,
              "aria-invalid": k || void 0,
              "aria-describedby": P($, c && v),
              onKeyDown: q,
              className: o(
                "flex-1 min-w-0 h-full m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                "font-mono text-hh-value font-medium text-inherit disabled:cursor-not-allowed",
                "placeholder:font-sans placeholder:font-normal placeholder:text-hh-hint placeholder:text-ink-3 placeholder:opacity-100"
              )
            }
          ),
          N ? /* @__PURE__ */ f(
            "button",
            {
              type: "button",
              "aria-pressed": t,
              "aria-controls": n,
              disabled: l,
              onClick: _,
              className: o(
                "inline-flex items-center gap-[6px] shrink-0 h-[var(--su-hit-target)] px-su3 m-0",
                "rounded-[var(--su-radius-md)] font-sans text-hh-body font-medium su-focus-ring cursor-pointer",
                "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
                // Pressed: action-subtle + action-text (§4.7). Idle hover is ghost-like: ink text.
                t ? "bg-action-subtle text-action-text [@media(hover:hover)]:enabled:hover:bg-action-subtle-hover" : "bg-fill text-ink-2 [@media(hover:hover)]:enabled:hover:text-ink enabled:active:bg-border",
                "disabled:text-ink-3 disabled:cursor-not-allowed",
                T
              ),
              children: [
                /* @__PURE__ */ r(Y, { size: 20, stroke: S, "aria-hidden": !0, className: "shrink-0" }),
                H
              ]
            }
          ) : null
        ]
      }
    ),
    c ? /* @__PURE__ */ r(V, { id: v, children: s }) : null
  ] });
});
export {
  ie as ScanField
};
