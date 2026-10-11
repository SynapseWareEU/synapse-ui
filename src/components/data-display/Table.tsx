import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ButtonHTMLAttributes,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from "react";
import { cn } from "../../utils/cn";
import { statusDotToneClass, type StatusDotTone } from "./StatusDot";

/*
 * Lattice UI v2 table: always a Panel (surface, 1px border, radius 8). Native <table> with
 * separate borders, so every row height includes its own 1px bottom rule (40 means 40).
 * Column gap 16 (`--su-table-column-gap`, or `columnGap`): cells pad half of it inline, the first
 * and last cell pad 16 at the edge.
 *
 * `stack` is the narrow shape: below the breakpoint the SAME tree is drawn as a list of records
 * (no header row, a row is a wrapping block, a meta line folds into its row) and takes list roles,
 * so there is one tree in the DOM and nothing scrolls sideways.
 */

export type TableSize = "default" | "nested";
/** Cell kinds bake in the face rule: mono only for identifiers. */
export type TableCellKind =
  | "text"
  | "id"
  | "idSecondary"
  | "secondary"
  | "number"
  | "empty"
  | "control"
  | "actions";
export type TableSort = "ascending" | "descending" | "none";
/** Breakpoint below which a `stack` table is drawn as a list. Same widths as the `sm:` … `xl:` variants. */
export type TableStack = "sm" | "md" | "lg" | "xl";

/**
 * Attributes for a `<tr>` handed over as an object (`metaRowProps`, `rowProps`). `data-*` is
 * spelled out because an object literal, unlike JSX, does not accept it on `HTMLAttributes`.
 */
