import { useEffect, useRef, useState } from "react";
import * as UI from "synapse-ui";
import * as demos from "./demos";
import demoSource from "./demos.tsx?raw";
import {
  components,
  groups,
  descriptions,
  type ComponentName,
} from "./catalog";
import { Glyph } from "./icons";
import { PhaseMark } from "./PhaseMark";
import { ErrorBoundary } from "./ErrorBoundary";
import { Code } from "./code";
import { Tokens } from "./Tokens";
import "./workbench.css";

const VERSION = "0.2.0";
const isMac = typeof navigator !== "undefined" && /Mac|iP(hone|ad|od)/.test(navigator.platform);

const codeFor = (name: string) => {
  const body = demoSource
    .split(`export function ${name}Demo()`)[1]
    ?.split("\nexport function ")[0]
    ?.trim();
  return `import { useState } from 'react';\nimport * as UI from 'synapse-ui';\nimport 'synapse-ui/styles.css';\n\n// Render inside <UI.App> for shared theme and feedback APIs.\nexport function Example() ${body || "{}"}\n`;
};
function Demo({ name }: { name: ComponentName }) {
  const Preview = demos[`${name}Demo`];
  return (
    <ErrorBoundary key={name}>
      <Preview />
    </ErrorBoundary>
  );
}
function routeFromHash() {
  const hash = decodeURIComponent(location.hash.slice(1));
  return components.some((c) => c.name === hash) ||
    ["tokens", "start", "components"].includes(hash)
    ? hash
    : "overview";
}
function readStored<T extends string>(key: string, allowed: readonly T[], fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return (allowed as readonly string[]).includes(value ?? "") ? (value as T) : fallback;
  } catch {
    return fallback;
  }
}
function store(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {}
}
export function PlaygroundApp() {
  const [route, setRoute] = useState(routeFromHash);
  const [theme, setTheme] = useState<UI.ThemeMode>(() =>
    readStored("synapse-theme", ["light", "dark"] as const, "light"),
  );
  // Preview density: component previews render inside `data-density="handheld"` when it is on.
  const [density, setDensity] = useState<UI.ConfigDensity>(() =>
    readStored("synapse-density", ["desk", "handheld"] as const, "desk"),
  );
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All components");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const change = () => {
      setRoute(routeFromHash());
      setMobileOpen(false);
      window.scrollTo(0, 0);
    };
    addEventListener("hashchange", change);
    return () => removeEventListener("hashchange", change);
  }, []);
  useEffect(() => {
    const shortcut = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
        setMobileOpen(true);
      }
      if (e.key === "Escape") {
        setMobileOpen(false);
        setQuery("");
      }
    };
    addEventListener("keydown", shortcut);
    return () => removeEventListener("keydown", shortcut);
  }, []);
  const navigate = (value: string) => {
    location.hash = value;
    setQuery("");
    setMobileOpen(false);
  };
  const handheld = density === "handheld";
  const current = components.find((c) => c.name === route);
  const filtered = components.filter(
    (c) =>
      (category === "All components" || c.category === category) &&
      `${c.name} ${c.category} ${descriptions[c.name]}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <UI.App theme={theme}>
      <div className="workbench">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        {mobileOpen && (
          <button
            className="sidebar-scrim"
            aria-label="Close navigation"
            onClick={() => setMobileOpen(false)}
          />
        )}
        <aside
          className={`sidebar ${mobileOpen ? "is-open" : ""}`}
          aria-label="Library navigation"
        >
          <a className="brand-lockup" href="#overview">
            <span className="brand-mark" aria-hidden="true">
              <PhaseMark size={24} />
            </span>
            <span>
              synapse<span className="brand-ui">ui</span>
            </span>
            <span className="version">{VERSION.replace(/\.0$/, "")}</span>
          </a>
          <div className="search-box">
            <Glyph name="search" size={16} />
            <input
              ref={searchRef}
              aria-label="Search components"
              placeholder="Search components…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <UI.Kbd aria-hidden="true">{isMac ? "⌘ K" : "Ctrl K"}</UI.Kbd>
          </div>
          <nav className="side-scroll">
            {!query && (
              <div className="top-links">
                <a
                  className={route === "overview" ? "selected" : ""}
                  aria-current={route === "overview" ? "page" : undefined}
                  href="#overview"
                >
                  <Glyph name="grid" />
                  Overview
                </a>
                <a
                  className={route === "start" ? "selected" : ""}
                  aria-current={route === "start" ? "page" : undefined}
                  href="#start"
                >
                  <Glyph name="arrow" />
                  Getting started
                </a>
                <a
                  className={route === "tokens" ? "selected" : ""}
                  aria-current={route === "tokens" ? "page" : undefined}
                  href="#tokens"
                >
                  <Glyph name="palette" />
                  Design tokens
                </a>
              </div>
            )}
            {Object.entries(groups).map(([group, names]) => {
              const visible = names.filter((name) =>
                `${name} ${group}`.toLowerCase().includes(query.toLowerCase()),
              );
              return (
                visible.length > 0 && (
                  <div className="nav-group" key={group}>
                    <div className="nav-group-title">
                      {group}
                      <span>{names.length}</span>
                    </div>
                    {visible.map((name) => (
                      <a
                        key={name}
                        href={`#${name}`}
                        aria-current={route === name ? "page" : undefined}
                        className={route === name ? "selected" : ""}
                      >
                        {name}
                      </a>
                    ))}
                  </div>
                )
              );
            })}
            {query &&
              !components.some((c) =>
                `${c.name} ${c.category}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              ) && (
                <p className="no-results">
                  No components found.
                  <button className="text-link" onClick={() => setQuery("")}>
                    Clear search
                  </button>
                </p>
              )}
          </nav>
          <div className="sidebar-foot">
            <UI.StatusDot tone="success" />
            <span>
              Lattice UI v2
              <small>React · Radix · UnoCSS · IBM Plex</small>
            </span>
          </div>
        </aside>
        <div className="workspace">
          <header className="workspace-toolbar">
            <div className="toolbar-location">
              <button
                className="icon-button mobile-toggle"
                aria-label="Open navigation"
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen(!mobileOpen)}
              >
                <Glyph name="menu" size={20} />
              </button>
              <span className="toolbar-root">Library</span>
              <span className="toolbar-root">
                <Glyph name="chevron" size={14} />
              </span>
              <strong>
                {current?.name ||
                  (route === "tokens"
                    ? "Design tokens"
                    : route === "start"
                      ? "Getting started"
                      : route === "components"
                        ? "Components"
                        : "Overview")}
              </strong>
            </div>
            <div className="toolbar-right">
              <span className="release-label">v{VERSION}</span>
              <span className="toolbar-divider" />
              <UI.Tooltip
                content={
                  handheld
                    ? "Previews render at handheld density"
                    : "Render previews at handheld density"
                }
              >
                <button
                  className="toolbar-toggle"
                  aria-pressed={handheld}
                  aria-label="Handheld density"
                  onClick={() => {
                    const next = handheld ? "desk" : "handheld";
                    setDensity(next);
                    store("synapse-density", next);
                  }}
                >
                  <Glyph name={handheld ? "handheld" : "desk"} />
                  <span>{handheld ? "Handheld" : "Desk"}</span>
                </button>
              </UI.Tooltip>
              <UI.Tooltip
                content={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
              >
                <button
                  className="icon-button"
                  aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                  onClick={() => {
                    const next = theme === "light" ? "dark" : "light";
                    setTheme(next);
                    store("synapse-theme", next);
                  }}
                >
                  <Glyph name={theme === "light" ? "moon" : "sun"} size={18} />
                </button>
              </UI.Tooltip>
              <a className="toolbar-start" href="#start">
                Get started
                <Glyph name="arrow" size={16} />
              </a>
            </div>
          </header>
          <main id="main-content" className="workspace-main">
            {current ? (
              <>
                <div className="detail-heading">
                  <a className="back-link" href="#components">
                    All components <Glyph name="chevron" size={14} />{" "}
                    {current.category}
                  </a>
                  <h1>{current.name}</h1>
                  <p>{descriptions[current.name]}</p>
                </div>
                <div className="section-heading">
                  <h2>Preview</h2>
                  <span>
                    {handheld
                      ? 'Inside data-density="handheld"'
                      : "Interactive example"}
                  </span>
                </div>
                <div
                  className="detail-preview"
                  data-density={handheld ? "handheld" : undefined}
                >
                  <Demo name={current.name} />
                </div>
                <div className="section-heading" id="demo-code">
                  <h2>Usage</h2>
                  <span>Uses the same code as the preview</span>
                </div>
                <Code text={codeFor(current.name)} />
                <div className="detail-note">
                  <Glyph name="code" />
                  <p>
                    Import from <code>synapse-ui</code> and include{" "}
                    <code>synapse-ui/styles.css</code> once; it carries the tokens and
                    the IBM Plex faces. Wrap your application with{" "}
                    <a href="#App">App</a> to share theme, density and feedback APIs.
                  </p>
                </div>
                <div className="component-pagination">
                  {components.indexOf(current) > 0 && (
                    <a
                      href={`#${components[components.indexOf(current) - 1].name}`}
                    >
                      Previous
                      <span>
                        {components[components.indexOf(current) - 1].name}
                      </span>
                    </a>
                  )}
                  {components.indexOf(current) < components.length - 1 && (
                    <a
                      href={`#${components[components.indexOf(current) + 1].name}`}
                    >
                      Next
                      <span>
                        {components[components.indexOf(current) + 1].name}
                        <Glyph name="arrow" size={16} />
                      </span>
                    </a>
                  )}
                </div>
              </>
            ) : route === "start" ? (
              <GettingStarted count={components.length} />
            ) : route === "tokens" ? (
              <Tokens />
            ) : (
              <>
                <section className="intro">
                  <div>
                    <h1>
                      Every unit,
                      <br />
                      <span>accounted for.</span>
                    </h1>
                    <p>
                      Lattice UI v2 for SynapseWare: white panels on a grey ground, one
                      action blue, IBM Plex. Built on Radix, styled with{" "}
                      <code>--su-*</code> tokens, from the desk to a 390-wide terminal.
                    </p>
                    <div className="intro-actions">
                      <UI.Button variant="primary" asChild>
                        <a href="#Button">Explore components</a>
                      </UI.Button>
                      <UI.Button asChild>
                        <a href="#start">Quick start</a>
                      </UI.Button>
                      <UI.Button variant="ghost" asChild>
                        <a href="#tokens">Design tokens</a>
                      </UI.Button>
                    </div>
                  </div>
                </section>
                <div className="preview-heading">
                  <h2>A feel for the details</h2>
                  <span>Real components. Go ahead, try them.</span>
                </div>
                <section
                  className="feature-grid"
                  aria-label="Interactive component examples"
                >
                  <div className="feature-panel actions-panel">
                    <div className="sample-label">
                      Actions
                      <a href="#Button" aria-label="Explore Button">
                        <Glyph name="arrow" size={16} />
                      </a>
                    </div>
                    <div className="action-buttons">
                      <UI.Button
                        variant="primary"
                        onClick={() => navigate("Button")}
                      >
                        Confirm receipt
                      </UI.Button>
                      <UI.Button onClick={() => navigate("Button")}>
                        Secondary
                      </UI.Button>
                      <UI.Button
                        variant="ghost"
                        onClick={() => navigate("Button")}
                      >
                        Learn more
                      </UI.Button>
                    </div>
                    <div className="sample-rule" />
                    <div className="mini-example-row">
                      <div>
                        <span className="sample-caption">State, in words</span>
                        <UI.Space wrap>
                          <UI.Tag color="success" dot>
                            Accepted
                          </UI.Tag>
                          <UI.Tag color="info" dot>
                            In progress
                          </UI.Tag>
                          <UI.Tag color="warning" dot>
                            Short pick
                          </UI.Tag>
                          <UI.Tag color="neutral">Draft</UI.Tag>
                        </UI.Space>
                      </div>
                      <div>
                        <span className="sample-caption">Keys, not glyphs</span>
                        <UI.Space size="small" align="center">
                          <UI.Kbd>Ctrl K</UI.Kbd>
                          <UI.Kbd>Esc</UI.Kbd>
                          <UI.Kbd>↑</UI.Kbd>
                          <UI.Kbd>↓</UI.Kbd>
                        </UI.Space>
                      </div>
                    </div>
                  </div>
                  <div className="feature-panel preferences-panel">
                    <div className="sample-label">
                      Make it your own
                      <a href="#Switch" aria-label="Explore Switch">
                        <Glyph name="arrow" size={16} />
                      </a>
                    </div>
                    <div className="preference-row">
                      <span>
                        <strong>Short-pick alerts</strong>
                        <small>Tell the supervisor at once</small>
                      </span>
                      <UI.Switch
                        defaultChecked
                        aria-label="Enable short-pick alerts"
                      />
                    </div>
                    <div className="preference-row">
                      <span>
                        <strong>Beep on scan</strong>
                        <small>One beep accepted, two refused</small>
                      </span>
                      <UI.Switch aria-label="Enable beep on scan" />
                    </div>
                    <div className="preference-slider">
                      <Glyph name="sun" size={16} />
                      <UI.Slider defaultValue={[64]} aria-label="Screen brightness" />
                      <Glyph name="sun" size={20} />
                    </div>
                  </div>
                  <div className="feature-panel navigation-panel">
                    <div className="sample-label">
                      Find your focus
                      <a href="#Segmented" aria-label="Explore Segmented">
                        <Glyph name="arrow" size={16} />
                      </a>
                    </div>
                    <demos.SegmentedDemo />
                    <div className="navigation-caption">
                      <UI.StatusDot tone="success" />
                      One view at a time. Everything in its place.
                    </div>
                  </div>
                  <div className="feature-panel input-panel">
                    <div className="sample-label">
                      Identifiers read character by character
                      <a href="#Input" aria-label="Explore Input">
                        <Glyph name="arrow" size={16} />
                      </a>
                    </div>
                    <UI.Input
                      aria-label="Location"
                      mono
                      placeholder="A-09-01-1"
                      prefix={<Glyph name="search" size={16} />}
                    />
                    <span className="sample-caption">
                      Mono for SKUs, bins and order numbers; sans for everything else.
                    </span>
                  </div>
                </section>
                <section className="catalog-section" id="component-catalog">
                  <div className="catalog-heading">
                    <div>
                      <h2>Everything you need to build.</h2>
                      <p>
                        {components.length} components. One consistent language.
                      </p>
                    </div>
                    <span className="catalog-count">
                      {filtered.length} components
                    </span>
                  </div>
                  <div className="category-tabs" aria-label="Filter components">
                    {["All components", ...Object.keys(groups)].map((name) => (
                      <button
                        key={name}
                        aria-pressed={category === name}
                        className={category === name ? "active" : ""}
                        onClick={() => setCategory(name)}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <div className="component-directory">
                    {filtered.map((c) => (
                      <a key={c.name} href={`#${c.name}`}>
                        <span>
                          <strong>{c.name}</strong>
                          <small>{descriptions[c.name]}</small>
                        </span>
                        <Glyph name="chevron" size={16} />
                      </a>
                    ))}
                  </div>
                  {!filtered.length && (
                    <UI.Empty description="No matching components. Try another search." />
                  )}
                </section>
              </>
            )}
            <footer className="page-footer">
              <span>
                Synapse UI {VERSION} <span className="footer-dot">·</span> Lattice UI v2
              </span>
              <a href="#tokens">
                Explore the design tokens <Glyph name="arrow" size={14} />
              </a>
            </footer>
          </main>
        </div>
      </div>
    </UI.App>
  );
}

