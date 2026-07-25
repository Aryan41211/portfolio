import { motion } from "framer-motion";
import { SECTION_MAP } from "@/constants";
import { cn } from "@/utils";
import { REVEAL_VARIANTS } from "@/constants";

export function SectionHeader({ id, className = "" }: { id: string; className?: string }) {
  const section = SECTION_MAP[id as keyof typeof SECTION_MAP];
  if (!section) return null;

  const ordinal = String(section.index + 1).padStart(2, "0");

  return (
    <motion.div
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
      role="heading"
      aria-level={2}
    >
      <span className="shrink-0 tabular-nums tracking-tight">{ordinal}</span>
      <motion.div
        className="h-px flex-1 bg-border"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ transformOrigin: "left center" }}
        aria-hidden="true"
      />
      <span className="shrink-0">{section.label}</span>
    </motion.div>
  );
}
