import type { HTMLAttributes, ReactNode } from "react";
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
export declare function Statistic({ title, value, prefix, suffix, description, compact, className, ...rest }: StatisticProps): import("react").JSX.Element;
//# sourceMappingURL=Statistic.d.ts.map