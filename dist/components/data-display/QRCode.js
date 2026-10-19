import { jsxs as a, jsx as l } from "react/jsx-runtime";
import { useMemo as v } from "react";
import y from "../../vendor/qrcode-generator/dist/qrcode.js";
import { cn as g } from "../../utils/cn.js";
function M({
  value: c,
  size: o = 160,
  // The code itself stays dark-on-light in both appearances for scan reliability; only its
  // frame follows the theme. The defaults are the light-appearance --su-ink / --su-surface
  // written out, because the tokens flip in dark mode; override via fg/bg.
  fg: b = "#111418",
  bg: w = "#ffffff",
  caption: i,
  className: d,
  style: f,
  ...m
}) {
  const h = v(() => {
    try {
      const r = y(0, "M");
      r.addData(Array.from(new TextEncoder().encode(c), (e) => String.fromCharCode(e)).join(""), "Byte"), r.make();
      const s = r.getModuleCount(), x = [];
      for (let e = 0; e < s; e++)
        for (let n = 0; n < s; n++)
          r.isDark(e, n) && x.push(`M${n + 4},${e + 4}h1v1h-1z`);
      return { modules: s + 8, path: x.join("") };
    } catch {
      return null;
    }
  }, [c]), u = "inline-flex flex-col items-center gap-su2 p-su2 rounded-su-surface border border-solid border-border bg-surface", p = i != null ? /* @__PURE__ */ l(
    "span",
    {
      className: "block text-center font-mono text-small text-ink-2 [overflow-wrap:anywhere]",
      style: { maxWidth: o },
      children: i
    }
  ) : null;
  if (!h)
    return /* @__PURE__ */ a("div", { className: g(u, d), style: f, ...m, children: [
      /* @__PURE__ */ l(
        "div",
        {
          className: "flex items-center justify-center p-su2 text-center font-sans text-small text-ink-2",
          style: { width: o, height: o },
          role: "img",
          "aria-label": "QR code unavailable: value too long to encode",
          children: "Value too long to encode"
        }
      ),
      p
    ] });
  const { modules: t, path: k } = h;
  return /* @__PURE__ */ a("div", { className: g(u, d), style: f, ...m, children: [
    /* @__PURE__ */ a(
      "svg",
      {
        width: o,
        height: o,
        viewBox: `0 0 ${t} ${t}`,
        shapeRendering: "crispEdges",
        role: "img",
        "aria-label": `QR code for ${c}`,
        className: "block shrink-0",
        children: [
          /* @__PURE__ */ l("rect", { width: t, height: t, fill: w }),
          /* @__PURE__ */ l("path", { d: k, fill: b })
        ]
      }
    ),
    p
  ] });
}
export {
  M as QRCode
};
