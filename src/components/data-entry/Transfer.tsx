import { type KeyboardEvent, useCallback, useId, useMemo, useState } from "react";
import { IconChevronLeft, IconChevronRight, IconSearch } from "@tabler/icons-react";
import { cn } from "../../utils/cn";
import { Button } from "../general/Button";
import { Icon, iconDefaults } from "../general/Icon";
import { Checkbox, CheckboxMark } from "./Checkbox";
import { FormItemIsolate, useFormContext, useFormItemContext } from "./Form";
import { inputClass, inputSizeClass } from "./Input";
import type { SelectOption } from "./types";

export interface TransferProps {
  dataSource?: SelectOption[];
  targetKeys?: string[];
  defaultTargetKeys?: string[];
  disabled?: boolean;
  titles?: [string, string];
  /** A 32px search field at the top of each list; it filters the rows by label. */
  showSearch?: boolean;
  /** Placeholder of the search fields. Default `"Search"`. */
  searchPlaceholder?: string;
  className?: string;
  onChange?: (targetKeys: string[]) => void;
}

type Side = "source" | "target";

/* Two panels 280 wide (they shrink on narrow screens), 12 apart from the centre column. */
const panelClass = "su-panel flex flex-col min-w-0 flex-[0_1_280px]";

/* Header 36 on surface-2: select-all checkbox, the title and the count, sans 13/18 (no mono label). */
const headerClass =
  "flex items-center gap-su2 min-h-[36px] px-su3 border-b border-solid border-border bg-surface-2";

/*
 * Rows 32 with a checkbox, padding 0 12, square inside the panel. Pointer hover: surface-hover.
 * Keyboard focus (roving, one Tab stop per list) is the highlighted background, action-subtle,
 * as in the palette. The checkbox shows the selection.
 */
const optionBaseClass =
  "flex items-center gap-su2 h-[32px] px-su3 text-body outline-none transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none focus-visible:bg-action-subtle";

const optionEnabledClass =
  "group/cb cursor-pointer text-ink [@media(hover:hover)]:[&:not(:focus-visible):hover]:bg-surface-hover";

const optionDisabledClass = "cursor-not-allowed text-ink-3";

