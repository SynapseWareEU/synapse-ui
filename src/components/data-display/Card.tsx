import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";
import { Panel } from "./Panel";

export type SlotState =
  | "free"
  | "receiving"
  | "onhand"
  | "allocated"
  | "picking"
  | "counted";

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

function ChevronRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0 text-ink-3 rtl:-scale-x-100"
    >
      <path d="M9 6l6 6l-6 6" />
    </svg>
  );
}

/**
 * Boxed white surface: 1px border, radius 8, padding 16, no shadow. The link card (`href`) is the
 * overview tile: title row, then a figure, facts, a meter and a footer as children.
 */
export function Card({
  code,
  title,
  extra,
  state: _state,
  bordered: _bordered,
  interactive = false,
  variant = "card",
  href,
  className,
  children,
  ...rest
}: CardProps) {
  if (variant === "panel") {
    return (
      <Panel
        title={
          code != null || title != null ? (
            <span className="inline-flex items-baseline gap-su2 min-w-0">
              {code != null ? (
                <span className="font-mono text-small font-normal text-ink-2 shrink-0">{code}</span>
              ) : null}
              {title}
            </span>
          ) : undefined
        }
        extra={extra}
        className={className}
        {...rest}
      >
        {children}
      </Panel>
    );
  }

  const hasHeader = code != null || title != null || extra != null;
  const linked = href != null;
  const classes = cn(
    "block bg-surface text-ink font-sans border border-solid border-border rounded-su-surface p-su4",
    (linked || interactive) &&
      "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:border-border-strong",
    linked && "no-underline su-focus-ring",
    className,
  );

  const body = (
    <>
      {hasHeader ? (
        <div className="flex items-start justify-between gap-su3">
          <div className="flex flex-col min-w-0">
            {code != null ? (
              <span className="font-mono text-small text-ink-2">{code}</span>
            ) : null}
            {title != null || linked ? (
              <div className="flex items-center gap-su1 min-w-0 min-h-[20px]">
                {title != null ? (
                  <span className="min-w-0 text-body font-semibold text-ink text-balance">
                    {title}
                  </span>
                ) : null}
                {linked ? <ChevronRight /> : null}
              </div>
            ) : null}
          </div>
          {extra != null ? (
            <div className="shrink-0 text-small text-ink-2">{extra}</div>
          ) : null}
        </div>
      ) : null}
      {children != null ? (
        <div className={hasHeader ? "mt-su3" : undefined}>{children}</div>
      ) : null}
    </>
  );

  if (linked) {
    return (
      <a
        href={href}
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {body}
      </a>
    );
  }

  return (
    <div className={classes} {...rest}>
      {body}
    </div>
  );
}
