import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useFormContext, useFormItemContext } from "./Form";

/** Radix's own tri-state: `true` | `false` | `"indeterminate"` (renders `aria-checked="mixed"`). */
export type CheckboxState = CheckboxPrimitive.CheckedState;

export interface CheckboxProps {
  "aria-label"?: string;
  "aria-labelledby"?: string;
  checked?: CheckboxState;
  defaultChecked?: CheckboxState;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
  /**
   * The overlay-row form, for a value in a facet popover or a menu of choices: the checkbox is a
   * full-width row 32 high (44 on touch), padding 0 8, radius 6, with the hover ground of an
   * overlay row. The label fills the line and is cut with an ellipsis.
   */
  row?: boolean;
  /** After the label, at the end of the line: a count, 13/18 ink-2 in tabular figures. */
  trailing?: ReactNode;
  /** `checked` collapses `"indeterminate"` to `false`; read `state` for the raw tri-state. */
  onCheckedChange?: (checked: boolean, state: CheckboxState) => void;
}

/*
 * 16×16 box, radius 4, border-box.
 * - Unchecked: surface + 1px border-control (#8a919d, 3:1 on surface, WCAG 1.4.11).
 * - Checked / indeterminate: action fill + action border, white mark.
 * - Hover (only where hover exists) follows the whole label row, `group/cb`: unchecked border
 *   ink-3, checked fill action-hover.
 * - Disabled: fill + border colour; checked turns border-strong with the white mark kept. No opacity.
 * - Invalid: danger border while unchecked.
 * Each branch emits one class per property and state, so nothing depends on UnoCSS emission order.
 */
const boxBaseClass = [
  "relative inline-flex shrink-0 items-center justify-center size-[16px] p-0 rounded-su-tag",
  "border border-solid text-on-action",
  "transition-[background-color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  // High Contrast: paint the token colours (Canvas, CanvasText, Highlight) instead of letting the
  // browser erase the fill, which would hide the checked state.
  "forced-colors:[forced-color-adjust:none]",
].join(" ");

const boxEnabledClass = [
  "cursor-pointer bg-surface",
  "data-[state=checked]:bg-action data-[state=checked]:border-action",
  "data-[state=indeterminate]:bg-action data-[state=indeterminate]:border-action",
  "[@media(hover:hover)]:group-hover/cb:data-[state=checked]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=checked]:border-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=indeterminate]:bg-action-hover",
  "[@media(hover:hover)]:group-hover/cb:data-[state=indeterminate]:border-action-hover",
].join(" ");

const boxValidClass =
  "border-border-control [@media(hover:hover)]:group-hover/cb:data-[state=unchecked]:border-ink-3";

const boxInvalidClass = "border-danger";

const boxDisabledClass = [
  "cursor-not-allowed bg-fill border-border",
  "data-[state=checked]:bg-border-strong data-[state=checked]:border-border-strong",
  "data-[state=indeterminate]:bg-border-strong data-[state=indeterminate]:border-border-strong",
].join(" ");

/** Internal: the box recipe, shared by `Checkbox` and the decorative `CheckboxMark`. */
export function checkboxBoxClass({
  disabled,
  invalid,
}: {
  disabled?: boolean;
  invalid?: boolean;
}) {
  return cn(
    boxBaseClass,
    disabled ? boxDisabledClass : cn(boxEnabledClass, invalid ? boxInvalidClass : boxValidClass),
  );
}

/** 12px white check (stroke 3, round), or an 8×2 bar with radius 1 when indeterminate. */
function CheckGlyph() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="block size-[12px]">
      <path
        d="M5 12l5 5l10 -10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="[[data-state=indeterminate]_&]:hidden"
      />
      <rect
        x="4"
        y="10"
        width="16"
        height="4"
        rx="2"
        fill="currentColor"
        className="hidden [[data-state=indeterminate]_&]:block"
      />
    </svg>
  );
}

/**
 * Internal: a decorative (`aria-hidden`) box that mirrors a selection, for rows that are
 * themselves the control (listbox options in Transfer). Put `group/cb` on the row for hover.
 */
export function CheckboxMark({
  checked,
  disabled,
  className,
}: {
  checked: CheckboxState;
  disabled?: boolean;
  className?: string;
}) {
  const state =
    checked === "indeterminate" ? "indeterminate" : checked ? "checked" : "unchecked";
  return (
    <span
      aria-hidden="true"
      data-state={state}
      className={cn(checkboxBoxClass({ disabled }), className)}
    >
      {state === "unchecked" ? null : <CheckGlyph />}
    </span>
  );
}

export function Checkbox({
  checked,
  defaultChecked,
  disabled,
  required,
  name,
  value = "on",
  id: idProp,
  className,
  children,
  row = false,
  trailing,
  onCheckedChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: CheckboxProps) {
  const form = useFormContext();
  const item = useFormItemContext();
  const isDisabled = disabled ?? form.disabled;
  const invalid = Boolean(item?.error);

  return (
    <label
      className={cn(
        // The whole row is the target: box + 8 + label 14/20. Desk keeps the visual size;
        // touch gets the 44px floor.
        "group/cb items-center gap-su2",
        row
          ? "flex w-full min-w-0 px-su2 rounded-su-control [@media(hover:hover)]:h-[var(--su-row-overlay)] [@media(hover:hover)]:hover:bg-surface-hover"
          : "inline-flex",
        "[@media(hover:none)]:min-h-[var(--su-hit-target)] [@media(hover:none)]:min-w-[var(--su-hit-target)]",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className,
      )}
    >
      <CheckboxPrimitive.Root
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
        className={cn(checkboxBoxClass({ disabled: isDisabled, invalid }), "su-focus-ring")}
        onCheckedChange={(state) => onCheckedChange?.(state === true, state)}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
      >
        <CheckboxPrimitive.Indicator className="flex items-center justify-center">
          <CheckGlyph />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {children && (
        <span
          className={cn(
            "text-body select-none",
            row && "min-w-0 flex-1 truncate",
            isDisabled ? "text-ink-3" : "text-ink",
          )}
        >
          {children}
        </span>
      )}
      {trailing != null ? (
        <span className={cn("shrink-0 su-tabular text-small", isDisabled ? "text-ink-3" : "text-ink-2")}>
          {trailing}
        </span>
      ) : null}
    </label>
  );
}
