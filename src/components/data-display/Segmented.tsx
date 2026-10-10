import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { useState, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface SegmentedOption {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

/**
 * Renders `role="radiogroup"` (Radix ToggleGroup) with no default accessible
 * name — pass `aria-label` or `aria-labelledby` so screen readers know what is
 * being switched. Icon-only options need their own label too (wrap the icon in
 * an element carrying `aria-label`).
 */
export interface SegmentedProps extends Omit<
  ComponentPropsWithoutRef<typeof ToggleGroup.Root>,
  "type" | "value" | "defaultValue" | "onValueChange"
> {
  options: SegmentedOption[];
  block?: boolean;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export function Segmented({
  options,
  block = false,
  className,
  value: valueProp,
  defaultValue,
  onValueChange,
  ...rest
}: SegmentedProps) {
  const [internal, setInternal] = useState(defaultValue);
  const value = valueProp ?? internal;

  return (
    <ToggleGroup.Root
      type="single"
      // Always controlled: a bare ToggleGroup lets you click the active item to
      // deselect it, which leaves a segmented control with nothing selected.
      value={value ?? ""}
      onValueChange={(next) => {
        if (!next) return;
        if (valueProp === undefined) setInternal(next);
        onValueChange?.(next);
      }}
      className={cn(
        // Track: 36 high, padding 3, gap 2, radius 6, fill. `block` is a grid of equal columns.
        "h-[36px] p-[3px] gap-[2px] items-center rounded-su-control bg-fill font-sans",
        block ? "grid grid-flow-col auto-cols-fr w-full" : "inline-flex",
        className,
      )}
      {...rest}
    >
      {options.map((opt) => (
        <ToggleGroup.Item
          key={opt.value}
          value={opt.value}
          disabled={opt.disabled}
          className={cn(
            // Item: 30 high, padding 0 12, radius 4, 1px border, 14/20 500; icon 16 with gap 8.
            "inline-flex items-center justify-center gap-su2 min-w-0 h-[30px] px-su3 rounded-su-tag border border-solid font-sans text-[14px] leading-[20px] font-medium whitespace-nowrap cursor-pointer",
            "transition-[background-color,border-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
            "su-focus-ring",
            // Selected: raised thumb with a hairline, ink text. No shadow.
            "data-[state=on]:bg-control-raised data-[state=on]:border-border data-[state=on]:enabled:text-ink",
            // Unselected: transparent, ink-2; ink under a pointer. Disabled: ink-3, no opacity.
            "data-[state=off]:bg-transparent data-[state=off]:border-transparent data-[state=off]:enabled:text-ink-2",
            "[@media(hover:hover)]:data-[state=off]:enabled:hover:text-ink",
            "disabled:text-ink-3 disabled:cursor-not-allowed",
          )}
        >
          {opt.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}
