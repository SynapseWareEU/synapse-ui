import type { HTMLAttributes, Key, ReactNode } from "react";
import { IconCheck } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

export type StepStatus = "wait" | "process" | "finish" | "error";

/**
 * `"default"`: labelled steps (20px markers, titles, connectors).
 * `"bar"`: the handheld flow header, one 4px segment per step plus a "Step 2 of 4" counter.
 */
export type StepsType = "default" | "bar";

export interface StepItem {
  title: ReactNode;
  description?: ReactNode;
  /** Overrides the status derived from `current`. */
  status?: StepStatus;
  /** Replaces the step numeral inside the 20px marker (12px glyph). */
  icon?: ReactNode;
  /** Stable key; falls back to the array index. */
  key?: Key;
}

export interface StepsProps extends HTMLAttributes<HTMLElement> {
  current?: number;
  items: StepItem[];
  direction?: "horizontal" | "vertical";
  status?: StepStatus;
  type?: StepsType;
  /**
   * `type="bar"` only: the counter above the segments. Defaults to "Step {n} of {total}";
   * pass a function for your locale (`(n, total) => \`Pasul ${n} din ${total}\``) or `false`
   * to hide it. 13/18 ink-2 on desk, 17/24 500 under `data-density="handheld"`.
   */
  counter?: ReactNode | ((step: number, total: number) => ReactNode);
}

const transition =
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none";

/**
 * 20px round marker. Done is settled ink with a check, the live step is the action colour,
 * waiting is an outlined surface, and an error is danger with a "!" (the glyph changes too,
 * so hue is never the only cue). Numerals are sans 12/16 600, tabular.
 * `text-surface` is white on light ink and dark on dark-theme ink, so the mark always reads.
 */
const markerStatusClass: Record<StepStatus, string> = {
  wait: "bg-surface text-ink-2 border border-solid border-border-strong",
  process: "bg-action text-on-action",
  finish: "bg-ink text-surface",
  error: "bg-danger text-on-action",
};

const markerClass = cn(
  "inline-flex items-center justify-center shrink-0 size-[20px] rounded-su-round",
  "font-sans text-micro font-semibold su-tabular [&>svg]:size-[12px]",
  "forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
  transition,
);

/** Segment colours: done ink, current action (danger on error), to do border. */
const segmentClass: Record<StepStatus, string> = {
  finish: "bg-ink",
  process: "bg-action",
  error: "bg-danger",
  wait: "bg-border",
};

const statusLabel: Record<StepStatus, string> = {
  wait: "not started",
  process: "current",
  finish: "completed",
  error: "error",
};

function statusOf(index: number, currentIndex: number, status: StepStatus, item: StepItem) {
  return (
    item.status ??
    (index < currentIndex ? "finish" : index > currentIndex ? "wait" : status)
  );
}

/**
 * Layout is vertical-first: the stacked form is the base and the horizontal row
 * is layered on above 532px, which gives Ant's `responsive` behaviour for free
 * (a squeezed row breaks titles one letter per line) from one set of classes.
 * The rail is a single element in both forms — absolutely positioned down the
 * marker column when stacked, a flex item between the title and the next marker
 * when in a row, where its inset/width classes go inert because it is `static`.
 */
export function Steps({
  current = 0,
  items,
  direction = "horizontal",
  status = "process",
  type = "default",
  counter,
  className,
  ...rest
}: StepsProps) {
  if (items.length === 0) return null;

  const row = direction !== "vertical";
  const currentIndex = Math.trunc(current);

  if (type === "bar") {
    const step = Math.min(Math.max(currentIndex + 1, 1), items.length);
    const counterNode =
      counter === false || counter === null
        ? null
        : typeof counter === "function"
          ? counter(step, items.length)
          : (counter ?? `Step ${step} of ${items.length}`);

    return (
      <nav className={cn("w-full font-sans", className)} aria-label="Progress" {...rest}>
        {counterNode != null && counterNode !== false ? (
          <div
            className="flex justify-end mb-[9px] text-small text-ink-2 su-tabular [[data-density=handheld]_&]:text-hh-step [[data-density=handheld]_&]:font-medium"
            aria-hidden="true"
          >
            {counterNode}
          </div>
        ) : null}
        <ol role="list" className="flex gap-su1 m-0 p-0 list-none">
          {items.map((item, index) => {
            const stepStatus = statusOf(index, currentIndex, status, item);
            return (
              <li
                key={item.key ?? index}
                className={cn(
                  "flex-1 min-w-0 h-[4px] rounded-su-bar forced-colors:border forced-colors:border-solid forced-colors:border-[CanvasText]",
                  segmentClass[stepStatus],
                  transition,
                )}
                data-status={stepStatus}
                aria-current={index === currentIndex ? "step" : undefined}
              >
                <span className="sr-only">
                  {`Step ${index + 1} of ${items.length}, ${statusLabel[stepStatus]}: `}
                  {item.title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      className={cn("w-full font-sans", className)}
      aria-label="Progress"
      {...rest}
    >
      <ol
        role="list"
        className={cn(
          "flex flex-col items-stretch w-full m-0 p-0 list-none",
          row && "min-[533px]:(flex-row items-start gap-su4)",
        )}
      >
        {items.map((item, index) => {
          const stepStatus = statusOf(index, currentIndex, status, item);
          const isLast = index === items.length - 1;

          return (
            <li
              key={item.key ?? index}
              className={cn(
                "relative flex items-start gap-su2 min-w-0",
                row &&
                  (isLast
                    ? "min-[533px]:flex-[0_1_auto]"
                    : "min-[533px]:flex-[1_1_auto]"),
              )}
              data-status={stepStatus}
              aria-current={index === currentIndex ? "step" : undefined}
            >
              <span
                className={cn(markerClass, markerStatusClass[stepStatus])}
                aria-hidden="true"
              >
                {item.icon ??
                  (stepStatus === "finish" ? (
                    <IconCheck size={12} stroke={3} />
                  ) : stepStatus === "error" ? (
                    "!"
                  ) : (
                    index + 1
                  ))}
              </span>
              <div
                className={cn(
                  // The marker and the title's line box are both 20 tall, so they share a centre.
                  "grow min-w-0",
                  row && "min-[533px]:grow-0",
                  !isLast && "pb-su4",
                  !isLast && row && "min-[533px]:pb-0",
                )}
              >
                <span className="sr-only">
                  {`Step ${index + 1} of ${items.length}, ${statusLabel[stepStatus]}: `}
                </span>
                <span
                  className={cn(
                    "block text-body font-medium break-words",
                    stepStatus === "wait" ? "text-ink-2" : "text-ink",
                  )}
                >
                  {item.title}
                </span>
                {item.description ? (
                  <span className="block mt-su1 text-small text-ink-2 break-words">
                    {item.description}
                  </span>
                ) : null}
              </div>
              {!isLast ? (
                <span
                  className={cn(
                    // Stacked: down the marker column, 4 clear of each marker.
                    "absolute [inset-inline-start:calc((var(--su-space-5)-1px)/2)] top-[calc(var(--su-space-5)+var(--su-space-1))] bottom-su1 w-px",
                    row &&
                      "min-[533px]:(static h-px w-auto flex-[1_1_0%] self-start min-w-[var(--su-space-4)] mt-[calc((var(--su-space-5)-1px)/2)])",
                    stepStatus === "finish" ? "bg-ink" : "bg-border",
                    transition,
                  )}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
