import { Braces, Boxes, Container, Cpu, Sparkles } from "lucide-react";
import { Reveal, Section, SectionHeader } from "@/components/common";
import { Badge } from "@/components/ui";
import { SKILL_GROUPS } from "@/data";
import { CARD_HOVER } from "@/constants";
import { motion } from "framer-motion";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader id="skills" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => {
          const Icon = g.icon;
          return (
            <Reveal key={g.title} delay={i * 0.05}>
              <motion.article
                whileHover={CARD_HOVER}
                className="h-full rounded-3xl border border-border bg-card p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/50">
                    <Icon className="h-4 w-4 text-foreground" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {g.title}
                  </h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((s) => (
                    <Badge key={s} variant="skill">
                      {s}
                    </Badge>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
