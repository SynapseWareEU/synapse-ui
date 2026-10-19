import type { HTMLAttributes, ReactNode, Ref, RefCallback } from "react";
import { IconCircleX } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

/**
 * Handheld set (spec §4.7). Every part reads the `--su-hh-*` tokens directly, so it keeps its
 * 390-wide terminal size wherever it is mounted; wrap the screen in
 * `<ConfigProvider density="handheld">` so the generic controls around it (Button, Input…) grow too.
 */

/** Icon stroke for every handheld glyph: Tabler-style 1.75, round caps and joins (the Tabler default). */
export const HH_STROKE = 1.75;

export const hhTransition =
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none";

/** The one question on a handheld screen: 28/34 600, −0.01em, ink. 12 above the field it asks for. */
export const hhQuestionClass = "block font-sans text-hh-question font-semibold text-ink";

/**
 * Handheld secondary (± of the stepper): surface, 1px border-strong, radius 8.
 * Hover surface-2 (pointer devices only), press fill. Disabled: fill background and border, ink-3.
 */
export const hhSecondaryClass = cn(
  "inline-flex items-center justify-center shrink-0 m-0 p-0",
  "size-[var(--su-hh-control-lg)] rounded-[var(--su-hh-radius)]",
  "bg-surface text-ink border border-solid border-border-strong su-focus-ring cursor-pointer",
  "[@media(hover:hover)]:enabled:hover:bg-surface-2 enabled:active:bg-fill",
  "disabled:bg-fill disabled:border-fill disabled:text-ink-3 disabled:cursor-not-allowed",
  hhTransition,
);

/** 2px handheld field border: danger when refused, action while it has focus, border-strong idle. */
export function hhFieldBorder({
  invalid,
  disabled,
  active,
}: {
  invalid?: boolean;
  disabled?: boolean;
  /** Draw the action border without focus (the stepper field is always the keypad's target). */
  active?: boolean;
}) {
  if (disabled) return "border-border bg-surface-2 text-ink-3 cursor-not-allowed";
  if (invalid) return "border-danger bg-surface text-ink";
  if (active) return "border-action bg-surface text-ink";
  return "border-border-strong bg-surface text-ink focus-within:border-action";
}

export interface HandheldErrorLineProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Point the field's `aria-describedby` at it. */
  id?: string;
  children: ReactNode;
}

/**
 * Error line under a handheld field: 17/24 500 danger-text + a 20 icon, 8 below the field.
 * Identifiers inside it go in `<code>` or a `su-id` span: mono 0.9em 600 (the caller's markup).
 * `ScanField` and `QuantityStepper` draw it for their `error`; it is exported for a handheld field
 * the library does not draw (a form's `Input` at handheld density), so every refusal under a
 * field reads the same.
 */
export function HandheldErrorLine({ id, className, children, ...rest }: HandheldErrorLineProps) {
  return (
    <p
      id={id}
      {...rest}
      className={cn(
        "flex items-center gap-su2 mt-su2 mb-0 min-h-su6",
        "font-sans text-hh-body font-medium text-danger-text",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold",
        className,
      )}
    >
      <IconCircleX size={20} stroke={HH_STROKE} aria-hidden className="shrink-0" />
      <span className="min-w-0">{children}</span>
    </p>
  );
}

/** Points several refs (a forwarded one and an internal one) at the same node. */
export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T> {
  return (node) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(node);
      else if (ref) (ref as { current: T | null }).current = node;
    }
  };
}

/** Joins aria-describedby ids, dropping empties. */
export function describedBy(...ids: Array<string | undefined | false>) {
  const joined = ids.filter(Boolean).join(" ");
  return joined || undefined;
}
