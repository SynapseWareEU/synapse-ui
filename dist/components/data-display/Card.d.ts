import type { HTMLAttributes, ReactNode } from "react";
export type SlotState = "free" | "receiving" | "onhand" | "allocated" | "picking" | "counted";
export interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
    /** Identifier above the title (mono 13/18 ink-2), e.g. A-01 */
    code?: ReactNode;
    /** 14/20 600. In the panel variant: the 16/24 section title. */
    title?: ReactNode;
    /** End of the header: 13/18 ink-2 on a card, the actions on a panel. */
    extra?: ReactNode;
    /** @deprecated No-op. The slot swatch is gone; put a `<StatusDot>` beside the code instead. */
    state?: SlotState;
    /** @deprecated No-op. A card is always boxed. */
    bordered?: boolean;
    /**
     * Hover paint only: the border steps up to border-strong under a pointer. It adds no click or
     * keyboard behaviour; use `href` for a card that is a link.
     */
    interactive?: boolean;
    /** `panel` renders a `Panel` (header 44 with the title, body padded 16). */
    variant?: "card" | "panel";
    /** Link card: the card renders as `<a>`, with a chevron after the title and a focus outline. */
    href?: string;
    children?: ReactNode;
}
/**
 * Boxed white surface: 1px border, radius 8, padding 16, no shadow. The link card (`href`) is the
 * overview tile: title row, then a figure, facts, a meter and a footer as children.
 */
export declare function Card({ code, title, extra, state: _state, bordered: _bordered, interactive, variant, href, className, children, ...rest }: CardProps): import("react").JSX.Element;
//# sourceMappingURL=Card.d.ts.map