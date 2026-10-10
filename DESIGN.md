# Synapse UI design language: Lattice UI v2

Lattice UI v2 is the visual language for SynapseWare product screens: warehouse desks and the 390-wide handheld terminal. It starts from the SynapseWare brand guide and deliberately departs from it where dense, all-day data work needs something else. The departures, and the reasons, are listed at the end.

Values here are exact. The source of truth is `src/styles/tokens.css`; the workbench's **Design tokens** page reads every value back from the live page.

## Principles

1. **The data is the loudest thing on the screen.** Chrome, labels and state recede; the rows people act on do not.
2. **One primary per screen.** Action blue fills exactly one button. Everything else is secondary, ghost or a link.
3. **A grey ground, white panels.** The app background is grey (`--su-bg`); lists, tables and forms sit in white bordered panels. Every screen gets the same frame.
4. **State is spelled out.** Status uses five opaque tones and always comes with a word. Colour is never the only signal.
5. **Round what you press, square what you read.** Controls are 6px, tags 4px, surfaces 8px; table rows stay square.
6. **Flat content, lifted overlays.** Only popovers, menus, dialogs, drawers and toasts cast a shadow.

## Colour

Design to roles, never raw hex. Every role is a `--su-*` variable and a UnoCSS colour of the same name (`bg-surface`, `text-ink-2`, `border-border-strong`).

### Neutrals (light)

| Token | Value | Role |
| --- | --- | --- |
| `--su-bg` | `#f4f5f7` | App ground (the page behind the panels) |
| `--su-surface` | `#ffffff` | Panels, inputs, secondary buttons |
| `--su-surface-2` | `#f8f9fb` | Table header, group and expanded rows, read-only fields |
| `--su-surface-hover` | `#f8f9fb` | Row and item hover |
| `--su-surface-overlay` | `#ffffff` | Popover, menu, modal, drawer, toast |
| `--su-fill` | `#eef0f3` | Chips, segmented track, key hints, keypad keys, meter track, ghost hover |
| `--su-border` | `#e3e6ea` | Hairlines, row rules, panel outline |
| `--su-border-strong` | `#cdd2d9` | Input and secondary-button borders |
| `--su-border-control` | `#8a919d` | Unchecked checkbox and radio (3:1) |
| `--su-ink` | `#111418` | Text |
| `--su-ink-2` | `#525866` | Secondary text, labels, icons inside controls (7.1:1) |
| `--su-ink-3` | `#6f7684` | Placeholders, disabled text, “—”, decorative glyphs; on `surface` only (4.56:1) |

### Action

| Token | Value | Role |
| --- | --- | --- |
| `--su-action` | `#1d4ed8` | Primary fill, checked controls, switch on |
| `--su-action-hover` / `-press` | `#1e40af` / `#1e3a8a` | Primary hover and press |
| `--su-action-subtle` / `-hover` | `#eef4ff` / `#dde8ff` | Selected row, nav item, filter chip, toggle |
| `--su-action-text` / `-hover` | `#1d4ed8` / `#1e40af` | Links, selected text |
| `--su-focus` | `#1d4ed8` | The focus outline |

### Status tones

Each tone has a **text** colour, a **tint** background, a **line** border, a **solid** for dots and meters, and (danger, warning, success, info) a **strong** fill that carries white text.

| Tone | text | tint | line | solid | strong |
| --- | --- | --- | --- | --- | --- |
| neutral | `#525866` | `#f2f4f7` | `#e3e6ea` | `#6f7684` | — |
| info | `#175cd3` | `#eff8ff` | `#b2ddff` | `#2e90fa` | `#175cd3` |
| success | `#067647` | `#ecfdf3` | `#abefc6` | `#17b26a` | `#067647` |
| warning | `#b54708` | `#fffaeb` | `#fedf89` | `#f79009` | `#b54708` |
| danger | `#b42318` | `#fef3f2` | `#fecdca` | `#d92d20` | `#b42318` |

- Info means work in progress, nothing else.
- Warning and success solids are below 3:1 on white, so a dot or meter in those tones always sits next to a word.
- Strong fills are the handheld result bands and the danger primary button. They keep their light values in dark mode, so white stays at 5.4–6.6:1.

### Dark

Dark is defined, not drawn: a cool grey ramp (`bg #0e1013`, `surface #16191d`, `ink #eceef1`), action `#2563eb`, action text `#8fb3ff`, and re-tinted status tints. Every text pair is at least 4.5:1. `[data-theme="dark"]` and OS dark without a `data-theme` attribute share one set of values.

### Brand ramp

Navy, blue, cyan, teal, mint, the `--su-s-*` slot states and `--su-beam` are unchanged. They belong to shaders and marketing surfaces; no v2 component uses them.

## Typography

