import { Fragment, useState } from "react";
import {
  IconBuildingWarehouse,
  IconDownload,
  IconDots,
  IconFilter,
  IconPlus,
  IconSearch,
  IconStar,
  IconTrash,
} from "@tabler/icons-react";
import * as UI from "synapse-ui";

export function ButtonDemo() {
  const { message } = UI.useApp();
  const [pinned, setPinned] = useState(true);
  const plus = <IconPlus {...UI.iconDefaults} />;
  return (
    <div className="demo-stack">
      <div>
        <span className="demo-caption">Variants</span>
        <div className="demo-row">
          <UI.Button
            variant="primary"
            onClick={() => message.success("Receipt confirmed")}
          >
            Primary
          </UI.Button>
          <UI.Button variant="secondary" onClick={() => message.info("Secondary action")}>
            Secondary
          </UI.Button>
          <UI.Button>Default</UI.Button>
          <UI.Button variant="ghost">Ghost</UI.Button>
          <UI.Button variant="dashed" icon={plus}>
            Dashed
          </UI.Button>
          <UI.Button variant="text">Text link</UI.Button>
        </div>
      </div>
      <div>
        <span className="demo-caption">Danger forms: primary only to confirm a destructive action</span>
        <div className="demo-row">
          <UI.Button variant="primary" danger>
            Delete location
          </UI.Button>
          <UI.Button danger icon={<IconTrash {...UI.iconDefaults} />}>
            Delete
          </UI.Button>
          <UI.Button variant="ghost" danger>
            Revoke
          </UI.Button>
          <UI.Button variant="dashed" danger>
            Dashed
          </UI.Button>
          <UI.Button variant="text" danger>
            Remove
          </UI.Button>
        </div>
      </div>
      <div>
        <span className="demo-caption">Sizes: sm 28 · md 36 (default) · lg 48</span>
        <div className="demo-row">
          <UI.Button variant="primary" size="sm">
            Small
          </UI.Button>
          <UI.Button variant="primary">Medium</UI.Button>
          <UI.Button variant="primary" size="lg">
            Large
          </UI.Button>
          <UI.Button size="sm">Small</UI.Button>
          <UI.Button>Medium</UI.Button>
          <UI.Button size="lg">Large</UI.Button>
        </div>
      </div>
      <div>
        <span className="demo-caption">Icon-only buttons are square: 24 · 32 · 44</span>
        <div className="demo-row">
          <UI.Button variant="ghost" size="sm" icon={<IconDots {...UI.iconDefaults} />} aria-label="Row actions" />
          <UI.Button variant="ghost" icon={<IconFilter {...UI.iconDefaults} />} aria-label="Filter" />
          <UI.Button icon={<IconDownload {...UI.iconDefaults} />} aria-label="Export" />
          <UI.Button variant="primary" icon={plus} aria-label="Add" />
          <UI.Button size="lg" icon={plus} aria-label="Add (large)" />
          <UI.Button icon={plus}>Leading icon</UI.Button>
          <UI.Button icon={plus} iconPlacement="end">
            Trailing icon
          </UI.Button>
        </div>
      </div>
      <div>
        <span className="demo-caption">Tight inset, toggle, loading and disabled</span>
        <div className="demo-row">
          <UI.Button variant="ghost" inset="tight">
            Clear filters
          </UI.Button>
          <UI.Button
            aria-pressed={pinned}
            icon={<IconStar {...UI.iconDefaults} />}
            onClick={() => setPinned(!pinned)}
          >
            {pinned ? "Pinned" : "Pin"}
          </UI.Button>
          <UI.Button variant="primary" loading>
            Saving
          </UI.Button>
          <UI.Button loading>Loading</UI.Button>
          <UI.Button loading aria-label="Loading" />
          <UI.Button variant="primary" disabled>
            Primary
          </UI.Button>
          <UI.Button disabled>Default</UI.Button>
          <UI.Button variant="ghost" disabled>
            Ghost
          </UI.Button>
          <UI.Button variant="text" disabled>
            Text
          </UI.Button>
        </div>
      </div>
      <div>
        <span className="demo-caption">Links and blocks</span>
        <div className="demo-row">
          <UI.Button asChild variant="primary">
            <a href="#Button">asChild link</a>
          </UI.Button>
          <UI.Button href="#Button">Default with href</UI.Button>
          <UI.Button variant="text" href="#Button">
            Text link
          </UI.Button>
          <UI.Button variant="text" arrow href="#Button">
            Marketing link with arrow
          </UI.Button>
        </div>
        <UI.Space vertical block className="mt-su3">
          <UI.Button variant="primary" block>
            Primary block
          </UI.Button>
        </UI.Space>
      </div>
    </div>
  );
}
export function FloatButtonDemo() {
  const { message } = UI.useApp();
  return (
    <div className="relative h-60 w-full overflow-auto su-hairline p-su4 [transform:translateZ(0)]">
      <p className="text-footnote text-ink-2">
        Scroll this panel — the floating actions stay pinned to their corners.
      </p>
      <p className="mt-su4 text-footnote text-ink-2">
        A FloatButton is normally fixed to the viewport; here a transformed ancestor scopes it
        to the preview.
      </p>
      <div className="h-60" />
      <UI.FloatButton
        placement="bottom-left"
        icon={<IconSearch {...UI.iconDefaults} />}
        aria-label="Search"
        tooltip="Search"
        onClick={() => message.info("Search opened")}
      />
      <UI.FloatButton
        variant="primary"
        icon={<IconPlus {...UI.iconDefaults} />}
        tooltip="Create new"
        onClick={() => message.info("New item created")}
      >
        Create
      </UI.FloatButton>
    </div>
  );
}
export function IconDemo() {
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Space size="large" align="end">
        {(["sm", "md", "lg", 24] as const).map((size) => (
          <UI.Space key={size} direction="vertical" size="small" align="center">
            <UI.Icon size={size} label={`Add (${size})`}>
              <IconPlus />
            </UI.Icon>
            <span className="text-small text-ink-2">
              {size === "sm" ? "sm 14" : size === "md" ? "md 16" : size === "lg" ? "lg 20" : "24"}
            </span>
          </UI.Space>
        ))}
      </UI.Space>
      <p className="text-body text-ink">
        Inline in running text <UI.Icon size="inherit"><IconStar /></UI.Icon> the icon
        follows the font-size and sits on the baseline.
      </p>
      <UI.Space size="large">
        <span className="text-ink-3">
          <UI.Icon label="Favorite">
            <IconStar />
          </UI.Icon>
        </span>
        <UI.SvgIcon label="Check">
          <path d="M5 12l5 5L20 7" />
        </UI.SvgIcon>
      </UI.Space>
    </UI.Space>
  );
}
export function KbdDemo() {
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Space wrap align="center">
        <UI.Kbd>Ctrl K</UI.Kbd>
        <UI.Kbd>Esc</UI.Kbd>
        <UI.Kbd>Enter</UI.Kbd>
        <UI.Kbd>↑</UI.Kbd>
        <UI.Kbd>↓</UI.Kbd>
        <UI.Kbd>Tab</UI.Kbd>
      </UI.Space>
      <p className="m-0 text-body text-ink-2">
        Press <UI.Kbd>Ctrl K</UI.Kbd> to search, then <UI.Kbd>↑</UI.Kbd> <UI.Kbd>↓</UI.Kbd> to
        move and <UI.Kbd>Enter</UI.Kbd> to open.
      </p>
      <UI.Tooltip content={<>Search <UI.Kbd>Ctrl K</UI.Kbd></>}>
        <UI.Button icon={<IconSearch {...UI.iconDefaults} />}>Search</UI.Button>
      </UI.Tooltip>
    </UI.Space>
  );
}
export function TypographyDemo() {
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Typography variant="largeTitle">{"2\u202f290 buc"}</UI.Typography>
      <UI.Typography variant="lede" measure="lede">
        IBM Plex Sans for words, numbers, dates and units. IBM Plex Mono only for identifiers
        people read character by character.
      </UI.Typography>
      <div className="w-full flex flex-col">
        {(
          [
            "title1",
            "title2",
            "title3",
            "headline",
            "body",
            "callout",
            "subhead",
            "footnote",
            "caption1",
            "caption2",
            "label",
            "id",
            "idSecondary",
          ] as const
        ).map((variant) => (
          <div
            key={variant}
            className="w-full grid grid-cols-[minmax(0,1fr)] sm:grid-cols-[120px_minmax(0,1fr)] items-baseline gap-su2 sm:gap-su4 border-b border-rule border-solid py-su3"
          >
            <UI.Typography variant="label">{variant}</UI.Typography>
            <UI.Typography variant={variant}>
              {variant === "id" || variant === "idSecondary"
                ? "SO-2026-004417"
                : "Every unit, accounted for."}
            </UI.Typography>
          </div>
        ))}
      </div>
      <UI.Paragraph measure>
        Running text stays near 62 characters wide, so the eye finds the next line. Bay{" "}
        <UI.Typography variant="code">WH1-A-12-03</UI.Typography> holds{" "}
        <UI.Text strong>48</UI.Text> units of{" "}
        <UI.Typography variant="code">LPN 00012847</UI.Typography>, counted on the same line
        without breaking the paragraph into blocks.
      </UI.Paragraph>
      <UI.Typography variant="title2">WH1A1203LPN00012847LOT24118RECEIVING</UI.Typography>
      <UI.Typography variant="body" lines={2} measure>
        Clamped to two lines with the full string kept in the title attribute, the way a table
        cell or a drawer header needs it when a description runs long past the width it was
        given.
      </UI.Typography>
      <UI.Space wrap>
        {(["secondary", "tertiary", "info", "success", "warning", "danger"] as const).map(
          (tone) => (
            <UI.Typography key={tone} variant="footnote" tone={tone}>
              {tone}
            </UI.Typography>
          ),
        )}
      </UI.Space>
    </UI.Space>
  );
}
export function DividerDemo() {
  return (
    <div className="w-full text-body text-ink">
      <p>Pallet PLT-4471 staged at dock 3.</p>
      <UI.Divider decorative={false} />
      <p>Next pick wave releases at 14:20.</p>
      <UI.Divider>Receiving</UI.Divider>
      <UI.Divider labelPlacement="start">Put-away</UI.Divider>
      <UI.Divider labelPlacement="end">Dispatch</UI.Divider>
      <div className="flex items-center text-small text-ink-2">
        <span className="su-id-2">WH1-A-12-03</span>
        <UI.Divider orientation="vertical" />
        <span className="su-id-2">LOT 24-118</span>
        <UI.Divider orientation="vertical" />
        12,5 kg
      </div>
      <UI.Divider strength="strong" spacing="compact" />
      <p className="text-ink-2">A strong rule, compact spacing.</p>
    </div>
  );
}
export function FlexDemo() {
  return (
    <UI.Flex vertical gap={4} className="w-full">
      <UI.Flex justify="space-between" align="center" gap={3} wrap className="w-full">
        <UI.Typography variant="id" className="min-w-0 truncate">
          WH1-A-12-03
        </UI.Typography>
        <UI.Flex gap={2} align="center">
          <UI.Button variant="primary">Assign</UI.Button>
          <UI.Button>Cancel</UI.Button>
        </UI.Flex>
      </UI.Flex>
      <UI.Flex gap={2} wrap>
        <UI.Tag>Inbound</UI.Tag>
        <UI.Tag color="info" dot>
          Staged
        </UI.Tag>
        <UI.Tag>Picked</UI.Tag>
        <UI.Tag>Packed</UI.Tag>
        <UI.Tag color="success" dot>
          Shipped
        </UI.Tag>
      </UI.Flex>
    </UI.Flex>
  );
}
export function GridDemo() {
  return (
    <UI.Row gutter={[3, 3]} className="w-full">
      {[10, 14, 8, 8, 8].map((span, i) => (
        <UI.Col key={i} span={span} className="lt-md:(basis-full max-w-full)">
          <div className="bg-surface-2 border border-solid border-border rounded-su-control p-su3">
            <span className="text-small text-ink-2">{span} / 24</span>
          </div>
        </UI.Col>
      ))}
    </UI.Row>
  );
}
export function LayoutDemo() {
  return (
    <UI.Layout style={{ width: "100%", minHeight: 220 }}>
      <UI.Header>
        <span className="inline-flex items-center gap-su2 text-body">
          <span className="su-id">RO_BUC_01</span>
          <span className="text-ink-2">Bucharest DC</span>
        </span>
      </UI.Header>
      <UI.Layout>
        <UI.Sider style={{ width: 120 }}>
          <div className="p-su4 text-small text-ink-2">Navigation</div>
        </UI.Sider>
        <UI.Content role="region" aria-label="Demo content">
          <UI.Panel title="Receipts" count={4}>
            Content sits on the grey ground; panels carry it.
          </UI.Panel>
        </UI.Content>
      </UI.Layout>
      <UI.Footer>Footer</UI.Footer>
    </UI.Layout>
  );
}
export function MasonryDemo() {
  return (
    <UI.Masonry columns={3} minColumnWidth={220}>
      {[
        "Received against ASN 4471 and put away the same shift.",
        "Short-picked twice this week; the cycle count is queued for Thursday and the discrepancy has not been reconciled against the receiving paperwork yet.",
        "Empty since the last move.",
        "Mixed lot. Two pallets of 24118 sit on the lower deck, one of 24122 on the upper — split during the October reslot and never merged back.",
        "Reserved for the Tuesday outbound wave.",
        "Damage hold. Carrier claim filed, awaiting disposition.",
      ].map((copy, i) => (
        <article key={i} className="su-panel p-su3">
          <UI.Typography variant="idSecondary">
            {`WH1-A-${String(i + 1).padStart(2, "0")}`}
          </UI.Typography>
          <p className="mt-su1 mb-0 text-body text-ink">{copy}</p>
        </article>
      ))}
    </UI.Masonry>
  );
}
export function SpaceDemo() {
  return (
    <UI.Space vertical block size="large">
      {(["small", "middle", "large"] as const).map((size) => (
        <UI.Space key={size} size={size}>
          <span className="text-small text-ink-2 w-16">{size}</span>
          <UI.Button>First</UI.Button>
          <UI.Button>Second</UI.Button>
        </UI.Space>
      ))}
      <UI.Space wrap separator={<UI.Divider orientation="vertical" />}>
        <UI.Button variant="ghost">Edit</UI.Button>
        <UI.Button variant="ghost">Duplicate</UI.Button>
        <UI.Button variant="ghost">Archive</UI.Button>
      </UI.Space>
    </UI.Space>
  );
}
export function SplitterDemo() {
  return (
    <UI.Splitter
      style={{ width: "100%", height: 180 }}
      first={<div style={{ padding: 20 }}>Resize this pane</div>}
      second={
        <div style={{ padding: 20 }}>Drag the divider, or use arrow keys.</div>
      }
    />
  );
}
export function AnchorDemo() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[200px_1fr] gap-su6 w-full">
      <UI.Anchor
        className="sticky top-su4 self-start"
        items={[
          { href: "#anchor-receiving", title: "Receiving" },
          { href: "#anchor-putaway", title: "Put-away" },
          { href: "#anchor-allocation", title: "Allocation" },
        ]}
      />
      <div className="flex flex-col gap-su6 text-body text-ink">
        <section id="anchor-receiving" className="min-h-[320px]">
          <h3>Receiving</h3>
          <p>Inbound pallets are checked against ASN 24-118 at dock 3.</p>
        </section>
        <section id="anchor-putaway" className="min-h-[320px]">
          <h3>Put-away</h3>
          <p>LPN 00012847 is routed to bay WH1-A-12-03.</p>
        </section>
        <section id="anchor-allocation" className="min-h-[320px]">
          <h3>Allocation</h3>
          <p>The active link follows your position as you scroll.</p>
        </section>
      </div>
    </div>
  );
}
export function BreadcrumbDemo() {
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Breadcrumb
        items={[
          { label: "WH1", href: "#overview" },
          { label: "Zone B" },
          { label: "Aisle A · Rack 12", href: "#components" },
          { label: <span className="font-mono">LPN 00012847</span> },
        ]}
      />
      <UI.Breadcrumb variant="back" items={[{ label: "Receipts", href: "#Breadcrumb" }]} />
    </UI.Space>
  );
}
export function DropdownDemo() {
  const { message } = UI.useApp();
  const [columns, setColumns] = useState({ lot: true, expiry: false });
  const [group, setGroup] = useState("product");
  return (
    <UI.Space wrap>
      <UI.Dropdown>
        <UI.DropdownTrigger>Actions</UI.DropdownTrigger>
        <UI.DropdownContent>
          <UI.DropdownLabel>Document</UI.DropdownLabel>
          <UI.DropdownItem onSelect={() => message.success("Document duplicated")}>
            Duplicate
          </UI.DropdownItem>
          <UI.DropdownItem onSelect={() => message.info("Link copied to this demo")}>
            Share
          </UI.DropdownItem>
          <UI.DropdownSeparator />
          <UI.DropdownItem danger onSelect={() => message.error("Document deleted")}>
            Delete
          </UI.DropdownItem>
          <UI.DropdownItem disabled>Archive</UI.DropdownItem>
        </UI.DropdownContent>
      </UI.Dropdown>
      <UI.Dropdown>
        <UI.DropdownTrigger variant="ghost">View</UI.DropdownTrigger>
        <UI.DropdownContent>
          <UI.DropdownLabel>Columns</UI.DropdownLabel>
          <UI.DropdownCheckboxItem
            checked={columns.lot}
            onCheckedChange={(lot) => setColumns({ ...columns, lot: lot === true })}
          >
            Lot
          </UI.DropdownCheckboxItem>
          <UI.DropdownCheckboxItem
            checked={columns.expiry}
            onCheckedChange={(expiry) => setColumns({ ...columns, expiry: expiry === true })}
          >
            Expiry date
          </UI.DropdownCheckboxItem>
          <UI.DropdownSeparator />
          <UI.DropdownLabel>Group by</UI.DropdownLabel>
          <UI.DropdownRadioGroup value={group} onValueChange={setGroup}>
            <UI.DropdownRadioItem value="product">Product</UI.DropdownRadioItem>
            <UI.DropdownRadioItem value="location">Location</UI.DropdownRadioItem>
          </UI.DropdownRadioGroup>
        </UI.DropdownContent>
      </UI.Dropdown>
    </UI.Space>
  );
}
export function MenuDemo() {
  const [selected, setSelected] = useState("overview");
  const [section, setSection] = useState("receipts");
  return (
    <div className="flex flex-wrap items-start gap-su6">
      <UI.Menu
        aria-label="Workspace sections"
        style={{ width: 260 }}
        selectedKey={selected}
        onSelect={setSelected}
        items={[
          { key: "workspace", label: "Workspace", type: "group" },
          { key: "overview", label: "Overview" },
          { key: "docs", label: "Documentation", href: "#Menu" },
          {
            key: "projects",
            label: "Projects",
            children: [
              { key: "website", label: "Website" },
              {
                key: "mobile",
                label: "Mobile app",
                children: [{ key: "ios", label: "iOS release channel" }],
              },
            ],
          },
          { key: "div-1", type: "divider" },
          { key: "settings", label: "Settings" },
          { key: "billing", label: "Billing", disabled: true },
          { key: "delete", label: "Delete workspace", danger: true },
        ]}
      />
      <UI.Menu
        variant="panel"
        aria-label="Inbound"
        selectedKey={section}
        onSelect={setSection}
        items={[
          { key: "receipts", label: "Receipts", count: 12 },
          { key: "asn", label: "Advance notices", count: 4 },
          { key: "returns", label: "Returns", count: 2, exception: "2 blocked" },
          { key: "quality", label: "Quality hold" },
        ]}
      />
    </div>
  );
}
export function PaginationDemo() {
  const [page, setPage] = useState(1);
  const [item, setItem] = useState(1);
  const [cursor, setCursor] = useState(1);
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Pagination current={page} total={8} onChange={setPage} />
      <UI.Pagination current={item} total={1284} pageSize={20} onChange={setItem} />
      <UI.Pagination
        variant="keyset"
        current={cursor}
        pageSize={50}
        hasNext={cursor < 3}
        onChange={setCursor}
      />
    </UI.Space>
  );
}
export function StepsDemo() {
  const [step, setStep] = useState(1);
  return (
    <UI.Space vertical block size="large">
      <UI.Steps
        current={step}
        items={[
          { title: "Details" },
          { title: "Preferences" },
          { title: "Complete" },
        ]}
      />
      <UI.Button onClick={() => setStep((step + 1) % 3)}>Next step</UI.Button>
      <UI.Steps
        direction="vertical"
        current={step}
        items={[
          { title: "Details", description: "Who is receiving the shipment." },
          {
            title: "Preferences",
            description: "Carrier, packaging and delivery window.",
            status: step === 1 ? "error" : undefined,
          },
          { title: "Complete", description: "Review and confirm." },
        ]}
      />
      <div className="w-full max-w-[390px]">
        <UI.Steps
          type="bar"
          current={step}
          items={[{ title: "Location" }, { title: "Product" }, { title: "Quantity" }]}
        />
      </div>
    </UI.Space>
  );
}
export function TabsDemo() {
  return (
    <UI.Tabs defaultValue="stock" className="w-full">
      <UI.TabsList>
        <UI.TabsTrigger value="stock">Stock</UI.TabsTrigger>
        <UI.TabsTrigger value="movements" count={128}>
          Movements
        </UI.TabsTrigger>
        <UI.TabsTrigger value="exceptions" count={3} countVariant="danger">
          Exceptions
        </UI.TabsTrigger>
        <UI.TabsTrigger value="settings">Settings</UI.TabsTrigger>
        <UI.TabsTrigger value="counts" disabled>
          Counts
        </UI.TabsTrigger>
      </UI.TabsList>
      <UI.TabsContent value="stock">12,5 kg on hand across 4 bays in WH1-A.</UI.TabsContent>
      <UI.TabsContent value="movements">
        LPN 00012847 picked 14:02, shipped 14:26.
      </UI.TabsContent>
      <UI.TabsContent value="exceptions">
        3 bays out of tolerance since the last count.
      </UI.TabsContent>
      <UI.TabsContent value="settings">
        Allocation rule: FEFO. Short-pick alerts on.
      </UI.TabsContent>
      <UI.TabsContent value="counts">No counts scheduled.</UI.TabsContent>
    </UI.Tabs>
  );
}
export function AutoCompleteDemo() {
  const [partner, setPartner] = useState("cust-003");
  const partners = [
    { value: "cust-001", code: "CUST-001", label: "Vet Clinic Brasov" },
    { value: "cust-003", code: "CUST-003", label: "PetVet Cluj" },
    { value: "cust-007", code: "CUST-007", label: "Agro Farm Iasi, north depot and returns desk" },
    { value: "supp-012", code: "SUPP-012", label: "Bandage Works" },
  ];
  // A server search stood in for: the rows of the term before stay held while the next are fetched.
  const [carrier, setCarrier] = useState("");
  const [searching, setSearching] = useState(false);
  const searchCarriers = (term: string) => {
    setSearching(term !== "");
    if (term !== "") window.setTimeout(() => setSearching(false), 1500);
  };
  return (
    <div className="demo-stack" style={{ width: 320, maxWidth: "100%" }}>
    {/* picker: the value is the option's value, and the box at rest draws the code + name pair. */}
    <UI.FormItem label="Partner">
      <UI.AutoComplete
        picker
        data-testid="partner-picker"
        name="partner"
        placeholder="Search by code or name"
        allowClear
        clearLabel="Clear the partner"
        listLabel="Partners"
        notFoundContent="No partner matches"
        countLabel={(n) => `${n} partners`}
        value={partner}
        onChange={setPartner}
        options={partners}
      />
      <span className="text-small text-ink-2" data-testid="partner-value">
        Value held: <span className="su-id-2">{partner || "none"}</span>
      </span>
    </UI.FormItem>
    <UI.FormItem label="Carrier (server search)">
      <UI.AutoComplete
        picker
        data-testid="carrier-picker"
        placeholder="Search carriers"
        listLabel="Carriers"
        value={carrier}
        onChange={setCarrier}
        onSearch={searchCarriers}
        loading={searching}
        options={partners}
      />
      <span className="text-small text-ink-2" data-testid="carrier-value">
        Value held: <span className="su-id-2">{carrier || "none"}</span>
      </span>
    </UI.FormItem>
    <UI.FormItem label="Bay code">
      <UI.AutoComplete
        placeholder="WH1-A-12-03"
        allowClear
        options={[
          { value: "wh1-a-12-03", label: "WH1-A-12-03 — Receiving aisle, rack face A" },
          { value: "wh1-a-12-04", label: "WH1-A-12-04" },
          { value: "wh1-b-01-01", label: "WH1-B-01-01" },
          { value: "wh1-b-01-02", label: "WH1-B-01-02 (blocked)", disabled: true },
          { value: "wh1-b-02-01", label: "WH1-B-02-01" },
          { value: "wh1-c-04-07", label: "WH1-C-04-07" },
          { value: "wh1-c-04-08", label: "WH1-C-04-08" },
          { value: "wh2-a-01-01", label: "WH2-A-01-01" },
          { value: "wh2-a-01-02", label: "WH2-A-01-02" },
          { value: "wh2-d-09-11", label: "WH2-D-09-11" },
          { value: "wh2-d-09-12", label: "WH2-D-09-12" },
          { value: "stage-out", label: "Staging outbound" },
        ]}
      />
    </UI.FormItem>
    </div>
  );
}
export function CascaderDemo() {
  return (
    <UI.Cascader
      options={[
        {
          value: "design",
          label: "Design",
          children: [
            { value: "components", label: "Components" },
            { value: "tokens", label: "Tokens" },
          ],
        },
        {
          value: "engineering",
          label: "Engineering",
          children: [{ value: "web", label: "Web" }],
        },
      ]}
    />
  );
}
export function CheckboxDemo() {
  return (
    <UI.Space direction="vertical">
      <UI.Checkbox defaultChecked>Email notifications</UI.Checkbox>
      <UI.Checkbox>Product updates</UI.Checkbox>
      <UI.Checkbox disabled>Managed by your organization</UI.Checkbox>
      <UI.Checkbox disabled defaultChecked>
        Required by policy
      </UI.Checkbox>
      <UI.Checkbox checked="indeterminate">Select all (partial)</UI.Checkbox>
      <UI.Checkbox aria-label="Select row" />
    </UI.Space>
  );
}
export function ColorPickerDemo() {
  return (
    <UI.FormItem label="Label colour">
      <UI.ColorPicker defaultValue="#1D4ED8" />
    </UI.FormItem>
  );
}
export function DatePickerDemo() {
  return (
    <UI.Space direction="vertical">
      <UI.FormItem label="Ship date">
        <UI.DatePicker defaultValue="2026-09-09" />
      </UI.FormItem>
      <UI.FormItem label="Delivery window">
        <UI.DatePicker.RangePicker
          defaultValue={["2026-09-09", "2026-09-16"]}
          startLabel="From"
          endLabel="To"
          presets={[
            { label: "September", value: ["2026-09-01", "2026-09-30"] },
          ]}
        />
      </UI.FormItem>
      <UI.FormItem label="Archived on">
        <UI.DatePicker defaultValue="2026-01-04" disabled />
      </UI.FormItem>
    </UI.Space>
  );
}
export function FormDemo() {
  const { message } = UI.useApp();
  return (
    <UI.Space vertical block size="large">
      <UI.Form
        style={{ width: "100%", maxWidth: 360 }}
        onSubmit={(e) => {
          e.preventDefault();
          message.success("Profile saved");
        }}
      >
        <UI.FormItem label="Full name" required help="As it appears on the roster.">
          <UI.Input name="name" required placeholder="Alex Morgan" />
        </UI.FormItem>
        <UI.FormItem
          label="Email address"
          required
          error="Enter a valid work address."
        >
          <UI.Input
            name="email"
            type="email"
            required
            placeholder="alex@example.com"
          />
        </UI.FormItem>
        <UI.FormItem label="Phone" optional>
          <UI.Input name="phone" type="tel" placeholder="+40 21 000 0000" />
        </UI.FormItem>
        <UI.FormActions>
          <UI.Button variant="primary" htmlType="submit">
            Save profile
          </UI.Button>
          <UI.Button>Cancel</UI.Button>
        </UI.FormActions>
      </UI.Form>
      <UI.Form
        layout="horizontal"
        style={{ width: "100%" }}
        onSubmit={(e) => {
          e.preventDefault();
          message.success("Product created");
        }}
      >
        <UI.FormSection title="Identity" description="How the product is found and scanned.">
          <UI.FormItem label="SKU" required>
            <UI.Input name="sku" mono placeholder="SKU-004417" />
          </UI.FormItem>
          <UI.FormItem label="GTIN" optional>
            <UI.Input name="gtin" mono placeholder="05941234000017" />
          </UI.FormItem>
          <UI.FormItem label="Name" className="col-span-2">
            <UI.Input name="product" placeholder="Bandage roll 10cm" />
          </UI.FormItem>
        </UI.FormSection>
        <UI.FormSection title="Storage" description="Used for put-away and picking.">
          <UI.FormItem label="Unit">
            <UI.Select
              defaultValue="buc"
              options={[
                { value: "buc", label: "Pieces (buc)" },
                { value: "kg", label: "Kilograms (kg)" },
              ]}
            />
          </UI.FormItem>
          <UI.FormItem label="Pieces per box" help="Whole boxes only.">
            <UI.InputNumber name="perBox" defaultValue={24} min={1} suffix="buc" />
          </UI.FormItem>
        </UI.FormSection>
        <UI.FormActions>
          <UI.Button variant="primary" htmlType="submit">
            Create product
          </UI.Button>
          <UI.Button>Cancel</UI.Button>
        </UI.FormActions>
      </UI.Form>
    </UI.Space>
  );
}
export function InputDemo() {
  return (
    <UI.Space direction="vertical" style={{ width: "100%", maxWidth: 340 }}>
      <UI.Input aria-label="Your name" placeholder="Your name" />
      <UI.Input
        aria-label="Search"
        allowClear
        defaultValue="WH1-A-12-03"
        prefix={<IconSearch size={16} {...UI.iconDefaults} />}
      />
      <UI.Input aria-label="Location" mono placeholder="A-09-01-1" />
      <UI.Input aria-label="Weight" placeholder="Weight" suffix="kg" />
      <UI.Input aria-label="Password" type="password" defaultValue="receiving" />
      <UI.Input
        aria-label="New password"
        type="password"
        defaultValue="receiving"
        revealLabel="Reveal the new password"
      />
      <UI.Input aria-label="Bin" size="sm" allowClear defaultValue="A-12" />
      <UI.Input aria-label="Aisle" allowClear clearLabel="Clear the aisle" defaultValue="A-12" />
      <UI.FormItem label="Reason" help="Shown on the adjustment's history.">
        <UI.TextArea rows={3} placeholder="Why the count differs" />
      </UI.FormItem>
      <UI.TextArea aria-label="Settings value" mono rows={3} defaultValue={'{ "max_sessions": 3 }'} />
      <UI.Input aria-label="Large" size="lg" placeholder="Large (48)" />
      <UI.FormItem label="Lot code" error="Lot code is required.">
        <UI.Input placeholder="LOT 24-118" mono />
      </UI.FormItem>
      <UI.Input aria-label="Read-only input" readOnly defaultValue="RO_BUC_01" mono />
      <UI.Input aria-label="Disabled input" disabled placeholder="Unavailable" />
    </UI.Space>
  );
}
export function InputNumberDemo() {
  return (
    <UI.Space direction="vertical">
      <UI.FormItem label="Quantity">
        <UI.InputNumber defaultValue={2} min={0} max={10} name="quantity" />
      </UI.FormItem>
      <UI.FormItem label="Received">
        <UI.InputNumber defaultValue={20} min={0} suffix="buc" name="received" />
      </UI.FormItem>
    </UI.Space>
  );
}
export function MentionsDemo() {
  return (
    <UI.Mentions
      placeholder="Type @ to mention someone"
      options={[
        { value: "alex", label: "Alex Morgan" },
        { value: "sam", label: "Sam Chen" },
        { value: "rec", label: "Receiving Bot", disabled: true },
      ]}
    />
  );
}
export function RadioDemo() {
  return (
    <UI.Space direction="vertical">
      <UI.RadioGroup
        defaultValue="comfortable"
        options={[
          { value: "compact", label: "Compact" },
          { value: "comfortable", label: "Comfortable" },
          { value: "spacious", label: "Spacious" },
        ]}
      />
      <UI.RadioGroup
        direction="horizontal"
        defaultValue="auto"
        options={[
          { value: "auto", label: "Auto" },
          { value: "manual", label: "Manual" },
          { value: "off", label: "Off", disabled: true },
        ]}
      />
      <UI.RadioGroup
        direction="horizontal"
        disabled
        defaultValue="daily"
        options={[
          { value: "daily", label: "Daily" },
          { value: "weekly", label: "Weekly" },
        ]}
      />
    </UI.Space>
  );
}
export function RateDemo() {
  return <UI.Rate defaultValue={4} />;
}
export function SelectDemo() {
  return (
    <UI.Space direction="vertical">
      <div style={{ width: 260 }}>
        <UI.Select
          placeholder="Choose a framework"
          options={[
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "svelte", label: "Svelte" },
            { value: "solid", label: "Solid" },
            { value: "qwik", label: "Qwik" },
            { value: "angular", label: "Angular" },
            { value: "ember", label: "Ember" },
            { value: "preact", label: "Preact" },
            { value: "lit", label: "Lit" },
            {
              value: "long",
              label: "A very long framework name that has to truncate",
            },
          ]}
        />
      </div>
      <div style={{ width: 260 }}>
        <UI.Select
          placeholder="Choose a partner"
          options={[
            { value: "p1", code: "P-0041", label: "Farmexim", description: "Supplier · Bucharest" },
            { value: "p2", code: "P-0107", label: "Mediplus Exim" },
            { value: "p3", code: "P-0233", label: "Fildas Trading" },
          ]}
        />
      </div>
      <UI.Select
        prefix="Group by:"
        defaultValue="product"
        options={[
          { value: "product", label: "Product" },
          { value: "location", label: "Location" },
          { value: "lot", label: "Lot" },
        ]}
      />
      {/* Ghost: the picker in chrome (a header's site switcher). The name and the test handle are
          on the trigger itself. */}
      <UI.Select
        variant="ghost"
        aria-label="Warehouse"
        data-testid="warehouse-switcher"
        prefix={<IconBuildingWarehouse size={16} {...UI.iconDefaults} className="text-ink-3" />}
        defaultValue="buc"
        className="max-w-[280px]"
        options={[
          { value: "buc", code: "RO_BUC_01", label: "Bucharest" },
          { value: "clj", code: "RO_CLJ_02", label: "Cluj-Napoca" },
        ]}
      />
      {/* A ghost in a row with no room: the name is cut, then the neighbour, never the code. */}
      <div className="flex w-[160px] min-w-0 items-center gap-su2">
        <UI.Select
          variant="ghost"
          aria-label="Warehouse, tight row"
          prefix={<IconBuildingWarehouse size={16} {...UI.iconDefaults} className="text-ink-3" />}
          defaultValue="buc"
          className="max-w-[280px]"
          options={[
            { value: "buc", code: "RO_BUC_01", label: "Bucharest" },
            { value: "clj", code: "RO_CLJ_02", label: "Cluj-Napoca" },
          ]}
        />
        <span className="w-[160px] min-w-0 truncate text-body text-ink-2">A neighbour that gives way</span>
      </div>
      {/* Compact ghost: the same picker in a phone header, the code alone in a 44 box. */}
      <UI.Select
        variant="ghost"
        compact
        aria-label="Warehouse, phone"
        defaultValue="buc"
        options={[
          { value: "buc", code: "RO_BUC_01", label: "Bucharest" },
          { value: "clj", code: "RO_CLJ_02", label: "Cluj-Napoca" },
        ]}
      />
      <div style={{ width: 260 }}>
        <UI.Select aria-label="Empty list" placeholder="Nothing to choose" emptyContent="No carriers yet" />
      </div>
    </UI.Space>
  );
}
export function SliderDemo() {
  const [value, setValue] = useState([64]);
  return (
    <div style={{ width: "100%", maxWidth: 340 }}>
      <UI.Typography variant="footnote">Volume · {value[0]}%</UI.Typography>
      <UI.Slider value={value} onValueChange={setValue} />
      <UI.Slider defaultValue={[20, 70]} />
      <UI.Slider orientation="vertical" defaultValue={[40]} />
    </div>
  );
}
export function SwitchDemo() {
  return (
    <UI.Space direction="vertical">
      <UI.Switch defaultChecked>Notifications</UI.Switch>
      <UI.Switch>Focus mode</UI.Switch>
      <UI.Switch disabled>Managed setting</UI.Switch>
      <UI.Switch disabled defaultChecked>
        Required by policy
      </UI.Switch>
      <UI.Switch loading defaultChecked>
        Saving…
      </UI.Switch>
      {/* In a FormItem the label above names the switch; the words beside it say the state. */}
      <UI.FormItem label="Inspection on receipt">
        <UI.Switch defaultChecked>{(on) => (on ? "Asked at every receipt" : "Not asked")}</UI.Switch>
      </UI.FormItem>
      <UI.Switch aria-label="Shared device">{(on) => (on ? "On" : "Off")}</UI.Switch>
    </UI.Space>
  );
}
export function TimePickerDemo() {
  return (
    <UI.FormItem label="Meeting time">
      <UI.TimePicker defaultValue="09:41" />
    </UI.FormItem>
  );
}
export function TransferDemo() {
  return (
    <UI.Transfer
      titles={["Available", "Selected"]}
      dataSource={[
        { value: "design", label: "Design" },
        { value: "engineering", label: "Engineering" },
        { value: "marketing", label: "Marketing" },
      ]}
    />
  );
}
export function TreeSelectDemo() {
  return (
    <UI.TreeSelect
      multiple
      treeData={[
        {
          key: "workspace",
          title: "Workspace",
          children: [
            { key: "design", title: "Design" },
            { key: "engineering", title: "Engineering — platform, tooling and infrastructure" },
          ],
        },
      ]}
    />
  );
}
export function UploadDemo() {
  return <UI.Upload multiple />;
}
export function AvatarDemo() {
  const photo =
    "data:image/svg+xml;utf8," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96"><rect width="96" height="96" fill="#1D4ED8"/><circle cx="48" cy="36" r="17" fill="#E8EDF7"/><path d="M12 96c0-20 16-32 36-32s36 12 36 32z" fill="#E8EDF7"/></svg>',
    );
  return (
    <UI.Space align="center">
      <UI.Avatar size="sm" fallback="AM" />
      <UI.Avatar fallback="SC" />
      <UI.Avatar size="lg" fallback="JL" />
      <UI.Avatar size="lg" src={photo} alt="Jamie Lin" fallback="JL" />
      <UI.Avatar size="lg" src="/broken.png" alt="Ada Moss" fallback="AM" />
    </UI.Space>
  );
}
export function BadgeDemo() {
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Space size={6} align="center">
        <UI.Badge count={3}>
          <UI.Avatar size="lg" fallback="AM" />
        </UI.Badge>
        <UI.Badge dot variant="danger">
          <UI.Avatar size="lg" fallback="SC" />
        </UI.Badge>
        <UI.Badge count={128} variant="warning">
          <UI.Avatar size="lg" fallback="JL" />
        </UI.Badge>
        <UI.Badge count={7} variant="danger">
          <UI.Avatar size="lg" fallback="RE" />
        </UI.Badge>
      </UI.Space>
      <UI.Space wrap align="center">
        {(["neutral", "accent", "info", "success", "warning", "danger"] as const).map(
          (variant) => (
            <UI.Badge key={variant} count={12} variant={variant} />
          ),
        )}
        <UI.Badge count={0} showZero />
        <UI.Badge count={1284} max={999} />
      </UI.Space>
    </UI.Space>
  );
}
export function CalendarDemo() {
  return (
    <UI.Space vertical block size="large">
      <UI.Calendar
        fullscreen
        defaultValue={new Date(2026, 8, 9)}
        dateRender={(date) => (date.getDate() === 15 ? "Design review" : null)}
        disabledDate={(date) => date.getDay() === 0}
      />
      <UI.Calendar defaultValue={new Date(2026, 8, 25)} />
    </UI.Space>
  );
}
export function CardDemo() {
  return (
    <UI.Space vertical block>
      <UI.Card
        code={
          <span className="inline-flex items-center gap-su2">
            A-01 <UI.StatusDot tone="success" label="On hand" />
          </span>
        }
        title="Receiving"
        extra="Updated 12:27"
        style={{ width: "100%" }}
      >
        Stock arrives against an ASN. Quantities and lots are checked before put-away.
      </UI.Card>
      <div className="flex flex-wrap gap-su4">
        {/* The overview tile: the whole card is one link, with a chevron after the title. */}
        <UI.Card href="#Card" title="Deliveries" className="w-[208px]">
          <span className="flex items-baseline gap-su2 h-[40px]">
            <span className="text-[length:var(--su-text-display)] leading-[var(--su-leading-display)] font-semibold su-tabular">
              3
            </span>
            <span className="text-small text-ink-2 whitespace-nowrap">to receive today</span>
          </span>
          <span className="flex flex-col mt-su2 text-small text-ink-2 whitespace-nowrap">
            <span className="font-medium text-danger-text">1 late</span>
            <span>1 receiving · 1 at 15:27</span>
          </span>
          <UI.Progress
            className="mt-su4"
            value={7}
            max={13}
            blocked={1}
            aria-label="7 of 13 lines received; 1 line late"
          />
          <span className="block mt-su2 text-small text-ink-2 truncate">
            <span className="text-ink">7</span> of <span className="text-ink">13</span> lines
            received
          </span>
        </UI.Card>
        <UI.Card code="A-02" title="Allocation" href="#Card" className="w-[208px]">
          <span className="text-small text-ink-2">A link card with a code above its title.</span>
        </UI.Card>
      </div>
      <UI.Card
        variant="panel"
        title="Dense panel"
        extra={<UI.Button size="sm">Edit</UI.Button>}
        style={{ width: "100%" }}
      >
        The panel variant: a 44 header with the section title, body padded 16.
      </UI.Card>
    </UI.Space>
  );
}
export function CarouselDemo() {
  return (
    <UI.Carousel style={{ width: "100%" }}>
      {[
        "Designed for clarity.",
        "Built for focus.",
        "Made to feel familiar.",
      ].map((text) => (
        <UI.CarouselItem key={text}>
          <div
            style={{
              padding: 40,
              background: "var(--su-surface-2)",
              textAlign: "center",
            }}
          >
            {text}
          </div>
        </UI.CarouselItem>
      ))}
    </UI.Carousel>
  );
}
export function CollapseDemo() {
  return (
    <UI.Collapse
      items={[
        {
          key: "one",
          label: "What is Synapse UI?",
          children:
            "A React component library built with Radix primitives and semantic design tokens.",
        },
        {
          key: "two",
          label: "Can I customize the theme?",
          children:
            "Use ConfigProvider to set your theme and override individual tokens.",
          extra: "2 min read",
        },
        {
          key: "three",
          label: "Is this section available?",
          children: "Not yet.",
          disabled: true,
        },
      ]}
    />
  );
}
export function DescriptionsDemo() {
  return (
    <UI.Space vertical block size="large">
      <UI.Descriptions
        title="Package"
        extra={<a href="#Descriptions">Edit</a>}
        items={[
          { label: "Project", value: "Synapse UI" },
          { label: "Version", value: "0.2.0" },
          { label: "Framework", value: "React" },
          { label: "Weight", value: "12,5 kg" },
          {
            label: "Description",
            value: "White panels on a grey ground, one action blue, IBM Plex.",
            span: 2,
          },
        ]}
      />
      {/* The read-out card: stacked items, inset 16. */}
      <UI.Descriptions
        bordered
        column={1}
        className="w-[208px]"
        items={[
          { label: "Supported until", value: "31.12.2026" },
          { label: "Last movement", value: "18.09 14:05" },
        ]}
      />
      <UI.Descriptions
        layout="horizontal"
        column={1}
        items={[
          { label: "Location", value: <span className="su-id">A-09-01-1</span> },
          { label: "Received", value: "25.09.2026 12:27" },
        ]}
      />
    </UI.Space>
  );
}
export function EmptyDemo() {
  return (
    <UI.Space vertical block size="large">
      {/* Inside a panel, with at most one secondary button. */}
      <UI.Panel flush className="w-full max-w-[376px]">
        <UI.Empty
          title="No receipts today"
          description="Receipts appear here as soon as a truck is checked in."
        >
          <UI.Button>New receipt</UI.Button>
        </UI.Empty>
      </UI.Panel>
      <UI.Empty compact image={false} description="No results for “A-09”." />
    </UI.Space>
  );
}
const imageDemoSrc =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="140"><rect width="240" height="140" fill="#0F2971"/><rect x="16" y="16" width="208" height="108" fill="none" stroke="#3B82F6" stroke-width="2"/><text x="120" y="78" fill="#fff" font-family="monospace" font-size="14" text-anchor="middle">BAY 07 / SLOT 12</text></svg>',
  );
