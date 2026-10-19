import {
  useId,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../utils/cn";

export interface SplitterProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical";
  defaultSize?: number;
  /** Controlled size (percent of the first pane). Falls back to internal state when omitted. */
  size?: number;
  /** Fired with the clamped size on every drag/keyboard change. */
  onSizeChange?: (size: number) => void;
  min?: number;
  max?: number;
  first?: ReactNode;
  second?: ReactNode;
  /** Accessible name of the separator. */
  separatorLabel?: string;
  /** Panes are `first`/`second`; children never render. */
  children?: never;
  /** React 19 forwards `ref` as an ordinary prop; merged with the internal one. */
  ref?: Ref<HTMLDivElement>;
}

const paneClass = "overflow-auto bg-surface";

export function Splitter({
  direction = "horizontal",
  defaultSize = 50,
  size: sizeProp,
  onSizeChange,
  min = 20,
  max = 80,
  first,
  second,
  separatorLabel = "Resize panes",
  className,
  ref,
  ...rest
}: SplitterProps) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n));
  const [internal, setInternal] = useState(() => clamp(defaultSize));
  const root = useRef<HTMLDivElement | null>(null);
  const grab = useRef(0);
  const grabbedSize = useRef(0);
  const paneId = useId();
  const isH = direction === "horizontal";
  const resizable = min < max;
  // Clamped at render so a later min/max change can never emit an out-of-range aria-valuenow.
  const size = clamp(sizeProp ?? internal);

  const commit = (next: number) => {
    const value = clamp(next);
    if (sizeProp === undefined) setInternal(value);
    onSizeChange?.(value);
  };
  const isRtl = () =>
    isH && !!root.current && getComputedStyle(root.current).direction === "rtl";

  return (
    <div
      ref={(node) => {
        root.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(
        // A panel: surface, 1px border, radius 8 (overflow-hidden keeps the panes inside the corners).
        "flex w-full h-full su-panel",
        isH ? "flex-row" : "flex-col",
        className,
      )}
      {...rest}
    >
      <div
        id={paneId}
        className={paneClass}
        style={isH ? { width: `${size}%` } : { height: `${size}%` }}
      >
        {first}
      </div>
      <div
        className={cn(
          // An 8-wide handle around a 1px border line. On desk the 8px is the target; touch
          // screens get a 44px hit pad from the `after:` overlay.
          // ponytail: on touch the overlay eats pointer events 18px into each pane (a pane
          // scrollbar hugging the divider included).
          "relative z-1 shrink-0 flex items-center justify-center touch-none",
          "su-focus-ring",
          "before:content-[''] before:absolute before:bg-border forced-colors:before:bg-[CanvasText] before:[transition:background-color_var(--su-duration-fast)_var(--su-ease-out),width_var(--su-duration-fast)_var(--su-ease-out),height_var(--su-duration-fast)_var(--su-ease-out)] motion-reduce:before:transition-none",
          "[@media(hover:none)]:after:content-[''] [@media(hover:none)]:after:absolute",
          isH
            ? "w-[var(--su-space-2)] min-w-[var(--su-space-2)] before:top-0 before:bottom-0 before:left-1/2 before:w-px before:-translate-x-1/2 [@media(hover:none)]:after:top-0 [@media(hover:none)]:after:bottom-0 [@media(hover:none)]:after:left-[-18px] [@media(hover:none)]:after:right-[-18px]"
            : "h-[var(--su-space-2)] min-h-[var(--su-space-2)] before:left-0 before:right-0 before:top-1/2 before:h-px before:-translate-y-1/2 [@media(hover:none)]:after:left-0 [@media(hover:none)]:after:right-0 [@media(hover:none)]:after:top-[-18px] [@media(hover:none)]:after:bottom-[-18px]",
          // Hover or drag: the line becomes a 2px action line. Focus: the outline.
          resizable
            ? cn(
                isH ? "cursor-col-resize" : "cursor-row-resize",
                "[@media(hover:hover)]:hover:before:bg-action active:before:bg-action forced-colors:active:before:bg-[Highlight]",
                isH
                  ? "[@media(hover:hover)]:hover:before:w-[2px] active:before:w-[2px]"
                  : "[@media(hover:hover)]:hover:before:h-[2px] active:before:h-[2px]",
              )
            : "cursor-default",
        )}
        role="separator"
        tabIndex={resizable ? 0 : undefined}
        aria-label={separatorLabel}
        aria-controls={paneId}
        aria-disabled={resizable ? undefined : true}
        aria-orientation={isH ? "vertical" : "horizontal"}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={Math.round(size)}
        aria-valuetext={`${Math.round(size)}%`}
        onPointerDown={(e) => {
          if (!resizable || (e.pointerType === "mouse" && e.button !== 0))
            return;
          e.preventDefault();
          e.currentTarget.focus();
          e.currentTarget.setPointerCapture(e.pointerId);
          grab.current = isH ? e.clientX : e.clientY;
          grabbedSize.current = size;
        }}
        onPointerMove={(e) => {
          if (!e.currentTarget.hasPointerCapture(e.pointerId) || !root.current)
            return;
          const r = root.current.getBoundingClientRect();
          const extent = isH ? r.width : r.height;
          if (!extent) return;
          const delta =
            ((isH ? e.clientX : e.clientY) - grab.current) * (isRtl() ? -1 : 1);
          commit(grabbedSize.current + (delta / extent) * 100);
        }}
        onPointerUp={(e) => {
          if (e.currentTarget.hasPointerCapture(e.pointerId))
            e.currentTarget.releasePointerCapture(e.pointerId);
        }}
        onDoubleClick={() => resizable && commit(defaultSize)}
        onKeyDown={(e) => {
          if (!resizable) return;
          const rtl = isRtl();
          const decrease = isH ? (rtl ? "ArrowRight" : "ArrowLeft") : "ArrowUp";
          const increase = isH ? (rtl ? "ArrowLeft" : "ArrowRight") : "ArrowDown";
          const keys = [decrease, increase, "Home", "End", "PageUp", "PageDown"];
          if (!keys.includes(e.key)) return;
          e.preventDefault();
          const step = e.key === "PageUp" || e.key === "PageDown" ? 10 : 2;
          const grow = e.key === increase || e.key === "PageDown";
          commit(
            e.key === "Home"
              ? min
              : e.key === "End"
                ? max
                : size + (grow ? step : -step),
          );
        }}
      />
      <div className={cn(paneClass, "flex-1")}>{second}</div>
    </div>
  );
}
