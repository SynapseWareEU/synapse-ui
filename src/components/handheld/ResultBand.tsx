import type { HTMLAttributes, ReactNode } from "react";
import { IconCheck, IconVolume, IconX } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { HH_STROKE } from "./shared";

export type ResultBandTone = "success" | "danger";

export interface ResultBandProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** `success`: success-strong, `role="status"`. `danger`: danger-strong, `role="alert"`. Default success. */
  tone?: ResultBandTone;
  /** 22/28 600 ("Accepted", "Refused"). */
  title: ReactNode;
  /**
   * The sound and vibration the terminal just made, 13/18 600 with a speaker icon, pushed right
   * ("1 beep · short vibration"). Pair every band with one, so the result never rests on colour alone.
   */
  signal?: ReactNode;
  /** Replaces the check / cross (24). `null` hides it. */
  icon?: ReactNode | null;
  /** What to do next, the last line in 600 ("Scan the shelf label, not the pallet's."). */
  instruction?: ReactNode;
  /** Detail line(s), 17/22. Identifiers go in `<code>`: mono 0.9em 600. */
  children?: ReactNode;
}

const toneClass: Record<ResultBandTone, string> = {
  success: "bg-success-strong",
  danger: "bg-danger-strong",
};

// Lines wrap: a refusal is a whole sentence, and a cut sentence cannot be acted on. A word longer
// than the band (a pasted identifier) breaks rather than widening the page.
const lineClass = "m-0 min-w-0 break-words text-hh-band-line";

/**
 * Result band (spec §4.7): full-width answer to the scan just read, readable across the aisle.
 * Padding 16, gap 6; a 28 title row (icon + title, signal pushed right), then 17/22 lines.
 * 88 tall with one line (success), 110 with two (danger); the title and the lines wrap, so a
 * longer answer grows the band instead of being cut. The band colours are fixed in both themes;
 * the text is `on-action` white.
 */
export function ResultBand({
  tone = "success",
  title,
  signal,
  icon,
  instruction,
  children,
  className,
  role,
  ...rest
}: ResultBandProps) {
  const glyph =
    icon === undefined ? (
      tone === "success" ? (
        <IconCheck size={24} stroke={HH_STROKE} aria-hidden />
      ) : (
        <IconX size={24} stroke={HH_STROKE} aria-hidden />
      )
    ) : (
      icon
    );
  const hasDetail = children != null && children !== false;
  const hasInstruction = instruction != null && instruction !== false;

  return (
    <div
      role={role ?? (tone === "danger" ? "alert" : "status")}
      className={cn(
        "flex flex-col justify-center gap-[6px] w-full min-h-[88px] p-su4 m-0",
        "font-sans text-on-action",
        "[&_code]:font-mono [&_code]:text-[0.9em] [&_code]:font-semibold [&_code]:text-inherit",
        toneClass[tone],
        className,
      )}
      {...rest}
    >
      {/* Top-aligned, with the icon and the signal each centred on the first 28 line, so a title
          that wraps to a second line leaves them where they were. */}
      <div className="flex items-start gap-su2 min-h-su7 min-w-0">
        {glyph ? (
          <span className="inline-flex items-center shrink-0 h-su7 [&>svg]:block">{glyph}</span>
        ) : null}
        <span className="min-w-0 break-words text-hh-primary font-semibold">{title}</span>
        {signal ? (
          <span className="flex items-center gap-[6px] shrink-0 h-su7 ms-auto text-small font-semibold whitespace-nowrap">
            <IconVolume size={16} stroke={HH_STROKE} aria-hidden className="shrink-0" />
            {signal}
          </span>
        ) : null}
      </div>
      {hasDetail || hasInstruction ? (
        <div className="flex flex-col min-w-0">
          {hasDetail ? <div className={lineClass}>{children}</div> : null}
          {hasInstruction ? <p className={cn(lineClass, "font-semibold")}>{instruction}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
