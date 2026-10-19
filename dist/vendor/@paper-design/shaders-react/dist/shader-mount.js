import { forwardRef as E, useState as O, useRef as M, useEffect as a } from "react";
import { ShaderMount as $ } from "../../shaders/dist/shader-mount.js";
import { emptyPixel as z } from "../../shaders/dist/empty-pixel.js";
import { useMergeRefs as x } from "./use-merge-refs.js";
import { setMinImageSize as R } from "./set-min-image-size.js";
import { jsx as F } from "react/jsx-runtime";
async function y(S) {
  const i = {}, c = [], p = (e) => {
    try {
      return e.startsWith("/") || new URL(e), !0;
    } catch {
      return !1;
    }
  }, u = (e) => {
    try {
      return e.startsWith("/") ? !1 : new URL(e, window.location.origin).origin !== window.location.origin;
    } catch {
      return !1;
    }
  };
  return Object.entries(S).forEach(([e, t]) => {
    if (typeof t == "string") {
      const n = t || z;
      if (!p(n)) {
        console.warn(`Uniform "${e}" has invalid URL "${n}". Skipping image loading.`);
        return;
      }
      const f = new Promise((m, g) => {
        const s = new Image();
        u(n) && (s.crossOrigin = "anonymous"), s.onload = () => {
          R(s), i[e] = s, m();
        }, s.onerror = () => {
          console.error(`Could not set uniforms. Failed to load image at ${n}`), g();
        }, s.src = n;
      });
      c.push(f);
    } else if (t instanceof HTMLImageElement) {
      const n = t.decode().then(() => {
        R(t), i[e] = t;
      });
      c.push(n);
    } else
      i[e] = t;
  }), await Promise.all(c), i;
}
const P = E(
  function({
    fragmentShader: i,
    uniforms: c,
    webGlContextAttributes: p,
    speed: u = 0,
    frame: e = 0,
    width: t,
    height: n,
    minPixelRatio: f,
    maxPixelCount: m,
    mipmaps: g,
    style: s,
    ...h
  }, I) {
    const [l, b] = O(!1), w = M(null), o = M(null), L = M(p);
    a(() => ((async () => {
      const d = await y(c);
      w.current && !o.current && (o.current = new $(
        w.current,
        i,
        d,
        L.current,
        u,
        e,
        f,
        m,
        g
      ), b(!0));
    })(), () => {
      var d;
      (d = o.current) == null || d.dispose(), o.current = null;
    }), [i]), a(() => {
      let r = !1;
      return (async () => {
        var U;
        const j = await y(c);
        r || (U = o.current) == null || U.setUniforms(j);
      })(), () => {
        r = !0;
      };
    }, [c, l]), a(() => {
      var r;
      (r = o.current) == null || r.setSpeed(u);
    }, [u, l]), a(() => {
      var r;
      (r = o.current) == null || r.setMaxPixelCount(m);
    }, [m, l]), a(() => {
      var r;
      (r = o.current) == null || r.setMinPixelRatio(f);
    }, [f, l]), a(() => {
      var r;
      (r = o.current) == null || r.setFrame(e);
    }, [e, l]);
    const N = x([w, I]);
    return /* @__PURE__ */ F(
      "div",
      {
        ref: N,
        style: t !== void 0 || n !== void 0 ? {
          width: typeof t == "string" && isNaN(+t) === !1 ? +t : t,
          height: typeof n == "string" && isNaN(+n) === !1 ? +n : n,
          ...s
        } : s,
        ...h
      }
    );
  }
);
P.displayName = "ShaderMount";
export {
  P as ShaderMount
};
