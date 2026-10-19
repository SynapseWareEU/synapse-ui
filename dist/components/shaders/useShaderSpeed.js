import { useState as o, useEffect as d } from "react";
function a(e = 1) {
  const [s, c] = o(e);
  return d(() => {
    const t = window.matchMedia("(prefers-reduced-motion: reduce)"), n = () => c(t.matches ? 0 : e);
    return n(), t.addEventListener("change", n), () => t.removeEventListener("change", n);
  }, [e]), s;
}
export {
  a as useShaderSpeed
};
