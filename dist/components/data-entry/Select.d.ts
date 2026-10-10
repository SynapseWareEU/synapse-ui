import type { ReactNode } from "react";
import { selectTriggerClass, selectTriggerSizeClass } from "./Input";
import type { InputSize, SelectOption } from "./types";
/** Shared combobox trigger surface: Select, Cascader, TreeSelect (defined beside the field in Input). */
export { selectTriggerClass, selectTriggerSizeClass };
export interface SelectProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: InputSize;
    options?: SelectOption[];
    className?: string;
    children?: ReactNode;
    /**
     * Toolbar form ("Grupează: Produs"): a lead-in drawn in ink-2 before the value, which stays ink.
     * The trigger then sizes to its content instead of filling the row.
     */
    prefix?: ReactNode;
    onValueChange?: (value: string) => void;
}
/**
 * An option's main line. With a `code` it is the reference pair (§2.2): the code in mono 500,
 * 8 apart and baseline-aligned, then the name in ink-2 with an ellipsis. `label` overrides the
 * rendered name (AutoComplete passes the match-highlighted one).
 */
export declare function SelectOptionLabel({ option, label }: {
    option: SelectOption;
    label?: ReactNode;
}): import("react").JSX.Element;
export declare function Select({ value, defaultValue, placeholder, disabled, size: sizeProp, options, className, children, prefix, onValueChange, }: SelectProps): import("react").JSX.Element;
//# sourceMappingURL=Select.d.ts.map