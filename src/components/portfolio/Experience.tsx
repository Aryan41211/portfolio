import { Reveal } from "./Reveal";

const bullets = [
  "Built an end-to-end MLOps observability platform (experiment tracker + model registry + drift monitor) using Streamlit and SQLite to centralize model lifecycle management and cut down on manual tracking work.",
  "Engineered a 7-stage ML training pipeline supporting 6 algorithms (Random Forest, XGBoost, GBM, SVM, LR, Decision Tree) with StratifiedKFold cross-validation across multiple benchmark datasets.",
  "Designed a decoupled 3-layer service architecture (UI / business logic / persistence) with a FastAPI inference endpoint featuring model-stage awareness (production vs. staging) to support safer, staged model rollouts.",
  "Implemented KS-test + PSI-based feature-level drift detection with severity-tiered alerts and per-feature diagnostic history, enabling proactive data quality monitoring across 10K+ record production datasets.",
  "Containerized the platform via Docker and authored automated pytest suites covering core pipeline and drift logic, improving deployment reproducibility and easing regression detection.",
];

const stack = [
  "Python",
  "Streamlit",
  "scikit-learn",
  "XGBoost",
  "FastAPI",
  "SQLite",
  "Plotly",
  "Docker",
  "pytest",
];

export function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-sm font-medium text-muted-foreground">02</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Experience</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-16 text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Where I've worked.
          </h2>
        </Reveal>

        <Reveal>
          <div className="relative rounded-3xl border border-border bg-white p-8 md:p-12">
            <div className="grid gap-10 md:grid-cols-[1fr_2fr]">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  Mar 2026 — May 2026
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                  Machine Learning Intern
                </h3>
                <div className="mt-1 text-base text-muted-foreground">Pratinik Infotech</div>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <ul className="space-y-4">
                {bullets.map((b, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground">
                    <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
