import {
  forwardRef,
  useEffect,
  useState,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type ElementType,
  type MouseEvent,
  type ReactNode,
} from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cn } from "../../utils/cn";
import { Icon } from "./Icon";
import { RingSpinner } from "./RingSpinner";

/** `secondary` is an alias of `default` (the white, hairline button). `text` is the link. */
export type ButtonVariant = "default" | "secondary" | "primary" | "ghost" | "dashed" | "text";
/** `sm` 28 (in-row actions) · `md` 36 (default) · `lg` 48 (rare desk hero). Handheld scope: 56 / 64. */
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIconPlacement = "start" | "end";

export type ButtonLoading =
  | boolean
  | {
      delay?: number;
      icon?: ReactNode;
    };

type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type NativeAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export interface ButtonProps
  extends Omit<NativeButtonProps, "type" | "children">,
    Pick<
      NativeAnchorProps,
      "download" | "hrefLang" | "ping" | "referrerPolicy"
    > {
  variant?: ButtonVariant;
  /** @deprecated Prefer `variant`. Ant Design–style alias (not the native button type). */
  type?:
    | "primary"
    | "default"
    | "dashed"
    | "link"
    | "text"
    | "ghost"
    | "submit"
    | "reset"
    | "button";
  /** Defaults to `md` (36). Icon-only buttons are square: 24 at `sm`, 32 at `md`, 44 at `lg`. */
  size?: ButtonSize;
  block?: boolean;
  asChild?: boolean;
  /**
   * Destructive action (delete, revoke). With `default` it is the white danger button, with
   * `ghost` a quiet one; with `primary` it is the solid red confirm, used only to confirm a
   * destructive action (Popconfirm, confirm modal).
   */
  danger?: boolean;
  loading?: ButtonLoading;
  icon?: ReactNode;
  iconPlacement?: ButtonIconPlacement;
  /**
   * Horizontal padding. `tight` is the quiet clear action ("Clear filters", overlay footers):
   * 0 6 at `sm`, 0 8 at `md`, 0 12 at `lg`, on both sides. No effect on icon-only or `text`.
   */
  inset?: "default" | "tight";
  /** Opt-in trailing arrow (marketing text links). Off by default. */
  arrow?: boolean;
  /** @deprecated No effect. v2 draws no scan end-cell; kept so existing callers compile. */
  hideEndCell?: boolean;
  /** Render as anchor when set (same as Ant Design `href`). */
  href?: string;
  target?: NativeAnchorProps["target"];
  rel?: string;
  /** Native button `type` attribute. */
  htmlType?: NativeButtonProps["type"];
  children?: ReactNode;
}

type Skin = "primary" | "default" | "ghost" | "dashed" | "text";

const VARIANT_BY_TYPE: Record<string, Skin> = {
  link: "text",
  text: "text",
  ghost: "ghost",
  dashed: "dashed",
  primary: "primary",
  default: "default",
};

/* ——— Class vocabulary ———————————————————————————————————————————————
   One rule per colour property lives on the root and reads a `--su-btn-*` variable. Variants,
   states and densities only re-point those variables, from selectors of rising specificity:
     variant (.x) < disabled (.x:is(…)) < toggle-pressed (.x[aria-pressed]:not(disabled))
   and the hover / open / press rules are gated on "not disabled" and "not active", so no two
   utilities ever compete for one property and nothing depends on UnoCSS emission order.
   Every class stays a literal string so the UnoCSS scanner finds it.
   The decoration reset is the longhand: the `no-underline` shorthand would also reset the
   link's 1px `decoration-1`, and which of the two wins would depend on sheet order. */

const baseClass =
  "group relative box-border inline-flex flex-[0_0_auto] max-w-full items-center justify-center " +
  "gap-[var(--su-btn-gap)] font-sans font-medium tracking-normal whitespace-nowrap [text-decoration-line:none] " +
  "cursor-pointer aria-busy:cursor-wait disabled:cursor-not-allowed aria-disabled:cursor-not-allowed " +
  "bg-[var(--su-btn-bg)] text-[var(--su-btn-fg)] border-[color:var(--su-btn-bd)] " +
  "transition-[background-color,color,border-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] " +
  "su-focus-ring";

