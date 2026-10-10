import { type ReactNode } from "react";
export interface SwitchProps {
    "aria-label"?: string;
    "aria-labelledby"?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    disabled?: boolean;
    /** Async toggle in flight: shows a ring spinner in the thumb and blocks input. */
    loading?: boolean;
    required?: boolean;
    name?: string;
    value?: string;
    id?: string;
    className?: string;
    /**
     * The state in words, beside the switch in 14/20 ink ("Pornit", "Se cere la fiecare recepție").
     * v2 always pairs the switch with its state; the field label sits above, in a FormItem.
     * A function receives the current state, so an uncontrolled switch can word both of them:
     * `{(on) => (on ? "Pornit" : "Oprit")}`.
     *
     * When the switch already has a name (the FormItem's label, `aria-label` or `aria-labelledby`)
     * that name is kept and the words are visual only: the state itself is announced by the switch
     * role. With no other name, the words are the label, as a plain `<label>` wrapping them.
     */
    children?: ReactNode | ((checked: boolean) => ReactNode);
    onCheckedChange?: (checked: boolean) => void;
}
/** ponytail: no `size` variant or ref forwarding (siblings have neither) — add when a caller needs one. */
export declare function Switch({ checked, defaultChecked, disabled, loading, required, name, value, id: idProp, className, children, onCheckedChange, "aria-label": ariaLabel, "aria-labelledby": ariaLabelledBy, }: SwitchProps): import("react").JSX.Element;
//# sourceMappingURL=Switch.d.ts.map