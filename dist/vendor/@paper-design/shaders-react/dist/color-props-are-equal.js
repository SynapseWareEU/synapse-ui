function u(r, e) {
  var c, o, t;
  if (Object.keys(r).length !== Object.keys(e).length)
    return !1;
  for (const l in r) {
    if (l === "colors") {
      const f = Array.isArray(r.colors), n = Array.isArray(e.colors);
      if (!f || !n) {
        if (Object.is(r.colors, e.colors) === !1)
          return !1;
        continue;
      }
      if (((c = r.colors) == null ? void 0 : c.length) !== ((o = e.colors) == null ? void 0 : o.length) || !((t = r.colors) != null && t.every((i, a) => {
        var s;
        return i === ((s = e.colors) == null ? void 0 : s[a]);
      })))
        return !1;
      continue;
    }
    if (Object.is(r[l], e[l]) === !1)
      return !1;
  }
  return !0;
}
export {
  u as colorPropsAreEqual
};
