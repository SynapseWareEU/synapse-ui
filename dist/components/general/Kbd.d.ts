import { type HTMLAttributes, type ReactNode } from "react";
export interface KbdProps extends HTMLAttributes<HTMLElement> {
    /** The key or chord as it is printed on the keyboard: "Ctrl K", "Esc", "Enter", "↑". */
    children?: ReactNode;
}
/**
 * Key hint (v2 §4.8): 20 tall, 4 radius, fill ground, 12/16 500 sans in ink-2. Sans, not mono —
 * a key name is a label, not an identifier. Renders a native `<kbd>`, so a chord stays one
 * hint ("Ctrl K"); nest two `Kbd`s only when the keys are pressed separately.
 */
export declare const Kbd: import("react").ForwardRefExoticComponent<KbdProps & import("react").RefAttributes<HTMLElement>>;
//# sourceMappingURL=Kbd.d.ts.map