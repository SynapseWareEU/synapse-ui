import type { HTMLAttributes, MouseEventHandler, ReactNode } from "react";
import { IconChevronLeft } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { HH_STROKE, hhTransition } from "./shared";

export interface HandheldTopBarProps extends HTMLAttributes<HTMLElement> {
  /** Flow name, 20/26 600 ("Recepție"). Omit it to render the 56 bar alone. */
  flow?: ReactNode;
  /**
   * Element the flow name is rendered as. Default `span`. Pass `h1` on a flow screen, where the
   * bar holds the page's only title, so the page keeps a heading.
   */
  flowAs?: "span" | "h1" | "h2" | "h3";
  /** Current step, 1-based. */
  step?: number;
  /** Number of steps. The counter and the segments show only when this is above 0 (not on the menu screen). */
  total?: number;
  /** Counter text. Default: `Step {step} of {total}` (Romanian screens pass "Pasul N din M"). */
  stepLabel?: (step: number, total: number) => ReactNode;
  /** Shows the back button (chevron + `backLabel`). */
  onBack?: MouseEventHandler<HTMLElement>;
  /** Renders the back control as a link instead of a button. */
  backHref?: string;
  /** Visible back text, 17/24 ink. Default "Menu". */
  backLabel?: ReactNode;
  /** Accessible name when the visible text is not enough ("Back to menu"). */
  backAriaLabel?: string;
  /**
   * Disables the back button (a write is in flight): it stays in place, in ink-3. With `backHref`
   * the control is drawn as a disabled button, since a link cannot be disabled.
   */
  backDisabled?: boolean;
  /** Shown instead of the back control (the menu screen): 17/24 600, e.g. "Terminal". */
  brand?: ReactNode;
  /** 22px mark before `brand`. */
  brandIcon?: ReactNode;
  /** Site code, mono 15/20 500 ink-2 ("RO_BUC_01"). */
  site?: ReactNode;
  /** Operator, 13/18 ink-2 ("Ioana P."). */
  user?: ReactNode;
  /** Makes the site/user block a 48 button (session menu). */
  onSessionClick?: MouseEventHandler<HTMLButtonElement>;
  /** Accessible name of the session button ("Session: RO_BUC_01, Ioana P."). Used with `onSessionClick`. */
  sessionAriaLabel?: string;
  /** Disables the session button (a write is in flight): it stays in place, in ink-3. */
  sessionDisabled?: boolean;
}

// Ghost 48: transparent, hover fill + ink (pointer devices only), press border. Layout is per use,
// so the back button and the session column never carry two conflicting alignments.
const ghostBaseClass = cn(
  "m-0 border-0 rounded-[var(--su-hh-radius)] bg-transparent",
  "text-ink no-underline su-focus-ring cursor-pointer",
  hhTransition,
);
const ghostLinkClass = cn(ghostBaseClass, "[@media(hover:hover)]:hover:bg-fill active:bg-border");
// `enabled:` so a disabled button never lights up; each property keeps one class per state.
const ghostButtonClass = cn(
  ghostBaseClass,
  "[@media(hover:hover)]:hover:enabled:bg-fill active:enabled:bg-border",
  "disabled:cursor-not-allowed disabled:text-ink-3",
);

const defaultStepLabel = (step: number, total: number) => `Step ${step} of ${total}`;

/**
 * Handheld top bar (`V2HHTop`, 390 × 112): a 56 bar (back or brand, then the session block) over
 * a 55 title row with the flow name, "Step N of M" and the step segments.
 * The segments are decorative (`aria-hidden`); the counter text carries the step for assistive tech.
 */
