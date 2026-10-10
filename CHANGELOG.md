# Changelog

## 0.2.0: Lattice UI v2

The library now draws Lattice UI v2: a grey ground with white panels, IBM Plex Sans and Mono, a 4 / 6 / 8 radius scale, overlay shadows, five opaque status tones, 36px default controls and a handheld density. Every export, prop and `--su-*` name from 0.1 still exists. Renamed tokens are aliases, and deprecated props compile and do nothing. What changes is the look, and the defaults listed below.

### Release A: what the Lattice boards needed (additive, still 0.2.0)

Nothing is removed and no default changes its look. Two fixes change behaviour, both noted below.

- **Table `stack`** (`"sm" | "md" | "lg" | "xl"`, off by default): below that breakpoint the same `<table>` is drawn as a list of records, with no sideways scroll. The header row is not drawn, a `Table.Row` is a wrapping block with its `meta` folded in as its last line, cells lose their padding, rule and column alignment, and the roles follow: `list` on the table, `listitem` on every row, group row, fold row and detail. A table nested in a `Table.Detail` follows its parent. There is one tree in the DOM at every width. Stacked, a `Table.Meta` wraps instead of cutting its text, and an empty cell takes no place.
- **Table.Row `metaRowProps`** reach the second `<tr>` of a row with a meta line, and **Table.Detail `rowProps`** reach the detail's own `<tr>`. The other props land where they did: on the first `<tr>` and on the detail's `<td>`. The type `TableRowAttributes` accepts `data-*` keys in an object literal.
- **Select** forwards its other props (`aria-label`, `aria-labelledby`, `data-testid`, `id`, `autoFocus`…) to its trigger, and gains **`variant="ghost"`**: no border and no ground, 36 tall, padding 0 10, `fill` under a pointer and while open, sized to its content (a header's site switcher). On a ghost trigger an option's `code` is mono 600, `prefix` is a leading slot 8 before the value (an icon), and under `(hover: none)` the 36 box has a 44 hit area.
- **Switch** (fix): a switch that has a name of its own keeps it when it also has state words. The name is the FormItem's label, `aria-label` or `aria-labelledby`, and the words are then visual only (`aria-hidden`), since the switch role already announces the state. Before, the words were added to the name ("Active On") and `aria-label` was dropped. A switch with no other name is still named by its words. `children` may be a function of the state: `{(on) => (on ? "On" : "Off")}`. Every switch in a labelled FormItem now carries `aria-labelledby` pointing at that label, with or without state words; its accessible name is the same label text as before.
- **ResultBand** (fix): the title and the lines wrap at words instead of ending in an ellipsis, so a refusal that is a whole sentence can be read. When the title and the signal do not fit side by side, the signal drops to a line of its own under the title. One-line bands keep their 88 and 110 heights.
- **HandheldTopBar**: `backDisabled` and `sessionDisabled` disable the two buttons in place (ink-3); `flowAs="h1" | "h2" | "h3"` renders the flow name as a heading (default `span`); and the session block now shrinks and cuts a long site or operator with an ellipsis instead of widening the page (fix).
- **Token `--su-inverse-ink-2`** (`text-inverse-ink-2`): secondary text on the inverse surface, `#cdd2d9` in light and `#525866` in dark.

### Breaking changes

1. **`--su-bg` changes meaning.** It is now the grey app ground (`#f4f5f7`), so `body` and `Surface tone="system"` turn grey. Use `--su-surface` (or `bg-surface`) for white panels.
2. **Default sizes are `md` (36px), not `lg` (48px)**, for `Button`, `Input`, `Select`, `Form` and the pickers. `--su-button-height` is 36.
3. **Button**: the scan beam, end cell, pixel ripple and invert hover are gone, and `hideEndCell` is a no-op. `variant="secondary"` is a new alias of `default`. `danger` has a form for every variant; the solid red primary is only for confirming a destructive action. Disabled uses the fill colour, not opacity.
4. **Tag**: `color="default"` renders neutral. `info` is added, and `closable` renders the filter chip.
5. **Badge**: `variant="default"` becomes neutral. `accent` and `info` are added. Count pills are sans.
6. **Card** is always boxed. `state`, `bordered` and `interactive` are deprecated (`interactive` only steps the border up on hover). `variant="panel"` and `href` are added.
7. **Table** is always a panel. `striped` and `bordered` are no-ops. The header is sans 13/18 in sentence case, and row heights come from tokens (header 36, rows 40).
8. **Drawer** defaults to 480 wide. **Modal** is anchored 96 from the top and 480 wide, with `size` sm 400 / md 480 / lg 640.
9. **Alert** loses its 3px left rule and gains a `neutral` type, which is the new default.
10. **Typography**: `label` is sans 13/18 500, not 11px uppercase mono. `id` and `idSecondary` are added, and the tones read the `--su-*-text` tokens.
11. **New**: `Kbd`, `StatusDot`, `Panel`, the Input `mono` prop, code + name Select options (`SelectOption.code`), the `data-density="handheld"` scope (`ConfigProvider density`), and the handheld components `HandheldTopBar`, `Docket`, `ScanField`, `QuantityStepper`, `Keypad` and `ResultBand`.

### Also

- **Fonts ship with the package.** `styles.css` carries the IBM Plex `@font-face` rules; the files are in `dist/fonts` and exported as `synapse-ui/fonts/*`. Geist and Martian Mono are removed.
- **UnoCSS `borderRadius` rounds now.** `rounded-md` is 6 and `rounded-lg` is 8, and the new role keys are `rounded-su-tag`, `-control` and `-surface`. `rounded-none` is still 0.
- **The `su-label` shortcut** is sans 13/18 500 ink-2, and `su-popover` gets the overlay shadow. The new shortcuts are `su-panel`, `su-tabular`, `su-id` and `su-id-2`.
- **Hover styles apply only under `(hover: hover)`.** 44px hit areas apply only under `(hover: none)`.
- **Deprecated:** `BorderBeam` (no v2 surface uses it) and `SlotSpinner` for loading (Spin and Button use a ring spinner). Both are still exported.
- **`npm run test:browser`** accepts `SU_BASE_URL` or `--base=` to target a server other than `:5173`.
