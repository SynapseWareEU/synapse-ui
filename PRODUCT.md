# Synapse UI

Synapse UI is the React component library for SynapseWare apps, starting with Lattice, the warehouse management system. It gives product teams Ant Design–style coverage (General, Layout, Navigation, Data Entry, Data Display, Feedback, Other) plus a handheld set for the warehouse terminal, built on Radix UI primitives and styled with UnoCSS utilities over semantic `--su-*` CSS variables.

Version 0.2 ships **Lattice UI v2**, the visual language every Lattice screen follows. See [DESIGN.md](./DESIGN.md).

## Goals

- **One language across every screen.** Desk pages, drawers, modals and the 390-wide handheld flows share tokens, shapes, states and words, so a feature ships without redrawing chrome.
- **Dense data work first.** 36px controls, 40px table rows, tables that are always panels with facets, group rows, meta lines and keyset paging. The data is the loudest thing on the screen.
- **Handheld as a first-class density.** `data-density="handheld"` re-sizes the generic controls; the scan field, docket, stepper, keypad and result band cover the terminal flows.
- **Accessible by construction.** Radix behaviour, AA contrast, a visible focus outline on every control, 44px touch targets, and support for reduced motion, increased contrast, forced colours and RTL.
- **Themeable, not forked.** Light and dark themes, token overrides through `ConfigProvider`, and a shared UnoCSS config for apps that want the same utilities. The public API stays backward compatible: 0.2 adds, and deprecated props keep compiling.
- **Self-contained.** The IBM Plex faces ship with the package, and `dist/` is committed so a git dependency installs without a toolchain. Installations are on-prem and never reach a font CDN.

## Non-goals

- Marketing surfaces. The shaders, the brand ramp and the slot-state motif stay in the package for the website and brand pages, but product screens do not use them.
- A second styling system. There is no CSS-in-JS and no per-component stylesheet: one `styles.css`, generated from the utilities in the components.
- Pixel-perfect ports of every Ant Design API. Coverage follows what SynapseWare screens need.

## Audience

Product engineers building SynapseWare web apps and handheld flows who need consistent, accessible primitives that already follow Lattice UI v2.
