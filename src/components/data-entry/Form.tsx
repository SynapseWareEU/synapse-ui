import * as Label from "@radix-ui/react-label";
import { IconAlertCircle } from "@tabler/icons-react";
import {
  createContext,
  useContext,
  useId,
  type CSSProperties,
  type FormHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "../../utils/cn";
import { Icon, iconDefaults } from "../general/Icon";
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

const FormContext = createContext<FormContextValue>({ layout: "vertical" });
const FormItemContext = createContext<FormItemContextValue | null>(null);

export function useFormContext(): FormContextValue {
  return useContext(FormContext);
}

export function useFormItemContext(): FormItemContextValue | null {
  return useContext(FormItemContext);
}

/**
 * Internal: renders its children outside the enclosing FormItem, so a helper control inside a
 * composite field (a Transfer's select-all box) does not take the item's id, description or
 * invalid state.
 */
export function FormItemIsolate({ children }: { children?: ReactNode }) {
  return <FormItemContext.Provider value={null}>{children}</FormItemContext.Provider>;
}

/**
 * Resolve a field's effective size/disabled from its own props falling back to
 * the enclosing `<Form>`. Every data-entry control does this the same way.
 * The default size is `md` (36px).
 */
export function useFieldState(size?: InputSize, disabled?: boolean) {
  const form = useFormContext();
  return {
    size: size ?? form.size ?? "md",
    disabled: disabled ?? form.disabled,
  } satisfies { size: InputSize; disabled?: boolean };
}

/** Field label: sans 13/18 500 ink-2, sentence case (the `su-label` shortcut). */
export const formLabelClass = "block mb-su1 su-label";

/** Text label sitting next to a checkbox / radio / switch: 14/20 ink. */
export const controlLabelClass = "text-body text-ink select-none";

const labelColumnHeightClass: Record<InputSize, string> = {
  sm: "min-h-[var(--su-control-sm)]",
  md: "min-h-[var(--su-control-md)]",
  lg: "min-h-[var(--su-control-lg)]",
};

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

export function Form({
  layout = "vertical",
  disabled,
  size = "md",
  labelWidth,
  className,
  style,
  children,
  ...rest
}: FormProps) {
  return (
    <FormContext.Provider value={{ layout, disabled, size }}>
      <form
        className={cn(
          "flex flex-col",
          layout === "horizontal" ? "su-panel self-start" : "gap-su4",
          className,
        )}
        style={
          labelWidth != null
            ? ({
                ...style,
                "--su-form-label-width":
                  typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth,
              } as CSSProperties)
            : style
        }
        {...rest}
      >
        {children}
      </form>
    </FormContext.Provider>
  );
}

export interface FormLabelProps extends Label.LabelProps {
  /**
   * Mark the field optional: `true` adds " (optional)" in regular weight inside the label;
   * a node replaces those words (for example `"(opțional)"`). v2 marks optional fields and
   * draws no required asterisk. Falls back to the enclosing FormItem's `optional`.
   */
  optional?: boolean | ReactNode;
}

export function FormLabel({ className, children, optional: optionalProp, ...rest }: FormLabelProps) {
  const item = useFormItemContext();
  const optional = optionalProp ?? item?.optional;
  return (
    <Label.Root
      htmlFor={item?.id}
      id={item?.labelId}
      className={cn(formLabelClass, className)}
      {...rest}
    >
      {children}
      {optional != null && optional !== false && (
        <span className="font-normal">
          {" "}
          {optional === true ? "(optional)" : optional}
        </span>
      )}
    </Label.Root>
  );
}

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

export function FormItem({
  label,
  required,
  optional,
  help,
  error,
  className,
  children,
}: FormItemProps) {
  const { layout, size = "md" } = useFormContext();
  const id = useId();
  const horizontal = layout === "horizontal";
  const descriptionId = `${id}-description`;

  // label → 4 → control → 4 → help or error. Handheld (§2.4): 17 is the floor, so help turns
  // 17/24 and the error line 17/24 500 with an 18 icon.
  const message = error ? (
    <div
      id={descriptionId}
      className="flex items-start gap-[6px] mt-su1 text-small text-danger-text [[data-density=handheld]_&]:text-hh-body [[data-density=handheld]_&]:font-medium"
      role="alert"
    >
      <Icon className="size-[14px] mt-[2px] [[data-density=handheld]_&]:size-[18px] [[data-density=handheld]_&]:mt-[3px]">
        <IconAlertCircle {...iconDefaults} />
      </Icon>
      <span className="min-w-0">{error}</span>
    </div>
  ) : help ? (
    <div
      id={descriptionId}
      className="mt-su1 text-small text-ink-2 [[data-density=handheld]_&]:text-hh-body"
    >
      {help}
    </div>
  ) : null;

  return (
    <FormItemContext.Provider
      value={{
        id,
        required,
        optional,
        error,
        descriptionId: error || help ? descriptionId : undefined,
        labelId: label != null ? `${id}-label` : undefined,
      }}
    >
      <div
        className={cn(
          // the wrapper gap is the single source of the label/field gap inside an
          // item; the label's own bottom margin (for standalone use) is zeroed.
          "flex [&>label]:mb-0",
          horizontal
            ? "flex-row items-start gap-su4 px-su6 py-su3 first:pt-su5 last:pb-su5"
            : "flex-col gap-su1",
          className,
        )}
      >
        {horizontal ? (
          // always rendered, even unlabelled, so rows stay aligned in a mixed form
          <div
            className={cn(
              "flex items-center flex-[0_0_var(--su-form-label-width,120px)] [&>label]:mb-0",
              labelColumnHeightClass[size],
            )}
          >
            {label != null && <FormLabel>{label}</FormLabel>}
          </div>
        ) : (
          label != null && <FormLabel>{label}</FormLabel>
        )}
        <div className={horizontal ? "flex-1 min-w-0" : undefined}>
          {children}
          {message}
        </div>
      </div>
    </FormItemContext.Provider>
  );
}

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
export function FormSection({ title, description, className, children }: FormSectionProps) {
  const form = useFormContext();
  const id = useId();
  return (
    <div
      role="group"
      aria-labelledby={title != null ? `${id}-title` : undefined}
      aria-describedby={description != null ? `${id}-description` : undefined}
      className={cn(
        "grid grid-cols-1 gap-y-su4 px-su6 py-su5 border-t border-solid border-border first:border-t-0",
        "md:grid-cols-[240px_minmax(0,1fr)] md:gap-x-[40px]",
        className,
      )}
    >
      <div className="flex flex-col gap-su1 min-w-0">
        {title != null && (
          <div
            id={`${id}-title`}
            // Handheld: never smaller than the 18 field labels beside it (flow-name role, 20/26).
            className="text-section font-semibold text-ink [[data-density=handheld]_&]:text-hh-flow"
          >
            {title}
          </div>
        )}
        {description != null && (
          <div
            id={`${id}-description`}
            className="text-small text-ink-2 [[data-density=handheld]_&]:text-hh-body"
          >
            {description}
          </div>
        )}
      </div>
      <FormContext.Provider value={{ ...form, layout: "vertical" }}>
        <div className="grid grid-cols-1 items-start gap-x-su6 gap-y-su4 sm:grid-cols-[repeat(2,minmax(0,1fr))]">
          {children}
        </div>
      </FormContext.Provider>
    </div>
  );
}

export interface FormActionsProps {
  className?: string;
  /** Buttons: primary first, then secondary. */
  children?: ReactNode;
}

/**
 * The form's button row. In a `layout="horizontal"` form: 64 tall, a hairline above, buttons on
 * the field track, left-packed, 8 apart. In a vertical form: a plain row, 8 apart.
 */
export function FormActions({ className, children }: FormActionsProps) {
  const { layout } = useFormContext();
  if (layout !== "horizontal") {
    return <div className={cn("flex flex-wrap items-center gap-su2", className)}>{children}</div>;
  }
  return (
    <div
      className={cn(
        "grid grid-cols-1 items-center min-h-[64px] px-su6 py-su3 border-t border-solid border-border first:border-t-0",
        "md:grid-cols-[240px_minmax(0,1fr)] md:gap-x-[40px]",
        className,
      )}
    >
      <div aria-hidden="true" className="hidden md:block" />
      <div className="flex flex-wrap items-center gap-su2">{children}</div>
    </div>
  );
}

Form.Section = FormSection;
Form.Actions = FormActions;
