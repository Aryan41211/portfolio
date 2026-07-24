import { Braces, Boxes, Cpu, Container, Sparkles } from "lucide-react";
import { Reveal } from "./Reveal";

const groups = [
  {
    icon: Braces,
    title: "Core Languages",
    items: ["Python", "SQL", "C++"],
  },
  {
    icon: Cpu,
    title: "ML Libraries",
    items: [
      "scikit-learn",
      "XGBoost",
      "FAISS",
      "sentence-transformers (MiniLM)",
      "NumPy",
      "Pandas",
    ],
  },
  {
    icon: Boxes,
    title: "Frameworks & APIs",
    items: ["FastAPI", "Django REST Framework", "Flask", "Streamlit"],
  },
  {
    icon: Container,
    title: "MLOps & Infra",
    items: ["Docker", "pytest", "Git", "GitHub", "SQLite", "Jupyter Notebook"],
  },
  {
    icon: Sparkles,
    title: "Concepts",
    items: [
      "NLP",
      "Semantic Search",
      "Vector Embeddings",
      "Supervised Learning",
      "Data Drift Detection",
      "REST APIs",
      "OOP",
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-sm font-medium text-muted-foreground">04</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Skills</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-16 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            The stack I build with.
          </h2>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <Reveal key={g.title} delay={i * 0.05}>
                <div className="h-full rounded-3xl border border-border bg-white p-6 transition-all hover:border-foreground/20 hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/50">
                      <Icon className="h-4 w-4 text-foreground" />
                    </div>
                    <h3 className="text-base font-semibold tracking-tight text-foreground">
                      {g.title}
                    </h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {g.items.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border bg-white px-2.5 py-1 text-[12px] font-medium text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