export function ImageDemo() {
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Image
        src={imageDemoSrc}
        alt="Bay 07 slot 12"
        width={240}
        height={140}
        preview
      />
      <UI.Image width={240} height={140} fallback="Your image preview" />
    </UI.Space>
  );
}
export function ListDemo() {
  return (
    <div style={{ width: "100%", display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 24 }}>
      <UI.List>
        <UI.ListItem
          interactive
          onClick={() => {}}
          avatar={<UI.Avatar size="md">DS</UI.Avatar>}
          title="Design system"
          description="Tokens, materials and motion for every SynapseWare surface"
          extra="Updated today"
        />
        <UI.ListItem
          interactive
          onClick={() => {}}
          avatar={<UI.Avatar size="md">CL</UI.Avatar>}
          title="Component library"
          description="Updated yesterday"
          extra="42 items"
        />
        <UI.ListItem title="Brand guidelines" description="Updated last week" extra="Draft" />
      </UI.List>
      <UI.List bordered split={false}>
        <UI.ListItem title="Bordered, unsplit" description="Dense panel variant" />
        <UI.ListItem title="Second row" />
      </UI.List>
      <UI.Empty description="No results" />
    </div>
  );
}
export function ListyDemo() {
  return (
    <UI.Listy height={200} style={{ width: "100%" }}>
      <UI.ListyItem key="pinned" title="Pinned collection" extra="1000 items" />
      {Array.from({ length: 1000 }, (_, i) => (
        <UI.ListyItem key={i}>Collection item {i + 1}</UI.ListyItem>
      ))}
    </UI.Listy>
  );
}
export function PanelDemo() {
  return (
    <UI.Space vertical block size="large">
      <UI.Panel
        title="Exceptions"
        // The page's own section: an h2 with the same 16/24 600 look.
        titleAs="h2"
        count={3}
        extra={
          <>
            <UI.Button size="sm" variant="ghost">
              Export
            </UI.Button>
            <UI.Button size="sm">Assign</UI.Button>
          </>
        }
        footer="Updated azi 16:27"
      >
        Three bays are out of tolerance since the last cycle count.
      </UI.Panel>
      <UI.Panel
        title="To resolve now"
        count={<UI.Badge count={5} variant="danger" aria-label="5 exceptions" />}
        footer="Late ones first · 2 of 5 shown"
        flush
        className="w-full max-w-[440px]"
      >
        <UI.List>
          <UI.ListItem
            avatar={<UI.StatusDot tone="danger" label="Critical" />}
            title={
              <>
                Lot <span className="font-mono text-[0.9em] font-medium">AMX-2407</span> expired on
                20.09.2026
              </>
            }
            description={
              <>
                80 buc still at <span className="font-mono">A-01-03-1</span>
              </>
            }
            extra={<a href="#Panel">View lot</a>}
          />
          <UI.ListItem
            avatar={<UI.StatusDot tone="warning" label="Attention" />}
            title={
              <>
                Lot <span className="font-mono text-[0.9em] font-medium">PIP-2508</span> expires in
                20 days
              </>
            }
            description="300 buc in stock"
            extra={<a href="#Panel">View lot</a>}
          />
        </UI.List>
      </UI.Panel>
    </UI.Space>
  );
}
export function PopoverDemo() {
  return (
    <UI.Popover
      trigger={<UI.Button>Show details</UI.Button>}
      content={
        <div className="p-su1 text-body">
          <strong className="font-semibold">A little more context</strong>
          <p className="m-0 text-ink-2">This content stays close to its trigger.</p>
        </div>
      }
    />
  );
}
export function QRCodeDemo() {
  return <UI.QRCode value="https://example.com" size={160} />;
}
export function SegmentedDemo() {
  const [value, setValue] = useState("day");
  return (
    <UI.Segmented
      value={value}
      onValueChange={setValue}
      options={[
        { value: "day", label: "Day" },
        { value: "week", label: "Week" },
        { value: "month", label: "Month" },
      ]}
    />
  );
}
export function StatisticDemo() {
  return (
    <UI.Space wrap size="large" align="start">
      <UI.Statistic title="Lines received" value={"2\u202f290"} suffix="buc" />
      <UI.Statistic title="Open exceptions" value={3} description="2 since yesterday" />
      <UI.Statistic compact title="Pick rate" value="118" suffix="/h" />
    </UI.Space>
  );
}
export function StatusDotDemo() {
  return (
    <UI.Space direction="vertical">
      {(
        [
          ["neutral", "Draft"],
          ["info", "In progress"],
          ["success", "Accepted"],
          ["warning", "Short pick"],
          ["danger", "Refused"],
        ] as const
      ).map(([tone, word]) => (
        <span key={tone} className="inline-flex items-center gap-su2 text-body">
          <UI.StatusDot tone={tone} />
          {word}
        </span>
      ))}
      <span className="inline-flex items-center gap-su2 text-body">
        <UI.StatusDot pending />
        Not started
      </span>
      <span className="inline-flex items-center gap-su2 text-small text-ink-2">
        <UI.StatusDot size={6} tone="danger" label="Late" />
        Size 6, with its own label
      </span>
    </UI.Space>
  );
}
// U+202F narrow no-break space between thousands ("1 200"), as the v2 formatting rules ask.
const groupThousands = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, "\u202f");
const stock = [
  { id: "A-01-01-1", sku: "SKU-004417", name: "Bandage roll 10cm", qty: 240, unit: "buc", lot: "LOT 24-118" },
  { id: "A-01-02-1", sku: "SKU-004418", name: "Gauze pad 5×5", qty: 1200, unit: "buc", lot: "LOT 24-122" },
  { id: "A-02-01-3", sku: "SKU-007702", name: "Saline 0,9% 500ml", qty: 36, unit: "buc", lot: null },
];
export function TableDemo() {
  const [sort, setSort] = useState<"ascending" | "descending">("ascending");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(true);
  const [detail, setDetail] = useState<string | null>("A-01-01-1");
  const rows = [
    "Design system",
    "Component library",
    "Brand guidelines",
    "Website",
    "Mobile app",
    "Documentation",
  ]
    .filter((x) => x.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (sort === "descending" ? b.localeCompare(a) : a.localeCompare(b)));
  const pages = Math.max(1, Math.ceil(rows.length / 3));
  return (
    <div className="demo-stack">
      <div className="flex flex-col gap-su3">
        <div className="w-full max-w-[280px]">
          <UI.Input
            aria-label="Filter projects"
            placeholder="Filter projects…"
            prefix={<IconSearch size={16} {...UI.iconDefaults} />}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <UI.Table
          aria-label="Projects"
          empty={
            rows.length ? null : (
              <UI.Empty compact description="No matching projects" />
            )
          }
          footer={
            <UI.Pagination
              variant="keyset"
              current={page}
              pageSize={3}
              hasNext={page < pages}
              onChange={setPage}
            />
          }
        >
          <UI.Table.Head>
            <UI.Table.Row>
              <UI.Table.Th
                sort={sort}
                onSort={() => setSort(sort === "ascending" ? "descending" : "ascending")}
              >
                Project
              </UI.Table.Th>
              <UI.Table.Th>Status</UI.Table.Th>
            </UI.Table.Row>
          </UI.Table.Head>
          <UI.Table.Body>
            {rows.slice((page - 1) * 3, page * 3).map((name) => (
              <UI.Table.Row key={name}>
                <UI.Table.Td>{name}</UI.Table.Td>
                <UI.Table.Td>
                  <UI.Tag color="success" dot>
                    Active
                  </UI.Tag>
                </UI.Table.Td>
              </UI.Table.Row>
            ))}
          </UI.Table.Body>
        </UI.Table>
      </div>
      {/* A titled strip above the column header, a body that scrolls under a pinned header inside
          the panel, 24 between columns, and a footer note that runs to several lines. */}
      <UI.Table
        aria-labelledby="modules-title"
        stickyHeader
        panelClassName="max-h-[236px]"
        columnGap={24}
        header={
          <>
            <h3 id="modules-title" className="m-0 text-section font-semibold">
              Installed modules
            </h3>
            <UI.Badge count={9} variant="neutral" />
            <a href="#Table" className="ms-auto text-small font-medium text-action-text">
              Module log
            </a>
            {/* A 32 control: the strip stays 44. */}
            <div className="w-[140px]">
              <UI.Select
                size="sm"
                aria-label="Modules shown"
                defaultValue="all"
                options={[
                  { value: "all", label: "All modules" },
                  { value: "active", label: "Active only" },
                ]}
              />
            </div>
          </>
        }
        footerWrap
        footer={
          <span data-testid="modules-note">
            Modules are installed from the server, not from this screen. Run the install command on
            the machine that hosts the service, then come back here and refresh: the new module
            shows as inactive until an administrator turns it on for a site.
          </span>
        }
      >
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th className="w-[220px]">Module</UI.Table.Th>
            <UI.Table.Th>What it does</UI.Table.Th>
            <UI.Table.Th className="w-[96px]">Version</UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          {["Labels", "Carrier link", "Cold chain", "Counting", "Returns", "Kitting", "Yard", "Billing", "Customs"].map(
            (name, i) => (
              <UI.Table.Row key={name}>
                <UI.Table.Td className="font-medium">{name}</UI.Table.Td>
                <UI.Table.Td kind="secondary">Adds the {name.toLowerCase()} screens and their rules</UI.Table.Td>
                <UI.Table.Td>{`1.${i}.0`}</UI.Table.Td>
              </UI.Table.Row>
            ),
          )}
        </UI.Table.Body>
      </UI.Table>
      {/* stickyHeader on a table that stacks: at desk width the header is pinned, and below `lg`
          the records scroll inside the same capped panel, so the last one and the footer stay
          in reach. */}
      <UI.Table
        aria-label="Count tasks"
        stack="lg"
        stickyHeader
        panelClassName="max-h-[236px]"
        footer={<span data-testid="count-tasks-footer">12 count tasks</span>}
      >
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th className="w-[140px]">Bin</UI.Table.Th>
            <UI.Table.Th>Task</UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          {Array.from({ length: 12 }, (_, i) => (
            <UI.Table.Row key={i} data-testid={`count-task-${i + 1}`}>
              <UI.Table.Td kind="id">{`A-01-${String(i + 1).padStart(2, "0")}`}</UI.Table.Td>
              <UI.Table.Td>Count the bin</UI.Table.Td>
            </UI.Table.Row>
          ))}
        </UI.Table.Body>
      </UI.Table>
      {/* headerHidden: no header row is drawn, the cells still name the columns. Table.Detail with
          its own start (16, there is no disclosure column) and the 12-below strip. */}
      <UI.Table aria-label="Docks" headerHidden className="table-fixed">
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th className="w-[120px]">Dock</UI.Table.Th>
            <UI.Table.Th>Use</UI.Table.Th>
            <UI.Table.Th className="w-[120px]">State</UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          <UI.Table.Row expanded>
            <UI.Table.Td kind="id">DOCK-01</UI.Table.Td>
            <UI.Table.Td>Receiving</UI.Table.Td>
            <UI.Table.Td>
              <UI.Tag color="warning" dot>
                Paused
              </UI.Tag>
            </UI.Table.Td>
          </UI.Table.Row>
          <UI.Table.Detail colSpan={3} startInset={16} strip data-testid="dock-strip">
            <div className="flex flex-wrap items-center gap-su2">
              <span className="su-label">Why</span>
              <UI.Input size="sm" aria-label="Reason" fullWidth={false} style={{ width: 240 }} />
              <UI.Button size="sm" variant="primary">
                Resume the dock
              </UI.Button>
              <UI.Button size="sm" variant="ghost">
                Cancel
              </UI.Button>
            </div>
          </UI.Table.Detail>
          <UI.Table.Row>
            <UI.Table.Td kind="id">DOCK-02</UI.Table.Td>
            <UI.Table.Td>Shipping</UI.Table.Td>
            <UI.Table.Td />
          </UI.Table.Row>
        </UI.Table.Body>
      </UI.Table>
      {/* stackEnd: under 1024 the state tag ends the record's first line and the rest starts below. */}
      <UI.Table aria-label="Arrivals" stack="lg">
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th>Arrival</UI.Table.Th>
            <UI.Table.Th>Carrier</UI.Table.Th>
            <UI.Table.Th>State</UI.Table.Th>
            <UI.Table.Th>Trailer</UI.Table.Th>
            <UI.Table.Th>Dock</UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          <UI.Table.Row data-testid="arrival-1">
            <UI.Table.Td kind="id">ARR-2026-0412</UI.Table.Td>
            <UI.Table.Td className="flex-1 truncate">Transcarpatica Logistic and Forwarding</UI.Table.Td>
            <UI.Table.Td stackEnd data-testid="arrival-1-state">
              <UI.Tag color="info" dot>
                Unloading
              </UI.Tag>
            </UI.Table.Td>
            <UI.Table.Td kind="idSecondary" data-testid="arrival-1-trailer">
              B-204-TRL
            </UI.Table.Td>
            <UI.Table.Td kind="idSecondary">DOCK-01</UI.Table.Td>
          </UI.Table.Row>
          <UI.Table.Row data-testid="arrival-2">
            <UI.Table.Td kind="id">ARR-2026-0413</UI.Table.Td>
            <UI.Table.Td className="flex-1 truncate">Fan Courier</UI.Table.Td>
            <UI.Table.Td stackEnd>
              <UI.Tag color="danger" dot>
                Late
              </UI.Tag>
            </UI.Table.Td>
            <UI.Table.Td kind="idSecondary">CJ-11-FAN</UI.Table.Td>
            <UI.Table.Td kind="idSecondary">DOCK-02</UI.Table.Td>
          </UI.Table.Row>
        </UI.Table.Body>
      </UI.Table>
      {/* stack="lg": under 1024 the same tree is a list of records, with no sideways scroll. */}
      <UI.Table aria-label="Stock by location" stack="lg">
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th>
              <span className="sr-only">Details</span>
            </UI.Table.Th>
            <UI.Table.Th facet={<UI.Table.Facet count={2} aria-label="Zone filter, 2 chosen" />}>
              Location
            </UI.Table.Th>
            <UI.Table.Th>Product</UI.Table.Th>
            <UI.Table.Th numeric>Quantity</UI.Table.Th>
            <UI.Table.Th facet={<UI.Table.Facet aria-label="Lot filter" />}>Lot</UI.Table.Th>
            <UI.Table.Th>
              <span className="sr-only">Actions</span>
            </UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          <UI.Table.GroupRow>
            <UI.Table.Td kind="control">
              <UI.Table.Disclosure
                expanded={open}
                aria-label="Show zone A"
                onClick={() => setOpen(!open)}
              />
            </UI.Table.Td>
            <UI.Table.Td colSpan={2}>
              <span className="flex items-center gap-su2 min-w-0 whitespace-nowrap">
                <UI.StatusDot tone="warning" />
                <span className="font-mono shrink-0">ZONE-A</span>
                <span className="min-w-0 truncate">Picking</span>
                <span className="shrink-0 font-normal text-ink-2">3 locations</span>
              </span>
            </UI.Table.Td>
            <UI.Table.Td kind="number" className="font-normal text-ink-2">
              {groupThousands(stock.reduce((sum, row) => sum + row.qty, 0))}
            </UI.Table.Td>
            <UI.Table.Td colSpan={2} />
          </UI.Table.GroupRow>
          {open &&
            stock.map((row) => {
              const detailId = `pallets-${row.id}`;
              const isOpen = detail === row.id;
              return (
                <Fragment key={row.id}>
                  <UI.Table.Row
                    selected={row.id === "A-01-02-1"}
                    expanded={isOpen}
                    data-testid={`stock-${row.id}`}
                    // The meta line is a second <tr>; metaRowProps is how it gets a handle.
                    metaRowProps={{ "data-testid": `stock-${row.id}-meta` }}
                    meta={
                      row.lot ? undefined : (
                        <UI.Table.Meta
                          tone="warning"
                          lead="Count to approve:"
                          action={<a href="#Table">Review</a>}
                        >
                          the lot was not scanned at receipt.
                        </UI.Table.Meta>
                      )
                    }
                  >
                    <UI.Table.Td kind="control">
                      <UI.Table.Disclosure
                        expanded={isOpen}
                        aria-controls={isOpen ? detailId : undefined}
                        aria-label={`${isOpen ? "Hide" : "Show"} pallets in ${row.id}`}
                        onClick={() => setDetail(isOpen ? null : row.id)}
                      />
                    </UI.Table.Td>
                    <UI.Table.Td kind="id">{row.id}</UI.Table.Td>
                    <UI.Table.Td>
                      <span className="inline-flex items-baseline gap-su2 min-w-0">
                        <span className="su-id">{row.sku}</span>
                        <span className="text-ink-2 truncate">{row.name}</span>
                      </span>
                    </UI.Table.Td>
                    <UI.Table.Td kind="number">
                      {groupThousands(row.qty)}{" "}
                      <span className="text-small text-ink-2">{row.unit}</span>
                    </UI.Table.Td>
                    {row.lot ? (
                      <UI.Table.Td kind="idSecondary">{row.lot}</UI.Table.Td>
                    ) : (
                      <UI.Table.Td kind="empty" aria-label="No lot scanned" />
                    )}
                    <UI.Table.Td kind="actions">
                      <UI.Button
                        variant="ghost"
                        icon={<IconDots {...UI.iconDefaults} />}
                        aria-label={`Actions for ${row.id}`}
                      />
                    </UI.Table.Td>
                  </UI.Table.Row>
                  {isOpen ? (
                    <UI.Table.Detail
                      colSpan={6}
                      id={detailId}
                      // rowProps reach the detail's own <tr>; the rest reach its <td>.
                      rowProps={{ "data-testid": `stock-${row.id}-detail` }}
                    >
                      <UI.Table
                        size="nested"
                        aria-label={`Pallets in ${row.id}`}
                        // A 28 button in the 40 strip, a 32 control in the 44 footer: neither grows.
                        header={
                          <>
                            <span>2 pallets, 240 on hand</span>
                            <UI.Button size="sm" className="ms-auto">
                              History
                            </UI.Button>
                          </>
                        }
                        footerWrap
                        footer={
                          <>
                            <span>Sorted by</span>
                            <div className="w-[140px]">
                              <UI.Select
                                size="sm"
                                aria-label="Pallet order"
                                defaultValue="received"
                                options={[
                                  { value: "received", label: "Received" },
                                  { value: "quantity", label: "Quantity" },
                                ]}
                              />
                            </div>
                          </>
                        }
                      >
                        <UI.Table.Head>
                          <UI.Table.Row>
                            <UI.Table.Th>Pallet</UI.Table.Th>
                            <UI.Table.Th numeric>Quantity</UI.Table.Th>
                            <UI.Table.Th numeric>Reserved</UI.Table.Th>
                            <UI.Table.Th>For</UI.Table.Th>
                            <UI.Table.Th>Received</UI.Table.Th>
                          </UI.Table.Row>
                        </UI.Table.Head>
                        <UI.Table.Body>
                          <UI.Table.Row>
                            <UI.Table.Td className="font-mono whitespace-nowrap">3594 0000 0000 0000 29</UI.Table.Td>
                            <UI.Table.Td kind="number">160</UI.Table.Td>
                            <UI.Table.Td kind="number">20</UI.Table.Td>
                            <UI.Table.Td kind="idSecondary">SO-2026-1187</UI.Table.Td>
                            <UI.Table.Td kind="secondary">12.09.2026</UI.Table.Td>
                          </UI.Table.Row>
                          <UI.Table.Row>
                            <UI.Table.Td className="font-mono whitespace-nowrap">3594 0000 0000 0000 36</UI.Table.Td>
                            <UI.Table.Td kind="number">80</UI.Table.Td>
                            <UI.Table.Td kind="empty" numeric aria-label="Nothing reserved" />
                            <UI.Table.Td kind="empty" aria-label="No order" />
                            <UI.Table.Td kind="secondary">12.09.2026</UI.Table.Td>
                          </UI.Table.Row>
                        </UI.Table.Body>
                      </UI.Table>
                    </UI.Table.Detail>
                  ) : null}
                </Fragment>
              );
            })}
          <UI.Table.FoldRow colSpan={6} startColumn={2} action={<a href="#Table">Show them</a>}>
            11 more locations in zone A
          </UI.Table.FoldRow>
        </UI.Table.Body>
      </UI.Table>
      {/* Stacked, a value wider than the record breaks inside it: nothing scrolls to reach it. */}
      <UI.Table aria-label="Serial numbers" stack="lg">
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th>Pallet</UI.Table.Th>
            <UI.Table.Th>Lot</UI.Table.Th>
            <UI.Table.Th numeric>Quantity</UI.Table.Th>
            <UI.Table.Th numeric>Weight</UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          <UI.Table.Row data-testid="serial-long">
            <UI.Table.Td kind="id">359400000000000029359400000000000036359400000000000043</UI.Table.Td>
            <UI.Table.Td kind="idSecondary">LOT-2026-09-12-000000000000000000000000000000000118</UI.Table.Td>
            <UI.Table.Td kind="number">1234567890123456789012345678901234567890123456789012345</UI.Table.Td>
            <UI.Table.Td numeric>9876543210987654321098765432109876543210987654321098765</UI.Table.Td>
          </UI.Table.Row>
          <UI.Table.Row data-testid="serial-short">
            <UI.Table.Td kind="id">359400000000000029</UI.Table.Td>
            <UI.Table.Td kind="idSecondary">LOT 24-118</UI.Table.Td>
            <UI.Table.Td kind="number">160</UI.Table.Td>
            <UI.Table.Td numeric>412,5</UI.Table.Td>
          </UI.Table.Row>
        </UI.Table.Body>
      </UI.Table>
      <UI.Table aria-label="Loading" loading>
        <UI.Table.Head>
          <UI.Table.Row>
            <UI.Table.Th>Order</UI.Table.Th>
            <UI.Table.Th>Partner</UI.Table.Th>
            <UI.Table.Th numeric>Lines</UI.Table.Th>
          </UI.Table.Row>
        </UI.Table.Head>
        <UI.Table.Body>
          <UI.Table.SkeletonRow columns={3} />
          <UI.Table.SkeletonRow columns={3} />
        </UI.Table.Body>
      </UI.Table>
    </div>
  );
}
export function TagDemo() {
  const [filters, setFilters] = useState([
    { key: "zone", label: "Zone:", value: "A, B" },
    { key: "status", label: "Status:", value: "Short pick" },
  ]);
  const [tags, setTags] = useState(["Removable", "Needs review"]);
  return (
    <UI.Space direction="vertical" size="large">
      <UI.Space wrap>
        <UI.Tag>Default</UI.Tag>
        <UI.Tag color="neutral">Draft</UI.Tag>
        <UI.Tag color="info">In progress</UI.Tag>
        <UI.Tag color="success">Accepted</UI.Tag>
        <UI.Tag color="warning">Short pick</UI.Tag>
        <UI.Tag color="danger">Refused</UI.Tag>
        <UI.Tag color="accent">Selected</UI.Tag>
      </UI.Space>
      {/* size="handheld": 28 high, 17/24, for a terminal screen. */}
      <UI.Space wrap>
        <UI.Tag size="handheld" color="danger" dot data-testid="tag-handheld">
          Late
        </UI.Tag>
        <UI.Tag size="handheld" color="info">
          In progress
        </UI.Tag>
      </UI.Space>
      <UI.Space wrap>
        <UI.Tag color="neutral" dot>
          Draft
        </UI.Tag>
        <UI.Tag color="info" dot>
          In progress
        </UI.Tag>
        <UI.Tag color="success" dot>
          Production
        </UI.Tag>
        <UI.Tag color="warning" dot>
          Short pick
        </UI.Tag>
        <UI.Tag color="danger" dot>
          Refused
        </UI.Tag>
      </UI.Space>
      <UI.Space wrap>
        {filters.map((f) => (
          <UI.Tag
            key={f.key}
            closable
            filterLabel={f.label}
            removeLabel={`Remove the ${f.label.replace(":", "")} filter`}
            onClose={() => setFilters((prev) => prev.filter((x) => x.key !== f.key))}
          >
            {f.value}
          </UI.Tag>
        ))}
        {tags.map((tag, i) => (
          <UI.Tag
            key={tag}
            closable
            // removeLabel names the remove button; an application passes one in its own language.
            removeLabel={i === 1 ? "Mark as reviewed" : undefined}
            onClose={() => setTags((prev) => prev.filter((t) => t !== tag))}
          >
            {tag}
          </UI.Tag>
        ))}
      </UI.Space>
    </UI.Space>
  );
}
export function TimelineDemo() {
  return (
    <UI.Timeline
      items={[
        { title: "Project created", description: "9:00" },
        { title: "Design reviewed", description: "10:30" },
        { title: "Ready to build", description: "Now", color: "accent" },
      ]}
    />
  );
}
export function TooltipDemo() {
  return (
    <UI.Space>
      <UI.Tooltip content="Save your changes">
        <UI.Button>Hover or focus me</UI.Button>
      </UI.Tooltip>
      <UI.Tooltip
        content={
          <>
            Search <UI.Kbd>Ctrl K</UI.Kbd>
          </>
        }
      >
        <UI.Button icon={<IconSearch {...UI.iconDefaults} />} aria-label="Search" />
      </UI.Tooltip>
    </UI.Space>
  );
}
export function TourDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UI.Button id="tour-start" onClick={() => setOpen(true)}>
        Start tour
      </UI.Button>
      <UI.Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={[
          {
            target: "#tour-start",
            title: "Welcome to the library",
            description: "Every component includes an interactive preview.",
          },
          {
            target: "#demo-code",
            title: "Make it yours",
            description: "Copy the example and adapt it to your project.",
          },
        ]}
      />
    </>
  );
}
export function TreeDemo() {
  return (
    <UI.Tree
      defaultExpandedKeys={["workspace"]}
      treeData={[
        {
          key: "workspace",
          title: "Workspace",
          children: [
            {
              key: "design",
              title: "Design",
              children: [{ key: "tokens", title: "Tokens" }],
            },
            { key: "archive", title: "Archive", disabled: true },
            { key: "engineering", title: "Engineering" },
          ],
        },
      ]}
    />
  );
}
export function AlertDemo() {
  return (
    <UI.Space vertical block>
      <UI.Alert showIcon title="Signed in on a shared terminal">
        Sign out when you leave the dock.
      </UI.Alert>
      {/* closeLabel names the close button; an application passes one in its own language. */}
      <UI.Alert type="info" showIcon title="A little heads-up" closable closeLabel="Hide this tip">
        Your changes are saved automatically.
      </UI.Alert>
      <UI.Alert type="success" showIcon title="All up to date">
        You are using the latest version.
      </UI.Alert>
      <UI.Alert
        type="warning"
        showIcon
        compact
        title="3 bays out of tolerance"
        action={<UI.Button variant="text">Review</UI.Button>}
      >
        Counted since the last cycle count.
      </UI.Alert>
      <UI.Alert type="error" showIcon closable title="Sync failed">
        https://warehouse.example.com/api/v1/shipments/LPN-0000-9182-3345-AAAA
        returned 502.
      </UI.Alert>
    </UI.Space>
  );
}
export function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const [sharing, setSharing] = useState(false);
  return (
    <UI.Space wrap>
      <UI.Drawer
        title="Project details"
        trigger={<UI.Button>Open drawer</UI.Button>}
        footer={
          <>
            <UI.Button variant="primary">Save</UI.Button>
            <UI.Button>Cancel</UI.Button>
          </>
        }
      >
        <UI.FormItem label="Project name">
          <UI.Input defaultValue="Synapse UI" />
        </UI.FormItem>
        <UI.FormItem label="Status">
          <UI.Select
            placeholder="Choose a status"
            options={[
              { value: "draft", label: "Draft" },
              { value: "active", label: "Active" },
              { value: "archived", label: "Archived" },
            ]}
          />
        </UI.FormItem>
        <p className="mt-auto mb-0 text-small text-ink-2">
          Only the name and status change; members keep their access.
        </p>
      </UI.Drawer>
      {/* Controlled and trigger-less, the way an application opens one from its own button.
          closeLabel names the close button; an application passes one in its own language. */}
      <UI.Button onClick={() => setOpen(true)}>Open controlled drawer</UI.Button>
      <UI.Drawer
        open={open}
        onOpenChange={setOpen}
        title="Rename project"
        closeLabel="Close without renaming"
      >
        <UI.Input aria-label="New name" placeholder="New name" autoFocus />
      </UI.Drawer>
      {/* Opened from a menu item, the way a table row's menu opens one. The item is gone once
          the menu closes, so closing the drawer gives focus back to the menu's trigger. */}
      <UI.Dropdown>
        <UI.DropdownTrigger>Project actions</UI.DropdownTrigger>
        <UI.DropdownContent>
          <UI.DropdownItem onSelect={() => setSharing(true)}>Share project</UI.DropdownItem>
        </UI.DropdownContent>
      </UI.Dropdown>
      <UI.Drawer open={sharing} onOpenChange={setSharing} title="Share project">
        <UI.Input aria-label="Email" placeholder="Email" />
      </UI.Drawer>
    </UI.Space>
  );
}
export function MessageDemo() {
  const { message } = UI.useApp();
  return (
    <UI.Space wrap>
      <UI.Button onClick={() => message.open({ content: "Changes saved", type: "success" })}>
        Success message
      </UI.Button>
      <UI.Button onClick={() => message.error("Could not save. Try again.")}>
        Error message
      </UI.Button>
      <UI.Button
        onClick={() =>
          message.open({
            content: (
              <>
                Location <span className="font-mono text-[0.9em]">A-09-01-1</span> deleted
              </>
            ),
            type: "info",
            action: <UI.Button variant="text">Undo</UI.Button>,
          })
        }
      >
        Message with action
      </UI.Button>
      {/* closeLabel names every toast's close button. An application passes one in its own
          language on its App, which hands it to MessageProvider; this App is nested only to
          show both names side by side. */}
      <UI.App closeLabel="Close message">
        <LabelledMessage />
      </UI.App>
    </UI.Space>
  );
}
function LabelledMessage() {
  const { message } = UI.useApp();
  return (
    <UI.Button onClick={() => message.info("Draft kept for later")}>
      Labelled message
    </UI.Button>
  );
}
export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <UI.Button onClick={() => setOpen(true)}>Open modal</UI.Button>
      <UI.Modal
        open={open}
        onOpenChange={setOpen}
        title="Save your changes?"
        description="This project was last saved 12 minutes ago."
        showDescription
        footer={
          <>
            <UI.Button variant="primary" onClick={() => setOpen(false)}>
              Save changes
            </UI.Button>
            <UI.Button onClick={() => setOpen(false)}>Cancel</UI.Button>
          </>
        }
      >
        <p>Your latest edits will be saved to this project.</p>
      </UI.Modal>
      {/* No title: `aria-label` names the dialog, `closeLabel` its close button. */}
      <UI.Modal
        trigger={<UI.Button>Open untitled modal</UI.Button>}
        aria-label="Keyboard shortcuts"
        closeLabel="Close shortcuts"
      >
        <p>Press / to search, g then s to open stock.</p>
      </UI.Modal>
    </>
  );
}
export function NotificationDemo() {
  const [visible, setVisible] = useState(true);
  return visible ? (
    <UI.Notification
      title="Your export is ready"
      type="success"
      onClose={() => setVisible(false)}
      action={<UI.Button size="sm">Download</UI.Button>}
    >
      All your design tokens have been exported successfully.
    </UI.Notification>
  ) : (
    <UI.Button onClick={() => setVisible(true)}>Show notification</UI.Button>
  );
}
export function PopconfirmDemo() {
  const { message } = UI.useApp();
  return (
    <UI.Popconfirm
      title="Remove this item?"
      description="You can add it again later."
      okText="Remove"
      okDanger
      onConfirm={async () => {
        await new Promise((r) => setTimeout(r, 900));
        message.success("Item removed");
      }}
    >
      <UI.Button>Remove item</UI.Button>
    </UI.Popconfirm>
  );
}
export function ProgressDemo() {
  const [value, setValue] = useState(64);
  return (
    <UI.Space vertical block>
      <UI.Progress value={value} showInfo />
      <UI.Progress value={100} showInfo />
      <UI.Progress value={40} showInfo status="error" />
      {/* Inline meters in a row: 48 wide, the count beside them (partial, complete, late). */}
      <div className="flex flex-wrap items-center gap-su4">
        <UI.Progress inline value={2} max={3} format={(_, v, m) => `${v}/${m}`} aria-label="2 of 3 lines" />
        <UI.Progress inline value={3} max={3} format={(_, v, m) => `${v}/${m}`} aria-label="3 of 3 lines" />
        <UI.Progress
          inline
          value={1}
          max={3}
          blocked={1}
          format={(_, v, m) => `${v}/${m}`}
          aria-label="1 of 3 lines, 1 blocked"
        />
        <UI.Progress
          inline
          value={2}
          max={3}
          steps={3}
          format={() => (
            <>
              2/3 <span className="text-ink-2">picked</span>
            </>
          )}
          aria-label="Reserved and picked; not shipped yet"
        />
      </div>
      <UI.Progress value={value} type="circle" showInfo />
      <UI.Progress value={null} />
      <UI.Progress value={null} type="circle" />
      <UI.Button
        onClick={() => setValue(value >= 100 ? 0 : Math.min(100, value + 12))}
      >
        Advance progress
      </UI.Button>
    </UI.Space>
  );
}
export function ResultDemo() {
  return (
    <UI.Result
      status="success"
      title="You’re all set"
      subTitle="Your project is ready for the next step."
    />
  );
}
export function SkeletonDemo() {
  return (
    <UI.Space vertical block>
      <UI.Skeleton width="65%" height={24} />
      <UI.Skeleton rows={3} height={14} />
      <UI.Skeleton circle height={40} />
      {/* `label`: the application's own words for the state. */}
      <UI.Skeleton rows={2} label="Loading the stock list" data-testid="skeleton-named" />
      {/* `label={null}`: decoration only, for a caller that announces the state itself. */}
      <UI.Skeleton rows={2} label={null} data-testid="skeleton-decorative" />
      <UI.Skeleton loading={false}>Loaded content.</UI.Skeleton>
    </UI.Space>
  );
}
export function SpinDemo() {
  return (
    <UI.Space vertical block>
      <UI.Spin tip="Receiving" />
      <UI.Spin tip="Allocating" spinning>
        <div className="su-panel p-su6 min-h-[96px]">Bay A-01 inventory is updating.</div>
      </UI.Spin>
    </UI.Space>
  );
}
export function WatermarkDemo() {
  return (
    <UI.Watermark
      content={["CONFIDENTIAL & INTERNAL", "DO NOT DISTRIBUTE"]}
      style={{ width: "100%", minHeight: 200, padding: 24 }}
    >
      A protected document preview.
    </UI.Watermark>
  );
}
export function HandheldTopBarDemo() {
  const { message } = UI.useApp();
  return (
    <div className="flex flex-wrap justify-center gap-su6 w-full">
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.HandheldTopBar
          flow="Receiving"
          step={2}
          total={4}
          onBack={() => message.info("Back to the menu")}
          site="RO_BUC_01"
          user="Ioana P."
          onSessionClick={() => message.info("Session menu")}
          sessionAriaLabel="Session: RO_BUC_01, Ioana P."
        />
      </UI.ConfigProvider>
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.HandheldTopBar
          flow="Menu"
          brand="Terminal"
          brandIcon={<IconBuildingWarehouse size={22} {...UI.iconDefaults} />}
          site="RO_BUC_01"
          user="Ioana P."
        />
      </UI.ConfigProvider>
      {/* A write in flight: both buttons stay in place, disabled. A long operator name is cut,
          and the flow name is the page's h1. */}
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.HandheldTopBar
          flow="Change password"
          flowAs="h1"
          onBack={() => message.info("Back")}
          backLabel="Back"
          backDisabled
          site="RO_CONSTANTA_PORT_SOUTH_03"
          user="Maria-Alexandra Constantinescu-Dumitrescu"
          onSessionClick={() => message.info("Session menu")}
          sessionAriaLabel="Session: RO_CONSTANTA_PORT_SOUTH_03, Maria-Alexandra Constantinescu-Dumitrescu"
          sessionDisabled
        />
      </UI.ConfigProvider>
    </div>
  );
}
export function DocketDemo() {
  const { message } = UI.useApp();
  return (
    <div className="flex flex-wrap justify-center gap-su6 w-full">
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.Docket aria-label="Answers given. Tap one to scan it again.">
          <UI.DocketRow
            label="Location"
            value="A-09-01-1"
            onClick={() => message.info("Scan the location again")}
          />
          <UI.DocketRow
            label="Product"
            value="SKU-004417"
            sub="Bandage roll 10cm"
            onClick={() => message.info("Scan the product again")}
          />
          <UI.DocketRow label="Quantity" value="20 buc" mono={false} disabled />
        </UI.Docket>
        <div className="hh-body">
          <UI.ScanField label="Scan the location" placeholder="Scan the location" />
        </div>
      </UI.ConfigProvider>
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.Docket readOnly aria-label="Receipt">
          <UI.DocketRow label="Location" value="A-09-01-1" data-testid="docket-location" />
          <UI.DocketRow label="Quantity" value="20 buc" mono={false} />
          {/* wrap: an identifier longer than the row is read whole. */}
          <UI.DocketRow
            wrap
            label="Pallet"
            value="359400000000000029"
            sub="Lot LOT-2026-04-BANDAGE-ROLL-10CM-EU"
            data-testid="docket-pallet"
            valueProps={{ "data-testid": "docket-pallet-value" }}
          />
          <UI.DocketRow wrap label="Dock" value="DOCK-01" data-testid="docket-dock" />
        </UI.Docket>
        <div className="hh-body">
          <UI.Button variant="primary" size="lg">
            Next receipt
          </UI.Button>
        </div>
      </UI.ConfigProvider>
    </div>
  );
}
export function ScanFieldDemo() {
  const [last, setLast] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [reads, setReads] = useState(0);
  return (
    <div className="flex flex-wrap justify-center gap-su6 w-full">
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <div className="hh-body">
          <UI.ScanField
            label="Scan the location"
            placeholder="Scan or type"
            onScan={setLast}
          />
          <span className="text-hh-body text-ink-2" aria-live="polite">
            {last ? `Read: ${last}` : "Type a code and press Enter."}
          </span>
        </div>
      </UI.ConfigProvider>
      {/* The question as the screen's heading, a hint tied to the input, and a read in flight. */}
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <div className="hh-body">
          <UI.ScanField
            label="Scan the shelf"
            labelAs="h2"
            hint="The label on the shelf where the goods go"
            placeholder="Ready to scan"
            busy={busy}
            busyLabel="Checking the shelf"
            data-testid="scan-busy"
            onScan={(read) => {
              setReads((n) => n + 1);
              setLast(read);
              setBusy(true);
              window.setTimeout(() => setBusy(false), 1500);
            }}
          />
          <span className="text-hh-body text-ink-2" data-testid="scan-reads">
            Reads taken: {reads}
          </span>
          {/* The error line of the library's own fields, under a field it does not draw. */}
          <div>
            <UI.Input aria-label="Gross weight" aria-invalid aria-describedby="weight-error" defaultValue="0" />
            <UI.HandheldErrorLine id="weight-error">
              The weight must be more than <code>0</code>.
            </UI.HandheldErrorLine>
          </div>
        </div>
      </UI.ConfigProvider>
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <div className="hh-body">
          <UI.ScanField
            label="Scan the location"
            defaultValue="PAL-0042"
            error={
              <>
                Last scan refused: <code>PAL-0042</code> is a pallet, not a shelf.
              </>
            }
          />
        </div>
      </UI.ConfigProvider>
    </div>
  );
}
export function QuantityStepperDemo() {
  const [qty, setQty] = useState<number | null>(20);
  const [kg, setKg] = useState("0.1");
  return (
    <div className="flex flex-wrap justify-center gap-su6 w-full">
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <div className="hh-body">
          <UI.QuantityStepper
            label="How many pieces?"
            value={qty}
            onChange={setQty}
            unit="buc"
            max={500}
          />
        </div>
      </UI.ConfigProvider>
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <div className="hh-body">
          <UI.QuantityStepper
            variant="output"
            aria-label="Pieces counted"
            value={qty}
            onChange={setQty}
            unit="buc"
          />
        </div>
      </UI.ConfigProvider>
      {/* Decimal mode: the value is text ("12.5"), shown with the caller's separator, stepped exactly. */}
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <div className="hh-body">
          <UI.QuantityStepper
            label="How many kilograms?"
            labelAs="h2"
            decimalValue={kg}
            onDecimalChange={setKg}
            decimalSeparator=","
            scale={4}
            step="0.1"
            max="500"
            unit="kg"
            inputProps={{ "data-testid": "qty-decimal" }}
          />
          <span className="text-hh-body text-ink-2" data-testid="qty-decimal-value">
            Value held: {kg === "" ? "empty" : kg}
          </span>
          {/* A value handed over in its display form is read as typed text would be, not thrown on. */}
          <UI.QuantityStepper
            aria-label="Formatted value"
            decimalValue="1,5"
            decimalSeparator=","
            unit="kg"
            inputProps={{ "data-testid": "qty-formatted", readOnly: true }}
          />
        </div>
      </UI.ConfigProvider>
    </div>
  );
}
export function KeypadDemo() {
  const [digits, setDigits] = useState("20");
  const [weight, setWeight] = useState("");
  return (
    <div className="flex flex-wrap justify-center gap-su6 w-full">
    {/* The decimal key shows the caller's separator; the text it edits holds ".". */}
    <UI.ConfigProvider density="handheld" className="hh-frame">
      <div className="hh-body">
        <UI.QuantityStepper
          label="Gross weight"
          decimalValue={weight}
          onDecimalChange={setWeight}
          decimalSeparator=","
          scale={4}
          unit="kg"
          inputProps={{ "data-testid": "keypad-decimal-field" }}
        />
        <UI.Keypad
          aria-label="Weight keypad"
          keys={UI.KEYPAD_DECIMAL_KEYS}
          decimalSeparator=","
          decimalLabel="Decimal comma"
          onKey={(key) => setWeight((w) => UI.applyKeypadKey(w, key, 15, 4))}
        />
        <span className="text-hh-body text-ink-2" data-testid="keypad-decimal-value">
          Value held: {weight === "" ? "empty" : weight}
        </span>
      </div>
    </UI.ConfigProvider>
    <UI.ConfigProvider density="handheld" className="hh-frame">
      <div className="hh-body">
        <UI.QuantityStepper
          label="How many pieces?"
          value={digits === "" ? null : Number(digits)}
          onChange={(v) => setDigits(v == null ? "" : String(v))}
          unit="buc"
        />
        {/* Quick answers (handheld secondaries, 2 columns; the pressed one filled the field),
            the keypad 8 below them, then the primary 12 below and the secondary 8 below that. */}
        <div className="flex flex-col gap-su2">
          <div role="group" aria-label="Quick answers" className="grid grid-cols-2 gap-su2">
            {[
              ["The rest · 300", "300"],
              ["One case · 24", "24"],
            ].map(([text, value]) => (
              <UI.Button
                key={value}
                block
                aria-pressed={digits === value}
                onClick={() => setDigits(value)}
              >
                {text}
              </UI.Button>
            ))}
          </div>
          <UI.Keypad onKey={(key) => setDigits((d) => UI.applyKeypadKey(d, key))} />
        </div>
        <div className="flex flex-col gap-su2">
          <UI.Button variant="primary" size="lg">
            Confirm {digits || "0"} buc
          </UI.Button>
          <UI.Button block>Cancel receipt</UI.Button>
        </div>
      </div>
    </UI.ConfigProvider>
    </div>
  );
}
export function ResultBandDemo() {
  return (
    <div className="flex flex-wrap justify-center gap-su6 w-full">
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.ResultBand title="Accepted" signal="1 beep · short vibration">
          <code>A-09-01-1</code> · 20 buc put away.
        </UI.ResultBand>
      </UI.ConfigProvider>
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.ResultBand
          tone="danger"
          title="Refused"
          signal="2 beeps · long vibration"
          instruction="Scan the shelf label, not the pallet's."
        >
          <code>PAL-0042</code> is a pallet label.
        </UI.ResultBand>
      </UI.ConfigProvider>
      {/* A refusal is a whole sentence: the lines wrap and the band grows. */}
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.ResultBand
          tone="danger"
          title="Refused"
          signal="2 beeps · long vibration"
          instruction="Put the pallet aside and ask the shift lead to check the delivery note."
        >
          Lot <code>L-2026-0917-B</code> expires in 12 days, and this product needs at least 60 days
          of shelf life at receipt.
        </UI.ResultBand>
      </UI.ConfigProvider>
      {/* A title too long to share its line with the signal: the signal drops under it. */}
      <UI.ConfigProvider density="handheld" className="hh-frame">
        <UI.ResultBand
          tone="danger"
          title="Refused: wrong location"
          signal="2 beeps · long vibration"
          instruction="Scan the shelf label, not the pallet's."
        >
          <code>PAL-0042</code> is a pallet label.
        </UI.ResultBand>
      </UI.ConfigProvider>
    </div>
  );
}
export function AffixDemo() {
  return (
    <div className="h-45 w-full overflow-auto">
      <UI.Affix className="bg-canvas border-b border-solid border-rule px-3 py-su2">
        I stay in view
      </UI.Affix>
      <div className="h-100 p-3">
        Scroll inside this preview to see the sticky header.
      </div>
    </div>
  );
}
export function AppDemo() {
  const { message, modal, notification } = UI.useApp();
  return (
    <UI.Space wrap>
      <UI.Button
        onClick={() =>
          notification.open({
            title: "Export ready",
            description: "Your tokens are ready to download.",
          })
        }
      >
        Show notification
      </UI.Button>
      <UI.Button
        onClick={() => message.success("A message from the shared App context")}
      >
        Send message
      </UI.Button>
      <UI.Button
        onClick={() =>
          modal.confirm({
            title: "Continue?",
            content: "This dialog is controlled by the App context.",
          })
        }
      >
        Confirm action
      </UI.Button>
      <UI.Button
        danger
        onClick={() =>
          modal.confirm({
            title: "Delete location A-09-01-1?",
            content: "The location must be empty. This cannot be undone.",
            okText: "Delete location",
            danger: true,
          })
        }
      >
        Destructive confirm
      </UI.Button>
    </UI.Space>
  );
}
export function BorderBeamDemo() {
  return (
    <UI.Space vertical block>
      <UI.Alert type="warning" showIcon title="Deprecated in v2">
        No v2 surface uses BorderBeam. The export stays so existing imports compile; it is
        removed in the next major.
      </UI.Alert>
      <UI.BorderBeam duration={2.4} style={{ width: "100%" }}>
        A moving highlight around a featured element.
      </UI.BorderBeam>
    </UI.Space>
  );
}
export function ConfigProviderDemo() {
  const { theme } = UI.useConfig();
  return (
    <UI.Space direction="vertical">
      <UI.Typography>Current theme: {theme}</UI.Typography>
      <UI.Typography variant="footnote" tone="secondary">
        Use the appearance control in the toolbar to change every component together.
      </UI.Typography>
      <UI.Typography variant="footnote" tone="secondary">
        A nested provider scopes a token override and flips direction to rtl.
      </UI.Typography>
      <UI.ConfigProvider tokens={{ action: "#1e3a8a" }} direction="rtl" locale="ar-EG">
        <UI.Button variant="primary">Scoped action colour</UI.Button>
      </UI.ConfigProvider>
      <UI.Typography variant="footnote" tone="secondary">
        density=&quot;handheld&quot; re-sizes the generic controls inside it.
      </UI.Typography>
      <UI.ConfigProvider density="handheld">
        <UI.Space wrap>
          <UI.Button variant="primary">Confirm</UI.Button>
          <UI.Button>Skip</UI.Button>
        </UI.Space>
      </UI.ConfigProvider>
    </UI.Space>
  );
}

