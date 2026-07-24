import { GraduationCap } from "lucide-react";
import { Reveal } from "./Reveal";

const items = [
  {
    degree: "B.Tech, Computer Science Engineering",
    school: "Savitribai Phule Pune University",
    period: "Aug 2024 — Present",
  },
  {
    degree: "HSC (Science)",
    school: "Maharashtra State Board (MSBSHSE)",
    period: "Jun 2022 — Mar 2024",
  },
];

export function Education() {
  return (
    <section id="education" className="scroll-mt-24 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-sm font-medium text-muted-foreground">05</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Education</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-16 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Academic background.
          </h2>
        </Reveal>

        <div className="space-y-3">
          {items.map((it, i) => (
            <Reveal key={it.degree} delay={i * 0.05}>
              <div className="grid gap-4 rounded-3xl border border-border bg-white p-6 transition-all hover:border-foreground/20 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
                <div className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-secondary/50">
                  <GraduationCap className="h-4 w-4 text-foreground" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
                    {it.degree}
                  </h3>
                  <div className="mt-1 text-sm text-muted-foreground">{it.school}</div>
                </div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground md:text-right">
                  {it.period}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
