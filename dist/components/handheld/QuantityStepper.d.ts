import { type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
export type QuantityStepperVariant = "field" | "output";
export interface QuantityStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
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
    /**
     * Decimal mode: hand `onDecimalChange` the text exactly as it was typed and show it, instead of
     * cleaning it to digits and one point. For a field whose owner refuses a bad reading rather than
     * repairing it: a barcode fired into a count ("VET-100") must not be read as the 100 inside it.
     * `scale` and `max` no longer trim what is typed; the caller checks the text and says why it is
     * refused. − + and ↑ ↓ still step the number read out of the text. Default false.
     */
    keepTyped?: boolean;
    /** Default 0. In decimal mode a number or decimal text ("0.5"). */
    min?: number | string;
    max?: number | string;
    /** What ± add or take away. Default 1. In decimal mode a number or decimal text ("0.25"). */
    step?: number | string;
    /**
     * Draw the − and + buttons. Default true. `false` leaves the field alone at the full width
     * (V2HHCount): a count is typed, not nudged from a figure the screen proposed. ↑ and ↓ on the
     * field still step it.
     */
    stepButtons?: boolean;
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
/**
 * Handheld stepper (spec §4.7): `grid: 64 1fr 64`, gap 8. ± are 64×64 secondary buttons with 28
 * icons; `stepButtons={false}` draws the field alone, full width. The field variant is the number field the keypad types into: 2px action border,
 * radius 8, padding 0 16, a 2×44 action caret, the unit bottom-aligned 10 after it. The input is a
 * `spinbutton` (↑/↓ step it) with `inputMode="none"` so the on-screen keypad, not the OS
 * keyboard, is the way in.
 */
export declare const QuantityStepper: import("react").ForwardRefExoticComponent<QuantityStepperProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=QuantityStepper.d.ts.map