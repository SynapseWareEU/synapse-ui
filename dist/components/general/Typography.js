import { jsx as n } from "react/jsx-runtime";
import { forwardRef as g } from "react";
import { cn as w } from "../../utils/cn.js";
const T = {
  largeTitle: "font-sans text-display text-balance",
  // 32/40, −0.01em
  // 24/32, and the phone title below `sm`: 22/28. −0.01em at both sizes (−0.24px, −0.22px).
  title1: "font-sans text-title-phone tracking-[var(--su-tracking-tight)] sm:text-title text-balance",
  title2: "font-sans text-title-phone text-balance",
  // 22/28
  title3: "font-sans text-section text-balance",
  // 16/24
  headline: "font-sans text-empty-title",
  // 15/22
  lede: "font-sans text-body",
  // 14/20, page description
  body: "font-sans text-body",
  callout: "font-sans text-body",
  subhead: "font-sans text-body",
  footnote: "font-sans text-small",
  // 13/18
  caption1: "font-sans text-small",
  caption2: "font-sans text-micro",
  // 12/16
  label: "font-sans text-label-type",
  // 13/18, sentence case
  // Identifier inside prose: 0.9em, colour, weight and leading from the surroundings.
  code: "font-mono text-[0.9em]",
  id: "font-mono text-body",
  // 14/20
  idSecondary: "font-mono text-small"
  // 13/18
}, k = {
  largeTitle: "font-semibold",
  title1: "font-semibold",
  title2: "font-semibold",
  title3: "font-semibold",
  headline: "font-semibold",
  lede: "font-normal",
  body: "font-normal",
  callout: "font-normal",
  subhead: "font-semibold",
  footnote: "font-normal",
  caption1: "font-normal",
  caption2: "font-normal",
  label: "font-medium",
  code: void 0,
  // inherits
  id: "font-medium",
  idSecondary: "font-normal"
}, v = {
  primary: "text-ink",
  secondary: "text-ink-2",
  tertiary: "text-ink-3",
  // Deprecated for text; lifted to ink-2 for prefers-contrast users.
  quaternary: "text-border-strong contrast-more:text-ink-2",
  danger: "text-danger-text",
  success: "text-success-text",
  warning: "text-warning-text",
  info: "text-info-text"
}, b = {
  lede: "secondary",
  label: "secondary",
  idSecondary: "secondary",
  code: null
}, C = {
  largeTitle: "h1",
  title1: "h1",
  title2: "h1",
  title3: "h2",
  headline: "h3",
  lede: "p",
  body: "p",
  callout: "p",
  subhead: "p",
  footnote: "p",
  caption1: "span",
  caption2: "span",
  label: "span",
  code: "code",
  id: "span",
  idSecondary: "span"
}, l = g(
  function({
    variant: o = "body",
    tone: a,
    as: i,
    strong: d = !1,
    lines: e,
    measure: r,
    className: y,
    children: s,
    style: c,
    ...f
  }, h) {
    const m = i ?? C[o] ?? "p", u = d && m === "span" ? "strong" : m, p = e !== void 0 && e > 1, x = a ?? (o in b ? b[o] : "primary");
    return /* @__PURE__ */ n(
      u,
      {
        ref: h,
        className: w(
          "m-0 [overflow-wrap:anywhere]",
          T[o],
          d ? "font-semibold" : k[o],
          x && v[x],
          r && (r === "lede" ? "max-w-[44ch]" : "max-w-[62ch]"),
          e === 1 && "truncate",
          p && "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:var(--su-lines)]",
          y
        ),
        style: p ? { ...c, "--su-lines": e } : c,
        ...f,
        title: f.title ?? (e !== void 0 && typeof s == "string" ? s : void 0),
        children: s
      }
    );
  }
), N = ({
  level: t = 1,
  as: o,
  ...a
}) => /* @__PURE__ */ n(l, { variant: t === 1 ? "title1" : t === 2 ? "title2" : t === 3 ? "title3" : "headline", as: o ?? `h${t}`, ...a }), P = (t) => /* @__PURE__ */ n(l, { variant: "body", as: "span", ...t }), R = (t) => /* @__PURE__ */ n(l, { variant: "body", as: "p", ...t });
export {
  R as Paragraph,
  P as Text,
  N as Title,
  l as Typography
};
