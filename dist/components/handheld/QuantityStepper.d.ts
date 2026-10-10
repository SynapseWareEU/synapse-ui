import { type HTMLAttributes, type InputHTMLAttributes, type ReactNode } from "react";
export type QuantityStepperVariant = "field" | "output";
export interface QuantityStepperProps extends Omit<HTMLAttributes<HTMLDivElement>, "onChange" | "defaultValue"> {
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
/**
 * Handheld stepper (spec §4.7): `grid: 64 1fr 64`, gap 8. ± are 64×64 secondary buttons with 28
 * icons. The field variant is the number field the keypad types into: 2px action border,
 * radius 8, padding 0 16, a 2×44 action caret, the unit bottom-aligned 10 after it. The input is a
 * `spinbutton` (↑/↓ step it) with `inputMode="none"` so the on-screen keypad, not the OS
 * keyboard, is the way in.
 */
export declare const QuantityStepper: import("react").ForwardRefExoticComponent<QuantityStepperProps & import("react").RefAttributes<HTMLInputElement>>;
//# sourceMappingURL=QuantityStepper.d.ts.map