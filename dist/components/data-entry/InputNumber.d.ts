import { type InputHTMLAttributes, type ReactNode } from "react";
import type { InputSize } from "./types";
export interface InputNumberProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "defaultValue" | "onChange" | "size" | "min" | "max" | "step" | "type"> {
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
/**
 * Desk number field (§4.2): an Input with an optional unit suffix, left-aligned tabular figures,
 * no stepper buttons and no native spinners, 160 wide. ArrowUp / ArrowDown still step by `step`
 * (native `type="number"` behaviour); min / max are applied on blur and Enter. Handheld quantity
 * entry is a separate pattern.
 */
export declare function InputNumber({ value: valueProp, defaultValue, min, max, step, disabled, size, className, suffix, onChange, id, onBlur, onKeyDown, ...rest }: InputNumberProps): import("react").JSX.Element;
//# sourceMappingURL=InputNumber.d.ts.map