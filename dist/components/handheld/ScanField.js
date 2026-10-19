import { jsx as t, jsxs as x } from "react/jsx-runtime";
import { forwardRef as W, useId as X, useRef as B, useState as Y, useEffect as Z } from "react";
import { cn as i } from "../../utils/cn.js";
import { RingSpinner as ee } from "../general/RingSpinner.js";
import { describedBy as te, mergeRefs as re, HH_STROKE as C, HandheldErrorLine as oe, hhQuestionClass as ne, hhTransition as F, hhFieldBorder as ie } from "./shared.js";
import se from "../../vendor/@tabler/icons-react/dist/esm/icons/IconKeyboard.js";
import le from "../../vendor/@tabler/icons-react/dist/esm/icons/IconBarcode.js";
const xe = W(function({
  label: b,
  labelAs: j,
  hint: l,
  busy: r = !1,
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
  ...s
}, G) {
  const J = X(), o = _ ?? `su-scan-${J}`, N = `${o}-error`, w = `${o}-hint`, E = l != null && l !== !1, H = B(null), f = a != null && a !== !1, R = q ?? (y === !0 || y === "true" || f), [K, P] = Y(O), n = g ?? K, h = B(!1);
  Z(() => {
    var e;
    h.current && (h.current = !1, (e = H.current) == null || e.focus());
  }, [n]);
  const U = () => {
    const e = !n;
    h.current = !0, g === void 0 && P(e), d == null || d(e);
  }, V = (e) => {
    if (u == null || u(e), r && e.key === "Enter") {
      e.preventDefault(), s.value === void 0 && (e.currentTarget.value = "");
      return;
    }
    if (!k || e.defaultPrevented || e.key !== "Enter" || e.nativeEvent.isComposing)
      return;
    e.preventDefault();
    const z = e.currentTarget, I = z.value.trim();
    I && (k(I), s.value === void 0 && (z.value = ""));
  }, S = v === void 0 ? /* @__PURE__ */ t(le, { size: 24, stroke: C, "aria-hidden": !0 }) : v, T = L && !s.readOnly && !r, m = j, p = b != null ? /* @__PURE__ */ t("label", { htmlFor: o, className: i(ne, !m && "mb-su3"), children: b }) : null;
  return /* @__PURE__ */ x("div", { className: i("flex flex-col font-sans", Q), children: [
    p && m ? /* @__PURE__ */ t(m, { className: "m-0 mb-su3", children: p }) : p,
    /* @__PURE__ */ x(
      "div",
      {
        className: i(
          "relative flex items-center gap-su3 h-[var(--su-hh-control-lg)] min-w-0",
          "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
          T ? "pl-su4 pr-su2" : "px-su4",
          ie({ invalid: R, disabled: c }),
          F
        ),
        children: [
          S ? /* @__PURE__ */ t("span", { className: "inline-flex shrink-0 text-ink-3 [&>svg]:block", children: S }) : null,
          /* @__PURE__ */ t(
            "input",
            {
              ref: re(G, H),
              id: o,
              type: "text",
              autoComplete: "off",
              autoCapitalize: "off",
              autoCorrect: "off",
              spellCheck: !1,
              enterKeyHint: "enter",
              ...s,
              inputMode: A ?? (n ? "text" : "none"),
              disabled: c,
              "aria-invalid": R || void 0,
              "aria-busy": r || void 0,
              "aria-describedby": te(D, E && w, f && N),
              onKeyDown: V,
              className: i(
                "flex-1 min-w-0 h-full m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                "font-mono text-hh-value font-medium text-inherit disabled:cursor-not-allowed",
                "placeholder:font-sans placeholder:font-normal placeholder:text-hh-hint placeholder:text-ink-3 placeholder:opacity-100"
              )
            }
          ),
          T ? /* @__PURE__ */ x(
            "button",
            {
              type: "button",
              "aria-pressed": n,
              "aria-controls": o,
              disabled: c,
              onClick: U,
              className: i(
                "inline-flex items-center gap-[6px] shrink-0 h-[var(--su-hit-target)] px-su3 m-0",
                "rounded-[var(--su-radius-md)] font-sans text-hh-body font-medium su-focus-ring cursor-pointer",
                "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
                // Pressed: action-subtle + action-text (§4.7). Idle hover is ghost-like: ink text.
                n ? "bg-action-subtle text-action-text [@media(hover:hover)]:enabled:hover:bg-action-subtle-hover" : "bg-fill text-ink-2 [@media(hover:hover)]:enabled:hover:text-ink enabled:active:bg-border",
                "disabled:text-ink-3 disabled:cursor-not-allowed",
                F
              ),
              children: [
                /* @__PURE__ */ t(se, { size: 20, stroke: C, "aria-hidden": !0, className: "shrink-0" }),
                M
              ]
            }
          ) : null,
          r ? /* @__PURE__ */ t("span", { className: "inline-flex shrink-0 items-center justify-center size-[var(--su-hit-target)] text-action", children: /* @__PURE__ */ t(ee, { size: 24 }) }) : null,
          /* @__PURE__ */ t("span", { role: "status", className: "absolute w-px h-px overflow-hidden [clip-path:inset(50%)]", children: r ? $ : "" })
        ]
      }
    ),
    E ? /* @__PURE__ */ t("p", { id: w, className: "mt-su2 mb-0 font-sans text-hh-body text-ink-2", children: l }) : null,
    f ? /* @__PURE__ */ t(oe, { id: N, children: a }) : null
  ] });
});
export {
  xe as ScanField
};