// Glass only reads as glass over something busy; this is the stand-in backdrop.
const glassGround =
  "grid w-full gap-su3 p-su4 bg-gradient-to-br from-action via-accent to-beam";

export function GlassDemo() {
  return (
    <UI.Space vertical block size="large">
      <div className="relative h-[220px] w-full overflow-auto su-panel">
        <UI.Header material="glass" className="sticky top-0 z-1">
          <span className="text-body font-medium">Header material=&quot;glass&quot;</span>
        </UI.Header>
        <div className="p-su4 flex flex-col gap-su2">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className="su-panel p-su3 text-body">
              Row {i + 1}: content scrolls under the sticky header.
            </div>
          ))}
        </div>
      </div>
      <div className={`${glassGround} sm:grid-cols-2`}>
        <UI.Glass className="p-su4">
          <span className="su-label">regular</span>
          <p className="m-0 mt-su2 text-body">Blurred backdrop, hairline base.</p>
        </UI.Glass>
        <UI.Glass elevated className="p-su4">
          <span className="su-label">regular · elevated</span>
          <p className="m-0 mt-su2 text-body">A denser fill, never a shadow.</p>
        </UI.Glass>
        <UI.Glass variant="clear" className="p-su4">
          <span className="su-label">clear</span>
          <p className="m-0 mt-su2 text-body">Lets the backdrop through.</p>
        </UI.Glass>
        <UI.Glass variant="clear" dim className="p-su4">
          <span className="su-label">clear · dim</span>
          <p className="m-0 mt-su2 text-body">Dimmed for legibility over media.</p>
        </UI.Glass>
      </div>
      <div className={`${glassGround} grid-cols-2 sm:grid-cols-4`}>
        {(["none", "subtle", "default", "strong"] as const).map((chrome) => (
          <UI.Glass key={chrome} chrome={chrome} className="p-su4">
            <span className="su-label">chrome {chrome}</span>
          </UI.Glass>
        ))}
      </div>
    </UI.Space>
  );
}

