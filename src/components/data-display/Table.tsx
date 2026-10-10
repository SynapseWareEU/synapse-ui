import {
  Children,
  createContext,
  forwardRef,
  isValidElement,
  useContext,
  type ButtonHTMLAttributes,
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
 * Column gap 16: cells pad 8 inline, the first and last cell pad 16 at the edge.
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

type Section = "head" | "body" | "foot" | undefined;
type Line = "single" | "first" | "meta";

const TableContext = createContext<TableSize>("default");
const SectionContext = createContext<Section>(undefined);
const RowContext = createContext<{ line: Line; expanded: boolean }>({
  line: "single",
  expanded: false,
});

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
const cellInline = (size: TableSize) =>
  size === "nested"
    ? "px-su2 first:ps-[15px] last:pe-[15px]"
    : "px-su2 first:ps-su4 last:pe-su4";
const ruleBottom = "border-b border-solid border-border";

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
  /** Marks the table busy (`aria-busy`). Render `<Table.SkeletonRow>`s of 40 in the body meanwhile. */
  loading?: boolean;
  children?: ReactNode;
}

export function Table({
  striped: _striped,
  bordered: _bordered,
  size = "default",
  empty,
  footer,
  loading = false,
  className,
  children,
  ...rest
}: TableProps) {
  return (
    <TableContext.Provider value={size}>
      <SectionContext.Provider value={undefined}>
        <div className="su-panel font-sans text-ink">
          {/* `relative`: the scroller is the containing block for absolutely positioned cell
              content (an `sr-only` header label), so it cannot escape the scroll and widen the page. */}
          <div className="relative overflow-x-auto">
            <table
              aria-busy={loading || undefined}
              className={cn(
                "w-full border-separate [border-spacing:0] text-start",
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
            <div className="flex items-center gap-su2 min-h-[var(--su-panel-footer)] px-su4 border-t border-solid border-border text-small text-ink-2">
              {footer}
            </div>
          ) : null}
        </div>
      </SectionContext.Provider>
    </TableContext.Provider>
  );
}

export function TableHead({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <SectionContext.Provider value="head">
      <thead className={className} {...rest}>
        {children}
      </thead>
    </SectionContext.Provider>
  );
}

export function TableBody({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <SectionContext.Provider value="body">
      <tbody className={className} {...rest}>
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
  className,
  children,
  ...rest
}: TableRowProps) {
  const section = useContext(SectionContext);
  const size = useContext(TableContext);

  if (section === "head") {
    return (
      <tr
        className={cn(
          size === "nested" ? "h-[var(--su-row-nested-header)]" : "h-[var(--su-row-header)]",
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
          className={cn("h-[30px]", tone, motion, "[&:last-child>*]:border-b-0")}
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

  // A <th scope="row"> inside the body reads as a body cell, not a header.
  if (section === "body") {
    return (
      <th
        className={cn(
          cellInline(size),
          bodyCell(line, expanded, (rest.rowSpan ?? 1) > 1),
          "[font-weight:inherit]",
          numeric ? "text-end" : "text-start",
          className,
        )}
        {...rest}
      >
        {children}
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
      className="inline-flex items-center gap-su1 p-0 border-none rounded-su-tag bg-transparent text-inherit cursor-pointer whitespace-nowrap su-focus-ring [@media(hover:hover)]:hover:text-ink"
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
        ruleBottom,
        size === "nested" ? "text-micro" : "text-small",
        sorted ? "text-ink" : "text-ink-2",
        numeric ? "text-end" : "text-start",
        className,
      )}
      {...rest}
    >
      {facet != null || arrow || onSort ? (
        <span className="inline-flex items-center gap-su1 align-middle">
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

export function TableTd({
  numeric = false,
  kind = "text",
  className,
  children,
  rowSpan,
  ...rest
}: TableTdProps) {
  const size = useContext(TableContext);
  const { line, expanded } = useContext(RowContext);
  const end = numeric || kind === "number" || kind === "actions";
  const content = kind === "empty" && children == null ? "—" : children;
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
  return (
    <RowContext.Provider value={{ line: "single", expanded: false }}>
      <tr
        className={cn(
          "h-[var(--su-row-group)] bg-surface-2 text-small font-semibold text-ink [&:last-child>*]:border-b-0",
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
          "inline-flex items-center justify-center shrink-0 size-[24px] p-0 border-none rounded-su-tag bg-transparent text-ink-3 cursor-pointer align-middle su-focus-ring",
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
        "inline-flex items-center shrink-0 h-[24px] p-0 border-none rounded-su-tag font-sans cursor-pointer align-middle su-focus-ring",
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
}

/**
 * Detail block under an `expanded` row: padding 12 16 16 56 (lines up with column 2 behind the
 * 24 disclosure column), surface-2, bottom rule. Holds a `<Table size="nested">`.
 */
export function TableDetail({ colSpan, className, children, ...rest }: TableDetailProps) {
  return (
    <tr className="[&:last-child>*]:border-b-0">
      <td
        colSpan={colSpan}
        className={cn("pt-su3 pb-su4 ps-[56px] pe-su4 bg-surface-2", ruleBottom, className)}
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
  const lead = Math.max(0, Math.min(startColumn - 1, colSpan - 1));
  return (
    <RowContext.Provider value={{ line: "single", expanded: false }}>
      <tr
        className={cn("h-[var(--su-row-group)] text-small [&:last-child>*]:border-b-0", className)}
        {...rest}
      >
        {Array.from({ length: lead }, (_, i) => (
          <TableTd key={i} />
        ))}
        <td colSpan={colSpan - lead} className={cn(cellInline(size), "py-[4px] align-middle", ruleBottom)}>
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

/** Content of a row's meta line: dot · lead · 13/18 ink-2 text · link. */
export function TableMeta({ tone, lead, action, className, children, ...rest }: TableMetaProps) {
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
  return (
    <RowContext.Provider value={{ line: "single", expanded: false }}>
      <tr
        aria-hidden="true"
        className={cn(
          size === "nested" ? "h-[var(--su-row-nested)]" : "h-[var(--su-row)]",
          "[&:last-child>*]:border-b-0",
          className,
        )}
        {...rest}
      >
        {Array.from({ length: columns }, (_, i) => (
          <TableTd key={i}>
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
