import type { HTMLAttributes, KeyboardEvent, ReactNode } from "react";
import { cn } from "../../utils/cn";

export interface ListItemProps extends Omit<HTMLAttributes<HTMLLIElement>, "title"> {
  /** 14/20 ink, one line with ellipsis. Identifiers inside go in mono 0.9em (500 for the subject). */
  title?: ReactNode;
  /** 13/18 ink-2, one line with ellipsis. A row with a description is 48 high; one-line rows are 40. */
  description?: ReactNode;
  /** Trailing content, usually one link (14/20 500). */
  extra?: ReactNode;
  /** Leading content: an 8px `<StatusDot>` in exception lists, or an `<Avatar>`. */
  avatar?: ReactNode;
  /**
   * Clickable row: pointer cursor, surface-hover under a pointer and an inset focus ring (a Panel
   * frame clips anything outside the row).
   * With `onClick` it also becomes a keyboard target (role="button", Enter/Space).
   */
  interactive?: boolean;
  children?: ReactNode;
}

export function ListItem({
  title,
  description,
  extra,
  avatar,
  interactive = false,
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: ListItemProps) {
  // ponytail: role="button" trades this row's `listitem` role for a keyboard target.
  // Need both? Put a real <button>/<a> in `title` and leave `interactive` as paint only.
  const activatable = interactive && onClick != null;
  const twoLine = description != null;

  return (
    <li
      className={cn(
        // Row: padding 0 16, gap 12, content centred. 48 with a second line, 40 without.
        "flex items-center gap-su3 px-su4 py-su1 font-sans text-body text-ink",
        twoLine ? "min-h-[var(--su-row-exception)]" : "min-h-[var(--su-row)]",
        interactive &&
          "cursor-pointer transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:bg-surface-hover outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[-2px]",
        className,
      )}
      onClick={onClick}
      onKeyDown={
        activatable
          ? (event: KeyboardEvent<HTMLLIElement>) => {
              onKeyDown?.(event);
              if (event.defaultPrevented) return;
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                event.currentTarget.click();
              }
            }
          : onKeyDown
      }
      {...(activatable ? { role: "button", tabIndex: 0 } : null)}
      {...rest}
    >
      {avatar ? <div className="flex shrink-0 items-center">{avatar}</div> : null}
      <div className="flex-1 min-w-0">
        {title ? <div className="truncate text-body text-ink">{title}</div> : null}
        {description ? (
          <div className="truncate text-small text-ink-2">{description}</div>
        ) : null}
        {children}
      </div>
      {extra ? (
        <div className="shrink-0 whitespace-nowrap text-body font-medium text-ink-2">{extra}</div>
      ) : null}
    </li>
  );
}

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** Framed as a Panel: surface, 1px border, radius 8. */
  bordered?: boolean;
  /** 1px border between rows (none after the last). */
  split?: boolean;
  children?: ReactNode;
}

/**
 * Static list primitive. For the zero-item case render `<Empty description="No results" />`
 * instead of an empty `<List>`; for thousands of rows use `Listy` (virtualized).
 */
export function List({ bordered = false, split = true, className, children, ...rest }: ListProps) {
  return (
    <ul
      // role="list" is required: `list-none` strips the implicit list role in Safari/VoiceOver.
      role="list"
      className={cn(
        "m-0 p-0 list-none",
        bordered && "su-panel",
        split && "[&>li+li]:border-t [&>li+li]:border-solid [&>li+li]:border-border",
        className,
      )}
      {...rest}
    >
      {children}
    </ul>
  );
}

List.Item = ListItem;
