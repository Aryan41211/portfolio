import { GraduationCap } from "lucide-react";
import { Reveal, Section, SectionHeader } from "@/components/common";
import { EDUCATION } from "@/data";
import { CARD_HOVER } from "@/constants";
import { motion } from "framer-motion";

export function Education() {
  return (
    <Section id="education">
      <SectionHeader id="education" />

      <div className="space-y-3">
        {EDUCATION.map((it, i) => (
          <Reveal key={it.degree} delay={i * 0.05}>
            <motion.article
              whileHover={CARD_HOVER}
              className="grid gap-4 rounded-3xl border border-border bg-card p-6 transition-all duration-200 hover:border-brand-subtle hover:shadow-[0_14px_32px_-24px_var(--brand)] md:grid-cols-[auto_1fr_auto] md:items-center md:p-8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl border border-brand-subtle bg-brand-muted">
                <GraduationCap className="h-4 w-4 text-brand" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl leading-snug">
                  {it.degree}
                </h3>
                <div className="mt-1 text-sm text-muted-foreground">{it.school}</div>
              </div>
              <div className="text-xs font-medium uppercase tracking-widest text-brand md:text-right">
                {it.period}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
