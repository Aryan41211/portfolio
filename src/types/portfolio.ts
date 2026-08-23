/**
 * Central domain types for the portfolio.
 *
 * Every static dataset in `src/data/*` is typed against the interfaces
 * declared here so the content layer is structurally validated at compile
 * time and section components can stay prop-driven and presentation-only.
 */

import type { LucideIcon } from "lucide-react";

/** Section identifiers — the fragment ids used by anchor navigation. */
export type SectionId =
  "home" | "about" | "experience" | "projects" | "skills" | "education" | "contact";

/** A single entry in the primary navigation. */
export interface NavLink {
  id: SectionId;
  href: `#${SectionId}`;
  label: string;
}

/** Ordered metadata for a numbered portfolio section (01 About, 02 Experience…). */
export interface SectionMeta {
  /** Zero-based ordinal rendered as a two-digit label (00 -> "00"). */
  index: number;
  /** Section id, used as the anchor target. */
  id: SectionId;
  /** Human-readable label rendered beside the divider. */
  label: string;
}

/** Decorative SVG artwork variant rendered on a project card header. */
export type ProjectPattern = "grid" | "waves" | "dots" | "rings" | "diagonal" | "crosshatch";

/** A portfolio project entry. */
export interface Project {
  title: string;
  subtitle: string;
  period: string;
  stack: string[];
  highlights: string[];
  pattern: ProjectPattern;
  /** Optional canonical GitHub URL for the project. */
  url?: string;
  /** Key features displayed in the project modal. */
  features?: string[];
  /** Engineering highlights displayed in the project modal. */
  engineering?: string[];
  /** One-paragraph overview for the project modal. */
  overview?: string;
  /** Problem statement for the project modal. */
  problem?: string;
  /** Solution description for the project modal. */
  solution?: string;
  /** Architecture summary for the project modal. */
  architecture?: string;
}

/** A single work-exposure entry (currently a single internship, structured for growth). */
export interface ExperienceEntry {
  period: string;
  role: string;
  company: string;
  stack: string[];
  highlights: string[];
}

/** A single academic-credential entry. */
export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
}

/** A focus-area card rendered on the About section. */
export interface FocusArea {
  label: string;
  desc: string;
}

/** A skill-group card rendered on the Skills section. */
export interface SkillGroup {
  icon: LucideIcon;
  title: string;
  items: string[];
}

/** Brand/social link surfaced in hero, contact, and footer. */
export interface SocialLink {
  id: "github" | "linkedin" | "x";
  label: string;
  href: string;
  /** Visible handle portion (e.g. "github.com/Aryan41211"). */
  handle: string;
}

/** A headline number surfaced under the hero copy. */
export interface ProfileStat {
  /** The number itself, pre-formatted (e.g. "12K+"). */
  value: string;
  /** What the number counts. */
  label: string;
}

/** Public profile metadata used across the site. */
export interface Profile {
  /** First + middle initials rendered in the hero (e.g. "Aryan Nitin"). */
  firstName: string;
  /** Surname rendered on its own line in the hero (e.g. "Kondekar"). */
  lastName: string;
  /** Short brandmark rendered in the navbar (e.g. "ANK"). */
  brandmark: string;
  /** Location string used in the availability badge and contact card. */
  location: string;
  /** Primary role tagline. */
  role: string;
  /** Secondary taglines rendered as dot-separated chips. */
  taglines: string[];
  /** Long-form hero paragraph. */
  intro: string;
  /** About-section headline. */
  aboutHeadline: string;
  /** About-section paragraphs. */
  aboutParagraphs: string[];
  /** Contact-section headline (first line + muted second line). */
  contactHeadline: string[];
  /** Contact-section supporting paragraph. */
  contactParagraph: string;
  /** Headline metrics rendered as a strip beneath the hero CTAs. */
  stats: ProfileStat[];
}
