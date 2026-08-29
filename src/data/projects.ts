import type { Project } from "@/types";

/**
 * Project catalogue.
 *
 * Every claim below is sourced from the project's own repository — module
 * layout, dependency manifests, test suites, and git history — rather than
 * from memory. Periods are the first-to-last commit range on `main`.
 */

const GITHUB_USER_URL = "https://github.com/Aryan41211";

export const PROJECTS: ReadonlyArray<Project> = [
  {
    title: "VectorMind",
    subtitle: "Multimodal Search Trained From Scratch",
    period: "Jul 2026 — Aug 2026",
    stack: [
      "Python",
      "PyTorch",
      "Contrastive Learning",
      "FAISS",
      "FastAPI",
      "React",
      "TypeScript",
      "Weights & Biases",
      "Docker",
    ],
    highlights: [
      "Trained a dual-encoder image/text model from scratch on a single 6GB laptop GPU — a ResNet-18-style CNN tower and a 6-layer Transformer tower projected into a shared 256-dimensional space, with no pretrained CLIP or OpenCLIP weights anywhere in the stack.",
      "Reached 28.9% Recall@10 on image→text retrieval over a held-out split of 3,179 images and 15,895 captions — 92× above chance, computed as the exact complement of drawing K non-relevant items rather than the k/n shortcut that inflates it.",
      "Built embedding-health diagnostics alongside recall, then ran a controlled A/B that reversed the project's own published conclusion: the MoCo-style memory queue it was designed around was halving retrieval quality, and shipping it disabled nearly doubled R@10.",
    ],
    features: [
      "Dual-encoder architecture with independently swappable image tower, text tower, and projection heads",
      "Symmetric InfoNCE contrastive training over in-batch negatives with a learnable, clamped logit scale",
      "Cross-modal retrieval in both directions — image to text and text to image",
      "Embedding-health suite measuring anisotropy, uniformity, and matched-versus-unmatched separation, not just Recall@K",
      "FAISS-backed serving stack with a FastAPI search API and a React/TypeScript front end",
      "Fully regenerable reporting — every published figure reproduces from a single script against a checkpoint",
      "Config-driven architecture: encoder dimensions, layer counts, and embedding sizes live in YAML, never hardcoded",
    ],
    engineering: [
      "Mixed-precision training with VRAM profiling and explicit OOM handling, so the run fits a 6GB card by design rather than by trial and error",
      "Overfit sanity checks on a deliberately tiny subset before any full run — if the model cannot memorise 20 pairs, the training loop is wrong, not the data",
      "Memorisation evaluation kept separate from retrieval evaluation, so a strong test number cannot quietly be train-set leakage",
      "Embedding health graded honestly as ANISOTROPIC rather than rounded up to healthy — an earlier checkpoint had claimed healthy on worse numbers, and the write-up documents how that happened",
      "553 Python tests across 35 modules spanning data pipeline, models, training, evaluation, and the serving backend, plus Vitest coverage on the front end",
      "Official Flickr30k split by image id (29,783/1,000/1,000, the Karpathy/Gong convention) persisted as an auditable manifest, so train/val/test agree without a shared runtime",
      "Production serving hardening: a scrape-ready Prometheus-format /metrics endpoint, configurable CPU/GPU inference, a concurrent load-testing tool, and a pre-launch go-live checklist",
      "Chance-corrected metrics throughout: the reported baseline accounts for an image having five valid captions instead of one",
    ],
    overview:
      "A multimodal semantic search platform that learns a shared embedding space for images and text through contrastive learning — both towers trained from scratch under a hard 6GB VRAM constraint, with evaluation designed to catch the ways a contrastive model can look good while being broken.",
    problem:
      "Most CLIP-style projects fine-tune or wrap an already-pretrained model, which hides every decision that actually matters — and the standard Recall@K report hides a specific failure mode, where embeddings collapse into a narrow cone yet still post respectable retrieval numbers.",
    solution:
      "VectorMind builds both encoders from scratch so each architectural choice has to be justified against what is genuinely trainable at this scale, and pairs retrieval metrics with embedding-health diagnostics. That pairing is what surfaced the memory queue defect: recall alone looked acceptable, but the separation and cosine statistics did not.",
    architecture:
      "Images pass through a from-scratch CNN tower and captions through a from-scratch Transformer tower; both project into a shared 256-dimensional space trained with symmetric InfoNCE. At serving time embeddings are indexed in FAISS behind a FastAPI search API, with a React and TypeScript front end for cross-modal queries.",
    pattern: "rings",
    url: `${GITHUB_USER_URL}/VectorMind`,
  },
  {
    title: "ML Pipeline Monitor",
    subtitle: "MLOps Observability and Governance Platform",
    period: "Apr 2026 — Aug 2026",
    stack: [
      "Python",
      "Streamlit",
      "FastAPI",
      "scikit-learn",
      "XGBoost",
      "PostgreSQL",
      "Alembic",
      "Prometheus",
      "Grafana",
      "Docker",
      "Playwright",
    ],
    highlights: [
      "Built an MLOps platform covering the full model lifecycle — dataset versioning and lineage, pipeline execution, experiment tracking, a stage-aware model registry, drift detection, and governance — across seven Streamlit consoles over a shared service layer.",
      "Implemented feature-level drift detection using Population Stability Index and Kolmogorov-Smirnov tests with severity-tiered alerting and per-feature diagnostic history.",
      "Shipped a production deployment stack: Prometheus and Grafana dashboards, Alertmanager rules, an Nginx TLS layer, environment-split Docker Compose files, and Alembic migrations against SQLite or PostgreSQL.",
    ],
    features: [
      "Dataset hub with versioning and lineage tracking across pipeline runs",
      "Visual pipeline runner with stage-by-stage execution and hyperparameter optimisation",
      "Experiment tracking with metric comparison across runs",
      "Model registry with versioned inventory and stage-based lifecycle promotion",
      "Drift detection using PSI and KS tests, with severity tiers and per-feature history",
      "Data health console surfacing validation failures ahead of training",
      "Governance layer covering teams, users, workspaces, audit trails, and policy enforcement",
      "FastAPI inference API with JWT auth, rate limiting, and stage-aware model selection",
    ],
    engineering: [
      "Layered package structure — api, core, database, ml, services, utils — so the Streamlit pages stay presentational and every rule lives in the service layer",
      "Persistence abstracted over both SQLite and PostgreSQL with Alembic migrations and a CRUD module per domain: experiments, models, drift, predictions, governance, lineage",
      "Background worker polling a schedules table, so recurring drift checks run without an external scheduler",
      "Dependency pins carry their reasoning — the starlette floor is documented against the specific CVEs that made the older range unusable",
      "38 test files across unit, integration, Playwright end-to-end, and load suites",
      "Observability wired end to end: Prometheus scrape rules, provisioned Grafana dashboards, Alertmanager routing, and a system telemetry service",
    ],
    overview:
      "An MLOps observability platform that centralises the parts of a model's life that usually live in scattered notebooks and spreadsheets — datasets, runs, experiments, registered models, drift reports, and the audit trail tying them together.",
    problem:
      "Model lifecycle state tends to be scattered across notebooks, local files, and memory. Nobody can say which dataset version trained the model currently in production, whether its input distribution has moved since, or who promoted it — and that only becomes visible once predictions have already degraded.",
    solution:
      "ML Pipeline Monitor makes each of those a first-class, queryable record. Datasets are versioned with lineage, runs write to an experiment store, models carry an explicit stage, drift is measured per feature with PSI and KS and tiered by severity, and governance ties every action to a user and a timestamp.",
    architecture:
      "Seven Streamlit pages and a FastAPI inference API both call one service layer, which sits over an ML layer (pipeline, drift detector, feature store, validation) and a persistence layer with a CRUD module per domain. A polling worker drives scheduled checks; Prometheus, Grafana, and Alertmanager provide the operational view.",
    pattern: "crosshatch",
    url: `${GITHUB_USER_URL}/ml-pipeline-monitor`,
  },
  {
    title: "EarningsLens",
    subtitle: "Management Credibility Scoring from Earnings Calls",
    period: "Jul 2026 — Aug 2026",
    stack: ["Python", "SQLite", "LLM Scoring", "Streamlit", "pytest", "Docker"],
    highlights: [
      "Built a four-phase pipeline that ingests Indian earnings call transcripts and scores management credibility across five dimensions — evasiveness, sentiment shift, complexity spike, overpromising, and forward-guidance vagueness — quarter over quarter.",
      "Implemented gap-aware trend detection with a mixed-model guard, so a quarter-over-quarter delta is never reported when the two scores came from different models or the quarter sequence has holes.",
      "Built the evaluation harness that grades the scorer itself — MAE, Spearman correlation, within-N agreement, and direction accuracy against human labels — plus a self-consistency runner measuring run-to-run spread.",
    ],
    features: [
      "PDF transcript ingestion through cleaning and chunking into a SQLite store",
      "Five scoring dimensions, each an isolated module with its own prompt and rubric",
      "Quarter-over-quarter deltas, rolling averages, and trend labels with explicit gap handling",
      "Streamlit dashboard that warns when scores are not comparable rather than plotting them anyway",
      "Evaluation suite comparing LLM scores against human labels on MAE, Spearman, within-N, and direction",
      "Self-consistency runner quantifying how much a score moves between identical runs",
      "Six installable CLI commands covering ingest, score, trends, evaluate, consistency, and model health",
      "Dry-run mode that prints the token cost before any scoring run starts",
    ],
    engineering: [
      "Strict module boundaries — extraction never touches SQLite, scoring never parses PDFs — with all paths and constants in a single config module",
      "Shared LLM dimension scorer behind per-dimension modules, so a new credibility dimension is a prompt and a rubric rather than a new pipeline",
      "Mixed-model guard on trends: scores from different models are structurally prevented from being differenced against each other",
      "116 tests including end-to-end integration against a mocked LLM, run in CI on every push",
      "Resumable scoring with per-dimension scoping and skip-already-scored, built around a hard daily token budget",
      "Known-issues register tracking every defect found and whether it is fixed, treated as a first-class document rather than a backlog note",
    ],
    overview:
      "A system that reads Indian company earnings call transcripts and scores management credibility across five dimensions quarter over quarter, aiming to surface communication red flags while they are still just communication.",
    problem:
      "Management credibility erodes in language before it shows up in numbers — hedged guidance, deflected questions, sudden jargon. Retail investors have neither the time to read every transcript nor a consistent yardstick to compare one quarter's tone against the last.",
    solution:
      "EarningsLens scores each transcript on five explicit dimensions with a fixed rubric per dimension, then tracks the deltas across quarters. Just as importantly it refuses to draw a trend it cannot defend: mixed-model scores and gapped quarter sequences are flagged rather than plotted, and an evaluation harness measures the scorer against human labels instead of assuming it works.",
    architecture:
      "Phase 1 extracts PDFs to cleaned chunks in SQLite. Phase 2 scores each transcript across five dimension modules sharing one LLM scorer. Phase 3 computes gap-aware quarter-over-quarter deltas and trend labels. Phase 4 renders the Streamlit dashboard. Phase 5 evaluates scores against human labels for MAE, Spearman, within-N, and direction accuracy.",
    pattern: "diagonal",
    url: `${GITHUB_USER_URL}/EarningLens`,
  },
  {
    title: "Retrieval Intelligence Platform",
    subtitle: "Production-Grade RAG Platform",
    period: "Jun 2026 — Aug 2026",
    stack: [
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "Alembic",
      "FAISS",
      "BM25",
      "sentence-transformers",
      "OpenAI",
      "Anthropic",
      "React",
      "TypeScript",
      "Docker",
    ],
    highlights: [
      "Built a modular Retrieval-Augmented Generation platform spanning ingestion, chunking, embedding, hybrid retrieval, and grounded generation — 206 Python modules and roughly 26K lines, backed by 53 test modules and a React/TypeScript console.",
      "Implemented hybrid retrieval that combines dense FAISS vectors with BM25 sparse search, fuses both through Reciprocal Rank Fusion, and refines the result with a cross-encoder reranker — all behind a single feature flag.",
      "Shipped an enterprise layer with JWT access/refresh tokens, Google OAuth 2.0, an RBAC permission matrix, multi-user workspaces, and persistent chat exportable to JSON, Markdown, or PDF.",
    ],
    features: [
      "Multi-format ingestion for PDF, DOCX, TXT, and Markdown, routed through a LoaderFactory with a dedicated loader per format",
      "Three chunking strategies — recursive, sentence-aware, and Markdown-structural — chosen by factory and checked by a validator",
      "Hybrid retrieval: dense FAISS plus sparse BM25, fused with RRF, extended by query expansion and optional cross-encoder reranking",
      "Provider-agnostic generation across OpenAI, Anthropic, Ollama, and NVIDIA NIM, resolved at runtime by a provider factory",
      "Grounded answers with inline citations, delivered to the browser over Server-Sent Events",
      "React 18 and TypeScript console with 13 pages, including a Retrieval Inspector, Citation Explorer, and Context Viewer",
      "Enterprise surface: JWT with Google OAuth, RBAC, shared workspaces, password reset, email verification, and append-only audit logs",
      "Observability throughout — Prometheus metrics, structured JSON logs, and correlation IDs threaded across every request",
    ],
    engineering: [
      "Clean layer separation across the pipeline — loaders, preprocessing, chunking, embeddings, vector store, retrieval, generation — each behind a stable interface so implementations swap without touching callers",
      "FastAPI backend on async SQLAlchemy 2.0 with Alembic migrations, running against SQLite locally and PostgreSQL in production",
      "Provider factory ships a development stub that is rejected outright when the environment is production, so a misconfigured deploy fails loudly instead of serving fabricated answers",
      "Configuration is entirely environment-driven and validated at startup; the application refuses to import without a JWT secret of at least 32 characters",
      "53 test modules across unit, integration, and enterprise suites, with ruff, black, and mypy enforced in CI",
      "Evaluation (RAGAS/DeepEval) and experiment tracking (MLflow/WandB) are deliberately scaffolded — those routes return HTTP 501 rather than simulated results",
      "19-part architecture reference in docs/architecture/, alongside deployment guides for Docker, Railway, Render, AWS, and Azure",
    ],
    overview:
      "A modular, enterprise-ready RAG platform that connects language models to your documents — handling the full path from raw file through chunking, embedding, hybrid retrieval, and grounded generation, with a React console for inspecting every step.",
    problem:
      "Production RAG is not one model call; it is a chain of ingestion, chunking, embedding, retrieval, and generation decisions where any link can silently degrade answer quality. Teams end up with notebooks that cannot be reconfigured, swapped, or inspected once something goes wrong.",
    solution:
      "Retrieval Intelligence Platform makes every stage an interchangeable, environment-configured module behind a stable interface. Retrieval strategy, chunker, embedding model, and LLM provider are all selectable without code changes, and the React console surfaces retrieved context and citations so answer quality can be traced back to its source.",
    architecture:
      "Ingestion → chunking → embedding → vector store on the write path. On the read path a query is expanded, retrieved through parallel dense (FAISS) and sparse (BM25) channels, fused with RRF, reranked by a cross-encoder, and passed to the selected LLM provider for a cited answer streamed over SSE. Enterprise concerns — JWT/OAuth, RBAC, workspaces, audit logs — wrap the API, with Prometheus metrics and structured logs underneath.",
    pattern: "grid",
    url: `${GITHUB_USER_URL}/Retrieval-Intelligence-Platform`,
  },
  {
    title: "Adaptive RAG",
    subtitle: "Agentic RAG with Self-Correcting Retrieval",
    period: "Jul 2026 — Aug 2026",
    stack: [
      "Python",
      "LangGraph",
      "LangChain",
      "FastAPI",
      "Qdrant",
      "FAISS",
      "MongoDB (Motor)",
      "OpenAI",
      "Tavily",
      "Streamlit",
    ],
    highlights: [
      "Built an agentic RAG service on a 7-node LangGraph state machine that routes each query to indexed document retrieval, general model knowledge, or live web search via Tavily.",
      "Added a self-correcting retrieval loop — an LLM grader scores document relevance and triggers bounded query rewrites — plus per-turn token and cost accounting attached to every answer.",
      "Hardened it for multi-user deployment: bcrypt and JWT auth with token revocation, per-user vector isolation across pluggable Qdrant/FAISS backends, and over 300 tests across 24 modules.",
    ],
    features: [
      "Three-way query routing — Index for uploaded documents, General for model knowledge, Search for live web results",
      "Self-correcting retrieval: relevance grading with bounded query rewrites, so a weak first retrieval does not become a weak answer",
      "Answers carry citations with source file, page, and snippet — empty by design on the general-knowledge and web-search routes",
      "Per-turn usage accounting reporting model calls, input and output tokens, and cost in USD",
      "Pluggable vector backends — Qdrant for durability across workers, FAISS for local runs — behind a single interface",
      "MongoDB-backed chat history scoped per user and per session, with automatic trimming",
      "Streamlit front end for sign-in, PDF/TXT upload, and chat, over a FastAPI REST API",
      "Answer-quality evaluation harness with a golden dataset, deterministic metrics, and text/JSON reports",
    ],
    engineering: [
      "LangGraph state machine with 7 nodes — query analysis, retrieval, grading, rewriting, generation, web search, and general LLM — wired with conditional edges and bounded loops so rewrite cycles cannot run away",
      "Per-user ReAct agent cached on index version, so a new document upload invalidates the cache instead of serving stale tools",
      "Async MongoDB through Motor, Pydantic-validated request and response schemas, structured logging, request tracing, and rate limiting",
      "Sessions are user-scoped: two users sending the same session id get two separate, private conversations",
      "Reproducible installs enforced by a CI gate that verifies the lock file still matches requirements",
      "Deployment kit including a Caddy TLS reverse proxy plus MongoDB and Qdrant backup and restore scripts with retention",
    ],
    overview:
      "An agentic RAG system that picks a retrieval strategy per query rather than applying one to all of them, then grades its own retrievals and rewrites the query when they come back weak.",
    problem:
      "Conventional RAG runs the same retrieval path for every question. Ask something the documents do not cover and it retrieves noise; ask something time-sensitive and it retrieves stale context — and in both cases it answers confidently, with no mechanism to notice the retrieval was poor.",
    solution:
      "Adaptive RAG classifies each query into Index, General, or Search and executes the matching pipeline. On the Index route an LLM grader scores retrieved documents, and low relevance triggers a bounded rewrite-and-retry loop before generation — so the system corrects a bad retrieval instead of building an answer on top of it.",
    architecture:
      "Streamlit calls a FastAPI backend, which drives a LangGraph state machine. Query analysis routes to one of three paths: the Index path runs retrieval → grade → rewrite → retrieve → generate against Qdrant or FAISS, the Search path calls Tavily, and the General path answers from model knowledge. MongoDB persists per-user session history, and usage and cost are accumulated across every model call in the turn.",
    pattern: "dots",
    url: `${GITHUB_USER_URL}/Adaptive-rag`,
  },
  {
    title: "EquiPilot AI",
    subtitle: "Agentic Equity Research Assistant",
    period: "Jun 2026 — Jul 2026",
    stack: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Streamlit",
      "OpenAI (GPT-4o)",
      "yfinance",
      "Pydantic",
      "Docker",
      "Nginx",
    ],
    highlights: [
      "Built an agentic equity research system on LangGraph, coordinating five specialised agents — router, market data, news, sentiment, and synthesis — into a single reproducible research report.",
      "Implemented an entity resolution layer that maps free-text company names to tickers before any data is fetched, so a natural-language question resolves to the right instrument.",
      "Wrapped it in a production FastAPI service with rate limiting, CSP/HSTS security headers, structured JSON logging, metrics, and health and readiness probes, deployed behind Nginx in Docker.",
    ],
    features: [
      "Ask in plain language with a ticker or company name; the router agent classifies intent before any tool runs",
      "Entity resolution turns ambiguous company references into a concrete ticker ahead of data collection",
      "Multi-source aggregation across yfinance market data, financial news, and LLM-scored sentiment",
      "Structured reports with an executive summary, section cards, risk analysis, and citations where available",
      "Asynchronous request model — submit research, then poll progress and results by request id",
      "Streamlit front end with a query form, live progress tracker, and report renderer on a shared design system",
      "Operational endpoints for health, readiness, version, and metrics, ready for orchestrator probes",
      "Scoped as informational only — no trade execution, no investment advice, no generated trading signals",
    ],
    engineering: [
      "LangGraph state machine with intent-based tool routing across fundamentals, news, sentiment, and full-research paths, executing independent tools in parallel",
      "Five agents and five tools kept as separate modules with their own prompt files, so a prompt change never means touching orchestration code",
      "Production middleware stack: slowapi rate limiting, CSP/HSTS/XSS/Referrer-Policy headers, request-id propagation, and per-request duration metrics",
      "Synthesis agent retries with exponential backoff via tenacity and validates output against a structured JSON schema, so a flaky model call does not become a malformed report",
      "Typed Pydantic schemas per domain — market data, news, sentiment, research, report — with a dedicated exception hierarchy per failure mode",
      "Multi-stage Docker build behind an Nginx reverse proxy, with CI plus end-to-end, integration, and production-readiness test suites",
    ],
    overview:
      "An agentic research assistant that turns a plain-language question about a company into a structured, auditable equity research report — market data, news, and sentiment collected in parallel and synthesised by an LLM with citations.",
    problem:
      "Equity research means gathering data from disjoint sources — price and fundamentals from one place, news from another, sentiment from manual reading — then assembling it by hand. The result is slow, inconsistent between analysts, and nearly impossible to audit after the fact.",
    solution:
      "EquiPilot AI runs the whole pipeline as a graph: entity resolution pins down the instrument, a router classifies intent, market, news, and sentiment agents collect in parallel, and a synthesis agent produces a schema-validated report. Every run is traceable through the same execution path, so two people asking the same question get comparable, reviewable output.",
    architecture:
      "Streamlit submits a research request to FastAPI and polls by request id. FastAPI validates, rate-limits, and hands off to a LangGraph workflow: entity resolution → router → parallel market, news, and sentiment tools → synthesis. Structured logging and metrics wrap the request; Docker and Nginx handle deployment, with health and readiness probes for the orchestrator.",
    pattern: "waves",
    url: `${GITHUB_USER_URL}/equipilot-ai`,
  },
  {
    title: "NyaySaathi",
    subtitle: "Multilingual Legal Guidance Platform",
    period: "Mar 2026 — Jul 2026",
    stack: [
      "Python",
      "Django REST Framework",
      "MongoDB",
      "sentence-transformers (MiniLM-L6-v2)",
      "FAISS",
      "NumPy",
      "React",
      "Vite",
    ],
    highlights: [
      "Built a multilingual legal guidance platform that turns a plain-language description of a problem into procedural next steps, required documents, escalation paths, and the authority to approach.",
      "Implemented semantic retrieval over a curated corpus of 200+ categorised legal workflows using MiniLM-L6-v2 embeddings in a 384-dimensional space, scored by cosine similarity through a FAISS inner-product index.",
      "Shipped it end to end — a layered Django REST backend on Render and a React/Vite front end on Vercel — with language detection, intent routing, and reranking between query and result.",
    ],
    features: [
      "Plain-language intake — describe the situation, receive procedure, documents, escalation path, and authority guidance",
      "Multilingual pipeline with language detection and normalisation ahead of retrieval",
      "Semantic search across a curated corpus of 200+ categorised legal workflows",
      "Reranking pass over retrieved candidates before results reach the user",
      "Five REST endpoints covering health, search, categories, case listing, and case detail",
      "React and Vite front end with search, categories, case detail, sign-in, and feedback capture",
      "Graceful degradation — the API falls back to the bundled dataset when MongoDB is unavailable",
    ],
    engineering: [
      "Layered Django backend — transport views, services, repositories, and a separate NLP engine — keeping retrieval logic out of the request layer",
      "FAISS IndexFlatIP over L2-normalised embeddings, so the inner product is exact cosine similarity rather than an approximation",
      "Pure-NumPy fallback path when FAISS is unavailable, so the API stays functional in constrained deployment environments",
      "Thread-locked lazy model loading: embeddings are built once and shared across requests instead of rebuilt per call",
      "Split deployment with Gunicorn and WhiteNoise on Render for the API and Vercel for the SPA, with CORS and CSRF origins driven by environment",
    ],
    overview:
      "A multilingual legal guidance platform that converts a described problem into actionable procedure — semantic retrieval over a curated corpus of categorised legal workflows, served through a layered Django REST API to a React front end.",
    problem:
      "People facing a legal problem rarely know its legal name — which is exactly what keyword search requires. They need the procedure, the documents, and the right authority, but the language they describe their situation in never matches the language the system is indexed by.",
    solution:
      "NyaySaathi embeds the user's own description and matches it against categorised legal workflows by meaning rather than wording. Language detection and normalisation run first so a non-English description works the same way, and a reranking pass orders candidates before the procedural guidance is returned.",
    architecture:
      "A React SPA on Vercel calls a Django REST API on Render. Requests pass through transport views into a service layer, which delegates to the NLP engine: query processing, MiniLM embedding, cosine search over a FAISS IndexFlatIP, and reranking. Case data lives in MongoDB, with the bundled dataset as fallback.",
    pattern: "diagonal",
    url: `${GITHUB_USER_URL}/Nyaysaathi`,
  },
];