export type TableRowAttributes = HTMLAttributes<HTMLTableRowElement> & {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

type Section = "head" | "body" | "foot" | undefined;
type Line = "single" | "first" | "meta";

const TableContext = createContext<TableSize>("default");
const SectionContext = createContext<Section>(undefined);
const RowContext = createContext<{ line: Line; expanded: boolean }>({
  line: "single",
  expanded: false,
});
/** True while the table is in its stacked (list) shape. A nested table inherits it. */
const StackedContext = createContext(false);
/** What the header row of this table does: `hidden` keeps its cells for assistive technology only, `sticky` pins it. */
const HeadContext = createContext<{ hidden: boolean; sticky: boolean }>({ hidden: false, sticky: false });

const stackWidth: Record<TableStack, number> = { sm: 640, md: 768, lg: 1024, xl: 1280 };
const noSubscription = () => () => {};

/**
 * Whether the viewport is under the `stack` breakpoint. Read from `matchMedia` and not left to
 * CSS, because the list roles have to change with the shape: a `display: block` table that still
 * says `table` reads as a table with no headers. Server render: the table shape.
 */
function useBelow(stack: TableStack | undefined): boolean {
  const query = stack ? `(min-width: ${stackWidth[stack]}px)` : undefined;
  const subscribe = useCallback(
    (onChange: () => void) => {
      if (!query || typeof window === "undefined" || !window.matchMedia) return () => {};
      const media = window.matchMedia(query);
      media.addEventListener("change", onChange);
      return () => media.removeEventListener("change", onChange);
    },
    [query],
  );
  return useSyncExternalStore(
    query ? subscribe : noSubscription,
    () =>
      query != null && typeof window !== "undefined" && !!window.matchMedia
        ? !window.matchMedia(query).matches
        : false,
    () => false,
  );
}

// ——— glyphs (stroke 1.75, round caps and joins) ———
function Glyph({ size, children, className }: { size: number; children: ReactNode; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={cn("shrink-0", className)}
    >
      {children}
    </svg>
  );
}

// ——— shared cell classes ———
// Half the column gap on each side. `--su-table-gap` is set by every `<table>` on itself, so a
// nested table never inherits the gap of the table it sits in.
const cellInline = (size: TableSize) =>
  size === "nested"
    ? "px-[calc(var(--su-table-gap)/2)] first:ps-[15px] last:pe-[15px]"
    : "px-[calc(var(--su-table-gap)/2)] first:ps-su4 last:pe-su4";
const ruleBottom = "border-b border-solid border-border";

// ——— stacked shape (below the `stack` breakpoint) ———
// A record is a wrapping line box: padding 8 16 (15 inside a nested frame), its values 12 apart
// and 2 between lines, a rule below. The values carry no padding or rule of their own.
const stackedInline = (size: TableSize) => (size === "nested" ? "px-[15px]" : "px-su4");
const stackedRule = "border-b border-solid border-border last:border-b-0";
// A cell with nothing in it (a spacer under a lost column) is not a value: it takes no place, so
// it adds no 12 gap either.
const stackedCell = "block min-w-0 p-0 empty:hidden";
// A record with a `stackEnd` cell: an empty full-width item after that cell breaks the line, and
// the cells after it are ordered past the break. The break is a line of its own, of no height,
// so the 2 between lines would count twice there; the first line's cells give 2 back.
const stackedFirstLine =
  "[&:has(>[data-su-stack-end])]:before:content-empty [&:has(>[data-su-stack-end])]:before:order-1 [&:has(>[data-su-stack-end])]:before:basis-full [&>[data-su-stack-end]~*]:order-2 [&:has(>[data-su-stack-end])>:not([data-su-stack-end]~*)]:-mb-[2px]";

/**
 * Block padding and the bottom rule of a body cell. The first line of a meta row has no rule and
 * 10 above; the meta line has 9 below, then the rule. Under an `expanded` row there is no rule.
 */
function bodyCell(line: Line, expanded: boolean, spansDown: boolean) {
  const block =
    line === "first" && !spansDown
      ? "pt-[10px] pb-0 align-top"
      : line === "meta"
        ? "pt-0 pb-[9px] align-top"
        : "py-[3px] align-middle";
  const rule = (line === "first" && !spansDown) || expanded ? undefined : ruleBottom;
  return cn(block, rule);
}

export interface TableProps extends HTMLAttributes<HTMLTableElement> {
  /** @deprecated No-op. v2 tables never stripe; a row shows surface-hover under a pointer. */
  striped?: boolean;
  /** @deprecated No-op. A table is always framed as a Panel. */
  bordered?: boolean;
  /**
   * `nested`: the table inside an expanded row's detail block. Header 28 (12/16 500), rows 32
   * (13/18), cells inset 15 inside the frame's 1px border.
   */
  size?: TableSize;
  /** Shown inside the panel under the header when there are no rows, e.g. an `<Empty>`. */
  empty?: ReactNode;
  /**
   * Footer, 44: border-top, padding 0 16, gap 8, 13/18 ink-2, e.g. "50 per page · Next page".
   * Keyset paging: never a total. Page actions are 13/18 500 links (disabled: ink-3).
   */
  footer?: ReactNode;
  /**
   * Opt-in, for a footer that holds prose: 5 above and below, so a note that runs to several
   * lines does not touch the rules, and parts that do not fit side by side wrap, 4 between the
   * lines. One line is still 44 (a note of 18, a control up to 32). Leave it off for content that
   * pads itself (a pager), which would grow by the padding. Default: off, one centred line.
   */
  footerWrap?: boolean;
  /**
   * A strip inside the panel, above the column header, with a rule below: a title with its count
   * and a link (44, padding 0 16), or the summary of a nested table (40, padding 0 15: totals, a
   * verb, a history link). Items are 12 apart and centred; it wraps rather than cut. It is not
   * part of the `<table>`: name the table with `aria-label` or point `aria-labelledby` at a
   * heading inside it. It stays in the stacked shape and above a `stickyHeader` scroll.
   */
  header?: ReactNode;
  /**
   * Do not draw the column header row, and keep its cells for assistive technology: the row takes
   * no height, each `Table.Th` holds its label visually hidden, and the columns keep the widths
   * set on them. For a table whose columns need no naming to a sighted reader. A hidden header
   * draws no sort button and no facet.
   */
  headerHidden?: boolean;
  /**
   * Opt-in: the body scrolls inside the panel under a pinned column header, and the `header`
   * strip, `empty` and `footer` stay in place. The panel becomes a column that can shrink, so
   * give it a height to fill through `panelClassName` (`flex-1 min-h-0` in a column, `h-full`, or
   * a `max-h-*`). The stacked shape has no header row to pin, and keeps the rest: its records
   * scroll inside the same height, between the strip and the footer, so none is cut off.
   */
  stickyHeader?: boolean;
  /** Classes for the panel, the table's outer box (`className` reaches the `<table>`). */
  panelClassName?: string;
  /**
   * Gap between columns in px, where a board draws other than the 16 of `--su-table-column-gap`
   * (24 in a read-out table). The first and last cell keep 16 at the panel's edge. A nested table
   * takes its own.
   */
  columnGap?: number;
  /** Marks the table busy (`aria-busy`). Render `<Table.SkeletonRow>`s of 40 in the body meanwhile. */
  loading?: boolean;
  /**
   * Opt-in narrow shape. Below this breakpoint the same tree is drawn as a list of records and
   * nothing scrolls sideways: the header row is not drawn, each `Table.Row` is a wrapping block
   * (padding 8 16, values 12 apart, a rule below) with its `meta` folded in as a last full-width
   * line, and cells lose their padding, rule and column alignment (`kind="actions"` goes to the
   * end of its line). Roles follow the shape: the table is a `list`, every row, group row, fold
   * row and detail a `listitem`. Keep the `aria-label`: it names the list. Give a value its own
   * label where the lost header was the only thing naming it, and lay a record out with classes
   * on its cells (`basis-full` puts one on a line of its own). A table nested in a `Table.Detail`
   * follows its parent, and so does one rendered from inside a stacked row through a portal (a
   * drawer or popover opened from the row: React context crosses portals); give that table its
   * own `stack` to decide for itself. Default: off, a table at every width.
   */
  stack?: TableStack;
  children?: ReactNode;
}

export function Table({
  striped: _striped,
  bordered: _bordered,
  size = "default",
  empty,
  footer,
  footerWrap = false,
  loading = false,
  stack,
  header,
  headerHidden = false,
  stickyHeader = false,
  panelClassName,
  columnGap,
  className,
  style,
  children,
  ...rest
}: TableProps) {
  const below = useBelow(stack);
  const inherited = useContext(StackedContext);
  const stacked = stack ? below : inherited;
  const sticky = stickyHeader && !stacked;
  const head = useMemo(() => ({ hidden: headerHidden, sticky }), [headerHidden, sticky]);
  return (
    <TableContext.Provider value={size}>
      <SectionContext.Provider value={undefined}>
        <StackedContext.Provider value={stacked}>
         <HeadContext.Provider value={head}>
          <div className={cn("su-panel font-sans text-ink", stickyHeader && "flex flex-col min-h-0", panelClassName)}>
            {header != null ? (
              <div
                className={cn(
                  // 5 above and below, not 6: with the 1px rule that leaves 28 of the nested 40 and
                  // 32 of the 44, so a small button or a 32 control does not grow the strip.
                  "flex flex-wrap items-center gap-x-su3 gap-y-su1 shrink-0 py-[5px] border-b border-solid border-border text-body text-ink",
                  size === "nested" ? "min-h-[40px] px-[15px]" : "min-h-[var(--su-panel-header)] px-su4",
                )}
              >
                {header}
              </div>
            ) : null}
            {/* `relative`: the scroller is the containing block for absolutely positioned cell
                content (an `sr-only` header label), so it cannot escape the scroll and widen the page.
                Stacked, nothing is wider than the panel, so nothing scrolls sideways; under
                `stickyHeader` the panel still has the height its caller gave it, and the records
                scroll in it (the panel clips, so they would otherwise be out of reach). */}
            <div
              className={
                stacked
                  ? stickyHeader
                    ? "relative flex-1 min-h-0 overflow-y-auto"
                    : "relative"
                  : sticky
                    ? "relative flex-1 min-h-0 overflow-auto"
                    : "relative overflow-x-auto"
              }
            >
              <table
                aria-busy={loading || undefined}
                role={stacked ? "list" : undefined}
                style={
                  {
                    "--su-table-gap": columnGap != null ? `${columnGap}px` : "var(--su-table-column-gap)",
                    ...style,
                  } as CSSProperties
                }
                className={cn(
                  stacked
                    ? "block w-full text-start"
                    : "w-full border-separate [border-spacing:0] text-start",
                  size === "nested" ? "text-small" : "text-body",
                  className,
                )}
                {...rest}
              >
                {children}
              </table>
            </div>
            {empty}
            {footer != null ? (
              // The block padding is opt-in: a footer that pads itself (the app's pager) would grow
              // by it. 5 with the 1px rule leaves 33 of the 44, so a 32 control still fits one line.
              <div
                className={cn(
                  "flex items-center gap-x-su2 shrink-0 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2",
                  footerWrap && "flex-wrap gap-y-su1 py-[5px]",
                )}
              >
                {footer}
              </div>
            ) : null}
          </div>
         </HeadContext.Provider>
        </StackedContext.Provider>
      </SectionContext.Provider>
    </TableContext.Provider>
  );
}

export function TableHead({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  const stacked = useContext(StackedContext);
  return (
    <SectionContext.Provider value="head">
      {/* Stacked: the header row stays in the tree (one tree) but is not drawn or announced. */}
      <thead className={cn(stacked && "hidden", className)} {...rest}>
        {children}
      </thead>
    </SectionContext.Provider>
  );
}

export function TableBody({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  const stacked = useContext(StackedContext);
  return (
    <SectionContext.Provider value="body">
      {/* Stacked: `none`, so the list owns its items directly. */}
      <tbody role={stacked ? "none" : undefined} className={cn(stacked && "block", className)} {...rest}>
        {children}
      </tbody>
    </SectionContext.Provider>
  );
}

export interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** Selected row: action-subtle, action-subtle-hover under a pointer. Row text stays ink. */
  selected?: boolean;
  /** The row whose detail block (`Table.Detail`) follows: surface-2, no rule between the two. */
  expanded?: boolean;
  /**
   * Second line under the row (the row grows to 60): usually a `<Table.Meta>`. It spans from
   * `metaStart` to the last column.
   */
  meta?: ReactNode;
  /** 1-based column where the meta line starts. Default 2. */
  metaStart?: number;
  /**
   * Props for the second `<tr>`, the one a `meta` line is drawn in (`data-testid`, `id`,
   * `aria-*`). The row's own props reach the first `<tr>` only. Unused without `meta`, and in the
   * stacked shape, where the meta line is inside the row itself.
   */
  metaRowProps?: TableRowAttributes;
}

/** Total columns a row's cells cover, and how many of them span down into the meta line. */
function countColumns(children: ReactNode) {
  let total = 0;
  let spanned = 0;
  Children.forEach(children, (child) => {
    if (!isValidElement<{ colSpan?: number; rowSpan?: number }>(child)) return;
    const span = Math.max(1, child.props.colSpan ?? 1);
    total += span;
    if ((child.props.rowSpan ?? 1) > 1) spanned += span;
  });
  return { total, spanned };
}

export function TableRow({
  selected = false,
  expanded = false,
  meta,
  metaStart = 2,
  metaRowProps,
  className,
  children,
  ...rest
}: TableRowProps) {
  const section = useContext(SectionContext);
  const size = useContext(TableContext);
  const stacked = useContext(StackedContext);
  const head = useContext(HeadContext);

  if (section === "head") {
    return (
      <tr
        className={cn(
          // A hidden header row takes no height; its cells are still the columns' headers.
          head.hidden
            ? undefined
            : size === "nested"
              ? "h-[var(--su-row-nested-header)]"
              : "h-[var(--su-row-header)]",
          className,
        )}
        {...rest}
      >
        {children}
      </tr>
    );
  }

  // One background per branch: `cn()` never resolves two utilities for the same property.
  const tone = selected
    ? "bg-action-subtle [@media(hover:hover)]:hover:bg-action-subtle-hover"
    : expanded
      ? "bg-surface-2 [@media(hover:hover)]:hover:bg-surface-hover"
      : "[@media(hover:hover)]:hover:bg-surface-hover";
  const motion =
    "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none";
  const rowHeight = size === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]";

  if (stacked) {
    // One record, one list item: the meta line is the row's last line, not a row of its own.
    return (
      <RowContext.Provider value={{ line: "single", expanded }}>
        <tr
          role="listitem"
          data-state={selected ? "selected" : undefined}
          className={cn(
            "flex flex-wrap items-baseline gap-x-su3 gap-y-[2px] py-su2",
            stackedFirstLine,
            stackedInline(size),
            expanded ? undefined : stackedRule,
            tone,
            motion,
            className,
          )}
          {...rest}
        >
          {children}
          {/* `order-last`: a screen may reorder its cells with `order-*`; the meta stays the last line. */}
          {meta != null ? <td className={cn(stackedCell, "basis-full order-last")}>{meta}</td> : null}
        </tr>
      </RowContext.Provider>
    );
  }

  if (meta == null) {
    return (
      <RowContext.Provider value={{ line: "single", expanded }}>
        <tr
          data-state={selected ? "selected" : undefined}
          className={cn(rowHeight, tone, motion, "[&:last-child>*]:border-b-0", className)}
          {...rest}
        >
          {children}
        </tr>
      </RowContext.Provider>
    );
  }

  // Row with a meta line: 10 + 20 on the first line, 20 + 9 + the rule on the second (60 in
  // all). Both lines light up together under a pointer.
  const { total, spanned } = countColumns(children);
  const lead = Math.max(0, Math.min(metaStart - 1, total - 1));
  const metaSpan = Math.max(1, total - lead - spanned);
  const pairHover = selected
    ? "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-action-subtle-hover"
    : "[@media(hover:hover)]:[&:has(+tr:hover)]:bg-surface-hover";
  const nextHover = selected
    ? "[@media(hover:hover)]:[&:hover+tr]:bg-action-subtle-hover"
    : "[@media(hover:hover)]:[&:hover+tr]:bg-surface-hover";
  return (
    <>
      <RowContext.Provider value={{ line: "first", expanded }}>
        <tr
          data-state={selected ? "selected" : undefined}
          className={cn(
            "h-[30px] [&:nth-last-child(2)>*]:border-b-0",
            tone,
            pairHover,
            nextHover,
            motion,
            className,
          )}
          {...rest}
        >
          {children}
        </tr>
      </RowContext.Provider>
      <RowContext.Provider value={{ line: "meta", expanded }}>
        <tr
          data-state={selected ? "selected" : undefined}
          {...metaRowProps}
          className={cn(
            "h-[30px]",
            tone,
            motion,
            "[&:last-child>*]:border-b-0",
            metaRowProps?.className,
          )}
        >
          {Array.from({ length: lead }, (_, i) => (
            <TableTd key={i} />
          ))}
          <TableTd colSpan={metaSpan}>{meta}</TableTd>
        </tr>
      </RowContext.Provider>
    </>
  );
}

export interface TableThProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Numeric column: right-aligned (the header and its cells). */
  numeric?: boolean;
  /** This column's sort. Sorted: ink text and an arrow 14, gap 4. Sets `aria-sort`. */
  sort?: TableSort;
  /** Makes the label a button that asks for a new sort. */
  onSort?: () => void;
  /**
   * Facet control after the label (gap 4): a `<Table.Facet>`, usually as a Popover trigger.
   * Line the facet popover up with the column: its option text sits at the column label's x.
   *
   * In a fixed-layout table the label gives way before the arrow and the funnel do: the header's
   * row never outgrows its track, so a label that cuts itself (`min-w-0 truncate`) ends in an
   * ellipsis with both still in view.
   */
  facet?: ReactNode;
}

