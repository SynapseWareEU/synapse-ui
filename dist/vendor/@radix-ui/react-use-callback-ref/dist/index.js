import * as t from "react";
var f = Object.defineProperty, o = (r, e) => f(r, "name", { value: e, configurable: !0 });
function a(r) {
  const e = t.useRef(r);
  return t.useEffect(() => {
    e.current = r;
  }), t.useMemo(() => ((...n) => {
    var u;
    return (u = e.current) == null ? void 0 : u.call(e, ...n);
  }), []);
}
o(a, "useCallbackRef");
export {
  a as useCallbackRef
};
