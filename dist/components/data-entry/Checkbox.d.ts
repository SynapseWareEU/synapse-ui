import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ReactNode } from "react";
/** Radix's own tri-state: `true` | `false` | `"indeterminate"` (renders `aria-checked="mixed"`). */
export type CheckboxState = CheckboxPrimitive.CheckedState;
export interface CheckboxProps {
    "aria-label"?: string;
    "aria-labelledby"?: string;
    checked?: CheckboxState;
    defaultChecked?: CheckboxState;
    disabled?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    className?: string;
    children?: ReactNode;
    /** `checked` collapses `"indeterminate"` to `false`; read `state` for the raw tri-state. */
    onCheckedChange?: (checked: boolean, state: CheckboxState) => void;
}
/** Internal: the box recipe, shared by `Checkbox` and the decorative `CheckboxMark`. */
export declare function checkboxBoxClass({ disabled, invalid, }: {
    disabled?: boolean;
    invalid?: boolean;
}): string;
/**
 * Internal: a decorative (`aria-hidden`) box that mirrors a selection, for rows that are
 * themselves the control (listbox options in Transfer). Put `group/cb` on the row for hover.
 */
export declare function CheckboxMark({ checked, disabled, className, }: {
    checked: CheckboxState;
    disabled?: boolean;
    className?: string;
}): import("react").JSX.Element;
export declare function Checkbox({ checked, defaultChecked, disabled, required, name, value, id: idProp, className, children, onCheckedChange, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, }: CheckboxProps): import("react").JSX.Element;
//# sourceMappingURL=Checkbox.d.ts.map