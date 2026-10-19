import type { HTMLAttributes, ReactNode } from "react";
export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
    /** Shimmer from fill to surface-2 over 1.4s (static under reduced motion). */
    active?: boolean;
    width?: number | string;
    /**
     * Block height, 12 by default (a text line). Up to 16 it reads as text and rounds to 4;
     * taller blocks are control shapes and round to 6. Table skeleton rows are 40.
     */
    height?: number | string;
    /** A circle sized from `height` (avatars). */
    circle?: boolean;
    rows?: number;
    /** When explicitly `false`, render `children` instead of the placeholder. */
    loading?: boolean;
    /**
     * What a screen reader hears while the placeholder is shown. Default: "Loading". Pass the
     * application's own words, or `null` when the caller announces the state itself: the skeleton
     * is then decoration only (`aria-hidden`, no `status` role, no text in the DOM).
     */
    label?: string | null;
    children?: ReactNode;
}
/** Loading placeholder (spec §4.4): blocks in fill, no borders. */
export declare function Skeleton({ active, width, height, circle, rows, loading, label, children, className, style, ...rest }: SkeletonProps): import("react").JSX.Element;
//# sourceMappingURL=Skeleton.d.ts.map