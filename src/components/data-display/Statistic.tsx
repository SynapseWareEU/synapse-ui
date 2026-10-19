import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface StatisticProps extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "prefix"> {
  /** Label, 13/18 500 ink-2. */
  title?: ReactNode;
  /** 32/40 600 ink, tabular, no tracking (24/32 when `compact`). */
  value?: ReactNode;
  /** Leading icon, 16 ink-3. */
  prefix?: ReactNode;
  /** Unit or caption after the value, 13/18 ink-2, on the baseline, 8 apart. */
  suffix?: ReactNode;
  description?: ReactNode;
  /** Dense figure: 24/32 600. */
  compact?: boolean;
}

export function Statistic({
  title,
  value,
  prefix,
  suffix,
  description,
  compact = false,
  className,
  ...rest
}: StatisticProps) {
  return (
    <div className={cn("flex flex-col gap-su1 font-sans", className)} {...rest}>
      {title ? <div className="su-label">{title}</div> : null}
      <div className="flex items-baseline gap-su2 min-w-0">
        {prefix ? (
          <span className="inline-flex items-center self-center shrink-0 text-ink-3 [&_svg]:size-[16px]">
            {prefix}
          </span>
        ) : null}
        <span
          className={cn(
            "min-w-0 break-words font-semibold text-ink su-tabular",
            compact
              ? "text-[length:var(--su-text-title)] leading-[var(--su-leading-title)]"
              : "text-[length:var(--su-text-display)] leading-[var(--su-leading-display)]",
          )}
        >
          {value}
        </span>
        {suffix ? <span className="shrink-0 text-small text-ink-2">{suffix}</span> : null}
      </div>
      {description ? <div className="text-small text-ink-2">{description}</div> : null}
    </div>
  );
}
