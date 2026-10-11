import { jsx as t, jsxs as i } from "react/jsx-runtime";
import { forwardRef as W, useId as X, useRef as B, useState as Y, useEffect as Z } from "react";
import { cn as o } from "../../utils/cn.js";
import { RingSpinner as ee } from "../general/RingSpinner.js";
import { describedBy as te, mergeRefs as re, HH_STROKE as C, HandheldErrorLine as ne, hhQuestionClass as oe, hhTransition as F, hhFieldBorder as se } from "./shared.js";
import ie from "../../vendor/@tabler/icons-react/dist/esm/icons/IconKeyboard.js";
import le from "../../vendor/@tabler/icons-react/dist/esm/icons/IconBarcode.js";
const be = W(function({
  label: x,
  labelAs: j,
  hint: l,
  busy: s = !1,
  busyLabel: $ = "Checking",
  error: a,
  invalid: q,
  icon: v,
  keyboardToggle: L = !0,
  keyboardLabel: M = "Keyboard",
  keyboardOpen: g,
  defaultKeyboardOpen: O = !1,
  onKeyboardOpenChange: d,
  onScan: k,
  className: Q,
  id: _,
  disabled: c,
  onKeyDown: u,
  inputMode: A,
  "aria-describedby": D,
  "aria-invalid": y,
  ...h
}, G) {
  const J = X(), r = _ ?? `su-scan-${J}`, N = `${r}-error`, w = `${r}-hint`, E = l != null && l !== !1, H = B(null), f = a != null && a !== !1, R = q ?? (y === !0 || y === "true" || f), [K, P] = Y(O), n = g ?? K, m = B(!1);
  Z(() => {
    var e;
    m.current && (m.current = !1, (e = H.current) == null || e.focus());
  }, [n]);
  const U = () => {
    const e = !n;
    m.current = !0, g === void 0 && P(e), d == null || d(e);
  }, V = (e) => {
    if (u == null || u(e), s && e.key === "Enter") {
      e.preventDefault();
      return;
    }
    if (!k || e.defaultPrevented || e.key !== "Enter" || e.nativeEvent.isComposing)
      return;
    e.preventDefault();
    const I = e.currentTarget, T = I.value.trim();
    T && (k(T), h.value === void 0 && (I.value = ""));
  }, S = v === void 0 ? /* @__PURE__ */ t(le, { size: 24, stroke: C, "aria-hidden": !0 }) : v, z = L && !h.readOnly && !s, p = j, b = x != null ? /* @__PURE__ */ t("label", { htmlFor: r, className: o(oe, !p && "mb-su3"), children: x }) : null;
  return /* @__PURE__ */ i("div", { className: o("flex flex-col font-sans", Q), children: [
    b && p ? /* @__PURE__ */ t(p, { className: "m-0 mb-su3", children: b }) : b,
    /* @__PURE__ */ i(
      "div",
      {
        className: o(
          "flex items-center gap-su3 h-[var(--su-hh-control-lg)] min-w-0",
          "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
          z ? "pl-su4 pr-su2" : "px-su4",
          se({ invalid: R, disabled: c }),
          F
        ),
        children: [
          S ? /* @__PURE__ */ t("span", { className: "inline-flex shrink-0 text-ink-3 [&>svg]:block", children: S }) : null,
          /* @__PURE__ */ t(
            "input",
            {
              ref: re(G, H),
              id: r,
              type: "text",
              autoComplete: "off",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              enterKeyHint: "enter",
              ...h,
              inputMode: A ?? (n ? "text" : "none"),
              disabled: c,
              "aria-invalid": R || void 0,
              "aria-busy": s || void 0,
              "aria-describedby": te(D, E && w, f && N),
              onKeyDown: V,
              className: o(
                "flex-1 min-w-0 h-full m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                "font-mono text-hh-value font-medium text-inherit disabled:cursor-not-allowed",
                "placeholder:font-sans placeholder:font-normal placeholder:text-hh-hint placeholder:text-ink-3 placeholder:opacity-100"
              )
            }
          ),
          z ? /* @__PURE__ */ i(
            "button",
            {
              type: "button",
              "aria-pressed": n,
              "aria-controls": r,
              disabled: c,
              onClick: U,
              className: o(
                "inline-flex items-center gap-[6px] shrink-0 h-[var(--su-hit-target)] px-su3 m-0",
                "rounded-[var(--su-radius-md)] font-sans text-hh-body font-medium su-focus-ring cursor-pointer",
                "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
                // Pressed: action-subtle + action-text (§4.7). Idle hover is ghost-like: ink text.
                n ? "bg-action-subtle text-action-text [@media(hover:hover)]:enabled:hover:bg-action-subtle-hover" : "bg-fill text-ink-2 [@media(hover:hover)]:enabled:hover:text-ink enabled:active:bg-border",
                "disabled:text-ink-3 disabled:cursor-not-allowed",
                F
              ),
              children: [
                /* @__PURE__ */ t(ie, { size: 20, stroke: C, "aria-hidden": !0, className: "shrink-0" }),
                M
              ]
            }
          ) : null,
          s ? /* @__PURE__ */ i("span", { role: "status", className: "relative inline-flex shrink-0 items-center justify-center size-[var(--su-hit-target)] text-action", children: [
            /* @__PURE__ */ t(ee, { size: 24 }),
            /* @__PURE__ */ t("span", { className: "absolute w-px h-px overflow-hidden [clip-path:inset(50%)]", children: $ })
          ] }) : null
        ]
      }
    ),
    E ? /* @__PURE__ */ t("p", { id: w, className: "mt-su2 mb-0 font-sans text-hh-body text-ink-2", children: l }) : null,
    f ? /* @__PURE__ */ t(ne, { id: N, children: a }) : null
  ] });
});
export {
  be as ScanField
};