function GettingStarted({ count }: { count: number }) {
  return (
    <>
      <div className="detail-heading">
        <h1>Getting started</h1>
        <p>
          Add the package, import one stylesheet, and wrap the application in{" "}
          <code>App</code>. The IBM Plex faces ship with the library; nothing loads from a
          font CDN.
        </p>
      </div>
      <div className="section-heading">
        <h2>1. Add the package</h2>
        <span>dist/ is committed, so a git dependency needs no build step</span>
      </div>
      <Code
        lang="Shell"
        text={
          "# From git: pin a tag or a commit\nnpm install github:HEAPTRASH/synapse-ui#v2\n\n# Or from a local checkout\nnpm run build && npm pack\nnpm install /path/to/synapse-ui-" +
          VERSION +
          ".tgz"
        }
      />
      <div className="section-heading">
        <h2>2. Import the stylesheet and wrap the app</h2>
        <span>Tokens, reset, fonts and component styles in one file</span>
      </div>
      <Code
        text={
          'import { App, Button } from "synapse-ui";\nimport "synapse-ui/styles.css";\n\nexport default function MyApp() {\n  return (\n    <App theme="light" locale="ro-RO">\n      <Button variant="primary">Confirmă recepția</Button>\n    </App>\n  );\n}'
        }
      />
      <div className="section-heading">
        <h2>3. Share the UnoCSS theme (optional)</h2>
        <span>bg-surface, text-ink-2, rounded-su-control and the rest</span>
      </div>
      <Code
        lang="uno.config.ts"
        text={
          'import { defineConfig } from "unocss";\nimport synapse from "synapse-ui/uno.config";\n\nexport default defineConfig({\n  ...synapse,\n  content: { filesystem: ["src/**/*.{ts,tsx}"] },\n});'
        }
      />
      <div className="section-heading">
        <h2>4. Handheld screens</h2>
        <span>56 and 64 controls, 17px body, 2px field borders</span>
      </div>
      <Code
        text={
          'import { ConfigProvider, HandheldTopBar, ScanField } from "synapse-ui";\n\n<ConfigProvider density="handheld">\n  <HandheldTopBar flow="Recepție" step={2} total={4} onBack={goBack} />\n  <ScanField label="Scanează locația" onScan={check} />\n</ConfigProvider>'
        }
      />
      <a href="#components" className="text-link">
        Explore all {count} components <Glyph name="arrow" size={16} />
      </a>
    </>
  );
}
