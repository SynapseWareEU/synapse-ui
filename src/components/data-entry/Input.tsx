import { IconEye, IconEyeOff, IconX } from "@tabler/icons-react";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type InputHTMLAttributes,
  type MouseEvent,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "../../utils/cn";
import { useFieldState, useFormItemContext } from "./Form";
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

/*
 * Lattice UI v2 field (§4.2): surface, 1px border-strong, radius 6, ink value, ink-3 placeholder.
 * Focus is the shared 2px outline only; the border keeps its colour. Invalid turns the border
 * danger (the outline stays action). Disabled: surface-2, border, ink-3, never opacity.
 * Under `data-density="handheld"` the border is 2px and focus draws it in action instead of an
 * outline (§3). Each property is set by one class per state, so stylesheet order never decides.
 */
const fieldBaseClass =
  "bg-surface text-ink border border-solid border-border-strong rounded-su-control su-focus-ring duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none aria-invalid:enabled:border-danger disabled:bg-surface-2 disabled:border-border disabled:text-ink-3 disabled:cursor-not-allowed [[data-density=handheld]_&]:border-2 [[data-density=handheld]_&]:px-su4 [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:outline-none [[data-density=handheld]_&:focus-visible:not([aria-invalid=true])]:border-action";

/** Text-entry base (input, textarea) without a font family; `mono` picks one. */
const inputBaseClass = `w-full ${fieldBaseClass} transition-[border-color] placeholder:text-ink-3 read-only:bg-surface-2 read-only:border-border`;

/** Shared control field surface: Input, DatePicker, TimePicker, InputNumber, Mentions. */
export const inputClass = `${inputBaseClass} font-sans`;

/** Height, inline padding and value type per size: 32 / 36 / 48 · padding 8 / 12 / 14 · 14/20, 14/20, 16/24. */
export const inputSizeClass: Record<InputSize, string> = {
  sm: "min-h-[var(--su-control-sm)] px-su2 py-0 text-control",
  md: "min-h-[var(--su-control-md)] px-su3 py-0 text-control",
  // Handheld: `lg` (64) never sets smaller type than `md` (56), and 16 is under the 17 floor.
  lg: "min-h-[var(--su-control-lg)] px-[14px] py-0 text-section [[data-density=handheld]_&]:text-control",
};

/**
 * The select-like trigger (Select, Cascader, TreeSelect): the same field, as a button. Hover and
 * the open state hold surface-2 (§3, "select-like buttons"). The caller adds
 * `selectTriggerSizeClass[size]` and a width (`w-full`, or `w-auto` for the toolbar form).
 */
export const selectTriggerClass = `inline-flex items-center gap-su2 min-w-0 font-sans font-normal text-start cursor-pointer ${fieldBaseClass} transition-[border-color,background-color] [@media(hover:hover)]:hover:enabled:bg-surface-2 data-[state=open]:bg-surface-2`;

/** Trigger geometry: 32 / 36 / 48 tall · padding 0 8 / 0 10 0 12 / 0 12 0 14 · chevron 16 ink-3. */
export const selectTriggerSizeClass: Record<InputSize, string> = {
  sm: "min-h-[var(--su-control-sm)] ps-su2 pe-su2 text-control",
  md: "min-h-[var(--su-control-md)] ps-su3 pe-[10px] text-control",
  lg: "min-h-[var(--su-control-lg)] ps-[14px] pe-su3 text-section [[data-density=handheld]_&]:text-control",
};

/**
 * Native `date`/`time` field trim, shared by DatePicker, DateRangePicker and TimePicker.
 * `color-scheme` is inherited from `:root`/`[data-theme]` (tokens.css). Never re-set it here:
 * it would pin the native calendar glyph to the OS theme instead of the app's.
 * The disabled look comes from `inputClass` (surface-2, ink-3); v2 has no opacity dim.
 */
export const nativePickerClass =
  "[&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-60 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 disabled:cursor-not-allowed";

/** Per-size affix geometry in px: field padding, icon inset, default icon size, field height. */
const fieldMetrics: Record<InputSize, { pad: number; inset: number; icon: number; height: string }> = {
  sm: { pad: 8, inset: 8, icon: 16, height: "var(--su-control-sm)" },
  md: { pad: 12, inset: 10, icon: 16, height: "var(--su-control-md)" },
  lg: { pad: 14, inset: 12, icon: 20, height: "var(--su-control-lg)" },
};
/** Space between an affix and the value. */
const AFFIX_GAP = 8;
/** `--su-control-mini`: the clear button. */
const MINI = 24;

