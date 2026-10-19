import * as n from "react";
import { useLayoutEffect as d } from "../../react-use-layout-effect/dist/index.js";
var c = Object.defineProperty, z = (r, e) => c(r, "name", { value: e, configurable: !0 });
function h(r) {
  const [e, i] = n.useState(void 0);
  return d(() => {
    if (r) {
      i({ width: r.offsetWidth, height: r.offsetHeight });
      const a = new ResizeObserver((o) => {
        if (!Array.isArray(o) || !o.length)
          return;
        const u = o[0];
        let t, s;
        if ("borderBoxSize" in u) {
          const f = u.borderBoxSize, b = Array.isArray(f) ? f[0] : f;
          t = b.inlineSize, s = b.blockSize;
        } else
          t = r.offsetWidth, s = r.offsetHeight;
        i({ width: t, height: s });
      });
      return a.observe(r, { box: "border-box" }), () => a.unobserve(r);
    } else
      i(void 0);
  }, [r]), e;
}
z(h, "useSize");
export {
  h as useSize
};
