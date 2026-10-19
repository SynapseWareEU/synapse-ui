const a = /^\d+(\.\d*)?$/;
function p(t) {
  if (t === void 0) return;
  let n = String(t);
  return typeof t == "number" && t > 0 && t < 1e-6 && (n = t.toFixed(20).replace(/0+$/, "")), a.test(n) ? n : void 0;
}
function $(t, n) {
  let i = "", e = "", c = !1;
  for (const o of t)
    o >= "0" && o <= "9" ? c ? e += o : i += o : (o === "," || o === ".") && !c && (c = !0);
  return i = i.replace(/^0+(?=\d)/, ""), !c || n === 0 ? i : (n != null && (e = e.slice(0, n)), `${i || "0"}.${e}`);
}
function l(t) {
  const n = t.indexOf(".");
  return n === -1 ? [t, ""] : [t.slice(0, n), t.slice(n + 1)];
}
function r(t, n) {
  const [i, e] = l(t);
  return BigInt((i || "0") + e.padEnd(n, "0"));
}
function g(t, n) {
  const i = t.toString().padStart(n + 1, "0"), e = i.slice(0, i.length - n), c = i.slice(i.length - n).replace(/0+$/, "");
  return c ? `${e}.${c}` : e;
}
const f = (t) => l(t)[1].length;
function h(t, n) {
  const i = Math.max(f(t), f(n)), e = r(t, i), c = r(n, i);
  return e < c ? -1 : e > c ? 1 : 0;
}
function D(t, n, i, e, c) {
  const o = Math.max(
    f(t),
    f(n),
    f(e),
    c === void 0 ? 0 : f(c)
  );
  let s = r(t, o) + BigInt(i) * r(n, o);
  const d = r(e, o);
  if (s < d && (s = d), c !== void 0) {
    const u = r(c, o);
    s > u && (s = u);
  }
  return g(s, o);
}
function m(t, n, i = !1) {
  const [e, c] = l(t), o = i ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e;
  return t.includes(".") ? `${o}${n}${c}` : o;
}
export {
  $ as cleanDecimal,
  h as compareDecimal,
  p as decimalText,
  m as showDecimal,
  D as stepDecimal
};
