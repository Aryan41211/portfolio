import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { MOTION_SPRING } from "@/constants";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();
  const scaleX = useSpring(
    scrollYProgress,
    prefersReducedMotion ? { stiffness: 1000, damping: 100 } : MOTION_SPRING.scrollProgress,
  );

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-foreground will-change-transform"
      aria-hidden="true"
    />
  );
}
