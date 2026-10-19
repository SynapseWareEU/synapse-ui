import type { CSSProperties, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface WatermarkProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  /** Mark text. An array stacks as one line per item. */
  content?: string | string[];
  /** Minimum tile size in px. The tile grows past this when the text needs it. */
  gap?: [number, number];
  rotate?: number;
  /** Where the first tile starts, in px. Defaults to half the gap, like Ant's. */
  offset?: [number, number];
  children?: ReactNode;
}

/* Plex Sans 13 400 on an 18 line, no letter-spacing, ink at 6% (spec §4.4). */
const FONT_SIZE = 13;
const LINE_HEIGHT = 18;
const PAD = 16;
const OPACITY = 0.06;
/* Average advance of a proportional sans at 1em. The tile only grows from it, never clips. */
const ADVANCE = 0.6;
/* An SVG used as an image cannot load the page's web fonts, so this names the face and falls
   back to the system sans when IBM Plex Sans is not installed locally. */
const FONT_FAMILY = "IBM Plex Sans, system-ui, -apple-system, Segoe UI, Roboto, sans-serif";

const escapeXml = (s: string) =>
  s.replace(/[<>&']/g, (c) => `&#${c.charCodeAt(0)};`);

export function Watermark({
  content = "Watermark",
  gap = [120, 120],
  rotate = -22,
  offset,
  className,
  children,
  style,
  ...rest
}: WatermarkProps) {
  const raw = Array.isArray(content) ? content : [content];
  const lines = raw.map(escapeXml);

  // ponytail: advance-width heuristic instead of canvas measureText — keeps the
  // component pure/SSR-safe. Swap in ctx.measureText if a face ever overflows.
  const longest = raw.reduce((n, l) => Math.max(n, l.length), 0);
  const textW = longest * FONT_SIZE * ADVANCE;
  const textH = lines.length * LINE_HEIGHT;
  const rad = (rotate * Math.PI) / 180;
  const cos = Math.abs(Math.cos(rad));
  const sin = Math.abs(Math.sin(rad));
  const w = Math.ceil(
    Math.max(gap[0], 1, textW * cos + textH * sin + PAD),
  );
  const h = Math.ceil(
    Math.max(gap[1], 1, textW * sin + textH * cos + PAD),
  );

  const dy0 = -((lines.length - 1) * LINE_HEIGHT) / 2;
  const tspans = lines
    .map(
      (line, i) =>
        `<tspan x='50%' dy='${i === 0 ? dy0 : LINE_HEIGHT}'>${line}</tspan>`,
    )
    .join("");
  const tile = `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'><text x='50%' y='50%' fill='black' font-size='${FONT_SIZE}' font-weight='400' font-family='${FONT_FAMILY}' transform='rotate(${rotate} ${w / 2} ${h / 2})' text-anchor='middle' dominant-baseline='middle'>${tspans}</text></svg>`,
  )}")`;
  const [ox, oy] = offset ?? [gap[0] / 2, gap[1] / 2];

  const markStyle: CSSProperties = {
    WebkitMaskImage: tile,
    maskImage: tile,
    WebkitMaskRepeat: "repeat",
    maskRepeat: "repeat",
    WebkitMaskPosition: `${ox}px ${oy}px`,
    maskPosition: `${ox}px ${oy}px`,
    // The SVG is only a mask (its black is the alpha channel); the colour is the ink token.
    backgroundColor: "var(--su-ink)",
    opacity: OPACITY,
    pointerEvents: "none",
  };

  return (
    <div className={cn("relative", className)} style={style} {...rest}>
      <div className="absolute inset-0" style={markStyle} aria-hidden="true" />
      <div className="relative">{children}</div>
    </div>
  );
}
