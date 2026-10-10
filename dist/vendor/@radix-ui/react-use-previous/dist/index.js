import * as u from "react";
var t = Object.defineProperty, n = (r, e) => t(r, "name", { value: e, configurable: !0 });
function o(r) {
  const e = u.useRef({ value: r, previous: r });
  return u.useMemo(() => (e.current.value !== r && (e.current.previous = e.current.value, e.current.value = r), e.current.previous), [r]);
}
n(o, "usePrevious");
export {
  o as usePrevious
};
