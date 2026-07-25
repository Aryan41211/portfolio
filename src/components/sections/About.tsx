import { Reveal, Section, SectionHeader } from "@/components/common";
import { Badge } from "@/components/ui";
import { PROFILE, FOCUS_AREAS } from "@/data";
import { CARD_HOVER } from "@/constants";
import { motion } from "framer-motion";

export function About() {
  return (
    <Section id="about">
      <SectionHeader id="about" />

      <div className="grid gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3">
          <h3 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl leading-tight">
            {PROFILE.aboutHeadline}
          </h3>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
            {PROFILE.aboutParagraphs.map((p, i) => (
              <p key={i} className="text-wrap-balance">
                {p}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-2">
          <div className="space-y-3">
            {FOCUS_AREAS.map((f) => (
              <motion.article
                key={f.label}
                whileHover={CARD_HOVER}
                className="rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]"
              >
                <div className="text-sm font-semibold text-foreground">{f.label}</div>
                <div className="mt-1 text-[13px] text-muted-foreground leading-relaxed">
                  {f.desc}
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