export function TableTh({
  numeric = false,
  sort,
  onSort,
  facet,
  className,
  children,
  ...rest
}: TableThProps) {
  const section = useContext(SectionContext);
  const size = useContext(TableContext);
  const { line, expanded } = useContext(RowContext);
  const stacked = useContext(StackedContext);
  const head = useContext(HeadContext);

  // A <th scope="row"> inside the body reads as a body cell, not a header.
  if (section === "body") {
    return (
      <th
        className={cn(
          stacked ? stackedCell : cellInline(size),
          stacked ? undefined : bodyCell(line, expanded, (rest.rowSpan ?? 1) > 1),
          "[font-weight:inherit]",
          numeric && !stacked ? "text-end" : "text-start",
          className,
        )}
        {...rest}
      >
        {children}
      </th>
    );
  }

  if (head.hidden) {
    // Not drawn, still the column's header: no box of its own, and the label where only
    // assistive technology finds it. `className` stays, so a width set on the column holds.
    return (
      <th aria-sort={sort} className={cn("h-0 p-0 border-0 font-normal text-start", className)} {...rest}>
        <span className="absolute w-px h-px overflow-hidden whitespace-nowrap [clip-path:inset(50%)]">
          {children}
        </span>
      </th>
    );
  }

  const sorted = sort === "ascending" || sort === "descending";
  const arrow = sorted ? (
    <Glyph size={14}>
      <path d="M12 5l0 14" />
      {sort === "ascending" ? (
        <>
          <path d="M18 11l-6 -6" />
          <path d="M6 11l6 -6" />
        </>
      ) : (
        <>
          <path d="M18 13l-6 6" />
          <path d="M6 13l6 6" />
        </>
      )}
    </Glyph>
  ) : null;
  const label = onSort ? (
    <button
      type="button"
      onClick={onSort}
      className="inline-flex items-center gap-su1 min-w-0 p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer whitespace-nowrap su-focus-ring [@media(hover:hover)]:hover:text-ink"
    >
      {children}
      {arrow}
    </button>
  ) : arrow ? (
    <>
      {children}
      {arrow}
    </>
  ) : (
    children
  );

  return (
    <th
      aria-sort={sort}
      className={cn(
        cellInline(size),
        "py-[4px] align-middle bg-surface-2 font-sans font-medium whitespace-nowrap",
        // Pinned to the top of the panel's scroller; the rule travels with the cell.
        head.sticky && "sticky top-0 z-[1]",
        ruleBottom,
        size === "nested" ? "text-micro" : "text-small",
        sorted ? "text-ink" : "text-ink-2",
        numeric ? "text-end" : "text-start",
        className,
      )}
      {...rest}
    >
      {facet != null || arrow || onSort ? (
        <span className="inline-flex items-center gap-su1 min-w-0 max-w-full align-middle">
          {label}
          {facet}
        </span>
      ) : (
        children
      )}
    </th>
  );
}

