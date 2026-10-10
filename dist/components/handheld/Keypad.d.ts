import type { HTMLAttributes } from "react";
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
export declare const KEYPAD_DEFAULT_KEYS: readonly KeypadKey[];
/**
 * Applies one keypad key to a digit string: appends digits, drops the last one on backspace.
 * Leading zeros collapse ("0" + "5" → "5"); `maxLength` caps the digit count.
 */
export declare function applyKeypadKey(current: string, key: KeypadKey, maxLength?: number): string;
/**
 * Handheld keypad (spec §4.7): 3 columns, 56 rows, gap 8; keys radius 8 on fill, no border,
 * 28/34 500 ink; backspace is a 28 icon in ink-2. Place it 8 below the quick answers.
 * Hover (pointer devices) darkens to the border tone, press to border-strong.
 */
export declare function Keypad({ onKey, keys, disabled, backspaceLabel, className, "aria-label": ariaLabel, ...rest }: KeypadProps): import("react").JSX.Element;
//# sourceMappingURL=Keypad.d.ts.map