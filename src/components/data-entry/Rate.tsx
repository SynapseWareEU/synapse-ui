import { useState } from "react";
import { cn } from "../../utils/cn";
import { useFormContext, useFormItemContext } from "./Form";

export interface RateProps {
  "aria-label"?: string;
  value?: number;
  defaultValue?: number;
  count?: number;
  allowClear?: boolean;
  disabled?: boolean;
  className?: string;
  onChange?: (value: number) => void;
}

// Star 16 in a 20 box (radius 4, so the focus ring has room); the boxes touch, so stars sit 4 apart.
// On desk the visual box is the target; touch gets the old 44 box back.
const starButtonClass = [
  "inline-flex shrink-0 items-center justify-center size-[20px] p-0 rounded-su-tag bg-transparent",
  "[@media(hover:none)]:size-[var(--su-hit-target)]",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: on and off would both be forced to one text colour; keep them apart.
  "forced-colors:[forced-color-adjust:none]",
  "su-focus-ring",
].join(" ");

/* Off: border-strong. On: warning solid. Disabled: on turns ink-3, no opacity. */
const starToneClass = {
  on: "text-warning forced-colors:text-[CanvasText]",
  off: "text-border-strong forced-colors:text-[GrayText]",
  disabledOn: "text-ink-3 forced-colors:text-[GrayText]",
  disabledOff: "text-border-strong forced-colors:text-[GrayText]",
};

export function Rate({
  value: valueProp,
  defaultValue = 0,
  count = 5,
  allowClear = true,
  disabled,
  className,
  onChange,
  "aria-label": ariaLabel = "Rating",
}: RateProps) {
  const form = useFormContext();
  const item = useFormItemContext();
  const isDisabled = disabled ?? form.disabled;

  const [internal, setInternal] = useState(defaultValue);
  const [preview, setPreview] = useState<number | null>(null);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internal;
  // Drives both hover and keyboard-focus previews, so both input modes see the same fill.
  const display = preview ?? value;

  return (
    // Not role="slider": a slider must be focusable and own its arrow keys, and
    // must not contain interactive descendants. The stars are real buttons, so
    // this is a labelled group of them.
    // ponytail: no allowHalf / custom character / arrow-key roving focus — add
    // them as additive props when a real rating flow asks for them.
    <div
      id={item?.id}
      className={cn("inline-flex items-center", className)}
      role="group"
      aria-label={ariaLabel}
      aria-describedby={item?.descriptionId}
      aria-invalid={item?.error ? true : undefined}
      onMouseLeave={() => setPreview(null)}
    >
      {Array.from({ length: count }, (_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={starValue}
            type="button"
            disabled={isDisabled}
            className={cn(
              starButtonClass,
              isDisabled
                ? starValue <= display
                  ? starToneClass.disabledOn
                  : starToneClass.disabledOff
                : starValue <= display
                  ? starToneClass.on
                  : starToneClass.off,
              isDisabled ? "cursor-not-allowed" : "cursor-pointer",
            )}
            aria-label={`${starValue} star${starValue > 1 ? "s" : ""}`}
            aria-pressed={starValue === value}
            onMouseEnter={() => !isDisabled && setPreview(starValue)}
            onFocus={() => !isDisabled && setPreview(starValue)}
            onBlur={() => setPreview(null)}
            onClick={() => {
              if (isDisabled) return;
              const next = allowClear && value === starValue ? 0 : starValue;
              if (!isControlled) setInternal(next);
              onChange?.(next);
            }}
          >
            <svg viewBox="0 0 24 24" className="size-[16px]" fill="currentColor" aria-hidden="true">
              <path d="M12 2.5 15.09 8.76 22 9.77l-5 4.87 1.18 6.86L12 18.26l-6.18 3.24L7 14.64l-5-4.87 6.91-1.01z" />
            </svg>
          </button>
        );
      })}
      {display > 0 && (
        <span className="ms-su2 text-small text-ink-2 su-tabular">
          {display}/{count}
        </span>
      )}
    </div>
  );
}