export function ChromeDemo() {
  return (
    <UI.Space vertical block size="large">
      {(["bg-paper", glassGround] as const).map((ground) => (
        <div key={ground} className={`grid w-full gap-su4 p-su4 sm:grid-cols-3 ${ground}`}>
          {(["subtle", "default", "strong"] as const).map((strength) => (
            <UI.Chrome
              key={strength}
              strength={strength}
              className="p-su4 bg-[var(--su-glass-solid)]"
            >
              <span className="su-label text-label-secondary">{strength}</span>
            </UI.Chrome>
          ))}
        </div>
      ))}
    </UI.Space>
  );
}

const surfaceTones = [
  "system",
  "systemSecondary",
  "systemTertiary",
  "grouped",
  "groupedSecondary",
  "groupedTertiary",
  "fill",
  "fillSecondary",
  "fillTertiary",
  "fillQuaternary",
] as const;

export function SurfaceDemo() {
  return (
    <UI.Space vertical block size="large">
      <div className="grid w-full grid-cols-2 gap-su2 sm:grid-cols-5">
        {surfaceTones.map((tone) => (
          <UI.Surface
            key={tone}
            tone={tone}
            elevation="1"
            className="p-su3 min-h-su16"
          >
            <span className="su-label text-label-secondary">{tone}</span>
          </UI.Surface>
        ))}
      </div>
      <div className="grid w-full gap-su3 sm:grid-cols-3">
        {(["none", "1", "2"] as const).map((elevation) => (
          <UI.Surface
            key={elevation}
            tone="systemSecondary"
            elevation={elevation}
            className="p-su4"
          >
            <span className="su-label text-label-secondary">
              elevation {elevation}
            </span>
          </UI.Surface>
        ))}
      </div>
    </UI.Space>
  );
}

const shaderFrame = { width: "100%", height: 240 } as const;

export function PaperTextureDemo() {
  return <UI.PaperTexture style={shaderFrame} />;
}
export function DitheringDemo() {
  return <UI.Dithering style={shaderFrame} />;
}
export function DotGridDemo() {
  return <UI.DotGrid style={shaderFrame} />;
}
export function MeshGradientDemo() {
  return <UI.MeshGradient style={shaderFrame} />;
}
export function NeuroNoiseDemo() {
  return <UI.NeuroNoise style={shaderFrame} />;
}
export function PulsingBorderDemo() {
  return <UI.PulsingBorder style={shaderFrame} />;
}
export function WarpDemo() {
  return <UI.Warp style={shaderFrame} />;
}
export function LightFieldDemo() {
  return (
    <div className="grid grid-cols-2 gap-su3">
      {(["dither", "pure", "grain", "halftone"] as const).map((variant) => (
        <figure key={variant} className="m-0">
          <UI.LightField variant={variant} style={{ width: "100%", height: 160 }} />
          <figcaption className="mt-su2 su-label text-ink-2">
            {variant}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