// Literal class maps, so the UnoCSS scanner finds every position.
const prefixPositionClass: Record<InputSize, string> = {
  sm: "start-[var(--su-space-2)]",
  md: "start-[10px]",
  lg: "start-[var(--su-space-3)]",
};
const suffixPositionClass: Record<InputSize, string> = {
  sm: "end-[var(--su-space-2)]",
  md: "end-[var(--su-space-3)]",
  lg: "end-[14px]",
};
// The 24 button sits 4 outside the icon inset, so its 16 glyph lines up with a leading icon.
const clearPositionClass: Record<InputSize, string> = {
  sm: "end-[var(--su-space-1)]",
  md: "end-[6px]",
  lg: "end-[var(--su-space-2)]",
};
const affixTextClass: Record<InputSize, string> = {
  sm: "text-control",
  md: "text-control",
  lg: "text-section [[data-density=handheld]_&]:text-control",
};

// Click-through for plain text/icon affixes; anything nested (a button, a link) stays pressable.
const affixClass =
  "absolute inset-y-0 flex items-center whitespace-nowrap pointer-events-none [&_*]:pointer-events-auto";

/** Ghost icon button inside a field: fill + ink on hover, 44px to press on touch. */
const fieldIconButtonClass =
  "pointer-events-auto inline-flex items-center justify-center p-0 bg-transparent cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill [@media(hover:hover)]:hover:enabled:text-ink disabled:cursor-not-allowed [@media(hover:none)]:su-hit-44";

/** Inline-end padding a field needs while a `FieldClearButton` sits in it. */
export function fieldClearPadding(size: InputSize): number {
  return fieldMetrics[size].inset + MINI;
}

export interface FieldClearButtonProps {
  size: InputSize;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseDown?: (event: MouseEvent<HTMLButtonElement>) => void;
  label?: string;
}

/** The field's clear control: a 24 icon button with a 16 ink-3 ×. The parent must be `relative`. */
export function FieldClearButton({ size, onClick, onMouseDown, label = "Clear" }: FieldClearButtonProps) {
  return (
    <span className={cn("absolute inset-y-0 flex items-center pointer-events-none", clearPositionClass[size])}>
      <button
        type="button"
        aria-label={label}
        onClick={onClick}
        onMouseDown={onMouseDown}
        className={cn(fieldIconButtonClass, "size-[var(--su-control-mini)] rounded-su-tag text-ink-3")}
      >
        <IconX size={16} stroke={1.75} aria-hidden="true" />
      </button>
    </span>
  );
}

function hasContent(node: ReactNode) {
  return node != null && node !== false && node !== "";
}

/**
 * Layout width of an affix, kept current (a unit string, an icon, a web font swapping in).
 * Measured in the commit phase, so the corrected padding lands before the first paint.
 */
function useInlineSize(): [(el: HTMLElement | null) => void, number | undefined] {
  const [width, setWidth] = useState<number>();
  const observer = useRef<ResizeObserver | null>(null);
  const ref = useCallback((el: HTMLElement | null) => {
    observer.current?.disconnect();
    observer.current = null;
    if (!el) return;
    // offsetWidth, not getBoundingClientRect: an entering overlay's scale must not skew it.
    const measure = () => setWidth(el.offsetWidth);
    measure();
    if (typeof ResizeObserver === "function") {
      observer.current = new ResizeObserver(measure);
      observer.current.observe(el);
    }
  }, []);
  return [ref, width];
}

