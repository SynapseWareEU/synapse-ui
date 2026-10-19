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
  /**
   * Draw a hairline above the first row, for a docket that does not sit under the top bar (after
   * a result band, or part-way down the done screen). Default false: the bar's own rule is above.
   */
  topRule?: boolean;
}

/**
 * The answers given so far on a handheld flow, one `DocketRow` each. Name the list with
 * `aria-label` ("Answers given. Tap one to scan it again."). Full bleed: rows carry their own
 * 16 inset and bottom hairline; pass `topRule` when it does not sit under the top bar.
 */
export function Docket({ readOnly = false, topRule = false, className, children, ...rest }: DocketProps) {
  const Tag = readOnly ? "dl" : "ul";
  return (
    <DocketContext.Provider value={{ readOnly }}>
      <Tag
        className={cn(
          "m-0 p-0 list-none bg-surface font-sans",
          topRule && "border-0 border-t border-solid border-border",
          className,
        )}
        {...rest}
      >
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
  /**
   * Never cut the answer. The value and the `sub` line wrap, breaking inside an identifier that
   * has no word to break at (an SSCC, a 50-character bin, a lot), and the row grows from its 56 /
   * 64 with 12 / 5 above and below instead of keeping a fixed height. Default: one line each,
   * ending in an ellipsis. A row whose value fits on one line is the same height either way.
   */
  wrap?: boolean;
  /**
   * Props for the element that holds the value alone (`data-testid`, `id`, `title`): the `<dd>`
   * of a read-only row, the value's `<span>` of a tappable one.
   */
  valueProps?: DocketRowValueAttributes;
}

/** Attributes for the value element, handed over as an object, so `data-*` is spelled out. */
export type DocketRowValueAttributes = HTMLAttributes<HTMLElement> & {
  [key: `data-${string}`]: string | number | boolean | undefined;
};

/** Row focus stays inside the full-bleed row: the outline is inset instead of offset. */
const rowFocus =
  "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[-2px]";

/**
 * Docket row (spec §4.7): one-line 56, two-line 64 (grid rows 30 + 22), padding 0 16,
 * `grid: auto 1fr 18px` with a 12 gap, bottom hairline, chevron 18 ink-3.
 * Tappable rows are buttons (inside a `Docket`, each sits in an `<li>`); read-only rows are
 * `<dt>`/`<dd>` pairs 56 tall with no chevron. The other props (`data-testid`, `id`, `aria-*`)
 * reach the button, or the row's own `<div>` when it is read-only.
 */
export function DocketRow({
  label,
  value,
  sub,
  mono = true,
  readOnly: readOnlyProp,
  wrap = false,
  valueProps,
  className,
  disabled,
  type = "button",
  ...rest
}: DocketRowProps) {
  const ctx = useContext(DocketContext);
  const readOnly = readOnlyProp ?? ctx?.readOnly ?? false;
  const twoLine = sub != null && sub !== false;

  // Wrapping: the answer stays against the end edge and breaks anywhere, since an identifier has
  // no word boundary; the key keeps to the first line.
  const cut = wrap ? "text-end [overflow-wrap:anywhere]" : "truncate";
  const valueClass = cn(
    "justify-self-end max-w-full min-w-0 m-0 text-hh-value font-semibold",
    cut,
    mono ? "font-mono" : "font-sans su-tabular",
    disabled ? "text-ink-3" : "text-ink",
  );
  const subClass = cn(
    "col-start-1 col-end-3 row-start-2 justify-self-end max-w-full min-w-0 m-0 text-hh-band-line text-ink-2",
    cut,
  );
  // Wrapping: the key sits on the value's first line (24 in a 30 line), not at the row's middle.
  const labelClass = cn(
    "col-start-1 row-start-1 m-0 text-hh-key font-medium text-ink-2",
    wrap ? "self-start py-[3px]" : "self-center",
  );

  const layout = cn(
    "grid w-full gap-x-su3 px-su4 m-0 bg-surface text-ink text-start font-sans",
    "border-b border-solid border-border rounded-su-row",
    // Wrapping: the same heights as floors, the padding a one-line row has around its text
    // (56 = 12 + 30 + 12 + the rule, 64 = 5 + 30 + 22 + 5 + the rule), and rows that take their
    // content's height.
    wrap
      ? twoLine
        ? "min-h-[var(--su-hh-control-lg)] py-[5px] content-center"
        : "min-h-[var(--su-hh-control-md)] py-[12px] content-center"
      : twoLine
        ? "h-[var(--su-hh-control-lg)] grid-rows-[30px_22px] content-center"
        : "h-[var(--su-hh-control-md)] items-center",
  );

  if (readOnly) {
    // 17/22 sub line: the band-line metrics.
    const row = (
      // A read-only row is not a button: of the rest props it takes the ones any element does.
      <div
        {...(rest as unknown as HTMLAttributes<HTMLDivElement>)}
        className={cn(layout, "grid-cols-[auto_minmax(0,1fr)]", className)}
      >
        <dt className={labelClass}>{label}</dt>
        <dd {...valueProps} className={cn(valueClass, "col-start-2 row-start-1", valueProps?.className)}>
          {value}
        </dd>
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
      <span {...valueProps} className={cn(valueClass, "col-start-2 row-start-1", valueProps?.className)}>
        {value}
      </span>
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
