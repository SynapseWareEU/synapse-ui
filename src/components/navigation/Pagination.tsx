import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

/**
 * `"numbered"` (default): page numbers with previous/next arrows, for totals that are known.
 * `"keyset"`: the table-footer form, "50 per page · Previous page · Next page", with no total and
 * no page numbers. It fits cursor (keyset) paging, where only "is there a next page" is known.
 */
export type PaginationVariant = "numbered" | "keyset";

/** Visible and accessible strings. English by default; pass your locale's. */
export interface PaginationLabels {
  /** Previous-page action (keyset link text; arrow name when numbered). */
  previous?: string;
  /** Next-page action (keyset link text; arrow name when numbered). */
  next?: string;
  /** Keyset page-size note, e.g. `(n) => \`${n} pe pagină\``. */
  perPage?: (pageSize: number) => ReactNode;
  /**
   * Keyset: what is announced after a move, in place of "Page 3". Pass your locale's words, or
   * `null` to announce nothing: a cursor list that keeps no count of its pages has no number to
   * say, and the table's own `aria-busy` already says the rows changed.
   */
  page?: ((page: number) => string) | null;
}

export interface PaginationProps extends Omit<HTMLAttributes<HTMLElement>, "onChange"> {
  current: number;
  /**
   * Without `pageSize`: total number of **pages** (Synapse's historical meaning).
   * With `pageSize`: total number of **items**, Ant Design style — the page count
   * is then `Math.ceil(total / pageSize)`.
   */
  total?: number;
  /** Alias for `total` — total page count. Ignored when `pageSize` is set. */
  totalPages?: number;
  /** Items per page. Setting it switches `total` to Ant's item-count semantics. */
  pageSize?: number;
  onChange?: (page: number, pageSize?: number) => void;
  siblingCount?: number;
  /** Freeze the whole control (e.g. while the table is fetching). */
  disabled?: boolean;
  /** Render nothing when there is only one page. */
  hideOnSinglePage?: boolean;
  variant?: PaginationVariant;
  /**
   * Keyset: whether a next page exists. Defaults to `current < total` when a total is known,
   * otherwise `false`. The previous page is available whenever `current > 1`.
   */
  hasNext?: boolean;
  labels?: PaginationLabels;
}

/** Public helper (exported as `paginationRange`); also used by `getPageItems`. */
function range(start: number, end: number): number[] {
  return Array.from({ length: Math.max(0, end - start + 1) }, (_, i) => start + i);
}

/**
 * Constant-width window: while `total` is unchanged the slot count never varies,
 * so items do not slide out from under the pointer between clicks (rc-pagination
 * does the same with `pageBufferSize`).
 */
function getPageItems(current: number, total: number, siblingCount: number): Array<number | "ellipsis"> {
  if (total <= 1) return total === 1 ? [1] : [];

  const slots = 2 * siblingCount + 5;
  if (total <= slots) return range(1, total);

  const run = 2 * siblingCount + 3;
  if (current <= siblingCount + 3) return [...range(1, run), "ellipsis", total];
  if (current >= total - (siblingCount + 2)) return [1, "ellipsis", ...range(total - run + 1, total)];
  return [1, "ellipsis", ...range(current - siblingCount, current + siblingCount), "ellipsis", total];
}

/**
 * Numbered cell: at least 28×28, padding 0 8, radius 6, 13/18 500 sans, tabular figures.
 * On desk the visible 28 is the target; touch screens get a 44 hit pad and wider gaps, so
 * neighbouring pads never overlap.
 */
const cellClass =
  "relative inline-flex items-center justify-center h-[var(--su-control-xs)] min-w-[var(--su-control-xs)] rounded-su-control select-none " +
  "font-sans text-small font-medium su-tabular";

const hitPadClass =
  "[@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:left-1/2 [@media(hover:none)]:after:top-1/2 " +
  "[@media(hover:none)]:after:-translate-x-1/2 [@media(hover:none)]:after:-translate-y-1/2 " +
  "[@media(hover:none)]:after:w-[var(--su-hit-target)] [@media(hover:none)]:after:h-[var(--su-hit-target)]";

const itemClass = cn(
  cellClass,
  hitPadClass,
  "m-0",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "su-focus-ring",
);

// `cn` is a plain join, so each state is one whole string rather than an override —
// nothing here may depend on stylesheet source order.
const restClass =
  "bg-transparent text-ink-2 cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover [@media(hover:none)]:active:bg-surface-hover";

/** Current page: action-subtle with action-text, like every other current item. */
const currentClass =
  "bg-action-subtle text-action-text cursor-default forced-colors:outline forced-colors:outline-2 forced-colors:outline-offset-[-2px] forced-colors:outline-[Highlight]";

const disabledClass = "bg-transparent text-ink-3 cursor-not-allowed";
const currentDisabledClass = "bg-fill text-ink-3 cursor-not-allowed";

/** Keyset page action: a 13/18 500 link. Disabled: ink-3, no underline. */
const linkClass =
  "inline-flex items-center h-[var(--su-control-xs)] m-0 p-0 bg-transparent rounded-su-tag font-sans text-small font-medium su-focus-ring " +
  "text-action-text underline-offset-[3px] decoration-1 [@media(hover:hover)]:hover:enabled:text-action-text-hover [@media(hover:hover)]:hover:enabled:underline " +
  "active:enabled:text-action-press disabled:text-ink-3 disabled:cursor-not-allowed";

function Chevron({ back }: { back?: boolean }) {
  const Glyph = back ? IconChevronLeft : IconChevronRight;
  return (
    <span aria-hidden="true" className="flex rtl:-scale-x-100">
      <Glyph size={16} stroke={1.75} focusable="false" />
    </span>
  );
}

