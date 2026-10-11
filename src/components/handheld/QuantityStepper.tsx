import {
  forwardRef,
  useId,
  useState,
  type ChangeEvent,
  type HTMLAttributes,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { cleanDecimal, compareDecimal, decimalText, showDecimal, stepDecimal } from "./decimal";
import {
  HH_STROKE,
  HandheldErrorLine,
  describedBy,
  hhFieldBorder,
  hhQuestionClass,
  hhSecondaryClass,
  hhTransition,
} from "./shared";

export type QuantityStepperVariant = "field" | "output";

export interface QuantityStepperProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
  /** Controlled quantity, a whole number. `null` is an empty field. */
  value?: number | null;
  defaultValue?: number | null;
  onChange?: (value: number | null) => void;
  /**
   * Decimal mode: the quantity as canonical decimal text, digits with at most one "." ("12.5",
   * "" when empty, "12." while the fraction is still to come). Any of the three `decimal*` props
   * turns the mode on, and `value` / `onChange` are then unused. The text is typed, stepped and
   * bounded as text: no floating point number is ever made of it, so "0.1" + "0.2" is "0.3".
   * Feed it from a keypad with `applyKeypadKey(value, key, maxLength, scale)`. Text that is not
   * canonical (a formatted quantity, "1.234,5") is read as typed text would be, digits and the
   * first separator: pass the value, not its display form. Nothing here caps the digits before
   * the point: give `max` where the column has a limit (a `numeric(15,4)` holds 11).
   */
  decimalValue?: string;
  defaultDecimalValue?: string;
  /** Decimal mode: fires with the canonical text after every key, ± and typed edit. */
  onDecimalChange?: (value: string) => void;
  /**
   * Decimal mode: the separator the field shows, the locale's, given by the caller ("," in
   * Romanian). Typing accepts both "," and "."; the value always holds ".". Default ".".
   */
  decimalSeparator?: string;
  /** Decimal mode: the most digits kept after the point (4 for a `numeric(15,4)`). Default: no cap. */
  scale?: number;
  /** Default 0. In decimal mode a number or decimal text ("0.5"). */
  min?: number | string;
  max?: number | string;
  /** What ± add or take away. Default 1. In decimal mode a number or decimal text ("0.25"). */
  step?: number | string;
  /** Unit after the number ("buc"): 24/30 500 ink-2 in the field, 18/24 ink-2 in the output. */
  unit?: ReactNode;
  /**
   * `field` (default): an editable number field, 2px action border, 64/60 600 right-aligned,
   * the keypad's target. `output`: a read-out, 64/64 600 centred, announced politely.
   */
  variant?: QuantityStepperVariant;
  /** The question above, 28/34 600 ("How many pieces?"). Without it, pass `aria-label`. */
  label?: ReactNode;
  /**
   * Wraps the question in a heading (`<h1><label>…</label></h1>`): on a handheld step the question
   * is the screen's title. The look does not change. Default: a bare `<label>`.
   */
  labelAs?: "h1" | "h2" | "h3";
  /** Error line under the stepper, 17/24 500 danger-text. Implies `invalid`. */
  error?: ReactNode;
  /** Danger border on the field. Default: `!!error`. */
  invalid?: boolean;
  disabled?: boolean;
  /** Accessible name of −. Default "Decrease by {step}". */
  decrementLabel?: string;
  /** Accessible name of +. Default "Increase by {step}". */
  incrementLabel?: string;
  /** Extra props for the `<input>` (field variant): `id`, `name`, `inputMode`, `aria-describedby`… */
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange"> & {
    [key: `data-${string}`]: string | number | boolean | undefined;
  };
}

/** Figures with U+202F narrow no-break thousands separators ("2 290"), as §2.6 requires. */
function formatQuantity(value: number | null): string {
  if (value == null) return "—";
  const [int, frac] = String(value).split(".");
  const grouped = int.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return frac ? `${grouped},${frac}` : grouped;
}

const keepFocus = (event: MouseEvent) => event.preventDefault();

/**
 * Handheld stepper (spec §4.7): `grid: 64 1fr 64`, gap 8. ± are 64×64 secondary buttons with 28
 * icons. The field variant is the number field the keypad types into: 2px action border,
 * radius 8, padding 0 16, a 2×44 action caret, the unit bottom-aligned 10 after it. The input is a
 * `spinbutton` (↑/↓ step it) with `inputMode="none"` so the on-screen keypad, not the OS
 * keyboard, is the way in.
 */
