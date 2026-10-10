import type {
  HTMLAttributes,
  Key,
  MouseEventHandler,
  ReactNode,
} from "react";
import { IconArrowLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  /** Stable key; falls back to the array index. */
  key?: Key;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

/**
 * `"trail"` (default): every ancestor, chevron-separated, ending on the current page.
 * `"back"`: only a back link to the parent (the item before the last, or the only item),
 * drawn as "← Parent" 4 above a page title.
 */
export type BreadcrumbVariant = "trail" | "back";

export interface BreadcrumbProps
  extends Omit<HTMLAttributes<HTMLElement>, "children"> {
  items: BreadcrumbItem[];
  /** Between items. Default: a 14px chevron in ink-3. */
  separator?: ReactNode;
  variant?: BreadcrumbVariant;
}

const truncateClass =
  "block max-w-[24ch] overflow-hidden text-ellipsis whitespace-nowrap";

/**
 * Link presentation lives on the container as descendant rules, so a router `<Link>` passed
 * as `label` is styled exactly like the <a> we render — no `itemRender`/`asChild` escape hatch
 * needed. Links are 13/18 500 ink-2; hover is ink plus a 1px underline at a 3px offset.
 * Touch screens get a 44px tap band (`py/-my`) without changing the row height.
 */
const linkClass = cn(
  "[&_a]:text-ink-2 [&_a]:font-medium [&_a]:no-underline [&_a]:rounded-su-tag",
  "[&_a]:transition-colors [&_a]:duration-[var(--su-duration-fast)] [&_a]:ease-[var(--su-ease-out)]",
  "[@media(hover:hover)]:[&_a:hover]:text-ink [@media(hover:hover)]:[&_a:hover]:underline",
  "[&_a:hover]:decoration-1 [&_a:hover]:underline-offset-[3px]",
  "[&_a:focus-visible]:outline-2 [&_a:focus-visible]:outline-solid [&_a:focus-visible]:outline-focus [&_a:focus-visible]:outline-offset-[var(--su-focus-ring-offset)]",
  "[@media(hover:none)]:[&_a]:py-[12px] [@media(hover:none)]:[&_a]:-my-[12px]",
);

/** Trail links truncate; the current page keeps ink even when it is a real link. */
const trailLinkClass = cn(
  linkClass,
  "[&_a]:block [&_a]:max-w-[24ch] [&_a]:overflow-hidden [&_a]:text-ellipsis [&_a]:whitespace-nowrap",
  "[&_a[aria-current]]:text-ink",
);

function ChevronSeparator() {
  return <IconChevronRight size={14} stroke={1.75} />;
}

export function Breadcrumb({
  items,
  separator,
  variant = "trail",
  className,
  ...rest
}: BreadcrumbProps) {
  if (items.length === 0) return null;

  if (variant === "back") {
    const target = items.length > 1 ? items[items.length - 2] : items[0];
    if (!target) return null;
    const title = typeof target.label === "string" ? target.label : undefined;
    const arrow = (
      <span aria-hidden="true" className="flex shrink-0 rtl:-scale-x-100">
        <IconArrowLeft size={16} stroke={1.75} />
      </span>
    );
    return (
      <nav
        className={cn("flex font-sans text-small", linkClass, className)}
        aria-label="Breadcrumb"
        {...rest}
      >
        {target.href ? (
          <a
            href={target.href}
            onClick={target.onClick}
            title={title}
            className="inline-flex items-center gap-su1 min-h-[20px] max-w-full"
          >
            {arrow}
            <span className="min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
              {target.label}
            </span>
          </a>
        ) : (
          <span className="inline-flex items-center gap-su1 min-h-[20px] max-w-full text-ink-2 font-medium">
            {arrow}
            {target.label}
          </span>
        )}
      </nav>
    );
  }

  return (
    <nav
      className={cn("font-sans text-small", className)}
      aria-label="Breadcrumb"
      {...rest}
    >
      <ol role="list" className="flex flex-wrap items-center gap-su1 m-0 p-0 list-none">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const title = typeof item.label === "string" ? item.label : undefined;
          return (
            <li
              key={item.key ?? index}
              className={cn("inline-flex items-center gap-su1 min-w-0", trailLinkClass)}
            >
              {index > 0 && (
                <span
                  className="flex shrink-0 select-none text-ink-3 rtl:-scale-x-100"
                  aria-hidden="true"
                >
                  {separator ?? <ChevronSeparator />}
                </span>
              )}
              {item.href ? (
                <a
                  href={item.href}
                  onClick={item.onClick}
                  title={title}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  className={cn(
                    truncateClass,
                    "font-medium",
                    isLast ? "text-ink" : "text-ink-2",
                  )}
                  title={title}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
