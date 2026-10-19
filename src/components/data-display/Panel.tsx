import { useId, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Badge } from "./Badge";

export interface PanelProps extends Omit<HTMLAttributes<HTMLElement>, "title"> {
  /** Section title, 16/24 600. Names the panel (`aria-labelledby`). */
  title?: ReactNode;
  /**
   * The title's heading element, so the panel fits the page's outline (an `h2` under the page
   * title). The look does not change. Default: `h3`.
   */
  titleAs?: "h2" | "h3" | "h4" | "h5" | "h6";
  /** Count pill after the title. A number renders the neutral pill; pass a `<Badge>` for a tone. */
  count?: ReactNode;
  /** Actions at the end of the header (28 buttons, 8 apart). */
  extra?: ReactNode;
  /** Note under the body: 44 high, border-top, 13/18 ink-2. */
  footer?: ReactNode;
  /** Body without padding, for tables and lists. Default: padded 16. */
  flush?: boolean;
  /** Class for the body wrapper. */
  bodyClassName?: string;
  children?: ReactNode;
}

/**
 * The white boxed surface on the grey ground: 1px border, radius 8, no shadow. Header 44, body
 * flush or padded 16, optional note footer 44.
 */
export function Panel({
  title,
  titleAs: TitleTag = "h3",
  count,
  extra,
  footer,
  flush = false,
  bodyClassName,
  className,
  children,
  "aria-labelledby": labelledBy,
  ...rest
}: PanelProps) {
  const titleId = useId();
  const hasHeader = title != null || count != null || extra != null;
  return (
    <section
      aria-labelledby={labelledBy ?? (title != null ? titleId : undefined)}
      className={cn("su-panel text-ink font-sans", className)}
      {...rest}
    >
      {hasHeader ? (
        <div className="flex items-center gap-su2 min-h-[var(--su-panel-header)] px-su4 border-b border-solid border-border">
          {title != null ? (
            <TitleTag
              id={titleId}
              className="m-0 min-w-0 truncate text-section font-semibold text-ink"
            >
              {title}
            </TitleTag>
          ) : null}
          {count != null ? (
            typeof count === "number" ? (
              <Badge count={count} showZero />
            ) : (
              count
            )
          ) : null}
          {extra != null ? (
            <div className="flex items-center gap-su2 ms-auto shrink-0">{extra}</div>
          ) : null}
        </div>
      ) : null}
      <div className={cn(flush ? undefined : "p-su4", bodyClassName)}>{children}</div>
      {footer != null ? (
        <div className="flex items-center gap-su2 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2">
          {footer}
        </div>
      ) : null}
    </section>
  );
}
