/**
 * Public, owner-editable profile metadata.
 *
 * Defaults to Aryan Nitin Kondekar — change values here (and in
 * `src/data/profile.ts`) to repurpose the site for a different person.
 * Nothing in the components should reference the name directly.
 */

export const SITE = {
  author: "Aryan Nitin Kondekar",
  /** Short brandmark rendered in the navbar and as the og:site_name. */
  brandmark: "ANK",
  title: "Aryan Nitin Kondekar — Machine Learning Engineer",
  description:
    "Portfolio of Aryan Nitin Kondekar — Machine Learning Engineer specializing in NLP, semantic search, and MLOps.",
  url: "https://aryankondekar.dev",
  locale: "en",
} as const;

/** Canonical contact email — single source of truth for hero + contact + mailto. */
export const EMAIL = "aryankondekar16@gmail.com";

/** Public resume asset (served from `/public`). */
export const RESUME = {
  href: "/Aryan_Kondekar_Resume.pdf",
  /** Tailwind-flavoured text for resume download affordances. */
  cta: "Download Resume",
  ctaShort: "Resume",
} as const;
