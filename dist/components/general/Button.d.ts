import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, type ReactNode } from "react";
/** `secondary` is an alias of `default` (the white, hairline button). `text` is the link. */
export type ButtonVariant = "default" | "secondary" | "primary" | "ghost" | "dashed" | "text";
/** `sm` 28 (in-row actions) · `md` 36 (default) · `lg` 48 (rare desk hero). Handheld scope: 56 / 64. */
export type ButtonSize = "sm" | "md" | "lg";
export type ButtonIconPlacement = "start" | "end";
export type ButtonLoading = boolean | {
    delay?: number;
    icon?: ReactNode;
};
type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type NativeAnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
export interface ButtonProps extends Omit<NativeButtonProps, "type" | "children">, Pick<NativeAnchorProps, "download" | "hrefLang" | "ping" | "referrerPolicy"> {
    variant?: ButtonVariant;
    /** @deprecated Prefer `variant`. Ant Design–style alias (not the native button type). */
    type?: "primary" | "default" | "dashed" | "link" | "text" | "ghost" | "submit" | "reset" | "button";
    /** Defaults to `md` (36). Icon-only buttons are square: 24 at `sm`, 32 at `md`, 44 at `lg`. */
    size?: ButtonSize;
    block?: boolean;
    asChild?: boolean;
    /**
     * Destructive action (delete, revoke). With `default` it is the white danger button, with
     * `ghost` a quiet one; with `primary` it is the solid red confirm, used only to confirm a
     * destructive action (Popconfirm, confirm modal).
     */
    danger?: boolean;
    loading?: ButtonLoading;
    icon?: ReactNode;
    iconPlacement?: ButtonIconPlacement;
    /**
     * Horizontal padding. `tight` is the quiet clear action ("Clear filters", overlay footers):
     * 0 6 at `sm`, 0 8 at `md`, 0 12 at `lg`, on both sides. No effect on icon-only or `text`.
     */
    inset?: "default" | "tight";
    /** Opt-in trailing arrow (marketing text links). Off by default. */
    arrow?: boolean;
    /** @deprecated No effect. v2 draws no scan end-cell; kept so existing callers compile. */
    hideEndCell?: boolean;
    /** Render as anchor when set (same as Ant Design `href`). */
    href?: string;
    target?: NativeAnchorProps["target"];
    rel?: string;
    /** Native button `type` attribute. */
    htmlType?: NativeButtonProps["type"];
    children?: ReactNode;
}
/**
 * Button (v2 §4.1). Five skins — `primary` (the one action on a screen), `default`/`secondary`
 * (white with a hairline), `ghost`, `dashed` and `text` (the link) — each with a `danger` form,
 * at 28 / 36 / 48 (56 / 64 inside `data-density="handheld"`). Every variant carries a 1px
 * border, so all of them share one geometry. `aria-pressed` turns any variant into a toggle.
 *
 * Loading keeps full contrast: a ring spinner replaces the leading icon, the button is
 * `aria-busy` and clicks are swallowed, but it stays focusable and is never drawn disabled.
 */
export declare const Button: import("react").ForwardRefExoticComponent<ButtonProps & import("react").RefAttributes<HTMLButtonElement>>;
export {};
//# sourceMappingURL=Button.d.ts.map