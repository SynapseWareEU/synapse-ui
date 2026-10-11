# Changelog

## 0.2.0: Lattice UI v2

The library now draws Lattice UI v2: a grey ground with white panels, IBM Plex Sans and Mono, a 4 / 6 / 8 radius scale, overlay shadows, five opaque status tones, 36px default controls and a handheld density. Every export, prop and `--su-*` name from 0.1 still exists. Renamed tokens are aliases, and deprecated props compile and do nothing. What changes is the look, and the defaults listed below.

### Release A: what the Lattice boards needed (additive, still 0.2.0)

Nothing is removed and no default changes its look. Two fixes change behaviour, both noted below.

- **Table `stack`** (`"sm" | "md" | "lg" | "xl"`, off by default): below that breakpoint the same `<table>` is drawn as a list of records, with no sideways scroll. The header row is not drawn, a `Table.Row` is a wrapping block with its `meta` folded in as its last line, cells lose their padding, rule and column alignment, and the roles follow: `list` on the table, `listitem` on every row, group row, fold row and detail. A table nested in a `Table.Detail` follows its parent. There is one tree in the DOM at every width. Stacked, a `Table.Meta` wraps instead of cutting its text, and an empty cell takes no place.
- **Table.Row `metaRowProps`** reach the second `<tr>` of a row with a meta line, and **Table.Detail `rowProps`** reach the detail's own `<tr>`. The other props land where they did: on the first `<tr>` and on the detail's `<td>`. The type `TableRowAttributes` accepts `data-*` keys in an object literal.
- **Select** forwards its other props (`aria-label`, `aria-labelledby`, `data-testid`, `id`, `autoFocus`…) to its trigger, and gains **`variant="ghost"`**: no border and no ground, 36 tall, padding 0 10, `fill` under a pointer and while open, sized to its content (a header's site switcher). On a ghost trigger an option's `code` is mono 600, `prefix` is a leading slot 8 before the value (an icon), and under `(hover: none)` the 36 box has a 44 hit area.
- **Select `compact`** (ghost only): the phone form of the ghost trigger, as in a phone header. It shows the chosen option's `code` alone, in a 44 tall box with padding 0 8 and 6 before the chevron; the list keeps the code and name pair. It replaces `size`.
- **Switch** (fix): a switch that has a name of its own keeps it when it also has state words. The name is the FormItem's label, `aria-label` or `aria-labelledby`, and the words are then visual only (`aria-hidden`), since the switch role already announces the state. Before, the words were added to the name ("Active On") and `aria-label` was dropped. A switch with no other name is still named by its words. `children` may be a function of the state: `{(on) => (on ? "On" : "Off")}`. Every switch in a labelled FormItem now carries `aria-labelledby` pointing at that label, with or without state words; its accessible name is the same label text as before.
- **ResultBand** (fix): the title and the lines wrap at words instead of ending in an ellipsis, so a refusal that is a whole sentence can be read. When the title and the signal do not fit side by side, the signal drops to a line of its own under the title. One-line bands keep their 88 and 110 heights.
- **HandheldTopBar**: `backDisabled` and `sessionDisabled` disable the two buttons in place (ink-3); `flowAs="h1" | "h2" | "h3"` renders the flow name as a heading (default `span`); and the session block now shrinks and cuts a long site or operator with an ellipsis instead of widening the page (fix).
- **Popover `sideOffset`** (px, default 4, as before): the distance from the trigger, for a trigger inside a frame the overlay must clear, such as a rail tile whose panel opens 8 past the rail's edge.
- **AutoComplete `selectedValue`**: the `value` of the option the caller holds. That option is marked `aria-selected`, whatever the box reads. Without it the option whose `label` equals the visible text is marked, as before, which a box showing a code + name pair on one line never matched.
- **Popover `aria-label`** names the overlay, which is a `dialog` and had no name unless its content held a heading. And a fix: the overlay's scroller is now its whole padding box, so a focus ring at the content's edge (a search field at the top of a facet panel) is no longer cut on three sides, and a rule inside may reach the border with `-mx-su2`. The box, its padding and its height are as before.
- **Pagination `labels.page`** (keyset): the sentence announced after a move, in place of the English "Page 3". `null` announces nothing, for a cursor list that keeps no count of its pages. Left out, the announcement is as before.
- **Checkbox `row` and `trailing`**: the overlay-row form (full width, 32 high and 44 on touch, padding 0 8, radius 6, hover ground, label cut with an ellipsis) and a count at the end of the line (13/18 ink-2, tabular). For the values of a facet popover.
- **Table.Th** (fix): the row a header lays its label, sort arrow and facet out in no longer outgrows its track in a fixed-layout table, so a label that cuts itself ends in an ellipsis with the arrow and the funnel still in view.
- **Token `--su-inverse-ink-2`** (`text-inverse-ink-2`): secondary text on the inverse surface, `#cdd2d9` in light and `#525866` in dark.

### Release A2: fix-ups from the first Lattice screens (additive, still 0.2.0)

Nothing is removed. Three fixes change what is drawn; each is noted.

- **Table `stack`** (fix): in the stacked shape an identifier or number cell (`kind="id"`, `"idSecondary"`, `"number"`, or `numeric`) no longer keeps `white-space: nowrap`. It is capped at the record's width and breaks anywhere, so a value wider than the record (an SSCC, a long lot) wraps inside it instead of being cut at the panel's edge, where nothing scrolls. A value that fits still sits on one line, and at desk width these cells keep to one line as before.
- **Skeleton `label`**: what a screen reader hears, in place of the English "Loading" (still the default). `label={null}` makes the skeleton decoration only, for a caller that announces the state itself: `aria-hidden`, no `status` role, no `aria-busy`, no text in the DOM.
- **Typography `title1`** (fix): below `sm` (640) it takes the phone title on its own, 22/28 600 at −0.01em (−0.22px). From `sm` up it is 24/32 as before. A caller's `max-sm:!text-title-phone` override still works and is no longer needed.
- **Panel `titleAs`** (`"h2"` … `"h6"`, default `"h3"`): the title's heading element, so a page's main section can be an `h2`. The look and the panel's name do not change.
- **Input `revealLabel`** names the reveal button of a password field (default "Show password"), and **`clearLabel`** the clear button (default "Clear").
- **TextArea**: a multi-line field with the Input's look (`size`, `mono`, every `<textarea>` attribute). In a `FormItem` it takes its id, required mark, description and error from it. `inputClass` and `inputSizeClass` are exported for a field the library does not draw.
- **Modal `closeLabel`** names the close button (default "Close"), and **`aria-label`** names a dialog that has no `title` (default "Dialog").
- **Modal, Message and Notification** (fix): `--su-content-inset-start` now comes off their width as well as moving them, so with a rail's inset set at phone width a toast or a dialog ends inside the viewport. With no inset set, nothing changes.

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
