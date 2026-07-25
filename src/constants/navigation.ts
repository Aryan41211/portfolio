import type { NavLink, SectionId, SectionMeta } from "@/types";

/**
 * Primary navigation — the single source of truth for both the navbar links
 * AND the numbered section headers (01 About, 02 Experience, …).
 *
 * `SECTIONS` is derived from this list so the ordinal, label, and anchor id
 * can never drift apart when sections are added or reordered.
 */
export const NAV_LINKS: ReadonlyArray<NavLink> = [
  { id: "home", href: "#home", label: "Home" },
  { id: "about", href: "#about", label: "About" },
  { id: "experience", href: "#experience", label: "Experience" },
  { id: "projects", href: "#projects", label: "Projects" },
  { id: "skills", href: "#skills", label: "Skills" },
  { id: "education", href: "#education", label: "Education" },
  { id: "contact", href: "#contact", label: "Contact" },
] as const;

/** Ordered section metadata (id, label, two-digit ordinal) derived from the nav. */
export const SECTIONS: ReadonlyArray<SectionMeta> = NAV_LINKS.map((link, index) => ({
  index,
  id: link.id,
  label: link.label,
}));

/** Stable lookup of a section's metadata by its anchor id. */
export const SECTION_MAP: Record<SectionId, SectionMeta> = Object.fromEntries(
  SECTIONS.map((s) => [s.id, s]),
) as Record<SectionId, SectionMeta>;

/** The anchor ids scroll-spy observes (excludes the Hero section). */
export const TRACKABLE_SECTION_IDS: ReadonlyArray<SectionId> = NAV_LINKS.map((l) => l.id);
