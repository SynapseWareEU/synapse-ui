import type { HTMLAttributes } from "react";
export type KeypadKey = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "00" | "backspace"
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
export declare const KEYPAD_DEFAULT_KEYS: readonly KeypadKey[];
/** Keys for a decimal quantity: 1–9, the separator, 0, backspace. */
export declare const KEYPAD_DECIMAL_KEYS: readonly KeypadKey[];
/**
 * Applies one keypad key to a digit string: appends digits, drops the last one on backspace.
 * Leading zeros collapse ("0" + "5" → "5"); `maxLength` caps the digit count, the digits before
 * and after the point together, so it does not by itself keep a decimal inside its column.
 *
 * `decimal` appends the one "." a quantity may hold ("" → "0.", "12" → "12."; a second one is
 * ignored). The string is the canonical decimal, whatever separator the key shows, and is only
 * ever edited as text: no number is made of it. `scale` caps the digits after the point.
 */
export declare function applyKeypadKey(current: string, key: KeypadKey, maxLength?: number, scale?: number): string;
/**
 * Handheld keypad (spec §4.7): 3 columns, 56 rows, gap 8; keys radius 8 on fill, no border,
 * 28/34 500 ink; backspace is a 28 icon in ink-2. Place it 8 below the quick answers.
 * Hover (pointer devices) darkens to the border tone, press to border-strong.
 */
export declare function Keypad({ onKey, keys, disabled, backspaceLabel, decimalSeparator, decimalLabel, className, "aria-label": ariaLabel, ...rest }: KeypadProps): import("react").JSX.Element;
//# sourceMappingURL=Keypad.d.ts.map