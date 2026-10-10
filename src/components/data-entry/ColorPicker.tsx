import { useCallback, useState, type InputHTMLAttributes } from "react";
import { cn } from "../../utils/cn";
import { useFieldState, useFormItemContext } from "./Form";
import type { InputSize } from "./types";

export interface ColorPickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "value" | "defaultValue" | "onChange" | "type"
  > {
  value?: string;
  defaultValue?: string;
  size?: InputSize;
  disabled?: boolean;
  showText?: boolean;
  className?: string;
  onChange?: (value: string) => void;
}

/* Select-like trigger: 32 / 36 / 48 tall, surface, 1px border-strong, radius 6. */
const triggerHeightClass: Record<InputSize, string> = {
  sm: "h-[var(--su-control-sm)]",
  md: "h-[var(--su-control-md)]",
  lg: "h-[var(--su-control-lg)]",
};

/** Without the hex text the trigger is square. */
const triggerSquareClass: Record<InputSize, string> = {
  sm: "w-[var(--su-control-sm)]",
  md: "w-[var(--su-control-md)]",
  lg: "w-[var(--su-control-lg)]",
};

/* Swatch: 20 (24 at lg), radius 4, 1px hairline so white and near-surface colours keep an edge. */
const swatchSizeClass: Record<InputSize, string> = {
  sm: "size-[20px]",
  md: "size-[20px]",
  lg: "size-[24px]",
};

const triggerBaseClass = [
  "relative inline-flex shrink-0 items-center gap-su2 rounded-su-control border border-solid font-sans",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // The native input inside takes focus; the ring goes on the whole trigger, keyboard only.
  "has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-focus has-[:focus-visible]:outline-offset-[var(--su-focus-ring-offset)]",
].join(" ");

/** `<input type="color">` only accepts 7-char hex; anything else silently renders black. */
const toHex = (v: string) => (/^#[0-9a-fA-F]{6}$/.test(v) ? v : "#000000");

export function ColorPicker({
  value: valueProp,
  defaultValue = "#1D4ED8",
  size: sizeProp,
  disabled,
  showText = true,
  className,
  onChange,
  id: idProp,
  ...rest
}: ColorPickerProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);

  const [internal, setInternal] = useState(defaultValue);
  const isControlled = valueProp !== undefined;
  const value = toHex(isControlled ? valueProp : internal);

  const emit = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const invalid = Boolean(item?.error);

  return (
    <div
      className={cn(
        triggerBaseClass,
        triggerHeightClass[size],
        showText ? "ps-su2 pe-su3" : cn("justify-center", triggerSquareClass[size]),
        isDisabled
          ? "bg-surface-2 border-border cursor-not-allowed"
          : cn(
              "bg-surface cursor-pointer [@media(hover:hover)]:hover:bg-surface-2",
              invalid ? "border-danger" : "border-border-strong",
            ),
        className,
      )}
    >
      <span
        aria-hidden="true"
        // The swatch is the value: keep its colour in High Contrast.
        className={cn(
          "shrink-0 rounded-su-tag border border-solid border-border forced-colors:[forced-color-adjust:none]",
          swatchSizeClass[size],
        )}
        style={{ backgroundColor: value }}
      />
      {showText && (
        <span className={cn("su-id-2 whitespace-nowrap", isDisabled && "text-ink-3")}>
          {value.toUpperCase()}
        </span>
      )}
      {/* The native picker opens from anywhere on the trigger. */}
      <input
        type="color"
        id={idProp ?? item?.id}
        value={value}
        disabled={isDisabled}
        className="absolute inset-0 size-full m-0 p-0 appearance-none border-none bg-transparent opacity-0 outline-none cursor-pointer disabled:cursor-not-allowed"
        onChange={(e) => emit(e.target.value)}
        {...rest}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
      />
    </div>
  );
}
