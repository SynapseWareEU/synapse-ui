import { useMemo, type HTMLAttributes, type ReactNode } from "react";
import qrcode from "qrcode-generator";
import { cn } from "../../utils/cn";

export interface QRCodeProps extends HTMLAttributes<HTMLDivElement> {
  value: string;
  /** Side of the code itself, in px. The frame adds its 8px padding and hairline around it. */
  size?: number;
  fg?: string;
  bg?: string;
  /** Optional line under the code, usually the encoded identifier. Set in mono 13/18 ink-2. */
  caption?: ReactNode;
}

/**
 * v2 frame: surface, 1px border, radius 8, padding 8. The code keeps its own 4-module quiet
 * zone inside the SVG, so it scans no matter what the frame's background is.
 */
export function QRCode({
  value,
  size = 160,
  // The code itself stays dark-on-light in both appearances for scan reliability; only its
  // frame follows the theme. The defaults are the light-appearance --su-ink / --su-surface
  // written out, because the tokens flip in dark mode; override via fg/bg.
  fg = "#111418",
  bg = "#ffffff",
  caption,
  className,
  style,
  ...rest
}: QRCodeProps) {
  const code = useMemo(() => {
    try {
      const qr = qrcode(0, "M");
      qr.addData(Array.from(new TextEncoder().encode(value), byte => String.fromCharCode(byte)).join(""), "Byte");
      qr.make();
      const count = qr.getModuleCount();
      const cells: string[] = [];
      for (let row = 0; row < count; row++) {
        for (let col = 0; col < count; col++) {
          if (qr.isDark(row, col)) cells.push(`M${col + 4},${row + 4}h1v1h-1z`);
        }
      }
      return { modules: count + 8, path: cells.join("") };
    } catch {
      // qrcode-generator throws a bare string when the value overflows the
      // capacity of version 40 at error level M.
      // ponytail: one fallback for every encode failure; split by reason if a
      // caller ever needs to tell "too long" from something else.
      return null;
    }
  }, [value]);
  const frameClass =
    "inline-flex flex-col items-center gap-su2 p-su2 rounded-su-surface border border-solid border-border bg-surface";
  const captionNode =
    caption != null ? (
      <span
        className="block text-center font-mono text-small text-ink-2 [overflow-wrap:anywhere]"
        style={{ maxWidth: size }}
      >
        {caption}
      </span>
    ) : null;
  if (!code)
    return (
      <div className={cn(frameClass, className)} style={style} {...rest}>
        <div
          className="flex items-center justify-center p-su2 text-center font-sans text-small text-ink-2"
          style={{ width: size, height: size }}
          role="img"
          aria-label="QR code unavailable: value too long to encode"
        >
          Value too long to encode
        </div>
        {captionNode}
      </div>
    );
  const { modules, path } = code;
  return (
    <div className={cn(frameClass, className)} style={style} {...rest}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${modules} ${modules}`}
        shapeRendering="crispEdges"
        role="img"
        aria-label={`QR code for ${value}`}
        className="block shrink-0"
      >
        <rect width={modules} height={modules} fill={bg} />
        <path d={path} fill={fg} />
      </svg>
      {captionNode}
    </div>
  );
}