export function Pagination({
  current,
  total: totalProp,
  totalPages,
  pageSize,
  onChange,
  siblingCount = 1,
  disabled,
  hideOnSinglePage,
  variant = "numbered",
  hasNext: hasNextProp,
  labels,
  className,
  ...rest
}: PaginationProps) {
  const previousLabel = labels?.previous ?? "Previous page";
  const nextLabel = labels?.next ?? "Next page";

  const knownTotal = pageSize ? totalProp : (totalPages ?? totalProp);
  const rawTotal = pageSize
    ? Math.ceil((totalProp ?? 0) / pageSize)
    : (totalPages ?? totalProp ?? 1);
  const total = Math.max(0, Math.trunc(rawTotal) || 0);

  if (variant === "keyset") {
    const page = Math.max(1, Math.trunc(current) || 1);
    const canPrev = page > 1;
    const canNext = hasNextProp ?? (knownTotal !== undefined && page < total);
    if (hideOnSinglePage && !canPrev && !canNext) return null;
    const go = (next: number) => {
      if (disabled || next < 1) return;
      onChange?.(next, pageSize);
    };

    return (
      <nav
        className={cn(
          "inline-flex flex-wrap items-center gap-su2 font-sans text-small text-ink-2",
          className,
        )}
        aria-label="Pagination"
        aria-busy={disabled || undefined}
        {...rest}
      >
        {pageSize ? (
          <>
            <span>{labels?.perPage ? labels.perPage(pageSize) : `${pageSize} per page`}</span>
            <span aria-hidden="true">·</span>
          </>
        ) : null}
        {canPrev ? (
          <>
            <button
              type="button"
              className={linkClass}
              disabled={disabled}
              onClick={() => go(page - 1)}
            >
              {previousLabel}
            </button>
            <span aria-hidden="true">·</span>
          </>
        ) : null}
        <button
          type="button"
          className={linkClass}
          disabled={disabled || !canNext}
          onClick={() => go(page + 1)}
        >
          {nextLabel}
        </button>
        {labels?.page === null ? null : (
          <span className="sr-only" aria-live="polite">
            {labels?.page ? labels.page(page) : `Page ${page}`}
          </span>
        )}
      </nav>
    );
  }

  // Clamp: a stale `current` must never render a dead page button (Ant's getValidValue).
  const page = Math.min(Math.max(1, Math.trunc(current) || 1), Math.max(1, total));

  const pages = getPageItems(page, total, siblingCount);
  if (pages.length === 0 || (hideOnSinglePage && total <= 1)) return null;

  const canPrev = page > 1;
  const canNext = page < total;

  const goTo = (next: number) => {
    if (disabled || next < 1 || next > total || next === page) return;
    onChange?.(next, pageSize);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    const rtl = event.currentTarget.closest("[dir='rtl']") !== null;
    const back = rtl ? "ArrowRight" : "ArrowLeft";
    const fwd = rtl ? "ArrowLeft" : "ArrowRight";
    const step: Record<string, number> = {
      [back]: page - 1,
      [fwd]: page + 1,
      ArrowUp: page - 1,
      ArrowDown: page + 1,
      Home: 1,
      End: total,
    };
    const next = step[event.key];
    if (next === undefined) return;
    event.preventDefault();
    goTo(next);
  };

  const arrow = (dir: "prev" | "next"): ReactNode => {
    const enabled = (dir === "prev" ? canPrev : canNext) && !disabled;
    const label = dir === "prev" ? previousLabel : nextLabel;
    return (
      <li>
        {/* 28 icon button: square, no inline padding. */}
        <button
          type="button"
          className={cn(itemClass, "w-[var(--su-control-xs)]", enabled ? restClass : disabledClass)}
          aria-disabled={!enabled || undefined}
          aria-label={label}
          title={label}
          onClick={() => goTo(dir === "prev" ? page - 1 : page + 1)}
        >
          <Chevron back={dir === "prev"} />
        </button>
      </li>
    );
  };

  return (
    <nav
      className={cn("inline-flex flex-wrap items-center justify-center max-w-full", className)}
      aria-label="Pagination"
      aria-busy={disabled || undefined}
      onKeyDown={onKeyDown}
      {...rest}
    >
      {/* 4 apart on desk; 16 on touch screens, so 28 cells tile on the 44 hit-pad pitch. */}
      <ul
        role="list"
        className="flex flex-wrap items-center justify-center gap-su1 [@media(hover:none)]:gap-su4 m-0 p-0 list-none"
      >
        {arrow("prev")}

        {pages.map((item, index) =>
          item === "ellipsis" ? (
            <li key={index === 1 ? "ellipsis-start" : "ellipsis-end"}>
              <span className={cn(cellClass, "px-su2 text-ink-3")}>
                <span aria-hidden="true">…</span>
                <span className="sr-only">More pages</span>
              </span>
            </li>
          ) : (
            <li key={item}>
              <button
                type="button"
                className={cn(
                  itemClass,
                  "px-su2",
                  item === page
                    ? disabled
                      ? currentDisabledClass
                      : currentClass
                    : disabled
                      ? disabledClass
                      : restClass,
                )}
                aria-label={`Page ${item}`}
                aria-current={item === page ? "page" : undefined}
                aria-disabled={disabled || undefined}
                onClick={() => goTo(item)}
              >
                {item}
              </button>
            </li>
          ),
        )}

        {arrow("next")}
      </ul>

      <span className="sr-only" aria-live="polite">{`Page ${page} of ${total}`}</span>
    </nav>
  );
}

export { range as paginationRange };
