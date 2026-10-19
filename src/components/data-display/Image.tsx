import { useState, type ImgHTMLAttributes, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  fallback?: ReactNode;
  width?: number | string;
  height?: number | string;
  preview?: boolean;
}

/*
 * The lightbox always sits on the dark `--su-scrim-strong`, whatever the theme, so its
 * copy and controls use the theme-invariant white `--su-on-action` (focus ring included:
 * the blue focus colour is too dark against the scrim).
 */
const lightboxButtonClass =
  "inline-flex shrink-0 items-center justify-center size-[var(--su-hit-target)] rounded-su-control bg-transparent text-on-action cursor-pointer " +
  "transition-[background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] " +
  "[@media(hover:hover)]:[&:hover:not(:active)]:bg-[color-mix(in_srgb,var(--su-on-action)_16%,transparent)] " +
  "active:bg-[color-mix(in_srgb,var(--su-on-action)_24%,transparent)] " +
  "su-focus-ring focus-visible:outline-on-action";

export function Image({
  src,
  alt = "",
  fallback,
  width,
  height,
  preview = false,
  className,
  onError,
  ...rest
}: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (!src || failedSrc === src) {
    // One string for both the visible text and the accessible name (WCAG 2.5.3).
    // Visible string wins so the name always contains what is rendered.
    const fallbackLabel =
      (typeof fallback === "string" ? fallback : alt) || "Image unavailable";
    return (
      <span
        className={cn(
          "inline-flex items-center justify-center min-w-12 min-h-12 p-su2 rounded-su-surface border border-solid border-border bg-surface-2 font-sans text-small text-ink-2 text-center",
          className,
        )}
        style={{ width, height }}
        role="img"
        aria-label={fallbackLabel}
      >
        {fallback ?? (alt ? alt.slice(0, 1).toUpperCase() : fallbackLabel)}
      </span>
    );
  }
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("block max-w-full object-cover rounded-su-surface", className)}
      onError={(e) => {
        setFailedSrc(src);
        onError?.(e);
      }}
      {...rest}
    />
  );
  if (!preview) return img;
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className={cn(
            // Same radius as the image so the focus ring follows its corners.
            "p-0 rounded-su-surface bg-transparent cursor-zoom-in",
            "transition-opacity duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
            "[@media(hover:hover)]:hover:opacity-80",
            "su-focus-ring",
          )}
          aria-label={`Preview ${alt || "image"}`}
        >
          {img}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* Darker than `su-overlay` on purpose: a lightbox needs the white title legible over it. */}
        <Dialog.Overlay className="su-overlay-strong" />
        <Dialog.Content
          className="fixed inset-[5vh_5vw] z-[var(--su-z-modal)] flex flex-col gap-su4 font-sans animate-su-scale-in motion-reduce:animate-none"
          aria-describedby={undefined}
        >
          <div className="flex items-center gap-su3">
            <Dialog.Title className="flex-1 min-w-0 m-0 overflow-hidden text-ellipsis whitespace-nowrap text-body font-medium text-on-action">
              {alt || "Image preview"}
            </Dialog.Title>
            {/* 44 icon button with a 20 white glyph. */}
            <Dialog.Close aria-label="Close preview" className={lightboxButtonClass}>
              <IconX size={20} stroke={1.75} aria-hidden />
            </Dialog.Close>
          </div>
          <div className="flex flex-1 min-h-0 items-center justify-center">
            <img
              src={src}
              alt={alt}
              className="block max-w-full max-h-full object-contain rounded-su-surface"
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
