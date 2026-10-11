const a = /^\d+(\.\d*)?$/;
function h(t) {
  if (t === void 0) return;
  const n = String(t);
  return a.test(n) ? n : void 0;
}
function p(t, n) {
  let i = "", c = "", e = !1;
  for (const o of t)
    o >= "0" && o <= "9" ? e ? c += o : i += o : (o === "," || o === ".") && !e && (e = !0);
  return i = i.replace(/^0+(?=\d)/, ""), !e || n === 0 ? i : (n != null && (c = c.slice(0, n)), `${i || "0"}.${c}`);
}
function l(t) {
  const n = t.indexOf(".");
  return n === -1 ? [t, ""] : [t.slice(0, n), t.slice(n + 1)];
}
function r(t, n) {
  const [i, c] = l(t);
  return BigInt((i || "0") + c.padEnd(n, "0"));
}
function g(t, n) {
  const i = t.toString().padStart(n + 1, "0"), c = i.slice(0, i.length - n), e = i.slice(i.length - n).replace(/0+$/, "");
  return e ? `${c}.${e}` : c;
}
const s = (t) => l(t)[1].length;
function $(t, n) {
  const i = Math.max(s(t), s(n)), c = r(t, i), e = r(n, i);
  return c < e ? -1 : c > e ? 1 : 0;
}
function D(t, n, i, c, e) {
  const o = Math.max(
    s(t),
    s(n),
    s(c),
    e === void 0 ? 0 : s(e)
  );
  let f = r(t, o) + BigInt(i) * r(n, o);
  const d = r(c, o);
  if (f < d && (f = d), e !== void 0) {
    const u = r(e, o);
    f > u && (f = u);
  }
  return g(f, o);
}
function m(t, n, i = !1) {
  const [c, e] = l(t), o = i ? c.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : c;
  return t.includes(".") ? `${o}${n}${e}` : o;
}
export {
  p as cleanDecimal,
  $ as compareDecimal,
  h as decimalText,
  m as showDecimal,
  D as stepDecimal
};
