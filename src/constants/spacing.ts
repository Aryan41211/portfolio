/**
 * Spacing & Layout Tokens
 * Single source of truth for consistent spacing across the portfolio.
 * All values map to Tailwind's spacing scale (4px base unit).
 */

export const SPACING = {
  /** Base unit: 4px */
  unit: 4,

  /** Inline gaps */
  gap: {
    xs: 1, // 4px
    sm: 1.5, // 6px
    md: 2, // 8px
    lg: 3, // 12px
    xl: 4, // 16px
    "2xl": 6, // 24px
    "3xl": 8, // 32px
  },

  /** Component padding */
  padding: {
    xs: 2, // 8px
    sm: 3, // 12px
    md: 4, // 16px
    lg: 6, // 24px
    xl: 8, // 32px
    "2xl": 12, // 48px
  },

  /** Section vertical rhythm */
  section: {
    py: { base: 32, md: 40 }, // py-32 md:py-40
    pySmall: { base: 24, md: 32 }, // py-24 md:py-32
    px: 6, // px-6
  },

  /** Card internal spacing */
  card: {
    padding: { base: 6, md: 8 }, // p-6 md:p-8
    gap: 4, // gap-4
    iconGap: 3, // gap-3
  },

  /** Button sizing */
  button: {
    height: { sm: 9, md: 11, lg: 12 }, // h-9, h-11, h-12
    paddingX: { sm: 3, md: 5, lg: 6 }, // px-3, px-5, px-6
  },

  /** Icon sizes */
  icon: {
    xs: 3, // 12px
    sm: 4, // 16px
    md: 5, // 20px
    lg: 6, // 24px
    xl: 8, // 32px
  },

  /** Border radius scale */
  radius: {
    sm: "calc(var(--radius) - 4px)", // ~0.375rem
    md: "calc(var(--radius) - 2px)", // ~0.5rem
    lg: "var(--radius)", // 0.75rem
    xl: "calc(var(--radius) + 4px)", // ~1.125rem
    "2xl": "calc(var(--radius) + 8px)", // ~1.5rem
    "3xl": "calc(var(--radius) + 12px)", // ~1.875rem
    full: "9999px",
  },

  /** Shadow scale - consistent elevation language */
  shadow: {
    none: "none",
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.07), 0 1px 2px -1px rgb(0 0 0 / 0.07)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.07)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.07), 0 4px 6px -4px rgb(0 0 0 / 0.07)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.07), 0 8px 10px -6px rgb(0 0 0 / 0.07)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.12)",
    inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)",
    /** Navbar elevated state */
    navbar: "0 2px 20px -6px rgb(0 0 0 / 0.08)",
    /** Card hover elevation */
    cardHover: "0 10px 40px -16px rgb(0 0 0 / 0.12)",
    /** Focus ring */
    focus: "0 0 0 2px var(--color-ring)",
  },

  /** Transition durations */
  transition: {
    fast: "150ms",
    normal: "250ms",
    slow: "400ms",
  },

  /** Z-index layers */
  zIndex: {
    base: 0,
    dropdown: 10,
    sticky: 20,
    modal: 40,
    popover: 50,
    tooltip: 60,
    toast: 70,
    /** Navbar fixed position */
    navbar: 50,
    /** Scroll progress bar */
    scrollProgress: 60,
  },
} as const;

/** Helper to convert spacing token to Tailwind class */
export function space(token: keyof typeof SPACING.gap): string {
  return `gap-${token}`;
}

export function gap(token: keyof typeof SPACING.gap): string {
  return `gap-${token}`;
}

export function pad(token: keyof typeof SPACING.padding): string {
  return `p-${token}`;
}

export function px(token: keyof typeof SPACING.padding): string {
  return `px-${token}`;
}

export function py(token: keyof typeof SPACING.padding): string {
  return `py-${token}`;
}
