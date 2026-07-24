import { Reveal } from "./Reveal";

const focus = [
  { label: "Machine Learning", desc: "Supervised learning, model benchmarking, cross-validation." },
  { label: "Semantic Search", desc: "MiniLM embeddings, FAISS vector indexing at scale." },
  { label: "NLP", desc: "Sentence-transformers, embedding-based retrieval systems." },
  { label: "Backend APIs", desc: "FastAPI, Django REST Framework, Flask services." },
  { label: "MLOps", desc: "Model registries, drift detection, Docker, pytest." },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-sm font-medium text-muted-foreground">01</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">About</span>
          </div>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-5">
          <Reveal className="md:col-span-3">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
              Engineering ML systems that ship, not just notebooks that demo.
            </h2>
            <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground md:text-lg">
              <p>
                I'm a Computer Science undergraduate focused on building production-grade
                machine learning software — the layer where models meet APIs, pipelines, and
                monitoring.
              </p>
              <p>
                My work spans semantic search over legal document corpora, end-to-end MLOps
                observability platforms with drift detection, and modular backend services
                built with FastAPI and Django REST Framework.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-2">
            <div className="space-y-3">
              {focus.map((f) => (
                <div
                  key={f.label}
                  className="rounded-2xl border border-border bg-white p-4 transition-all hover:border-foreground/20 hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)]"
                >
                  <div className="text-sm font-semibold text-foreground">{f.label}</div>
                  <div className="mt-1 text-[13px] text-muted-foreground">{f.desc}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
