import * as RadixTooltip from "@radix-ui/react-tooltip";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

export interface TooltipProps
  extends ComponentPropsWithoutRef<typeof RadixTooltip.Root> {
  content: ReactNode;
  side?: ComponentPropsWithoutRef<typeof RadixTooltip.Content>["side"];
  align?: ComponentPropsWithoutRef<typeof RadixTooltip.Content>["align"];
  children: ReactNode;
}

/** Tooltips open after 500ms and close as soon as the pointer or focus leaves. */
export function TooltipProvider({
  children,
  ...rest
}: ComponentPropsWithoutRef<typeof RadixTooltip.Provider>) {
  return (
    <RadixTooltip.Provider delayDuration={500} {...rest}>
      {children}
    </RadixTooltip.Provider>
  );
}

/**
 * Requires a parent `TooltipProvider` (or `App`, which mounts one).
 * Avoids nesting a Provider per tooltip instance.
 *
 * Inverse bubble for naming icon-only buttons and revealing truncated values. Never put
 * essential information in it.
 */
export function Tooltip({
  content,
  side = "top",
  align = "center",
  children,
  ...rest
}: TooltipProps) {
  // Nothing to say: render the trigger bare rather than an empty bubble.
  // Only nullish/empty-string is suppressed, so `content={0}` still shows.
  if (content == null || content === "") return <>{children}</>;
  return (
    <RadixTooltip.Root {...rest}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          align={align}
          sideOffset={6}
          // A key hint (`<kbd>`) inside sits on inverse-ink at 16% (white 16% in light) in inverse-ink.
          className="z-[var(--su-z-dropdown)] max-w-[240px] py-su1 px-su2 rounded-su-tag bg-inverse text-inverse-ink font-sans text-small font-normal text-start [overflow-wrap:anywhere] [&_kbd]:bg-[color-mix(in_srgb,var(--su-inverse-ink)_16%,transparent)] [&_kbd]:text-inverse-ink animate-su-tip-in motion-reduce:animate-none"
        >
          {/* No border, no arrow (v2). */}
          {content}
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
}

Tooltip.Provider = TooltipProvider;
