import * as c from "react";
function f(r) {
  const u = c.useRef(void 0), l = c.useCallback((t) => {
    const i = r.map((n) => {
      if (n != null) {
        if (typeof n == "function") {
          const e = n, o = e(t);
          return typeof o == "function" ? o : () => {
            e(null);
          };
        }
        return n.current = t, () => {
          n.current = null;
        };
      }
    });
    return () => {
      i.forEach((n) => n == null ? void 0 : n());
    };
  }, r);
  return c.useMemo(() => r.every((t) => t == null) ? null : (t) => {
    u.current && (u.current(), u.current = void 0), t != null && (u.current = l(t));
  }, r);
}
export {
  f as useMergeRefs
};
