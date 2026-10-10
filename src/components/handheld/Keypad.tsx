import type { HTMLAttributes, MouseEvent } from "react";
import { IconBackspace } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { HH_STROKE, hhTransition } from "./shared";

export type KeypadKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "00" | "backspace";

export interface KeypadProps extends HTMLAttributes<HTMLDivElement> {
  /** Called for every key press. Pair it with `applyKeypadKey` to edit a digit string. */
  onKey?: (key: KeypadKey) => void;
  /** Keys in reading order, three per row. Default: 1–9, backspace, 0, 00 (V2HHQuantity). */
  keys?: readonly KeypadKey[];
  disabled?: boolean;
  /** Accessible name of the backspace key. Default "Delete last digit". */
  backspaceLabel?: string;
}

export const KEYPAD_DEFAULT_KEYS: readonly KeypadKey[] = [
  "1", "2", "3",
  "4", "5", "6",
  "7", "8", "9",
  "backspace", "0", "00",
];

/**
 * Applies one keypad key to a digit string: appends digits, drops the last one on backspace.
 * Leading zeros collapse ("0" + "5" → "5"); `maxLength` caps the digit count.
 */
export function applyKeypadKey(current: string, key: KeypadKey, maxLength = 9): string {
  if (key === "backspace") return current.slice(0, -1);
  const next = current === "0" ? key : current + key;
  const trimmed = next.replace(/^0+(?=\d)/, "");
  return trimmed.length > maxLength ? current : trimmed;
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
            aria-label={isBackspace ? backspaceLabel : undefined}
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
            {isBackspace ? <IconBackspace size={28} stroke={HH_STROKE} aria-hidden /> : key}
          </button>
        );
      })}
    </div>
  );
}
