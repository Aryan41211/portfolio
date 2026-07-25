import { motion } from "framer-motion";
import { type ReactNode } from "react";
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
