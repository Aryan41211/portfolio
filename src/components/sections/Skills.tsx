import { Reveal, Section, SectionHeader } from "@/components/common";
import { Badge } from "@/components/ui";
import { SKILL_GROUPS } from "@/data";
import { useTilt } from "@/hooks";
import type { SkillGroup } from "@/types";

function SkillCard({ group }: { group: SkillGroup }) {
  const { ref, tiltProps } = useTilt<HTMLElement>({ max: 5, lift: 10 });
  const Icon = group.icon;

  return (
    <div className="tilt-scene h-full">
      <article
        ref={ref}
        {...tiltProps}
        className={`${tiltProps.className} group relative h-full rounded-3xl border border-border bg-card p-6 hover:border-brand-subtle hover:shadow-[0_16px_36px_-24px_var(--brand)]`}
      >
        <span className="tilt-sheen" aria-hidden="true" />
        <div
          className="tilt-layer flex items-center gap-3"
          style={{ "--layer-z": "22px" } as React.CSSProperties}
        >
          <div className="grid h-10 w-10 place-items-center rounded-xl border border-brand-subtle bg-brand-muted">
            <Icon className="h-4 w-4 text-brand" aria-hidden="true" />
          </div>
          <h3 className="text-base font-semibold tracking-tight text-foreground">{group.title}</h3>
        </div>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {group.items.map((s) => (
            <Badge key={s} variant="skill">
              {s}
            </Badge>
          ))}
        </div>
      </article>
    </div>
  );
}

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader id="skills" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((g, i) => (
          <Reveal key={g.title} delay={i * 0.05} className="h-full">
            <SkillCard group={g} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
