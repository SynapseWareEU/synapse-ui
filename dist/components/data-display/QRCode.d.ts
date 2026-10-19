import { type HTMLAttributes, type ReactNode } from "react";
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
export declare function QRCode({ value, size, fg, bg, caption, className, style, ...rest }: QRCodeProps): import("react").JSX.Element;
//# sourceMappingURL=QRCode.d.ts.map