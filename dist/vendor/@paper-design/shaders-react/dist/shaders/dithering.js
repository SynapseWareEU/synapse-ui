import { memo as y } from "react";
import { ShaderMount as D } from "../shader-mount.js";
import { defaultPatternSizing as X, ShaderFitOptions as Y } from "../../../shaders/dist/shader-sizing.js";
import { DitheringTypes as k, DitheringShapes as x, ditheringFragmentShader as z } from "../../../shaders/dist/shaders/dithering.js";
import { getShaderColorFromString as o } from "../../../shaders/dist/get-shader-color-from-string.js";
import { jsx as B } from "react/jsx-runtime";
const r = {
  params: {
    ...X,
    speed: 1,
    frame: 0,
    scale: 0.6,
    colorBack: "#000000",
    colorFront: "#00b2ff",
    shape: "sphere",
    type: "4x4",
    size: 2
  }
}, I = y(function({
  // Own props
  speed: t = r.params.speed,
  frame: e = r.params.frame,
  colorBack: i = r.params.colorBack,
  colorFront: s = r.params.colorFront,
  shape: m = r.params.shape,
  type: p = r.params.type,
  pxSize: a,
  size: n = a === void 0 ? r.params.size : a,
  // Sizing props
  fit: f = r.params.fit,
  scale: u = r.params.scale,
  rotation: h = r.params.rotation,
  originX: d = r.params.originX,
  originY: l = r.params.originY,
  offsetX: c = r.params.offsetX,
  offsetY: g = r.params.offsetY,
  worldWidth: _ = r.params.worldWidth,
  worldHeight: S = r.params.worldHeight,
  ...F
}) {
  const w = {
    // Own uniforms
    u_colorBack: o(i),
    u_colorFront: o(s),
    u_shape: x[m],
    u_type: k[p],
    u_pxSize: n,
    // Sizing uniforms
    u_fit: Y[f],
    u_scale: u,
    u_rotation: h,
    u_offsetX: c,
    u_offsetY: g,
    u_originX: d,
    u_originY: l,
    u_worldWidth: _,
    u_worldHeight: S
  };
  return /* @__PURE__ */ B(D, { ...F, speed: t, frame: e, fragmentShader: z, uniforms: w });
});
export {
  I as Dithering,
  r as defaultPreset
};
