import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface EmptyProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** Icon above the text (24, ink-3). Defaults to an inbox glyph; `false` hides it. No illustrations. */
  image?: ReactNode;
  /** Title, 15/22 600 ("No open counts"). */
  title?: ReactNode;
  /** Text, 14/20 ink-2, at most 420 wide. Defaults to "No data" when there is no title. */
  description?: ReactNode;
  /** Inside lists and menus: one 13/18 ink-2 line, padding 8, no icon. */
  compact?: boolean;
  /** At most one secondary button. */
  children?: ReactNode;
}

function InboxIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 6a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
      <path d="M4 13h3l3 3h4l3 -3h3" />
    </svg>
  );
}

export function Empty({
  image,
  title,
  description,
  compact = false,
  className,
  children,
  ...rest
}: EmptyProps) {
  const text = description !== undefined ? description : title == null ? "No data" : null;

  if (compact) {
    return (
      <div className={cn("p-su2 font-sans text-small text-ink-2", className)} {...rest}>
        {title != null ? <p className="m-0 font-medium text-ink">{title}</p> : null}
        {text != null ? <p className="m-0">{text}</p> : null}
        {children ? <div className="mt-su2">{children}</div> : null}
      </div>
    );
  }

  const icon = image === false ? null : (image ?? <InboxIcon />);
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center p-su6 font-sans",
        className,
      )}
      {...rest}
    >
      {/* Decorative: the title and text carry the meaning. */}
      {icon != null ? (
        <div className="flex text-ink-3" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      {title != null ? (
        <h3
          className={cn(
            "m-0 text-empty-title font-semibold text-ink",
            icon != null ? "mt-su3" : undefined,
          )}
        >
          {title}
        </h3>
      ) : null}
      {text != null ? (
        <p
          className={cn(
            "m-0 max-w-[420px] text-body text-ink-2",
            title != null ? "mt-su1" : icon != null ? "mt-su3" : undefined,
          )}
        >
          {text}
        </p>
      ) : null}
      {children ? <div className="mt-su4">{children}</div> : null}
    </div>
  );
}
