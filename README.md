# Synapse UI

The React component library for SynapseWare apps, including Lattice. Version 0.2 carries **Lattice UI v2**: white panels on a grey ground, one action blue, five opaque status tones, 6px controls, IBM Plex Sans and IBM Plex Mono, and a handheld density for the 390-wide warehouse terminal.

It is built on Radix UI primitives and styled with UnoCSS utilities over semantic `--su-*` CSS variables. The design language is in [DESIGN.md](./DESIGN.md), what changed in 0.2 is in [CHANGELOG.md](./CHANGELOG.md), and the product brief is in [PRODUCT.md](./PRODUCT.md).

## Install

`dist/` is committed, so a git dependency installs without a build toolchain. Pin a tag or a commit:

```sh
npm install github:HEAPTRASH/synapse-ui#<tag-or-commit>
```

Or pack a local checkout:

```sh
npm run build
npm pack
# then, in your application
npm install /path/to/synapse-ui-0.2.0.tgz
```

React and React DOM 18 or 19 are peer dependencies. The package ships ESM, CommonJS and TypeScript declarations.

## Use

Import the stylesheet once, at the root, and wrap the app in `App`:

```tsx
import { App, Button } from "synapse-ui";
import "synapse-ui/styles.css";

export default function MyApp() {
  return (
    <App theme="light" locale="ro-RO">
      <Button variant="primary">Confirmă recepția</Button>
    </App>
  );
}
```

`synapse-ui/styles.css` is the whole visual layer in one file: the IBM Plex `@font-face` rules, the tokens (light, dark, handheld, increased contrast, forced colours, reduced motion), a small reset, and every component utility. The JavaScript bundle does not import it, so import it yourself, once.

`App` is `ConfigProvider` plus the shared feedback APIs: `useApp().message`, `useApp().notification` and `useApp().modal`.

## Fonts ship with the library

IBM Plex Sans (variable, weights 400–700) and IBM Plex Mono (400, 500, 600 and 700) are self-hosted as woff2, in latin and latin-ext subsets. The latin-ext subset carries the Romanian ș, ț, ă, â and î. Nothing loads from a font CDN, because installations are on-prem.

- The `@font-face` rules are inside `styles.css`. Their URLs are relative (`../fonts/…`) and resolve from `dist/assets/styles.css` to `dist/fonts/`. Vite, webpack and other bundlers follow them and emit the files with the rest of your assets. There is nothing else to configure.
- The files are also exported as `synapse-ui/fonts/*`, for example to preload the faces the first screen needs (Vite):

  ```ts
  import plexSans from "synapse-ui/fonts/IBMPlexSans-Variable-latin.woff2?url";
  ```

- The licence is `dist/fonts/IBM-Plex-OFL.txt` (SIL Open Font License 1.1).

## Share the UnoCSS theme (optional)

Components need nothing beyond `styles.css`. If your application also uses UnoCSS and wants the same utilities (`bg-surface`, `text-ink-2`, `border-border`, `rounded-su-control`, `shadow-su-overlay`, `su-panel`, `su-label`, `su-id`…), spread the library's config into yours and scan your own sources:

```ts
// uno.config.ts
import { defineConfig } from "unocss";
import synapse from "synapse-ui/uno.config";

export default defineConfig({
  ...synapse,
  content: { filesystem: ["src/**/*.{ts,tsx}"] },
});
```

The v1 keys (`bg-paper`, `border-rule`, `text-label`, `text-accent`…) still work: they resolve through token aliases to the v2 values. Prefer the v2 names in new code. The `rounded-*` steps now round (`rounded-md` is 6, `rounded-lg` is 8); `rounded-none` stays 0.

## Theme, density and tokens

```tsx
<App theme="dark">…</App>                             // "light" (default) or "dark"
<ConfigProvider density="handheld">…</ConfigProvider> // 56 / 64 controls, 17px body
<App tokens={{ action: "#1d4ed8" }}>…</App>           // any --su-* token, with or without the prefix
```

- `theme` sets `data-theme` on `<html>` (root provider) or on a wrapper `<div>` (nested provider).
- `density="handheld"` sets `data-density="handheld"`. Generic controls re-size through the tokens. The handheld components (`HandheldTopBar`, `Docket`, `ScanField`, `QuantityStepper`, `Keypad`, `ResultBand`) always keep their terminal size. Without React, put the attribute on any element.
- Portalled UI (Modal, Drawer, Popconfirm, Select lists, Dropdown, toasts) mounts under `document.body` and follows the **root** provider, not a nested one.
- The raw token file is exported as `synapse-ui/tokens.css` for tools that need the variables without the components.

## Catalog

