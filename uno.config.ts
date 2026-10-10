import {
  defineConfig,
  presetWind3,
  transformerVariantGroup,
} from "unocss";

/**
 * Synapse UI — UnoCSS theme mirrors `src/styles/tokens.css` (`--su-*`), Lattice UI v2.
 * Prefer the v2 semantic utilities (`bg-surface`, `bg-bg`, `text-ink-2`, `border-border`,
 * `rounded-su-control`, `shadow-su-overlay`) over raw hex. The v1 keys (`bg-paper`, `border-rule`,
 * `text-label`…) still work: they resolve through the token aliases.
 *
 * Things that bite (found the hard way during the component sweep):
 * - `transformerVariantGroup` expands `hover:(a b)` in source files only — shortcut values below
 *   must be written flat. It also silently drops nested groups (`a:(b:(c d))`) and groups whose
 *   members carry brackets (`group-active:(bg-beam duration-[40ms])`): the raw string lands in the
 *   DOM and generates nothing. Write those flat too.
 * - `cn()` is a plain join: a caller's `className` never beats a component's own utility for the
 *   same property. Emit conditional classes as ternaries, not as overrides.
 * - The border reset lives in `src/styles/reset.css` (Tailwind-style `border-width: 0`), so a
 *   single-side `border-t border-rule` is exactly one hairline. `border-none` below is a shortcut
 *   because presetWind3 does not emit a rule for it.
 * - `aria-invalid:` needs the `theme.aria` entry below; without it the variant is inert.
 */

// 4px scale, mirrored from tokens.css. Sizing rules read their own theme keys, not `spacing`,
// so the same map is handed to width/height/min/max as well (`w-su2`, `min-h-su6`…).
const spacing = {
  su0: "var(--su-space-0)",
  su1: "var(--su-space-1)",
  su2: "var(--su-space-2)",
  su3: "var(--su-space-3)",
  su4: "var(--su-space-4)",
  su5: "var(--su-space-5)",
  su6: "var(--su-space-6)",
  su7: "var(--su-space-7)",
  su8: "var(--su-space-8)",
  su9: "var(--su-space-9)",
  su10: "var(--su-space-10)",
  su11: "var(--su-space-11)",
  su12: "var(--su-space-12)",
  su16: "var(--su-space-16)",
};

