import type { HTMLAttributes, ReactNode } from "react";
import { type FeedbackTone } from "./shared";
export type AlertType = FeedbackTone;
export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    type?: AlertType;
    title?: ReactNode;
    closable?: boolean;
    onClose?: () => void;
    /** The close button's accessible name, "Close alert" by default. Pass the application's word. */
    closeLabel?: string;
    /** Show the per-type status glyph, so state isn't carried by colour alone. */
    showIcon?: boolean;
    /** Custom glyph; implies `showIcon`. */
    icon?: ReactNode;
    children?: ReactNode;
}
export declare function Alert({ type, title, closable, onClose, closeLabel, showIcon, icon, className, children, ...rest }: AlertProps): import("react").JSX.Element;
//# sourceMappingURL=Alert.d.ts.map