export const QuantityStepper = forwardRef<HTMLInputElement, QuantityStepperProps>(
  function QuantityStepper(
    {
      value: valueProp,
      defaultValue = null,
      onChange,
      decimalValue,
      defaultDecimalValue,
      onDecimalChange,
      decimalSeparator = ".",
      scale,
      min: minProp = 0,
      max: maxProp,
      step: stepProp = 1,
      unit,
      variant = "field",
      label,
      labelAs,
      error,
      invalid: invalidProp,
      disabled,
      decrementLabel,
      incrementLabel,
      inputProps,
      className,
      "aria-label": ariaLabel,
      ...rest
    },
    ref,
  ) {
    const autoId = useId();
    const id = inputProps?.id ?? `su-qty-${autoId}`;
    const errorId = `${id}-error`;
    const [inner, setInner] = useState<number | null>(defaultValue);
    const value = valueProp !== undefined ? valueProp : inner;
    const hasError = error != null && error !== false;
    const invalid = invalidProp ?? hasError;

    const decimal =
      decimalValue !== undefined || defaultDecimalValue !== undefined || onDecimalChange !== undefined;
    const [innerText, setInnerText] = useState(defaultDecimalValue ?? "");
    // Cleaned, not trusted: the arithmetic below throws on anything but canonical text, and it
    // runs during render.
    const text = cleanDecimal(decimalValue !== undefined ? decimalValue : innerText);
    // The bounds as text for the decimal mode, as numbers for the whole-number mode.
    const minText = decimalText(minProp) ?? "0";
    const maxText = decimalText(maxProp);
    const stepText = decimalText(stepProp) ?? "1";
    const min = Number(minProp);
    const max = maxProp === undefined ? undefined : Number(maxProp);
    const step = Number(stepProp);

    const clamp = (n: number) => Math.min(Math.max(n, min), max ?? Number.POSITIVE_INFINITY);
    const commit = (next: number | null) => {
      if (valueProp === undefined) setInner(next);
      onChange?.(next);
    };
    const commitText = (next: string) => {
      if (decimalValue === undefined) setInnerText(next);
      onDecimalChange?.(next);
    };
    const nudge = (direction: 1 | -1) => {
      if (decimal) commitText(stepDecimal(text === "" ? minText : text, stepText, direction, minText, maxText));
      else commit(clamp((value ?? min) + direction * step));
    };

    const atMin = decimal
      ? text !== "" && compareDecimal(text, minText) <= 0
      : value != null && value <= min;
    const atMax = decimal
      ? text !== "" && maxText !== undefined && compareDecimal(text, maxText) >= 0
      : value != null && max != null && value >= max;

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
      if (decimal) {
        const typed = cleanDecimal(event.currentTarget.value, scale);
        commitText(
          typed !== "" && maxText !== undefined && compareDecimal(typed, maxText) > 0 ? maxText : typed,
        );
        return;
      }
      const digits = event.currentTarget.value.replace(/\D/g, "");
      commit(digits === "" ? null : Math.min(Number(digits), max ?? Number.POSITIVE_INFINITY));
    };
    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
      inputProps?.onKeyDown?.(event);
      if (event.defaultPrevented) return;
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();
        nudge(event.key === "ArrowUp" ? 1 : -1);
      }
    };

    const unitText = typeof unit === "string" || typeof unit === "number" ? ` ${unit}` : "";
    const hasLabel = label != null && label !== false;
    const empty = decimal ? text === "" : value == null;
    // What the field holds and what is read out. Decimal: the text itself with the caller's separator.
    const shown = decimal ? showDecimal(text, decimalSeparator) : value == null ? "" : String(value);
    const readOut = decimal
      ? text === "" ? "—" : showDecimal(text, decimalSeparator, true)
      : formatQuantity(value);
    // ARIA wants a number for `aria-valuenow`; the reading is in `aria-valuetext`, and the value
    // the caller holds stays the text.
    const valueNow = decimal ? (text === "" ? undefined : Number(text)) : (value ?? undefined);
    const Heading = labelAs;
    const question = hasLabel ? (
      <label htmlFor={id} className={cn(hhQuestionClass, !Heading && "mb-su3")}>
        {label}
      </label>
    ) : null;

    const minus = (
      <button
        type="button"
        aria-label={decrementLabel ?? `Decrease by ${decimal ? stepText : step}`}
        aria-controls={id}
        disabled={disabled || atMin}
        onMouseDown={keepFocus}
        onClick={() => nudge(-1)}
        className={hhSecondaryClass}
      >
        <IconMinus size={28} stroke={HH_STROKE} aria-hidden />
      </button>
    );
    const plus = (
      <button
        type="button"
        aria-label={incrementLabel ?? `Increase by ${decimal ? stepText : step}`}
        aria-controls={id}
        disabled={disabled || atMax}
        onMouseDown={keepFocus}
        onClick={() => nudge(1)}
        className={hhSecondaryClass}
      >
        <IconPlus size={28} stroke={HH_STROKE} aria-hidden />
      </button>
    );

    let middle: ReactNode;
    if (variant === "output") {
      middle = (
        <output
          id={id}
          aria-live="polite"
          aria-label={hasLabel ? undefined : ariaLabel}
          aria-describedby={describedBy(hasError && errorId)}
          className={cn(
            "flex items-baseline justify-center gap-[6px] min-w-0 font-sans",
            disabled ? "text-ink-3" : "text-ink",
          )}
        >
          <span className="text-hh-big font-semibold su-tabular truncate">{readOut}</span>
          {unit != null ? <span className="shrink-0 text-hh-key text-ink-2">{unit}</span> : null}
        </output>
      );
    } else {
      // onKeyDown is chained in handleKeyDown, so it is kept out of the spread.
      const { className: inputClassName, style: inputStyle, onKeyDown: _chained, ...restInput } = inputProps ?? {};
      // A figure too long for the field at 64 shrinks until it fits, down to the handheld's 17
      // floor: half a quantity is a different quantity, and the field has no way to show the rest.
      // 0.62 is the advance of a tabular figure in the sans, with a little air. The width is the
      // input's own box (`cqw`); a browser without container units keeps the 64.
      const fit =
        shown.length > 0
          ? {
              fontSize: `max(var(--su-hh-text-body), min(var(--su-hh-text-big), calc(100cqw / ${(shown.length * 0.62).toFixed(2)})))`,
            }
          : undefined;
      middle = (
        <div
          className={cn(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            hhFieldBorder({ invalid, disabled, active: true }),
            hhTransition,
          )}
        >
          <span className="flex flex-1 min-w-0 [container-type:inline-size]">
            <input
              ref={ref}
              type="text"
              role="spinbutton"
              inputMode="none"
              autoComplete="off"
              aria-label={hasLabel ? undefined : ariaLabel}
              aria-valuenow={valueNow}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuetext={!empty ? `${shown}${unitText}` : undefined}
              aria-invalid={invalid || undefined}
              {...restInput}
              id={id}
              value={shown}
              disabled={disabled}
              onChange={handleInput}
              onKeyDown={handleKeyDown}
              aria-describedby={describedBy(restInput["aria-describedby"], hasError && errorId)}
              style={{ ...fit, ...inputStyle }}
              className={cn(
                "flex-1 min-w-0 h-[60px] m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
                "text-end font-sans text-[length:var(--su-hh-text-big)] leading-[60px] font-semibold su-tabular",
                "text-inherit caret-transparent disabled:cursor-not-allowed",
                inputClassName,
              )}
            />
          </span>
          {/* The keypad appends at the end, so the caret is drawn there, not left to the browser. */}
          {!disabled ? (
            <span aria-hidden className="shrink-0 w-[2px] h-[44px] ms-su1 bg-action forced-colors:bg-[Highlight]" />
          ) : null}
          {unit != null ? (
            <span className="shrink-0 self-end ms-[10px] text-hh-value font-medium text-ink-2">{unit}</span>
          ) : null}
        </div>
      );
    }

    return (
      <div className={cn("flex flex-col font-sans", className)} {...rest}>
        {question && Heading ? <Heading className="m-0 mb-su3">{question}</Heading> : question}
        <div
          className={cn(
            "grid grid-cols-[var(--su-hh-control-lg)_minmax(0,1fr)_var(--su-hh-control-lg)] gap-x-su2",
            variant === "output" ? "items-center" : "items-stretch",
          )}
        >
          {minus}
          {middle}
          {plus}
        </div>
        {hasError ? <HandheldErrorLine id={errorId}>{error}</HandheldErrorLine> : null}
      </div>
    );
  },
);
