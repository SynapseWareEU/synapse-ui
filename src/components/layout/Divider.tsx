import * as Separator from "@radix-ui/react-separator";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type DividerSpacing = "none" | "compact" | "default";

export interface DividerProps
  extends Omit<ComponentPropsWithoutRef<typeof Separator.Root>, "children"> {
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

const blockSpacing: Record<DividerSpacing, string> = {
  none: "",
  compact: "my-su2",
  default: "my-su4",
};

const inlineSpacing: Record<DividerSpacing, string> = {
  none: "",
  compact: "mx-su1",
  default: "mx-su2",
};

/**
 * Anything the component already sets (colour, size, margin) loses to its own
 * utilities regardless of class order — UnoCSS decides by stylesheet order, not
 * attribute order. Use the props above, or the important prefix: `className="bg-border-strong!"`.
 */
export function Divider({
  orientation = "horizontal",
  decorative = true,
  strength = "hairline",
  spacing = "default",
  labelPlacement = "center",
  children,
  className,
  asChild,
  ...rest
}: DividerProps) {
  const rule = cn(
    "shrink-0 forced-colors:bg-[CanvasText]",
    strength === "strong" ? "bg-border-strong" : "bg-border",
  );

  if (children != null && children !== false && orientation === "horizontal") {
    // Not a Separator.Root: ARIA skips the contents of role="separator", so the
    // label would go unannounced. A plain row with aria-hidden rails reads correctly.
    return (
      <div
        className={cn(
          "flex items-center gap-su3",
          blockSpacing[spacing],
          className,
        )}
        {...rest}
      >
        <span
          aria-hidden
          className={cn(
            rule,
            "h-px",
            labelPlacement === "start" ? "w-[var(--su-space-2)]" : "flex-1",
          )}
        />
        <span className="su-label whitespace-nowrap">
          {children}
        </span>
        <span
          aria-hidden
          className={cn(rule, "h-px", labelPlacement === "end" ? "w-[var(--su-space-2)]" : "flex-1")}
        />
      </div>
    );
  }

  return (
    <Separator.Root
      asChild={asChild}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        rule,
        orientation === "vertical"
          ? cn(
              // 1×20, centred on the line it separates (header, toolbar).
              "w-px h-[20px] self-center inline-block align-middle",
              inlineSpacing[spacing],
            )
          : cn("h-px w-full", blockSpacing[spacing]),
        className,
      )}
      {...rest}
    />
  );
}
