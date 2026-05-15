/**
 * Soft, low-saturation palette used everywhere a user picks a colour for a
 * category, subcategory, product, or unit. Designed so the chosen colour
 * reads as a *tint*, not a flag.
 */
export const SOFT_PALETTE: readonly string[] = [
  "#fecaca", // rose
  "#fed7aa", // peach
  "#fde68a", // honey
  "#fef08a", // butter
  "#d9f99d", // lime
  "#bbf7d0", // mint
  "#a7f3d0", // emerald
  "#99f6e4", // teal
  "#a5f3fc", // cyan
  "#bae6fd", // sky
  "#bfdbfe", // blue
  "#c7d2fe", // indigo
  "#ddd6fe", // violet
  "#e9d5ff", // purple
  "#f5d0fe", // fuchsia
  "#fbcfe8", // pink
] as const;

/**
 * Wrap any user-saved colour hex so it renders as a soft, modern tint —
 * regardless of whether the original value was a bold legacy hex or already
 * a pastel from {@link SOFT_PALETTE}.
 *
 * The DB value is left untouched; this only affects the rendered colour.
 */
export function softenColor(value: string | null | undefined, mix = 28): string | undefined {
  if (!value) return undefined;
  return `color-mix(in srgb, ${value} ${mix}%, white)`;
}

/** Higher-contrast text colour for use on top of {@link softenColor}'d surfaces. */
export function readableOn(value: string | null | undefined, darken = 35): string | undefined {
  if (!value) return undefined;
  return `color-mix(in srgb, ${value} ${darken}%, black)`;
}

/**
 * Deterministically pick a soft tint from the palette based on a stable
 * input string (usually an entity name or id). Same input → same colour
 * across renders, so the POS feels personable but never flickers.
 */
export function defaultTintFor(seed: string | null | undefined, mix = 22): string | undefined {
  if (!seed) return undefined;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  const base = SOFT_PALETTE[hash % SOFT_PALETTE.length];
  return softenColor(base, mix);
}
