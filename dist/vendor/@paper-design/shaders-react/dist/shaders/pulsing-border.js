import { memo as j } from "react";
import { ShaderMount as A } from "../shader-mount.js";
import { colorPropsAreEqual as C } from "../color-props-are-equal.js";
import { defaultObjectSizing as H, ShaderFitOptions as O } from "../../../shaders/dist/shader-sizing.js";
import { PulsingBorderAspectRatios as W, pulsingBorderFragmentShader as q } from "../../../shaders/dist/shaders/pulsing-border.js";
import { getShaderColorFromString as a } from "../../../shaders/dist/get-shader-color-from-string.js";
import { getShaderNoiseTexture as E } from "../../../shaders/dist/get-shader-noise-texture.js";
import { jsx as I } from "react/jsx-runtime";
const o = {
  params: {
    ...H,
    speed: 1,
    frame: 0,
    scale: 0.6,
    colorBack: "#000000",
    colors: ["#0dc1fd", "#d915ef", "#ff3f2ecc"],
    roundness: 0.25,
    thickness: 0.1,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    aspectRatio: "auto",
    softness: 0.75,
    intensity: 0.2,
    bloom: 0.25,
    spots: 5,
    spotSize: 0.5,
    pulse: 0.25,
    smoke: 0.3,
    smokeSize: 0.6
  }
}, V = j(function({
  // Own props
  speed: t = o.params.speed,
  frame: e = o.params.frame,
  colors: s = o.params.colors,
  colorBack: m = o.params.colorBack,
  roundness: i = o.params.roundness,
  thickness: p = o.params.thickness,
  aspectRatio: n = o.params.aspectRatio,
  softness: u = o.params.softness,
  bloom: f = o.params.bloom,
  intensity: l = o.params.intensity,
  spots: g = o.params.spots,
  spotSize: c = o.params.spotSize,
  pulse: _ = o.params.pulse,
  smoke: d = o.params.smoke,
  smokeSize: h = o.params.smokeSize,
  margin: r,
  marginLeft: S = r ?? o.params.marginLeft,
  marginRight: k = r ?? o.params.marginRight,
  marginTop: B = r ?? o.params.marginTop,
  marginBottom: z = r ?? o.params.marginBottom,
  // Sizing props
  fit: R = o.params.fit,
  rotation: P = o.params.rotation,
  scale: T = o.params.scale,
  originX: b = o.params.originX,
  originY: w = o.params.originY,
  offsetX: x = o.params.offsetX,
  offsetY: X = o.params.offsetY,
  worldWidth: Y = o.params.worldWidth,
  worldHeight: y = o.params.worldHeight,
  ...F
}) {
  const L = {
    // Own uniforms
    u_colorBack: a(m),
    u_colors: s.map(a),
    u_colorsCount: s.length,
    u_roundness: i,
    u_thickness: p,
    u_marginLeft: S,
    u_marginRight: k,
    u_marginTop: B,
    u_marginBottom: z,
    u_aspectRatio: W[n],
    u_softness: u,
    u_intensity: l,
    u_bloom: f,
    u_spots: g,
    u_spotSize: c,
    u_pulse: _,
    u_smoke: d,
    u_smokeSize: h,
    u_noiseTexture: E(),
    // Sizing uniforms
    u_fit: O[R],
    u_rotation: P,
    u_scale: T,
    u_offsetX: x,
    u_offsetY: X,
    u_originX: b,
    u_originY: w,
    u_worldWidth: Y,
    u_worldHeight: y
  };
  return /* @__PURE__ */ I(
    A,
    {
      ...F,
      speed: t,
      frame: e,
      fragmentShader: q,
      uniforms: L
    }
  );
}, C);
export {
  V as PulsingBorder,
  o as defaultPreset
};