export interface TableTdProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Right-aligned with tabular figures. Same as `kind="number"`. */
  numeric?: boolean;
  /**
   * - `id`: the row identity, mono 500 ink. `idSecondary`: supporting id, mono 13/18 ink-2.
   * - `secondary`: ink-2 text. `number`: right-aligned, tabular (unit in 13/18 ink-2 after it).
   * - `empty`: "—" in ink-3; give the cell an `aria-label` that says why.
   * - `control`: shrinks to its content (the 24 disclosure column). `actions`: the same, at the end.
   */
  kind?: TableCellKind;
  /**
   * Stacked shape only: this cell ends the record's first line. It is pushed to the end of the
   * line (a state tag, or the row's "⋯"), and the cells after it start on the next line. Give the
   * cell before it `flex-1` to cut or wrap a long name beside it. One per row; cells after it
   * cannot be reordered with `order-*`. No effect in the table shape.
   */
  stackEnd?: boolean;
}

const kindClass: Record<TableCellKind, string | undefined> = {
  text: undefined,
  id: "su-id whitespace-nowrap",
  idSecondary: "font-mono text-small text-ink-2 whitespace-nowrap",
  secondary: "text-ink-2",
  number: "su-tabular whitespace-nowrap",
  empty: "text-ink-3",
  control: "w-px whitespace-nowrap",
  actions: "w-px whitespace-nowrap",
};

