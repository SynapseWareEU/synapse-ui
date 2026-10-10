import { useEffect as i } from "react";
function c(t, e, n = !0) {
  i(() => {
    if (!n) return;
    const r = (o) => {
      t.current && !t.current.contains(o.target) && e();
    };
    return document.addEventListener("pointerdown", r), () => document.removeEventListener("pointerdown", r);
  }, [t, e, n]);
}
export {
  c as useOutsideClick
};
