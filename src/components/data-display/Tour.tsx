import {
  useEffect,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons-react";
import { Button } from "../general/Button";
import { cn } from "../../utils/cn";

export interface TourStep {
  target: string;
  title?: ReactNode;
  description?: ReactNode;
}
export interface TourProps {
  open?: boolean;
  steps: TourStep[];
  current?: number;
  defaultCurrent?: number;
  onChange?: (index: number) => void;
  onClose?: () => void;
}

/** Spotlight padding around the target, and the card's distance from the spotlight. */
const SPOT_PAD = 4;
const CARD_GAP = 12;
/** Card width and the viewport margin it keeps. */
const CARD_WIDTH = 320;
const EDGE = 16;
/** Below this much room on either side the card falls back to the bottom sheet. */
const MIN_ROOM = 160;

/**
 * Places the card under the spotlight, or above it when there is more room there; the
 * start edge follows the target, clamped into the viewport. `null` means "no room on
 * either side": the caller falls back to the centred bottom sheet.
 */
function placeCard(rect: DOMRect): CSSProperties | null {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const below = vh - (rect.bottom + SPOT_PAD) - CARD_GAP - EDGE;
  const above = rect.top - SPOT_PAD - CARD_GAP - EDGE;
  if (Math.max(below, above) < MIN_ROOM) return null;
  const left = Math.max(EDGE, Math.min(rect.left - SPOT_PAD, vw - CARD_WIDTH - EDGE));
  return below >= above
    ? { top: rect.bottom + SPOT_PAD + CARD_GAP, left, maxHeight: below }
    : { bottom: vh - rect.top + SPOT_PAD + CARD_GAP, left, maxHeight: above };
}

/*
 * The scrim is `--su-scrim`, drawn as a 9999px spread shadow around the spotlight so the
 * target shows through a radius-8 cut-out. The `su-overlay` shortcut can't be used: the
 * cut-out needs the colour as a shadow, and the layer sits at --su-z-max.
 */
export function Tour({
  open = false,
  steps,
  current,
  defaultCurrent = 0,
  onChange,
  onClose,
}: TourProps) {
  const [internal, setInternal] = useState(defaultCurrent);
  const [rect, setRect] = useState<DOMRect | null>(null);
  const index = current ?? internal;
  const step = steps[index];
  useEffect(() => {
    if (open && current === undefined) setInternal(defaultCurrent);
  }, [open, current, defaultCurrent]);
  useEffect(() => {
    if (!open || !step) return;
    const target = document.querySelector(step.target);
    target?.scrollIntoView({ block: "center", behavior: "instant" });
    const update = () => setRect(target?.getBoundingClientRect() ?? null);
    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, step?.target]);
  const go = (next: number) => {
    if (next < 0 || next > steps.length - 1) return;
    if (current === undefined) setInternal(next);
    onChange?.(next);
  };
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight") go(index + 1);
    else if (event.key === "ArrowLeft") go(index - 1);
    else return;
    event.preventDefault();
  };
  const placement = rect ? placeCard(rect) : null;
  return (
    <Dialog.Root
      open={open && !!step}
      onOpenChange={(next) => {
        if (!next) onClose?.();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[var(--su-z-max)] animate-su-fade-in motion-reduce:animate-none">
          {rect ? (
            <div
              className="fixed rounded-su-surface pointer-events-none shadow-[0_0_0_9999px_var(--su-scrim)]"
              style={{
                top: rect.top - SPOT_PAD,
                left: rect.left - SPOT_PAD,
                width: rect.width + SPOT_PAD * 2,
                height: rect.height + SPOT_PAD * 2,
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[var(--su-scrim)]" />
          )}
        </Dialog.Overlay>
        <Dialog.Content
          onKeyDown={onKeyDown}
          style={placement ?? undefined}
          className={cn(
            "fixed z-[var(--su-z-max)] w-[min(320px,calc(100%-var(--su-space-8)))] overflow-y-auto p-su4",
            "rounded-su-surface border border-solid border-border bg-surface-overlay shadow-su-overlay",
            "font-sans text-ink su-focus-ring animate-su-dropdown-in motion-reduce:animate-none",
            // No room beside the target (or no target): a centred sheet near the bottom edge.
            // Centred with auto margins, not a translate, so the entry keyframe's transform
            // can't knock it sideways while it plays.
            placement ? undefined : "bottom-su8 inset-x-0 mx-auto max-h-[70vh]",
          )}
        >
          <div className="flex items-start gap-su2">
            <Dialog.Title className="flex-1 min-w-0 m-0 text-body font-semibold text-ink">
              {step?.title ?? "Take a tour"}
            </Dialog.Title>
            {/* 32 ghost icon button, pulled into the corner so it doesn't push the title down. */}
            <Dialog.Close
              aria-label="Close tour"
              className={cn(
                "inline-flex shrink-0 items-center justify-center size-[var(--su-control-sm)] -my-[6px] -me-su2 rounded-su-control bg-transparent text-ink-2 cursor-pointer",
                "transition-[background-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                "[@media(hover:hover)]:[&:hover:not(:active)]:bg-fill [@media(hover:hover)]:hover:text-ink active:bg-border su-focus-ring",
                "relative [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:-inset-[6px]",
              )}
            >
              <IconX size={18} stroke={1.75} aria-hidden />
            </Dialog.Close>
          </div>
          <Dialog.Description className="mt-su1 mb-0 text-small text-ink-2">
            {step?.description}
          </Dialog.Description>
          <div className="flex items-center justify-between flex-wrap gap-su2 mt-su4">
            <span className="text-small text-ink-2 su-tabular">
              {index + 1} of {steps.length}
            </span>
            <div className="flex gap-su2">
              {index > 0 && (
                <Button size="sm" onClick={() => go(index - 1)}>
                  Back
                </Button>
              )}
              {index < steps.length - 1 ? (
                <Button variant="primary" size="sm" onClick={() => go(index + 1)}>
                  Next
                </Button>
              ) : (
                <Dialog.Close asChild>
                  <Button variant="primary" size="sm">
                    Done
                  </Button>
                </Dialog.Close>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
