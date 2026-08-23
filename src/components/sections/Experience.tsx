import { Reveal, Section, SectionHeader } from "@/components/common";
import { Badge } from "@/components/ui";
import { EXPERIENCE } from "@/data";
import { CARD_HOVER } from "@/constants";
import { motion } from "framer-motion";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader id="experience" />

      {EXPERIENCE.map((exp) => (
        <Reveal key={exp.role}>
          <motion.article
            whileHover={CARD_HOVER}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-200 hover:border-brand-subtle hover:shadow-[0_20px_44px_-28px_var(--brand)] md:p-12"
          >
            <div className="grid gap-10 md:grid-cols-[auto_1fr]">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-brand">
                  {exp.period}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground leading-snug">
                  {exp.role}
                </h3>
                <div className="mt-1 text-base text-muted-foreground">{exp.company}</div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {exp.stack.map((s) => (
                    <Badge key={s} variant="default">
                      {s}
                    </Badge>
                  ))}
                </div>
              </div>
              <ul className="min-w-0 space-y-4" role="list">
                {exp.highlights.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-brand"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.article>
        </Reveal>
      ))}
    </Section>
  );
}
