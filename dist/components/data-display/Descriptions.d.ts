import type { HTMLAttributes, ReactNode } from "react";
export interface DescriptionItem {
    label: ReactNode;
    value?: ReactNode;
    span?: number;
}
export interface DescriptionsProps extends Omit<HTMLAttributes<HTMLDListElement>, "title"> {
    /** 14/20 600 ink, 12 above the items. */
    title?: ReactNode;
    /** Right-aligned action beside the title (same idiom as Card). */
    extra?: ReactNode;
    items: DescriptionItem[];
    column?: number;
    /** Boxed as a card: surface, 1px border, radius 8, padding 16. */
    bordered?: boolean;
    /**
     * `vertical` (default): the read-out, label 13/18 500 ink-2 above the value 14/20 ink, 4 apart,
     * items 16 apart. `horizontal`: the label in a 160 column, rows 32.
     */
    layout?: "vertical" | "horizontal";
}
export declare function Descriptions({ title, extra, items, column, bordered, layout, className, ...rest }: DescriptionsProps): import("react").JSX.Element;
//# sourceMappingURL=Descriptions.d.ts.map