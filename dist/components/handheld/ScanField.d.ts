import { type InputHTMLAttributes, type ReactNode } from "react";
export interface ScanFieldProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix" | "children"> {
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
export declare const ScanField: import("react").ForwardRefExoticComponent<ScanFieldProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=ScanField.d.ts.map