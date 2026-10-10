import { jsx as a } from "react/jsx-runtime";
import { useContext as k, useRef as T, useMemo as E, useLayoutEffect as S, createContext as U } from "react";
import { DirectionProvider as z } from "./vendor/@radix-ui/react-direction/dist/index.js";
const y = U(null), p = {}, D = {
  theme: "light",
  density: "desk",
  tokens: p,
  locale: "en-US",
  direction: "ltr"
}, F = (l) => Object.fromEntries(
  Object.entries(l).map(([n, u]) => [
    n.startsWith("--") ? n : `--su-${n}`,
    u
  ])
);
function w({
  children: l,
  theme: n,
  density: u,
  locale: x,
  direction: O,
  tokens: h = p,
  target: v,
  className: b,
  style: g
}) {
  const t = k(y), A = T(null), s = n ?? (t == null ? void 0 : t.theme) ?? "light", f = u ?? (t == null ? void 0 : t.density) ?? "desk", m = u !== void 0 || f === "handheld" ? f : void 0, c = x ?? (t == null ? void 0 : t.locale) ?? "en-US", i = O ?? (t == null ? void 0 : t.direction) ?? "ltr", d = E(() => F(h), [h]), P = E(
    () => ({
      theme: s,
      density: f,
      locale: c,
      direction: i,
      tokens: { ...t == null ? void 0 : t.tokens, ...d }
    }),
    [s, f, c, i, d, t]
  );
  return S(() => {
    const e = v ?? (t ? A.current : document.documentElement);
    if (!e) return;
    const j = ["data-theme", "data-density", "lang", "dir"].map(
      (o) => [o, e.getAttribute(o)]
    );
    e.setAttribute("data-theme", s), m && e.setAttribute("data-density", m), e.setAttribute("lang", c), e.setAttribute("dir", i);
    const C = [];
    for (const [o, r] of Object.entries(d))
      C.push([o, e.style.getPropertyValue(o)]), e.style.setProperty(o, r);
    return () => {
      for (const [o, r] of j)
        r === null ? e.removeAttribute(o) : e.setAttribute(o, r);
      for (const [o, r] of C)
        r ? e.style.setProperty(o, r) : e.style.removeProperty(o);
    };
  }, [s, m, c, i, d, v, !!t]), !t && !b && !g ? /* @__PURE__ */ a(y.Provider, { value: P, children: l }) : /* @__PURE__ */ a(y.Provider, { value: P, children: /* @__PURE__ */ a(z, { dir: i, children: /* @__PURE__ */ a(
    "div",
    {
      ref: A,
      className: b,
      style: { ...d, ...g },
      "data-theme": s,
      "data-density": m,
      lang: c,
      dir: i,
      "data-su-config": "",
      children: l
    }
  ) }) });
}
function G() {
  return k(y) ?? D;
}
export {
  w as ConfigProvider,
  G as useConfig
};
