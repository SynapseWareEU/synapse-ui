import { useEffect, useState, type ReactNode } from "react";
import * as UI from "synapse-ui";
import { Code } from "./code";

/*
 * The Tokens page reads every value back from the live `--su-*` custom properties, so what it
 * prints is what the current theme resolves to, never a copy that can drift from tokens.css.
 */

type Token = readonly [name: string, note: string];

const neutrals: Token[] = [
  ["bg", "App ground (was paper)"],
  ["surface", "Panels, inputs, secondary buttons"],
  ["surface-2", "Table header, group and expanded rows"],
  ["surface-hover", "Row and item hover"],
  ["surface-overlay", "Popover, menu, modal, drawer, toast"],
  ["fill", "Chips, segmented track, key hints"],
  ["border", "Hairlines, row rules, panel outline"],
  ["border-strong", "Inputs, secondary buttons"],
  ["border-control", "Unchecked checkbox and radio (3:1)"],
  ["ink", "Text"],
  ["ink-2", "Secondary text, labels, icons in controls"],
  ["ink-3", "Placeholders, disabled, “—”; on surface only"],
  ["control-raised", "Segmented thumb"],
  ["inverse-surface", "Tooltip"],
  ["inverse-ink-2", "Secondary text on the inverse surface"],
];

const action: Token[] = [
  ["action", "Primary fill, checked controls, switch on"],
  ["action-hover", "Primary hover"],
  ["action-press", "Primary press"],
  ["action-subtle", "Selected row, nav item, filter chip"],
  ["action-subtle-hover", "Hover on a selected thing"],
  ["action-text", "Links, selected text"],
  ["action-text-hover", "Link hover"],
  ["focus", "The 2px focus outline"],
];

const tones = ["neutral", "info", "success", "warning", "danger"] as const;
const toneRoles = ["text", "tint", "line", "", "strong"] as const;

const brand: Token[] = [
  ["navy", "Shaders"],
  ["blue-deep", "Shaders"],
  ["blue", "Shaders"],
  ["cyan", "Shaders"],
  ["teal", "Shaders"],
  ["mint", "Shaders"],
];

const radii: Token[] = [
  ["radius-row", "Table rows"],
  ["radius-bar", "Meters, step segments"],
  ["radius-tag", "Tags, chips, key hints, checkbox, rows in overlays"],
  ["radius-control", "Buttons, inputs, selects, search"],
  ["radius-surface", "Panels, cards, popovers, modal, toasts, handheld controls"],
  ["radius-pill", "Count pills, switch"],
];

const sizes: Token[] = [
  ["control-mini", "Disclosure chevron, facet"],
  ["control-xs", "In-row buttons (sm)"],
  ["control-sm", "Icon buttons, overlay rows"],
  ["control-md", "Default control (md)"],
  ["row", "Table row"],
  ["control-lg", "Rare large desk control (lg)"],
  ["hh-control-md", "Handheld secondary, keypad key"],
  ["hh-control-lg", "Handheld primary, scan field, stepper"],
];

const spaces = [1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 16] as const;

const motion: Token[] = [
  ["duration-fast", "Popover, menu, modal: fade + 4px"],
  ["duration-normal", "Drawer slide, toast rise, collapse"],
  ["ease-out", "Every enter transition"],
];

const densityTokens: Token[] = [
  ["control-md", "Secondary buttons and fields"],
  ["control-lg", "Primary"],
  ["button-height", "Default button"],
  ["radius-control", "Buttons and fields"],
  ["text-control", "Button and field text"],
  ["text-body", "Body text: 17 is the floor"],
  ["text-label", "Field labels"],
];

const aliases: ReadonlyArray<readonly [string, string]> = [
  ["paper", "surface"],
  ["canvas", "bg"],
  ["rule", "border"],
  ["rule-strong", "border-strong"],
  ["separator", "border"],
  ["label", "ink"],
  ["label-secondary", "ink-2"],
  ["label-tertiary", "ink-3"],
  ["accent", "action-text"],
  ["accent-soft", "action-subtle"],
  ["fill-secondary", "fill"],
  ["fill-tertiary", "surface-2"],
];

