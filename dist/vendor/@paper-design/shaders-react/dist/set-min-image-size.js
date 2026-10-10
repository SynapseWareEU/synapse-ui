function n(t) {
  if (t.naturalWidth < 1024 && t.naturalHeight < 1024) {
    if (t.naturalWidth < 1 || t.naturalHeight < 1)
      return;
    const a = t.naturalWidth / t.naturalHeight;
    t.width = Math.round(a > 1 ? 1024 * a : 1024), t.height = Math.round(a > 1 ? 1024 : 1024 / a);
  }
}
export {
  n as setMinImageSize
};
