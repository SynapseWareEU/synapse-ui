var g = Object.defineProperty;
var E = (s, e, i) => e in s ? g(s, e, { enumerable: !0, configurable: !0, writable: !0, value: i }) : s[e] = i;
var t = (s, e, i) => E(s, typeof e != "symbol" ? e + "" : e, i);
import { vertexShaderSource as R } from "./vertex-shader.js";
const p = 1920 * 1080 * 4;
class A {
  constructor(e, i, r, h, o = 0, n = 0, a = 2, c = p, u = []) {
    t(this, "parentElement");
    t(this, "canvasElement");
    t(this, "gl");
    t(this, "program", null);
    t(this, "uniformLocations", {});
    /** The fragment shader that we are using */
    t(this, "fragmentShader");
    /** Stores the RAF for the render loop */
    t(this, "rafId", null);
    /** Time of the last rendered frame */
    t(this, "lastRenderTime", 0);
    /** Total time that we have played any animation, passed as a uniform to the shader for time-based VFX */
    t(this, "currentFrame", 0);
    /** The speed that we progress through animation time (multiplies by delta time every update). Allows negatives to play in reverse. If set to 0, rAF will stop entirely so static shaders have no recurring performance costs */
    t(this, "speed", 0);
    /** Actual speed used that accounts for visibility: we pause the shader if the tab is hidden or the element out of the viewport */
    t(this, "currentSpeed", 0);
    /** Uniforms that are provided by the user for the specific shader being mounted (not including uniforms that this Mount adds, like time and resolution) */
    t(this, "providedUniforms");
    /** Names of the uniforms that should have mipmaps generated for them */
    t(this, "mipmaps", []);
    /** Just a sanity check to make sure frames don't run after we're disposed */
    t(this, "hasBeenDisposed", !1);
    /** If the resolution of the canvas has changed since the last render */
    t(this, "resolutionChanged", !0);
    /** Store textures that are provided by the user */
    t(this, "textures", /* @__PURE__ */ new Map());
    t(this, "minPixelRatio");
    t(this, "maxPixelCount");
    t(this, "isSafari", w());
    t(this, "uniformCache", {});
    t(this, "textureUnitMap", /* @__PURE__ */ new Map());
    t(this, "ownerDocument");
    t(this, "initProgram", () => {
      const e = x(this.gl, R, this.fragmentShader);
      e && (this.program = e);
    });
    t(this, "setupPositionAttribute", () => {
      const e = this.gl.getAttribLocation(this.program, "a_position"), i = this.gl.createBuffer();
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, i);
      const r = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
      this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(r), this.gl.STATIC_DRAW), this.gl.enableVertexAttribArray(e), this.gl.vertexAttribPointer(e, 2, this.gl.FLOAT, !1, 0, 0);
    });
    t(this, "setupUniforms", () => {
      const e = {
        u_time: this.gl.getUniformLocation(this.program, "u_time"),
        u_pixelRatio: this.gl.getUniformLocation(this.program, "u_pixelRatio"),
        u_resolution: this.gl.getUniformLocation(this.program, "u_resolution")
      };
      Object.entries(this.providedUniforms).forEach(([i, r]) => {
        if (e[i] = this.gl.getUniformLocation(this.program, i), r instanceof HTMLImageElement) {
          const h = `${i}AspectRatio`;
          e[h] = this.gl.getUniformLocation(this.program, h);
        }
      }), this.uniformLocations = e;
    });
    /**
     * The scale that we should render at.
     * - Used to target 2x rendering even on 1x screens for better antialiasing
     * - Prevents the virtual resolution from going beyond the maximum resolution
     * - Accounts for the page zoom level so we render in physical device pixels rather than CSS pixels
     */
    t(this, "renderScale", 1);
    t(this, "parentWidth", 0);
    t(this, "parentHeight", 0);
    t(this, "parentDevicePixelWidth", 0);
    t(this, "parentDevicePixelHeight", 0);
    t(this, "devicePixelsSupported", !1);
    t(this, "intersectionObserver", null);
    t(this, "isInViewport", !0);
    t(this, "resizeObserver", null);
    t(this, "setupResizeObserver", () => {
      this.resizeObserver = new ResizeObserver(([e]) => {
        var i;
        if (e != null && e.borderBoxSize[0]) {
          const r = (i = e.devicePixelContentBoxSize) == null ? void 0 : i[0];
          r !== void 0 && (this.devicePixelsSupported = !0, this.parentDevicePixelWidth = r.inlineSize, this.parentDevicePixelHeight = r.blockSize), this.parentWidth = e.borderBoxSize[0].inlineSize, this.parentHeight = e.borderBoxSize[0].blockSize;
        }
        this.handleResize();
      }), this.resizeObserver.observe(this.parentElement);
    });
    t(this, "setupIntersectionObserver", () => {
      const e = this.ownerDocument.defaultView;
      e != null && e.IntersectionObserver && (this.intersectionObserver = new e.IntersectionObserver(([i]) => {
        this.isInViewport = (i == null ? void 0 : i.isIntersecting) ?? !0, this.updateCurrentSpeed();
      }), this.intersectionObserver.observe(this.parentElement));
    });
    // Visual viewport resize handler, mainly used to react to browser zoom changes.
    // Resize observer by itself does not react to pinch zoom, and although it usually
    // reacts to classic browser zoom, it's not guaranteed in edge cases.
    // Since timing between visual viewport changes and resize observer is complex
    // and because we'd like to know the device pixel sizes of elements, we just restart
    // the observer to get a guaranteed fresh callback regardless if it would have triggered or not.
    t(this, "handleVisualViewportChange", () => {
      var e;
      (e = this.resizeObserver) == null || e.disconnect(), this.setupResizeObserver();
    });
    /** Resize handler for when the container div changes size or the max pixel count changes and we want to resize our canvas to match */
    t(this, "handleResize", () => {
      let e = 0, i = 0;
      const r = Math.max(1, window.devicePixelRatio), h = (visualViewport == null ? void 0 : visualViewport.scale) ?? 1;
      if (this.devicePixelsSupported) {
        const l = Math.max(1, this.minPixelRatio / r);
        e = this.parentDevicePixelWidth * l * h, i = this.parentDevicePixelHeight * l * h;
      } else {
        let l = Math.max(r, this.minPixelRatio) * h;
        if (this.isSafari) {
          const d = T(this.ownerDocument);
          l *= Math.max(1, d);
        }
        e = Math.round(this.parentWidth) * l, i = Math.round(this.parentHeight) * l;
      }
      const o = Math.sqrt(this.maxPixelCount) / Math.sqrt(e * i), n = Math.min(1, o), a = Math.round(e * n), c = Math.round(i * n), u = a / Math.round(this.parentWidth);
      (this.canvasElement.width !== a || this.canvasElement.height !== c || this.renderScale !== u) && (this.renderScale = u, this.canvasElement.width = a, this.canvasElement.height = c, this.resolutionChanged = !0, this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height), this.render(performance.now()));
    });
    t(this, "render", (e) => {
      if (this.hasBeenDisposed) return;
      if (this.program === null) {
        console.warn("Tried to render before program or gl was initialized");
        return;
      }
      const i = e - this.lastRenderTime;
      this.lastRenderTime = e, this.currentSpeed !== 0 && (this.currentFrame += i * this.currentSpeed), this.gl.clear(this.gl.COLOR_BUFFER_BIT), this.gl.useProgram(this.program), this.gl.uniform1f(this.uniformLocations.u_time, this.currentFrame * 1e-3), this.resolutionChanged && (this.gl.uniform2f(this.uniformLocations.u_resolution, this.gl.canvas.width, this.gl.canvas.height), this.gl.uniform1f(this.uniformLocations.u_pixelRatio, this.renderScale), this.resolutionChanged = !1), this.gl.drawArrays(this.gl.TRIANGLES, 0, 6), this.currentSpeed !== 0 ? this.requestRender() : this.rafId = null;
    });
    t(this, "requestRender", () => {
      this.rafId !== null && cancelAnimationFrame(this.rafId), this.rafId = requestAnimationFrame(this.render);
    });
    /** Creates a texture from an image and sets it into a uniform value */
    t(this, "setTextureUniform", (e, i) => {
      if (!i.complete || i.naturalWidth === 0)
        throw new Error(`Paper Shaders: image for uniform ${e} must be fully loaded`);
      const r = this.textures.get(e);
      r && this.gl.deleteTexture(r), this.textureUnitMap.has(e) || this.textureUnitMap.set(e, this.textureUnitMap.size);
      const h = this.textureUnitMap.get(e);
      this.gl.activeTexture(this.gl.TEXTURE0 + h);
      const o = this.gl.createTexture();
      this.gl.bindTexture(this.gl.TEXTURE_2D, o), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR), this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, i), this.mipmaps.includes(e) && (this.gl.generateMipmap(this.gl.TEXTURE_2D), this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR_MIPMAP_LINEAR));
      const n = this.gl.getError();
      if (n !== this.gl.NO_ERROR || o === null) {
        console.error("Paper Shaders: WebGL error when uploading texture:", n);
        return;
      }
      this.textures.set(e, o);
      const a = this.uniformLocations[e];
      if (a) {
        this.gl.uniform1i(a, h);
        const c = `${e}AspectRatio`, u = this.uniformLocations[c];
        if (u) {
          const l = i.naturalWidth / i.naturalHeight;
          this.gl.uniform1f(u, l);
        }
      }
    });
    /** Utility: recursive equality test for all the uniforms */
    t(this, "areUniformValuesEqual", (e, i) => e === i ? !0 : Array.isArray(e) && Array.isArray(i) && e.length === i.length ? e.every((r, h) => this.areUniformValuesEqual(r, i[h])) : !1);
    /** Sets the provided uniform values into the WebGL program, can be a partial list of uniforms that have changed */
    t(this, "setUniformValues", (e) => {
      this.gl.useProgram(this.program), Object.entries(e).forEach(([i, r]) => {
        let h = r;
        if (r instanceof HTMLImageElement && (h = `${r.src.slice(0, 200)}|${r.naturalWidth}x${r.naturalHeight}`), this.areUniformValuesEqual(this.uniformCache[i], h)) return;
        this.uniformCache[i] = h;
        const o = this.uniformLocations[i];
        if (!o) {
          console.warn(`Uniform location for ${i} not found`);
          return;
        }
        if (r instanceof HTMLImageElement)
          this.setTextureUniform(i, r);
        else if (Array.isArray(r)) {
          let n = null, a = null;
          if (r[0] !== void 0 && Array.isArray(r[0])) {
            const c = r[0].length;
            if (r.every((u) => u.length === c))
              n = r.flat(), a = c;
            else {
              console.warn(`All child arrays must be the same length for ${i}`);
              return;
            }
          } else
            n = r, a = n.length;
          switch (a) {
            case 2:
              this.gl.uniform2fv(o, n);
              break;
            case 3:
              this.gl.uniform3fv(o, n);
              break;
            case 4:
              this.gl.uniform4fv(o, n);
              break;
            case 9:
              this.gl.uniformMatrix3fv(o, !1, n);
              break;
            case 16:
              this.gl.uniformMatrix4fv(o, !1, n);
              break;
            default:
              console.warn(`Unsupported uniform array length: ${a}`);
          }
        } else typeof r == "number" ? this.gl.uniform1f(o, r) : typeof r == "boolean" ? this.gl.uniform1i(o, r ? 1 : 0) : console.warn(`Unsupported uniform type for ${i}: ${typeof r}`);
      });
    });
    /** Gets the current total animation time from 0ms */
    t(this, "getCurrentFrame", () => this.currentFrame);
    /** Set a frame to get a deterministic result, frames are literally just milliseconds from zero since the animation started */
    t(this, "setFrame", (e) => {
      this.currentFrame = e, this.lastRenderTime = performance.now(), this.render(performance.now());
    });
    /** Set an animation speed (or 0 to stop animation) */
    t(this, "setSpeed", (e = 1) => {
      this.speed = e, this.updateCurrentSpeed();
    });
    /** Apply the target speed, pausing (0) while the tab is hidden or the element is out of the viewport */
    t(this, "updateCurrentSpeed", () => {
      this.setCurrentSpeed(this.ownerDocument.hidden || !this.isInViewport ? 0 : this.speed);
    });
    t(this, "setCurrentSpeed", (e) => {
      this.currentSpeed = e, this.rafId === null && e !== 0 && (this.lastRenderTime = performance.now(), this.rafId = requestAnimationFrame(this.render)), this.rafId !== null && e === 0 && (cancelAnimationFrame(this.rafId), this.rafId = null);
    });
    /** Set the maximum pixel count for the shader, this will limit the number of pixels that will be rendered */
    t(this, "setMaxPixelCount", (e = p) => {
      this.maxPixelCount = e, this.handleResize();
    });
    /** Set the minimum pixel ratio for the shader */
    t(this, "setMinPixelRatio", (e = 2) => {
      this.minPixelRatio = e, this.handleResize();
    });
    /** Update the uniforms that are provided by the outside shader, can be a partial set with only the uniforms that have changed */
    t(this, "setUniforms", (e) => {
      this.setUniformValues(e), this.providedUniforms = { ...this.providedUniforms, ...e }, this.render(performance.now());
    });
    t(this, "handleDocumentVisibilityChange", () => {
      this.updateCurrentSpeed();
    });
    /** Dispose of the shader mount, cleaning up all of the WebGL resources */
    t(this, "dispose", () => {
      this.hasBeenDisposed = !0, this.rafId !== null && (cancelAnimationFrame(this.rafId), this.rafId = null), this.gl && this.program && (this.textures.forEach((e) => {
        this.gl.deleteTexture(e);
      }), this.textures.clear(), this.gl.deleteProgram(this.program), this.program = null, this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null), this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null), this.gl.bindRenderbuffer(this.gl.RENDERBUFFER, null), this.gl.bindFramebuffer(this.gl.FRAMEBUFFER, null), this.gl.getError()), this.resizeObserver && (this.resizeObserver.disconnect(), this.resizeObserver = null), this.intersectionObserver && (this.intersectionObserver.disconnect(), this.intersectionObserver = null), visualViewport == null || visualViewport.removeEventListener("resize", this.handleVisualViewportChange), this.ownerDocument.removeEventListener("visibilitychange", this.handleDocumentVisibilityChange), this.uniformLocations = {}, this.canvasElement.remove(), delete this.parentElement.paperShaderMount;
    });
    if ((e == null ? void 0 : e.nodeType) === 1)
      this.parentElement = e;
    else
      throw new Error("Paper Shaders: parent element must be an HTMLElement");
    if (this.ownerDocument = e.ownerDocument, !this.ownerDocument.querySelector("style[data-paper-shader]")) {
      const m = this.ownerDocument.createElement("style");
      m.innerHTML = b, m.setAttribute("data-paper-shader", ""), this.ownerDocument.head.prepend(m);
    }
    const l = this.ownerDocument.createElement("canvas");
    this.canvasElement = l, this.parentElement.prepend(l), this.fragmentShader = i, this.providedUniforms = r, this.mipmaps = u, this.currentFrame = n, this.minPixelRatio = a, this.maxPixelCount = c;
    const d = l.getContext("webgl2", h);
    if (!d)
      throw new Error("Paper Shaders: WebGL is not supported in this browser");
    this.gl = d, this.initProgram(), this.setupPositionAttribute(), this.setupUniforms(), this.setUniformValues(this.providedUniforms), this.setupResizeObserver(), visualViewport == null || visualViewport.addEventListener("resize", this.handleVisualViewportChange), this.setupIntersectionObserver(), this.setSpeed(o), this.parentElement.setAttribute("data-paper-shader", ""), this.parentElement.paperShaderMount = this, this.ownerDocument.addEventListener("visibilitychange", this.handleDocumentVisibilityChange);
  }
}
function f(s, e, i) {
  const r = s.createShader(e);
  return r ? (s.shaderSource(r, i), s.compileShader(r), s.getShaderParameter(r, s.COMPILE_STATUS) ? r : (console.error("An error occurred compiling the shaders: " + s.getShaderInfoLog(r)), s.deleteShader(r), null)) : null;
}
function x(s, e, i) {
  const r = s.getShaderPrecisionFormat(s.FRAGMENT_SHADER, s.MEDIUM_FLOAT), h = r ? r.precision : null;
  h && h < 23 && (e = e.replace(/precision\s+(lowp|mediump)\s+float;/g, "precision highp float;"), i = i.replace(/precision\s+(lowp|mediump)\s+float/g, "precision highp float").replace(/\b(uniform|varying|attribute)\s+(lowp|mediump)\s+(\w+)/g, "$1 highp $3"));
  const o = f(s, s.VERTEX_SHADER, e), n = f(s, s.FRAGMENT_SHADER, i);
  if (!o || !n) return null;
  const a = s.createProgram();
  return a ? (s.attachShader(a, o), s.attachShader(a, n), s.linkProgram(a), s.getProgramParameter(a, s.LINK_STATUS) ? (s.detachShader(a, o), s.detachShader(a, n), s.deleteShader(o), s.deleteShader(n), a) : (console.error("Unable to initialize the shader program: " + s.getProgramInfoLog(a)), s.deleteProgram(a), s.deleteShader(o), s.deleteShader(n), null)) : null;
}
const b = `@layer paper-shaders {
  :where([data-paper-shader]) {
    isolation: isolate;
    position: relative;

    & canvas {
      contain: strict;
      display: block;
      position: absolute;
      inset: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      corner-shape: inherit;
    }
  }
}`;
function w() {
  const s = navigator.userAgent.toLowerCase();
  return s.includes("safari") && !s.includes("chrome") && !s.includes("android");
}
function T(s) {
  const e = (visualViewport == null ? void 0 : visualViewport.scale) ?? 1, i = (visualViewport == null ? void 0 : visualViewport.width) ?? window.innerWidth, r = window.innerWidth - s.documentElement.clientWidth, h = e * i + r, o = outerWidth / h, n = Math.round(100 * o);
  return n % 5 === 0 ? n / 100 : n === 33 ? 1 / 3 : n === 67 ? 2 / 3 : n === 133 ? 4 / 3 : o;
}
export {
  A as ShaderMount
};