export function HandheldTopBar({
  flow,
  flowAs: FlowTag = "span",
  step = 0,
  total = 0,
  stepLabel = defaultStepLabel,
  onBack,
  backHref,
  backLabel = "Menu",
  backAriaLabel,
  backDisabled = false,
  brand,
  brandIcon,
  site,
  user,
  onSessionClick,
  sessionAriaLabel,
  sessionDisabled = false,
  className,
  ...rest
}: HandheldTopBarProps) {
  const hasSteps = total > 0;
  const current = Math.min(Math.max(Math.trunc(step), 0), total);

  const backContent = (
    <>
      <IconChevronLeft size={22} stroke={HH_STROKE} aria-hidden className="shrink-0" />
      <span className="text-hh-body">{backLabel}</span>
    </>
  );
  // `shrink-0`: the lead keeps its width; a long site or operator is what gives way.
  const backClass = "flex items-center shrink-0 gap-[6px] h-su10 pl-su2 pr-su3 font-sans";

  let lead: ReactNode = null;
  if (backHref && !backDisabled) {
    lead = (
      <a
        href={backHref}
        onClick={onBack}
        aria-label={backAriaLabel}
        className={cn(ghostLinkClass, backClass)}
      >
        {backContent}
      </a>
    );
  } else if (onBack || backHref) {
    lead = (
      <button
        type="button"
        onClick={onBack}
        disabled={backDisabled}
        aria-label={backAriaLabel}
        className={cn(ghostButtonClass, backClass)}
      >
        {backContent}
      </button>
    );
  } else if (brand || brandIcon) {
    lead = (
      <span className="flex items-center shrink-0 gap-su2 pl-su3 text-ink">
        {brandIcon ? (
          <span aria-hidden className="inline-flex shrink-0 size-[22px] [&>svg]:size-full">
            {brandIcon}
          </span>
        ) : null}
        {brand ? <span className="text-hh-body font-semibold">{brand}</span> : null}
      </span>
    );
  }

  const hasSession = site != null || user != null;
  // One colour class per line: ink-3 when the session button is disabled, ink-2 otherwise.
  const sessionInk = onSessionClick && sessionDisabled ? "text-ink-3" : "text-ink-2";
  const sessionContent = (
    <>
      {site != null ? (
        <span
          className={cn(
            "max-w-full truncate font-mono text-[15px] leading-[20px] font-medium",
            sessionInk,
          )}
        >
          {site}
        </span>
      ) : null}
      {user != null ? (
        <span className={cn("max-w-full truncate font-sans text-small", sessionInk)}>{user}</span>
      ) : null}
    </>
  );
  // `min-w-0`: the block shrinks and its lines end in an ellipsis, so a long operator name (the
  // backend allows 255 characters) never widens the page.
  const sessionClass = "flex flex-col items-end justify-center min-w-0 h-su10 px-su1 text-end";

  return (
    <header
      className={cn(
        "flex flex-col shrink-0 w-full bg-surface text-ink font-sans",
        "border-b border-solid border-border",
        className,
      )}
      {...rest}
    >
      <div className="flex items-center justify-between gap-su2 shrink-0 h-su11 pl-su1 pr-su3">
        {lead ?? <span />}
        {hasSession ? (
          onSessionClick ? (
            <button
              type="button"
              onClick={onSessionClick}
              disabled={sessionDisabled}
              aria-label={sessionAriaLabel}
              className={cn(ghostButtonClass, sessionClass)}
            >
              {sessionContent}
            </button>
          ) : (
            <div className={sessionClass}>{sessionContent}</div>
          )
        ) : null}
      </div>

      {flow != null ? (
        <div className="flex flex-col shrink-0 h-[55px] gap-[9px] pt-su2 px-su4">
          <div className="flex items-baseline justify-between gap-su3 min-w-0">
            <FlowTag className="m-0 min-w-0 truncate text-hh-flow font-semibold">{flow}</FlowTag>
            {hasSteps ? (
              <span className="shrink-0 text-hh-step font-medium text-ink-2">
                {stepLabel(current, total)}
              </span>
            ) : null}
          </div>
          {hasSteps ? (
            <div aria-hidden className="flex gap-su1 h-su1">
              {Array.from({ length: total }, (_, i) => {
                const n = i + 1;
                return (
                  <span
                    key={n}
                    className={cn(
                      "flex-1 h-su1 rounded-su-bar forced-colors:[forced-color-adjust:none]",
                      n < current
                        ? "bg-ink"
                        : n === current
                          ? "bg-action"
                          : "bg-border forced-colors:bg-[GrayText]",
                    )}
                  />
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
    </header>
  );
}
