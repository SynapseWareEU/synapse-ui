/**
 * A bound or a step given as a number or as text, as canonical decimal text. `undefined` if it is
 * not one: text that is not canonical, a negative (a quantity is unsigned), or a number too large
 * to print in digits.
 */
export declare function decimalText(value: number | string | undefined): string | undefined;
/**
 * What was typed, as canonical decimal text: the digits and the first separator ("," or "."),
 * written ".". Leading zeros collapse, a bare separator reads "0.", and `scale` caps the digits
 * after the point (0 leaves none, so no point either).
 */
export declare function cleanDecimal(typed: string, scale?: number): string;
/** Negative, zero or positive as `a` is under, equal to or over `b`. */
export declare function compareDecimal(a: string, b: string): number;
/**
 * `value` plus or minus `step`, kept inside `min` … `max`. Exact: "0.1" + "0.2" is "0.3".
 * The result has no trailing zeros and no bare point.
 */
export declare function stepDecimal(value: string, step: string, direction: 1 | -1, min: string, max: string | undefined): string;
/** Canonical text as it is read: the caller's separator, and thousands grouped by U+202F when `group`. */
export declare function showDecimal(value: string, separator: string, group?: boolean): string;
//# sourceMappingURL=decimal.d.ts.map