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
          <motion.div
            whileHover={CARD_HOVER}
            className="relative rounded-3xl border border-border bg-card p-8 md:p-12 transition-all duration-200 hover:border-foreground/20"
          >
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
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
              <ul className="space-y-4" role="list">
                {exp.highlights.map((b, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground"
                      aria-hidden="true"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </Reveal>
      ))}
    </Section>
  );
}
