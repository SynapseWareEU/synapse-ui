import type { ButtonHTMLAttributes, ReactNode } from "react";
import { selectTriggerClass, selectTriggerSizeClass } from "./Input";
import type { InputSize, SelectOption } from "./types";
/** Shared combobox trigger surface: Select, Cascader, TreeSelect (defined beside the field in Input). */
export { selectTriggerClass, selectTriggerSizeClass };
export type SelectVariant = "outlined" | "ghost";
/**
 * Anything else (`aria-label`, `aria-labelledby`, `data-testid`, `id`, `autoFocus`, `onBlur`…)
 * lands on the trigger, the `role="combobox"` button.
 */
export interface SelectProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value" | "defaultValue" | "prefix" | "children" | "name" | "form" | "type"> {
    value?: string;
    defaultValue?: string;
    /** What an empty trigger reads, in ink-3. Default "Select…". */
    placeholder?: string;
    disabled?: boolean;
    size?: InputSize;
    options?: SelectOption[];
    className?: string;
    children?: ReactNode;
    /**
     * Toolbar form ("Grupează: Produs"): a lead-in drawn in ink-2 before the value, which stays ink.
     * The trigger then sizes to its content instead of filling the row. On a `ghost` trigger it is
     * a leading slot of its own, 8 before the value and never cut with it (the 16 building icon of
     * a site switcher).
     */
    prefix?: ReactNode;
    /**
     * `outlined` (default): the field. `ghost`: no border and no ground, for a picker that sits in
     * chrome rather than in a form (the header's site switcher): 36 tall, padding 0 10, radius 6,
     * `fill` under a pointer and while open, an option's `code` in mono 600. It sizes to its
     * content; cap it with a `max-w-*` class. On a touch screen its hit area is 44 tall.
     */
    variant?: SelectVariant;
    /**
     * The phone form of a `ghost` trigger (a phone header's site switcher): the chosen option's
     * `code` alone, its name left to the list, in a 44 tall box with padding 0 8 and 6 before the
     * chevron. It replaces `size`. No effect on an `outlined` trigger.
     */
    compact?: boolean;
    /** What the list says when there are no `options`. Default "No options". */
    emptyContent?: ReactNode;
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
export declare function Select({ value, defaultValue, placeholder, disabled, size: sizeProp, options, className, children, prefix, variant, compact, emptyContent, onValueChange, ...rest }: SelectProps): import("react").JSX.Element;
//# sourceMappingURL=Select.d.ts.map