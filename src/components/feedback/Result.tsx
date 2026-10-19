import type { HTMLAttributes, ReactNode } from "react";
import { iconDefaults } from "../general/Icon";
import { cn } from "../../utils/cn";
import { toneIcon, toneTextClass, type FeedbackToneOrNeutral } from "./shared";

export type ResultStatus = "success" | "error" | "info" | "warning" | "404" | "403" | "500";

export interface ResultProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  status?: ResultStatus;
  /** 24/32 600, −0.01em. */
  title?: ReactNode;
  /** 14/20 ink-2, at most 420 wide. */
  subTitle?: ReactNode;
  /** Actions, 24 below the text with an 8 gap. */
  extra?: ReactNode;
  /** Replaces the status icon (or the HTTP code). */
  icon?: ReactNode;
}

const isCode = (status: ResultStatus): status is "404" | "403" | "500" => /^\d/.test(status);

/**
 * Outcome page (spec §4.4, desk). A centred column at most 480 wide, padded 48 24: a 32 icon in
 * the tone's text colour (or the HTTP code in display 32/40 600 ink-2, sans), the title, the
 * text and the actions.
 */
export function Result({
  status = "info",
  title,
  subTitle,
  extra,
  icon,
  children,
  className,
  ...rest
}: ResultProps) {
  const code = isCode(status);
  const tone: FeedbackToneOrNeutral = code ? "neutral" : status;
  const Glyph = toneIcon[tone];
  return (
    <div
      className={cn(
        "box-border w-full max-w-[480px] mx-auto flex flex-col items-center text-center py-su10 px-su6 font-sans",
        className,
      )}
      {...rest}
    >
      <div
        aria-hidden="true"
        className={cn(
          "flex items-center justify-center",
          code ? "text-display font-semibold text-ink-2 su-tabular" : toneTextClass[tone],
        )}
      >
        {icon ?? (code ? status : <Glyph size={32} {...iconDefaults} />)}
      </div>
      {title ? (
        <div className="mt-su4 max-w-full text-title font-semibold text-ink [overflow-wrap:anywhere]">
          {title}
        </div>
      ) : null}
      {subTitle ? (
        <div className="mt-su2 max-w-[420px] text-body text-ink-2 [overflow-wrap:anywhere]">
          {subTitle}
        </div>
      ) : null}
      {extra ? (
        <div className="mt-su6 flex flex-wrap items-center justify-center gap-su2">{extra}</div>
      ) : null}
      {children ? <div className="mt-su6 w-full">{children}</div> : null}
    </div>
  );
}
