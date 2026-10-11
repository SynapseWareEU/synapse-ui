import type { Ref, TextareaHTMLAttributes } from "react";
import type { InputSize } from "./types";
/** Textarea (§4.2, D): the Input field look, padding 8 12 (md), 14/20, min-height 80, resize vertical. */
export declare const textareaSizeClass: Record<InputSize, string>;
export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    size?: InputSize;
    /** Identifier or code text (a JSON value): set in IBM Plex Mono, the placeholder stays sans. */
    mono?: boolean;
    ref?: Ref<HTMLTextAreaElement>;
}
/**
 * Multi-line text field. It draws the Input's field and, inside a `FormItem`, takes its id,
 * required mark, description and error from it, as Input does.
 */
export declare function TextArea({ size: sizeProp, mono, disabled, className, id, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, ...rest }: TextAreaProps): import("react").JSX.Element;
//# sourceMappingURL=TextArea.d.ts.map