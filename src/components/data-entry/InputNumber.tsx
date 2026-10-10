import {
  useCallback,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type InputHTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Input } from "./Input";
import type { InputSize } from "./types";

export interface InputNumberProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "defaultValue" | "onChange" | "size" | "min" | "max" | "step" | "type"
  > {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: InputSize;
  /** Classes for the outer box: 160 wide (a short numeric field), never wider than its container. */
  className?: string;
  /** Unit inside the field, after the value ("buc", "zile"): ink-2, 8 after it. It never moves. */
  suffix?: ReactNode;
  onChange?: (value: number | undefined) => void;
}

function clamp(value: number, min?: number, max?: number): number {
  let next = value;
  if (min != null && next < min) next = min;
  if (max != null && next > max) next = max;
  return next;
}

/** Decimal places a step carries, exponential notation ("1e-7" → 7) included. */
function stepDecimals(step: number) {
  const [mantissa, exponent] = String(step).toLowerCase().split("e");
  const fraction = (mantissa.split(".")[1] ?? "").length;
  return Math.min(100, Math.max(0, fraction - Number(exponent ?? 0)));
}

/** Clamp, then round away float drift (0.1 + 0.2) to the step's own precision. */
function normalize(value: number, min: number | undefined, max: number | undefined, step: number) {
  return Number(clamp(value, min, max).toFixed(stepDecimals(step)));
}

/**
 * Desk number field (§4.2): an Input with an optional unit suffix, left-aligned tabular figures,
 * no stepper buttons and no native spinners, 160 wide. ArrowUp / ArrowDown still step by `step`
 * (native `type="number"` behaviour); min / max are applied on blur and Enter. Handheld quantity
 * entry is a separate pattern.
 */
export function InputNumber({
  value: valueProp,
  defaultValue,
  min,
  max,
  step = 1,
  disabled,
  size,
  className,
  suffix,
  onChange,
  id,
  onBlur,
  onKeyDown,
  ...rest
}: InputNumberProps) {
  const [internal, setInternal] = useState<number | undefined>(defaultValue);
  // Raw text while the user is mid-typing; cleared (and clamped) on commit.
  const [draft, setDraft] = useState<string | null>(null);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internal;

  const emit = useCallback(
    (next: number | undefined) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    setDraft(raw);
    if (raw === "" || raw === "-") {
      emit(undefined);
      return;
    }
    const parsed = Number(raw);
    // Report what was typed as-is; min/max are enforced on commit so typing "99"
    // into a max=10 field isn't hijacked after the first digit.
    if (!Number.isNaN(parsed)) emit(parsed);
  };

  const commit = () => {
    setDraft(null);
    if (value != null) {
      const next = normalize(value, min, max, step);
      if (next !== value) emit(next);
    }
  };

  return (
    <div className={cn("w-[160px] max-w-full", className)}>
      <Input
        {...rest}
        type="number"
        id={id}
        size={size}
        disabled={disabled}
        suffix={suffix}
        value={draft ?? value ?? ""}
        min={min}
        max={max}
        step={step}
        onChange={handleChange}
        onBlur={(event: FocusEvent<HTMLInputElement>) => {
          commit();
          onBlur?.(event);
        }}
        onKeyDown={(event: KeyboardEvent<HTMLInputElement>) => {
          if (event.key === "Enter") {
            // Only swallow the key when the draft still needs clamping — a native
            // submit here would otherwise post the pre-commit value. A value that
            // is already valid keeps the browser's "Enter submits the form".
            if (value != null && normalize(value, min, max, step) !== value) {
              event.preventDefault();
            }
            commit();
          }
          onKeyDown?.(event);
        }}
      />
    </div>
  );
}