/* Hover (real pointers only) and an open popup trigger look the same; press wins while held. */
const stateClass =
  "[@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:bg-[var(--su-btn-bg-h,var(--su-btn-bg))] " +
  "[@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:text-[var(--su-btn-fg-h,var(--su-btn-fg))] " +
  "[@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true],:active):hover]:border-[color:var(--su-btn-bd-h,var(--su-btn-bd))] " +
  "[&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:bg-[var(--su-btn-bg-h,var(--su-btn-bg))] " +
  "[&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:text-[var(--su-btn-fg-h,var(--su-btn-fg))] " +
  "[&[data-state=open]:not(:disabled,[aria-disabled=true],:active)]:border-[color:var(--su-btn-bd-h,var(--su-btn-bd))] " +
  "[&:not(:disabled,[aria-disabled=true]):active]:bg-[var(--su-btn-bg-p,var(--su-btn-bg))] " +
  "[&:not(:disabled,[aria-disabled=true]):active]:text-[var(--su-btn-fg-p,var(--su-btn-fg-h,var(--su-btn-fg)))] " +
  "[&:not(:disabled,[aria-disabled=true]):active]:border-[color:var(--su-btn-bd-p,var(--su-btn-bd))]";

/* Toggle (any variant with aria-pressed="true"): action-subtle ground, 1px action border,
   action-text for text and icon. Hover and press deepen to action-subtle-hover. */
const pressedClass =
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-action-subtle)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg-h:var(--su-action-subtle-hover)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bg-p:var(--su-action-subtle-hover)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-action)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-action-text)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg-h:var(--su-action-text)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-fg-p:var(--su-action-text)] " +
  "[&[aria-pressed=true]:not(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-action-text)]";

/* Disabled: no opacity. Filled variants take the fill ground and border with ink-3 text and
   icon; ghost and link go ink-3 only; dashed keeps its dash in the border colour. */
const disabledFilled =
  "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-bg:var(--su-fill)] " +
  "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-fill)] " +
  "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-ink-3)] " +
  "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-ink-3)]";
const disabledQuiet =
  "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-fg:var(--su-ink-3)] " +
  "[&:is(:disabled,[aria-disabled=true])]:[--su-btn-ic:var(--su-ink-3)]";
const disabledDashed =
  disabledQuiet + " [&:is(:disabled,[aria-disabled=true])]:[--su-btn-bd:var(--su-border)]";

/* On the solid fills the spinner track is the label colour at 30%, so the arc still reads. */
const onFillSpinTrack = "[--su-spin-track:color-mix(in_srgb,currentColor_30%,transparent)]";

type Tone = "base" | "danger";

/** Rest · hover (-h) · press (-p) per variant × tone (§4.1). Unset -h/-p fall back to rest. */
const skinTokens: Record<Skin, Record<Tone, string>> = {
  primary: {
    base:
      "[--su-btn-bg:var(--su-action)] [--su-btn-bg-h:var(--su-action-hover)] [--su-btn-bg-p:var(--su-action-press)] " +
      "[--su-btn-fg:var(--su-on-action)] [--su-btn-bd:transparent] " +
      onFillSpinTrack + " " + disabledFilled,
    danger:
      "[--su-btn-bg:var(--su-danger-strong)] [--su-btn-bg-h:var(--su-danger-strong-hover)] [--su-btn-bg-p:var(--su-danger-strong-press)] " +
      "[--su-btn-fg:var(--su-on-action)] [--su-btn-bd:transparent] " +
      onFillSpinTrack + " " + disabledFilled,
  },
  default: {
    base:
      "[--su-btn-bg:var(--su-surface)] [--su-btn-bg-h:var(--su-surface-2)] [--su-btn-bg-p:var(--su-fill)] " +
      "[--su-btn-fg:var(--su-ink)] [--su-btn-bd:var(--su-border-strong)] [--su-btn-ic:var(--su-ink-2)] " +
      disabledFilled,
    danger:
      "[--su-btn-bg:var(--su-surface)] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] " +
      "[--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:var(--su-danger-line)] " +
      disabledFilled,
  },
  ghost: {
    base:
      "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-fill)] [--su-btn-bg-p:var(--su-border)] " +
      "[--su-btn-fg:var(--su-ink-2)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:transparent] " +
      disabledQuiet,
    danger:
      "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] " +
      "[--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:transparent] " +
      disabledQuiet,
  },
  dashed: {
    base:
      "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-surface-2)] [--su-btn-bg-p:var(--su-fill)] " +
      "[--su-btn-fg:var(--su-ink-2)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:var(--su-border-strong)] " +
      disabledDashed,
    danger:
      "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-danger-tint)] [--su-btn-bg-p:var(--su-danger-line)] " +
      "[--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:var(--su-danger-line)] " +
      disabledDashed,
  },
  text: {
    base:
      "[--su-btn-bg:transparent] [--su-btn-fg:var(--su-action-text)] [--su-btn-fg-h:var(--su-action-text-hover)] " +
      "[--su-btn-fg-p:var(--su-action-press)] [--su-btn-bd:transparent] " +
      disabledQuiet,
    danger: "[--su-btn-bg:transparent] [--su-btn-fg:var(--su-danger-text)] [--su-btn-bd:transparent] " + disabledQuiet,
  },
};

