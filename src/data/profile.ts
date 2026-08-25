import type { Profile } from "@/types";
import { EMAIL, SITE } from "@/constants";

/**
 * Owner profile. The single author-forward object consumed by Hero, About,
 * and Contact — change once to re-brand the whole site.
 */
export const PROFILE: Profile = {
  firstName: "Aryan Nitin",
  lastName: "Kondekar",
  brandmark: SITE.brandmark,
  location: "Pune, India",
  role: "Machine Learning Engineer",
  taglines: ["Machine Learning Engineer", "Python Developer", "MLOps"],
  intro:
    "I build machine learning systems end-to-end — contrastive models trained from scratch on a 6GB GPU, agentic RAG pipelines with hybrid retrieval and self-correcting loops, and MLOps platforms with drift detection, model registries, and containerized inference.",
  aboutHeadline: "Engineering ML systems that ship, not just notebooks that demo.",
  aboutParagraphs: [
    "I'm a Computer Science undergraduate focused on building production-grade machine learning software — the layer where models meet APIs, pipelines, and monitoring.",
    "My work spans multimodal encoders trained from scratch under hard hardware constraints, agentic retrieval systems orchestrated with LangGraph, end-to-end MLOps observability platforms with drift detection, and modular backend services built with FastAPI and Django REST Framework.",
  ],
  contactHeadline: ["Let's build something", "worth shipping."],
  contactParagraph:
    "Open to ML engineering roles, internships, and interesting collaborations. The fastest way to reach me is email.",
};

/** Convenience re-exports so sections need only import from `@/data`. */
export { EMAIL };
