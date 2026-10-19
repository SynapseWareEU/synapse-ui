import * as PopoverPrimitive from "@radix-ui/react-popover";
import { IconChevronDown, IconChevronRight } from "@tabler/icons-react";
import { useCallback, useMemo, useState, type ReactNode } from "react";
import { cn } from "../../utils/cn";
import { CheckboxMark } from "./Checkbox";
import { useFieldState, useFormItemContext } from "./Form";
import { selectTriggerClass, selectTriggerSizeClass } from "./Select";
import type { TreeSelectNode } from "./types";

type TreeSelectBaseProps = {
  placeholder?: string;
  disabled?: boolean;
  treeData?: TreeSelectNode[];
  className?: string;
};

export type TreeSelectSingleProps = TreeSelectBaseProps & {
  multiple?: false;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
};

export type TreeSelectMultipleProps = TreeSelectBaseProps & {
  multiple: true;
  value?: string[];
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
};

export type TreeSelectProps = TreeSelectSingleProps | TreeSelectMultipleProps;

function findNodeTitle(nodes: TreeSelectNode[], key: string): string | null {
  for (const node of nodes) {
    if (node.key === key) return node.title;
    if (node.children) {
      const found = findNodeTitle(node.children, key);
      if (found) return found;
    }
  }
  return null;
}

interface TreeNodeRowProps {
  node: TreeSelectNode;
  depth: number;
  expanded: Set<string>;
  selected: string | string[] | undefined;
  multiple: boolean;
  disabled?: boolean;
  onToggleExpand: (key: string) => void;
  onSelect: (key: string) => void;
}

/*
 * TreeSelect (§4.2, D): rows 32, padding 0 8, radius 4 (inside an overlay), 20 indent per level.
 * Toggle: a 24 mini button with a 16 ink-3 chevron. `multiple` adds the shared 16 checkbox mark,
 * 8 before the title. Selected: action-subtle with ink text; hover: surface-hover (action-subtle-hover on a
 * selected row). The row's buttons are Tab stops, so they keep the focus outline, drawn inset so
 * it stays inside the row.
 */
const rowClass =
  "flex items-center gap-su1 w-full min-w-0 min-h-[var(--su-row-overlay)] [@media(hover:none)]:min-h-[var(--su-hit-target)] pe-su2 py-0 rounded-su-tag transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none";

// One background per state, so stylesheet order never decides between them.
const rowStateClass = {
  idle: "text-ink [@media(hover:hover)]:hover:bg-surface-hover",
  selected: "bg-action-subtle text-ink [@media(hover:hover)]:hover:bg-action-subtle-hover",
  disabled: "text-ink-3",
};

const expandButtonClass =
  "inline-flex items-center justify-center shrink-0 size-[var(--su-control-mini)] p-0 rounded-su-tag bg-transparent text-ink-3 cursor-pointer su-focus-ring focus-visible:-outline-offset-2 transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none [@media(hover:hover)]:hover:enabled:bg-fill [@media(hover:hover)]:hover:enabled:text-ink disabled:cursor-not-allowed [@media(hover:none)]:su-hit-44";

// `group/cb` lets the shared CheckboxMark take its hover from the whole label.
const labelButtonClass =
  "group/cb flex items-center gap-su2 flex-1 self-stretch min-w-0 p-0 rounded-su-tag bg-transparent font-sans text-body text-start cursor-pointer su-focus-ring focus-visible:-outline-offset-2 disabled:cursor-not-allowed";

