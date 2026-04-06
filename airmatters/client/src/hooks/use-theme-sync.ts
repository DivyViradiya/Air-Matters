/**
 * Reads the site's CSS custom properties (design tokens) from the document root.
 * Call this once per component to get a snapshot of the current theme colors
 * for use in Three.js scenes. Re-call on theme toggle via the `theme` parameter.
 */
export interface ThemeColors {
  primary: string;       // --bio-vibrant  #56b452
  pulse: string;         // --pulse        #7dd87a  (bloom / glow)
  foreground: string;    // --foreground
  background: string;    // --background
  void: string;          // --void         #080f09
  ghostMint: string;     // --ghost-mint   #f2faf2
  mossDeep: string;      // --moss-deep    #142c16
  leaf: string;          // --leaf         #2c7d3b
}

function getCSSVar(varName: string): string {
  if (typeof document === "undefined") return "#000";
  return getComputedStyle(document.documentElement)
    .getPropertyValue(varName)
    .trim();
}

export function readThemeColors(): ThemeColors {
  return {
    primary:    getCSSVar("--primary-raw")    || "#56b452",
    pulse:      getCSSVar("--pulse-raw")      || "#7dd87a",
    foreground: getCSSVar("--foreground-raw") || "#142c16",
    background: getCSSVar("--background-raw") || "#f2faf2",
    void:       getCSSVar("--void-raw")       || "#080f09",
    ghostMint:  getCSSVar("--ghost-mint-raw") || "#f2faf2",
    mossDeep:   getCSSVar("--moss-deep-raw")  || "#142c16",
    leaf:       getCSSVar("--leaf-raw")       || "#2c7d3b",
  };
}
