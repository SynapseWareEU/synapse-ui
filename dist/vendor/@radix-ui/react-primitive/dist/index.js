import * as c from "react";
import * as f from "react-dom";
import { createSlot as p } from "../../react-slot/dist/index.js";
import { jsx as u } from "react/jsx-runtime";
var v = Object.defineProperty, d = (i, t) => v(i, "name", { value: t, configurable: !0 }), l = [
  "a",
  "button",
  "div",
  "form",
  "h2",
  "h3",
  "img",
  "input",
  "label",
  "li",
  "nav",
  "ol",
  "p",
  "select",
  "span",
  "svg",
  "ul"
], w = l.reduce((i, t) => {
  const e = p(`Primitive.${t}`), r = c.forwardRef((o, a) => {
    const { asChild: m, ...n } = o, s = m ? e : t;
    return typeof window < "u" && (window[Symbol.for("radix-ui")] = !0), /* @__PURE__ */ u(s, { ...n, ref: a });
  });
  return r.displayName = `Primitive.${t}`, { ...i, [t]: r };
}, {});
function h(i, t) {
  i && f.flushSync(() => i.dispatchEvent(t));
}
d(h, "dispatchDiscreteCustomEvent");
export {
  w as Primitive,
  h as dispatchDiscreteCustomEvent
};
