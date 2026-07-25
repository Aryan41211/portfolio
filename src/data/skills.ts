import { Braces, Boxes, Container, Cpu, Sparkles } from "lucide-react";
import type { FocusArea, SkillGroup } from "@/types";

/** Focus-area cards rendered in the About section. */
export const FOCUS_AREAS: ReadonlyArray<FocusArea> = [
  { label: "Machine Learning", desc: "Supervised learning, model benchmarking, cross-validation." },
  { label: "Semantic Search", desc: "MiniLM embeddings, FAISS vector indexing at scale." },
  { label: "NLP", desc: "Sentence-transformers, embedding-based retrieval systems." },
  { label: "Backend APIs", desc: "FastAPI, Django REST Framework, Flask services." },
  { label: "MLOps", desc: "Model registries, drift detection, Docker, pytest." },
];

/** Skill-group cards rendered on the Skills section. */
export const SKILL_GROUPS: ReadonlyArray<SkillGroup> = [
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
