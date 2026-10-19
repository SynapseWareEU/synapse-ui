import { memo as S } from "react";
import { ShaderMount as M } from "../shader-mount.js";
import { colorPropsAreEqual as x } from "../color-props-are-equal.js";
import { defaultObjectSizing as O, ShaderFitOptions as X } from "../../../shaders/dist/shader-sizing.js";
import { meshGradientFragmentShader as Y } from "../../../shaders/dist/shaders/mesh-gradient.js";
import { getShaderColorFromString as v } from "../../../shaders/dist/get-shader-color-from-string.js";
import { jsx as y } from "react/jsx-runtime";
const r = {
  params: {
    ...O,
    speed: 1,
    frame: 0,
    colors: ["#e0eaff", "#241d9a", "#f75092", "#9f50d3"],
    distortion: 0.8,
    swirl: 0.1,
    grainMixer: 0,
    grainOverlay: 0
  }
}, q = S(function({
  // Own props
  speed: o = r.params.speed,
  frame: i = r.params.frame,
  colors: a = r.params.colors,
  distortion: t = r.params.distortion,
  swirl: e = r.params.swirl,
  grainMixer: s = r.params.grainMixer,
  grainOverlay: m = r.params.grainOverlay,
  // Sizing props
  fit: n = r.params.fit,
  rotation: p = r.params.rotation,
  scale: f = r.params.scale,
  originX: d = r.params.originX,
  originY: u = r.params.originY,
  offsetX: l = r.params.offsetX,
  offsetY: g = r.params.offsetY,
  worldWidth: _ = r.params.worldWidth,
  worldHeight: h = r.params.worldHeight,
  ...c
}) {
  const w = {
    // Own uniforms
    u_colors: a.map(v),
    u_colorsCount: a.length,
    u_distortion: t,
    u_swirl: e,
    u_grainMixer: s,
    u_grainOverlay: m,
    // Sizing uniforms
    u_fit: X[n],
    u_rotation: p,
    u_scale: f,
    u_offsetX: l,
    u_offsetY: g,
    u_originX: d,
    u_originY: u,
    u_worldWidth: _,
    u_worldHeight: h
  };
  return /* @__PURE__ */ y(
    M,
    {
      ...c,
      speed: o,
      frame: i,
      fragmentShader: Y,
      uniforms: w
    }
  );
}, x);
export {
  q as MeshGradient,
  r as defaultPreset
};
