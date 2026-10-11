import { type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode, type TdHTMLAttributes, type ThHTMLAttributes } from "react";
import { type StatusDotTone } from "./StatusDot";
export type TableSize = "default" | "nested";
/** Cell kinds bake in the face rule: mono only for identifiers. */
export type TableCellKind = "text" | "id" | "idSecondary" | "secondary" | "number" | "empty" | "control" | "actions";
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
export declare function Table({ striped: _striped, bordered: _bordered, size, empty, footer, loading, stack, className, children, ...rest }: TableProps): import("react").JSX.Element;
export declare namespace Table {
    var Head: typeof TableHead;
    var Body: typeof TableBody;
    var Row: typeof TableRow;
    var Th: typeof TableTh;
    var Td: typeof TableTd;
    var GroupRow: typeof TableGroupRow;
    var Disclosure: import("react").ForwardRefExoticComponent<TableDisclosureProps & import("react").RefAttributes<HTMLButtonElement>>;
    var Facet: import("react").ForwardRefExoticComponent<TableFacetProps & import("react").RefAttributes<HTMLButtonElement>>;
    var Detail: typeof TableDetail;
    var FoldRow: typeof TableFoldRow;
    var Meta: typeof TableMeta;
    var SkeletonRow: typeof TableSkeletonRow;
}
export declare function TableHead({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>): import("react").JSX.Element;
export declare function TableBody({ className, children, ...rest }: HTMLAttributes<HTMLTableSectionElement>): import("react").JSX.Element;
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
export declare function TableRow({ selected, expanded, meta, metaStart, metaRowProps, className, children, ...rest }: TableRowProps): import("react").JSX.Element;
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
export declare function TableTh({ numeric, sort, onSort, facet, className, children, ...rest }: TableThProps): import("react").JSX.Element;
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
export declare function TableTd({ numeric, kind, className, children, rowSpan, ...rest }: TableTdProps): import("react").JSX.Element;
/** Group row, 36: surface-2, 13/18 600 ink. Put a `Table.Disclosure` in the first cell. */
export declare function TableGroupRow({ className, children, ...rest }: HTMLAttributes<HTMLTableRowElement>): import("react").JSX.Element;
export interface TableDisclosureProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    /** Open: chevron-down and `aria-expanded`. Point `aria-controls` at the `Table.Detail` id. */
    expanded?: boolean;
}
/** 24×24 ghost button, radius 4, chevron 16 ink-3. Give it an `aria-label` ("Show pallets in A-01"). */
export declare const TableDisclosure: import("react").ForwardRefExoticComponent<TableDisclosureProps & import("react").RefAttributes<HTMLButtonElement>>;
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
export declare const TableFacet: import("react").ForwardRefExoticComponent<TableFacetProps & import("react").RefAttributes<HTMLButtonElement>>;
export interface TableDetailProps extends TdHTMLAttributes<HTMLTableCellElement> {
    /** All the table's columns. */
    colSpan: number;
    /**
     * Props for the detail's own `<tr>` (`id`, `data-testid`, `role`, `aria-*`). Every other prop
     * reaches the `<td>` inside it.
     */
    rowProps?: TableRowAttributes;
}
/**
 * Detail block under an `expanded` row: padding 12 16 16 56 (lines up with column 2 behind the
 * 24 disclosure column), surface-2, bottom rule. Holds a `<Table size="nested">`.
 */
export declare function TableDetail({ colSpan, rowProps, className, children, ...rest }: TableDetailProps): import("react").JSX.Element;
export interface TableFoldRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** All the table's columns. */
    colSpan: number;
    /** 1-based column where the text starts. Default 1. */
    startColumn?: number;
    /** The 500 link that unfolds the rest ("Show them"). */
    action?: ReactNode;
}
/** Fold row, 36: "11 more tasks waiting" in 13/18 ink-2, then the link, 12 apart. */
export declare function TableFoldRow({ colSpan, startColumn, action, className, children, ...rest }: TableFoldRowProps): import("react").JSX.Element;
export interface TableMetaProps extends HTMLAttributes<HTMLSpanElement> {
    /** Adds a 6px dot and colours `lead` in the tone's text colour. */
    tone?: StatusDotTone;
    /** Lead phrase in 500 ("Count to approve:"). */
    lead?: ReactNode;
    /** A 500 link after " · ". */
    action?: ReactNode;
}
/**
 * Content of a row's meta line: dot · lead · 13/18 ink-2 text · link. In a table one line, the
 * text cut with an ellipsis; in a stacked record the same sentence wraps and is read in full.
 */
export declare function TableMeta({ tone, lead, action, className, children, ...rest }: TableMetaProps): import("react").JSX.Element;
export interface TableSkeletonRowProps extends HTMLAttributes<HTMLTableRowElement> {
    /** All the table's columns. */
    columns: number;
}
/** Loading placeholder row (40, 32 when nested). Pair with `<Table loading>`. */
export declare function TableSkeletonRow({ columns, className, ...rest }: TableSkeletonRowProps): import("react").JSX.Element;
//# sourceMappingURL=Table.d.ts.map