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
  /** Default 0. */
  min?: number;
  max?: number;
  /** What ± add or take away. Default 1. */
  step?: number;
  /** Unit after the number ("buc"): 24/30 500 ink-2 in the field, 18/24 ink-2 in the output. */
  unit?: ReactNode;
  /**
   * `field` (default): an editable number field, 2px action border, 64/60 600 right-aligned,
   * the keypad's target. `output`: a read-out, 64/64 600 centred, announced politely.
   */
  variant?: QuantityStepperVariant;
  /** The question above, 28/34 600 ("How many pieces?"). Without it, pass `aria-label`. */
  label?: ReactNode;
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
  inputProps?: Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange">;
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
      min = 0,
      max,
      step = 1,
      unit,
      variant = "field",
      label,
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

    const clamp = (n: number) => Math.min(Math.max(n, min), max ?? Number.POSITIVE_INFINITY);
    const commit = (next: number | null) => {
      if (valueProp === undefined) setInner(next);
      onChange?.(next);
    };
    const nudge = (direction: 1 | -1) => commit(clamp((value ?? min) + direction * step));

    const atMin = value != null && value <= min;
    const atMax = value != null && max != null && value >= max;

    const handleInput = (event: ChangeEvent<HTMLInputElement>) => {
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

    const minus = (
      <button
        type="button"
        aria-label={decrementLabel ?? `Decrease by ${step}`}
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
        aria-label={incrementLabel ?? `Increase by ${step}`}
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
          <span className="text-hh-big font-semibold su-tabular truncate">{formatQuantity(value)}</span>
          {unit != null ? <span className="shrink-0 text-hh-key text-ink-2">{unit}</span> : null}
        </output>
      );
    } else {
      // onKeyDown is chained in handleKeyDown, so it is kept out of the spread.
      const { className: inputClassName, onKeyDown: _chained, ...restInput } = inputProps ?? {};
      middle = (
        <div
          className={cn(
            "flex items-center min-w-0 h-[var(--su-hh-control-lg)] px-su4",
            "rounded-[var(--su-hh-radius)] border-[length:var(--su-hh-field-border)] border-solid",
            hhFieldBorder({ invalid, disabled, active: true }),
            hhTransition,
          )}
        >
          <input
            ref={ref}
            type="text"
            role="spinbutton"
            inputMode="none"
            autoComplete="off"
            aria-label={hasLabel ? undefined : ariaLabel}
            aria-valuenow={value ?? undefined}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={value != null ? `${value}${unitText}` : undefined}
            aria-invalid={invalid || undefined}
            {...restInput}
            id={id}
            value={value == null ? "" : String(value)}
            disabled={disabled}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            aria-describedby={describedBy(restInput["aria-describedby"], hasError && errorId)}
            className={cn(
              "flex-1 min-w-0 h-[60px] m-0 p-0 border-0 rounded-su-row bg-transparent outline-none",
              "text-end font-sans text-[length:var(--su-hh-text-big)] leading-[60px] font-semibold su-tabular",
              "text-inherit caret-transparent disabled:cursor-not-allowed",
              inputClassName,
            )}
          />
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
        {hasLabel ? (
          <label htmlFor={id} className={cn(hhQuestionClass, "mb-su3")}>
            {label}
          </label>
        ) : null}
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