- **IBM Plex Sans** for everything that is not an identifier: words, numbers, quantities, dates, times, units, counts, labels, tags, key hints, step numerals, page numbers.
- **IBM Plex Mono** only for identifiers read character by character: SKUs, SO/PO/SHP numbers, bins and locations, lots, SSCC/GTIN, partner and site codes, terminal ids, usernames, hex values.
- Weights 400, 500 and 600. No italics, no uppercase, no letter-spaced labels, nothing below 12px.
- Both families ship with the library as self-hosted woff2 (latin and latin-ext).

### Desk scale

| Role | Size / line | Weight | Typography variant |
| --- | --- | --- | --- |
| Display | 32/40 | 600, −0.01em | `largeTitle` |
| Page title | 24/32 | 600, −0.01em | `title1` |
| Phone page title | 22/28 | 600 | `title2` |
| Section title (panel, drawer, modal) | 16/24 | 600 | `title3` |
| Empty-state title | 15/22 | 600 | `headline` |
| Body and cells | 14/20 | 400 | `body`, `callout` |
| Card title | 14/20 | 600 | `subhead` |
| Small (meta, help, footers) | 13/18 | 400 | `footnote`, `caption1` |
| Label (fields, table headers, groups) | 13/18 | 500, ink-2 | `label` |
| Micro (key hints, count pills) | 12/16 | 500 | `caption2` |
| Row identity | mono 14/20 | 500 | `id` |
| Supporting identifier | mono 13/18 | 400, ink-2 | `idSecondary` |
| Identifier in prose | mono 0.9em | inherits | `code` |

### Handheld scale (390 wide)

Flow name 20/26 600 · step counter 17/24 500 · question 28/34 600 · docket key 18/24 500 · docket value mono 24/30 600 · body 17/24 (17 is the floor) · hint and placeholder 18/26 · big quantity 64/64 600 · primary button 22/28 600 · secondary 20/28 500 · keypad key 28/34 500.

### Formatting

Thousands with a narrow no-break space (“2 290”), decimal comma (“11,5”), units in 13/18 ink-2 after a number in a cell (“80 buc”), dates as “25.09.2026”, an empty cell as “—” in ink-3 with an `aria-label` that says why.

## Shape

| Token | Value | Used for |
| --- | --- | --- |
| `--su-radius-row` | 0 | Table rows and full-bleed rows |
| `--su-radius-bar` | 2 | Meters, step segments |
| `--su-radius-tag` | 4 | Tags, chips, key hints, checkboxes, rows inside overlays, 24px icon buttons |
| `--su-radius-control` | 6 | Buttons, inputs, selects, segmented track, search |
| `--su-radius-surface` | 8 | Panels, cards, popovers, modal, toasts, every handheld control |
| `--su-radius-pill` | 9999px | Count pills, switch |

Utilities: `rounded-su-tag`, `rounded-su-control`, `rounded-su-surface` and friends. The generic steps map onto the roles (`rounded-md` is 6, `rounded-lg` is 8); `rounded-none` stays 0.

## Elevation

Content is flat: panels are a white surface with a 1px border and no shadow. Overlays (popover, menu, listbox, modal, drawer, toast) add `--su-shadow-overlay`:

```css
0 1px 2px rgba(16, 24, 40, 0.05), 0 12px 32px -4px rgba(16, 24, 40, 0.16)
```

Modal and drawer sit over `--su-scrim` (`rgba(17, 20, 24, 0.4)`).

## Density and sizes

**Desk** (default): controls 24 / 28 / 32 / **36** / 48 (`--su-control-mini`, `-xs`, `-sm`, `-md`, `-lg`). Buttons and fields default to 36. Table header 36, rows 40, a row with a meta line 60, nested rows 32. App header 56, rail 64, tabs 40, panel header and footer 44, drawer 480, modal 480 at 96 from the top, toasts 360.

**Handheld** (`data-density="handheld"`, or `<ConfigProvider density="handheld">`): the generic controls grow to 56 (secondary, fields) and 64 (primary), radius 8, 17px body, 18px labels, 2px field borders that turn action on focus. The handheld components (`HandheldTopBar`, `Docket`, `ScanField`, `QuantityStepper`, `Keypad`, `ResultBand`) read the `--su-hh-*` tokens directly and keep their size anywhere. Handheld is designed light-first.

Spacing is a 4px scale (`--su-space-1` … `--su-space-16`). Page padding is 24 32 (16 on a phone); page blocks are 16 apart; toolbar items 8 apart inside a group, groups 16 apart.

## State model

| State | Rule |
| --- | --- |
| Focus | 2px `--su-focus` outline, 2px offset, following the element's radius. Handheld fields draw a 2px action border instead. Menu, listbox and palette items show the highlighted background instead. |
| Hover | Only under `(hover: hover)`. Primary → action-hover; secondary and select-like → surface-2; ghost and icon → fill + ink; rows and items → surface-hover; links → action-text-hover + 1px underline. Fields do not change. |
| Press | Primary → action-press; secondary → fill; ghost → border. |
| Selected | Lists and nav: action-subtle + action-text. Tabs: ink text + a static 2px action underline. Segmented: raised thumb with a 1px border. Toggles: action-subtle + 1px action border. |
| Disabled | No opacity. Filled controls: fill background, ink-3 text. Ghost and links: ink-3. Fields: surface-2, border, ink-3. |
| Invalid | Danger border (1px desk, 2px handheld) and a message below with an alert icon. |
| Loading | Full contrast, a ring spinner in place of the leading icon, `aria-busy`. Never drawn disabled. |
| Open | A trigger with an open popup keeps its hover look. |

