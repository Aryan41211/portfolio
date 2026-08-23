import type { SocialLink } from "@/types";

/** Social links surfaced in hero, contact, and footer — single source of truth. */
export const SOCIAL_LINKS: ReadonlyArray<SocialLink> = [
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Aryan41211",
    handle: "github.com/Aryan41211",
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    href: "https://linkedin.com/in/aryankondekar",
    handle: "linkedin.com/in/aryankondekar",
  },
  {
    id: "x",
    label: "X",
    href: "https://x.com/AryanKondekar16",
    handle: "x.com/AryanKondekar16",
  },
] as const;

/**
 * The @-prefixed X username. Twitter card meta expects this form, not a URL,
 * so it is stated once here rather than derived from `handle`.
 */
export const X_USERNAME = "@AryanKondekar16";