const deskType = [
  ["largeTitle", "Display", "32/40 600 −0.01em", "2\u202f290 buc"],
  ["title1", "Page title", "24/32 600 −0.01em", "Recepții"],
  ["title2", "Phone page title", "22/28 600", "Recepții"],
  ["title3", "Section title", "16/24 600", "Linii de recepție"],
  ["headline", "Empty title", "15/22 600", "Nicio recepție azi"],
  ["body", "Body and cells", "14/20 400", "Palet primit pe rampa 3, 25.09.2026 12:27"],
  ["subhead", "Card title", "14/20 600", "Ștergere locație"],
  ["footnote", "Small", "13/18 400", "Actualizat azi 16:27 · 11,5 kg"],
  ["label", "Label", "13/18 500 ink-2", "Cantitate recepționată"],
  ["caption2", "Micro", "12/16 400", "Ctrl K"],
  ["id", "Identifier", "mono 14/20 500", "SO-2026-004417"],
  ["idSecondary", "Supporting identifier", "mono 13/18 400 ink-2", "RO_BUC_01-A-12-03"],
] as const;

const handheldType = [
  ["text-hh-flow font-semibold", "Flow name", "20/26 600", "Recepție"],
  ["text-hh-step font-medium text-ink-2", "Step counter", "17/24 500 ink-2", "Pasul 2 din 4"],
  ["text-hh-question font-semibold", "Question", "28/34 600 −0.01em", "Scanează locația"],
  ["text-hh-key font-medium text-ink-2", "Docket key", "18/24 500 ink-2", "Locație"],
  ["font-mono text-hh-value font-semibold", "Docket value", "mono 24/30 600", "A-09-01-1"],
  ["text-hh-body text-ink-2", "Body, meta", "17/24 ink-2", "Bandaj rolă 10cm"],
  ["text-hh-primary font-semibold", "Primary button", "22/28 600", "Confirmă"],
  ["text-hh-keypad font-medium", "Keypad key", "28/34 500", "7"],
  ["text-hh-big font-semibold", "Big quantity", "64/64 600", "20"],
] as const;

function useTokenValues(names: readonly string[], density?: UI.ConfigDensity) {
  const { theme } = UI.useConfig();
  const [values, setValues] = useState<Record<string, string>>({});
  const key = names.join(",");
  useEffect(() => {
    // Passive effect: runs after the root provider's layout effect has stamped the theme. A
    // density is read from a detached probe carrying the attribute, so the page is untouched.
    let probe: HTMLElement | null = null;
    if (density) {
      probe = document.createElement("div");
      probe.setAttribute("data-density", density);
      probe.hidden = true;
      document.body.append(probe);
    }
    const style = getComputedStyle(probe ?? document.documentElement);
    setValues(
      Object.fromEntries(
        names.map((n) => [n, style.getPropertyValue(`--su-${n}`).trim()]),
      ),
    );
    probe?.remove();
  }, [theme, key, density]);
  return values;
}

function Section({
  title,
  aside,
  children,
}: {
  title: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="token-section">
      <div className="section-heading">
        <h2>{title}</h2>
        {aside ? <span>{aside}</span> : null}
      </div>
      {children}
    </section>
  );
}

function Swatches({ tokens }: { tokens: Token[] }) {
  const values = useTokenValues(tokens.map(([n]) => n));
  return (
    <div className="token-swatches">
      {tokens.map(([name, note]) => (
        <div key={name} className="token-swatch">
          <div className="token-color" style={{ background: `var(--su-${name})` }} />
          <code>--su-{name}</code>
          <span className="token-value">{values[name] || "…"}</span>
          <small>{note}</small>
        </div>
      ))}
    </div>
  );
}

