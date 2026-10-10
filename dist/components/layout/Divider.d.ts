import * as Separator from "@radix-ui/react-separator";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
export type DividerSpacing = "none" | "compact" | "default";
export interface DividerProps extends Omit<ComponentPropsWithoutRef<typeof Separator.Root>, "children"> {
    orientation?: "horizontal" | "vertical";
    /** `false` when the rule separates genuinely distinct groups; leave `true` for visual rhythm. */
    decorative?: boolean;
    /** `"hairline"` (default) is the border colour; `"strong"` is border-strong, for a heavier break. */
    strength?: "hairline" | "strong";
    /** Block margin on a horizontal rule (`compact` 8, `default` 16), inline margin on a vertical one (4, 8). */
    spacing?: DividerSpacing;
    /** Label sitting on the rule: 13/18 500 ink-2, sentence case, 12 from each line. Ignored when `orientation="vertical"` (as in Ant).
     *  Note: `asChild` is ignored while `children` is set — the labelled rule is a plain row. */
    children?: ReactNode;
    labelPlacement?: "start" | "center" | "end";
}
/**
 * Anything the component already sets (colour, size, margin) loses to its own
 * utilities regardless of class order — UnoCSS decides by stylesheet order, not
 * attribute order. Use the props above, or the important prefix: `className="bg-border-strong!"`.
 */
export declare function Divider({ orientation, decorative, strength, spacing, labelPlacement, children, className, asChild, ...rest }: DividerProps): import("react").JSX.Element;
//# sourceMappingURL=Divider.d.ts.map