/** The 24px disclosure / facet icon button is ink-3 at rest (§4.1 icon-only table). */
const ghostMiniTokens =
  "[--su-btn-bg:transparent] [--su-btn-bg-h:var(--su-fill)] [--su-btn-bg-p:var(--su-border)] " +
  "[--su-btn-fg:var(--su-ink-3)] [--su-btn-fg-h:var(--su-ink)] [--su-btn-bd:transparent] " +
  disabledQuiet;

/* Size variables: height, icon-only box, label-side padding (px), icon-side padding (pi, 2 less),
   tight padding (pt), gap, icon and icon-only glyph. Handheld md/lg re-point them from a
   `[data-density=handheld]` ancestor; heights, radius and md type follow through the tokens. */
const sizeVars: Record<ButtonSize, string> = {
  sm:
    "[--su-btn-h:var(--su-control-xs)] [--su-btn-box:var(--su-control-mini)] [--su-btn-px:10px] [--su-btn-pi:8px] " +
    "[--su-btn-pt:6px] [--su-btn-gap:6px] [--su-btn-icon:14px] [--su-btn-icon-only:16px]",
  md:
    "[--su-btn-h:var(--su-control-md)] [--su-btn-box:var(--su-control-sm)] [--su-btn-px:14px] [--su-btn-pi:12px] " +
    "[--su-btn-pt:8px] [--su-btn-gap:6px] [--su-btn-icon:16px] [--su-btn-icon-only:18px] " +
    "[[data-density=handheld]_&]:[--su-btn-box:var(--su-hh-control-md)] [[data-density=handheld]_&]:[--su-btn-px:16px] " +
    "[[data-density=handheld]_&]:[--su-btn-pi:16px] [[data-density=handheld]_&]:[--su-btn-gap:8px] " +
    "[[data-density=handheld]_&]:[--su-btn-icon:24px] [[data-density=handheld]_&]:[--su-btn-icon-only:24px]",
  lg:
    "[--su-btn-h:var(--su-control-lg)] [--su-btn-box:var(--su-hit-target)] [--su-btn-px:18px] [--su-btn-pi:16px] " +
    "[--su-btn-pt:12px] [--su-btn-gap:8px] [--su-btn-icon:20px] [--su-btn-icon-only:20px] " +
    "[[data-density=handheld]_&]:[--su-btn-box:var(--su-hh-control-lg)] [[data-density=handheld]_&]:[--su-btn-px:16px] " +
    "[[data-density=handheld]_&]:[--su-btn-pi:16px] [[data-density=handheld]_&]:[--su-btn-icon:24px] " +
    "[[data-density=handheld]_&]:[--su-btn-icon-only:28px]",
};

/** Label type per size, in ONE lookup (size and leading come as a pair from the theme). */
const fontClass: Record<ButtonSize, string> = {
  sm: "text-control-sm",
  md: "text-control",
  lg: "text-section [[data-density=handheld]_&]:text-hh-primary [[data-density=handheld]_&]:font-semibold",
};
/** The link: 14/20 in body copy (17/24 on handheld), 13/18 in small contexts. */
const linkFontClass: Record<ButtonSize, string> = {
  sm: "text-control-sm",
  md: "text-body",
  lg: "text-section",
};

/* 44px touch target under (hover: none) only; on desk the drawn size is the target. The pad is
   centred and never shrinks a box that is already 44 or more. */
const hitPadClass =
  "[@media(hover:none)]:before:content-empty [@media(hover:none)]:before:absolute " +
  "[@media(hover:none)]:before:inset-[min(0px,calc((100%_-_var(--su-hit-target))/2))]";

