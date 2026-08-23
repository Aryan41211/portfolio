import type { SocialLink } from "@/types";
import { SOCIAL_LINKS } from "@/constants";

/**
 * Brand / social links. The `handle` is the visible slug; `href` is the
 * destination.
 *
 * This list is re-exported from `@/constants` rather than restated. The two
 * copies were previously identical literals, so adding a link in one place
 * left the other stale — exactly the desync the original comment warned
 * about. `@/data` stays the import surface for sections.
 */
export const SOCIALS: ReadonlyArray<SocialLink> = SOCIAL_LINKS;

/** Quick lookup helper so UI can resolve a link by social id without a switch. */
export const SOCIAL_MAP: Record<SocialLink["id"], SocialLink> = SOCIALS.reduce(
  (acc, social) => ({ ...acc, [social.id]: social }),
  {} as Record<SocialLink["id"], SocialLink>,
);
