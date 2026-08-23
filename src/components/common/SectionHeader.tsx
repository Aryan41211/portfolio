import { motion } from "framer-motion";
import { SECTION_MAP } from "@/constants";
import { cn } from "@/utils";
import { REVEAL_VARIANTS } from "@/constants";

/**
 * Numbered section heading.
 *
 * Renders a real <h2> so the document outline is h1 -> h2 -> h3. The ordinal
 * and the rule are decorative, hidden from assistive tech, leaving the label
 * as the accessible name that each <section aria-labelledby> points at.
 */
export function SectionHeader({ id, className = "" }: { id: string; className?: string }) {
  const section = SECTION_MAP[id as keyof typeof SECTION_MAP];
  if (!section) return null;

  const ordinal = String(section.index + 1).padStart(2, "0");

  return (
    <motion.h2
      id={`${id}-heading`}
      variants={REVEAL_VARIANTS}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "mb-12 flex items-baseline gap-4",
        "text-sm font-medium text-muted-foreground",
        className,
      )}
    >
      <span className="shrink-0 tabular-nums tracking-tight text-brand" aria-hidden="true">
        {ordinal}
      </span>
      <motion.span
        className="h-px flex-1 bg-gradient-to-r from-brand-subtle to-border"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: "left center" }}
        aria-hidden="true"
      />
      <span className="shrink-0">{section.label}</span>
    </motion.h2>
  );
}