/* Link: no box, underline on hover (1px, offset 3). */
const linkClass =
  "underline-offset-3 decoration-1 " +
  "[@media(hover:hover)]:[&:not(:disabled,[aria-disabled=true]):hover]:underline";

/** One wrapper around icon + label, so the root has exactly one child box. */
const contentClass =
  "inline-flex min-w-0 max-w-full items-center justify-center gap-[var(--su-btn-gap)]";

const labelTextClass = "block min-w-0 truncate";

/* Marketing link (`arrow`): the underline draws in under the label. */
const underlineDraw =
  "py-[2px] [background:linear-gradient(currentColor_0_0)_0_100%_/_0_1px_no-repeat] " +
  "[transition-property:background-size] duration-[var(--su-duration-scan)] ease-[var(--su-ease-out)] " +
  "[@media(hover:hover)]:group-hover:[background-size:100%_1px] " +
  "group-focus-visible:[background-size:100%_1px] " +
  "motion-reduce:transition-none";

const arrowClass =
  "transition-transform duration-[var(--su-duration-base)] ease-[var(--su-ease-out)] " +
  "[@media(hover:hover)]:group-hover:translate-x-1 " +
  "rtl:-scale-x-100 " +
  // rtl: must lead — it wraps the whole selector, so a trailing one would place
  // [dir=rtl] *inside* the group-hover descendant chain.
  "rtl:[@media(hover:hover)]:group-hover:-translate-x-1 " +
  "motion-reduce:transition-none";

function ArrowGlyph() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" />
    </svg>
  );
}

