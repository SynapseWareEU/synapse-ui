import { type HTMLAttributes, type ReactNode } from "react";
import type { SlotSpinnerSize } from "../general/SlotSpinner";
export interface SpinProps extends HTMLAttributes<HTMLDivElement> {
    spinning?: boolean;
    /** 13/18 ink-2, sentence case, 8 after the ring. */
    tip?: ReactNode;
    /** Ring diameter: `sm` 14 · `md` 16 (default) · `lg` 20, or a px number (e.g. 24). */
    size?: SlotSpinnerSize | number;
    /** Milliseconds to wait before showing the indicator, so fast loads never flash one. */
    delay?: number;
    children?: ReactNode;
}
/**
 * Loading indicator. Alone, it is the ring plus an optional tip. Wrapped around content, the
 * content goes inert under an opaque surface veil that carries the ring (the content is never
 * shown dimmed).
 */
export declare function Spin({ spinning, tip, size, delay, className, children, ...rest }: SpinProps): import("react").JSX.Element;
//# sourceMappingURL=Spin.d.ts.map