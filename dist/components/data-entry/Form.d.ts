import * as Label from "@radix-ui/react-label";
import { type FormHTMLAttributes, type ReactNode } from "react";
import type { InputSize } from "./types";
export type FormLayout = "vertical" | "horizontal";
interface FormContextValue {
    layout: FormLayout;
    disabled?: boolean;
    size?: InputSize;
}
interface FormItemContextValue {
    id: string;
    required?: boolean;
    /** Marks the field optional in its label: `true` for the default words, or your own. */
    optional?: boolean | ReactNode;
    error?: ReactNode;
    descriptionId?: string;
    /**
     * Id of the rendered `<FormLabel>`, when the item has one. Controls that are
     * not labelable elements (a `div role="button"` dropzone, a composite widget)
     * point `aria-labelledby` at this instead of synthesizing their own name.
     */
    labelId?: string;
}
export declare function useFormContext(): FormContextValue;
export declare function useFormItemContext(): FormItemContextValue | null;
/**
 * Internal: renders its children outside the enclosing FormItem, so a helper control inside a
 * composite field (a Transfer's select-all box) does not take the item's id, description or
 * invalid state.
 */
export declare function FormItemIsolate({ children }: {
    children?: ReactNode;
}): import("react").JSX.Element;
/**
 * Resolve a field's effective size/disabled from its own props falling back to
 * the enclosing `<Form>`. Every data-entry control does this the same way.
 * The default size is `md` (36px).
 */
export declare function useFieldState(size?: InputSize, disabled?: boolean): {
    size: InputSize;
    disabled: boolean | undefined;
};
/** Field label: sans 13/18 500 ink-2, sentence case (the `su-label` shortcut). */
export declare const formLabelClass = "block mb-su1 su-label";
/** Text label sitting next to a checkbox / radio / switch: 14/20 ink. */
export declare const controlLabelClass = "text-body text-ink select-none";
export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    /**
     * `vertical` (default): the drawer, modal and login shape, labels above fields, items 16 apart.
     * `horizontal`: the page-form shape. The form is one panel; group its fields with
     * `<FormSection>` (`Form.Section`) and end it with `<FormActions>` (`Form.Actions`).
     * Items placed straight in a horizontal form keep a label column beside the field.
     */
    layout?: FormLayout;
    disabled?: boolean;
    /** Default size of every field inside. Default `md` (36px). */
    size?: InputSize;
    /** Width of the label column for items placed straight in a `layout="horizontal"` form. Default `120`. */
    labelWidth?: number | string;
}
export declare function Form({ layout, disabled, size, labelWidth, className, style, children, ...rest }: FormProps): import("react").JSX.Element;
export declare namespace Form {
    var Section: typeof FormSection;
    var Actions: typeof FormActions;
}
export interface FormLabelProps extends Label.LabelProps {
    /**
     * Mark the field optional: `true` adds " (optional)" in regular weight inside the label;
     * a node replaces those words (for example `"(opțional)"`). v2 marks optional fields and
     * draws no required asterisk. Falls back to the enclosing FormItem's `optional`.
     */
    optional?: boolean | ReactNode;
}
export declare function FormLabel({ className, children, optional: optionalProp, ...rest }: FormLabelProps): import("react").JSX.Element;
export interface FormItemProps {
    label?: ReactNode;
    /** Sets `required` on the control. v2 draws no asterisk; mark the optional fields instead. */
    required?: boolean;
    /** Adds " (optional)" to the label, or your own words when given a node. */
    optional?: boolean | ReactNode;
    help?: ReactNode;
    /** Replaces the help line: alert icon + 13/18 danger text, wired to `aria-invalid`. */
    error?: ReactNode;
    className?: string;
    children?: ReactNode;
}
export declare function FormItem({ label, required, optional, help, error, className, children, }: FormItemProps): import("react").JSX.Element;
export interface FormSectionProps {
    /** Section title, 16/24 600. */
    title?: ReactNode;
    /** Help under the title, 13/18 ink-2. */
    description?: ReactNode;
    className?: string;
    /** FormItems. They stack label-above-field in a two-column grid; add `col-span-2` to widen one. */
    children?: ReactNode;
}
/**
 * One section of a page form (`layout="horizontal"`): title and help on a 240px track, fields in
 * a two-column grid beside it, 20/24 padding, a hairline between sections.
 */
export declare function FormSection({ title, description, className, children }: FormSectionProps): import("react").JSX.Element;
export interface FormActionsProps {
    className?: string;
    /** Buttons: primary first, then secondary. */
    children?: ReactNode;
}
/**
 * The form's button row. In a `layout="horizontal"` form: 64 tall, a hairline above, buttons on
 * the field track, left-packed, 8 apart. In a vertical form: a plain row, 8 apart.
 */
export declare function FormActions({ className, children }: FormActionsProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=Form.d.ts.map