// Stacked: the same faces, without the column behaviour (shrink-to-content tracks, right
// alignment). The actions go to the end of whichever line they are on.
// An identifier or a number keeps to one line while it fits; one wider than the record breaks
// inside it (anywhere, since an SSCC or a lot has no word to break at) instead of running past
// the panel's edge, where nothing scrolls to reach it.
const stackedBreak = "max-w-full [overflow-wrap:anywhere]";
const stackedKindClass: Record<TableCellKind, string | undefined> = {
  ...kindClass,
  id: `su-id ${stackedBreak}`,
  idSecondary: `font-mono text-small text-ink-2 ${stackedBreak}`,
  number: `su-tabular ${stackedBreak}`,
  control: "shrink-0 whitespace-nowrap",
  actions: "shrink-0 ms-auto whitespace-nowrap",
};

export function TableTd({
  numeric = false,
  kind = "text",
  stackEnd = false,
  className,
  children,
  rowSpan,
  ...rest
}: TableTdProps) {
  const size = useContext(TableContext);
  const { line, expanded } = useContext(RowContext);
  const stacked = useContext(StackedContext);
  const end = numeric || kind === "number" || kind === "actions";
  const content = kind === "empty" && children == null ? "—" : children;
  if (stacked) {
    return (
      <td
        rowSpan={rowSpan}
        data-su-stack-end={stackEnd ? "" : undefined}
        className={cn(
          stackedCell,
          stackedKindClass[kind],
          stackEnd && "shrink-0 ms-auto",
          numeric && kind !== "number" ? `su-tabular ${stackedBreak}` : undefined,
          className,
        )}
        {...rest}
      >
        {content}
      </td>
    );
  }
  // First line of a meta row: a 20px line, as drawn. A control taller than that (the 32 "⋯", the
  // 24 disclosure) is centred on the line and overhangs it, instead of pushing the row past 60.
  const onFirstLine =
    line === "first" && (rowSpan ?? 1) <= 1 && (kind === "control" || kind === "actions");
  return (
    <td
      rowSpan={rowSpan}
      className={cn(
        cellInline(size),
        bodyCell(line, expanded, (rowSpan ?? 1) > 1),
        kindClass[kind],
        numeric && kind !== "number" ? "su-tabular whitespace-nowrap" : undefined,
        end ? "text-end" : undefined,
        className,
      )}
      {...rest}
    >
      {onFirstLine && content != null ? (
        <span className={cn("flex items-center h-[20px]", kind === "actions" && "justify-end")}>
          {content}
        </span>
      ) : (
        content
      )}
    </td>
  );
}

