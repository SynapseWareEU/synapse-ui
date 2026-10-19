import { type ReactNode } from "react";
export interface RadioOption {
    label: ReactNode;
    value: string;
    disabled?: boolean;
}
export interface RadioGroupProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    name?: string;
    direction?: "vertical" | "horizontal";
    options?: RadioOption[];
    className?: string;
    children?: ReactNode;
    onValueChange?: (value: string) => void;
}
export interface RadioProps {
    value: string;
    disabled?: boolean;
    className?: string;
    children?: ReactNode;
}
/**
 * Prefer `Segmented` for 2–4 short options; RadioGroup is for longer or more numerous ones.
 * Vertical rows are 20 tall, 8 apart; horizontal items are 16 apart.
 */
export declare function RadioGroupRoot({ value, defaultValue, disabled, name, direction, options, className, children, onValueChange, }: RadioGroupProps): import("react").JSX.Element;
export declare function Radio({ value, disabled, className, children }: RadioProps): import("react").JSX.Element;
export { RadioGroupRoot as RadioGroup };
//# sourceMappingURL=Radio.d.ts.map