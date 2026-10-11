import {
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useOutsideClick } from "../../hooks/useOutsideClick";
import { cn } from "../../utils/cn";
import { useFieldState } from "./Form";
import { FieldClearButton, Input, fieldClearPadding, inputSizeClass } from "./Input";
import { SelectOptionLabel } from "./Select";
import type { InputSize, SelectOption } from "./types";

/**
 * Anything else (`data-testid`, `autoFocus`, `aria-describedby`, `aria-invalid`, `required`,
 * `onKeyDown`, `onClick`…) lands on the `<input>`, the `role="combobox"` element.
 */
export interface AutoCompleteProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "value"
    | "defaultValue"
    | "onChange"
    | "onSelect"
    | "size"
    | "prefix"
    | "children"
    | "type"
    | "role"
    | "autoComplete"
    | "style"
  > {
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

function defaultFilter(input: string, option: SelectOption): boolean {
  return option.label.toLowerCase().includes(input.toLowerCase());
}

/** A picker is searched by what its rows read: the code as well as the name. */
function pickerFilter(input: string, option: SelectOption): boolean {
  const term = input.toLowerCase();
  return option.label.toLowerCase().includes(term) || (option.code ?? "").toLowerCase().includes(term);
}

/** A picked option as the one line the box holds: "CODE name". The pair is drawn over it. */
function optionText(option: SelectOption): string {
  return option.code ? (option.label ? `${option.code} ${option.label}` : option.code) : option.label;
}

const defaultCountLabel = (count: number) => `${count} suggestions`;

/* Listbox chrome shared with Mentions — one copy so the two can't drift again. */

/** Anchored suggestion surface: `su-popover`, 4 below the field, as wide as it, 280 max. The parent must be `relative`. */
export const comboboxPanelClass =
  "su-popover absolute top-full inset-x-0 mt-su1 overflow-y-auto overscroll-contain max-h-[min(var(--su-dropdown-max-h),50vh)] animate-su-dropdown-in motion-reduce:animate-none";

/** Empty / busy row: 13/18 ink-2, padding 8. Sentence case, not mono. */
export const comboboxNoticeClass = "p-su2 text-small text-ink-2 text-start";

/**
 * One suggestion (§4.2 AutoComplete, D): 32 tall, padding 0 8, radius 4, 14/20 ink.
 * The active descendant (what Enter will pick) is action-subtle, as the palette does; pointer
 * hover is surface-hover, or action-subtle-hover on the active row. Disabled: ink-3.
 * Under prefers-contrast / forced colours the active row also gets an inset outline.
 */
export const comboboxOptionClass =
  "flex items-center gap-su2 w-full min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 py-[6px] rounded-su-tag bg-transparent font-sans text-body text-ink text-start [overflow-wrap:anywhere] cursor-pointer outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none data-[active]:bg-action-subtle [@media(hover:hover)]:[&:hover:not([data-active]):not([data-disabled])]:bg-surface-hover [@media(hover:hover)]:data-[active]:hover:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[active]:outline-2 contrast-more:data-[active]:outline-solid contrast-more:data-[active]:outline-ink contrast-more:data-[active]:-outline-offset-2 forced-colors:data-[active]:outline-2 forced-colors:data-[active]:outline-solid forced-colors:data-[active]:-outline-offset-2";

/** `label` with the first case-insensitive occurrence of `query` in 500 (matched text, §4.2). */
function highlightMatch(label: string, query: string | null | undefined): ReactNode {
  if (!query) return label;
  const lower = label.toLowerCase();
  // Some characters change length when lower-cased; the indices would no longer line up.
  if (lower.length !== label.length) return label;
  const at = lower.indexOf(query.toLowerCase());
  if (at === -1) return label;
  const end = at + query.length;
  return (
    <>
      {label.slice(0, at)}
      <span className="font-medium">{label.slice(at, end)}</span>
      {label.slice(end)}
    </>
  );
}

/** A suggestion's content: the label (or code + name pair) with the match in 500, then the description line. */
export function ComboboxOptionContent({ option, query }: { option: SelectOption; query?: string | null }) {
  return (
    <span className="flex-1 min-w-0">
      <span className="block">
        <SelectOptionLabel option={option} label={highlightMatch(option.label, query)} />
      </span>
      {option.description ? (
        <span className="block text-small text-ink-2">{option.description}</span>
      ) : null}
    </span>
  );
}

/** Default empty-state copy, shared so both components say the same thing. */
export const NO_MATCHES = "No matches";

export function AutoComplete({
  value: valueProp,
  defaultValue = "",
  placeholder,
  disabled,
  size,
  options = [],
  filterOption: filterOptionProp,
  className,
  id,
  name,
  allowClear,
  loading,
  notFoundContent,
  selectedValue,
  picker = false,
  onSearch,
  listLabel = "Suggestions",
  loadingContent = "Searching…",
  countLabel = defaultCountLabel,
  clearLabel,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  onChange,
  onSelect,
  onClear,
  onFocus,
  onBlur,
  onKeyDown,
  onClick,
  ...rest
}: AutoCompleteProps) {
  const listId = useId();
  const { size: fieldSize, disabled: isDisabled } = useFieldState(size, disabled);
  const [internal, setInternal] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  // `null`: no arrow key yet, the active row is the default one (see `active`).
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  // false right after a pick, so reopening browses the whole list instead of the one committed label
  const filteringRef = useRef(true);

  const inputRef = useRef<HTMLInputElement>(null);
  // Picker: what is being typed (`null` at rest, when the box shows the value), the option last
  // picked (a server search may no longer list it), and whether the box has focus.
  const [term, setTerm] = useState<string | null>(null);
  const [picked, setPicked] = useState<SelectOption>();
  const [focused, setFocused] = useState(false);

  const isControlled = valueProp !== undefined;
  const held = isControlled ? valueProp : internal;
  const current = picker
    ? (options.find((opt) => opt.value === held) ?? (picked?.value === held ? picked : undefined))
    : undefined;
  // The text in the box. Picker: the term while typing, else the held option's line, else the raw value.
  const value = picker ? (term ?? (current ? optionText(current) : held)) : held;
  // The pair is drawn over the text only where there is a pair to draw.
  const paired = picker && term === null && current?.code ? current : undefined;
  const filterOption = filterOptionProp ?? (picker ? pickerFilter : defaultFilter);

  // ponytail: filter on every render — a few dozen substring tests is cheaper than
  // keeping a memo honest about `filteringRef`. Memoise if option counts reach thousands.
  const filtered = picker
    ? term && !onSearch
      ? options.filter((opt) => filterOption(term, opt))
      : options
    : value && filteringRef.current
      ? options.filter((opt) => filterOption(value, opt))
      : options;
  const query = picker ? term : value && filteringRef.current ? value : null;

  /** Next enabled index from `from`, wrapping; `from = -1, dir = 1` gives the first enabled one. */
  const step = (from: number, dir: 1 | -1) => {
    const n = filtered.length;
    if (!n) return 0;
    let i = from;
    for (let k = 0; k < n; k++) {
      i = (i + dir + n) % n;
      if (!filtered[i].disabled) return i;
    }
    return Math.max(from, 0);
  };

  // activeIndex can outlive the list it was picked in (async options, a new filter)
  const clamped = Math.max(0, Math.min(activeIndex ?? 0, filtered.length - 1));
  // A picker with no term typed is showing its value, and Enter must not re-point it: the active
  // row is the held option's, or none (-1), until an arrow key moves it. Anywhere else it is the
  // first enabled row, what Enter is expected to pick after typing.
  const active =
    activeIndex === null && picker && !term
      ? held === ""
        ? -1
        : filtered.findIndex((opt) => opt.value === held)
      : filtered[clamped]?.disabled
        ? step(clamped, 1)
        : clamped;
  // While loading the list reads the searching row: the options held are the search before's,
  // and nothing the user cannot see may be picked or announced as active.
  const activeOption = loading ? undefined : filtered[active];

  const emitChange = (next: string) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  /** Picker: back to rest. The caller's search goes with the term. */
  const dropTerm = () => {
    if (term === null) return;
    setTerm(null);
    onSearch?.("");
  };

  const selectOption = (option: SelectOption) => {
    if (option.disabled) return;
    filteringRef.current = false;
    if (picker) {
      setPicked(option);
      dropTerm();
      emitChange(option.value);
    } else {
      emitChange(option.label);
    }
    onSelect?.(option.value, option);
    setActiveIndex(null);
    setOpen(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOpen(true);
    setActiveIndex(null);
    if (!picker) {
      filteringRef.current = true;
      emitChange(event.target.value);
      return;
    }
    let next = event.target.value;
    if (term === null && current) {
      // The first edit of a box at rest replaces the value's line, wherever the caret was: what
      // was typed, pasted, composed or put in by autocorrect is the term, and a deletion asks for
      // the whole list. A value set from outside (a test's fill) carries no `data` and is taken whole.
      const native = event.nativeEvent as Partial<InputEvent>;
      if (native.inputType?.startsWith("delete")) next = "";
      else if (native.inputType?.startsWith("insert") && native.data != null) next = native.data;
    }
    setTerm(next);
    onSearch?.(next);
  };

  /** Picker at rest: the whole line is selected, so typing replaces it. */
  const selectLine = () => {
    if (picker && term === null && current) inputRef.current?.select();
  };

  // Safari: pressing a non-focusable area doesn't always blur the input, so onBlur alone isn't enough
  useOutsideClick(rootRef, () => setOpen(false), open);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented) return;
    // A picker's Enter picks, or does nothing: the Enter right after a pick, on a closed list,
    // would otherwise submit the form the picker stands in.
    if (picker && event.key === "Enter") event.preventDefault();
    if (!open) {
      if (event.key === "ArrowDown" || event.key === "ArrowUp") {
        event.preventDefault();
        setOpen(true);
      }
      return;
    }
    // ponytail: no Home/End binding — in an editable combobox those belong to the caret.
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex(step(active, 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      // From no active row, up starts at the last one, as down starts at the first.
      setActiveIndex(step(Math.max(active, 0), -1));
    } else if (event.key === "Enter") {
      event.preventDefault(); // never let an open list submit the enclosing form
      if (loading) return;
      if (activeOption && !activeOption.disabled) selectOption(activeOption);
      else setOpen(false);
    } else if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation(); // otherwise the same key also dismisses the surrounding Modal/Drawer
      setOpen(false);
      if (picker) {
        dropTerm();
        setActiveIndex(null);
      }
    }
  };

  // A picker is cleared of its value, not of its text: the button stays while a term (or an
  // emptied box) stands over a value still held.
  const showClear = Boolean(allowClear && (picker ? held : value) && !isDisabled);
  // A picker's list always opens: an empty one says so (`notFoundContent`) instead of not showing.
  const showPanel = open && (picker || loading || filtered.length > 0 || options.length > 0);
  const padEnd = showClear ? fieldClearPadding(fieldSize) : undefined;

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <Input
        {...rest}
        ref={inputRef}
        id={id}
        name={picker ? undefined : name}
        role="combobox"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-expanded={open}
        aria-controls={showPanel ? listId : undefined}
        aria-autocomplete="list"
        aria-activedescendant={showPanel && activeOption ? `${listId}-${active}` : undefined}
        // Under the drawn pair the same line is still the input's value (what is read out, what a
        // test reads), only not painted, and neither is its selection.
        className={paired ? "caret-transparent selection:bg-transparent selection:text-transparent" : undefined}
        style={
          paired
            ? { color: "transparent", paddingInlineEnd: padEnd }
            : padEnd != null
              ? { paddingInlineEnd: padEnd }
              : undefined
        }
        value={value}
        placeholder={placeholder}
        disabled={isDisabled}
        size={fieldSize}
        onChange={handleChange}
        onFocus={(e) => {
          setOpen(true);
          setFocused(true);
          selectLine();
          onFocus?.(e);
        }}
        onClick={(e: MouseEvent<HTMLInputElement>) => {
          setOpen(true);
          selectLine();
          onClick?.(e);
        }}
        onBlur={(e) => {
          if (!rootRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
          setFocused(false);
          dropTerm();
          // A row walked to and left is not what Enter picks on the way back in.
          if (picker) setActiveIndex(null);
          onBlur?.(e);
        }}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {picker && name ? <input type="hidden" name={name} value={held} disabled={isDisabled} /> : null}
      {paired ? (
        // The box at rest (§2.2, the reference pair). It sits where the input's text is: the same
        // padding, border width and type size, so the pair starts at the text's x.
        <span
          aria-hidden="true"
          data-su-picker-value=""
          className={cn(
            "absolute inset-0 flex items-center min-w-0 pointer-events-none border border-solid border-transparent font-sans text-ink [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4",
            inputSizeClass[fieldSize],
            // Focused at rest, the next key replaces it: stepped back, as a placeholder is.
            (focused || isDisabled) && "text-ink-3 [&_span]:text-ink-3",
          )}
          style={padEnd != null ? { paddingInlineEnd: padEnd } : undefined}
        >
          <SelectOptionLabel option={paired} />
        </span>
      ) : null}
      {showClear && (
        <FieldClearButton
          size={fieldSize}
          label={clearLabel}
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            filteringRef.current = true;
            if (picker) dropTerm();
            emitChange("");
            onClear?.();
            setActiveIndex(null);
            setOpen(true);
          }}
        />
      )}
      <span
        aria-live="polite"
        className="absolute w-px h-px overflow-hidden [clip-path:inset(50%)]"
      >
        {open && !loading ? countLabel(filtered.length) : ""}
      </span>
      {showPanel && (
        <div
          id={listId}
          className={comboboxPanelClass}
          role="listbox"
          aria-label={listLabel}
          aria-busy={loading || undefined}
        >
          {loading ? (
            <div className={comboboxNoticeClass}>{loadingContent}</div>
          ) : filtered.length === 0 ? (
            <div className={comboboxNoticeClass}>{notFoundContent ?? NO_MATCHES}</div>
          ) : (
            filtered.map((option, index) => (
              <button
                key={option.value}
                id={`${listId}-${index}`}
                // browsers don't scroll aria-activedescendant targets into view — we have to
                ref={
                  index === active
                    ? (el) => void el?.scrollIntoView({ block: "nearest" })
                    : undefined
                }
                tabIndex={-1}
                type="button"
                role="option"
                aria-selected={
                  selectedValue !== undefined
                    ? option.value === selectedValue
                    : picker
                      ? option.value === held
                      : option.label === value
                }
                data-active={index === active || undefined}
                aria-disabled={option.disabled || undefined}
                data-disabled={option.disabled || undefined}
                className={comboboxOptionClass}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => selectOption(option)}
              >
                <ComboboxOptionContent option={option} query={query} />
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
}
