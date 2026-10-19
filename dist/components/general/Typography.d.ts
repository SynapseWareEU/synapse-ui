import type { ElementType, HTMLAttributes, ReactNode } from "react";
export type TypographyVariant = "largeTitle" | "title1" | "title2" | "title3" | "headline" | "lede" | "body" | "callout" | "subhead" | "footnote" | "caption1" | "caption2" | "label" | "code"
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
export type TypographyTone = "primary" | "secondary" | "tertiary" | "quaternary" | "danger" | "success" | "warning" | "info";
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
export declare const Typography: import("react").ForwardRefExoticComponent<TypographyProps & import("react").RefAttributes<HTMLElement>>;
export declare const Title: ({ level, as, ...rest }: Omit<TypographyProps, "variant"> & {
    level?: 1 | 2 | 3 | 4 | 5;
}) => import("react").JSX.Element;
/** Inline run of body text. Block prose is `Paragraph`. */
export declare const Text: (props: Omit<TypographyProps, "variant">) => import("react").JSX.Element;
export declare const Paragraph: (props: Omit<TypographyProps, "variant">) => import("react").JSX.Element;
//# sourceMappingURL=Typography.d.ts.map