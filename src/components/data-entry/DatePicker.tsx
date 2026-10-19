import { useCallback, useState, type ChangeEvent } from "react";
import { cn } from "../../utils/cn";
import { Button } from "../general/Button";
import { formLabelClass, useFieldState, useFormItemContext } from "./Form";
import { inputClass, inputSizeClass, nativePickerClass } from "./Input";
import type { InputSize } from "./types";

export interface DatePickerProps {
  value?: string;
  defaultValue?: string;
  min?: string;
  max?: string;
  disabled?: boolean;
  size?: InputSize;
  className?: string;
  onChange?: (value: string) => void;
}

/**
 * v2 picker field, layered on the shared Input surface (`inputClass`, which also draws the
 * disabled state: surface-2, border colour, ink-3, no opacity). The native calendar / clock glyph
 * is the 16px end icon with 8 before it; `nativePickerClass` puts it at about ink-3.
 * Shared with TimePicker.
 */
export const pickerFieldClass =
  "[&::-webkit-calendar-picker-indicator]:size-[16px] [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:ms-su2 [&::-webkit-calendar-picker-indicator]:p-0";

/**
 * End padding per size, as on the select trigger (8 / 10 / 12), so at `md` the text box ends
 * where Select's does (`padding-right: 34` with the glyph and its gap).
 */
export const pickerEndPadClass: Record<InputSize, string> = {
  sm: "pe-su2",
  md: "pe-[10px]",
  lg: "pe-su3",
};

export function DatePicker({
  value: valueProp,
  defaultValue,
  min,
  max,
  disabled,
  size: sizeProp,
  className,
  onChange,
}: DatePickerProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);

  const [internal, setInternal] = useState(defaultValue ?? "");
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internal;

  const emit = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    emit(event.target.value);
  };

  return (
    <div
      className={cn(
        "inline-flex w-full max-w-[220px]",
        isDisabled && "cursor-not-allowed",
        className,
      )}
    >
      <input
        type="date"
        id={item?.id}
        value={value}
        min={min}
        max={max}
        disabled={isDisabled}
        onChange={handleChange}
        className={cn(
          inputClass,
          nativePickerClass,
          inputSizeClass[size],
          pickerFieldClass,
          pickerEndPadClass[size],
        )}
        required={item?.required}
        aria-describedby={item?.descriptionId}
        aria-invalid={item?.error ? true : undefined}
      />
    </div>
  );
}

/**
 * Native dual date inputs with optional presets.
 *
 * Gaps vs DatePicker (intentional for now):
 * - Does not bind a single Form.Item `id` (two fields; start gets form id when present).
 * - No calendar popover / day-grid UX — browser native pickers only.
 * - Presets are buttons only; no relative-date helpers.
 */
export interface DateRangePickerProps {
  value?: [string, string];
  defaultValue?: [string, string];
  onChange?: (value: [string, string]) => void;
  presets?: { label: string; value: [string, string] }[];
  /** Caption above the start field. Pass `""` to suppress it (e.g. when a FormItem already labels the range). */
  startLabel?: string;
  /** Caption above the end field. Pass `""` to suppress it. */
  endLabel?: string;
  disabled?: boolean;
  min?: string;
  max?: string;
  size?: InputSize;
  className?: string;
}

export function DateRangePicker({
  value: valueProp,
  defaultValue = ["", ""],
  onChange,
  presets = [],
  startLabel = "Start date",
  endLabel = "End date",
  disabled,
  min,
  max,
  size: sizeProp,
  className,
}: DateRangePickerProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);

  const [internal, setInternal] = useState<[string, string]>(defaultValue);
  const isControlled = valueProp !== undefined;
  const range = isControlled ? valueProp : internal;

  const emit = useCallback(
    (next: [string, string]) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const fieldClass = cn(
    inputClass,
    nativePickerClass,
    inputSizeClass[size],
    pickerFieldClass,
    pickerEndPadClass[size],
  );
  // Caption above each field: the field label (13/18 500 ink-2), 4 above the control.
  const legClass = cn(
    "flex flex-col min-w-0 flex-[1_1_160px] max-w-[220px]",
    isDisabled && "cursor-not-allowed",
  );

  return (
    <div className={cn("flex flex-col gap-su3 w-full", className)}>
      <div className="flex flex-wrap gap-x-su4 gap-y-su3">
        <label className={legClass}>
          {startLabel && <span className={formLabelClass}>{startLabel}</span>}
          <input
            type="date"
            id={item?.id}
            className={fieldClass}
            value={range[0]}
            min={min}
            max={range[1] || max}
            disabled={isDisabled}
            required={item?.required}
            aria-describedby={item?.descriptionId}
            aria-invalid={item?.error ? true : undefined}
            onChange={(e) => emit([e.target.value, range[1]])}
          />
        </label>
        <label className={legClass}>
          {endLabel && <span className={formLabelClass}>{endLabel}</span>}
          <input
            type="date"
            className={fieldClass}
            value={range[1]}
            min={range[0] || min}
            max={max}
            disabled={isDisabled}
            required={item?.required}
            aria-describedby={item?.descriptionId}
            aria-invalid={item?.error ? true : undefined}
            onChange={(e) => emit([range[0], e.target.value])}
          />
        </label>
      </div>
      {presets.length > 0 && (
        <div className="flex flex-wrap gap-su2">
          {presets.map((preset) => (
            <Button
              key={preset.label}
              variant="default"
              size="sm"
              disabled={isDisabled}
              onClick={() => emit(preset.value)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}

DatePicker.RangePicker = DateRangePicker;
