import type { ExperienceEntry } from "@/types";

/**
 * Work exposure. Structured as a list so a future second role slots in
 * without touching the Experience component tree.
 */
export const EXPERIENCE: ReadonlyArray<ExperienceEntry> = [
  {
    period: "Mar 2026 — May 2026",
    role: "Machine Learning Intern",
    company: "Pratinik Infotech",
    stack: [
      "Python",
      "Streamlit",
      "scikit-learn",
      "XGBoost",
      "FastAPI",
      "SQLite",
      "Plotly",
      "Docker",
      "pytest",
    ],
    highlights: [
      "Built an end-to-end MLOps observability platform (experiment tracker + model registry + drift monitor) using Streamlit and SQLite to centralize model lifecycle management and cut down on manual tracking work.",
      "Engineered a 7-stage ML training pipeline supporting 6 algorithms (Random Forest, XGBoost, GBM, SVM, LR, Decision Tree) with StratifiedKFold cross-validation across multiple benchmark datasets.",
      "Designed a decoupled 3-layer service architecture (UI / business logic / persistence) with a FastAPI inference endpoint featuring model-stage awareness (production vs. staging) to support safer, staged model rollouts.",
      "Implemented KS-test + PSI-based feature-level drift detection with severity-tiered alerts and per-feature diagnostic history, enabling proactive data quality monitoring across 10K+ record production datasets.",
      "Containerized the platform via Docker and authored automated pytest suites covering core pipeline and drift logic, improving deployment reproducibility and easing regression detection.",
    ],
  },
];
