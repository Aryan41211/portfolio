/**
 * Animation timing & motion presets.
 * Refined for premium feel: consistent easings, calibrated durations, natural stagger.
 */

import type { Transition, Variants } from "framer-motion";

/** Premium easing curves - cubic-bezier for natural, Apple/Linear-like feel */
export const EASING = {
  /** Standard ease-out for most transitions */
  standard: [0.25, 0.46, 0.45, 0.94] as const,
  /** Slightly more expressive for entrances */
  entrance: [0.16, 1, 0.3, 1] as const,
  /** Snappy for micro-interactions (hover, tap) */
  snappy: [0.05, 0.7, 0.1, 1] as const,
  /** Gentle for scroll-linked animations */
  gentle: [0.33, 1, 0.68, 1] as const,
  /** Expressive spring for layout animations */
  spring: { type: "spring", stiffness: 420, damping: 28 } as const,
} as const;

/** Centralized timing tokens */
export const DURATION = {
  instant: 0.08,
  fast: 0.15,
  normal: 0.25,
  slow: 0.4,
  slower: 0.6,
  entrance: 0.8,
} as const;

/** Scroll & viewport thresholds */
export const ANIMATION = {
  /** Threshold (px) at which navbar elevates */
  scrollThresholdPx: 20,
  /** Reveal viewport margin - triggers slightly before entering viewport */
  revealMarginPx: 100,
  /** Scroll-spy vertical center offset */
  spyOffsetPx: 120,
  /** Stagger delay between hero elements */
  heroStagger: 0.06,
  /** Stagger delay between section items */
  sectionStagger: 0.05,
} as const;

/** Refined spring configurations */
export const MOTION_SPRING = {
  /** Navbar active-link pill - snappy but not bouncy */
  navPill: { type: "spring", stiffness: 500, damping: 35, mass: 0.8 } as Transition,
  /** Project card hover lift - subtle elevation */
  projectCard: { type: "spring", stiffness: 380, damping: 30 } as Transition,
  /** Skill/education card hover */
  cardHover: { type: "spring", stiffness: 400, damping: 32 } as Transition,
  /** Scroll-progress bar scaleX - buttery smooth */
  scrollProgress: { stiffness: 180, damping: 25, mass: 0.3 } as Transition,
  /** Mobile menu slide */
  mobileMenu: { type: "spring", stiffness: 450, damping: 30 } as Transition,
  /** Button press/tap */
  press: { type: "spring", stiffness: 600, damping: 45 } as Transition,
} as const satisfies Record<string, Transition>;

/** Hero entrance: staggered fade-up with premium easing */
export const HERO_VARIANTS = {
  container: {
    hidden: {},
    show: { transition: { staggerChildren: ANIMATION.heroStagger, delayChildren: 0.12 } },
  },
  item: {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: DURATION.entrance, ease: EASING.entrance },
    },
  },
} as const satisfies { container: Variants; item: Variants };

/** Reveal-on-scroll: shared fade-up used by every numbered section */
export const REVEAL_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slower, ease: EASING.entrance },
  },
} as const satisfies Variants;

/** Card hover variant for consistent elevation */
export const CARD_HOVER = {
  y: -4,
  transition: MOTION_SPRING.cardHover,
} as const;

/** Button press feedback */
export const BUTTON_PRESS = {
  scale: 0.97,
  transition: MOTION_SPRING.press,
} as const;

/** Icon button hover */
export const ICON_BUTTON_HOVER = {
  scale: 1.08,
  rotate: 2,
  transition: MOTION_SPRING.cardHover,
} as const;