function ToneMatrix() {
  const names = tones.flatMap((t) =>
    toneRoles.map((r) => (r ? `${t}-${r}` : t)),
  );
  const values = useTokenValues(names);
  return (
    <UI.Table aria-label="Status tones">
      <UI.Table.Head>
        <UI.Table.Row>
          <UI.Table.Th>Tone</UI.Table.Th>
          <UI.Table.Th>Text</UI.Table.Th>
          <UI.Table.Th>Tint</UI.Table.Th>
          <UI.Table.Th>Line</UI.Table.Th>
          <UI.Table.Th>Solid</UI.Table.Th>
          <UI.Table.Th>Strong</UI.Table.Th>
          <UI.Table.Th>In use</UI.Table.Th>
        </UI.Table.Row>
      </UI.Table.Head>
      <UI.Table.Body>
        {tones.map((tone) => (
          <UI.Table.Row key={tone}>
            <UI.Table.Td>{tone}</UI.Table.Td>
            {toneRoles.map((role) => {
              const name = role ? `${tone}-${role}` : tone;
              const value = values[name];
              return value ? (
                <UI.Table.Td key={role || "solid"}>
                  <span className="tone-cell">
                    <i style={{ background: `var(--su-${name})` }} />
                    <span className="token-value">{value}</span>
                  </span>
                </UI.Table.Td>
              ) : (
                <UI.Table.Td key={role || "solid"} kind="empty" aria-label="No such token" />
              );
            })}
            <UI.Table.Td>
              <span className="tone-sample">
                <UI.Tag color={tone} dot>
                  {tone === "neutral" ? "Draft" : tone === "info" ? "In progress" : tone === "success" ? "Accepted" : tone === "warning" ? "Short pick" : "Refused"}
                </UI.Tag>
              </span>
            </UI.Table.Td>
          </UI.Table.Row>
        ))}
      </UI.Table.Body>
    </UI.Table>
  );
}

function TypeTable() {
  return (
    <UI.Table aria-label="Desk type scale">
      <UI.Table.Head>
        <UI.Table.Row>
          <UI.Table.Th>Role</UI.Table.Th>
          <UI.Table.Th>Specimen</UI.Table.Th>
          <UI.Table.Th>Size / line, weight</UI.Table.Th>
        </UI.Table.Row>
      </UI.Table.Head>
      <UI.Table.Body>
        {deskType.map(([variant, role, spec, sample]) => (
          <UI.Table.Row key={variant}>
            <UI.Table.Td kind="secondary">
              {role}
              <br />
              <code className="token-variant">variant=&quot;{variant}&quot;</code>
            </UI.Table.Td>
            <UI.Table.Td>
              <UI.Typography variant={variant} as="span">
                {sample}
              </UI.Typography>
            </UI.Table.Td>
            <UI.Table.Td kind="secondary">{spec}</UI.Table.Td>
          </UI.Table.Row>
        ))}
      </UI.Table.Body>
    </UI.Table>
  );
}

function HandheldTypeTable() {
  return (
    <UI.Table aria-label="Handheld type scale">
      <UI.Table.Head>
        <UI.Table.Row>
          <UI.Table.Th>Role</UI.Table.Th>
          <UI.Table.Th>Specimen</UI.Table.Th>
          <UI.Table.Th>Size / line, weight</UI.Table.Th>
        </UI.Table.Row>
      </UI.Table.Head>
      <UI.Table.Body>
        {handheldType.map(([cls, role, spec, sample]) => (
          <UI.Table.Row key={role}>
            <UI.Table.Td kind="secondary">{role}</UI.Table.Td>
            <UI.Table.Td>
              <span className={`inline-block py-su2 ${cls}`}>{sample}</span>
            </UI.Table.Td>
            <UI.Table.Td kind="secondary">{spec}</UI.Table.Td>
          </UI.Table.Row>
        ))}
      </UI.Table.Body>
    </UI.Table>
  );
}

