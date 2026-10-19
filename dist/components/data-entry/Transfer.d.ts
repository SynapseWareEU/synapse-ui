import type { SelectOption } from "./types";
export interface TransferProps {
    dataSource?: SelectOption[];
    targetKeys?: string[];
    defaultTargetKeys?: string[];
    disabled?: boolean;
    titles?: [string, string];
    /** A 32px search field at the top of each list; it filters the rows by label. */
    showSearch?: boolean;
    /** Placeholder of the search fields. Default `"Search"`. */
    searchPlaceholder?: string;
    className?: string;
    onChange?: (targetKeys: string[]) => void;
}
export declare function Transfer({ dataSource, targetKeys: targetKeysProp, defaultTargetKeys, disabled, titles, showSearch, searchPlaceholder, className, onChange, }: TransferProps): import("react").JSX.Element;
//# sourceMappingURL=Transfer.d.ts.map