import { forwardRef } from "react";
import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export type TypographyVariant =
  | "largeTitle"
  | "title1"
  | "title2"
  | "title3"
  | "headline"
  | "lede"
  | "body"
  | "callout"
  | "subhead"
  | "footnote"
  | "caption1"
  | "caption2"
  | "label"
  | "code"
  /** Row identity (SKU, SO number, bin): mono 14/20 500 ink. */
  | "id"
  /** Supporting identifier: mono 13/18 400 ink-2. */
  | "idSecondary";

/**
 * Ink roles carry text; status tones encode real product state (never decoration).
 * - `primary` ink / `secondary` ink-2 — body and supporting copy.
 * - `tertiary` ink-3 — only on white, and only for placeholders, disabled text and the empty "—".
 * - `quaternary` — deprecated for text (border-strong, decorative only).
 * - `danger` / `warning` / `success` / `info` — the `*-text` tokens.
 * There is deliberately no `accent` tone: links are `<a>` (or `Button variant="text"`).
 */
export type TypographyTone =
  | "primary"
  | "secondary"
  | "tertiary"
  | "quaternary"
  | "danger"
  | "success"
  | "warning"
  | "info";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /**
   * Text colour. Defaults to `primary`, except `lede`, `label` and `idSecondary` (ink-2) and
   * `code` (inherits the surrounding colour).
   */
  tone?: TypographyTone;
  /**
   * Visual role and document element are independent — use `as` to keep the
   * heading outline correct (`<Typography variant="title1" as="h3">`).
   */
  as?: ElementType;
  /** Bumps weight to 600; on inline variants it also renders a real `<strong>`. */
  strong?: boolean;
  /** Clamp to N lines (1 = single-line ellipsis). The full string stays in `title` for AT. */
  lines?: number;
  /** Cap the measure: `true` = 62ch running text, `"lede"` = 44ch. */
  measure?: boolean | "lede";
  /**
   * Variant utilities and `className` have equal specificity and `cn()` does not
   * resolve conflicts — use the `!` prefix (`!text-[13px]`) to override a variant.
   */
  className?: string;
  children?: ReactNode;
}

/* Size + line-height (+ tracking where the scale has it) per variant (v2 §2.5). The weight is
   picked separately so `strong` never layers a second font-weight utility on top. */
const variantClass: Record<TypographyVariant, string> = {
  largeTitle: "font-sans text-display text-balance", // 32/40, −0.01em
  // 24/32, and the phone title below `sm`: 22/28. −0.01em at both sizes (−0.24px, −0.22px).
  title1: "font-sans text-title-phone tracking-[var(--su-tracking-tight)] sm:text-title text-balance",
  title2: "font-sans text-title-phone text-balance", // 22/28
  title3: "font-sans text-section text-balance", // 16/24
  headline: "font-sans text-empty-title", // 15/22
  lede: "font-sans text-body", // 14/20, page description
  body: "font-sans text-body",
  callout: "font-sans text-body",
  subhead: "font-sans text-body",
  footnote: "font-sans text-small", // 13/18
  caption1: "font-sans text-small",
  caption2: "font-sans text-micro", // 12/16
  label: "font-sans text-label-type", // 13/18, sentence case
  // Identifier inside prose: 0.9em, colour, weight and leading from the surroundings.
  code: "font-mono text-[0.9em]",
  id: "font-mono text-body", // 14/20
  idSecondary: "font-mono text-small", // 13/18
};

const weightClass: Record<TypographyVariant, string | undefined> = {
  largeTitle: "font-semibold",
  title1: "font-semibold",
  title2: "font-semibold",
  title3: "font-semibold",
  headline: "font-semibold",
  lede: "font-normal",
  body: "font-normal",
  callout: "font-normal",
  subhead: "font-semibold",
  footnote: "font-normal",
  caption1: "font-normal",
  caption2: "font-normal",
  label: "font-medium",
  code: undefined, // inherits
  id: "font-medium",
  idSecondary: "font-normal",
};

const toneClass: Record<TypographyTone, string> = {
  primary: "text-ink",
  secondary: "text-ink-2",
  tertiary: "text-ink-3",
  // Deprecated for text; lifted to ink-2 for prefers-contrast users.
  quaternary: "text-border-strong contrast-more:text-ink-2",
  danger: "text-danger-text",
  success: "text-success-text",
  warning: "text-warning-text",
  info: "text-info-text",
};

/** Tone when none is passed: ink-2 for descriptions, labels and supporting ids; code inherits. */
const defaultTone: Partial<Record<TypographyVariant, TypographyTone | null>> = {
  lede: "secondary",
  label: "secondary",
  idSecondary: "secondary",
  code: null,
};

const defaultTag: Record<TypographyVariant, ElementType> = {
  largeTitle: "h1",
  title1: "h1",
  title2: "h1",
  title3: "h2",
  headline: "h3",
  lede: "p",
  body: "p",
  callout: "p",
  subhead: "p",
  footnote: "p",
  caption1: "span",
  caption2: "span",
  label: "span",
  code: "code",
  id: "span",
  idSecondary: "span",
};

export const Typography = forwardRef<HTMLElement, TypographyProps>(
  function Typography(
    {
      variant = "body",
      tone,
      as,
      strong = false,
      lines,
      measure,
      className,
      children,
      style,
      ...rest
    },
    ref,
  ) {
    const tag = as ?? defaultTag[variant] ?? "p";
    const Comp = strong && tag === "span" ? "strong" : tag;
    const clamped = lines !== undefined && lines > 1;
    const resolvedTone =
      tone ?? (variant in defaultTone ? defaultTone[variant] : "primary");
    return (
      <Comp
        ref={ref}
        className={cn(
          "m-0 [overflow-wrap:anywhere]",
          variantClass[variant],
          strong ? "font-semibold" : weightClass[variant],
          resolvedTone && toneClass[resolvedTone],
          measure && (measure === "lede" ? "max-w-[44ch]" : "max-w-[62ch]"),
          lines === 1 && "truncate",
          clamped &&
            "overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:var(--su-lines)]",
          className,
        )}
        style={
          clamped
            ? ({ ...style, "--su-lines": lines } as CSSProperties)
            : style
        }
        {...rest}
        title={
          rest.title ??
          (lines !== undefined && typeof children === "string"
            ? children
            : undefined)
        }
      >
        {children}
      </Comp>
    );
  },
);

export const Title = ({
  level = 1,
  as,
  ...rest
}: Omit<TypographyProps, "variant"> & { level?: 1 | 2 | 3 | 4 | 5 }) => {
  const variant =
    level === 1
      ? "title1"
      : level === 2
        ? "title2"
        : level === 3
          ? "title3"
          : "headline";
  return <Typography variant={variant} as={as ?? `h${level}`} {...rest} />;
};

/** Inline run of body text. Block prose is `Paragraph`. */
export const Text = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="body" as="span" {...props} />
);

export const Paragraph = (props: Omit<TypographyProps, "variant">) => (
  <Typography variant="body" as="p" {...props} />
);
