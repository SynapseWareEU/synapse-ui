import type { CSSProperties } from "react";
import {
  IconArrowRight,
  IconBell,
  IconCheck,
  IconChevronRight,
  IconCode,
  IconCopy,
  IconDeviceDesktop,
  IconDeviceMobile,
  IconDownload,
  IconHeart,
  IconLayoutGrid,
  IconMenu2,
  IconMoon,
  IconPalette,
  IconPlus,
  IconSearch,
  IconSettings,
  IconStack2,
  IconSun,
  IconX,
  type Icon as TablerIconComponent,
} from "@tabler/icons-react";
import { iconDefaults } from "synapse-ui";

/** Workbench glyphs use the library's own icon defaults: stroke 1.75, round caps and joins. */
export const glyphProps = iconDefaults;

const catalog: Record<string, TablerIconComponent> = {
  search: IconSearch,
  arrow: IconArrowRight,
  chevron: IconChevronRight,
  grid: IconLayoutGrid,
  layers: IconStack2,
  sun: IconSun,
  moon: IconMoon,
  code: IconCode,
  copy: IconCopy,
  check: IconCheck,
  plus: IconPlus,
  close: IconX,
  menu: IconMenu2,
  settings: IconSettings,
  palette: IconPalette,
  heart: IconHeart,
  download: IconDownload,
  bell: IconBell,
  handheld: IconDeviceMobile,
  desk: IconDeviceDesktop,
};

export function Glyph({
  name,
  size = 16,
  style,
}: {
  name: string;
  size?: number;
  style?: CSSProperties;
}) {
  const Icon = catalog[name] ?? catalog.layers;
  return (
    <Icon
      size={size}
      stroke={glyphProps.stroke}
      strokeLinejoin={glyphProps.strokeLinejoin}
      strokeLinecap={glyphProps.strokeLinecap}
      aria-hidden
      style={style}
    />
  );
}