/** Group row, 36: surface-2, 13/18 600 ink. Put a `Table.Disclosure` in the first cell. */
export function TableGroupRow({ className, children, ...rest }: HTMLAttributes<HTMLTableRowElement>) {
  const size = useContext(TableContext);
  const stacked = useContext(StackedContext);
  return (
    <RowContext.Provider value={{ line: "single", expanded: false }}>
      <tr
        role={stacked ? "listitem" : undefined}
        className={cn(
          stacked
            ? "flex items-center gap-su2 min-h-[var(--su-row-group)]"
            : "h-[var(--su-row-group)] [&:last-child>*]:border-b-0",
          stacked ? stackedInline(size) : undefined,
          stacked ? stackedRule : undefined,
          "bg-surface-2 text-small font-semibold text-ink",
          className,
        )}
        {...rest}
      >
        {children}
      </tr>
    </RowContext.Provider>
  );
}

export interface TableDisclosureProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Open: chevron-down and `aria-expanded`. Point `aria-controls` at the `Table.Detail` id. */
  expanded?: boolean;
}

/** 24×24 ghost button, radius 4, chevron 16 ink-3. Give it an `aria-label` ("Show pallets in A-01"). */
export const TableDisclosure = forwardRef<HTMLButtonElement, TableDisclosureProps>(
  function TableDisclosure({ expanded = false, type = "button", className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type={type}
        aria-expanded={expanded}
        className={cn(
          // On a touch screen the 24 box is a 44 target, as on Button.
          "inline-flex items-center justify-center shrink-0 size-[24px] p-0 border-none rounded-su-tag bg-transparent text-ink-3 cursor-pointer align-middle su-focus-ring [@media(hover:none)]:su-hit-44",
          "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
          "[@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink",
          className,
        )}
        {...rest}
      >
        <Glyph size={16} className={expanded ? undefined : "rtl:-scale-x-100"}>
          {expanded ? <path d="M6 9l6 6l6 -6" /> : <path d="M9 6l6 6l-6 6" />}
        </Glyph>
      </button>
    );
  },
);

