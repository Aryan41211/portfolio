/**
 * Resolve a CSS custom property to linear RGB for three.js.
 *
 * Goes through a 1x1 canvas so the browser does the oklch -> sRGB conversion
 * for us. That keeps the WebGL scene in sync with styles.css automatically —
 * change the token, the shader follows, no duplicated hex constants.
 */
export function cssVarToRgb(
  name: string,
  fallback: [number, number, number],
): [number, number, number] {
  if (typeof document === "undefined") return fallback;

  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return fallback;

  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return fallback;

  // Assigning an unparseable colour is a no-op, so seed with a sentinel we can
  // distinguish from a genuine black.
  ctx.fillStyle = "#010101";
  ctx.fillStyle = raw;
  ctx.fillRect(0, 0, 1, 1);

  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  if (r === 1 && g === 1 && b === 1) return fallback;
  return [r / 255, g / 255, b / 255];
}
