import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface TimelineItem {
  title?: ReactNode;
  description?: ReactNode;
  /** Replaces the 8px dot, e.g. with a 16 icon. Drawn in the tone's text colour. */
  dot?: ReactNode;
  color?: "default" | "accent" | "success" | "warning" | "danger";
}

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  items: TimelineItem[];
  pending?: ReactNode;
}

/** 8px dot in the tone's solid colour; `default` is neutral. */
const dotColor: Record<NonNullable<TimelineItem["color"]>, string> = {
  default: "bg-neutral",
  accent: "bg-action",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
};

/** A custom `dot` (an icon) takes the tone's text colour instead. */
const markColor: Record<NonNullable<TimelineItem["color"]>, string> = {
  default: "text-ink-3",
  accent: "text-action-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text",
};

/*
 * Item: grid 16px 1fr, gap 12, padding-bottom 16. The dot sits 6 down so it centres on the
 * 20px title line; a 1px border-colour connector runs from under it to the next dot.
 */
const itemClass = "relative grid grid-cols-[16px_minmax(0,1fr)] gap-x-su3 pb-su4 last:pb-0";
const connectorClass =
  "not-last:before:content-empty not-last:before:absolute not-last:before:start-[7.5px] not-last:before:-bottom-[6px] not-last:before:w-px not-last:before:bg-border";
/** The connector starts under the mark: the 8px dot ends at 14, a 16 custom mark at 18. */
const connectorTop = { dot: "not-last:before:top-[14px]", mark: "not-last:before:top-[18px]" };

export function Timeline({ items, pending, className, ...rest }: TimelineProps) {
  return (
    <ol className={cn("m-0 p-0 list-none font-sans", className)} {...rest}>
      {items.map((item, i) => {
        const tone = item.color ?? "default";
        return (
          <li
            key={i}
            className={cn(
              itemClass,
              connectorClass,
              item.dot != null ? connectorTop.mark : connectorTop.dot,
            )}
          >
            {item.dot != null ? (
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-[1] flex items-center justify-center size-[16px] mt-[2px]",
                  markColor[tone],
                )}
              >
                {item.dot}
              </span>
            ) : (
              <span
                aria-hidden="true"
                className={cn(
                  "relative z-[1] block justify-self-center size-[8px] mt-[6px] rounded-su-round",
                  dotColor[tone],
                )}
              />
            )}
            <div className="min-w-0">
              {item.title ? (
                <div className="text-body text-ink">{item.title}</div>
              ) : null}
              {item.description ? (
                <div className="text-small text-ink-2">{item.description}</div>
              ) : null}
            </div>
          </li>
        );
      })}
      {pending ? (
        <li className={itemClass}>
          {/* Pending: an 8px ring, 1.5px ink-3, transparent inside. */}
          <span
            aria-hidden="true"
            className="relative z-[1] block justify-self-center size-[8px] mt-[6px] rounded-su-round border-[1.5px] border-solid border-ink-3 bg-transparent"
          />
          <div className="min-w-0 text-body text-ink-2">{pending}</div>
        </li>
      ) : null}
    </ol>
  );
}
