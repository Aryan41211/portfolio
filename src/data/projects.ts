import type { Project } from "@/types";

/**
 * Project portfolio. The canonical GitHub username is reused for every
 * project card's link affordance, matching the original behaviour exactly.
 */
const GITHUB_USER_URL = "https://github.com/Aryan41211";

export const PROJECTS: ReadonlyArray<Project> = [
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
    url: GITHUB_USER_URL,
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
    url: GITHUB_USER_URL,
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
    url: GITHUB_USER_URL,
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
    url: GITHUB_USER_URL,
  },
];
