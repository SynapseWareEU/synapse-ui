import type { HTMLAttributes, ReactNode } from "react";
import { type FeedbackToneOrNeutral } from "./shared";
/** `neutral` is the v2 default (the grey note); the four tones are tinted. */
export type AlertType = FeedbackToneOrNeutral;
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Tone. Defaults to `neutral`: surface-2 with a hairline, the note drawn on the login screen. */
    type?: AlertType;
    /** 14/20 500 ink. The title stays ink in every tone. */
    title?: ReactNode;
    closable?: boolean;
    onClose?: () => void;
    /** Show the per-type status icon (16, in the tone's text colour). */
    showIcon?: boolean;
    /** Custom icon; implies `showIcon`. */
    icon?: ReactNode;
    /** Trailing action link (14/20 500), e.g. a `Button variant="text"`. */
    action?: ReactNode;
    /** Denser description: 13/18 instead of 14/20. */
    compact?: boolean;
    /** Description, ink-2, on the line below the title. */
    children?: ReactNode;
}
/**
 * Inline status note (spec §4.4). A tinted, 8px-rounded box: icon 16 at the top, the title on
 * the first line and the description below it, an optional action link and a 28 dismiss.
 * Errors and warnings are announced (`role="alert"`); the other tones are `role="status"`.
 */
export declare function Alert({ type, title, closable, onClose, showIcon, icon, action, compact, className, children, ...rest }: AlertProps): import("react").JSX.Element;
//# sourceMappingURL=Alert.d.ts.map