import type { HTMLAttributes, ReactNode, Ref, RefCallback } from "react";
/**
 * Handheld set (spec §4.7). Every part reads the `--su-hh-*` tokens directly, so it keeps its
 * 390-wide terminal size wherever it is mounted; wrap the screen in
 * `<ConfigProvider density="handheld">` so the generic controls around it (Button, Input…) grow too.
 */
/** Icon stroke for every handheld glyph: Tabler-style 1.75, round caps and joins (the Tabler default). */
export declare const HH_STROKE = 1.75;
export declare const hhTransition = "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none";
/** The one question on a handheld screen: 28/34 600, −0.01em, ink. 12 above the field it asks for. */
export declare const hhQuestionClass = "block font-sans text-hh-question font-semibold text-ink";
/**
 * Handheld secondary (± of the stepper): surface, 1px border-strong, radius 8.
 * Hover surface-2 (pointer devices only), press fill. Disabled: fill background and border, ink-3.
 */
export declare const hhSecondaryClass: string;
/** 2px handheld field border: danger when refused, action while it has focus, border-strong idle. */
export declare function hhFieldBorder({ invalid, disabled, active, }: {
    invalid?: boolean;
    disabled?: boolean;
    /** Draw the action border without focus (the stepper field is always the keypad's target). */
    active?: boolean;
}): "border-border bg-surface-2 text-ink-3 cursor-not-allowed" | "border-danger bg-surface text-ink" | "border-action bg-surface text-ink" | "border-border-strong bg-surface text-ink focus-within:border-action";
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
export declare function HandheldErrorLine({ id, className, children, ...rest }: HandheldErrorLineProps): import("react").JSX.Element;
/** Points several refs (a forwarded one and an internal one) at the same node. */
export declare function mergeRefs<T>(...refs: Array<Ref<T> | undefined>): RefCallback<T>;
/** Joins aria-describedby ids, dropping empties. */
export declare function describedBy(...ids: Array<string | undefined | false>): string | undefined;
//# sourceMappingURL=shared.d.ts.map