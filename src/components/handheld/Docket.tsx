import { createContext, useContext, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from "react";
import { IconChevronRight } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { HH_STROKE, hhTransition } from "./shared";

const DocketContext = createContext<{ readOnly: boolean } | null>(null);

export interface DocketProps extends HTMLAttributes<HTMLElement> {
  /**
   * `false` (default): a `<ul>` of tappable rows ("tap one to scan it again").
   * `true`: a `<dl>` read-out (the done screen), rows without chevrons.
   */
  readOnly?: boolean;
}

/**
 * The answers given so far on a handheld flow, one `DocketRow` each. Name the list with
 * `aria-label` ("Answers given. Tap one to scan it again."). Full bleed: rows carry their own
 * 16 inset and bottom hairline; add `border-t` when it does not sit under the top bar.
 */
export function Docket({ readOnly = false, className, children, ...rest }: DocketProps) {
  const Tag = readOnly ? "dl" : "ul";
  return (
    <DocketContext.Provider value={{ readOnly }}>
      <Tag className={cn("m-0 p-0 list-none bg-surface font-sans", className)} {...rest}>
        {children}
      </Tag>
    </DocketContext.Provider>
  );
}

export interface DocketRowProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  /** The key, 18/24 500 ink-2 ("Location"). */
  label: ReactNode;
  /** The answer, 24/30 600 ink, right-aligned with an ellipsis. Mono unless `mono={false}`. */
  value: ReactNode;
  /** Second line, 17/22 ink-2, right-aligned ("Bandage roll 10cm"). Makes the row 64 tall. */
  sub?: ReactNode;
  /** Identifier value (SKU, bin, PO) in mono. Set `false` for a number with its unit ("20 buc"). Default true. */
  mono?: boolean;
  /** Read-only row (`<dt>`/`<dd>`, no chevron). Defaults to the enclosing `Docket`'s `readOnly`. */
  readOnly?: boolean;
}

/** Row focus stays inside the full-bleed row: the outline is inset instead of offset. */
const rowFocus =
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[-2px]";

/**
 * Docket row (spec §4.7): one-line 56, two-line 64 (grid rows 30 + 22), padding 0 16,
 * `grid: auto 1fr 18px` with a 12 gap, bottom hairline, chevron 18 ink-3.
 * Tappable rows are buttons (inside a `Docket`, each sits in an `<li>`); read-only rows are
 * `<dt>`/`<dd>` pairs 56 tall with no chevron.
 */
export function DocketRow({
  label,
  value,
  sub,
  mono = true,
  readOnly: readOnlyProp,
  className,
  disabled,
  type = "button",
  ...rest
}: DocketRowProps) {
  const ctx = useContext(DocketContext);
  const readOnly = readOnlyProp ?? ctx?.readOnly ?? false;
  const twoLine = sub != null && sub !== false;

  const valueClass = cn(
    "justify-self-end max-w-full min-w-0 m-0 truncate text-hh-value font-semibold",
    mono ? "font-mono" : "font-sans su-tabular",
    disabled ? "text-ink-3" : "text-ink",
  );
  const subClass =
    "col-start-1 col-end-3 row-start-2 justify-self-end max-w-full min-w-0 m-0 truncate text-hh-band-line text-ink-2";
  const labelClass = "col-start-1 row-start-1 self-center m-0 text-hh-key font-medium text-ink-2";

  const layout = cn(
    "grid w-full gap-x-su3 px-su4 m-0 bg-surface text-ink text-start font-sans",
    "border-b border-solid border-border rounded-su-row",
    twoLine
      ? "h-[var(--su-hh-control-lg)] grid-rows-[30px_22px] content-center"
      : "h-[var(--su-hh-control-md)] items-center",
  );

  if (readOnly) {
    // 17/22 sub line: the band-line metrics.
    const row = (
      <div className={cn(layout, "grid-cols-[auto_minmax(0,1fr)]", className)}>
        <dt className={labelClass}>{label}</dt>
        <dd className={cn(valueClass, "col-start-2 row-start-1")}>{value}</dd>
        {twoLine ? <dd className={subClass}>{sub}</dd> : null}
      </div>
    );
    if (ctx?.readOnly) return row;
    const list = <dl className="m-0 p-0">{row}</dl>;
    return ctx ? <li className="m-0 p-0">{list}</li> : list;
  }

  const button = (
    <button
      type={type}
      disabled={disabled}
      className={cn(
        layout,
        "grid-cols-[auto_minmax(0,1fr)_18px] cursor-pointer",
        "[@media(hover:hover)]:enabled:hover:bg-surface-hover enabled:active:bg-fill",
        "disabled:cursor-not-allowed",
        rowFocus,
        hhTransition,
        className,
      )}
      {...rest}
    >
      <span className={labelClass}>{label}</span>
      <span className={cn(valueClass, "col-start-2 row-start-1")}>{value}</span>
      {twoLine ? <span className={subClass}>{sub}</span> : null}
      <IconChevronRight
        size={18}
        stroke={HH_STROKE}
        aria-hidden
        className={cn("col-start-3 row-start-1 self-center text-ink-3", twoLine && "row-end-3")}
      />
    </button>
  );
  return ctx && !ctx.readOnly ? <li className="m-0 p-0">{button}</li> : button;
}
