import { jsxs as d, jsx as s, Fragment as O } from "react/jsx-runtime";
import { useRef as X, useState as z, useCallback as q } from "react";
import { cn as m } from "../../utils/cn.js";
import { Icon as y, iconDefaults as N } from "../general/Icon.js";
import { useFormItemContext as H, useFieldState as J } from "./Form.js";
import P from "../../vendor/@tabler/icons-react/dist/esm/icons/IconUpload.js";
import Q from "../../vendor/@tabler/icons-react/dist/esm/icons/IconFile.js";
import R from "../../vendor/@tabler/icons-react/dist/esm/icons/IconX.js";
let $ = 0;
function V(r) {
  return $ += 1, {
    uid: `upload-${$}`,
    name: r.name,
    size: r.size,
    file: r
  };
}
function Y(r, i) {
  return i.split(",").map((a) => a.trim().toLowerCase()).filter(Boolean).some(
    (a) => a.startsWith(".") ? r.name.toLowerCase().endsWith(a) : a.endsWith("/*") ? r.type.toLowerCase().startsWith(a.slice(0, -1)) : r.type.toLowerCase() === a
  );
}
const Z = ["B", "KB", "MB", "GB", "TB"];
function _(r) {
  const i = r > 0 ? Math.min(Math.floor(Math.log(r) / Math.log(1024)), 4) : 0, [a, l] = (r / 1024 ** i).toFixed(i === 0 ? 0 : 1).split("."), c = a.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${l && l !== "0" ? `${c},${l}` : c} ${Z[i]}`;
}
const ee = "su-focus-ring flex flex-col items-center justify-center gap-su2 p-su6 rounded-su-surface border border-dashed text-center text-body transition-[border-color,background-color] duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none", h = {
  idle: "cursor-pointer bg-surface border-border-strong text-ink [@media(hover:hover)]:hover:bg-surface-2",
  invalid: "cursor-pointer bg-surface border-danger text-ink [@media(hover:hover)]:hover:bg-surface-2",
  drag: "cursor-pointer bg-action-subtle border-action text-ink",
  disabled: "cursor-not-allowed bg-surface-2 border-border text-ink-3"
}, re = "flex items-center gap-su2 h-[40px] ps-su3 pe-su1 border-t border-solid border-border first:border-t-0", te = [
  "inline-flex shrink-0 items-center justify-center size-[32px] p-0 rounded-su-control bg-transparent text-ink-2 cursor-pointer su-focus-ring",
  "transition-colors duration-[var(--su-duration-fast)] ease-[var(--su-ease-out)] motion-reduce:transition-none",
  "[@media(hover:hover)]:[&:enabled:not(:active):hover]:bg-fill [@media(hover:hover)]:[&:enabled:not(:active):hover]:text-ink",
  "enabled:active:bg-border enabled:active:text-ink",
  "disabled:text-ink-3 disabled:cursor-not-allowed",
  "[@media(hover:none)]:su-hit-44"
].join(" ");
function fe({
  accept: r,
  multiple: i = !1,
  disabled: a,
  maxCount: l,
  className: c,
  children: x,
  "aria-label": w,
  "aria-labelledby": j,
  fileList: L,
  onChange: u,
  beforeUpload: C,
  onRemove: v,
  hint: I
}) {
  const t = H(), { disabled: o } = J(void 0, a), g = X(null), [M, A] = z([]), f = L ?? M, [S, k] = z(!1), B = q(
    (e) => {
      A(e), u == null || u(e);
    },
    [u]
  ), D = async (e) => {
    const n = Array.from(e).filter(
      (b) => !r || Y(b, r)
    ), p = [];
    for (const b of n)
      C && !await C(b) || p.push(V(b));
    if (p.length === 0) return;
    const G = i ? [...f, ...p].slice(0, l ?? 1 / 0) : p.slice(0, 1);
    B(G);
  }, T = (e) => {
    e.target.files && (D(e.target.files), e.target.value = "");
  }, W = (e) => {
    e.preventDefault(), k(!1), !o && e.dataTransfer.files.length > 0 && D(e.dataTransfer.files);
  }, U = (e) => {
    (v == null ? void 0 : v(e)) !== !1 && B(f.filter((n) => n.uid !== e.uid));
  }, K = "Click to upload or drag files here", F = j ?? (w || t == null ? void 0 : t.labelId), E = F ? void 0 : w ?? (typeof x == "string" ? x : K);
  return /* @__PURE__ */ d("div", { className: m("w-full", c), children: [
    /* @__PURE__ */ d(
      "div",
      {
        role: "button",
        tabIndex: o ? -1 : 0,
        "aria-disabled": o || void 0,
        "aria-label": E,
        "aria-labelledby": F,
        className: m(
          ee,
          o ? h.disabled : S ? h.drag : t != null && t.error ? h.invalid : h.idle
        ),
        onClick: () => {
          var e;
          return !o && ((e = g.current) == null ? void 0 : e.click());
        },
        onKeyDown: (e) => {
          var n;
          (e.key === "Enter" || e.key === " ") && !o && (e.preventDefault(), (n = g.current) == null || n.click());
        },
        onDragOver: (e) => {
          e.preventDefault(), o || k(!0);
        },
        onDragLeave: () => k(!1),
        onDrop: W,
        "aria-describedby": t == null ? void 0 : t.descriptionId,
        "aria-invalid": t != null && t.error ? !0 : void 0,
        children: [
          /* @__PURE__ */ s(
            "input",
            {
              ref: g,
              id: t == null ? void 0 : t.id,
              type: "file",
              accept: r,
              multiple: i,
              disabled: o,
              className: "hidden",
              onChange: T,
              "aria-hidden": "true",
              tabIndex: -1
            }
          ),
          x ?? /* @__PURE__ */ d(O, { children: [
            /* @__PURE__ */ s(y, { className: "size-[24px] text-ink-3", children: /* @__PURE__ */ s(P, { ...N }) }),
            /* @__PURE__ */ d("span", { children: [
              /* @__PURE__ */ s("span", { className: m("font-medium", !o && "text-action-text"), children: "Click to upload" }),
              " ",
              "or drag files here"
            ] })
          ] }),
          I != null && /* @__PURE__ */ s("span", { className: m("-mt-su1 text-small", o ? "text-ink-3" : "text-ink-2"), children: I })
        ]
      }
    ),
    f.length > 0 && /* @__PURE__ */ s("ul", { className: "su-panel list-none m-0 mt-su2 p-0", children: f.map((e) => /* @__PURE__ */ d("li", { className: re, children: [
      /* @__PURE__ */ s(y, { className: "size-[16px] text-ink-3", children: /* @__PURE__ */ s(Q, { ...N }) }),
      /* @__PURE__ */ s("span", { className: "min-w-0 flex-1 truncate text-body text-ink", children: e.name }),
      /* @__PURE__ */ s("span", { className: "shrink-0 text-small text-ink-2 su-tabular", children: _(e.size) }),
      /* @__PURE__ */ s(
        "button",
        {
          type: "button",
          className: te,
          "aria-label": `Remove ${e.name}`,
          disabled: o,
          onClick: () => U(e),
          children: /* @__PURE__ */ s(y, { className: "size-[18px]", children: /* @__PURE__ */ s(R, { ...N }) })
        }
      )
    ] }, e.uid)) })
  ] });
}
export {
  fe as Upload
};
