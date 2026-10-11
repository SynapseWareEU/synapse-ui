/*
 * Decimal quantities as text. A handheld quantity can be a `numeric(15,4)`: it is typed, stepped
 * and compared as a string of digits with at most one ".", and never becomes a JS number, which
 * cannot hold every such value (0.1 + 0.2). Stepping is integer arithmetic on the digits (BigInt).
 * Unsigned: a quantity has no minus.
 */

const DECIMAL = /^\d+(\.\d*)?$/;

/** A bound or a step given as a number or as text, as canonical decimal text. `undefined` if it is not one. */
export function decimalText(value: number | string | undefined): string | undefined {
  if (value === undefined) return undefined;
  const text = String(value);
  return DECIMAL.test(text) ? text : undefined;
}

/**
 * What was typed, as canonical decimal text: the digits and the first separator ("," or "."),
 * written ".". Leading zeros collapse, a bare separator reads "0.", and `scale` caps the digits
 * after the point (0 leaves none, so no point either).
 */
export function cleanDecimal(typed: string, scale?: number): string {
  let int = "";
  let frac = "";
  let point = false;
  for (const ch of typed) {
    if (ch >= "0" && ch <= "9") {
      if (point) frac += ch;
      else int += ch;
    } else if ((ch === "," || ch === ".") && !point) {
      point = true;
    }
  }
  int = int.replace(/^0+(?=\d)/, "");
  if (!point || scale === 0) return int;
  if (scale != null) frac = frac.slice(0, scale);
  return `${int || "0"}.${frac}`;
}

function split(value: string): [string, string] {
  const at = value.indexOf(".");
  return at === -1 ? [value, ""] : [value.slice(0, at), value.slice(at + 1)];
}

function scaled(value: string, scale: number): bigint {
  const [int, frac] = split(value);
  return BigInt((int || "0") + frac.padEnd(scale, "0"));
}

function unscaled(value: bigint, scale: number): string {
  const digits = value.toString().padStart(scale + 1, "0");
  const int = digits.slice(0, digits.length - scale);
  const frac = digits.slice(digits.length - scale).replace(/0+$/, "");
  return frac ? `${int}.${frac}` : int;
}

const fractionDigits = (value: string) => split(value)[1].length;

/** Negative, zero or positive as `a` is under, equal to or over `b`. */
export function compareDecimal(a: string, b: string): number {
  const scale = Math.max(fractionDigits(a), fractionDigits(b));
  const left = scaled(a, scale);
  const right = scaled(b, scale);
  return left < right ? -1 : left > right ? 1 : 0;
}

/**
 * `value` plus or minus `step`, kept inside `min` … `max`. Exact: "0.1" + "0.2" is "0.3".
 * The result has no trailing zeros and no bare point.
 */
export function stepDecimal(
  value: string,
  step: string,
  direction: 1 | -1,
  min: string,
  max: string | undefined,
): string {
  const scale = Math.max(
    fractionDigits(value),
    fractionDigits(step),
    fractionDigits(min),
    max === undefined ? 0 : fractionDigits(max),
  );
  let next = scaled(value, scale) + BigInt(direction) * scaled(step, scale);
  const floor = scaled(min, scale);
  if (next < floor) next = floor;
  if (max !== undefined) {
    const ceiling = scaled(max, scale);
    if (next > ceiling) next = ceiling;
  }
  return unscaled(next, scale);
}

/** Canonical text as it is read: the caller's separator, and thousands grouped by U+202F when `group`. */
export function showDecimal(value: string, separator: string, group = false): string {
  const [int, frac] = split(value);
  const whole = group ? int.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : int;
  return value.includes(".") ? `${whole}${separator}${frac}` : whole;
}
