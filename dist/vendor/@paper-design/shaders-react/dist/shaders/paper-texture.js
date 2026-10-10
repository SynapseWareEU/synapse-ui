import { memo as O } from "react";
import { ShaderMount as W } from "../shader-mount.js";
import { colorPropsAreEqual as q } from "../color-props-are-equal.js";
import { defaultObjectSizing as y, ShaderFitOptions as A } from "../../../shaders/dist/shader-sizing.js";
import { paperTextureFragmentShader as E } from "../../../shaders/dist/shaders/paper-texture.js";
import { getShaderColorFromString as t } from "../../../shaders/dist/get-shader-color-from-string.js";
import { getShaderNoiseTexture as I } from "../../../shaders/dist/get-shader-noise-texture.js";
import { jsx as M } from "react/jsx-runtime";
const r = {
  params: {
    ...y,
    fit: "cover",
    scale: 0.6,
    speed: 0,
    frame: 0,
    colorFront: "#9fadbc",
    colorBack: "#ffffff",
    contrast: 0.3,
    roughness: 0.4,
    fiber: 0.3,
    fiberSize: 0.2,
    crumples: 0.3,
    crumpleSize: 0.35,
    folds: 0.65,
    foldCount: 5,
    fade: 0,
    drops: 0.2,
    seed: 5.8
  }
}, V = O(function({
  // Own props
  speed: m = r.params.speed,
  frame: i = r.params.frame,
  colorFront: p = r.params.colorFront,
  colorBack: f = r.params.colorBack,
  image: u = "",
  contrast: d = r.params.contrast,
  roughness: n = r.params.roughness,
  fiber: c = r.params.fiber,
  crumples: l = r.params.crumples,
  folds: _ = r.params.folds,
  drops: g = r.params.drops,
  seed: h = r.params.seed,
  // Reworked props
  fiberScale: o,
  fiberSize: S = o === void 0 ? r.params.fiberSize : 0.2 / o,
  crumplesScale: e,
  crumpleSize: x = e === void 0 ? r.params.crumpleSize : 0.2 / e,
  blur: a,
  fade: z = a === void 0 ? r.params.fade : a,
  foldsNumber: s,
  foldCount: w = s === void 0 ? r.params.foldCount : s,
  // Sizing props
  fit: F = r.params.fit,
  scale: T = r.params.scale,
  rotation: b = r.params.rotation,
  originX: v = r.params.originX,
  originY: C = r.params.originY,
  offsetX: P = r.params.offsetX,
  offsetY: X = r.params.offsetY,
  worldWidth: Y = r.params.worldWidth,
  worldHeight: k = r.params.worldHeight,
  ...B
}) {
  const j = typeof window < "u" && { u_noiseTexture: I() }, H = {
    // Own uniforms
    u_image: u,
    u_colorFront: t(p),
    u_colorBack: t(f),
    u_contrast: d,
    u_roughness: n,
    u_fiber: c,
    u_fiberSize: S,
    u_crumples: l,
    u_crumpleSize: x,
    u_foldCount: w,
    u_folds: _,
    u_fade: z,
    u_drops: g,
    u_seed: h,
    ...j,
    // Sizing uniforms
    u_fit: A[F],
    u_scale: T,
    u_rotation: b,
    u_offsetX: P,
    u_offsetY: X,
    u_originX: v,
    u_originY: C,
    u_worldWidth: Y,
    u_worldHeight: k
  };
  return /* @__PURE__ */ M(
    W,
    {
      ...B,
      speed: m,
      frame: i,
      fragmentShader: E,
      mipmaps: ["u_image"],
      uniforms: H
    }
  );
}, q);
export {
  V as PaperTexture,
  r as defaultPreset
};
