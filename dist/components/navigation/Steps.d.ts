import type { HTMLAttributes, Key, ReactNode } from "react";
export type StepStatus = "wait" | "process" | "finish" | "error";
/**
 * `"default"`: labelled steps (20px markers, titles, connectors).
 * `"bar"`: the handheld flow header, one 4px segment per step plus a "Step 2 of 4" counter.
 */
export type StepsType = "default" | "bar";
export interface StepItem {
    title: ReactNode;
    description?: ReactNode;
    /** Overrides the status derived from `current`. */
    status?: StepStatus;
    /** Replaces the step numeral inside the 20px marker (12px glyph). */
    icon?: ReactNode;
    /** Stable key; falls back to the array index. */
    key?: Key;
}
export interface StepsProps extends HTMLAttributes<HTMLElement> {
    current?: number;
    items: StepItem[];
    direction?: "horizontal" | "vertical";
    status?: StepStatus;
    type?: StepsType;
    /**
     * `type="bar"` only: the counter above the segments. Defaults to "Step {n} of {total}";
     * pass a function for your locale (`(n, total) => \`Pasul ${n} din ${total}\``) or `false`
     * to hide it. 13/18 ink-2 on desk, 17/24 500 under `data-density="handheld"`.
     */
    counter?: ReactNode | ((step: number, total: number) => ReactNode);
}
/**
 * Layout is vertical-first: the stacked form is the base and the horizontal row
 * is layered on above 532px, which gives Ant's `responsive` behaviour for free
 * (a squeezed row breaks titles one letter per line) from one set of classes.
 * The rail is a single element in both forms — absolutely positioned down the
 * marker column when stacked, a flex item between the title and the next marker
 * when in a row, where its inset/width classes go inert because it is `static`.
 */
export declare function Steps({ current, items, direction, status, type, counter, className, ...rest }: StepsProps): import("react").JSX.Element | null;
//# sourceMappingURL=Steps.d.ts.map