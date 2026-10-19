import * as SelectPrimitive from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useFieldState, useFormItemContext } from "./Form";
import { selectTriggerClass, selectTriggerSizeClass } from "./Input";
import type { InputSize, SelectOption } from "./types";

/** Shared combobox trigger surface: Select, Cascader, TreeSelect (defined beside the field in Input). */
export { selectTriggerClass, selectTriggerSizeClass };

export type SelectVariant = "outlined" | "ghost";

/**
 * Anything else (`aria-label`, `aria-labelledby`, `data-testid`, `id`, `autoFocus`, `onBlur`…)
 * lands on the trigger, the `role="combobox"` button.
 */
export interface SelectProps
  extends Omit<
    ButtonHTMLAttributes<HTMLButtonElement>,
    "value" | "defaultValue" | "prefix" | "children" | "name" | "form" | "type"
  > {
  value?: string;
  defaultValue?: string;
  /** What an empty trigger reads, in ink-3. Default "Select…". */
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
  options?: SelectOption[];
  className?: string;
  children?: ReactNode;
  /**
   * Toolbar form ("Grupează: Produs"): a lead-in drawn in ink-2 before the value, which stays ink.
   * The trigger then sizes to its content instead of filling the row. On a `ghost` trigger it is
   * a leading slot of its own, 8 before the value and never cut with it (the 16 building icon of
   * a site switcher).
   */
  prefix?: ReactNode;
  /**
   * `outlined` (default): the field. `ghost`: no border and no ground, for a picker that sits in
   * chrome rather than in a form (the header's site switcher): 36 tall, padding 0 10, radius 6,
   * `fill` under a pointer and while open, an option's `code` in mono 600. It sizes to its
   * content; cap it with a `max-w-*` class. On a touch screen its hit area is 44 tall.
   */
  variant?: SelectVariant;
  /**
   * The phone form of a `ghost` trigger (a phone header's site switcher): the chosen option's
   * `code` alone, its name left to the list, in a 44 tall box with padding 0 8 and 6 before the
   * chevron. It replaces `size`. No effect on an `outlined` trigger.
   */
  compact?: boolean;
  /** What the list says when there are no `options`. Default "No options". */
  emptyContent?: ReactNode;
  onValueChange?: (value: string) => void;
}

/*
 * Ghost trigger: transparent, borderless, the shared focus outline. Its own class list rather than
 * overrides on the field's, because `cn()` never resolves two utilities for one property. The code
 * of the chosen option is 600 here, not the option row's 500: it is the page's place name. Under
 * (hover: none) a centred pad makes the 36 box a 44 target, as on Button.
 */
const ghostTriggerClass =
  "relative [&_[data-su-code]]:font-semibold [@media(hover:none)]:before:content-empty [@media(hover:none)]:before:absolute [@media(hover:none)]:before:inset-[min(0px,calc((100%_-_var(--su-hit-target))/2))] inline-flex items-center min-w-0 w-auto max-w-full font-sans font-normal text-start text-ink whitespace-nowrap cursor-pointer bg-transparent border-0 rounded-su-control su-focus-ring transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill data-[state=open]:bg-fill disabled:text-ink-3 disabled:cursor-not-allowed";

/** Ghost geometry: 32 / 36 / 48 tall · padding 0 8 / 0 10 / 0 12 · 8 between the parts. */
const ghostTriggerSizeClass: Record<InputSize, string> = {
  sm: "gap-su2 min-h-[var(--su-control-sm)] px-su2 text-control",
  md: "gap-su2 min-h-[var(--su-control-md)] px-[10px] text-control",
  lg: "gap-su2 min-h-[var(--su-control-lg)] px-su3 text-section [[data-density=handheld]_&]:text-control",
};

/*
 * A ghost trigger holding a code is never narrower than that code: an identifier is matched
 * character by character, so in a row that runs out of room the name is cut, then the trigger's
 * neighbours, and the code stays whole. Not on the compact form, which a phone header may have to
 * cut rather than scroll sideways.
 */
const ghostTriggerCodeFloorClass = "[&:has([data-su-code])]:min-w-min";

/*
 * Compact ghost: the box is the 44 target itself, padding 0 8, 6 between the parts. The name
 * beside the code is taken out of the trigger only; the list is in a portal and keeps the pair.
 */
const ghostTriggerCompactClass =
  "gap-[6px] min-h-[var(--su-hit-target)] px-su2 text-control [&_[data-su-code]~span]:hidden";

/**
 * An option's main line. With a `code` it is the reference pair (§2.2): the code in mono 500,
 * 8 apart and baseline-aligned, then the name in ink-2 with an ellipsis. `label` overrides the
 * rendered name (AutoComplete passes the match-highlighted one).
 */
export function SelectOptionLabel({ option, label }: { option: SelectOption; label?: ReactNode }) {
  const name = label ?? option.label;
  if (!option.code) return <>{name}</>;
  return (
    // A grid, not a flex row: its min-content width is the code alone (the name's track starts at
    // 0), which is what lets a ghost trigger floor itself at the code. The 8 is the name's margin
    // rather than a gap, so a trigger that hides the name is left with nothing after the code.
    <span className="inline-grid grid-cols-[max-content_minmax(0,auto)] max-w-full items-baseline align-top">
      <span data-su-code="" className="font-mono font-medium">
        {option.code}
      </span>{" "}
      <span className="min-w-0 ms-su2 truncate text-ink-2">{name}</span>
    </span>
  );
}

