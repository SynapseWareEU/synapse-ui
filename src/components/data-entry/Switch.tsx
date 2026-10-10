import * as SwitchPrimitive from "@radix-ui/react-switch";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useFormContext, useFormItemContext } from "./Form";

export interface SwitchProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  /** Async toggle in flight: shows a ring spinner in the thumb and blocks input. */
  loading?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  /**
   * The state in words, beside the switch in 14/20 ink ("Pornit", "Se cere la fiecare recepție").
   * v2 always pairs the switch with its state; the field label sits above, in a FormItem.
   */
  children?: ReactNode;
  onCheckedChange?: (checked: boolean) => void;
}

/*
 * Track 36×20, radius 10 (pill), padding 3, no border. On: action. Off: ink-3 (#6f7684).
 * Hover (hover devices only, whole row): on → action-hover, off → ink-2.
 * Disabled: on → border-strong, off → border; the state words turn ink-3. No opacity.
 */
const trackBaseClass = [
  "relative inline-flex shrink-0 items-center w-[36px] h-[20px] p-[3px] border-0 rounded-su-pill",
  "transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: keep the token colours (GrayText / Highlight track, HighlightText thumb);
  // a borderless track would otherwise be erased to Canvas.
  "forced-colors:[forced-color-adjust:none]",
  "su-focus-ring",
].join(" ");

const trackEnabledClass = [
  "bg-ink-3 data-[state=checked]:bg-action",
  "[@media(hover:hover)]:group-hover/sw:data-[state=unchecked]:bg-ink-2",
  "[@media(hover:hover)]:group-hover/sw:data-[state=checked]:bg-action-hover",
].join(" ");

const trackDisabledClass =
  "cursor-not-allowed bg-border data-[state=checked]:bg-border-strong";

/* Thumb: 14 circle, white in both themes (on-action), no shadow; travels 16 in 150ms ease-out. */
const thumbClass = [
  "pointer-events-none flex items-center justify-center size-[14px] rounded-full bg-on-action",
  "transition-transform duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "translate-x-0 data-[state=checked]:translate-x-[16px]",
  // physical translate, mirrored under [dir=rtl] so the thumb travels toward the trailing edge
  "rtl:data-[state=checked]:-translate-x-[16px]",
].join(" ");

/** 10px ring spinner in the thumb: border-colour track, arc in the track's own colour. */
function ThumbSpinner() {
  return (
    <svg
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden="true"
      className="block size-[10px] animate-spin motion-reduce:animate-none text-ink-3 [[data-state=checked]_&]:text-action"
      style={{ animationDuration: "800ms" }}
    >
      <circle cx="5" cy="5" r="4" strokeWidth="1.5" className="stroke-border" />
      <path d="M5 1a4 4 0 0 1 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/** ponytail: no `size` variant or ref forwarding (siblings have neither) — add when a caller needs one. */
export function Switch({
  checked,
  defaultChecked,
  disabled,
  loading,
  required,
  name,
  value,
  id: idProp,
  className,
  children,
  onCheckedChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: SwitchProps) {
  const form = useFormContext();
  const item = useFormItemContext();
  const isDisabled = disabled ?? form.disabled;

  return (
    <label
      className={cn(
        // The switch field row: 36 tall, switch + 10 + state words.
        "group/sw inline-flex items-center gap-[10px] min-h-[var(--su-control-md)]",
        "[@media(hover:none)]:min-h-[max(var(--su-control-md),var(--su-hit-target))]",
        isDisabled ? "cursor-not-allowed" : loading ? "cursor-wait" : "cursor-pointer",
        className,
      )}
    >
      <SwitchPrimitive.Root
        id={idProp ?? item?.id}
        // Visible children already name the control via the wrapping <label>;
        // forwarding aria-label too would let the two diverge (WCAG 2.5.3).
        aria-label={children ? undefined : ariaLabel}
        aria-labelledby={children ? undefined : ariaLabelledBy}
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        required={required ?? item?.required}
        name={name}
        value={value}
        className={cn(
          trackBaseClass,
          isDisabled ? trackDisabledClass : trackEnabledClass,
          !isDisabled && (loading ? "cursor-wait" : "cursor-pointer"),
        )}
        // Loading is busy, not disabled: full contrast, still focusable, clicks
        // guarded (Button.tsx convention). preventDefault stops Radix's own
        // toggle handler, so space/enter are covered too.
        onClick={(event) => {
          if (loading) {
            event.preventDefault();
            event.stopPropagation();
          }
        }}
        onCheckedChange={(next) => {
          if (!loading) onCheckedChange?.(next);
        }}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
        aria-busy={loading || undefined}
      >
        <SwitchPrimitive.Thumb className={thumbClass}>
          {loading ? <ThumbSpinner /> : null}
        </SwitchPrimitive.Thumb>
      </SwitchPrimitive.Root>
      {children && (
        <span className={cn("text-body select-none", isDisabled ? "text-ink-3" : "text-ink")}>
          {children}
        </span>
      )}
    </label>
  );
}
