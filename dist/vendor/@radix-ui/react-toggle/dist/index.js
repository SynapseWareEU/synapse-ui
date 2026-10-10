import * as l from "react";
import { composeEventHandlers as f } from "../../primitive/dist/index.js";
import { useControllableState as m } from "../../react-use-controllable-state/dist/index.js";
import { Primitive as p } from "../../react-primitive/dist/index.js";
import { jsx as g } from "react/jsx-runtime";
var c = Object.defineProperty, u = (o, e) => c(o, "name", { value: e, configurable: !0 }), b = "Toggle", _ = /* @__PURE__ */ l.forwardRef(
  /* @__PURE__ */ u(function(e, t) {
    const { pressed: a, defaultPressed: s, onPressedChange: d, ...n } = e, [r, i] = m({
      prop: a,
      onChange: d,
      defaultProp: s ?? !1,
      caller: b
    });
    return /* @__PURE__ */ g(
      p.button,
      {
        type: "button",
        "aria-pressed": r,
        "data-state": r ? "on" : "off",
        "data-disabled": e.disabled ? "" : void 0,
        ...n,
        ref: t,
        onClick: f(e.onClick, () => {
          e.disabled || i(!r);
        })
      }
    );
  }, "Toggle")
);
export {
  _ as Toggle
};
