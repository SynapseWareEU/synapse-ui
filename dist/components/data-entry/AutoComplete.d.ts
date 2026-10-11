import { type FocusEvent, type InputHTMLAttributes, type ReactNode } from "react";
import type { InputSize, SelectOption } from "./types";
/**
 * Anything else (`data-testid`, `autoFocus`, `aria-describedby`, `aria-invalid`, `required`,
 * `onKeyDown`, `onClick`…) lands on the `<input>`, the `role="combobox"` element.
 */
export interface AutoCompleteProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "onSelect" | "size" | "prefix" | "children" | "type" | "role" | "autoComplete" | "style"> {
    /** The visible text. In a `picker`, the chosen option's `value` ("" for none). */
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
    /**
     * Native input name, so the field is picked up by form submission / FormData. In a `picker` the
     * name posts the held option's `value`, from a hidden input: the visible box carries the line
     * that is read or the typed term, and has no name.
     */
    name?: string;
    /** Show a clear affix once there is a value. */
    allowClear?: boolean;
    /** Suggestions are in flight — shows a searching row instead of "no matches". */
    loading?: boolean;
    /** Replaces the default "No matches" row. */
    notFoundContent?: ReactNode;
    /**
     * The `value` of the option the caller holds, for a box whose text is not that option's `label`
     * (a code + name pair read as one line). That option is the one marked `aria-selected`.
     * Absent, the option whose `label` is the visible text is.
     */
    selectedValue?: string;
    /**
     * The picker form, for a reference to a record (a foreign key): `value` is the chosen option's
     * `value`, not the visible text, and `onChange` fires with it on a pick and with "" on a clear.
     * At rest the box draws the chosen option as the list does: its `code` in mono 500, then its
     * name in ink-2, cut with an ellipsis. Typing searches: the pair gives way to the typed term,
     * the list is narrowed by code and name (or by the caller, see `onSearch`), and the term is
     * dropped again on a pick, a clear or when focus leaves, so the box never keeps text that is not
     * the value (Escape closes the list and drops the term too). The list opens whenever the box
     * does, and says `notFoundContent` when it has no rows. Enter never submits the enclosing form,
     * and picks nothing while `loading`: the rows of the search before are not the ones on screen.
     * Until a term is typed the active row is the held option's, or none: Enter on a box that was
     * only focused changes nothing, and an arrow key starts the walk. A `value` that is no option's
     * reads as itself: keep the held option among `options` (it is remembered after a pick).
     */
    picker?: boolean;
    /**
     * Picker only: every typed term, and "" when the term is dropped. With it the list is the
     * caller's to narrow (a server search) and `options` are shown as given.
     */
    onSearch?: (term: string) => void;
    /** Name of the list of suggestions. Default "Suggestions". */
    listLabel?: string;
    /** The row shown while `loading`. Default "Searching…". */
    loadingContent?: ReactNode;
    /** What is announced when the list changes: how many rows it has. Default "{n} suggestions". */
    countLabel?: (count: number) => string;
    /** Name of the clear button (`allowClear`). Default "Clear". */
    clearLabel?: string;
    "aria-label"?: string;
    "aria-labelledby"?: string;
    /**
     * Fires with the visible text — including the option's `label` when one is picked. In a
     * `picker`: with the chosen option's `value`, or "" when cleared.
     */
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
export declare function AutoComplete({ value: valueProp, defaultValue, placeholder, disabled, size, options, filterOption: filterOptionProp, className, id, name, allowClear, loading, notFoundContent, selectedValue, picker, onSearch, listLabel, loadingContent, countLabel, clearLabel, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, onChange, onSelect, onClear, onFocus, onBlur, onKeyDown, onClick, ...rest }: AutoCompleteProps): import("react").JSX.Element;
//# sourceMappingURL=AutoComplete.d.ts.map