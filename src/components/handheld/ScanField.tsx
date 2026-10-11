import {
  forwardRef,
  useEffect,
  useId,
  useRef,
  useState,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { IconBarcode, IconKeyboard } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { RingSpinner } from "../general/RingSpinner";
import {
  HH_STROKE,
  HandheldErrorLine,
  describedBy,
  hhFieldBorder,
  hhQuestionClass,
  hhTransition,
  mergeRefs,
} from "./shared";

export interface ScanFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "children"> {
  /** The question above the field, 28/34 600 ("Scan the location"). Without it, pass `aria-label`. */
  label?: ReactNode;
  /**
   * Wraps the question in a heading (`<h1><label>…</label></h1>`): on a handheld step the question
   * is the screen's title. The look does not change. Default: a bare `<label>`.
   */
  labelAs?: "h1" | "h2" | "h3";
  /**
   * What to scan, under the field: 17/24 ink-2, 8 below ("The label on the shelf where the goods
   * go"). It describes the input (`aria-describedby`). An `error` line comes after it.
   */
  hint?: ReactNode;
  /**
   * A read is being checked: a ring spinner takes the toggle's place, the field is `aria-busy`
   * and Enter is swallowed, so a second scan cannot start while the first is in flight. The
   * field keeps focus and its value (`disabled` would drop both).
   */
  busy?: boolean;
  /** What a screen reader hears while `busy`. Default "Checking". */
  busyLabel?: string;
  /** Error line under the field, 17/24 500 danger-text ("Last scan refused: A-09-01-1"). Implies `invalid`. */
  error?: ReactNode;
  /** Refused state: 2px danger border (it wins over the focus border). Default: `!!error`. */
  invalid?: boolean;
  /** Leading glyph (24, ink-3). Default: barcode. `null` hides it. */
  icon?: ReactNode | null;
  /** Show the soft-keyboard toggle. Default true. */
  keyboardToggle?: boolean;
  /** Toggle text, 17/24 500. Default "Keyboard". */
  keyboardLabel?: ReactNode;
  /** Controlled toggle state: `true` switches the field to `inputMode="text"`. */
  keyboardOpen?: boolean;
  defaultKeyboardOpen?: boolean;
  onKeyboardOpenChange?: (open: boolean) => void;
  /**
   * Called with the trimmed value when Enter arrives (scanners end every read with Enter).
   * Enter is then consumed, and an uncontrolled field is cleared for the next read.
   */
  onScan?: (value: string) => void;
  /** Applied to the wrapper (question + field + error line). Everything else goes to the `<input>`. */
  className?: string;
}

/**
 * Handheld scan field (spec §4.7): 64 tall, radius 8, 2px border (idle border-strong, focused
 * action, refused danger), barcode icon 24, mono 24/30 500 echo, sans 18/26 placeholder.
 * `inputMode="none"` keeps the soft keyboard down while the scanner types; the toggle opens it.
 * No outline on focus: the border is the focus indicator (§3, handheld fields).
 */
export const ScanField = forwardRef<HTMLInputElement, ScanFieldProps>(function ScanField(
  {
    label,
    labelAs,
    hint,
    busy = false,
    busyLabel = "Checking",
    error,
    invalid: invalidProp,
    icon,
    keyboardToggle = true,
    keyboardLabel = "Keyboard",
    keyboardOpen: keyboardOpenProp,
    defaultKeyboardOpen = false,
    onKeyboardOpenChange,
    onScan,
    className,
    id: idProp,
    disabled,
    onKeyDown,
    inputMode,
    "aria-describedby": ariaDescribedBy,
    "aria-invalid": ariaInvalid,
    ...rest
  },
  ref,
) {
  const autoId = useId();
  const id = idProp ?? `su-scan-${autoId}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const hasHint = hint != null && hint !== false;
  const inputRef = useRef<HTMLInputElement>(null);
  const hasError = error != null && error !== false;
  const invalid =
    invalidProp ?? (ariaInvalid === true || ariaInvalid === "true" || hasError);

  const [keyboardOpenState, setKeyboardOpenState] = useState(defaultKeyboardOpen);
  const keyboardOpen = keyboardOpenProp ?? keyboardOpenState;
  const toggled = useRef(false);

  // Hand focus back to the field after the toggle, so the new inputMode takes effect at once.
  useEffect(() => {
    if (!toggled.current) return;
    toggled.current = false;
    inputRef.current?.focus();
  }, [keyboardOpen]);

  const toggleKeyboard = () => {
    const next = !keyboardOpen;
    toggled.current = true;
    if (keyboardOpenProp === undefined) setKeyboardOpenState(next);
    onKeyboardOpenChange?.(next);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);
    // One read at a time: while the last one is being checked, Enter neither scans nor submits.
    // What a wedge scanner typed before it is dropped, or the next read would be appended to it.
    if (busy && event.key === "Enter") {
      event.preventDefault();
      if (rest.value === undefined) event.currentTarget.value = "";
      return;
    }
    if (!onScan || event.defaultPrevented || event.key !== "Enter" || event.nativeEvent.isComposing) {
      return;
    }
    event.preventDefault();
    const input = event.currentTarget;
    const read = input.value.trim();
    if (!read) return;
    onScan(read);
    if (rest.value === undefined) input.value = "";
  };

  const glyph =
    icon === undefined ? <IconBarcode size={24} stroke={HH_STROKE} aria-hidden /> : icon;
  const showToggle = keyboardToggle && !rest.readOnly && !busy;
  const Heading = labelAs;
  const question =
    label != null ? (
      <label htmlFor={id} className={cn(hhQuestionClass, !Heading && "mb-su3")}>
        {label}
      </label>
    ) : null;

  return (
    <div className={cn("flex flex-col font-sans", className)}>
      {question && Heading ? <Heading className="m-0 mb-su3">{question}</Heading> : question}
      <div
        className={cn(
          "relative flex items-center gap-su3 h-[var(--su-hh-control-lg)] min-w-0",
          "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
          showToggle ? "pl-su4 pr-su2" : "px-su4",
          hhFieldBorder({ invalid, disabled }),
          hhTransition,
        )}
      >
        {glyph ? (
          <span className="inline-flex shrink-0 text-ink-3 [&>svg]:block">{glyph}</span>
        ) : null}
        <input
          ref={mergeRefs(ref, inputRef)}
          id={id}
          type="text"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          enterKeyHint="enter"
          {...rest}
          inputMode={inputMode ?? (keyboardOpen ? "text" : "none")}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-busy={busy || undefined}
          aria-describedby={describedBy(ariaDescribedBy, hasHint && hintId, hasError && errorId)}
          onKeyDown={handleKeyDown}
          className={cn(
            "flex-1 min-w-0 h-full m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
            "font-mono text-hh-value font-medium text-inherit disabled:cursor-not-allowed",
            "placeholder:font-sans placeholder:font-normal placeholder:text-hh-hint placeholder:text-ink-3 placeholder:opacity-100",
          )}
        />
        {showToggle ? (
          <button
            type="button"
            aria-pressed={keyboardOpen}
            aria-controls={id}
            disabled={disabled}
            onClick={toggleKeyboard}
            className={cn(
              "inline-flex items-center gap-[6px] shrink-0 h-[var(--su-hit-target)] px-su3 m-0",
              "rounded-[var(--su-radius-md)] font-sans text-hh-body font-medium su-focus-ring cursor-pointer",
              "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
              // Pressed: action-subtle + action-text (§4.7). Idle hover is ghost-like: ink text.
              keyboardOpen
                ? "bg-action-subtle text-action-text [@media(hover:hover)]:enabled:hover:bg-action-subtle-hover"
                : "bg-fill text-ink-2 [@media(hover:hover)]:enabled:hover:text-ink enabled:active:bg-border",
              "disabled:text-ink-3 disabled:cursor-not-allowed",
              hhTransition,
            )}
          >
            <IconKeyboard size={20} stroke={HH_STROKE} aria-hidden className="shrink-0" />
            {keyboardLabel}
          </button>
        ) : null}
        {busy ? (
          <span className="inline-flex shrink-0 items-center justify-center size-[var(--su-hit-target)] text-action">
            <RingSpinner size={24} />
          </span>
        ) : null}
        {/* Always mounted: a live region that arrives together with its text is not announced. */}
        <span role="status" className="absolute w-px h-px overflow-hidden [clip-path:inset(50%)]">
          {busy ? busyLabel : ""}
        </span>
      </div>
      {hasHint ? (
        <p id={hintId} className="mt-su2 mb-0 font-sans text-hh-body text-ink-2">
          {hint}
        </p>
      ) : null}
      {hasError ? <HandheldErrorLine id={errorId}>{error}</HandheldErrorLine> : null}
    </div>
  );
});
