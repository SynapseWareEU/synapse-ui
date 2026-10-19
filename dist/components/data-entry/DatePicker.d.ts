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
export declare const pickerFieldClass = "[&::-webkit-calendar-picker-indicator]:size-[16px] [&::-webkit-calendar-picker-indicator]:m-0 [&::-webkit-calendar-picker-indicator]:ms-su2 [&::-webkit-calendar-picker-indicator]:p-0";
/**
 * End padding per size, as on the select trigger (8 / 10 / 12), so at `md` the text box ends
 * where Select's does (`padding-right: 34` with the glyph and its gap).
 */
export declare const pickerEndPadClass: Record<InputSize, string>;
export declare function DatePicker({ value: valueProp, defaultValue, min, max, disabled, size: sizeProp, className, onChange, }: DatePickerProps): import("react").JSX.Element;
export declare namespace DatePicker {
    var RangePicker: typeof DateRangePicker;
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
    presets?: {
        label: string;
        value: [string, string];
    }[];
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
export declare function DateRangePicker({ value: valueProp, defaultValue, onChange, presets, startLabel, endLabel, disabled, min, max, size: sizeProp, className, }: DateRangePickerProps): import("react").JSX.Element;
//# sourceMappingURL=DatePicker.d.ts.map