import { type InputHTMLAttributes, type MouseEvent, type ReactNode, type Ref } from "react";
import type { InputSize } from "./types";
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
    size?: InputSize;
    /** Leading adornment, usually a 16 icon (20 at `lg`). Drawn in ink-3; the text starts 8 after it. */
    prefix?: ReactNode;
    /** Trailing adornment, usually a unit ("buc", "zile"): ink-2, 8 after the value. It never moves. */
    suffix?: ReactNode;
    fullWidth?: boolean;
    /** Show a clear button while the field has content. It takes the suffix slot. */
    allowClear?: boolean;
    /**
     * Identifier field (SKU, bin, lot, SSCC, username): the value is set in IBM Plex Mono,
     * the placeholder stays sans.
     */
    mono?: boolean;
    /**
     * Name of the reveal button of a `type="password"` field, as its `aria-label` and tooltip.
     * The button is a toggle (`aria-pressed`), so one name serves both states. Default: "Show password".
     */
    revealLabel?: string;
    /** Name of the clear button (`allowClear`). Default: "Clear". */
    clearLabel?: string;
    ref?: Ref<HTMLInputElement>;
}
/** Shared control field surface: Input, DatePicker, TimePicker, InputNumber, Mentions. */
export declare const inputClass = "w-full bg-surface text-ink border border-solid border-border-strong rounded-su-control su-focus-ring duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none aria-invalid:enabled:border-danger disabled:bg-surface-2 disabled:border-border disabled:text-ink-3 disabled:cursor-not-allowed [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4 [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:outline-none [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:border-action transition-[border-color] placeholder:text-ink-3 read-only:bg-surface-2 read-only:border-border font-sans";
/** Height, inline padding and value type per size: 32 / 36 / 48 · padding 8 / 12 / 14 · 14/20, 14/20, 16/24. */
export declare const inputSizeClass: Record<InputSize, string>;
/**
 * The select-like trigger (Select, Cascader, TreeSelect): the same field, as a button. Hover and
 * the open state hold surface-2 (§3, "select-like buttons"). The caller adds
 * `selectTriggerSizeClass[size]` and a width (`w-full`, or `w-auto` for the toolbar form).
 */
export declare const selectTriggerClass = "inline-flex items-center gap-su2 min-w-0 font-sans font-normal text-start cursor-pointer bg-surface text-ink border border-solid border-border-strong rounded-su-control su-focus-ring duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none aria-invalid:enabled:border-danger disabled:bg-surface-2 disabled:border-border disabled:text-ink-3 disabled:cursor-not-allowed [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4 [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:outline-none [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:border-action transition-[border-color,background-color] [@media(hover:hover)]:hover:enabled:bg-surface-2 data-[state=open]:bg-surface-2";
/** Trigger geometry: 32 / 36 / 48 tall · padding 0 8 / 0 10 0 12 / 0 12 0 14 · chevron 16 ink-3. */
export declare const selectTriggerSizeClass: Record<InputSize, string>;
/**
 * Native `date`/`time` field trim, shared by DatePicker, DateRangePicker and TimePicker.
 * `color-scheme` is inherited from `:root`/`[data-theme]` (tokens.css). Never re-set it here:
 * it would pin the native calendar glyph to the OS theme instead of the app's.
 * The disabled look comes from `inputClass` (surface-2, ink-3); v2 has no opacity dim.
 */
export declare const nativePickerClass = "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 disabled:cursor-not-allowed";
/** Inline-end padding a field needs while a `FieldClearButton` sits in it. */
export declare function fieldClearPadding(size: InputSize): number;
export interface FieldClearButtonProps {
    size: InputSize;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
    label?: string;
}
/** The field's clear control: a 24 icon button with a 16 ink-3 ×. The parent must be `relative`. */
export declare function FieldClearButton({ size, onClick, onMouseDown, label }: FieldClearButtonProps): import("react").JSX.Element;
export declare function Input({ size: sizeProp, prefix, suffix, fullWidth, allowClear, mono, revealLabel, clearLabel, disabled, className, style, id: idProp, ref, onChange, "aria-describedby": ariaDescribedBy, "aria-invalid": ariaInvalid, ...rest }: InputProps): import("react").JSX.Element;
//# sourceMappingURL=Input.d.ts.map