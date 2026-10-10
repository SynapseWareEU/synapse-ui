import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "../../utils/cn";
import { useFormContext, useFormItemContext } from "./Form";

export interface SliderProps {
  "aria-label"?: string;
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  className?: string;
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
}

/*
 * Track 4 tall, radius 2, fill. Range: action. Thumb: 16 circle, surface with a 2px action border
 * (hover action-hover, press action-press). Disabled: range and thumb border in border-strong, no
 * opacity. Row 20 on desk; touch gets the 44px floor.
 */
const rootClass = [
  "relative flex items-center w-full h-[20px] touch-none select-none",
  "[@media(hover:none)]:h-[var(--su-hit-target)]",
  "data-[orientation=vertical]:flex-col data-[orientation=vertical]:w-[20px] data-[orientation=vertical]:h-[160px]",
  "[@media(hover:none)]:data-[orientation=vertical]:w-[var(--su-hit-target)]",
  // High Contrast: keep the token colours so the range (Highlight) stays visible on its track.
  "forced-colors:[forced-color-adjust:none]",
].join(" ");

const trackClass =
  "relative flex-1 h-[4px] rounded-su-bar bg-fill forced-colors:bg-[GrayText] data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-[4px]";

const rangeClass =
  "absolute h-full rounded-su-bar data-[orientation=vertical]:h-auto data-[orientation=vertical]:w-full";

const thumbBaseClass = [
  "block size-[16px] rounded-full border-2 border-solid bg-surface su-focus-ring",
  "transition-[border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
].join(" ");

const thumbEnabledClass =
  "border-action cursor-grab active:cursor-grabbing active:border-action-press [@media(hover:hover)]:[&:not(:active):hover]:border-action-hover";

const thumbDisabledClass = "border-border-strong cursor-not-allowed";

export function Slider({
  value,
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  orientation = "horizontal",
  disabled,
  className,
  onValueChange,
  onValueCommit,
  "aria-label": ariaLabel = "Value",
}: SliderProps) {
  const form = useFormContext();
  const item = useFormItemContext();
  const isDisabled = disabled ?? form.disabled;
  const thumbValues = value ?? defaultValue;

  return (
    <SliderPrimitive.Root
      id={item?.id}
      value={value}
      defaultValue={defaultValue}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      disabled={isDisabled}
      className={cn(rootClass, isDisabled && "cursor-not-allowed", className)}
      onValueChange={onValueChange}
      onValueCommit={onValueCommit}
      aria-describedby={item?.descriptionId}
      aria-invalid={item?.error ? true : undefined}
    >
      <SliderPrimitive.Track className={trackClass}>
        <SliderPrimitive.Range
          className={cn(rangeClass, isDisabled ? "bg-border-strong" : "bg-action")}
        />
      </SliderPrimitive.Track>
      {thumbValues.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(thumbBaseClass, isDisabled ? thumbDisabledClass : thumbEnabledClass)}
          aria-label={
            thumbValues.length > 1 ? `${ariaLabel} ${index + 1}` : ariaLabel
          }
        />
      ))}
    </SliderPrimitive.Root>
  );
}
