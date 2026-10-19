import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface KbdProps extends HTMLAttributes<HTMLElement> {
  /** The key or chord as it is printed on the keyboard: "Ctrl K", "Esc", "Enter", "↑". */
  children?: ReactNode;
}

/** A lone arrow glyph gets the narrow 4px inset (§4.8). */
const arrowRe = /^[←↑→↓]$/;

/**
 * Key hint (v2 §4.8): 20 tall, 4 radius, fill ground, 12/16 500 sans in ink-2. Sans, not mono —
 * a key name is a label, not an identifier. Renders a native `<kbd>`, so a chord stays one
 * hint ("Ctrl K"); nest two `Kbd`s only when the keys are pressed separately.
 */
export const Kbd = forwardRef<HTMLElement, KbdProps>(function Kbd(
  { className, children, ...rest },
  ref,
) {
  const glyph = typeof children === "string" && arrowRe.test(children.trim());
  return (
    <kbd
      ref={ref}
      className={cn(
        "box-border inline-flex h-[20px] shrink-0 items-center justify-center whitespace-nowrap",
        "rounded-su-tag bg-fill font-sans text-micro font-medium text-ink-2 not-italic",
        // Forced colours drop the fill; a hairline keeps the key visible.
        "forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
        glyph ? "px-[4px]" : "px-[6px]",
        className,
      )}
      {...rest}
    >
      {children}
    </kbd>
  );
});