export function Input({
  size: sizeProp,
  prefix,
  suffix,
  fullWidth = true,
  allowClear,
  mono,
  revealLabel = "Show password",
  clearLabel,
  disabled,
  className,
  style,
  id: idProp,
  ref,
  onChange,
  "aria-describedby": ariaDescribedBy,
  "aria-invalid": ariaInvalid,
  ...rest
}: InputProps) {
  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(sizeProp, disabled);
  const metrics = fieldMetrics[size];
  const autoId = useId();

  const node = useRef<HTMLInputElement>(null);
  const [filled, setFilled] = useState(() => String(rest.defaultValue ?? "") !== "");
  const [revealed, setRevealed] = useState(false);
  const [prefixRef, prefixWidth] = useInlineSize();
  const [suffixRef, suffixWidth] = useInlineSize();

  const hasPrefix = hasContent(prefix);
  const hasSuffix = hasContent(suffix);
  const isNumber = rest.type === "number";
  // Password fields get the drawn reveal toggle (V2Login) unless the caller fills the slot.
  const showReveal = rest.type === "password" && !hasSuffix;
  const showClear =
    !showReveal &&
    allowClear === true &&
    !isDisabled &&
    !rest.readOnly &&
    (rest.value != null ? String(rest.value) !== "" : filled);
  const inputId = idProp ?? item?.id ?? (showReveal ? autoId : undefined);

  // Affix padding is measured, so it is an inline style: it beats the size class without a
  // second padding utility racing it in the stylesheet. A caller's own `style` still wins.
  const padStart = hasPrefix ? metrics.inset + (prefixWidth ?? metrics.icon) + AFFIX_GAP : undefined;
  const padEnd = showReveal
    ? `calc(${metrics.height} + 4px)`
    : showClear
      ? fieldClearPadding(size)
      : hasSuffix
        ? metrics.pad + (suffixWidth ?? metrics.icon) + AFFIX_GAP
        : undefined;
  const fieldStyle: CSSProperties | undefined =
    padStart != null || padEnd != null
      ? { paddingInlineStart: padStart, paddingInlineEnd: padEnd, ...style }
      : style;

  const setNode = (el: HTMLInputElement | null) => {
    node.current = el;
    if (typeof ref === "function") ref(el);
    else if (ref) ref.current = el;
  };

  const clear = () => {
    const el = node.current;
    if (!el) return;
    // Native setter + input event, so controlled consumers hear it through onChange.
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set?.call(el, "");
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.focus();
  };

  return (
    <div
      className={cn(
        "relative flex items-center",
        fullWidth && "w-full",
        isDisabled && "cursor-not-allowed",
      )}
    >
      {hasPrefix && (
        <span ref={prefixRef} className={cn(affixClass, prefixPositionClass[size], "text-ink-3")}>
          {prefix}
        </span>
      )}
      <input
        id={inputId}
        disabled={isDisabled}
        className={cn(
          inputBaseClass,
          inputSizeClass[size],
          mono ? "font-mono placeholder:font-sans" : "font-sans",
          // §4.2 numbers: no native spinners, figures that line up, left-aligned.
          isNumber && "su-no-spinner su-tabular",
          className,
        )}
        style={fieldStyle}
        required={item?.required}
        inputMode={isNumber ? "decimal" : undefined}
        spellCheck={showReveal ? false : undefined}
        {...rest}
        type={showReveal && revealed ? "text" : rest.type}
        ref={setNode}
        onChange={
          allowClear
            ? (e: ChangeEvent<HTMLInputElement>) => {
                setFilled(e.target.value !== "");
                onChange?.(e);
              }
            : onChange
        }
        aria-describedby={ariaDescribedBy ?? item?.descriptionId}
        aria-invalid={ariaInvalid ?? (item?.error ? true : undefined)}
      />
      {showReveal ? (
        // 2 in from the field's edge on three sides: 32 in a 36 field, and it follows the
        // handheld height.
        <span className="absolute top-[2px] bottom-[2px] end-[2px] flex">
          <button
            type="button"
            aria-label={revealLabel}
            title={revealLabel}
            aria-pressed={revealed}
            aria-controls={inputId}
            disabled={isDisabled}
            // Keep the caret in the field; the keyboard path is Tab.
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setRevealed((v) => !v)}
            className={cn(
              fieldIconButtonClass,
              "h-full aspect-square rounded-su-control text-ink-2 disabled:text-ink-3",
            )}
          >
            {revealed ? (
              <IconEyeOff size={18} stroke={1.75} aria-hidden="true" />
            ) : (
              <IconEye size={18} stroke={1.75} aria-hidden="true" />
            )}
          </button>
        </span>
      ) : showClear ? (
        <FieldClearButton size={size} onClick={clear} label={clearLabel} />
      ) : (
        hasSuffix && (
          <span
            ref={suffixRef}
            className={cn(affixClass, suffixPositionClass[size], affixTextClass[size], "text-ink-2")}
          >
            {suffix}
          </span>
        )
      )}
    </div>
  );
}
