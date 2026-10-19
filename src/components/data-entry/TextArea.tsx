import type { Ref, TextareaHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { useFieldState, useFormItemContext } from "./Form";
import { inputClass } from "./Input";
import type { InputSize } from "./types";

/** Textarea (§4.2, D): the Input field look, padding 8 12 (md), 14/20, min-height 80, resize vertical. */
export const textareaSizeClass: Record<InputSize, string> = {
  sm: "min-h-[72px] px-su2 py-su2 text-control",
  md: "min-h-[80px] px-su3 py-su2 text-control",
  lg: "min-h-[88px] px-[14px] py-su2 text-section",
};

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
export function TextArea({
  size: sizeProp,
  mono,
  disabled,
  className,
  id,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}: TextAreaProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);
  return (
    <textarea
      id={id ?? item?.id}
      disabled={isDisabled}
      required={item?.required}
      className={cn(
        inputClass,
        "block m-0 resize-y",
        textareaSizeClass[size],
        // After `inputClass`'s font-sans; both are one class, so the later rule must be this one.
        mono && "!font-mono placeholder:!font-sans",
        className,
      )}
      {...rest}
      aria-describedby={ariaDescribedBy ?? item?.descriptionId}
      aria-invalid={ariaInvalid ?? (item?.error ? true : undefined)}
    />
  );
}
