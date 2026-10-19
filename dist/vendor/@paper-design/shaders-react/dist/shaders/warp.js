import { memo as I } from "react";
import { ShaderMount as P } from "../shader-mount.js";
import { colorPropsAreEqual as X } from "../color-props-are-equal.js";
import { defaultPatternSizing as Y, ShaderFitOptions as F } from "../../../shaders/dist/shader-sizing.js";
import { WarpPatterns as C, warpFragmentShader as H } from "../../../shaders/dist/shaders/warp.js";
import { getShaderColorFromString as T } from "../../../shaders/dist/get-shader-color-from-string.js";
import { getShaderNoiseTexture as j } from "../../../shaders/dist/get-shader-noise-texture.js";
import { jsx as k } from "react/jsx-runtime";
const r = {
  params: {
    ...Y,
    rotation: 0,
    speed: 1,
    frame: 0,
    colors: ["#121212", "#9470ff", "#121212", "#8838ff"],
    proportion: 0.45,
    softness: 1,
    distortion: 0.25,
    swirl: 0.8,
    swirlIterations: 10,
    shapeScale: 0.1,
    shape: "checks"
  }
}, y = I(function({
  // Own props
  speed: a = r.params.speed,
  frame: s = r.params.frame,
  colors: o = r.params.colors,
  proportion: t = r.params.proportion,
  softness: e = r.params.softness,
  distortion: i = r.params.distortion,
  swirl: p = r.params.swirl,
  swirlIterations: m = r.params.swirlIterations,
  shapeScale: n = r.params.shapeScale,
  shape: f = r.params.shape,
  // Sizing props
  fit: u = r.params.fit,
  scale: l = r.params.scale,
  rotation: d = r.params.rotation,
  originX: _ = r.params.originX,
  originY: h = r.params.originY,
  offsetX: c = r.params.offsetX,
  offsetY: g = r.params.offsetY,
  worldWidth: w = r.params.worldWidth,
  worldHeight: S = r.params.worldHeight,
  ...W
}) {
  const x = {
    // Own uniforms
    u_colors: o.map(T),
    u_colorsCount: o.length,
    u_proportion: t,
    u_softness: e,
    u_distortion: i,
    u_swirl: p,
    u_swirlIterations: m,
    u_shapeScale: n,
    u_shape: C[f],
    u_noiseTexture: j(),
    // Sizing uniforms
    u_scale: l,
    u_rotation: d,
    u_fit: F[u],
    u_offsetX: c,
    u_offsetY: g,
    u_originX: _,
    u_originY: h,
    u_worldWidth: w,
    u_worldHeight: S
  };
  return /* @__PURE__ */ k(P, { ...W, speed: a, frame: s, fragmentShader: H, uniforms: x });
}, X);
export {
  y as Warp,
  r as defaultPreset
};
