import * as RadioGroup from "@radix-ui/react-radio-group";
import { createContext, useContext, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useFormContext, useFormItemContext } from "./Form";

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
 * What the group knows and Radix keeps to itself: its own disabled state (Radix ORs it into
 * every item) and whether the enclosing FormItem is invalid (`aria-invalid` sits on the group).
 * Each Radio paints from it, so no style depends on a `:has()` or ancestor selector.
 */
const RadioGroupStyleContext = createContext<{ disabled?: boolean; invalid?: boolean }>({});

/**
 * Prefer `Segmented` for 2–4 short options; RadioGroup is for longer or more numerous ones.
 * Vertical rows are 20 tall, 8 apart; horizontal items are 16 apart.
 */
export function RadioGroupRoot({
  value,
  defaultValue,
  disabled,
  name,
  direction = "vertical",
  options,
  className,
  children,
  onValueChange,
}: RadioGroupProps) {
  const form = useFormContext();
  const item = useFormItemContext();
  const isDisabled = disabled ?? form.disabled;

  return (
    <RadioGroupStyleContext.Provider value={{ disabled: isDisabled, invalid: Boolean(item?.error) }}>
      <RadioGroup.Root
        id={item?.id}
        value={value}
        defaultValue={defaultValue}
        disabled={isDisabled}
        name={name}
        className={cn(
          "flex",
          direction === "horizontal" ? "flex-row flex-wrap gap-su4" : "flex-col gap-su2",
          className,
        )}
        onValueChange={onValueChange}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
      >
        {options
          ? options.map((option) => (
              <Radio key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </Radio>
            ))
          : children}
      </RadioGroup.Root>
    </RadioGroupStyleContext.Provider>
  );
}

/*
 * 16 circle. Unchecked: surface + 1px border-control (#8a919d, 3:1). Checked: action fill with a
 * 6px white centre dot. States as Checkbox: hover (row, hover devices only) darkens the ring to
 * ink-3 or the fill to action-hover; disabled is fill + border colour, or border-strong with the
 * white dot when checked; invalid is a danger ring while unchecked. No opacity.
 */
const circleBaseClass = [
  "relative inline-flex shrink-0 items-center justify-center size-[16px] p-0 rounded-full",
  "border border-solid su-focus-ring",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: keep the token colours so the checked fill and dot survive.
  "forced-colors:[forced-color-adjust:none]",
].join(" ");

const circleEnabledClass = [
  "cursor-pointer bg-surface",
  "data-[state=checked]:bg-action data-[state=checked]:border-action",
  "[@media(hover:hover)]:group-hover/rd:data-[state=checked]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/rd:data-[state=checked]:border-action-hover",
].join(" ");

const circleValidClass =
  "border-border-control [@media(hover:hover)]:group-hover/rd:data-[state=unchecked]:border-ink-3";

const circleInvalidClass = "border-danger";

const circleDisabledClass =
  "cursor-not-allowed bg-fill border-border data-[state=checked]:bg-border-strong data-[state=checked]:border-border-strong";

export function Radio({ value, disabled, className, children }: RadioProps) {
  const form = useFormContext();
  const group = useContext(RadioGroupStyleContext);
  const itemDisabled = disabled ?? form.disabled;
  // Radix disables an item when the group OR the item says so; paint the same union.
  const isDisabled = Boolean(group.disabled || itemDisabled);

  return (
    <label
      className={cn(
        "group/rd inline-flex items-center gap-su2",
        "[@media(hover:none)]:min-h-[var(--su-hit-target)]",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <RadioGroup.Item
        value={value}
        disabled={itemDisabled}
        className={cn(
          circleBaseClass,
          isDisabled
            ? circleDisabledClass
            : cn(circleEnabledClass, group.invalid ? circleInvalidClass : circleValidClass),
        )}
      >
        <RadioGroup.Indicator className="block size-[6px] rounded-full bg-on-action" />
      </RadioGroup.Item>
      {children && (
        <span className={cn("text-body select-none", isDisabled ? "text-ink-3" : "text-ink")}>
          {children}
        </span>
      )}
    </label>
  );
}

export { RadioGroupRoot as RadioGroup };
