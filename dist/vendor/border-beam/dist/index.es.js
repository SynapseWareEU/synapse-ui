import { jsxs as $e, Fragment as qe, jsx as xe } from "react/jsx-runtime";
import { forwardRef as Re, useId as Me, useRef as Se, useState as I, useEffect as A, useCallback as ue, useMemo as he } from "react";
const je = {
  sm: {
    borderRadius: 32,
    borderWidth: 1,
    width: 70,
    height: 36
  },
  md: {
    borderRadius: 16,
    borderWidth: 1
  },
  line: {
    borderRadius: 16,
    borderWidth: 1
  },
  "pulse-outside": {
    borderRadius: 16,
    borderWidth: 1
  },
  "pulse-inner": {
    borderRadius: 16,
    borderWidth: 1
  }
}, Ce = {
  sm: {
    dark: {
      strokeOpacity: 0.46,
      innerOpacity: 0.24,
      bloomOpacity: 0.38,
      innerShadow: "rgba(255, 255, 255, 0.3)",
      saturation: 1.2
    },
    light: {
      strokeOpacity: 0.12,
      innerOpacity: 0.3,
      bloomOpacity: 0.16,
      innerShadow: "rgba(0, 0, 0, 0.14)",
      saturation: 1.8
    }
  },
  md: {
    dark: {
      strokeOpacity: 0.26,
      innerOpacity: 0.42,
      bloomOpacity: 0.24,
      innerShadow: "rgba(255, 255, 255, 0.27)",
      saturation: 1.2
    },
    light: {
      strokeOpacity: 0.12,
      innerOpacity: 0.26,
      bloomOpacity: 0.34,
      innerShadow: "rgba(0, 0, 0, 0.14)",
      saturation: 1.5
    }
  },
  line: {
    dark: {
      strokeOpacity: 1.14,
      innerOpacity: 0.7,
      bloomOpacity: 0.8,
      innerShadow: "rgba(255, 255, 255, 0.1)",
      saturation: 1.2
    },
    light: {
      strokeOpacity: 0.16,
      innerOpacity: 0.32,
      bloomOpacity: 0.3,
      innerShadow: "rgba(0, 0, 0, 0.14)",
      saturation: 1.95
    }
  },
  // Pulse Outside — outward-blooming breathe (ported from v5 "Breathe Outside Uncropped" / c6)
  "pulse-outside": {
    dark: {
      strokeOpacity: 0.94,
      innerOpacity: 0.34,
      bloomOpacity: 0.3,
      innerShadow: "transparent",
      saturation: 1.2,
      brightness: 1.9,
      // v5 Card 5 frames the card with a single 1px hairline (its box-shadow at
      // 0.3). Wrapped components here already supply their own ~equivalent 1px
      // border, so the beam must NOT add a second hairline on top or the edge
      // reads brighter than v5. Kept at 0 to match v5's single-hairline look.
      hairlineOpacity: 0
    },
    light: {
      strokeOpacity: 1.96,
      innerOpacity: 1.04,
      bloomOpacity: 0.42,
      innerShadow: "transparent",
      saturation: 0.6,
      brightness: 1.7,
      hairlineOpacity: 0
    }
  },
  // Pulse Inner — contained breathe (ported from v5 "Breathe" / c4)
  "pulse-inner": {
    dark: {
      strokeOpacity: 1.54,
      innerOpacity: 0.44,
      bloomOpacity: 0.66,
      innerShadow: "transparent",
      saturation: 1.2,
      brightness: 0.75
    },
    light: {
      strokeOpacity: 0.32,
      innerOpacity: 0.4,
      bloomOpacity: 0.8,
      innerShadow: "transparent",
      saturation: 0.75,
      brightness: 1.3
    }
  }
}, j = {
  colorful: {
    border: [
      { color: "rgb(255, 50, 100)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(40, 140, 255)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(50, 200, 80)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(30, 185, 170)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(100, 70, 255)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(40, 140, 255)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(255, 120, 40)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(240, 50, 180)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(180, 40, 240)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(255, 60, 80)", secondary: "rgba(40, 190, 180, 0.98)" },
    spikeLt: { primary: "rgb(200, 30, 60)", secondary: "rgb(20, 150, 140)" }
  },
  mono: {
    border: [
      { color: "rgb(180, 180, 180)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(140, 140, 140)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(160, 160, 160)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(130, 130, 130)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(170, 170, 170)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(150, 150, 150)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(190, 190, 190)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(145, 145, 145)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(165, 165, 165)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(200, 200, 200)", secondary: "rgb(170, 170, 170)" },
    spikeLt: { primary: "rgb(80, 80, 80)", secondary: "rgb(120, 120, 120)" }
  },
  ocean: {
    border: [
      { color: "rgb(29, 78, 216)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(94, 234, 212)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(29, 78, 216)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(94, 234, 212)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(59, 130, 246)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(94, 234, 212)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(29, 78, 216)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(94, 234, 212)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(23, 66, 159)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(94, 234, 212)", secondary: "rgba(29, 78, 216, 0.98)" },
    spikeLt: { primary: "rgb(29, 78, 216)", secondary: "rgb(94, 234, 212)" }
  },
  sunset: {
    border: [
      { color: "rgb(255, 80, 50)", pos: "33% -7.4%", size: "70px 40px" },
      { color: "rgb(255, 160, 40)", pos: "12% -5%", size: "60px 35px" },
      { color: "rgb(255, 120, 60)", pos: "2.1% 68.3%", size: "40px 70px" },
      { color: "rgb(255, 200, 50)", pos: "2.1% 68.3%", size: "20px 35px" },
      { color: "rgb(255, 100, 80)", pos: "74.4% 100%", size: "180px 32px" },
      { color: "rgb(255, 180, 60)", pos: "55% 100%", size: "85px 26px" },
      { color: "rgb(255, 60, 60)", pos: "93.9% 0%", size: "74px 32px" },
      { color: "rgb(255, 140, 50)", pos: "100% 27.1%", size: "26px 42px" },
      { color: "rgb(255, 90, 70)", pos: "100% 27.1%", size: "52px 48px" }
    ],
    spike: { primary: "rgb(255, 140, 80)", secondary: "rgba(255, 100, 60, 0.98)" },
    spikeLt: { primary: "rgb(200, 80, 40)", secondary: "rgb(220, 120, 30)" }
  }
}, ke = {
  colorful: {
    border: [
      { color: "rgb(50, 200, 80)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(30, 185, 170)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 120, 40)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(100, 70, 255)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(240, 50, 180)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(180, 40, 240)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(40, 140, 255)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 50, 100)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(50, 200, 80, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(30, 185, 170, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 120, 40, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(100, 70, 255, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(240, 50, 180, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(180, 40, 240, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(40, 140, 255, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 50, 100, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  mono: {
    border: [
      { color: "rgb(160, 160, 160)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(140, 140, 140)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(180, 180, 180)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(150, 150, 150)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(170, 170, 170)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(155, 155, 155)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(145, 145, 145)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(165, 165, 165)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(160, 160, 160, 0.25)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(140, 140, 140, 0.22)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(180, 180, 180, 0.17)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(150, 150, 150, 0.17)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(170, 170, 170, 0.15)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(155, 155, 155, 0.20)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(145, 145, 145, 0.15)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(165, 165, 165, 0.15)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  ocean: {
    border: [
      { color: "rgb(94, 234, 212)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(29, 78, 216)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(94, 234, 212)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(29, 78, 216)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(94, 234, 212)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(59, 130, 246)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(29, 78, 216)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(94, 234, 212)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(94, 234, 212, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(29, 78, 216, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(29, 78, 216, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(59, 130, 246, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(23, 66, 159, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(29, 78, 216, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(29, 78, 216, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(29, 78, 216, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  },
  sunset: {
    border: [
      { color: "rgb(255, 180, 50)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgb(255, 150, 40)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgb(255, 80, 60)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgb(255, 100, 80)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgb(255, 60, 80)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgb(255, 120, 60)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgb(255, 200, 50)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgb(255, 90, 70)", pos: "100% 27%", size: "11px 12px" }
    ],
    inner: [
      { color: "rgba(255, 180, 50, 0.5)", pos: "2% 68%", size: "9px 18px" },
      { color: "rgba(255, 150, 40, 0.45)", pos: "2% 68%", size: "4px 8px" },
      { color: "rgba(255, 80, 60, 0.35)", pos: "72% -3%", size: "59px 9px" },
      { color: "rgba(255, 100, 80, 0.35)", pos: "74% 100%", size: "42px 7px" },
      { color: "rgba(255, 60, 80, 0.3)", pos: "100% 27%", size: "10px 17px" },
      { color: "rgba(255, 120, 60, 0.4)", pos: "100% 27%", size: "10px 18px" },
      { color: "rgba(255, 200, 50, 0.3)", pos: "100% 27%", size: "5px 10px" },
      { color: "rgba(255, 90, 70, 0.3)", pos: "100% 27%", size: "11px 12px" }
    ]
  }
};
function Le(o) {
  return ke[o].border.map((e) => `radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `);
}
function Ee(o) {
  return ke[o].inner.map((e) => `radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `);
}
function Ie(o) {
  return j[o].border.map((e) => `radial-gradient(ellipse ${e.size} at ${e.pos}, ${e.color}, transparent)`).join(`,
    `);
}
function Ae(o) {
  const e = j[o], a = o === "mono" ? 0.225 : 0.45;
  return e.border.map((r) => {
    const t = r.color.replace("rgb(", "rgba(").replace(")", `, ${a})`);
    return `radial-gradient(ellipse ${r.size.split(" ").map((i) => {
      const s = parseInt(i);
      return `${Math.round(s * 0.9)}px`;
    }).join(" ")} at ${r.pos}, ${t}, transparent)`;
  }).join(`,
    `);
}
function Pe(o, e) {
  const a = j[o];
  return e ? a.spike : a.spikeLt;
}
const Ve = {
  colorful: {
    dark: [
      { color: "rgb(255, 50, 100)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(40, 180, 220)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(50, 200, 80)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(180, 40, 240)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 160, 30)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(100, 70, 255)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(40, 140, 255)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(240, 50, 180)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(30, 185, 170)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(255, 50, 100)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(40, 140, 255)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(50, 200, 80)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(180, 40, 240)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(30, 185, 170)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(100, 70, 255)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(40, 140, 255)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(255, 120, 40)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(240, 50, 180)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  mono: {
    dark: [
      { color: "rgb(200, 200, 200)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(170, 170, 170)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(155, 155, 155)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(185, 185, 185)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(165, 165, 165)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(180, 180, 180)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(160, 160, 160)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(175, 175, 175)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(190, 190, 190)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(100, 100, 100)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(80, 80, 80)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(90, 90, 90)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(70, 70, 70)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(85, 85, 85)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(95, 95, 95)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(75, 75, 75)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(105, 105, 105)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(65, 65, 65)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  ocean: {
    dark: [
      { color: "rgb(29, 78, 216)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(94, 234, 212)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(29, 78, 216)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(23, 66, 159)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(94, 234, 212)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(59, 130, 246)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(94, 234, 212)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(29, 78, 216)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(23, 66, 159)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(29, 78, 216)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(29, 78, 216)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(59, 130, 246)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(23, 66, 159)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(59, 130, 246)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(23, 66, 159)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(59, 130, 246)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(23, 66, 159)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(29, 78, 216)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  },
  sunset: {
    dark: [
      { color: "rgb(255, 100, 60)", sizeW: 36, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(255, 180, 50)", sizeW: 30, sizeH: 32, offsetX: 39, offsetY: 0 },
      { color: "rgb(255, 140, 70)", sizeW: 33, sizeH: 28, offsetX: -36, offsetY: 2 },
      { color: "rgb(255, 80, 80)", sizeW: 29, sizeH: 34, offsetX: -54, offsetY: 0 },
      { color: "rgb(255, 200, 60)", sizeW: 27, sizeH: 30, offsetX: 51, offsetY: -1 },
      { color: "rgb(255, 120, 50)", sizeW: 36, sizeH: 24, offsetX: 21, offsetY: 1 },
      { color: "rgb(255, 160, 80)", sizeW: 30, sizeH: 22, offsetX: -21, offsetY: 0 },
      { color: "rgb(255, 90, 60)", sizeW: 25, sizeH: 28, offsetX: 66, offsetY: 1 },
      { color: "rgb(255, 70, 70)", sizeW: 23, sizeH: 30, offsetX: -66, offsetY: -1 }
    ],
    light: [
      { color: "rgb(220, 80, 40)", sizeW: 45, sizeH: 36, offsetX: 0, offsetY: 2 },
      { color: "rgb(230, 150, 30)", sizeW: 35, sizeH: 32, offsetX: 65, offsetY: 0 },
      { color: "rgb(210, 110, 50)", sizeW: 40, sizeH: 28, offsetX: -60, offsetY: 2 },
      { color: "rgb(200, 60, 60)", sizeW: 35, sizeH: 34, offsetX: -90, offsetY: 0 },
      { color: "rgb(220, 170, 40)", sizeW: 38, sizeH: 30, offsetX: 85, offsetY: -1 },
      { color: "rgb(210, 100, 30)", sizeW: 50, sizeH: 24, offsetX: 35, offsetY: 1 },
      { color: "rgb(230, 130, 60)", sizeW: 40, sizeH: 22, offsetX: -35, offsetY: 0 },
      { color: "rgb(190, 70, 50)", sizeW: 35, sizeH: 28, offsetX: 110, offsetY: 1 },
      { color: "rgb(180, 50, 50)", sizeW: 30, sizeH: 30, offsetX: -110, offsetY: -1 }
    ]
  }
};
function Ne(o, e, a) {
  return Ve[o][e ? "dark" : "light"].map((r) => {
    const t = r.offsetX === 0 ? "" : r.offsetX > 0 ? ` + ${r.offsetX}px` : ` - ${Math.abs(r.offsetX)}px`, i = r.offsetY === 0 ? "" : r.offsetY > 0 ? ` + ${r.offsetY}px` : ` - ${Math.abs(r.offsetY)}px`;
    return `radial-gradient(ellipse calc(${r.sizeW}px * var(--beam-w-${a})) calc(${r.sizeH}px * var(--beam-h-${a})) at calc(var(--beam-x-${a}) * 100%${t}) calc(100%${i}), ${r.color}, transparent)`;
  }).join(`,
       `);
}
const Be = {
  colorful: [
    { color: "rgba(255, 50, 100, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(40, 180, 220, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(50, 200, 80, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(180, 40, 240, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 160, 30, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(100, 70, 255, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(40, 140, 255, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(240, 50, 180, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(30, 185, 170, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  mono: [
    { color: "rgba(200, 200, 200, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(170, 170, 170, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(155, 155, 155, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(185, 185, 185, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(165, 165, 165, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(180, 180, 180, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(160, 160, 160, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(175, 175, 175, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(190, 190, 190, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  ocean: [
    { color: "rgba(29, 78, 216, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(94, 234, 212, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(29, 78, 216, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(23, 66, 159, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(94, 234, 212, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(59, 130, 246, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(94, 234, 212, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(29, 78, 216, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(23, 66, 159, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ],
  sunset: [
    { color: "rgba(255, 100, 60, 0.48)", sizeW: 33, sizeH: 30, offsetX: 0, offsetY: 0 },
    { color: "rgba(255, 180, 50, 0.42)", sizeW: 24, sizeH: 26, offsetX: 39, offsetY: -3 },
    { color: "rgba(255, 140, 70, 0.48)", sizeW: 27, sizeH: 24, offsetX: -36, offsetY: 0 },
    { color: "rgba(255, 80, 80, 0.42)", sizeW: 23, sizeH: 28, offsetX: -54, offsetY: -2 },
    { color: "rgba(255, 200, 60, 0.50)", sizeW: 24, sizeH: 24, offsetX: 51, offsetY: -1 },
    { color: "rgba(255, 120, 50, 0.45)", sizeW: 30, sizeH: 20, offsetX: 21, offsetY: 0 },
    { color: "rgba(255, 160, 80, 0.40)", sizeW: 25, sizeH: 18, offsetX: -21, offsetY: -2 },
    { color: "rgba(255, 90, 60, 0.45)", sizeW: 21, sizeH: 24, offsetX: 66, offsetY: 0 },
    { color: "rgba(255, 70, 70, 0.52)", sizeW: 18, sizeH: 26, offsetX: -66, offsetY: -1 }
  ]
};
function Te(o, e) {
  return Be[o].map((a) => {
    const r = a.offsetX === 0 ? "" : a.offsetX > 0 ? ` + ${a.offsetX}px` : ` - ${Math.abs(a.offsetX)}px`, t = a.offsetY === 0 ? "" : ` - ${Math.abs(a.offsetY)}px`;
    return `radial-gradient(ellipse calc(${a.sizeW}px * var(--beam-w-${e})) calc(${a.sizeH}px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%${r}) calc(100%${t}), ${a.color}, transparent)`;
  }).join(`,
    `);
}
const De = {
  colorful: {
    dark: {
      spikes: [
        { color1: "rgb(100, 70, 255)", color2: "rgba(100, 70, 255, 1)" },
        // 36%
        { color1: "rgba(255, 170, 40, 0.59)", color2: "rgba(255, 170, 40, 0.29)" },
        // 50%
        { color1: "rgb(50, 200, 100)", color2: "rgba(50, 200, 100, 1)" },
        // 64%
        { color1: "rgba(200, 50, 240, 0.91)", color2: "rgba(200, 50, 240, 0.45)" },
        // 78%
        { color1: "rgb(40, 140, 255)", color2: "rgba(40, 140, 255, 1)" }
        // 92%
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(80, 50, 200)", color2: "rgba(80, 50, 200, 0.8)" },
        // 36%
        { color1: "rgba(210, 130, 0, 0.7)", color2: "rgba(210, 130, 0, 0.46)" },
        // 50%
        { color1: "rgb(30, 160, 70)", color2: "rgba(30, 160, 70, 0.82)" },
        // 64%
        { color1: "rgb(160, 30, 190)", color2: "rgba(160, 30, 190, 0.7)" },
        // 78%
        { color1: "rgb(30, 100, 200)", color2: "rgba(30, 100, 200, 0.78)" }
        // 92%
      ]
    }
  },
  mono: {
    dark: {
      spikes: [
        { color1: "rgb(200, 200, 200)", color2: "rgba(200, 200, 200, 1)" },
        { color1: "rgba(180, 180, 180, 0.59)", color2: "rgba(180, 180, 180, 0.29)" },
        { color1: "rgb(190, 190, 190)", color2: "rgba(190, 190, 190, 1)" },
        { color1: "rgba(170, 170, 170, 0.91)", color2: "rgba(170, 170, 170, 0.45)" },
        { color1: "rgb(185, 185, 185)", color2: "rgba(185, 185, 185, 1)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(80, 80, 80)", color2: "rgba(80, 80, 80, 0.8)" },
        { color1: "rgba(100, 100, 100, 0.7)", color2: "rgba(100, 100, 100, 0.46)" },
        { color1: "rgb(70, 70, 70)", color2: "rgba(70, 70, 70, 0.82)" },
        { color1: "rgb(90, 90, 90)", color2: "rgba(90, 90, 90, 0.7)" },
        { color1: "rgb(85, 85, 85)", color2: "rgba(85, 85, 85, 0.78)" }
      ]
    }
  },
  ocean: {
    dark: {
      spikes: [
        { color1: "rgb(29, 78, 216)", color2: "rgb(29, 78, 216)" },
        { color1: "rgba(94, 234, 212, 0.59)", color2: "rgba(94, 234, 212, 0.29)" },
        { color1: "rgb(29, 78, 216)", color2: "rgb(29, 78, 216)" },
        { color1: "rgba(29, 78, 216, 0.91)", color2: "rgba(29, 78, 216, 0.45)" },
        { color1: "rgb(94, 234, 212)", color2: "rgb(94, 234, 212)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(23, 66, 159)", color2: "rgba(29, 78, 216, 0.8)" },
        { color1: "rgba(29, 78, 216, 0.7)", color2: "rgba(59, 130, 246, 0.46)" },
        { color1: "rgb(29, 78, 216)", color2: "rgba(59, 130, 246, 0.82)" },
        { color1: "rgb(29, 78, 216)", color2: "rgba(59, 130, 246, 0.7)" },
        { color1: "rgb(23, 66, 159)", color2: "rgba(29, 78, 216, 0.78)" }
      ]
    }
  },
  sunset: {
    dark: {
      spikes: [
        { color1: "rgb(255, 100, 80)", color2: "rgb(255, 100, 80)" },
        { color1: "rgba(255, 150, 80, 0.59)", color2: "rgba(255, 150, 80, 0.29)" },
        { color1: "rgb(255, 80, 60)", color2: "rgb(255, 80, 60)" },
        { color1: "rgba(255, 120, 50, 0.91)", color2: "rgba(255, 120, 50, 0.45)" },
        { color1: "rgb(255, 140, 70)", color2: "rgb(255, 140, 70)" }
      ]
    },
    light: {
      spikes: [
        { color1: "rgb(200, 60, 30)", color2: "rgba(200, 60, 30, 0.8)" },
        { color1: "rgba(220, 100, 20, 0.7)", color2: "rgba(220, 100, 20, 0.46)" },
        { color1: "rgb(180, 40, 20)", color2: "rgba(180, 40, 20, 0.82)" },
        { color1: "rgb(210, 80, 10)", color2: "rgba(210, 80, 10, 0.7)" },
        { color1: "rgb(190, 70, 30)", color2: "rgba(190, 70, 30, 0.78)" }
      ]
    }
  }
};
function U(o, e) {
  const a = o.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*[\d.]+\s*\)$/);
  if (a) return `rgba(${a[1]}, ${a[2]}, ${a[3]}, ${e})`;
  const r = o.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  return r ? `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${e})` : o;
}
function S(o, e) {
  const a = o.match(/^rgba\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  if (a) return `rgba(${a[1]}, ${a[2]}, ${a[3]}, ${(parseFloat(a[4]) * e).toFixed(2)})`;
  const r = o.match(/^rgb\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*\)$/);
  return r ? `rgba(${r[1]}, ${r[2]}, ${r[3]}, ${e.toFixed(2)})` : o;
}
function Je(o, e, a) {
  const r = Pe(o, e), t = De[o][e ? "dark" : "light"], i = o === "mono", s = i ? 0.14 : 1, b = i ? S(r.primary, 0.14) : r.primary, p = i ? S(r.primary, 0.09) : r.primary, c = i ? S(r.secondary, 0.12) : r.secondary, g = i ? U(r.secondary, 0.06) : U(r.secondary, 0.49), n = t.spikes.map(
    (w) => i ? { color1: S(w.color1, s), color2: S(w.color2, s * 0.7) } : w
  ), l = i ? "12px" : "0.8px", d = i ? "14px" : "2px", h = i ? "12px" : "1.2px", m = i ? "10px" : "0.6px", $ = i ? "42px" : "92px", H = i ? "38px" : "72px", v = i ? "40px" : "85px", y = i ? "32px" : "60px", k = i ? "12px" : "1px", x = i ? "rgba(255, 255, 255, 0.5)" : "rgba(255, 255, 255, 1)", f = i ? "rgba(255, 255, 255, 0.45)" : "rgba(255, 255, 255, 0.9)", W = i ? "rgba(255, 255, 255, 0.25)" : "rgba(255, 255, 255, 0.5)", u = i ? "rgba(255, 255, 255, 0.15)" : "rgba(255, 255, 255, 0.3)", Y = i ? "rgba(255, 255, 255, 0.06)" : "rgba(255, 255, 255, 0.12)", X = i ? "rgba(255, 255, 255, 0.015)" : "rgba(255, 255, 255, 0.03)";
  if (e)
    return `radial-gradient(ellipse calc(${l} * var(--beam-spike-${a})) calc(${$} * var(--beam-h-${a})) at 8% calc(100% - 2px), ${b}, ${p} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${a})) calc(35px * var(--beam-h-${a})) at 22% calc(100% - 4px), ${c}, ${g} 50%, transparent 95%),
       radial-gradient(ellipse calc(${d} * (2 - var(--beam-spike-${a}))) calc(${H} * var(--beam-h-${a})) at 36% calc(100% - 3px), ${n[0].color1}, ${n[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${a})) calc(28px * var(--beam-h-${a})) at 50% calc(100% - 2px), ${n[1].color1}, ${n[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${h} * (2 - var(--beam-spike2-${a}))) calc(${v} * var(--beam-h-${a})) at 64% calc(100% - 4px), ${n[2].color1}, ${n[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${a})) calc(45px * var(--beam-h-${a})) at 78% calc(100% - 2px), ${n[3].color1}, ${n[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${m} * (2 - var(--beam-spike-${a}))) calc(${y} * var(--beam-h-${a})) at 92% calc(100% - 3px), ${n[4].color1}, ${n[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(21px * var(--beam-spike-${a})) calc(15px * var(--beam-spike2-${a})) at calc(var(--beam-x-${a}) * 100%) calc(100% + 1px), ${x} 0%, ${f} 20%, ${W} 50%, transparent 100%),
       radial-gradient(ellipse calc(42px * var(--beam-w-${a})) calc(40px * var(--beam-h-${a})) at calc(var(--beam-x-${a}) * 100%) 100%, ${u} 0%, ${Y} 25%, ${X} 55%, transparent 80%)`;
  {
    const w = i ? S(r.primary, 0.11) : U(r.primary, 0.85), R = i ? S(r.secondary, 0.09) : U(r.secondary, 0.7);
    return `radial-gradient(ellipse calc(${l} * var(--beam-spike-${a})) calc(${$} * var(--beam-h-${a})) at 8% calc(100% - 2px), ${b}, ${w} 30%, transparent 88%),
       radial-gradient(ellipse calc(10px * var(--beam-spike2-${a})) calc(35px * var(--beam-h-${a})) at 22% calc(100% - 4px), ${c}, ${R} 50%, transparent 95%),
       radial-gradient(ellipse calc(${d} * (2 - var(--beam-spike-${a}))) calc(${H} * var(--beam-h-${a})) at 36% calc(100% - 3px), ${n[0].color1}, ${n[0].color2} 40%, transparent 90%),
       radial-gradient(ellipse calc(14px * var(--beam-spike2-${a})) calc(28px * var(--beam-h-${a})) at 50% calc(100% - 2px), ${n[1].color1}, ${n[1].color2} 55%, transparent 96%),
       radial-gradient(ellipse calc(${h} * (2 - var(--beam-spike2-${a}))) calc(${v} * var(--beam-h-${a})) at 64% calc(100% - 4px), ${n[2].color1}, ${n[2].color2} 35%, transparent 89%),
       radial-gradient(ellipse calc(7px * var(--beam-spike-${a})) calc(45px * var(--beam-h-${a})) at 78% calc(100% - 2px), ${n[3].color1}, ${n[3].color2} 48%, transparent 94%),
       radial-gradient(ellipse calc(${k} * (2 - var(--beam-spike-${a}))) calc(${y} * var(--beam-h-${a})) at 92% calc(100% - 3px), ${n[4].color1}, ${n[4].color2} 42%, transparent 91%),
       radial-gradient(ellipse calc(50px * var(--beam-w-${a})) calc(32px * var(--beam-h-${a})) at calc(var(--beam-x-${a}) * 100%) calc(100%), rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0.18) 30%, rgba(0, 0, 0, 0.03) 60%, transparent 85%)`;
  }
}
const we = [
  { region: 1, quad: "tl" },
  { region: 2, quad: "tl" },
  { region: 3, quad: "bl" },
  { region: 1, quad: "bl" },
  { region: 2, quad: "br" },
  { region: 3, quad: "br" },
  { region: 1, quad: "tr" },
  { region: 2, quad: "tr" },
  { region: 3, quad: "tr" }
], Ge = [
  [65, 35],
  [55, 30],
  [35, 65],
  [15, 30],
  [173, 28],
  [80, 22],
  [69, 28],
  [22, 38],
  [47, 44]
], Ke = [
  { ci: 0, region: 1, quad: "tl", w: 84, h: 48 },
  { ci: 1, region: 2, quad: "tl", w: 72, h: 42 },
  { ci: 2, region: 3, quad: "bl", w: 48, h: 84 },
  { ci: 4, region: 2, quad: "br", w: 216, h: 38 },
  { ci: 5, region: 3, quad: "br", w: 102, h: 31 },
  { ci: 6, region: 1, quad: "tr", w: 89, h: 38 },
  { ci: 8, region: 3, quad: "tr", w: 62, h: 58 }
], ze = [
  { ci: 0, region: 1, quad: "tl", w: 80, h: 19, x: "27%", y: "0%" },
  { ci: 6, region: 2, quad: "tr", w: 74, h: 11, x: "73%", y: "-1%" },
  { ci: 7, region: 3, quad: "tr", w: 15, h: 44, x: "100%", y: "33%" },
  { ci: 8, region: 1, quad: "br", w: 19, h: 38, x: "101%", y: "72%" },
  { ci: 4, region: 2, quad: "br", w: 84, h: 13, x: "67%", y: "100%" },
  { ci: 1, region: 3, quad: "bl", w: 60, h: 21, x: "24%", y: "101%" },
  { ci: 2, region: 1, quad: "bl", w: 17, h: 40, x: "0%", y: "60%" },
  { ci: 3, region: 2, quad: "tl", w: 13, h: 32, x: "-1%", y: "28%" }
], Qe = [
  { ci: 0, region: 1, quad: "tl", w: 110, h: 30, x: "27%", y: "3%" },
  { ci: 6, region: 2, quad: "tr", w: 100, h: 20, x: "73%", y: "1%" },
  { ci: 7, region: 3, quad: "tr", w: 26, h: 62, x: "100%", y: "33%" },
  { ci: 8, region: 1, quad: "br", w: 30, h: 56, x: "101%", y: "72%" },
  { ci: 4, region: 2, quad: "br", w: 120, h: 22, x: "67%", y: "99%" },
  { ci: 1, region: 3, quad: "bl", w: 88, h: 32, x: "24%", y: "99%" },
  { ci: 2, region: 1, quad: "bl", w: 28, h: 58, x: "0%", y: "60%" }
];
function Ue(o, e, a) {
  const r = o.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/);
  return `rgba(${r ? `${r[1]}, ${r[2]}, ${r[3]}` : "255, 255, 255"}, var(--bop-${e}-${a}))`;
}
function se(o, e, a, r, t, i, s, b) {
  return `radial-gradient(ellipse calc(${e}px * var(--bw${r}-${b}) * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${a}px * var(--bh${r}-${b}) * var(--bgh-${b}) * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at calc(${i} + var(--bx${r}-${b})) calc(${s} + var(--by${r}-${b})), ${Ue(o, t, b)}, transparent)`;
}
function Ze(o, e) {
  return j[o].border.map((a, r) => {
    const { region: t, quad: i } = we[r], [s, b] = a.pos.split(" "), [p, c] = a.size.split(" ").map(parseFloat);
    return se(a.color, p, c, t, i, s, b, e);
  }).join(`,
    `);
}
function _e(o, e, a) {
  const r = j[o].border.map((b, p) => {
    const { region: c, quad: g } = we[p], [n, l] = b.pos.split(" "), [d, h] = Ge[p];
    return se(b.color, d, h, c, g, n, l, e);
  }), t = a ? "255, 255, 255" : "0, 0, 0", i = a ? 0.18 : 0.08, s = [
    ["0%", "0%", "tl"],
    ["100%", "0%", "tr"],
    ["0%", "100%", "bl"],
    ["100%", "100%", "br"]
  ].map(
    ([b, p, c]) => `radial-gradient(ellipse 60px 60px at ${b} ${p}, rgba(${t}, calc(${i} * var(--bop-${c}-${e}))), transparent 70%)`
  );
  return [...r, ...s].join(`,
    `);
}
function ye(o, e, a) {
  const r = j[e].border;
  return o.map((t) => {
    const i = r[t.ci], [s, b] = i.pos.split(" ");
    return se(i.color, t.w, t.h, t.region, t.quad, t.x ?? s, t.y ?? b, a);
  }).join(`,
    `);
}
function We(o, e, a) {
  const r = j[e].border, t = +a.toFixed(3);
  return o.map((i) => {
    const s = r[i.ci], [b, p] = s.pos.split(" "), c = i.x ?? b, g = i.y ?? p, n = s.color.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/), l = n ? `${n[1]}, ${n[2]}, ${n[3]}` : "255, 255, 255";
    return `radial-gradient(ellipse calc(${i.w}px * var(--pulse-glow-sx, 1) * var(--pulse-glow-boost, 1)) calc(${i.h}px * var(--pulse-glow-sy, 1) * var(--pulse-glow-boost, 1)) at ${c} ${g}, rgba(${l}, ${t}), transparent)`;
  }).join(`,
    `);
}
function B(o) {
  return `
[data-beam="${o}"][data-paused],
[data-beam="${o}"][data-paused]::after,
[data-beam="${o}"][data-paused]::before,
[data-beam="${o}"][data-paused] [data-beam-bloom] {
  animation-play-state: paused !important;
}`;
}
function Xe(o) {
  const e = ["bw1", "bh1", "bw2", "bh2", "bw3", "bh3", "bgh", "bop-tl", "bop-tr", "bop-bl", "bop-br"], a = ["bx1", "by1", "bx2", "by2", "bx3", "by3"], r = e.map(
    (i) => `@property --${i}-${o} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}`
  ).join(`

`), t = a.map(
    (i) => `@property --${i}-${o} {
  syntax: "<length>";
  initial-value: 0px;
  inherits: true;
}`
  ).join(`

`);
  return `${r}

${t}

@property --beam-opacity-${o} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --beam-hue-${o} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}`;
}
function ne(o, e, a) {
  const r = e === "dark", t = a / 2.3;
  return o === "pulse-inner" ? {
    sp: 0.28,
    dr: r ? 33 : 40,
    op: r ? 0.48 : 0.45,
    gh: r ? 0.34 : 0.22,
    bs: (r ? 1.9 : 2.6) * t,
    ss: (r ? 2.6 : 4.6) * t,
    ghs: (r ? 2.4 : 5.5) * t,
    // Full hue revolution period (seconds) — colors continuously cycle.
    huePeriod: 16
  } : {
    sp: r ? 0.28 : 0.36,
    dr: r ? 14 : 19,
    op: r ? 0.46 : 0,
    gh: r ? 0.16 : 0.58,
    bs: (r ? 2.3 : 3.7) * t,
    ss: (r ? 6.4 : 4.6) * t,
    ghs: (r ? 2.4 : 3.8) * t,
    // Full hue revolution period (seconds) — colors continuously cycle.
    huePeriod: 14
  };
}
function ea(o, e) {
  const { sp: a, dr: r, op: t, gh: i, bs: s, ss: b, ghs: p } = e;
  return [
    { prop: `--bw1-${o}`, a: 1 - a, b: 1 + a * 1.1, period: b * 0.9, delay: 0, unit: "" },
    { prop: `--bh1-${o}`, a: 1 + a * 0.9, b: 1 - a * 0.85, period: b * 1.26, delay: 0, unit: "" },
    { prop: `--bx1-${o}`, a: -r, b: r * 0.9, period: s * 1.6, delay: 0, unit: "px" },
    { prop: `--by1-${o}`, a: r * 0.55, b: -r * 0.7, period: s * 1.6, delay: 0, unit: "px" },
    { prop: `--bw2-${o}`, a: 1 + a, b: 1 - a * 0.85, period: b * 1.1, delay: 0, unit: "" },
    { prop: `--bh2-${o}`, a: 1 - a * 0.8, b: 1 + a * 1.05, period: b * 0.81, delay: 0, unit: "" },
    { prop: `--bx2-${o}`, a: r * 0.8, b: -r * 0.9, period: s * 1.88, delay: 0, unit: "px" },
    { prop: `--by2-${o}`, a: -r, b: r * 0.65, period: s * 1.88, delay: 0, unit: "px" },
    { prop: `--bw3-${o}`, a: 1 - a * 0.6, b: 1 + a * 1.15, period: b * 0.98, delay: 0, unit: "" },
    { prop: `--bh3-${o}`, a: 1 + a * 0.75, b: 1 - a, period: b * 1.4, delay: 0, unit: "" },
    { prop: `--bx3-${o}`, a: -r * 0.6, b: r, period: s * 1.45, delay: 0, unit: "px" },
    { prop: `--by3-${o}`, a: -r * 0.85, b: r * 0.45, period: s * 1.45, delay: 0, unit: "px" },
    { prop: `--bgh-${o}`, a: 1 - i, b: 1 + i, period: p, delay: 0, unit: "" },
    { prop: `--bop-tl-${o}`, a: 1 - t, b: 1, period: s, delay: 0, unit: "" },
    { prop: `--bop-tr-${o}`, a: 1 - t, b: 1, period: s * 1.32, delay: s * 0.28, unit: "" },
    { prop: `--bop-bl-${o}`, a: 1 - t, b: 1, period: s * 0.84, delay: s * 0.55, unit: "" },
    { prop: `--bop-br-${o}`, a: 1 - t, b: 1, period: s * 1.58, delay: s * 0.83, unit: "" }
  ];
}
function aa(o, e, a, r, t, i) {
  if (o !== "pulse-inner" && o !== "pulse-outside") return null;
  const s = ne(o, e, a);
  return {
    oscillators: ea(i, s),
    // Pulse colors continuously rotate a full hue circle so the palette is never
    // pinned to fixed edges (no more "always red top-right / green left").
    hue: t ? null : { prop: `--beam-hue-${i}`, range: 360, period: s.huePeriod, continuous: !0 }
  };
}
function Z(o, e, a) {
  return `  animation: ${e}-${o} ${a}s ease forwards;`;
}
function ra(o) {
  const { size: e } = o;
  return e === "line" ? na(o) : e === "sm" ? oa(o) : e === "pulse-inner" ? ia(o) : e === "pulse-outside" ? sa(o) : ta(o);
}
function oa(o) {
  const {
    id: e,
    borderRadius: a,
    borderWidth: r,
    duration: t,
    strokeOpacity: i,
    innerOpacity: s,
    bloomOpacity: b,
    innerShadow: p,
    colorVariant: c,
    staticColors: g,
    brightness: n,
    saturation: l,
    hueRange: d,
    theme: h
  } = o, m = Math.max(0, a - r), $ = c === "mono" ? 0.5 : 1, H = i * $, v = s * $, y = b * $, k = g ? "" : `animation: beam-hue-shift-${e} 12s ease-in-out infinite;`, x = g ? "" : `
@keyframes beam-hue-shift-${e} {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
}`, f = h === "dark", W = f ? `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )` : `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`, u = Le(c), Y = Ee(c), X = f ? `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )` : `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`, w = `conic-gradient(
    from var(--beam-angle-${e}),
    transparent 0%, transparent 22%,
    rgba(255, 255, 255, 0.12) 28%, rgba(255, 255, 255, 0.4) 36%,
    white 46%, white 82%,
    rgba(255, 255, 255, 0.4) 88%, rgba(255, 255, 255, 0.12) 94%,
    transparent 97%, transparent 100%
  )`;
  return `
@property --beam-angle-${e} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
}

[data-beam="${e}"][data-active] {
  animation:
    beam-spin-${e} ${t}s linear infinite,
    beam-fade-in-${e} 0.6s ease forwards;
}

[data-beam="${e}"][data-fading] {
  animation:
    beam-spin-${e} ${t}s linear infinite,
    beam-fade-out-${e} 0.5s ease forwards;
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${m}px;
  padding: ${r}px;
  clip-path: inset(0 round ${a}px);
  background: ${W},${u};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${e}) * ${H.toFixed(2)} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${k}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  clip-path: inset(0 round ${a}px);
  background: ${Y};
  box-shadow: inset 0 0 5px 1px ${p};
  -webkit-mask-image: ${w};
  -webkit-mask-composite: source-over;
  mask-image: ${w};
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${e}) * ${v.toFixed(2)} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${k}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${m}px;
  clip-path: inset(0 round ${a}px);
  background: ${X};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${r}px;
  filter: blur(8px) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * ${y.toFixed(2)} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
}

@keyframes beam-spin-${e} {
  to { --beam-angle-${e}: 360deg; }
}

@keyframes beam-fade-in-${e} {
  to { --beam-opacity-${e}: 1; }
}

@keyframes beam-fade-out-${e} {
  from { --beam-opacity-${e}: 1; }
  to { --beam-opacity-${e}: 0; }
}
${x}
${B(e)}
`;
}
function ta(o) {
  const {
    id: e,
    borderRadius: a,
    borderWidth: r,
    duration: t,
    strokeOpacity: i,
    innerOpacity: s,
    bloomOpacity: b,
    innerShadow: p,
    colorVariant: c,
    staticColors: g,
    brightness: n,
    saturation: l,
    hueRange: d,
    theme: h
  } = o, m = Math.max(0, a - r), $ = c === "mono" ? 0.5 : 1, H = i * $, v = s * $, y = b * $, k = g ? "" : `animation: beam-hue-shift-${e} 12s ease-in-out infinite;`, x = g ? "" : `
@keyframes beam-hue-shift-${e} {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
}`, f = h === "dark", W = f ? `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(255, 255, 255, 0.1) 57%,
        rgba(255, 255, 255, 0.3) 60%,
        rgba(255, 255, 255, 0.6) 63%,
        rgba(255, 255, 255, 0.75) 66%,
        rgba(255, 255, 255, 0.6) 69%,
        rgba(255, 255, 255, 0.3) 72%,
        rgba(255, 255, 255, 0.1) 75%,
        transparent 78%, transparent 100%
      )` : `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 54%,
        rgba(0, 0, 0, 0.08) 57%,
        rgba(0, 0, 0, 0.2) 60%,
        rgba(0, 0, 0, 0.4) 63%,
        rgba(0, 0, 0, 0.55) 66%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.2) 72%,
        rgba(0, 0, 0, 0.08) 75%,
        transparent 78%, transparent 100%
      )`, u = Ie(c), Y = Ae(c), X = f ? `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(255, 255, 255, 0.03) 62%,
        rgba(255, 255, 255, 0.08) 65%,
        rgba(255, 255, 255, 0.2) 67%,
        rgba(255, 255, 255, 0.45) 69%,
        rgba(255, 255, 255, 0.85) 70%,
        rgba(255, 255, 255, 0.85) 70.5%,
        rgba(255, 255, 255, 0.45) 71.5%,
        rgba(255, 255, 255, 0.2) 73%,
        rgba(255, 255, 255, 0.08) 75%,
        rgba(255, 255, 255, 0.03) 78%,
        transparent 82%
      )` : `conic-gradient(
        from var(--beam-angle-${e}),
        transparent 0%, transparent 58%,
        rgba(0, 0, 0, 0.02) 62%,
        rgba(0, 0, 0, 0.08) 65%,
        rgba(0, 0, 0, 0.2) 67%,
        rgba(0, 0, 0, 0.4) 69%,
        rgba(0, 0, 0, 0.6) 70%,
        rgba(0, 0, 0, 0.6) 70.5%,
        rgba(0, 0, 0, 0.4) 71.5%,
        rgba(0, 0, 0, 0.2) 73%,
        rgba(0, 0, 0, 0.08) 75%,
        rgba(0, 0, 0, 0.02) 78%,
        transparent 82%
      )`;
  return `
@property --beam-angle-${e} {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: true;
}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
}

[data-beam="${e}"][data-active] {
  animation:
    beam-spin-${e} ${t}s linear infinite,
    beam-fade-in-${e} 0.6s ease forwards;
}

[data-beam="${e}"][data-fading] {
  animation:
    beam-spin-${e} ${t}s linear infinite,
    beam-fade-out-${e} 0.5s ease forwards;
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${m}px;
  padding: ${r}px;
  clip-path: inset(0 round ${a}px);
  background: ${W},${u};
  -webkit-mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${e}) * ${H.toFixed(2)} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${k}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  background: ${Y};
  box-shadow: inset 0 0 9px 1px ${p};
  -webkit-mask-image:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    conic-gradient(
      from var(--beam-angle-${e}),
      transparent 0%, transparent 30%,
      rgba(255, 255, 255, 0.1) 36%, rgba(255, 255, 255, 0.35) 44%,
      white 52%, white 80%,
      rgba(255, 255, 255, 0.35) 86%, rgba(255, 255, 255, 0.1) 92%,
      transparent 95%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${e}) * ${v.toFixed(2)} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  clip-path: inset(0 round ${a}px);
  ${k}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${m}px;
  clip-path: inset(0 round ${a}px);
  background: ${X};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${r}px;
  filter: blur(8px) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)});
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * ${y.toFixed(2)} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
}

@keyframes beam-spin-${e} {
  to { --beam-angle-${e}: 360deg; }
}

@keyframes beam-fade-in-${e} {
  to { --beam-opacity-${e}: 1; }
}

@keyframes beam-fade-out-${e} {
  from { --beam-opacity-${e}: 1; }
  to { --beam-opacity-${e}: 0; }
}
${x}
${B(e)}
`;
}
function ia(o) {
  const {
    id: e,
    borderRadius: a,
    borderWidth: r,
    duration: t,
    strokeOpacity: i,
    innerOpacity: s,
    bloomOpacity: b,
    colorVariant: p,
    staticColors: c,
    brightness: g,
    saturation: n,
    hueRange: l,
    theme: d
  } = o, h = d === "dark", m = p === "mono" ? 0.5 : 1, $ = (i * m).toFixed(2), H = (s * m).toFixed(2), v = (b * m).toFixed(2), { op: y } = ne("pulse-inner", d, t), k = 8, x = g.toFixed(2), f = n.toFixed(2), W = c ? `filter: brightness(${x}) saturate(${f});` : `filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${e}))) brightness(${x}) saturate(${f});`, u = c ? `filter: blur(${k}px) brightness(${x}) saturate(${f});` : `filter: blur(${k}px) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${e}))) brightness(${x}) saturate(${f});`, Y = Ze(p, e), X = _e(p, e, h), w = We(Ke, p, 1 - y * 0.5);
  return `
${Xe(e)}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
  isolation: isolate;
}

[data-beam="${e}"][data-active] {
${Z(e, "beam-fade-in", 0.6)}
}

[data-beam="${e}"][data-fading] {
${Z(e, "beam-fade-out", 0.5)}
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  padding: ${r}px;
  clip-path: inset(0 round ${a}px);
  background: ${Y};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${e}) * ${$} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${W}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  clip-path: inset(0 round ${a}px);
  background: ${X};
  -webkit-mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-over;
  mask-image:
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: add;
  pointer-events: none;
  z-index: 1;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${e}) * ${H} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${W}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  clip-path: inset(0 round ${a}px);
  background: ${w};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  padding: ${r}px;
  pointer-events: none;
  z-index: 3;
  will-change: opacity;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * ${v} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${u}
}

@keyframes beam-fade-in-${e} { to { --beam-opacity-${e}: 1; } }
@keyframes beam-fade-out-${e} { from { --beam-opacity-${e}: 1; } to { --beam-opacity-${e}: 0; } }
${B(e)}

@media (prefers-reduced-motion: reduce) {
  [data-beam="${e}"][data-active],
  [data-beam="${e}"][data-fading],
  [data-beam="${e}"][data-active]::after,
  [data-beam="${e}"][data-fading]::after,
  [data-beam="${e}"][data-active]::before,
  [data-beam="${e}"][data-fading]::before,
  [data-beam="${e}"][data-active] [data-beam-bloom],
  [data-beam="${e}"][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`;
}
function sa(o) {
  const {
    id: e,
    borderRadius: a,
    duration: r,
    strokeOpacity: t,
    innerOpacity: i,
    bloomOpacity: s,
    colorVariant: b,
    staticColors: p,
    brightness: c,
    saturation: g,
    hueRange: n,
    theme: l,
    hairlineOpacity: d = 0
  } = o, h = l === "dark", m = b === "mono" ? 0.5 : 1, $ = (t * m).toFixed(2), H = (i * m).toFixed(2), v = (s * m).toFixed(2), y = h ? "70, 70, 70" : "0, 0, 0", k = d.toFixed(2), x = `linear-gradient(rgba(${y}, ${k}), rgba(${y}, ${k}))`, { op: f } = ne("pulse-outside", l, r), W = 0.95, u = 0.9, Y = h ? 3 : 6, X = h ? 22.5 : 15, w = c.toFixed(2), R = g.toFixed(2), ee = p ? `filter: brightness(${w}) saturate(${R});` : `filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${e}))) brightness(${w}) saturate(${R});`, M = `brightness(var(--beam-glow-brightness, ${w})) saturate(var(--beam-glow-saturate, ${R}))`, T = p ? `filter: blur(var(--beam-core-blur, ${Y}px)) ${M};` : `filter: blur(var(--beam-core-blur, ${Y}px)) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${e}))) ${M};`, ae = p ? `filter: blur(var(--beam-bloom-blur, ${X}px)) ${M};` : `filter: blur(var(--beam-bloom-blur, ${X}px)) hue-rotate(calc(var(--beam-hue-base, 0deg) + var(--beam-hue-${e}))) ${M};`, q = ye(ze, b, e), F = ye(ze, b, e), V = We(Qe, b, 1 - f * 0.5), N = d > 0 ? `${q},
    ${x}` : q;
  return `
${Xe(e)}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: visible;
  isolation: isolate;
}

[data-beam="${e}"][data-active] {
${Z(e, "beam-fade-in", 0.6)}
}

[data-beam="${e}"][data-fading] {
${Z(e, "beam-fade-out", 0.5)}
}
${d > 0 ? `
/* Idle hairline — painted above the (opaque) child in the inner 1px edge ring so
   it overlaps a standard inset component border exactly. */
[data-beam="${e}"]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  padding: 1px;
  clip-path: inset(0 round ${a}px);
  background: ${x};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
}
` : ""}
[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  padding: 1px;
  clip-path: inset(0 round ${a}px);
  background: ${N};
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  mask-composite: exclude;
  pointer-events: none;
  z-index: 2;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${e}) * ${$} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${ee}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: -10px;
  z-index: -1;
  border-radius: ${a + 10}px;
  background: ${F};
  transform: scale(${W}, ${u});
  pointer-events: none;
  will-change: opacity, filter;
  opacity: calc(var(--beam-opacity-${e}) * ${H} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  ${T}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: -30px;
  z-index: -1;
  border-radius: ${a + 30}px;
  background: ${V};
  transform: scale(${W}, ${u});
  pointer-events: none;
  will-change: transform;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * ${v} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${ae}
}

@keyframes beam-fade-in-${e} { to { --beam-opacity-${e}: 1; } }
@keyframes beam-fade-out-${e} { from { --beam-opacity-${e}: 1; } to { --beam-opacity-${e}: 0; } }
${B(e)}

@media (prefers-reduced-motion: reduce) {
  [data-beam="${e}"][data-active],
  [data-beam="${e}"][data-fading],
  [data-beam="${e}"][data-active]::after,
  [data-beam="${e}"][data-fading]::after,
  [data-beam="${e}"][data-active]::before,
  [data-beam="${e}"][data-fading]::before,
  [data-beam="${e}"][data-active] [data-beam-bloom],
  [data-beam="${e}"][data-fading] [data-beam-bloom] {
    animation: none !important;
  }
}
`;
}
function na(o) {
  const {
    id: e,
    borderRadius: a,
    borderWidth: r,
    duration: t,
    strokeOpacity: i,
    innerOpacity: s,
    bloomOpacity: b,
    innerShadow: p,
    colorVariant: c,
    staticColors: g,
    brightness: n,
    saturation: l,
    hueRange: d,
    theme: h
  } = o, m = Math.max(0, a - r), $ = h === "dark", H = i, v = s, y = b, k = g ? "" : `animation: beam-hue-shift-${e} 12s ease-in-out infinite;`, x = g ? "" : `animation: beam-hue-shift-bloom-${e} 8s ease-in-out infinite;`, f = g ? "" : `
@keyframes beam-hue-shift-${e} {
  0% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  50% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) + ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  100% { filter: hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
}

@keyframes beam-hue-shift-bloom-${e} {
  0% { filter: blur(8px) hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d + 10}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  50% { filter: blur(8px) hue-rotate(calc(var(--beam-hue-base, 0deg) + ${d + 10}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
  100% { filter: blur(8px) hue-rotate(calc(var(--beam-hue-base, 0deg) - ${d + 10}deg)) brightness(${n.toFixed(2)}) saturate(${l.toFixed(2)}); }
}`, W = $ ? `radial-gradient(
        ellipse calc(24px * var(--beam-w-${e})) calc(28px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) calc(100% + 2px),
        rgba(255, 255, 255, 0.38) 0%,
        rgba(255, 255, 255, 0.12) 30%,
        transparent 65%
      )` : `radial-gradient(
        ellipse calc(35px * var(--beam-w-${e})) calc(28px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) calc(100% + 2px),
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.25) 35%,
        transparent 70%
      )`, u = Ne(c, $, e), Y = Te(c, e), X = Je(c, $, e), w = c === "mono" ? "filter: blur(6px);" : "";
  return `
@property --beam-x-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

@property --beam-w-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-h-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-spike2-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-edge-${e} {
  syntax: "<number>";
  initial-value: 1;
  inherits: true;
}

@property --beam-opacity-${e} {
  syntax: "<number>";
  initial-value: 0;
  inherits: true;
}

[data-beam="${e}"] {
  position: relative;
  border-radius: ${a}px;
  overflow: hidden;
}

[data-beam="${e}"][data-active] {
  animation:
    beam-travel-${e} ${t}s linear infinite,
    beam-edge-fade-${e} ${t}s linear infinite,
    beam-breathe-${e} ${(t * 1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${e} ${(t * 1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${e} ${(t * 1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-in-${e} 0.6s ease forwards;
}

[data-beam="${e}"][data-fading] {
  animation:
    beam-travel-${e} ${t}s linear infinite,
    beam-edge-fade-${e} ${t}s linear infinite,
    beam-breathe-${e} ${(t * 1.3).toFixed(1)}s ease-in-out infinite,
    beam-spike-${e} ${(t * 1.33).toFixed(1)}s ease-in-out infinite,
    beam-spike2-${e} ${(t * 1.7).toFixed(1)}s ease-in-out infinite,
    beam-fade-out-${e} 0.5s ease forwards;
}

[data-beam="${e}"][data-active]::after,
[data-beam="${e}"][data-fading]::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${m}px;
  padding: ${r}px;
  clip-path: inset(0 round ${a}px);
  background: ${W}, ${u};
  -webkit-mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: source-in, xor;
  mask:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  mask-composite: intersect, exclude;
  pointer-events: none;
  z-index: 2;
  opacity: calc(var(--beam-opacity-${e}) * var(--beam-edge-${e}) * ${H.toFixed(2)} * var(--beam-stroke-opacity, 1) * var(--beam-strength, 1));
  ${k}
}

[data-beam="${e}"][data-active]::before,
[data-beam="${e}"][data-fading]::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: ${a}px;
  background: ${Y};
  box-shadow: inset 0 0 9px 1px ${p};
  -webkit-mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  -webkit-mask-composite: source-in, source-over;
  mask-image:
    radial-gradient(
      ellipse calc(78px * var(--beam-w-${e})) calc(60px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
      white 0%, rgba(255, 255, 255, 0.5) 45%, transparent 100%
    ),
    linear-gradient(white, transparent 28px, transparent calc(100% - 28px), white),
    linear-gradient(to right, white, transparent 28px, transparent calc(100% - 28px), white);
  mask-composite: intersect, add;
  pointer-events: none;
  z-index: 1;
  opacity: calc(var(--beam-opacity-${e}) * var(--beam-edge-${e}) * ${v.toFixed(2)} * var(--beam-inner-opacity, 1) * var(--beam-strength, 1));
  clip-path: inset(0 round ${a}px);
  ${k}
}

[data-beam="${e}"] [data-beam-bloom] {
  display: none;
  position: absolute;
  inset: 0;
  border-radius: ${m}px;
  clip-path: inset(0 round ${a}px);
  padding: 0;
  -webkit-mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${e})) calc(110px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  -webkit-mask-composite: source-over;
  mask: radial-gradient(
    ellipse calc(84px * var(--beam-w-${e})) calc(110px * var(--beam-h-${e})) at calc(var(--beam-x-${e}) * 100%) 100%,
    white 0%, rgba(255, 255, 255, 0.5) 35%, transparent 100%
  );
  mask-composite: add;
  background: ${X};
  ${w}
  pointer-events: none;
  z-index: 3;
  opacity: 0;
}

[data-beam="${e}"][data-active] [data-beam-bloom],
[data-beam="${e}"][data-fading] [data-beam-bloom] {
  display: block;
  opacity: calc(var(--beam-opacity-${e}) * var(--beam-edge-${e}) * ${y.toFixed(2)} * var(--beam-bloom-opacity, 1) * var(--beam-strength, 1));
  ${x}
}

@keyframes beam-travel-${e} {
  0%   { --beam-x-${e}: 0.06;  --beam-w-${e}: 0.5; }
  10%  { --beam-x-${e}: 0.15;  --beam-w-${e}: 0.8; }
  20%  { --beam-x-${e}: 0.25;  --beam-w-${e}: 1.1; }
  30%  { --beam-x-${e}: 0.35;  --beam-w-${e}: 1.3; }
  40%  { --beam-x-${e}: 0.44;  --beam-w-${e}: 1.45; }
  50%  { --beam-x-${e}: 0.5;   --beam-w-${e}: 1.5; }
  60%  { --beam-x-${e}: 0.56;  --beam-w-${e}: 1.45; }
  70%  { --beam-x-${e}: 0.65;  --beam-w-${e}: 1.3; }
  80%  { --beam-x-${e}: 0.75;  --beam-w-${e}: 1.1; }
  90%  { --beam-x-${e}: 0.85;  --beam-w-${e}: 0.8; }
  100% { --beam-x-${e}: 0.94;  --beam-w-${e}: 0.5; }
}

@keyframes beam-edge-fade-${e} {
  0%    { --beam-edge-${e}: 0; }
  12.5% { --beam-edge-${e}: 0; }
  32.5% { --beam-edge-${e}: 1; }
  67.5% { --beam-edge-${e}: 1; }
  87.5% { --beam-edge-${e}: 0; }
  100%  { --beam-edge-${e}: 0; }
}

@keyframes beam-breathe-${e} {
  0%, 100% { --beam-h-${e}: 0.8; }
  25%      { --beam-h-${e}: 1.25; }
  55%      { --beam-h-${e}: 0.85; }
  80%      { --beam-h-${e}: 1.3; }
}

@keyframes beam-spike-${e} {
  0%   { --beam-spike-${e}: 0.8; }
  25%  { --beam-spike-${e}: 1.3; }
  50%  { --beam-spike-${e}: 0.9; }
  75%  { --beam-spike-${e}: 1.4; }
  100% { --beam-spike-${e}: 0.8; }
}

@keyframes beam-spike2-${e} {
  0%   { --beam-spike2-${e}: 1.2; }
  25%  { --beam-spike2-${e}: 0.7; }
  50%  { --beam-spike2-${e}: 1.4; }
  75%  { --beam-spike2-${e}: 0.8; }
  100% { --beam-spike2-${e}: 1.2; }
}

@keyframes beam-fade-in-${e} {
  to { --beam-opacity-${e}: 1; }
}

@keyframes beam-fade-out-${e} {
  from { --beam-opacity-${e}: 1; }
  to { --beam-opacity-${e}: 0; }
}
${f}
${B(e)}
`;
}
const _ = /* @__PURE__ */ new Set();
let P = null, ie = 0;
const ba = 1e3 / 30 - 2, pa = Math.PI * 2;
function ve(o) {
  return (1 - Math.cos(pa * o)) / 2;
}
function Ye(o) {
  if (P = requestAnimationFrame(Ye), o - ie < ba) return;
  ie = o;
  const e = o / 1e3;
  _.forEach(({ el: a, config: r }) => {
    for (const t of r.oscillators) {
      const i = (e - t.delay) / t.period, s = t.a + (t.b - t.a) * ve(i);
      a.style.setProperty(
        t.prop,
        t.unit === "px" ? `${s.toFixed(2)}px` : s.toFixed(4)
      );
    }
    if (r.hue) {
      const { prop: t, range: i, period: s, continuous: b } = r.hue, p = b ? e / s % 1 * i : -i + 2 * i * ve(e / s);
      a.style.setProperty(t, `${p.toFixed(2)}deg`);
    }
  });
}
function ca() {
  P == null && (ie = 0, P = requestAnimationFrame(Ye));
}
function la() {
  _.size === 0 && P != null && (cancelAnimationFrame(P), P = null);
}
function da(o, e) {
  const a = { el: o, config: e };
  return _.add(a), ca(), () => {
    _.delete(a), la();
  };
}
function fa() {
  const [o, e] = I(() => typeof window > "u" || window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  return A(() => {
    if (typeof window > "u") return;
    const a = window.matchMedia("(prefers-color-scheme: dark)"), r = (t) => {
      e(t.matches ? "dark" : "light");
    };
    return a.addEventListener("change", r), () => a.removeEventListener("change", r);
  }, []), o;
}
function ga(o, e) {
  return o === "auto" ? e : o;
}
const xa = Re(
  function({
    children: o,
    size: e = "md",
    colorVariant: a = "colorful",
    theme: r = "dark",
    staticColors: t = !1,
    duration: i,
    active: s = !0,
    borderRadius: b,
    brightness: p,
    saturation: c,
    hueRange: g = 30,
    strength: n = 1,
    className: l,
    style: d,
    onActivate: h,
    onDeactivate: m,
    onAnimationEnd: $,
    ...H
  }, v) {
    const y = Me().replace(/:/g, "-"), k = fa(), x = Se(null), [f, W] = I(s), [u, Y] = I(!1), [X, w] = I(!0), [R, ee] = I(null), [M, T] = I({ x: 1, y: 1 });
    A(() => {
      if (b != null) return;
      const z = x.current;
      if (!z) return;
      const O = () => {
        const L = z.firstElementChild;
        if (!L) return;
        const oe = getComputedStyle(L), E = parseFloat(oe.borderTopLeftRadius);
        !isNaN(E) && E > 0 && ee(E);
      };
      O();
      const C = new MutationObserver(O);
      return C.observe(z, { childList: !0, subtree: !1 }), () => C.disconnect();
    }, [b, o]), A(() => {
      s && !f && !u ? W(!0) : !s && f && !u && Y(!0);
    }, [s, f, u]), A(() => {
      const z = x.current;
      if (!z || typeof IntersectionObserver > "u") return;
      const O = new IntersectionObserver(
        (C) => {
          for (const L of C) w(L.isIntersecting);
        },
        // Start animating slightly before the element scrolls into view.
        { rootMargin: "256px" }
      );
      return O.observe(z), () => O.disconnect();
    }, []), A(() => {
      if (e !== "pulse-outside") {
        T({ x: 1, y: 1 });
        return;
      }
      const z = x.current;
      if (!z) return;
      const O = 350, C = 140, L = 0.35, oe = 4, E = (K) => Math.max(L, Math.min(oe, K)), le = () => {
        const K = z.firstElementChild;
        if (!K) return;
        const Q = K.getBoundingClientRect();
        if (!Q.width || !Q.height) return;
        const ge = +E(Q.width / O).toFixed(3), me = +E(Q.height / C).toFixed(3);
        T((te) => te.x === ge && te.y === me ? te : { x: ge, y: me });
      };
      if (le(), typeof ResizeObserver > "u") return;
      const de = z.firstElementChild;
      if (!de) return;
      const fe = new ResizeObserver(le);
      return fe.observe(de), () => fe.disconnect();
    }, [e, o]);
    const ae = ue(
      (z) => {
        const O = z.animationName;
        O.includes("fade-out") ? (W(!1), Y(!1), m == null || m()) : O.includes("fade-in") && (h == null || h()), $ == null || $(z);
      },
      [h, m, $]
    ), q = ga(r, k), F = Ce[e][q], V = je[e], N = e === "pulse-inner" || e === "pulse-outside", be = b ?? R ?? V.borderRadius, D = i ?? (e === "line" ? 3.1 : N ? 2.3 : 1.96), pe = c ?? F.saturation, ce = p ?? F.brightness ?? 1.3, J = e === "line" ? Math.min(g, 13) : g, G = a === "mono" ? !0 : t, He = he(
      () => ra({
        id: y,
        borderRadius: be,
        borderWidth: V.borderWidth,
        duration: D,
        strokeOpacity: F.strokeOpacity,
        innerOpacity: F.innerOpacity,
        bloomOpacity: F.bloomOpacity,
        innerShadow: F.innerShadow,
        size: e,
        colorVariant: a,
        staticColors: G,
        brightness: ce,
        saturation: pe,
        hueRange: J,
        theme: q,
        hairlineOpacity: F.hairlineOpacity
      }),
      [
        y,
        be,
        V.borderWidth,
        D,
        F.strokeOpacity,
        F.innerOpacity,
        F.bloomOpacity,
        F.innerShadow,
        F.hairlineOpacity,
        e,
        a,
        G,
        ce,
        pe,
        J,
        q
      ]
    ), re = he(
      () => N ? aa(e, q, D, J, G, y) : null,
      [N, e, q, D, J, G, y]
    );
    A(() => {
      var z;
      if (!re || !(f || u) || !X) return;
      const O = x.current;
      if (O && !(typeof window < "u" && (z = window.matchMedia) != null && z.call(window, "(prefers-reduced-motion: reduce)").matches))
        return da(O, re);
    }, [re, f, u, X]);
    const Fe = ue(
      (z) => {
        x.current = z, typeof v == "function" ? v(z) : v && (v.current = z);
      },
      [v]
    ), Oe = {
      ...d ?? {},
      "--beam-strength": Math.max(0, Math.min(1, n)),
      ...e === "pulse-outside" ? { "--pulse-glow-sx": M.x, "--pulse-glow-sy": M.y } : {}
    };
    return /* @__PURE__ */ $e(qe, { children: [
      /* @__PURE__ */ xe("style", { children: He }),
      /* @__PURE__ */ $e(
        "div",
        {
          ...H,
          ref: Fe,
          "data-beam": y,
          "data-active": f && !u ? "" : void 0,
          "data-fading": u ? "" : void 0,
          "data-paused": f && !u && !X ? "" : void 0,
          className: l,
          style: Oe,
          onAnimationEnd: ae,
          children: [
            o,
            /* @__PURE__ */ xe("div", { "data-beam-bloom": !0 })
          ]
        }
      )
    ] });
  }
);
export {
  xa as BorderBeam,
  xa as default,
  je as sizePresets,
  Ce as sizeThemePresets
};