/**
 * Button (v2 §4.1). Five skins — `primary` (the one action on a screen), `default`/`secondary`
 * (white with a hairline), `ghost`, `dashed` and `text` (the link) — each with a `danger` form,
 * at 28 / 36 / 48 (56 / 64 inside `data-density="handheld"`). Every variant carries a 1px
 * border, so all of them share one geometry. `aria-pressed` turns any variant into a toggle.
 *
 * Loading keeps full contrast: a ring spinner replaces the leading icon, the button is
 * `aria-busy` and clicks are swallowed, but it stays focusable and is never drawn disabled.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant: variantProp,
    type: typeProp,
    size = "md",
    block = false,
    asChild = false,
    danger = false,
    loading = false,
    icon,
    iconPlacement = "start",
    inset = "default",
    arrow = false,
    hideEndCell: _hideEndCell,
    href,
    target,
    rel,
    htmlType,
    className,
    children,
    disabled,
    onClick,
    ...rest
  },
  ref,
) {
  const skin: Skin =
    variantProp === "secondary"
      ? "default"
      : (variantProp ?? VARIANT_BY_TYPE[typeProp as string] ?? "default");
  const resolvedHtmlType: NativeButtonProps["type"] =
    htmlType ??
    (typeProp === "submit" || typeProp === "reset" || typeProp === "button"
      ? typeProp
      : "button");

  const wantsLoading = Boolean(loading);
  const loadingDelay = typeof loading === "object" && loading ? (loading.delay ?? 0) : 0;
  const loadingIcon = typeof loading === "object" && loading ? loading.icon : undefined;
  const [delayPassed, setDelayPassed] = useState(false);
  useEffect(() => {
    if (!loadingDelay || !wantsLoading) {
      setDelayPassed(false);
      return undefined;
    }
    const id = window.setTimeout(() => setDelayPassed(true), loadingDelay);
    return () => window.clearTimeout(id);
  }, [loadingDelay, wantsLoading]);
  const loadingBool = loadingDelay ? delayPassed : wantsLoading;

  // Loading is busy, not disabled: full contrast, still focusable, clicks guarded.
  const inert = Boolean(disabled) || loadingBool;

  if (
    import.meta.env?.DEV &&
    (children == null || children === false) &&
    (icon != null || loadingBool) &&
    !rest["aria-label"] &&
    !rest["aria-labelledby"]
  ) {
    console.warn("Button: icon-only/loading-only button needs an aria-label.");
  }

  const tone: Tone = danger ? "danger" : "base";
  const isText = skin === "text";
  const hasLabel = children != null && children !== false;
  const iconOnly = !isText && !hasLabel && (icon != null || loadingBool);

  const iconBox = iconOnly
    ? "size-[var(--su-btn-icon-only)] text-[var(--su-btn-ic,currentColor)]"
    : "size-[var(--su-btn-icon)] text-[var(--su-btn-ic,currentColor)]";
  const spinner = loadingBool ? (
    loadingIcon != null ? (
      <Icon key="lead" className={iconBox}>
        {loadingIcon}
      </Icon>
    ) : (
      <RingSpinner key="lead" className={iconBox} />
    )
  ) : null;
  const leadIcon =
    spinner ??
    (iconPlacement === "start" && icon != null ? (
      <Icon key="lead" className={iconBox}>
        {icon}
      </Icon>
    ) : null);
  const trailIcon =
    !spinner && iconPlacement === "end" && icon != null ? (
      <Icon key="trail" className={iconBox}>
        {icon}
      </Icon>
    ) : null;
  const arrowIcon =
    arrow && (isText || skin === "ghost") && !loadingBool ? (
      <Icon key="arrow" className={cn(iconBox, arrowClass)}>
        <ArrowGlyph />
      </Icon>
    ) : null;

  /* Under asChild the consumer's element IS the root, so the row can't be wrapped: Radix Slot
     only honours a <Slottable> that is a DIRECT child. */
  const row: ReactNode[] = [
    leadIcon,
    asChild ? (
      <Slottable key="label">{children}</Slottable>
    ) : hasLabel ? (
      <span key="label" className={cn(labelTextClass, isText && arrow && underlineDraw)}>
        {children}
      </span>
    ) : null,
    trailIcon,
    arrowIcon,
  ];

  const padding = isText || iconOnly
    ? "p-0"
    : inset === "tight"
      ? "px-[var(--su-btn-pt)]"
      : leadIcon
        ? "ps-[var(--su-btn-pi)] pe-[var(--su-btn-px)]"
        : trailIcon
          ? "ps-[var(--su-btn-px)] pe-[var(--su-btn-pi)]"
          : "px-[var(--su-btn-px)]";

  const geometry = isText
    ? cn("h-auto border-0 rounded-su-tag", block ? "w-full" : "w-max", linkFontClass[size])
    : iconOnly
      ? cn(
          "h-[var(--su-btn-box)] w-[var(--su-btn-box)] border",
          size === "sm" ? "rounded-su-tag" : "rounded-su-control",
          fontClass[size],
        )
      : cn(
          "h-[var(--su-btn-h)] border rounded-su-control",
          block ? "w-full" : "w-max",
          // The handheld primary spans the screen.
          size === "lg" && !block && "[[data-density=handheld]_&]:w-full",
          fontClass[size],
        );

  const Comp: ElementType = asChild ? Slot : href ? "a" : "button";
  const props: Record<string, unknown> = {
    ...rest,
    ref,
    className: cn(
      baseClass,
      stateClass,
      !isText && pressedClass,
      hitPadClass,
      sizeVars[size],
      iconOnly && skin === "ghost" && !danger && size === "sm"
        ? ghostMiniTokens
        : skinTokens[skin][tone],
      geometry,
      skin === "dashed" && "border-dashed",
      padding,
      isText && !arrow && linkClass,
      className,
    ),
    "aria-busy": loadingBool || undefined,
    "aria-disabled": disabled || undefined,
    onClick: (event: MouseEvent) => {
      if (inert) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      (onClick as ((e: MouseEvent) => void) | undefined)?.(event);
    },
  };
  if (loadingBool && !hasLabel && !rest["aria-label"] && !rest["aria-labelledby"]) {
    // Spinner-only button: the spinner is aria-hidden, so nothing would announce.
    props["aria-label"] = "Loading";
  }
  if (href) {
    // Drop the href while disabled: an onClick guard only stops `click`, so a
    // middle-click (auxclick) or a context-menu "open in new tab" would still navigate.
    if (!disabled) props.href = href;
    props.target = target;
    props.rel = rel ?? (target === "_blank" ? "noopener noreferrer" : undefined);
    // An <a> with no href is generic, so name the role for aria-disabled to land on.
    if (disabled) {
      props.role = "link";
      props.tabIndex = -1;
    }
  } else if (!asChild) {
    props.type = resolvedHtmlType;
    props.disabled = Boolean(disabled);
  }

  return (
    <Comp {...props}>
      {asChild ? row : <span className={contentClass}>{row}</span>}
    </Comp>
  );
});
