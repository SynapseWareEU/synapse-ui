import { jsx as a } from "react/jsx-runtime";
import { glassHeaderClass as n } from "../../materials/Glass.js";
import { cn as o } from "../../utils/cn.js";
function s({ className: e, ...r }) {
  return /* @__PURE__ */ a(
    "div",
    {
      className: o(
        "flex flex-col has-[>aside]:flex-row flex-auto min-h-full bg-bg",
        e
      ),
      ...r
    }
  );
}
function i({ className: e, material: r = "solid", ...t }) {
  return /* @__PURE__ */ a(
    "header",
    {
      className: o(
        "shrink-0 flex items-center gap-su3 min-h-[var(--su-nav-height)] ps-su3 pe-su4",
        "border-b border-b-solid border-b-border text-ink",
        r === "glass" ? n : "bg-surface",
        e
      ),
      ...t
    }
  );
}
function d({ className: e, ...r }) {
  return /* @__PURE__ */ a(
    "aside",
    {
      className: o(
        "shrink-0 w-[var(--su-rail-width)] bg-surface border-e border-e-solid border-e-border",
        e
      ),
      ...r
    }
  );
}
function l({ className: e, ...r }) {
  return /* @__PURE__ */ a(
    "main",
    {
      className: o(
        "flex-1 min-w-0 min-h-0 flex flex-col gap-[var(--su-gap-block)]",
        "p-[var(--su-page-pad-phone)] md:px-[var(--su-page-pad-x)] md:py-[var(--su-page-pad-y)]",
        e
      ),
      ...r
    }
  );
}
function u({ className: e, ...r }) {
  return /* @__PURE__ */ a(
    "footer",
    {
      className: o(
        "shrink-0 min-h-[var(--su-panel-footer)] px-su4 py-su3",
        "border-t border-t-solid border-t-border text-small text-ink-2",
        e
      ),
      ...r
    }
  );
}
s.Header = i;
s.Sider = d;
s.Content = l;
s.Footer = u;
export {
  l as Content,
  u as Footer,
  i as Header,
  s as Layout,
  d as Sider
};
