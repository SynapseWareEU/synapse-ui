import { forwardRef as b, createElement as e } from "react";
import g from "./defaultAttributes.js";
/**
 * @license @tabler/icons-react v3.46.0 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */
const C = (s, m, n, i) => {
  const r = b(
    ({ color: c = "currentColor", size: o = 24, stroke: l = 2, title: a, className: p, children: t, ...f }, u) => e(
      "svg",
      {
        ref: u,
        ...g[s],
        width: o,
        height: o,
        className: ["tabler-icon", `tabler-icon-${m}`, p].join(" "),
        strokeWidth: l,
        stroke: c,
        ...f
      },
      [
        a && e("title", { key: "svg-title" }, a),
        ...i.map(([d, y]) => e(d, y)),
        ...Array.isArray(t) ? t : [t]
      ]
    )
  );
  return r.displayName = `${n}`, r;
};
export {
  C as default
};
