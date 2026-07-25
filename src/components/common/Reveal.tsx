import { motion } from "framer-motion";
import React, { type ReactNode } from "react";
import { REVEAL_VARIANTS, ANIMATION } from "@/constants";

/**
 * Scroll-reveal wrapper with premium timing.
 * - Uses IntersectionObserver via Framer Motion's whileInView
 * - Triggers 100px before element enters viewport
 * - Animates once (once: true)
 * - Respects reduced-motion preference
 */
export function Reveal({
  children,
  delay = 0,
  className,
  /** Disable animation for instant render (e.g., during SSR or testing) */
  disabled = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  disabled?: boolean;
}) {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={REVEAL_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: `-${ANIMATION.revealMarginPx}px` }}
      transition={{ delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** StaggeredReveal - wraps multiple children with automatic stagger */
export function StaggeredReveal({
  children,
  className,
  stagger = ANIMATION.sectionStagger,
  delayChildren = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {React.Children.map(children, (child, index) =>
        React.isValidElement(child)
          ? React.cloneElement(child, { variants: REVEAL_VARIANTS } as Record<string, unknown>)
          : child,
      )}
    </motion.div>
  );
}
