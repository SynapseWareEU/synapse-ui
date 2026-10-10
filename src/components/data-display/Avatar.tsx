import * as RadixAvatar from "@radix-ui/react-avatar";
import { forwardRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cn } from "../../utils/cn";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps extends ComponentPropsWithoutRef<typeof RadixAvatar.Root> {
  src?: string;
  /**
   * Accessible name for the photo (e.g. the person's name) — required whenever
   * `src` is set; leave unset only for a decorative avatar.
   */
  alt?: string;
  fallback?: ReactNode;
  size?: AvatarSize;
}

// sm 24 · md 28 (default) · lg 40. Initials 12/16 600 (14/20 at lg).
const sizeClass: Record<AvatarSize, string> = {
  sm: "size-[24px] text-micro",
  md: "size-[28px] text-micro",
  lg: "size-[40px] text-[14px] leading-[20px]",
};

// ponytail: fallback text is assumed to be 1-2 letter initials and hard-clips
// beyond that; if a caller ever needs longer text, add `truncate` here rather
// than Ant's ResizeObserver font auto-shrink.
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar(
  { src, alt, fallback, size = "md", className, children, ...rest },
  ref,
) {
  return (
    <RadixAvatar.Root
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-su-round bg-fill text-ink-2 font-sans font-semibold shrink-0 select-none",
        sizeClass[size],
        className,
      )}
      {...rest}
    >
      {src ? (
        <RadixAvatar.Image
          className="size-full object-cover"
          src={src}
          alt={alt ?? ""}
        />
      ) : null}
      <RadixAvatar.Fallback
        className="flex items-center justify-center size-full"
        delayMs={200}
      >
        {fallback ?? children ?? "?"}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
});
