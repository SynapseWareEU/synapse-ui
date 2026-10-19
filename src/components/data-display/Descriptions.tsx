import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface DescriptionItem {
  label: ReactNode;
  value?: ReactNode;
  span?: number;
}

export interface DescriptionsProps extends Omit<HTMLAttributes<HTMLDListElement>, "title"> {
  /** 14/20 600 ink, 12 above the items. */
  title?: ReactNode;
  /** Right-aligned action beside the title (same idiom as Card). */
  extra?: ReactNode;
  items: DescriptionItem[];
  column?: number;
  /** Boxed as a card: surface, 1px border, radius 8, padding 16. */
  bordered?: boolean;
  /**
   * `vertical` (default): the read-out, label 13/18 500 ink-2 above the value 14/20 ink, 4 apart,
   * items 16 apart. `horizontal`: the label in a 160 column, rows 32.
   */
  layout?: "vertical" | "horizontal";
}

export function Descriptions({
  title,
  extra,
  items,
  column = 2,
  bordered = false,
  layout = "vertical",
  className,
  ...rest
}: DescriptionsProps) {
  const horizontal = layout === "horizontal";
  return (
    <div className={cn("font-sans text-ink", bordered && "su-frame p-su4", className)}>
      {title != null || extra != null ? (
        <div className="flex items-center justify-between gap-su3 mb-su3">
          <div className="min-w-0 text-body font-semibold text-ink">{title}</div>
          {extra != null ? (
            <div className="shrink-0 text-small text-ink-2">{extra}</div>
          ) : null}
        </div>
      ) : null}
      <dl
        // `!` beats the inline style below, which has to stay because `column` is
        // an arbitrary number; under sm every item gets its own row.
        className={cn(
          "grid gap-x-su4 m-0 p-0 max-sm:![grid-template-columns:minmax(0,1fr)]",
          horizontal ? "gap-y-0" : "gap-y-su4",
        )}
        style={{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }}
        {...rest}
      >
        {items.map((item, i) => (
          <div
            key={i}
            className={cn(
              "min-w-0 max-sm:![grid-column:auto]",
              horizontal
                ? "grid grid-cols-[160px_minmax(0,1fr)] gap-x-su4 items-baseline min-h-[32px] py-[6px] max-sm:(grid-cols-1 gap-y-su1)"
                : "flex flex-col gap-su1",
            )}
            style={item.span ? { gridColumn: `span ${item.span}` } : undefined}
          >
            <dt className="m-0 su-label">{item.label}</dt>
            <dd className="m-0 min-w-0 text-body text-ink su-tabular break-words">
              {item.value ?? <span className="text-ink-3">—</span>}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