export function Transfer({
  dataSource = [],
  targetKeys: targetKeysProp,
  defaultTargetKeys = [],
  disabled,
  titles = ["Source", "Target"],
  showSearch = false,
  searchPlaceholder = "Search",
  className,
  onChange,
}: TransferProps) {
  const form = useFormContext();
  const item = useFormItemContext();
  const isDisabled = disabled ?? form.disabled;
  const baseId = useId();

  const [internal, setInternal] = useState<string[]>(defaultTargetKeys);
  const [sourceSelected, setSourceSelected] = useState<string[]>([]);
  const [targetSelected, setTargetSelected] = useState<string[]>([]);
  const [query, setQuery] = useState<Record<Side, string>>({ source: "", target: "" });
  // roving tabindex: one Tab stop per listbox, arrows move DOM focus between rows
  const [activeIndex, setActiveIndex] = useState({ source: 0, target: 0 });

  const isControlled = targetKeysProp !== undefined;
  const targetKeys = isControlled ? targetKeysProp : internal;

  const emit = useCallback(
    (next: string[]) => {
      if (!isControlled) setInternal(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  const sourceItems = useMemo(
    () => dataSource.filter((item) => !targetKeys.includes(item.value)),
    [dataSource, targetKeys],
  );

  const targetItems = useMemo(
    () => dataSource.filter((item) => targetKeys.includes(item.value)),
    [dataSource, targetKeys],
  );

  const toggleSelection = (key: string, side: Side, itemDisabled?: boolean) => {
    if (isDisabled || itemDisabled) return;
    const setter = side === "source" ? setSourceSelected : setTargetSelected;
    setter((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key],
    );
  };

  /** Select every listed, enabled row of one side, or clear them when all are already selected. */
  const toggleAll = (side: Side, keys: string[]) => {
    if (isDisabled || keys.length === 0) return;
    const setter = side === "source" ? setSourceSelected : setTargetSelected;
    setter((prev) =>
      keys.every((k) => prev.includes(k))
        ? prev.filter((k) => !keys.includes(k))
        : [...prev, ...keys.filter((k) => !prev.includes(k))],
    );
  };

  const moveToTarget = (keys: string[] = sourceSelected) => {
    if (isDisabled || keys.length === 0) return;
    emit([...targetKeys, ...keys.filter((k) => !targetKeys.includes(k))]);
    setSourceSelected([]);
  };

  const moveToSource = (keys: string[] = targetSelected) => {
    if (isDisabled || keys.length === 0) return;
    emit(targetKeys.filter((key) => !keys.includes(key)));
    setTargetSelected([]);
  };

  const handleListKeyDown = (event: KeyboardEvent<HTMLDivElement>, side: Side) => {
    const nodes = Array.from(
      event.currentTarget.querySelectorAll<HTMLElement>('[role="option"]'),
    );
    if (nodes.length === 0) return;
    const current = nodes.indexOf(document.activeElement as HTMLElement);
    let next: number;
    if (event.key === "ArrowDown") next = Math.min(current + 1, nodes.length - 1);
    else if (event.key === "ArrowUp") next = Math.max(current - 1, 0);
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = nodes.length - 1;
    else return;
    event.preventDefault();
    setActiveIndex((prev) => ({ ...prev, [side]: next }));
    nodes[next]?.focus();
  };

  const renderPanel = (
    title: string,
    items: SelectOption[],
    selected: string[],
    side: Side,
  ) => {
    const needle = query[side].trim().toLowerCase();
    const listed = needle
      ? items.filter((option) => option.label.toLowerCase().includes(needle))
      : items;
    const selectable = listed.filter((option) => !option.disabled).map((option) => option.value);
    const selectedListed = selectable.filter((key) => selected.includes(key)).length;
    const allState =
      selectable.length > 0 && selectedListed === selectable.length
        ? true
        : selectedListed > 0
          ? "indeterminate"
          : false;

    // keep the single Tab stop on an enabled row
    const firstEnabled = listed.findIndex((o) => !o.disabled);
    const stop =
      !isDisabled && listed[activeIndex[side]] && !listed[activeIndex[side]].disabled
        ? activeIndex[side]
        : firstEnabled;

    return (
      <div className={panelClass}>
        <div className={headerClass}>
          {/* A helper inside the field: it must not take the FormItem's id or error. */}
          <FormItemIsolate>
            <Checkbox
              id={`${baseId}-${side}-all`}
              aria-label={`Select all in ${title}`}
              checked={allState}
              disabled={isDisabled || selectable.length === 0}
              onCheckedChange={() => toggleAll(side, selectable)}
              className="shrink-0"
            />
          </FormItemIsolate>
          <span className="min-w-0 flex-1 truncate text-small font-medium text-ink-2">
            {title}
          </span>
          <span className="shrink-0 text-small font-medium text-ink-2 su-tabular">
            {selected.length}/{items.length}
          </span>
        </div>
        {showSearch && (
          <div className="p-su2 border-b border-solid border-border">
            <div className="relative flex items-center">
              <Icon className="absolute start-su2 size-[16px] text-ink-3 pointer-events-none">
                <IconSearch {...iconDefaults} />
              </Icon>
              <input
                type="search"
                value={query[side]}
                placeholder={searchPlaceholder}
                aria-label={`${searchPlaceholder}: ${title}`}
                disabled={isDisabled}
                onChange={(e) => {
                  const value = e.target.value;
                  setQuery((prev) => ({ ...prev, [side]: value }));
                }}
                // 32 tall, padding 0 8, a 16 icon and 8 before the text
                className={cn(inputClass, inputSizeClass.sm, "ps-[32px]")}
              />
            </div>
          </div>
        )}
        <div
          className="flex-1 overflow-auto max-h-[240px] py-su1"
          role="listbox"
          aria-label={title}
          aria-multiselectable="true"
          aria-describedby={item?.descriptionId}
          aria-invalid={item?.error ? true : undefined}
          onKeyDown={(e) => handleListKeyDown(e, side)}
        >
          {listed.length === 0 ? (
            <div className="px-su3 py-su2 text-small text-ink-2 text-center">No items</div>
          ) : (
            listed.map((option, index) => {
              const isSelected = selected.includes(option.value);
              const rowDisabled = Boolean(isDisabled || option.disabled);
              return (
                <div
                  key={option.value}
                  role="option"
                  tabIndex={!rowDisabled && index === stop ? 0 : -1}
                  aria-disabled={rowDisabled}
                  aria-selected={isSelected}
                  onKeyDown={(e) => {
                    if (e.key === " " || e.key === "Enter") {
                      e.preventDefault();
                      toggleSelection(option.value, side, option.disabled);
                    }
                  }}
                  className={cn(
                    optionBaseClass,
                    rowDisabled ? optionDisabledClass : optionEnabledClass,
                  )}
                  onClick={() => toggleSelection(option.value, side, option.disabled)}
                  onDoubleClick={() => {
                    if (rowDisabled) return;
                    if (side === "source") moveToTarget([option.value]);
                    else moveToSource([option.value]);
                  }}
                >
                  <CheckboxMark checked={isSelected} disabled={rowDisabled} />
                  <span className="min-w-0 truncate">{option.label}</span>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      id={item?.id}
      className={cn("flex items-stretch w-full gap-su3", className)}
      role="group"
    >
      {renderPanel(titles[0], sourceItems, sourceSelected, "source")}
      {/* Centre column: secondary sm icon-only buttons with chevrons, 8 apart. */}
      <div className="flex flex-col justify-center gap-su2 shrink-0">
        <Button
          variant="default"
          size="sm"
          icon={<IconChevronRight {...iconDefaults} className="rtl:rotate-180" />}
          disabled={isDisabled || sourceSelected.length === 0}
          onClick={() => moveToTarget()}
          aria-label="Move to target"
        />
        <Button
          variant="default"
          size="sm"
          icon={<IconChevronLeft {...iconDefaults} className="rtl:rotate-180" />}
          disabled={isDisabled || targetSelected.length === 0}
          onClick={() => moveToSource()}
          aria-label="Move to source"
        />
      </div>
      {renderPanel(titles[1], targetItems, targetSelected, "target")}
    </div>
  );
}
