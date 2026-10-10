function R(s) {
  if (Array.isArray(s))
    return s.length === 4 ? s : s.length === 3 ? [...s, 1] : f;
  if (typeof s != "string")
    return f;
  let t, r, a, i = 1;
  if (s.startsWith("#"))
    [t, r, a, i] = v(s);
  else if (s.startsWith("rgb")) {
    const n = y(s);
    if (n === null) return f;
    [t, r, a, i] = n;
  } else if (s.startsWith("hsl")) {
    const n = D(s);
    if (n === null) return f;
    [t, r, a, i] = F(n);
  } else
    return console.error("Unsupported color format", s), f;
  return [o(t, 0, 1), o(r, 0, 1), o(a, 0, 1), o(i, 0, 1)];
}
function v(s) {
  if (s = s.replace(/^#/, ""), (s.length === 3 || s.length === 4) && (s = s.split("").map((n) => n + n).join("")), s.length === 6 && (s = s + "ff"), !/^[0-9a-f]{8}$/i.test(s))
    return console.warn("Invalid hex color"), f;
  const t = parseInt(s.slice(0, 2), 16) / 255, r = parseInt(s.slice(2, 4), 16) / 255, a = parseInt(s.slice(4, 6), 16) / 255, i = parseInt(s.slice(6, 8), 16) / 255;
  return [t, r, a, i];
}
function y(s) {
  const t = s.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  return t ? [
    parseInt(t[1] ?? "0") / 255,
    parseInt(t[2] ?? "0") / 255,
    parseInt(t[3] ?? "0") / 255,
    t[4] === void 0 ? 1 : parseFloat(t[4])
  ] : null;
}
function D(s) {
  const t = s.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);
  return t ? [
    parseInt(t[1] ?? "0"),
    parseInt(t[2] ?? "0"),
    parseInt(t[3] ?? "0"),
    t[4] === void 0 ? 1 : parseFloat(t[4])
  ] : null;
}
function F(s) {
  const [t, r, a, i] = s, n = t / 360, p = r / 100, l = a / 100;
  let m, b, d;
  if (r === 0)
    m = b = d = l;
  else {
    const I = (u, g, e) => (e < 0 && (e += 1), e > 1 && (e -= 1), e < 0.16666666666666666 ? u + (g - u) * 6 * e : e < 0.5 ? g : e < 0.6666666666666666 ? u + (g - u) * (0.6666666666666666 - e) * 6 : u), c = l < 0.5 ? l * (1 + p) : l + p - l * p, h = 2 * l - c;
    m = I(h, c, n + 1 / 3), b = I(h, c, n), d = I(h, c, n - 1 / 3);
  }
  return [m, b, d, i];
}
const o = (s, t, r) => Math.min(Math.max(s, t), r), f = [0.5, 0.5, 0.5, 1];
export {
  o as clamp,
  R as getShaderColorFromString
};