function TreeNodeRow({
  node,
  depth,
  expanded,
  selected,
  multiple,
  disabled,
  onToggleExpand,
  onSelect,
}: TreeNodeRowProps) {
  const hasChildren = Boolean(node.children?.length);
  const isExpanded = expanded.has(node.key);
  const isSelected = multiple
    ? Array.isArray(selected) && selected.includes(node.key)
    : selected === node.key;
  const isDisabled = disabled || node.disabled;

  return (
    <>
      {/* ponytail: aria-expanded/selected/level only — full APG roving-tabindex
          arrow-key nav needs one focusable control per row, which the split
          expand/label buttons rule out. Upgrade path: merge them into a single
          row button with a chevron zone, then add the key handler. */}
      <div
        role="treeitem"
        aria-level={depth + 1}
        aria-selected={isSelected}
        aria-expanded={hasChildren ? isExpanded : undefined}
        className={cn(
          rowClass,
          rowStateClass[isDisabled ? "disabled" : isSelected ? "selected" : "idle"],
        )}
        // Indentation is data-driven (one level per depth), so it stays inline.
        style={{ paddingInlineStart: `calc(var(--su-space-2) + ${depth * 20}px)` }}
      >
        {hasChildren ? (
          <button
            type="button"
            className={expandButtonClass}
            aria-label={isExpanded ? "Collapse" : "Expand"}
            aria-expanded={isExpanded}
            disabled={isDisabled}
            onClick={() => onToggleExpand(node.key)}
          >
            {isExpanded ? (
              <IconChevronDown size={16} stroke={1.75} aria-hidden="true" />
            ) : (
              <IconChevronRight size={16} stroke={1.75} aria-hidden="true" className="rtl:-scale-x-100" />
            )}
          </button>
        ) : (
          <span className="shrink-0 size-[var(--su-control-mini)]" aria-hidden="true" />
        )}
        <button
          type="button"
          disabled={isDisabled}
          className={labelButtonClass}
          onClick={() => onSelect(node.key)}
        >
          {multiple && <CheckboxMark checked={isSelected} disabled={isDisabled} />}
          <span className="min-w-0 truncate">{node.title}</span>
        </button>
      </div>
      {hasChildren && isExpanded && (
        <div role="group">
          {node.children!.map((child) => (
            <TreeNodeRow
              key={child.key}
              node={child}
              depth={depth + 1}
              expanded={expanded}
              selected={selected}
              multiple={multiple}
              disabled={disabled}
              onToggleExpand={onToggleExpand}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </>
  );
}

export function TreeSelect(props: TreeSelectProps) {
  const {
    value: valueProp,
    defaultValue,
    placeholder = "Select…",
    disabled,
    treeData = [],
    multiple = false,
    className,
    onChange,
  } = props;

  const item = useFormItemContext();
  const { size, disabled: isDisabled } = useFieldState(undefined, disabled);

  const [internal, setInternal] = useState<string | string[] | undefined>(defaultValue);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internal;

  const display = useMemo((): string | null => {
    if (multiple && Array.isArray(value)) {
      if (value.length === 0) return null;
      return value.map((key) => findNodeTitle(treeData, key) ?? key).join(", ");
    }
    if (typeof value === "string") {
      return findNodeTitle(treeData, value) ?? value;
    }
    return null;
  }, [value, treeData, multiple]);

  const emit = useCallback(
    (next: string | string[]) => {
      if (!isControlled) setInternal(next);
      if (multiple) {
        (onChange as TreeSelectMultipleProps["onChange"])?.(next as string[]);
      } else {
        (onChange as TreeSelectSingleProps["onChange"])?.(next as string);
      }
    },
    [isControlled, multiple, onChange],
  );

  const handleSelect = (key: string) => {
    if (multiple) {
      const current = Array.isArray(value) ? value : [];
      const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
      emit(next);
    } else {
      emit(key);
      setOpen(false);
    }
  };

  const toggleExpand = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const trigger: ReactNode = (
    <button
      type="button"
      id={item?.id}
      disabled={isDisabled}
      className={cn(selectTriggerClass, selectTriggerSizeClass[size], "w-full", className)}
      aria-haspopup="tree"
      aria-describedby={item?.descriptionId}
      aria-invalid={item?.error ? true : undefined}
      title={display ?? undefined}
    >
      <span className={cn("flex-1 min-w-0 truncate", !display && "text-ink-3")}>
        {display ?? placeholder}
      </span>
      <IconChevronDown size={16} stroke={1.75} aria-hidden="true" className="shrink-0 text-ink-3" />
    </button>
  );

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={setOpen}>
      <PopoverPrimitive.Trigger asChild>{trigger}</PopoverPrimitive.Trigger>
      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          role="tree"
          align="start"
          sideOffset={4}
          collisionPadding={8}
          className="su-popover overflow-auto overscroll-contain w-[var(--radix-popover-trigger-width)] max-h-[var(--su-dropdown-max-h)] animate-su-dropdown-in motion-reduce:animate-none"
        >
          {treeData.length === 0 ? (
            <p className="m-0 p-su2 text-small text-ink-2 text-start">No options</p>
          ) : (
            treeData.map((node) => (
              <TreeNodeRow
                key={node.key}
                node={node}
                depth={0}
                expanded={expanded}
                selected={value}
                multiple={multiple}
                disabled={isDisabled}
                onToggleExpand={toggleExpand}
                onSelect={handleSelect}
              />
            ))
          )}
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
