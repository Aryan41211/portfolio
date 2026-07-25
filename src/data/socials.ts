import type { SocialLink } from "@/types";

/**
 * Brand / social links. The `handle` is the visible slug; `href` is the
 * destination. Both are kept explicit so neither can silently desync from
 * the displayed text.
 */
export const SOCIALS: ReadonlyArray<SocialLink> = [
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

/** Quick lookup helper so UI can resolve an icon by social id without a switch. */
export const SOCIAL_MAP: Record<SocialLink["id"], SocialLink> = SOCIALS.reduce(
  (acc, social) => ({ ...acc, [social.id]: social }),
  {} as Record<SocialLink["id"], SocialLink>,
);
