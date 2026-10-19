import { type ReactNode } from "react";
import { type ButtonProps } from "./Button";
export type FloatButtonPlacement = "bottom-right" | "bottom-left" | "bottom-center";
export interface FloatButtonProps extends Omit<ButtonProps, "variant" | "size" | "type"> {
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
export declare const FloatButton: import("react").ForwardRefExoticComponent<FloatButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=FloatButton.d.ts.map