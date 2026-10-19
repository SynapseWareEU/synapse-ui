import {
  useRef,
  useState,
  type CSSProperties,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { IconChevronDown } from "@tabler/icons-react";
import { cn } from "../../utils/cn";

export interface TreeNode {
  key: string;
  title: ReactNode;
  children?: TreeNode[];
  disabled?: boolean;
}

export interface TreeProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  treeData: TreeNode[];
  defaultExpandedKeys?: string[];
  /** Controlled selection. Falls back to `defaultSelectedKeys` when omitted. */
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  onSelect?: (key: string) => void;
}

/**
 * One focusable control per row (APG roving tabindex): the chevron is a click zone
 * inside the row button, not a nested button, so pointer users get a separate
 * expand target while keyboard users expand with ArrowRight/ArrowLeft.
 *
 * v2 rows: 32 tall, padding 0 8, 20 indent per level, 14/20 ink, square inside the panel.
 * The panel clips its corners, so the focus ring is drawn inset.
 */
const rowClass =
  "flex items-center gap-su1 w-full min-h-[var(--su-control-sm)] pe-su2 ps-[calc(var(--su-space-2)+var(--su-tree-depth,0)*20px)] rounded-su-row font-sans text-body text-start transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] su-focus-ring focus-visible:outline-offset-[-2px]";

function TreeNodeView({
  node,
  depth,
  expanded,
  selected,
  focusKey,
  toggle,
  select,
}: {
  node: TreeNode;
  depth: number;
  expanded: Set<string>;
  selected: Set<string>;
  focusKey: string | undefined;
  toggle: (key: string) => void;
  select: (key: string) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expanded.has(node.key);
  const isSelected = selected.has(node.key);

  return (
    <div className="block" role="none">
      <button
        type="button"
        role="treeitem"
        data-key={node.key}
        aria-level={depth + 1}
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isOpen : undefined}
        tabIndex={node.key === focusKey ? 0 : -1}
        className={cn(
          rowClass,
          // One background and one text colour per state (no opacity for disabled).
          node.disabled
            ? "bg-transparent text-ink-3 cursor-not-allowed"
            : isSelected
              ? "bg-action-subtle text-ink cursor-pointer [@media(hover:hover)]:hover:bg-action-subtle-hover"
              : "bg-transparent text-ink cursor-pointer [@media(hover:hover)]:hover:bg-surface-hover",
        )}
        style={{ "--su-tree-depth": depth } as CSSProperties}
        disabled={node.disabled}
        onClick={() => select(node.key)}
      >
        {hasChildren ? (
          // 24 mini ghost toggle, 16 ink-3 chevron (right → down). The ::before stretches its
          // tap area to the full 32 row height without moving the glyph or the label.
          <span
            aria-hidden
            className={cn(
              "relative inline-flex shrink-0 items-center justify-center size-[var(--su-control-mini)] rounded-su-tag text-ink-3",
              "before:content-empty before:absolute before:-inset-[4px]",
              !node.disabled && "[@media(hover:hover)]:hover:bg-fill",
            )}
            onClick={(event) => {
              event.stopPropagation();
              toggle(node.key);
            }}
          >
            <IconChevronDown
              size={16}
              stroke={1.75}
              className={cn(
                "transition-transform duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)]",
                isOpen ? "rotate-0" : "-rotate-90 rtl:rotate-90",
              )}
            />
          </span>
        ) : (
          <span className="shrink-0 size-[var(--su-control-mini)]" aria-hidden />
        )}
        <span className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap">
          {node.title}
        </span>
      </button>
      {hasChildren && isOpen ? (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeView
              key={child.key}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selected={selected}
              focusKey={focusKey}
              toggle={toggle}
              select={select}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Tree({
  treeData,
  defaultExpandedKeys = [],
  selectedKeys,
  defaultSelectedKeys = [],
  className,
  onSelect,
  ...rest
}: TreeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(() => new Set(defaultExpandedKeys));
  const [ownSelected, setOwnSelected] = useState(() => new Set(defaultSelectedKeys));
  const [focusKey, setFocusKey] = useState<string>();
  const selected = selectedKeys ? new Set(selectedKeys) : ownSelected;

  // Roving tabindex anchor: the remembered row, or the first one when it is collapsed away.
  const visible: string[] = [];
  const collect = (nodes: TreeNode[]) => {
    for (const node of nodes) {
      // Disabled rows are unfocusable (`HTMLElement.focus()` is a no-op on a disabled
      // button), so they must never become the roving-tabindex anchor.
      if (!node.disabled) visible.push(node.key);
      if (node.children?.length && expanded.has(node.key)) collect(node.children);
    }
  };
  collect(treeData);
  const activeKey = focusKey && visible.includes(focusKey) ? focusKey : visible[0];

  const toggle = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (!next.delete(key)) next.add(key);
      return next;
    });
  };

  const select = (key: string) => {
    setFocusKey(key);
    if (!selectedKeys) setOwnSelected(new Set([key]));
    onSelect?.(key);
  };

  /** Visible rows in DOM order — the rendered tree already is the flattened list. */
  const rows = () =>
    Array.from(
      ref.current?.querySelectorAll<HTMLElement>('[role="treeitem"]:not([disabled])') ?? [],
    );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const list = rows();
    const index = list.indexOf(document.activeElement as HTMLElement);
    if (index < 0) return;
    const current = list[index];
    const key = current.dataset.key!;
    const level = Number(current.getAttribute("aria-level"));
    const open = current.getAttribute("aria-expanded");
    let next: HTMLElement | undefined;

    switch (event.key) {
      case "ArrowDown":
        next = list[index + 1];
        break;
      case "ArrowUp":
        next = list[index - 1];
        break;
      case "Home":
        next = list[0];
        break;
      case "End":
        next = list[list.length - 1];
        break;
      case "ArrowRight":
        if (open === "false") toggle(key);
        else if (open === "true") next = list[index + 1];
        break;
      case "ArrowLeft":
        if (open === "true") toggle(key);
        else
          next = list
            .slice(0, index)
            .reverse()
            .find((el) => Number(el.getAttribute("aria-level")) < level);
        break;
      default:
        return;
    }

    event.preventDefault();
    if (next) {
      setFocusKey(next.dataset.key);
      next.focus();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        // Panel: surface, 1px border, radius 8 (a caller's utilities still override the skin).
        "su-panel py-su1",
        className,
      )}
      role="tree"
      onKeyDown={onKeyDown}
      onFocus={(event) => {
        const key = (event.target as HTMLElement).dataset?.key;
        if (key) setFocusKey(key);
      }}
      {...rest}
    >
      {treeData.map((node) => (
        <TreeNodeView
          key={node.key}
          node={node}
          depth={0}
          expanded={expanded}
          selected={selected}
          focusKey={activeKey}
          toggle={toggle}
          select={select}
        />
      ))}
    </div>
  );
}
