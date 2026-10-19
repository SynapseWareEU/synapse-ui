import * as RadixProgress from "@radix-ui/react-progress";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface ProgressProps extends ComponentPropsWithoutRef<typeof RadixProgress.Root> {
    type?: "line" | "circle";
    /**
     * Circle: diameter in px (default 40). Line: bar thickness in px (default 4).
     * ponytail: one raw px number for both types, so a size meant for a circle looks
     * absurd on a line; swap for a named scale ("sm" | "md" | "lg") if that bites.
     */
    size?: number;
    /** `null` = indeterminate (unknown duration). */
    value?: number | null;
    max?: number;
    /** Show the label after the meter (13/18 ink): the percentage, or what `format` returns. */
    showInfo?: boolean;
    /** `normal` → ink · `success` → success · `error` → danger. A full `normal` meter turns success. */
    status?: "normal" | "success" | "error";
    /**
     * Line: the late or blocked portion, in the same units as `value`. Drawn as a danger segment
     * right after the progress, in the same track and with no gap.
     */
    blocked?: number;
    /**
     * Line: split the meter into this many stages (the staged meter, e.g. reserved · picked ·
     * shipped). A completed stage is fully success; the moving stage is a partial ink fill.
     */
    steps?: number;
    /** Line: a 48-wide meter that sits inline in a row, instead of filling its container. */
    inline?: boolean;
    /**
     * Label text; implies `showInfo`. Gets the rounded percentage, the value and the max, e.g.
     * `(_, v, m) => \`${v}/${m}\``. Wrap trailing words in an ink-2 span ("2/3 culese").
     */
    format?: (percent: number, value: number, max: number) => ReactNode;
}
/**
 * Meter (spec §4.4). Line: a 4px bar with a 2px radius on the fill track; ink progress, success
 * when complete, and an optional danger segment for the late or blocked part. Staged: `steps`
 * segments with a 3px gap. Circle: 40 with a 4px round-capped arc. Give it an `aria-label`
 * sentence ("2 din 3 linii"): the bar alone never carries the meaning.
 */
export declare function Progress({ type, size, value, max, showInfo, status, blocked, steps, inline, format, className, ...rest }: ProgressProps): import("react").JSX.Element;
//# sourceMappingURL=Progress.d.ts.map