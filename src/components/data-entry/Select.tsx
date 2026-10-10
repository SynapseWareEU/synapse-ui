import * as SelectPrimitive from "@radix-ui/react-select";
import { IconCheck, IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import type { ReactNode } from "react";
import { cn } from "../../utils/cn";
import { useFieldState, useFormItemContext } from "./Form";
import { selectTriggerClass, selectTriggerSizeClass } from "./Input";
import type { InputSize, SelectOption } from "./types";

/** Shared combobox trigger surface: Select, Cascader, TreeSelect (defined beside the field in Input). */
export { selectTriggerClass, selectTriggerSizeClass };

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  size?: InputSize;
  options?: SelectOption[];
  className?: string;
  children?: ReactNode;
  /**
   * Toolbar form ("Grupează: Produs"): a lead-in drawn in ink-2 before the value, which stays ink.
   * The trigger then sizes to its content instead of filling the row.
   */
  prefix?: ReactNode;
  onValueChange?: (value: string) => void;
}

/**
 * An option's main line. With a `code` it is the reference pair (§2.2): the code in mono 500,
 * 8 apart and baseline-aligned, then the name in ink-2 with an ellipsis. `label` overrides the
 * rendered name (AutoComplete passes the match-highlighted one).
 */
export function SelectOptionLabel({ option, label }: { option: SelectOption; label?: ReactNode }) {
  const name = label ?? option.label;
  if (!option.code) return <>{name}</>;
  return (
    <span className="inline-flex max-w-full items-baseline gap-su2 align-top">
      <span className="shrink-0 font-mono font-medium">{option.code}</span>{" "}
      <span className="min-w-0 truncate text-ink-2">{name}</span>
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
  onValueChange,
}: SelectProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);
  const hasPrefix = prefix != null && prefix !== false && prefix !== "";

  return (
    <SelectPrimitive.Root
      value={value}
      defaultValue={defaultValue}
      disabled={isDisabled}
      onValueChange={onValueChange}
    >
      <SelectPrimitive.Trigger
        id={item?.id}
        className={cn(
          selectTriggerClass,
          selectTriggerSizeClass[size],
          hasPrefix ? "w-auto max-w-full whitespace-nowrap" : "w-full",
          className,
        )}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
      >
        {/* Radix's SelectValue drops className, so the truncation lives on a wrapper. */}
        <span className="flex-1 min-w-0 truncate">
          {hasPrefix && (
            <>
              <span className="text-ink-2">{prefix}</span>{" "}
            </>
          )}
          <SelectPrimitive.Value placeholder={<span className="text-ink-3">{placeholder}</span>} />
        </span>
        <SelectPrimitive.Icon className="flex shrink-0 text-ink-3">
          <IconChevronDown size={16} stroke={1.75} aria-hidden="true" />
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
                <div className="p-su2 text-small text-ink-2 text-start">No options</div>
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