export default defineConfig({
  presets: [presetWind3()],
  transformers: [transformerVariantGroup()],
  theme: {
    colors: {
      // ——— v2 neutrals ———
      bg: "var(--su-bg)",
      surface: "var(--su-surface)",
      "surface-2": "var(--su-surface-2)",
      "surface-hover": "var(--su-surface-hover)",
      "surface-overlay": "var(--su-surface-overlay)",
      border: "var(--su-border)",
      "border-strong": "var(--su-border-strong)",
      "border-control": "var(--su-border-control)",
      "control-raised": "var(--su-control-raised)",
      inverse: "var(--su-inverse-surface)",
      "inverse-ink": "var(--su-inverse-ink)",
      scrim: "var(--su-scrim)",
      "scrim-strong": "var(--su-scrim-strong)",
      // ——— v2 action ———
      "action-hover": "var(--su-action-hover)",
      "action-subtle": "var(--su-action-subtle)",
      "action-subtle-hover": "var(--su-action-subtle-hover)",
      "action-text": "var(--su-action-text)",
      "action-text-hover": "var(--su-action-text-hover)",
      focus: "var(--su-focus)",
      // ——— v2 status: solid (`danger`…) · text · tint · line · strong ———
      "danger-tint": "var(--su-danger-tint)",
      "danger-line": "var(--su-danger-line)",
      "danger-strong-hover": "var(--su-danger-strong-hover)",
      "danger-strong-press": "var(--su-danger-strong-press)",
      "warning-text": "var(--su-warning-text)",
      "warning-tint": "var(--su-warning-tint)",
      "warning-line": "var(--su-warning-line)",
      "success-text": "var(--su-success-text)",
      "success-tint": "var(--su-success-tint)",
      "success-line": "var(--su-success-line)",
      "info-text": "var(--su-info-text)",
      "info-tint": "var(--su-info-tint)",
      "info-line": "var(--su-info-line)",
      "info-strong": "var(--su-info-strong)",
      // An object, not a string: it merges into presetWind3's `neutral` scale, so `bg-neutral`
      // is the v2 solid and `bg-neutral-500` keeps working for consumers.
      neutral: { DEFAULT: "var(--su-neutral)" },
      "neutral-text": "var(--su-neutral-text)",
      "neutral-tint": "var(--su-neutral-tint)",
      "neutral-line": "var(--su-neutral-line)",
      // ——— v1 keys (kept). The status ones and `action`/`fill`/`ink*` carry v2 values directly;
      // the rest resolve through the aliases in tokens.css (paper → surface, rule → border…). ———
      paper: "var(--su-paper)",
      canvas: "var(--su-canvas)",
      ink: "var(--su-ink)",
      "ink-2": "var(--su-ink-2)",
      "ink-3": "var(--su-ink-3)",
      "ink-secondary": "var(--su-ink-2)",
      "ink-muted": "var(--su-ink-3)",
      label: "var(--su-label)",
      "label-secondary": "var(--su-label-secondary)",
      "label-tertiary": "var(--su-label-tertiary)",
      "label-quaternary": "var(--su-label-quaternary)",
      action: "var(--su-action)",
      "action-press": "var(--su-action-press)",
      "on-action": "var(--su-on-action)",
      accent: "var(--su-accent)",
      "accent-soft": "var(--su-accent-soft)",
      beam: "var(--su-beam)",
      rule: "var(--su-rule)",
      "rule-strong": "var(--su-rule-strong)",
      separator: "var(--su-separator)",
      danger: "var(--su-danger)",
      "danger-text": "var(--su-danger-text)",
      "danger-strong": "var(--su-danger-strong)",
      success: "var(--su-success)",
      "success-strong": "var(--su-success-strong)",
      warning: "var(--su-warning)",
      "warning-strong": "var(--su-warning-strong)",
      info: "var(--su-info)",
      fill: "var(--su-fill)",
      "fill-secondary": "var(--su-fill-secondary)",
      "fill-tertiary": "var(--su-fill-tertiary)",
      "fill-quaternary": "var(--su-fill-quaternary)",
      // Slot states — the brand's one motif (bay swatches, sequence steps, the spinner).
      "s-free": "var(--su-s-free)",
      "s-receiving": "var(--su-s-receiving)",
      "s-onhand": "var(--su-s-onhand)",
      "s-allocated": "var(--su-s-allocated)",
      "s-picking": "var(--su-s-picking)",
      "s-counted": "var(--su-s-counted)",
    },
    spacing,
    width: spacing,
    height: spacing,
    minWidth: spacing,
    minHeight: spacing,
    maxWidth: spacing,
    maxHeight: spacing,
    // v2 scale: px size / line-height pairs from tokens.css. `body`, `control` and `label-type`
    // read tokens that the `data-density="handheld"` scope re-sizes. `text-label` is the colour
    // role; the label size is `text-label-type` (or the `su-label` shortcut).
    fontSize: {
      display: [
        "var(--su-text-display)",
        { "line-height": "var(--su-leading-display)", "letter-spacing": "var(--su-tracking-display)" },
      ],
      title: [
        "var(--su-text-title)",
        { "line-height": "var(--su-leading-title)", "letter-spacing": "var(--su-tracking-tight)" },
      ],
      "title-phone": ["var(--su-text-title-phone)", { "line-height": "var(--su-leading-title-phone)" }],
      section: ["var(--su-text-section)", { "line-height": "var(--su-leading-section)" }],
      "empty-title": ["var(--su-text-empty-title)", { "line-height": "var(--su-leading-empty-title)" }],
      body: ["var(--su-text-body)", { "line-height": "var(--su-leading-body)" }],
      small: ["var(--su-text-small)", { "line-height": "var(--su-leading-small-px)" }],
      micro: ["var(--su-text-micro)", { "line-height": "var(--su-leading-micro)" }],
      control: ["var(--su-text-control)", { "line-height": "var(--su-leading-control)" }],
      "control-sm": ["var(--su-text-control-sm)", { "line-height": "var(--su-leading-control-sm)" }],
      // v1 names → v2 roles
      "large-title": [
        "var(--su-text-display)",
        { "line-height": "var(--su-leading-display)", "letter-spacing": "var(--su-tracking-display)" },
      ],
      "title-1": [
        "var(--su-text-title)",
        { "line-height": "var(--su-leading-title)", "letter-spacing": "var(--su-tracking-tight)" },
      ],
      "title-2": ["var(--su-text-title-phone)", { "line-height": "var(--su-leading-title-phone)" }],
      "title-3": ["var(--su-text-section)", { "line-height": "var(--su-leading-section)" }],
      headline: ["var(--su-text-empty-title)", { "line-height": "var(--su-leading-empty-title)" }],
      callout: ["var(--su-text-body)", { "line-height": "var(--su-leading-body)" }],
      subhead: ["var(--su-text-body)", { "line-height": "var(--su-leading-body)" }],
      footnote: ["var(--su-text-small)", { "line-height": "var(--su-leading-small-px)" }],
      "caption-1": ["var(--su-text-small)", { "line-height": "var(--su-leading-small-px)" }],
      "caption-2": ["var(--su-text-micro)", { "line-height": "var(--su-leading-micro)" }],
      "label-type": ["var(--su-text-label)", { "line-height": "var(--su-leading-label-px)" }],
      // Handheld (390 wide)
      "hh-flow": ["var(--su-hh-text-flow)", { "line-height": "var(--su-hh-leading-flow)" }],
      "hh-step": ["var(--su-hh-text-step)", { "line-height": "var(--su-hh-leading-step)" }],
      "hh-key": ["var(--su-hh-text-key)", { "line-height": "var(--su-hh-leading-key)" }],
      "hh-value": ["var(--su-hh-text-value)", { "line-height": "var(--su-hh-leading-value)" }],
      "hh-question": [
        "var(--su-hh-text-question)",
        { "line-height": "var(--su-hh-leading-question)", "letter-spacing": "var(--su-tracking-tight)" },
      ],
      "hh-body": ["var(--su-hh-text-body)", { "line-height": "var(--su-hh-leading-body)" }],
      "hh-hint": ["var(--su-hh-text-hint)", { "line-height": "var(--su-hh-leading-hint)" }],
      "hh-band-line": ["var(--su-hh-text-band-line)", { "line-height": "var(--su-hh-leading-band-line)" }],
      "hh-big": ["var(--su-hh-text-big)", { "line-height": "var(--su-hh-leading-big)" }],
      "hh-primary": ["var(--su-hh-text-primary)", { "line-height": "var(--su-hh-leading-primary)" }],
      "hh-secondary": ["var(--su-hh-text-secondary)", { "line-height": "var(--su-hh-leading-secondary)" }],
      "hh-keypad": ["var(--su-hh-text-keypad)", { "line-height": "var(--su-hh-leading-keypad)" }],
    },
    // Square everywhere: every built-in radius step, `rounded-full` included, resolves to 0.
    // v2 shape: 4 for tags and chips, 6 for controls, 8 for surfaces; rows stay square
    // (`rounded-none` is still 0). Prefer the role keys (`rounded-su-control`, `rounded-su-tag`,
    // `rounded-su-surface`); the size steps map onto them so consumers' `rounded-lg` follows v2 too.
    borderRadius: {
      DEFAULT: "var(--su-radius-control)",
      none: "0",
      bar: "var(--su-radius-bar)",
      sm: "var(--su-radius-tag)",
      tag: "var(--su-radius-tag)",
      md: "var(--su-radius-control)",
      control: "var(--su-radius-control)",
      lg: "var(--su-radius-surface)",
      surface: "var(--su-radius-surface)",
      xl: "var(--su-radius-surface)",
      "2xl": "var(--su-radius-surface)",
      "3xl": "var(--su-radius-surface)",
      full: "9999px",
      su: "var(--su-radius-control)",
      "su-row": "var(--su-radius-row)",
      "su-bar": "var(--su-radius-bar)",
      "su-tag": "var(--su-radius-tag)",
      "su-control": "var(--su-radius-control)",
      "su-surface": "var(--su-radius-surface)",
      "su-pill": "var(--su-radius-pill)",
      "su-round": "var(--su-radius-round)",
    },
    // Overlays only (popover, menu, modal, drawer, toast); content stays flat.
    boxShadow: {
      "su-overlay": "var(--su-shadow-overlay)",
    },
    // The stacks live in tokens.css; the fallbacks keep IBM Plex when only the Uno config is used.
    fontFamily: {
      sans: 'var(--su-font-sans, "IBM Plex Sans", system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif)',
      mono: 'var(--su-font-mono, "IBM Plex Mono", ui-monospace, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace)',
      display: "var(--su-font-display, var(--su-font-sans))",
    },
    aria: {
      invalid: 'invalid="true"',
    },
    animation: {
      keyframes: {
        shimmer:
          "{0%{background-position:100% 0}100%{background-position:0 0}}",
        "su-fade-in": "{from{opacity:0}to{opacity:1}}",
        "su-rise-in":
          "{from{opacity:0;translate:0 8px}to{opacity:1;translate:0 0}}",
        // Popover and menu: fade + 4px drop, no scale.
        "su-dropdown-in":
          "{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:none}}",
        "su-slide-in":
          "{from{transform:translateX(16px)}to{transform:translateX(0)}}",
        "su-slide-in-left":
          "{from{transform:translateX(-16px)}to{transform:translateX(0)}}",
        // Modal: fade + 4px rise. The v2 modal is top-anchored, not centred with -50%.
        "su-scale-in":
          "{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}",
        // Radix Accordion sets --radix-accordion-content-height; Collapsible sets its own variable.
        "su-slide-down":
          "{from{height:0}to{height:var(--radix-accordion-content-height)}}",
        "su-slide-up":
          "{from{height:var(--radix-accordion-content-height)}to{height:0}}",
        "su-collapse-down":
          "{from{height:0}to{height:var(--radix-collapsible-content-height)}}",
        "su-collapse-up":
          "{from{height:var(--radix-collapsible-content-height)}to{height:0}}",
        "su-pop-in":
          "{from{opacity:0;transform:scale(0.96)}to{opacity:1;transform:scale(1)}}",
        "su-tip-in":
          "{from{opacity:0;transform:translateY(2px)}to{opacity:1;transform:translateY(0)}}",
        // The scan button's beam: sweeps start → end, fades over the last quarter.
        "su-scan-beam":
          "{from{inset-inline-start:0;opacity:1}75%{opacity:1}to{inset-inline-start:calc(100% - 2px);opacity:0}}",
        // One lit cell walking a rack of eight: each cell is on for 1/8 of the loop, offset by animation-delay.
        "su-slot-walk": "{0%,12.5%{opacity:1}12.51%,100%{opacity:0}}",
      },
      durations: {
        shimmer: "1.4s",
        "su-fade-in": "var(--su-duration-base)",
        "su-rise-in": "var(--su-duration-base)",
        "su-dropdown-in": "var(--su-duration-fast)",
        "su-slide-in": "var(--su-duration-base)",
        "su-slide-in-left": "var(--su-duration-base)",
        "su-scale-in": "var(--su-duration-fast)",
        "su-slide-down": "var(--su-duration-normal)",
        "su-slide-up": "var(--su-duration-normal)",
        "su-collapse-down": "var(--su-duration-normal)",
        "su-collapse-up": "var(--su-duration-normal)",
        "su-pop-in": "var(--su-duration-base)",
        "su-tip-in": "var(--su-duration-fast)",
        "su-scan-beam": "var(--su-duration-scan)",
        "su-slot-walk": "1120ms",
      },
      timingFns: {
        shimmer: "ease",
        "su-fade-in": "var(--su-ease-out)",
        "su-rise-in": "var(--su-ease-out)",
        "su-dropdown-in": "var(--su-ease-out)",
        "su-slide-in": "var(--su-ease-out)",
        "su-slide-in-left": "var(--su-ease-out)",
        "su-scale-in": "var(--su-ease-out)",
        "su-slide-down": "var(--su-ease-out)",
        "su-slide-up": "var(--su-ease-out)",
        "su-collapse-down": "var(--su-ease-out)",
        "su-collapse-up": "var(--su-ease-out)",
        "su-pop-in": "var(--su-ease-out)",
        "su-tip-in": "var(--su-ease-out)",
        "su-scan-beam": "var(--su-ease-scan)",
        "su-slot-walk": "var(--su-ease-step)",
      },
      counts: {
        shimmer: "infinite",
        "su-slot-walk": "infinite",
      },
    },
  },
  variants: [
    // transparency-reduce:  → @media (prefers-reduced-transparency: reduce)
    (matcher) => {
      if (!matcher.startsWith("transparency-reduce:")) return matcher;
      return {
        matcher: matcher.slice("transparency-reduce:".length),
        parent: "@media (prefers-reduced-transparency: reduce)",
      };
    },
    // forced-colors:  → @media (forced-colors: active)  (Windows High Contrast)
    (matcher) => {
      if (!matcher.startsWith("forced-colors:")) return matcher;
      return {
        matcher: matcher.slice("forced-colors:".length),
        parent: "@media (forced-colors: active)",
      };
    },
    // rtl:  → [dir="rtl"] &   (ConfigProvider sets `dir`)
    (matcher) => {
      if (!matcher.startsWith("rtl:")) return matcher;
      return {
        matcher: matcher.slice("rtl:".length),
        selector: (s) => `[dir="rtl"] ${s}`,
      };
    },
  ],
  // Shortcut values are NOT run through the variant-group transformer: keep them flat.
  shortcuts: {
    "su-hairline": "border border-rule border-solid forced-colors:border-[CanvasText]",
    "su-rule": "bg-separator forced-colors:bg-[CanvasText]",
    "su-frame": "bg-surface text-ink border border-solid border-border rounded-su-surface",
    // Focus ring: 2px `--su-focus` outline, 2px offset. An outline follows the element's own
    // border-radius, so the ring is as round as the control. Put it on anything that sets outline-none.
    "su-focus-ring":
      "outline-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-focus focus-visible:outline-offset-[var(--su-focus-ring-offset)]",
    // Label: sans 13/18 500 ink-2, sentence case (field labels, table headers, group labels).
    // No uppercase, no tracking, no width axis, no mono. A caller's colour utility wins over ink-2.
    "su-label": "font-sans text-label-type font-medium text-ink-2",
    // Floating surface for menus, listboxes and popovers: 8 radius, hairline, overlay shadow.
    "su-popover":
      "z-[var(--su-z-dropdown)] p-su1 font-sans rounded-su-surface border border-solid border-border bg-surface-overlay shadow-su-overlay",
    // Boxed white panel on the grey ground (tables, cards, settings groups).
    "su-panel": "bg-surface border border-solid border-border rounded-su-surface overflow-hidden",
    // Figures that line up in columns (numeric cells, meters, counters, Statistic).
    "su-tabular": "[font-variant-numeric:tabular-nums]",
    // Identifiers (SKU, SO/PO numbers, bins, lots): the row identity, and a supporting identifier.
    "su-id": "font-mono font-medium text-ink",
    "su-id-2": "font-mono text-small text-ink-2",
    // 32px visible, 44px to press: a centred pseudo-element carries the hit slop.
    "su-hit-44":
      "relative [&::after]:content-empty [&::after]:absolute [&::after]:left-1/2 [&::after]:top-1/2 [&::after]:-translate-x-1/2 [&::after]:-translate-y-1/2 [&::after]:w-[var(--su-hit-target)] [&::after]:h-[var(--su-hit-target)]",
    "su-no-spinner":
      "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0",
    "border-none": "[border-style:none]",
    "su-skeleton-active":
      "bg-[linear-gradient(90deg,var(--su-fill)_25%,var(--su-surface-2)_37%,var(--su-fill)_63%)] bg-[length:400%_100%] animate-shimmer motion-reduce:animate-none",
    "su-overlay":
      "fixed inset-0 z-[var(--su-z-overlay)] bg-[var(--su-scrim)] animate-su-fade-in motion-reduce:animate-none",
    // Lightbox strength: content behind is suppressed so white-on-scrim copy keeps contrast.
    "su-overlay-strong":
      "fixed inset-0 z-[var(--su-z-overlay)] bg-[var(--su-scrim-strong)] animate-su-fade-in motion-reduce:animate-none",
    // Hairline rim for the nav material; the tokens already lift it under prefers-contrast.
    "su-chrome": "shadow-[0_0_0_1px_var(--su-chrome-border)]",
    "su-chrome-strong": "shadow-[0_0_0_1px_var(--su-chrome-border-outer)]",
  },
  // Scan library + playground for class generation during dev/build
  content: {
    filesystem: [
      "src/**/*.{ts,tsx}",
      "playground/**/*.{ts,tsx}",
    ],
  },
});
