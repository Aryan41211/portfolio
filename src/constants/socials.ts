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
] as const;
