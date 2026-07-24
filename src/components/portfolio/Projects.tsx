import { motion } from "framer-motion";
import { Github } from "lucide-react";
import { Reveal } from "./Reveal";

type Project = {
  title: string;
  subtitle: string;
  period: string;
  stack: string[];
  highlights: string[];
  pattern: "grid" | "waves" | "dots" | "rings";
};

const projects: Project[] = [
  {
    title: "NyaySaathi",
    subtitle: "NLP Legal Intelligence Platform",
    period: "Jan 2026 — Mar 2026",
    stack: ["Python", "Django REST Framework", "FAISS", "sentence-transformers", "NumPy"],
    highlights: [
      "Built a semantic legal search engine over a 12K+ document corpus using MiniLM sentence embeddings and FAISS vector indexing, replacing a slower linear TF-IDF baseline.",
      "Designed and exposed 4 REST API endpoints via Django REST Framework for query intake, embedding generation, and ranked result retrieval.",
      "Optimized FAISS index construction (IVF + flat quantizer) for similarity search over a 768-dimensional embedding space with memory-efficient serialization.",
    ],
    pattern: "grid",
  },
  {
    title: "Library Management System",
    subtitle: "Flask + CLI",
    period: "Feb 2025 — Mar 2025",
    stack: ["Python", "Flask", "JSON", "OOP", "Role-Based Access Control"],
    highlights: [
      "Full-stack Library Management System with CLI and REST interfaces; seeded 1,000+ book records in JSON storage with borrow/return tracking, overdue management, and advanced multi-field search.",
      "Structured modular OOP layers (auth, catalog, transactions) with PIN-based session security and robust error handling — database-agnostic for future migration.",
    ],
    pattern: "waves",
  },
  {
    title: "Supervised ML Model Benchmarking",
    subtitle: "Classification model comparison suite",
    period: "Jan 2025 — Mar 2025",
    stack: ["Python", "scikit-learn", "NumPy", "Pandas", "Matplotlib"],
    highlights: [
      "Benchmarked 5 supervised ML models on 5K–15K row real-world datasets; evaluated with confusion matrix, precision-recall, F1, and CV.",
      "Achieved 75–85% accuracy and documented reproducible workflows on GitHub.",
    ],
    pattern: "dots",
  },
  {
    title: "Exploratory Data Analysis Pipeline",
    subtitle: "Reusable EDA toolkit",
    period: "Mar 2025 — Jun 2025",
    stack: ["Python", "Pandas", "NumPy", "Matplotlib"],
    highlights: [
      "Designed reusable EDA pipelines covering missing-value imputation, outlier detection, and aggregation transforms.",
      "Standardized preprocessing across multiple real-world datasets for downstream projects.",
    ],
    pattern: "rings",
  },
];

function Artwork({ pattern }: { pattern: Project["pattern"] }) {
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-border bg-secondary/40">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 225" fill="none">
        {pattern === "grid" && (
          <g stroke="currentColor" strokeWidth="0.5" className="text-foreground/15">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={225} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 20} x2={400} y2={i * 20} />
            ))}
            <circle cx="200" cy="112" r="60" className="fill-foreground/5 stroke-foreground/30" />
            <circle cx="200" cy="112" r="30" className="fill-foreground/10 stroke-foreground/40" />
          </g>
        )}
        {pattern === "waves" && (
          <g stroke="currentColor" fill="none" className="text-foreground/25">
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${40 + i * 18} Q100 ${20 + i * 18} 200 ${40 + i * 18} T400 ${40 + i * 18}`}
                strokeWidth="0.6"
              />
            ))}
          </g>
        )}
        {pattern === "dots" && (
          <g className="fill-foreground/30">
            {Array.from({ length: 16 }).map((_, y) =>
              Array.from({ length: 28 }).map((_, x) => (
                <circle key={`${x}-${y}`} cx={10 + x * 14} cy={10 + y * 14} r={1.2} />
              )),
            )}
          </g>
        )}
        {pattern === "rings" && (
          <g stroke="currentColor" fill="none" className="text-foreground/25">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx="200" cy="112" r={10 + i * 12} strokeWidth="0.6" />
            ))}
          </g>
        )}
      </svg>
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-sm font-medium text-muted-foreground">03</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Projects</span>
          </div>
        </Reveal>

        <Reveal>
          <h2 className="mb-16 max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            Selected work.
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <motion.article
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="group flex h-full flex-col rounded-3xl border border-border bg-white p-6 transition-shadow hover:shadow-[0_10px_40px_-16px_rgba(0,0,0,0.12)] md:p-8"
              >
                <Artwork pattern={p.pattern} />
                <div className="mt-6 flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                      {p.period}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                      {p.title}
                    </h3>
                    <div className="mt-1 text-sm text-muted-foreground">{p.subtitle}</div>
                  </div>
                  <a
                    href="https://github.com/Aryan41211"
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${p.title} on GitHub`}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border text-foreground transition-all hover:bg-foreground hover:text-background"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                </div>
                <ul className="mt-5 space-y-2.5">
                  {p.highlights.map((h, j) => (
                    <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-[11px] font-medium text-foreground"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