Touch screens (`(hover: none)`) get 44px hit areas on anything smaller; on desk, the visible size is the target.

## Motion

Short and quiet: popover and menu fade + 4px in 150ms; modal fade + 4px in 150ms; drawer 16px slide + fade in 240ms; toast 8px rise in 240ms; collapse 240ms. Everything goes to none under `prefers-reduced-motion`. No decorative motion on content.

## Icons

Tabler, stroke 1.75, round caps and joins, `currentColor`. 14 (sort arrows, chip remove, field errors), 16 (the default inside 36px controls), 18 (32px icon buttons, toasts), 20 (rail, phone header), 24 and 28 on handheld. Ink-2 inside controls; ink-3 for chevrons and adornments.

## Accessibility

- Text pairs meet WCAG 2.x AA in light and dark. The one narrow case is ink-3 (4.56:1 on white), which is why it is used only on `surface`, and only for placeholders, disabled text, “—” and decorative glyphs.
- Input and secondary-button borders (`border-strong`, 1.52:1) are kept as drawn; unchecked checkboxes and radios use `border-control` (3.17:1) so the control boundary meets WCAG 1.4.11.
- `prefers-contrast: more` darkens borders and secondary ink; `forced-colors: active` maps the tokens to system colours, and dots, meters and switch tracks opt out of forced colours so their state stays visible.
- Glass (`Header material="glass"`) falls back to an opaque surface under `prefers-reduced-transparency`.

## Where v2 departs from the brand guide, and why

| Brand guide / synapse-ui 0.1 | Lattice UI v2 | Why |
| --- | --- | --- |
| Geist for copy, Martian Mono for codes, labels and specs | IBM Plex Sans for everything, IBM Plex Mono for identifiers only | Chosen by the owner. Plex reads well at 13–14px in dense tables, has tabular figures, and covers Romanian. Keeping mono for identifiers makes codes stand out instead of every label. |
| Uppercase mono labels at 11px, 0.04em tracking, 112.5% width | Sans 13/18 500 ink-2, sentence case | The old label was louder than the data under it. |
| Square everywhere; no radius token rounds | 4 tags, 6 controls, 8 surfaces; rows stay square | At 28–36px, square buttons and chips read as table cells. A small radius separates things you press from data you read. |
| No shadows; depth from hairlines | Content flat; overlays get a soft shadow and a border | The v1 audit found flat flyouts blending into the page. |
| Paper page, canvas panels, “bay” cards with a top rule | Grey ground, white bordered panels | Separates the work area from the controls and gives every screen one frame. |
| 48px buttons and fields | 36px default (28 in rows, 48 rare) | 48 is marketing-sized; it cost a row per screen on desk. |
| Warm Apple-like greys | Cool grey ramp, ink-2 at 7:1 | Tuned to Plex and to AA contrast. |
| Ant Design status colours, derived with `color-mix` | Five opaque tones: text, tint, line, solid, strong | Predictable contrast, one recipe for tags, alerts, bands and dots. |
| Scan-beam primary with an end cell; pixel-ripple secondary that inverts to ink | Plain filled primary; white secondary with a hairline | The end cell broke left-packed toolbars and 28px row buttons; the invert made the secondary louder than the primary; the ripple created DOM per button. |
| Tabs indicator draws in; interactive card sweeps an accent bar | Static underline; card border steps up on hover | Weight and position never change; motion stays off content. |
| Focus: 2px, 3px offset, square | 2px, 2px offset, following the radius | Matches the rounded controls. |

### Kept from the brand

- Action blue `#1d4ed8` as the one action colour.
- Self-hosted fonts; nothing from a font CDN.
- 44px touch targets, `prefers-contrast`, `forced-colors`, reduced motion and RTL support.
- The glass material, now opt-in and only for a header that content scrolls under (`Header material="glass"`); never on content, never stacked, never on overlays.
- The brand ramp, slot states, `SlotSpinner` and the shaders, for marketing and brand surfaces only.
- `BorderBeam` stays exported but deprecated; no v2 surface uses it.

## Token prefix

Every CSS variable uses `--su-*`. All v1 names still exist: the renamed ones are aliases (`--su-paper` → `--su-surface`, `--su-canvas` → `--su-bg`, `--su-rule` → `--su-border`, `--su-accent` → `--su-action-text`, …), declared on every themed element so they follow nested themes. Override tokens through `ConfigProvider tokens` or plain CSS on any element.
