import { memo as R } from "react";
import { ShaderMount as W } from "../shader-mount.js";
import { colorPropsAreEqual as w } from "../color-props-are-equal.js";
import { defaultPatternSizing as G, ShaderFitOptions as y } from "../../../shaders/dist/shader-sizing.js";
import { DotGridShapes as B, dotGridFragmentShader as D } from "../../../shaders/dist/shaders/dot-grid.js";
import { getShaderColorFromString as a } from "../../../shaders/dist/get-shader-color-from-string.js";
import { jsx as P } from "react/jsx-runtime";
const r = {
  params: {
    ...G,
    colorBack: "#000000",
    colorFill: "#ffffff",
    colorStroke: "#ffaa00",
    size: 2,
    gapX: 32,
    gapY: 32,
    strokeWidth: 0,
    sizeRange: 0,
    opacityRange: 0,
    shape: "circle"
  }
}, M = R(function({
  // Own props
  colorBack: o = r.params.colorBack,
  colorFill: t = r.params.colorFill,
  colorStroke: i = r.params.colorStroke,
  size: e = r.params.size,
  gapX: s = r.params.gapX,
  gapY: p = r.params.gapY,
  strokeWidth: m = r.params.strokeWidth,
  sizeRange: f = r.params.sizeRange,
  opacityRange: l = r.params.opacityRange,
  shape: n = r.params.shape,
  // Sizing props
  fit: u = r.params.fit,
  scale: c = r.params.scale,
  rotation: g = r.params.rotation,
  originX: d = r.params.originX,
  originY: _ = r.params.originY,
  offsetX: h = r.params.offsetX,
  offsetY: S = r.params.offsetY,
  worldWidth: k = r.params.worldWidth,
  worldHeight: z = r.params.worldHeight,
  // Other props
  maxPixelCount: X = 6016 * 3384,
  // Higher max resolution for this shader
  ...Y
}) {
  const F = {
    // Own uniforms
    u_colorBack: a(o),
    u_colorFill: a(t),
    u_colorStroke: a(i),
    u_dotSize: e,
    u_gapX: s,
    u_gapY: p,
    u_strokeWidth: m,
    u_sizeRange: f,
    u_opacityRange: l,
    u_shape: B[n],
    // Sizing uniforms
    u_fit: y[u],
    u_scale: c,
    u_rotation: g,
    u_offsetX: h,
    u_offsetY: S,
    u_originX: d,
    u_originY: _,
    u_worldWidth: k,
    u_worldHeight: z
  };
  return /* @__PURE__ */ P(W, { ...Y, maxPixelCount: X, fragmentShader: D, uniforms: F });
}, w);
export {
  M as DotGrid,
  r as defaultPreset
};
