import type { HTMLAttributes, MouseEvent } from "react";
import { IconBackspace } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { HH_STROKE, hhTransition } from "./shared";

export type KeypadKey =
  | "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
  | "00"
  | "backspace"
  /** The decimal separator. Its face is the caller's `decimalSeparator`; the string it edits holds ".". */
  | "decimal";

export interface KeypadProps extends HTMLAttributes<HTMLDivElement> {
  /** Called for every key press. Pair it with `applyKeypadKey` to edit a digit string. */
  onKey?: (key: KeypadKey) => void;
  /** Keys in reading order, three per row. Default: 1–9, backspace, 0, 00 (V2HHQuantity). */
  keys?: readonly KeypadKey[];
  disabled?: boolean;
  /** Accessible name of the backspace key. Default "Delete last digit". */
  backspaceLabel?: string;
  /**
   * Face of the `decimal` key: the locale's separator, given by the caller ("," in Romanian).
   * Default ".". The key still reports `"decimal"`, and `applyKeypadKey` writes "." for it.
   */
  decimalSeparator?: string;
  /** Accessible name of the `decimal` key. Default "Decimal separator". */
  decimalLabel?: string;
}

export const KEYPAD_DEFAULT_KEYS: readonly KeypadKey[] = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  "backspace", "0", "00",
];

/** Keys for a decimal quantity: 1–9, the separator, 0, backspace. */
export const KEYPAD_DECIMAL_KEYS: readonly KeypadKey[] = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  "decimal", "0", "backspace",
];

/**
 * Applies one keypad key to a digit string: appends digits, drops the last one on backspace.
 * Leading zeros collapse ("0" + "5" → "5"); `maxLength` caps the digit count, the digits before
 * and after the point together, so it does not by itself keep a decimal inside its column.
 *
 * `decimal` appends the one "." a quantity may hold ("" → "0.", "12" → "12."; a second one is
 * ignored). The string is the canonical decimal, whatever separator the key shows, and is only
 * ever edited as text: no number is made of it. `scale` caps the digits after the point.
 */
export function applyKeypadKey(current: string, key: KeypadKey, maxLength = 9, scale?: number): string {
  if (key === "backspace") return current.slice(0, -1);
  if (key === "decimal") {
    if (current.includes(".") || scale === 0) return current;
    return current === "" ? "0." : `${current}.`;
  }
  const next = current === "0" ? key : current + key;
  const trimmed = next.replace(/^0+(?=\d)/, "");
  const point = trimmed.indexOf(".");
  if (point !== -1 && scale != null && trimmed.length - point - 1 > scale) return current;
  // The point is not a digit: it does not count towards `maxLength`.
  return trimmed.length - (point === -1 ? 0 : 1) > maxLength ? current : trimmed;
}

// Keep focus on the field the keypad types into: a tap must not blur the scan/quantity input.
const keepFocus = (event: MouseEvent) => event.preventDefault();

/**
 * Handheld keypad (spec §4.7): 3 columns, 56 rows, gap 8; keys radius 8 on fill, no border,
 * 28/34 500 ink; backspace is a 28 icon in ink-2. Place it 8 below the quick answers.
 * Hover (pointer devices) darkens to the border tone, press to border-strong.
 */
export function Keypad({
  onKey,
  keys = KEYPAD_DEFAULT_KEYS,
  disabled,
  backspaceLabel = "Delete last digit",
  decimalSeparator = ".",
  decimalLabel = "Decimal separator",
  className,
  "aria-label": ariaLabel = "Numeric keypad",
  ...rest
}: KeypadProps) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn(
        "grid grid-cols-3 auto-rows-[var(--su-hh-control-md)] gap-su2 font-sans",
        className,
      )}
      {...rest}
    >
      {keys.map((key, i) => {
        const isBackspace = key === "backspace";
        return (
          <button
            key={`${key}-${i}`}
            type="button"
            disabled={disabled}
            aria-label={isBackspace ? backspaceLabel : key === "decimal" ? decimalLabel : undefined}
            data-key={key}
            onMouseDown={keepFocus}
            onClick={() => onKey?.(key)}
            className={cn(
              "flex items-center justify-center min-w-0 m-0 p-0 rounded-[var(--su-hh-radius)] bg-fill",
              "text-hh-keypad font-medium su-tabular su-focus-ring cursor-pointer select-none",
              "forced-colors:border forced-colors:border-solid forced-colors:border-[ButtonText]",
              "[@media(hover:hover)]:enabled:hover:bg-border enabled:active:bg-border-strong",
              "disabled:text-ink-3 disabled:cursor-not-allowed",
              isBackspace ? "text-ink-2" : "text-ink",
              hhTransition,
            )}
          >
            {isBackspace ? (
              <IconBackspace size={28} stroke={HH_STROKE} aria-hidden />
            ) : key === "decimal" ? (
              decimalSeparator
            ) : (
              key
            )}
          </button>
        );
      })}
    </div>
  );
}
