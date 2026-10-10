import t from "../../vendor/@tabler/icons-react/dist/esm/icons/IconAlertCircle.js";
import n from "../../vendor/@tabler/icons-react/dist/esm/icons/IconAlertTriangle.js";
import o from "../../vendor/@tabler/icons-react/dist/esm/icons/IconCircleCheck.js";
import e from "../../vendor/@tabler/icons-react/dist/esm/icons/IconInfoCircle.js";
const l = {
  neutral: "bg-surface-2 border-border",
  info: "bg-info-tint border-info-line",
  success: "bg-success-tint border-success-line",
  warning: "bg-warning-tint border-warning-line",
  error: "bg-danger-tint border-danger-line"
}, u = {
  neutral: "text-ink-2",
  info: "text-info-text",
  success: "text-success-text",
  warning: "text-warning-text",
  error: "text-danger-text"
}, d = {
  neutral: e,
  info: e,
  success: o,
  warning: n,
  error: t
}, r = "relative shrink-0 inline-flex items-center justify-center p-0 border-0 rounded-su-control bg-transparent text-ink-2 cursor-pointer su-focus-ring transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] active:bg-border [@media(hover:hover)]:hover:bg-fill [@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:active:bg-border disabled:text-ink-3 disabled:cursor-not-allowed [@media(hover:none)]:after:content-empty [@media(hover:none)]:after:absolute [@media(hover:none)]:after:inset-[calc((100%-var(--su-hit-target))/2)]", b = `${r} size-[var(--su-control-xs)]`, f = `${r} size-[var(--su-control-sm)]`;
export {
  f as closeButtonClass,
  b as dismissButtonClass,
  d as toneIcon,
  l as toneSurfaceClass,
  u as toneTextClass
};