| Category | Components |
| --- | --- |
| General | Button, FloatButton, Icon / SvgIcon, **Kbd**, Typography (Title, Text, Paragraph) |
| Layout | Divider, Flex, Grid (Row / Col), Layout (Header / Sider / Content / Footer), Masonry, Space, Splitter |
| Navigation | Anchor, Breadcrumb, Dropdown, Menu, Pagination, Steps, Tabs |
| Data Entry | AutoComplete, Cascader, Checkbox, ColorPicker, DatePicker / DateRangePicker, Form (FormItem, FormLabel, **FormSection**, **FormActions**), Input, InputNumber, Mentions, Radio, Rate, Select, Slider, Switch, TimePicker, Transfer, TreeSelect, Upload |
| Data Display | Avatar, Badge, Calendar, Card, Carousel, Collapse, Descriptions, Empty, Image, List, Listy, **Panel**, Popover, QRCode, Segmented, Statistic, **StatusDot**, Table (Head, Body, Row, Th, Td, **GroupRow**, **Disclosure**, **Facet**, **Detail**, **FoldRow**, **Meta**, **SkeletonRow**), Tag, Timeline, Tooltip, Tour, Tree |
| Feedback | Alert, Drawer, Message, Modal, Notification, Popconfirm, Progress, Result, Skeleton, Spin, Watermark |
| Handheld | **HandheldTopBar**, **Docket** / DocketRow, **ScanField**, **QuantityStepper**, **Keypad** (with `applyKeypadKey`), **ResultBand** |
| Materials | Glass (opt-in header material), Chrome, Surface |
| Other | Affix, App, BorderBeam (deprecated), ConfigProvider |
| Shaders | PaperTexture, Dithering, DotGrid, MeshGradient, NeuroNoise, PulsingBorder, Warp, LightField. Brand and marketing surfaces, unchanged in v2 |

Entries in bold are new in 0.2.

## Conventions

- **One primary per screen.** `Button variant="primary"` is the one action. `secondary` (an alias of `default`), `ghost`, `dashed` and `text` carry the rest. `danger` gives each a destructive form, and `primary danger` is only for confirming a destructive action. Sizes are `sm` 28, `md` 36 (default) and `lg` 48. `aria-pressed` makes any variant a toggle.
- **Mono is for identifiers only**: SKUs, order numbers, bins, lots, partner and site codes. Numbers, dates, units and counts are sans. Use `Typography variant="id"` or `"idSecondary"`, `Input mono`, `Table.Td kind="id"`, `SelectOption.code`, or the `su-id` and `su-id-2` utilities.
- **Status is never colour alone.** A `StatusDot` or a Tag dot always sits next to a word, because the warning and success solids are below 3:1.
- **Forms**: labels above fields, help or error below. There is no required asterisk; mark the optional fields with `FormItem optional` instead. `Form layout="horizontal"` is the page form: `FormSection`s in one panel, ended by `FormActions` (primary first, left-packed).
- **Tables** are always a panel: `Table.Th sort / onSort / facet / numeric`, `Table.Td kind`, `Table.Row selected / expanded / meta`, and `footer` for keyset paging (`Pagination variant="keyset"`).
- **A table on a phone is the same tree.** `<Table stack="lg">` draws the table as a list of records below that breakpoint (list roles, no header row, no sideways scroll); keep its `aria-label`, which names the list, and give a value its own label where the header was the only thing naming it. `Table.Row metaRowProps` and `Table.Detail rowProps` put attributes on the `<tr>`s you do not render yourself.
- **Switch**: the field label names it (a `FormItem` label, `aria-label` or `aria-labelledby`); its children are the state in words and may be a function of the state. With no other name, the children are the label.
- **Select** passes `aria-label`, `data-testid` and its other props to the trigger. `variant="ghost"` is the borderless picker for chrome, such as a header's site switcher.
- **Handheld**: `ResultBand` lines wrap. `HandheldTopBar` takes `backDisabled`, `sessionDisabled` and `flowAs="h1"`, and cuts a long site or operator name.
- Icons are Tabler (`@tabler/icons-react`) with `iconDefaults` (stroke 1.75, round caps and joins). `Icon size` is `sm` 14, `md` 16, `lg` 20, or a number of pixels.
- `Form` uses native submission and validation; read values with `FormData`. Set `htmlType="submit"` on the submit button.
- `Pagination.total` is a page count unless you pass `pageSize`, in which case it is an item count.
- `Listy` virtualises fixed-height rows (`itemHeight`, default 48).

## Develop

```sh
npm install
npm run dev          # the workbench, on http://localhost:5173
```

The workbench has a page per component (hash routes such as `/#Button`), copyable demo source, a live **Design tokens** page, a light/dark toggle, and a **Desk / Handheld** toggle that renders the previews inside `data-density="handheld"`. Command/Ctrl+K searches.

UnoCSS scans both `src/` and `playground/`, so a class used only in the workbench also lands in `styles.css`. Keep workbench-only styling in `playground/workbench.css` where you can.

## Validate

```sh
npm run typecheck
npm run build        # rewrites dist/; dist is committed, so commit it with the source
npm run test:browser # needs Google Chrome and a running dev server
```

`test:browser` targets `http://localhost:5173` by default. Point it at another server with `SU_BASE_URL=http://localhost:5720 npm run test:browser` or `npm run test:browser -- --base=http://localhost:5720`.

The suite:
- renders every component route;
- drives the key interactions: dialogs, selects, transfer, splitter, virtualisation, table filtering, uploads, tour, search and theme persistence;
- checks release A: the switch name, the ghost Select, the top bar's disabled buttons, truncation and heading, the wrapping result band, `--su-inverse-ink-2`, the table `<tr>` props and the stacked shape (read from Chrome's accessibility tree at 390);
- checks the v2 look: 36px default controls, 6px radius, sans sentence-case labels, IBM Plex loaded, drawer 480, modal at 96, and 44px touch targets under `(hover: none)`;
- checks for horizontal overflow at 390, 820 and 1440 px.
