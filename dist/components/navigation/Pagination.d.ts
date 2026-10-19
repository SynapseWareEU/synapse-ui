import type { HTMLAttributes, ReactNode } from "react";
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
declare function range(start: number, end: number): number[];
export declare function Pagination({ current, total: totalProp, totalPages, pageSize, onChange, siblingCount, disabled, hideOnSinglePage, variant, hasNext: hasNextProp, labels, className, ...rest }: PaginationProps): import("react").JSX.Element | null;
export { range as paginationRange };
//# sourceMappingURL=Pagination.d.ts.map