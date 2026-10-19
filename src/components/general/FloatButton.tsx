import { forwardRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Button, type ButtonProps } from "./Button";

export type FloatButtonPlacement =
  | "bottom-right"
  | "bottom-left"
  | "bottom-center";

export interface FloatButtonProps
  extends Omit<ButtonProps, "variant" | "size" | "type"> {
  /** Corner to pin to. Left/right are reading-direction relative (they flip in RTL). */
  placement?: FloatButtonPlacement;
  /**
   * `default`: an overlay surface with a hairline and an ink-2 icon. `primary`: the action fill
   * with a white icon, for the one action the screen exists for.
   */
  variant?: "default" | "primary";
  icon?: ReactNode;
  /**
   * Mouse-hover hint; also names the button when it has no visible label.
   * For a tooltip that works on keyboard and touch, wrap in `<Tooltip content="…">`.
   */
  tooltip?: string;
}

// 24 from the viewport edges (logical, so the corner follows reading direction); the bottom
// offset also clears the iOS home indicator (needs `viewport-fit=cover` in the host app).
const bottomInset =
  "bottom-[max(var(--su-space-6),env(safe-area-inset-bottom,0px))]";

const placementClass: Record<FloatButtonPlacement, string> = {
  "bottom-right": `end-su6 ${bottomInset}`,
  "bottom-left": `start-su6 ${bottomInset}`,
  "bottom-center": `left-1/2 -translate-x-1/2 ${bottomInset}`,
};

/* The float skin re-points Button's variables from a selector that outranks the variant's own
   (and steps aside when disabled or pressed, so those states still read). */
const floatSkin =
  "[&:not(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-surface-overlay)] " +
  "[&:not(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-border)]";

/**
 * Floating action button (v2 §4.1, derived): 48×48, radius 8, overlay surface with a 1px
 * border and the overlay shadow, icon 20 in ink-2; `variant="primary"` puts it on the action
 * fill. Pinned 24 from the viewport edges so an action stays reachable while the page
 * scrolls. A normal Button belongs in document flow.
 *
 * Renders in place, not through a portal — a `transform`, `filter`, `backdrop-filter`
 * or `contain` on any ancestor becomes the containing block and the button will pin
 * to that element instead of the viewport. Mount it near the app root.
 */
export const FloatButton = forwardRef<HTMLButtonElement, FloatButtonProps>(
  function FloatButton(
    {
      placement = "bottom-right",
      variant = "default",
      icon,
      className,
      children,
      tooltip,
      ...rest
    },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        variant={variant}
        size="lg"
        icon={icon}
        // Never overwrite a visible label (WCAG 2.5.3 Label in Name).
        aria-label={children == null || children === false ? tooltip : undefined}
        title={tooltip}
        className={cn(
          // `!` — Button sets `relative`, its own radius and its icon-only box, and UnoCSS
          // decides which of two equal-specificity utilities wins by sheet order.
          "!fixed z-[var(--su-z-float)] max-w-[calc(100vw_-_2_*_var(--su-space-6))]",
          "![--su-btn-box:var(--su-control-lg)] !rounded-su-surface shadow-su-overlay",
          variant === "default" && floatSkin,
          // A labelled lg Button spans the screen on handheld; a floating one never does.
          children != null && children !== false && "[[data-density=handheld]_&]:!w-max",
          "animate-su-rise-in motion-reduce:animate-none",
          placementClass[placement],
          className,
        )}
        {...rest}
      >
        {children}
      </Button>
    );
  },
);