function Radii() {
  const values = useTokenValues(radii.map(([n]) => n));
  return (
    <div className="token-shapes">
      {radii.map(([name, note]) => (
        <div key={name} className="token-shape">
          <div style={{ borderRadius: `var(--su-${name})` }} />
          <code>--su-{name}</code>
          <span className="token-value">{values[name] || "…"}</span>
          <small>{note}</small>
        </div>
      ))}
    </div>
  );
}

function Scale({ tokens, axis }: { tokens: Token[]; axis: "height" | "width" }) {
  const values = useTokenValues(tokens.map(([n]) => n));
  return (
    <div className={`token-scale token-scale-${axis}`}>
      {tokens.map(([name, note]) => (
        <div key={name}>
          <span
            className="token-bar"
            style={axis === "height" ? { height: `var(--su-${name})` } : { width: `var(--su-${name})` }}
          />
          <code>--su-{name}</code>
          <span className="token-value">{values[name] || "…"}</span>
          {note ? <small>{note}</small> : null}
        </div>
      ))}
    </div>
  );
}

function ValueTable({ label, tokens }: { label: string; tokens: Token[] }) {
  const values = useTokenValues(tokens.map(([n]) => n));
  return (
    <UI.Table aria-label={label}>
      <UI.Table.Head>
        <UI.Table.Row>
          <UI.Table.Th>Token</UI.Table.Th>
          <UI.Table.Th>Value</UI.Table.Th>
          <UI.Table.Th>Used for</UI.Table.Th>
        </UI.Table.Row>
      </UI.Table.Head>
      <UI.Table.Body>
        {tokens.map(([name, note]) => (
          <UI.Table.Row key={name}>
            <UI.Table.Td kind="id">--su-{name}</UI.Table.Td>
            <UI.Table.Td kind="idSecondary">{values[name] || "…"}</UI.Table.Td>
            <UI.Table.Td kind="secondary">{note}</UI.Table.Td>
          </UI.Table.Row>
        ))}
      </UI.Table.Body>
    </UI.Table>
  );
}

function DensityTable() {
  const names = densityTokens.map(([n]) => n);
  const desk = useTokenValues(names, "desk");
  const handheld = useTokenValues(names, "handheld");
  return (
    <UI.Table aria-label="Tokens the handheld scope re-sizes">
      <UI.Table.Head>
        <UI.Table.Row>
          <UI.Table.Th>Token</UI.Table.Th>
          <UI.Table.Th>Desk</UI.Table.Th>
          <UI.Table.Th>Handheld</UI.Table.Th>
          <UI.Table.Th>Used for</UI.Table.Th>
        </UI.Table.Row>
      </UI.Table.Head>
      <UI.Table.Body>
        {densityTokens.map(([name, note]) => (
          <UI.Table.Row key={name}>
            <UI.Table.Td kind="id">--su-{name}</UI.Table.Td>
            <UI.Table.Td kind="number">{desk[name] || "…"}</UI.Table.Td>
            <UI.Table.Td kind="number">{handheld[name] || "…"}</UI.Table.Td>
            <UI.Table.Td kind="secondary">{note}</UI.Table.Td>
          </UI.Table.Row>
        ))}
      </UI.Table.Body>
    </UI.Table>
  );
}

function DensityCompare() {
  return (
    <div className="density-compare">
      {(["desk", "handheld"] as const).map((density) => (
        <UI.ConfigProvider key={density} density={density} className="density-frame">
          <span className="density-name">
            {density === "desk" ? (
              "Desk, the default"
            ) : (
              <>
                Handheld: <code>data-density=&quot;handheld&quot;</code>
              </>
            )}
          </span>
          <UI.FormItem label="Location">
            <UI.Input mono placeholder="A-09-01-1" />
          </UI.FormItem>
          <UI.Space wrap>
            <UI.Button variant="primary">Confirm</UI.Button>
            <UI.Button>Skip</UI.Button>
          </UI.Space>
        </UI.ConfigProvider>
      ))}
    </div>
  );
}