/*
 * Listbox option (§4.2, D): 32 tall, padding 0 8, radius 4, 14/20 ink. Highlighted (pointer or
 * keyboard, Radix moves one highlight): surface-hover. Selected: action-subtle plus a 16 check at
 * the end; selected and highlighted: action-subtle-hover. Disabled: ink-3. Roving focus, so no
 * outline, except under prefers-contrast / forced colours where a background alone is too faint.
 */
const selectItemClass =
  "relative flex items-center gap-su2 min-w-0 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] px-su2 rounded-su-tag font-sans text-body text-ink cursor-pointer select-none outline-none data-[highlighted]:bg-surface-hover data-[state=checked]:bg-action-subtle data-[state=checked]:data-[highlighted]:bg-action-subtle-hover data-[disabled]:text-ink-3 data-[disabled]:cursor-not-allowed contrast-more:data-[highlighted]:outline-2 contrast-more:data-[highlighted]:outline-solid contrast-more:data-[highlighted]:outline-ink contrast-more:data-[highlighted]:-outline-offset-2 forced-colors:data-[highlighted]:outline-2 forced-colors:data-[highlighted]:outline-solid forced-colors:data-[highlighted]:-outline-offset-2";

const scrollButtonClass =
  "flex items-center justify-center h-[var(--su-space-6)] bg-surface-overlay text-ink-3 cursor-default";

export function Select({
  value,
  defaultValue,
  placeholder = "Select…",
  disabled,
  size: sizeProp,
  options = [],
  className,
  children,
  prefix,
  variant = "outlined",
  compact = false,
  emptyContent = "No options",
  onValueChange,
  ...rest
}: SelectProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);
  const hasPrefix = prefix != null && prefix !== false && prefix !== "";
  const ghost = variant === "ghost";

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      disabled={isDisabled}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        id={item?.id}
        className={
          ghost
            ? cn(ghostTriggerClass, compact ? ghostTriggerCompactClass : cn(ghostTriggerSizeClass[size], ghostTriggerCodeFloorClass), className)
            : cn(
                selectTriggerClass,
                selectTriggerSizeClass[size],
                hasPrefix ? "w-auto max-w-full whitespace-nowrap" : "w-full",
                className,
              )
        }
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
        {...rest}
      >
        {/* Radix's SelectValue drops className, so the truncation lives on a wrapper. */}
        {/* `max-w-none` on the two icons: under a host reset's `svg { max-width: 100% }` (Lattice's)
            each icon counted as 0 in the trigger's min-content width, and the ghost floor came out
            32 short of the code. */}
        {hasPrefix && ghost ? (
          <span className="inline-flex items-center shrink-0 text-ink-2 [&>svg]:max-w-none">{prefix}</span>
        ) : null}
        <span className="flex-1 min-w-0 truncate">
          {hasPrefix && !ghost && (
            <>
              <span className="text-ink-2">{prefix}</span>{" "}
            </>
          )}
          <SelectPrimitive.Value placeholder={<span className="text-ink-3">{placeholder}</span>} />
        </span>
        <SelectPrimitive.Icon className="flex shrink-0 text-ink-3">
          <IconChevronDown size={16} stroke={1.75} aria-hidden="true" className="max-w-none" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content
          className="su-popover overflow-hidden p-0 min-w-[var(--radix-select-trigger-width)] max-w-[var(--radix-select-content-available-width)] max-h-[min(var(--su-dropdown-max-h),var(--radix-select-content-available-height))] animate-su-dropdown-in motion-reduce:animate-none"
          position="popper"
          sideOffset={4}
        >
          <SelectPrimitive.ScrollUpButton className={scrollButtonClass} aria-hidden="true">
            <IconChevronUp size={16} stroke={1.75} aria-hidden="true" />
          </SelectPrimitive.ScrollUpButton>
          <SelectPrimitive.Viewport className="p-su1">
            {children ??
              (options.length === 0 ? (
                // A blank popover reads as broken; say it's empty on purpose.
                <div className="p-su2 text-small text-ink-2 text-start">{emptyContent}</div>
              ) : (
                options.map((option) => (
                  <SelectPrimitive.Item
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                    // Typeahead matches the code as well as the name.
                    textValue={option.code ? `${option.code} ${option.label}` : undefined}
                    className={cn(
                      selectItemClass,
                      // With a description the row is two lines: 5 + 20 + 18 + 5 = 48.
                      option.description ? "py-[5px]" : "py-[6px]",
                    )}
                  >
                    <span className="flex-1 min-w-0">
                      {/* Only the main line is mirrored into the trigger. ItemText drops
                          className too, so the truncation lives on a wrapper here as well. */}
                      <span className="block truncate">
                        <SelectPrimitive.ItemText>
                          <SelectOptionLabel option={option} />
                        </SelectPrimitive.ItemText>
                      </span>
                      {option.description ? (
                        <span className="block truncate text-small text-ink-2">{option.description}</span>
                      ) : null}
                    </span>
                    <SelectPrimitive.ItemIndicator className="flex shrink-0 text-action-text">
                      <IconCheck size={16} stroke={1.75} aria-hidden="true" />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))
              ))}
          </SelectPrimitive.Viewport>
          <SelectPrimitive.ScrollDownButton className={scrollButtonClass} aria-hidden="true">
            <IconChevronDown size={16} stroke={1.75} aria-hidden="true" />
          </SelectPrimitive.ScrollDownButton>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
