const t = {
  fit: "contain",
  scale: 1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  originX: 0.5,
  originY: 0.5,
  worldWidth: 0,
  worldHeight: 0
}, o = {
  fit: "none",
  scale: 1,
  rotation: 0,
  offsetX: 0,
  offsetY: 0,
  originX: 0.5,
  originY: 0.5,
  worldWidth: 0,
  worldHeight: 0
}, i = {
  none: 0,
  contain: 1,
  cover: 2
};
export {
  i as ShaderFitOptions,
  t as defaultObjectSizing,
  o as defaultPatternSizing
};
