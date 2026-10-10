import { memo as N } from "react";
import { ShaderMount as w } from "../shader-mount.js";
import { colorPropsAreEqual as M } from "../color-props-are-equal.js";
import { defaultPatternSizing as X, ShaderFitOptions as Y } from "../../../shaders/dist/shader-sizing.js";
import { neuroNoiseFragmentShader as b } from "../../../shaders/dist/shaders/neuro-noise.js";
import { getShaderColorFromString as o } from "../../../shaders/dist/get-shader-color-from-string.js";
import { jsx as k } from "react/jsx-runtime";
const r = {
  params: {
    ...X,
    speed: 1,
    frame: 0,
    colorFront: "#ffffff",
    colorMid: "#47a6ff",
    colorBack: "#000000",
    brightness: 0.05,
    contrast: 0.3
  }
}, A = N(function({
  // Own props
  speed: a = r.params.speed,
  frame: t = r.params.frame,
  colorFront: s = r.params.colorFront,
  colorMid: e = r.params.colorMid,
  colorBack: m = r.params.colorBack,
  brightness: i = r.params.brightness,
  contrast: f = r.params.contrast,
  // Sizing props
  fit: n = r.params.fit,
  scale: p = r.params.scale,
  rotation: u = r.params.rotation,
  originX: c = r.params.originX,
  originY: l = r.params.originY,
  offsetX: d = r.params.offsetX,
  offsetY: g = r.params.offsetY,
  worldWidth: _ = r.params.worldWidth,
  worldHeight: h = r.params.worldHeight,
  ...S
}) {
  const F = {
    // Own uniforms
    u_colorFront: o(s),
    u_colorMid: o(e),
    u_colorBack: o(m),
    u_brightness: i,
    u_contrast: f,
    // Sizing uniforms
    u_fit: Y[n],
    u_scale: p,
    u_rotation: u,
    u_offsetX: d,
    u_offsetY: g,
    u_originX: c,
    u_originY: l,
    u_worldWidth: _,
    u_worldHeight: h
  };
  return /* @__PURE__ */ k(w, { ...S, speed: a, frame: t, fragmentShader: b, uniforms: F });
}, M);
export {
  A as NeuroNoise,
  r as defaultPreset
};