export function Tokens() {
  return (
    <>
      <div className="detail-heading">
        <h1>Design tokens</h1>
        <p>
          Lattice UI v2 as <code>--su-*</code> custom properties: white panels on a grey
          ground, one action blue, five opaque status tones, IBM Plex. Every value below is
          read from the live page, so it follows the theme toggle.
        </p>
      </div>

      <Section title="Neutrals" aside="The ground, the surfaces on it, and ink">
        <Swatches tokens={neutrals} />
      </Section>

      <Section title="Action" aside="One blue for the primary, selection, links and focus">
        <Swatches tokens={action} />
      </Section>

      <Section title="Status tones" aside="text · tint · line · solid · strong">
        <ToneMatrix />
        <p className="token-note">
          Tint, line and text draw tags, alerts and tinted notes. The solid is for dots and
          meters; warning and success solids sit below 3:1, so they always sit next to a word.
          Strong carries white text: the handheld result bands and the danger primary.
        </p>
      </Section>

      <Section title="Typography" aside="IBM Plex Sans · IBM Plex Mono for identifiers only">
        <TypeTable />
        <p className="token-note">
          Sentence case everywhere, no letter-spaced labels, nothing below 12. Numbers,
          quantities, dates and units are sans; mono is for what people read character by
          character: SKUs, order numbers, bins, lots.
        </p>
      </Section>

      <Section title="Handheld type" aside="390 wide · 17 is the floor">
        <HandheldTypeTable />
      </Section>

      <Section title="Shape" aside="4 for tags, 6 for controls, 8 for surfaces; rows stay square">
        <Radii />
      </Section>

      <Section title="Elevation" aside="Content is flat; only overlays cast a shadow">
        <div className="token-elevation">
          <div className="elevation-flat">
            <strong>Panel</strong>
            <small>surface · 1px border · no shadow</small>
          </div>
          <div className="elevation-overlay">
            <strong>Overlay</strong>
            <small>surface-overlay · 1px border · --su-shadow-overlay</small>
          </div>
        </div>
      </Section>

      <Section title="Control heights" aside="Desk 24–48 · handheld 56 and 64">
        <Scale tokens={sizes} axis="height" />
      </Section>

      <Section title="Density" aside="One attribute re-sizes the generic controls">
        <DensityCompare />
        <DensityTable />
        <Code
          text={
            '// The whole app\n<App density="handheld">…</App>\n\n// One subtree\n<ConfigProvider density="handheld">\n  <ScanScreen />\n</ConfigProvider>\n\n// Without React: any element\n<div data-density="handheld">…</div>'
          }
        />
      </Section>

      <Section title="Space" aside="4px base">
        <Scale
          tokens={spaces.map((n) => [`space-${n}`, ""] as const)}
          axis="width"
        />
      </Section>

      <Section title="Motion" aside="All of it goes to none under reduced motion">
        <ValueTable label="Motion tokens" tokens={motion} />
      </Section>

      <Section title="v1 names" aside="Kept as aliases; prefer the v2 name in new code">
        <UI.Table aria-label="v1 aliases">
          <UI.Table.Head>
            <UI.Table.Row>
              <UI.Table.Th>v1 name</UI.Table.Th>
              <UI.Table.Th>Resolves to</UI.Table.Th>
            </UI.Table.Row>
          </UI.Table.Head>
          <UI.Table.Body>
            {aliases.map(([from, to]) => (
              <UI.Table.Row key={from}>
                <UI.Table.Td kind="idSecondary">--su-{from}</UI.Table.Td>
                <UI.Table.Td kind="id">--su-{to}</UI.Table.Td>
              </UI.Table.Row>
            ))}
          </UI.Table.Body>
        </UI.Table>
      </Section>

      <Section title="Brand ramp" aside="Shaders and marketing only, never product chrome">
        <Swatches tokens={brand} />
      </Section>

      <Section title="Customize" aside="Keys with or without the --su- prefix">
        <Code
          text={
            '<App\n  theme="light"\n  tokens={{ action: "#1d4ed8", "action-hover": "#1e40af" }}\n>\n  <YourApplication />\n</App>'
          }
        />
      </Section>
    </>
  );
}