export interface TableFacetProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Values chosen in this facet. Above 0 the button is active and shows the count. */
  count?: number;
  /** Active without a count. */
  active?: boolean;
}

/**
 * Column facet button after a header label. Idle: 24×24, funnel 14 ink-3, fill under a pointer.
 * Active: action-subtle with an action funnel and the count (12/16 600). Name it with
 * `aria-label` ("Zone filter, 2 chosen"); a Popover trigger adds `aria-expanded`.
 */
export const TableFacet = forwardRef<HTMLButtonElement, TableFacetProps>(function TableFacet(
  { count, active = false, type = "button", className, ...rest },
  ref,
) {
  const on = active || (count ?? 0) > 0;
  return (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center shrink-0 h-[24px] p-0 border-none rounded-su-tag font-sans cursor-pointer align-middle su-focus-ring [@media(hover:none)]:su-hit-44",
        "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
        on
          ? "gap-[2px] ps-[5px] pe-[6px] bg-action-subtle text-action-text [@media(hover:hover)]:hover:bg-action-subtle-hover"
          : "justify-center w-[24px] bg-transparent text-ink-3 [@media(hover:hover)]:hover:bg-fill data-[state=open]:bg-fill",
        className,
      )}
      {...rest}
    >
      <Glyph size={14}>
        <path d="M4 4h16v2.172a2 2 0 0 1 -.586 1.414l-4.414 4.414v7l-6 2v-8.5l-4.48 -4.928a2 2 0 0 1 -.52 -1.345v-2.227z" />
      </Glyph>
      {on && count ? (
        <span className="text-micro font-semibold su-tabular">{count}</span>
      ) : null}
    </button>
  );
});

export interface TableDetailProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** All the table's columns. */
  colSpan: number;
  /**
   * Props for the detail's own `<tr>` (`id`, `data-testid`, `role`, `aria-*`). Every other prop
   * reaches the `<td>` inside it.
   */
  rowProps?: TableRowAttributes;
  /**
   * Where the block starts, in px from the row's edge. Default 56, column 2 behind a 24
   * disclosure column. A table with no disclosure column, or a wider first column, lines the
   * block up with its own column (16 for the first one). Not used in the stacked shape.
   */
  startInset?: number;
  /**
   * The inline edit strip under a row: 12 below instead of 16, so one line of 28 controls makes
   * the strip 52 high (padding 12 16 12 56).
   */
  strip?: boolean;
}

/**
 * Detail block under an `expanded` row: padding 12 16 16 56 (lines up with column 2 behind the
 * 24 disclosure column), surface-2, bottom rule. Holds a `<Table size="nested">`.
 */
export function TableDetail({
  colSpan,
  rowProps,
  startInset,
  strip = false,
  className,
  style,
  children,
  ...rest
}: TableDetailProps) {
  const size = useContext(TableContext);
  const stacked = useContext(StackedContext);
  return (
    <tr
      // Stacked: an item of its own, so its contents do not sit loose between two records.
      role={stacked ? "listitem" : undefined}
      {...rowProps}
      className={cn(stacked && "block", "[&:last-child>*]:border-b-0", rowProps?.className)}
    >
      <td
        colSpan={colSpan}
        className={cn(
          // Stacked: no disclosure column to line up behind, so the block starts at the row's edge.
          stacked ? "block pt-su3" : "pt-su3 ps-[56px] pe-su4",
          strip ? "pb-su3" : "pb-su4",
          stacked ? stackedInline(size) : undefined,
          "bg-surface-2",
          ruleBottom,
          className,
        )}
        style={startInset != null && !stacked ? { paddingInlineStart: startInset, ...style } : style}
        {...rest}
      >
        {children}
      </td>
    </tr>
  );
}

export interface TableFoldRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** All the table's columns. */
  colSpan: number;
  /** 1-based column where the text starts. Default 1. */
  startColumn?: number;
  /** The 500 link that unfolds the rest ("Show them"). */
  action?: ReactNode;
}

