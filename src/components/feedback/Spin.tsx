import { useEffect, useState, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
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

const RING_PX: Record<SlotSpinnerSize, number> = { sm: 14, md: 16, lg: 20 };

/**
 * Ring spinner (spec §4.4): a 2px stroke, the track in the border colour and a quarter arc in
 * `currentColor` (ink-2 here; white inside a primary). One turn every 800ms, linear; a static
 * arc under reduced motion.
 */
function Ring({ px }: { px: number }) {
  const c = px / 2;
  const r = (px - 2) / 2;
  return (
    <svg
      width={px}
      height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      aria-hidden="true"
      className="shrink-0 animate-spin animate-duration-[800ms] motion-reduce:animate-none"
    >
      <circle cx={c} cy={c} r={r} strokeWidth={2} className="stroke-border" />
      <circle
        cx={c}
        cy={c}
        r={r}
        strokeWidth={2}
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="25 75"
        className="stroke-current"
      />
    </svg>
  );
}

/**
 * Loading indicator. Alone, it is the ring plus an optional tip. Wrapped around content, the
 * content goes inert under an opaque surface veil that carries the ring (the content is never
 * shown dimmed).
 */
export function Spin({
  spinning = true,
  tip,
  size = "md",
  delay,
  className,
  children,
  ...rest
}: SpinProps) {
  const [show, setShow] = useState(!delay);
  useEffect(() => {
    if (!delay) {
      setShow(true);
      return;
    }
    if (!spinning) {
      setShow(false);
      return;
    }
    const id = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(id);
  }, [spinning, delay]);

  const active = spinning && show;
  const px = typeof size === "number" ? size : RING_PX[size];

  const indicator = (
    <>
      <Ring px={px} />
      {tip ? (
        <span className="text-small text-ink-2">{tip}</span>
      ) : (
        <span className="sr-only">Loading</span>
      )}
    </>
  );

  if (!children) {
    return (
      <div
        className={cn("inline-flex items-center justify-center gap-su2 font-sans text-ink-2", className)}
        role="status"
        aria-live="polite"
        aria-busy={active || undefined}
        {...rest}
      >
        {active ? indicator : null}
      </div>
    );
  }

  return (
    <div
      className={cn("relative", className)}
      aria-busy={active || undefined}
      {...rest}
    >
      {/* inert covers pointer, selection and tab order natively; the opaque
          veil below covers the visuals, so no dimming class is needed. */}
      <div inert={active || undefined}>{children}</div>
      {active ? (
        <div
          className="absolute inset-0 z-[1] flex items-center justify-center gap-su2 rounded-[inherit] bg-surface font-sans text-ink-2"
          role="status"
          aria-live="polite"
        >
          {indicator}
        </div>
      ) : null}
    </div>
  );
}
