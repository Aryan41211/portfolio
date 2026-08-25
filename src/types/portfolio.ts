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

/**
 * Visual role of a node in an architecture diagram. Drives fill and border
 * treatment only — the layout is entirely grid-driven.
 */
export type DiagramNodeKind = "input" | "process" | "decision" | "store" | "output" | "external";

/** A single box in a project architecture diagram. */
export interface DiagramNode {
  id: string;
  label: string;
  kind: DiagramNodeKind;
  /** Zero-based grid column, left to right. */
  col: number;
  /** Zero-based grid row, top to bottom. */
  row: number;
  /**
   * Playback order. Nodes sharing a step illuminate together — that is how
   * parallel stages (three research agents, three router branches) are shown.
   */
  step: number;
  /** Optional second line rendered beneath the label. */
  detail?: string;
  /**
   * Repository-relative path to the code this node represents. When present
   * (and the project has a `url`), the node becomes a link to that source on
   * GitHub. A trailing slash marks a directory, which resolves to `/tree/`
   * rather than `/blob/`.
   */
  source?: string;
}

/** A directed connection between two diagram nodes. */
export interface DiagramEdge {
  from: string;
  to: string;
  /** Short caption rendered at the midpoint (e.g. a routing branch name). */
  label?: string;
  /** Dashed edges denote conditional or optional paths. */
  dashed?: boolean;
}

/** An animated architecture diagram describing a project's real data flow. */
export interface ProjectDiagram {
  /** Grid extent the node coordinates are laid out against. */
  cols: number;
  rows: number;
  nodes: DiagramNode[];
  edges: DiagramEdge[];
  /** One-line description, also used as the diagram's accessible name. */
  caption: string;
}

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
  /** Animated data-flow diagram rendered above the architecture summary. */
  diagram?: ProjectDiagram;
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