/** Fold row, 36: "11 more tasks waiting" in 13/18 ink-2, then the link, 12 apart. */
export function TableFoldRow({
  colSpan,
  startColumn = 1,
  action,
  className,
  children,
  ...rest
}: TableFoldRowProps) {
  const size = useContext(TableContext);
  const stacked = useContext(StackedContext);
  // Stacked: there are no columns to start at, so the text starts at the row's edge.
  const lead = stacked ? 0 : Math.max(0, Math.min(startColumn - 1, colSpan - 1));
  return (
    <RowContext.Provider value={{ line: "single", expanded: false }}>
      <tr
        role={stacked ? "listitem" : undefined}
        className={cn(
          stacked ? "block" : "h-[var(--su-row-group)]",
          "text-small [&:last-child>*]:border-b-0",
          className,
        )}
        {...rest}
      >
        {Array.from({ length: lead }, (_, i) => (
          <TableTd key={i} />
        ))}
        <td
          colSpan={colSpan - lead}
          className={cn(
            // Stacked: 9 + 18 + 9 keeps the fold line at 36.
            stacked ? "block py-[9px]" : "py-[4px] align-middle",
            stacked ? stackedInline(size) : cellInline(size),
            ruleBottom,
          )}
        >
          <span className="inline-flex items-baseline gap-su3 flex-wrap">
            <span className="text-ink-2">{children}</span>
            {action != null ? <span className="font-medium">{action}</span> : null}
          </span>
        </td>
      </tr>
    </RowContext.Provider>
  );
}

export interface TableMetaProps extends HTMLAttributes<HTMLSpanElement> {
  /** Adds a 6px dot and colours `lead` in the tone's text colour. */
  tone?: StatusDotTone;
  /** Lead phrase in 500 ("Count to approve:"). */
  lead?: ReactNode;
  /** A 500 link after " · ". */
  action?: ReactNode;
}

const toneText: Record<StatusDotTone, string> = {
  neutral: "text-neutral-text",
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  danger: "text-danger-text",
};

/**
 * Content of a row's meta line: dot · lead · 13/18 ink-2 text · link. In a table one line, the
 * text cut with an ellipsis; in a stacked record the same sentence wraps and is read in full.
 */
export function TableMeta({ tone, lead, action, className, children, ...rest }: TableMetaProps) {
  const stacked = useContext(StackedContext);
  if (stacked) {
    return (
      <span className={cn("block min-w-0 break-words text-small text-ink-2", className)} {...rest}>
        {tone ? (
          <span
            aria-hidden="true"
            className={cn(
              "inline-block size-[6px] me-[6px] align-middle rounded-su-round forced-colors:[forced-color-adjust:none]",
              statusDotToneClass[tone],
            )}
          />
        ) : null}
        {lead != null ? (
          <>
            <span className={cn("font-medium", tone ? toneText[tone] : "text-ink")}>{lead}</span>{" "}
          </>
        ) : null}
        {children}
        {action != null ? (
          <>
            {" "}
            <span aria-hidden="true">·</span> <span className="font-medium">{action}</span>
          </>
        ) : null}
      </span>
    );
  }
  return (
    <span
      className={cn(
        "flex items-center gap-[6px] min-w-0 text-small text-ink-2 whitespace-nowrap",
        className,
      )}
      {...rest}
    >
      {tone ? (
        <span
          aria-hidden="true"
          className={cn(
            "inline-block shrink-0 size-[6px] rounded-su-round forced-colors:[forced-color-adjust:none]",
            statusDotToneClass[tone],
          )}
        />
      ) : null}
      {lead != null ? (
        <span className={cn("shrink-0 font-medium", tone ? toneText[tone] : "text-ink")}>{lead}</span>
      ) : null}
      {children != null ? <span className="min-w-0 truncate">{children}</span> : null}
      {action != null ? (
        <>
          <span aria-hidden="true">·</span>
          <span className="shrink-0 font-medium">{action}</span>
        </>
      ) : null}
    </span>
  );
}

export interface TableSkeletonRowProps extends HTMLAttributes<HTMLTableRowElement> {
  /** All the table's columns. */
  columns: number;
}

/** Loading placeholder row (40, 32 when nested). Pair with `<Table loading>`. */
export function TableSkeletonRow({ columns, className, ...rest }: TableSkeletonRowProps) {
  const size = useContext(TableContext);
  const stacked = useContext(StackedContext);
  return (
    <RowContext.Provider value={{ line: "single", expanded: false }}>
      <tr
        aria-hidden="true"
        className={cn(
          size === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]",
          stacked ? "flex items-center gap-su3" : "[&:last-child>*]:border-b-0",
          stacked ? stackedInline(size) : undefined,
          stacked ? stackedRule : undefined,
          className,
        )}
        {...rest}
      >
        {Array.from({ length: columns }, (_, i) => (
          <TableTd key={i} className={stacked ? "flex-1" : undefined}>
            <span className="block h-[12px] w-full max-w-[160px] rounded-su-tag su-skeleton-active" />
          </TableTd>
        ))}
      </tr>
    </RowContext.Provider>
  );
}

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Th = TableTh;
Table.Td = TableTd;
Table.GroupRow = TableGroupRow;
Table.Disclosure = TableDisclosure;
Table.Facet = TableFacet;
Table.Detail = TableDetail;
Table.FoldRow = TableFoldRow;
Table.Meta = TableMeta;
Table.SkeletonRow = TableSkeletonRow;
