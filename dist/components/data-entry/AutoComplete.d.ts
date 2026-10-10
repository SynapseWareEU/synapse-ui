import { type FocusEvent, type ReactNode } from "react";
import type { InputSize, SelectOption } from "./types";
export interface AutoCompleteProps {
    value?: string;
    defaultValue?: string;
    placeholder?: string;
    disabled?: boolean;
    size?: InputSize;
    options?: SelectOption[];
    filterOption?: (input: string, option: SelectOption) => boolean;
    className?: string;
    /** Native input id — also the target of an external `<label for>`. */
    id?: string;
    /** Native input name, so the field is picked up by form submission / FormData. */
    name?: string;
    /** Show a clear affix once there is a value. */
    allowClear?: boolean;
    /** Suggestions are in flight — shows a searching row instead of "no matches". */
    loading?: boolean;
    /** Replaces the default "No matches" row. */
    notFoundContent?: ReactNode;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    /** Fires with the visible text — including the option's `label` when one is picked. */
    onChange?: (value: string) => void;
    /** Fires with the option's `value`; the input shows `label`, so don't feed this back into `value`. */
    onSelect?: (value: string, option: SelectOption) => void;
    onClear?: () => void;
    onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
    onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
}
/** Anchored suggestion surface: `su-popover`, 4 below the field, as wide as it, 280 max. The parent must be `relative`. */
export declare const comboboxPanelClass = "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none";
/** Empty / busy row: 13/18 ink-2, padding 8. Sentence case, not mono. */
export declare const comboboxNoticeClass = "p-su2 text-small text-ink-2 text-start";
/**
 * One suggestion (§4.2 AutoComplete, D): 32 tall, padding 0 8, radius 4, 14/20 ink.
 * The active descendant (what Enter will pick) is action-subtle, as the palette does; pointer
 * hover is surface-hover, or action-subtle-hover on the active row. Disabled: ink-3.
 * Under prefers-contrast / forced colours the active row also gets an inset outline.
 */
export declare const comboboxOptionClass = "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";
/** A suggestion's content: the label (or code + name pair) with the match in 500, then the description line. */
export declare function ComboboxOptionContent({ option, query }: {
    option: SelectOption;
    query?: string | null;
}): import("react").JSX.Element;
/** Default empty-state copy, shared so both components say the same thing. */
export declare const NO_MATCHES = "No matches";
export declare function AutoComplete({ value: valueProp, defaultValue, placeholder, disabled, size, options, filterOption, className, id, name, allowClear, loading, notFoundContent, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, onChange, onSelect, onClear, onFocus, onBlur, }: AutoCompleteProps): import("react").JSX.Element;
//# sourceMappingURL=AutoComplete.d.ts.map