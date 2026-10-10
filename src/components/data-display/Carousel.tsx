import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type HTMLAttributes,
  type ReactNode,
} from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

/**
 * 32 secondary icon button: surface, 1px border-strong, radius 6, 18 ink-2 chevron.
 * Hover surface-2, press fill; disabled is fill on fill with an ink-3 glyph (no opacity).
 * Under (hover: none) a transparent ::after lifts the target to 44.
 */
const navButtonClass =
  "relative inline-flex shrink-0 items-center justify-center size-[var(--su-control-sm)] " +
  "border border-solid rounded-su-control cursor-pointer " +
  "transition-[background-color,border-color,color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none " +
  "enabled:border-border-strong enabled:bg-surface enabled:text-ink-2 " +
  "[@media(hover:hover)]:[&:enabled:hover:not(:active)]:bg-surface-2 enabled:active:bg-fill su-focus-ring " +
  "disabled:border-fill disabled:bg-fill disabled:text-ink-3 disabled:cursor-not-allowed " +
  "[@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:-inset-[6px]";

/** Smooth unless the reader asked for less motion. */
function scrollBehavior(): ScrollBehavior {
  return typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ? "auto"
    : "smooth";
}

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

interface TrackState {
  atStart: boolean;
  atEnd: boolean;
  /** Slide whose start edge is nearest the scroll position (the last one once at the end). */
  active: number;
  count: number;
}

export function Carousel({ className, children, ...rest }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [track, setTrack] = useState<TrackState>({
    atStart: true,
    atEnd: true,
    active: 0,
    count: 0,
  });

  // ponytail: scroll/resize listener only — no IntersectionObserver per slide. The active
  // dot is "the slide whose start edge is nearest the scroll offset", which is exact under
  // snap-start and good enough mid-swipe.
  const sync = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slides = Array.from(el.children) as HTMLElement[];
    // RTL scrollLeft counts down from 0, so compare on magnitude.
    const offset = Math.abs(el.scrollLeft);
    const atStart = offset <= 1;
    const atEnd = offset + el.clientWidth >= el.scrollWidth - 1;
    let active = 0;
    if (atEnd && slides.length) active = slides.length - 1;
    else if (slides.length) {
      const origin = slides[0].offsetLeft;
      let best = Infinity;
      slides.forEach((slide, i) => {
        const distance = Math.abs(Math.abs(slide.offsetLeft - origin) - offset);
        if (distance < best) {
          best = distance;
          active = i;
        }
      });
    }
    const count = slides.length;
    setTrack((prev) =>
      prev.atStart === atStart &&
      prev.atEnd === atEnd &&
      prev.active === active &&
      prev.count === count
        ? prev
        : { atStart, atEnd, active, count },
    );
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", sync);
      ro.disconnect();
    };
  }, [sync]);

  // Slides added or removed without a size change still need a fresh dot count.
  useEffect(sync, [children, sync]);

  const rtlSign = (el: HTMLElement) => (getComputedStyle(el).direction === "rtl" ? -1 : 1);

  // dir: -1 scrolls toward the start of reading order, 1 toward the end.
  const scroll = (dir: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    // 0.85 mirrors CarouselItem's flex basis below — keep the two in step.
    el.scrollBy({ left: dir * rtlSign(el) * el.clientWidth * 0.85, behavior: scrollBehavior() });
  };

  const goTo = (index: number) => {
    const el = trackRef.current;
    const slides = el ? (Array.from(el.children) as HTMLElement[]) : [];
    if (!el || !slides[index]) return;
    const distance = Math.abs(slides[index].offsetLeft - slides[0].offsetLeft);
    el.scrollTo({ left: rtlSign(el) * distance, behavior: scrollBehavior() });
  };

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Carousel"
      className={cn("relative flex flex-col gap-su3", className)}
      {...rest}
    >
      <div className="flex items-center gap-su2">
        <button
          type="button"
          className={navButtonClass}
          onClick={() => scroll(-1)}
          disabled={track.atStart}
          aria-label="Previous"
        >
          <IconChevronLeft size={18} stroke={1.75} aria-hidden className="rtl:-scale-x-100" />
        </button>
        <div
          ref={trackRef}
          tabIndex={0}
          className="flex flex-1 min-w-0 gap-su3 overflow-x-auto snap-x snap-mandatory py-su1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden su-focus-ring"
        >
          {children}
        </div>
        <button
          type="button"
          className={navButtonClass}
          onClick={() => scroll(1)}
          disabled={track.atEnd}
          aria-label="Next"
        >
          <IconChevronRight size={18} stroke={1.75} aria-hidden className="rtl:-scale-x-100" />
        </button>
      </div>
      {track.count > 1 ? (
        // 8px dots: border-strong, the current one ink. Each sits in a 16 box so it can be clicked.
        <div role="group" aria-label="Slides" className="flex items-center justify-center">
          {Array.from({ length: track.count }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1} of ${track.count}`}
              aria-current={i === track.active ? "true" : undefined}
              onClick={() => goTo(i)}
              className="group inline-flex items-center justify-center size-[16px] rounded-su-round bg-transparent cursor-pointer su-focus-ring"
            >
              <span
                aria-hidden
                className={cn(
                  "block size-[8px] rounded-su-round transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                  i === track.active
                    ? "bg-ink"
                    : "bg-border-strong [@media(hover:hover)]:group-hover:bg-ink-3",
                )}
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export interface CarouselItemProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
}

export function CarouselItem({ className, children, ...rest }: CarouselItemProps) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn(
        // 85% basis leaves the next slide peeking; Carousel's scroll() uses the same ratio.
        // A radius-8 surface with a hairline; it clips its content to the corners.
        "flex-[0_0_85%] snap-start overflow-hidden rounded-su-surface border border-solid border-border bg-surface",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Carousel.Item = CarouselItem;
