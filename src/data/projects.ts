import type { Project } from "@/types";

const GITHUB_USER_URL = "https://github.com/Aryan41211";
const EQUIPILOT_REPO = `${GITHUB_USER_URL}/Equipilot-AI`;

export const PROJECTS: ReadonlyArray<Project> = [
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
    ],
    highlights: [
      "Built an agentic equity research system using LangGraph orchestration with specialized agents for routing, market data collection, news retrieval, sentiment analysis, and LLM-powered synthesis.",
      "Designed a production-grade FastAPI backend with rate limiting (slowapi), security headers (CSP/HSTS/XSS), structured JSON logging (structlog), metrics collection, and health/readiness probes.",
      "Developed a Streamlit frontend with real-time workflow progress polling, interactive query submission, and structured report visualization with execution traces.",
    ],
    features: [
      "Multi-source data aggregation combining yfinance market data, financial news, and LLM-powered sentiment analysis",
      "Agentic research workflow with LangGraph: specialized agents for routing, data collection, analysis, and synthesis",
      "Real-time market data fetching including prices, volumes, fundamentals, and technical indicators",
      "News & sentiment analysis with LLM-powered scoring and key theme extraction",
      "LLM-powered synthesis using OpenAI GPT-4o for coherent, structured research reports with source citations",
      "Interactive Streamlit UI with natural language query input, progress tracking, and report visualization",
      "RESTful API with comprehensive endpoints for programmatic access and integration",
      "Production-ready middleware: health checks, rate limiting, security headers, structured logging",
    ],
    engineering: [
      "LangGraph state machine with dynamic intent-based tool routing (fundamentals/news/sentiment/full_research) and async parallel tool execution",
      "FastAPI with async lifespan management, request ID middleware, structured logging, and Pydantic-settings with environment validation and CORS parsing",
      "Production middleware stack: rate limiting (slowapi, 100 req/min), security headers (CSP/HSTS/XSS/Referrer-Policy), and metrics collection with request duration tracking",
      "Synthesis agent with exponential backoff retry (tenacity, 3 attempts, 2-10s window) for LLM API resilience with structured JSON schema validation",
      "Multi-stage Docker build with Nginx reverse proxy, health/readiness probes, and Railway deployment configuration",
      "Comprehensive test suite with production readiness, integration, and end-to-end tests",
    ],
    overview:
      "Built an agentic equity research system orchestrating market data retrieval, news summarization, and LLM-powered synthesis through a LangGraph state machine, exposed via a production-grade FastAPI backend with a Streamlit frontend.",
    problem:
      "Equity research workflows are time-consuming, manual, and difficult to reproduce. Analysts must gather data from multiple disjoint sources (market data APIs, news feeds, sentiment analysis tools) and synthesize it into structured reports — a process that is error-prone, inconsistent, and hard to audit.",
    solution:
      "EquiPilot AI automates the entire research pipeline using a LangGraph-powered multi-agent system: a router agent classifies query intent, market data/news/sentiment agents collect data in parallel, and a synthesis agent generates structured research reports with executive summaries, risk analysis, and cited sources — all exposed through a production-ready API and interactive dashboard.",
    architecture:
      "LangGraph state machine routes queries through specialized agents. The FastAPI layer handles validation, rate limiting, security, and request tracking. Streamlit polls for status and renders reports. Docker/Nginx provide production deployment with health checks.",
    pattern: "grid",
    url: EQUIPILOT_REPO,
  },
  {
    title: "NyaySaathi",
    subtitle: "NLP Legal Intelligence Platform",
    period: "Jan 2026 — Mar 2026",
    stack: ["Python", "Django REST Framework", "FAISS", "sentence-transformers (MiniLM)", "NumPy"],
    highlights: [
      "Built a semantic legal search engine over a 12K+ document corpus using MiniLM sentence embeddings and FAISS vector indexing, replacing a slower linear TF-IDF baseline.",
      "Designed and exposed 4 REST API endpoints via Django REST Framework for query intake, embedding generation, and ranked result retrieval.",
      "Optimized FAISS index construction (IVF + flat quantizer) for similarity search over a 768-dimensional embedding space with memory-efficient serialization.",
    ],
    features: [
      "Semantic legal search over a 12K+ document corpus using MiniLM sentence embeddings",
      "Replaced a slower TF-IDF baseline using semantic retrieval",
      "Exposed 4 REST API endpoints via Django REST Framework for query intake, embedding generation, and ranked result retrieval",
    ],
    engineering: [
      "Optimized FAISS index construction using IVF + Flat Quantizer for efficient approximate nearest neighbor search",
      "Supported similarity search over a 768-dimensional embedding space",
      "Implemented memory-efficient FAISS index serialization",
    ],
    overview:
      "Built a semantic legal search engine over a 12K+ document corpus, replacing a slower TF-IDF baseline using semantic retrieval with MiniLM sentence embeddings and FAISS vector indexing.",
    pattern: "grid",
    url: "https://github.com/Aryan41211/Nyaysaathi",
  },
  {
    title: "Retrieval Intelligence Platform",
    subtitle: "Production-Grade RAG Platform",
    period: "Jun 2026 — Jul 2026",
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "sentence-transformers",
      "FAISS",
      "ChromaDB",
      "OpenAI",
      "Anthropic",
      "SQLAlchemy",
      "Docker",
    ],
    highlights: [
      "Built a production-grade Retrieval-Augmented Generation platform with modular architecture spanning ingestion, chunking, embedding, retrieval, generation, evaluation, and experiment tracking across 10 planned phases.",
      "Implemented enterprise features including JWT authentication with Google OAuth, role-based access control (admin/member/viewer), multi-user workspaces, persistent chat with JSON/Markdown/PDF export, and append-only audit logging.",
      "Developed an automated evaluation pipeline using RAGAS and DeepEval with MLflow and Weights & Biases experiment tracking for reproducible benchmarking across retrieval precision and generation quality metrics.",
    ],
    features: [
      "Document ingestion engine supporting PDF, DOCX, TXT, and Markdown with SHA256 checksum deduplication and TextCleaner normalization",
      "Multiple chunking strategies for optimized document segmentation",
      "Embedding integration via sentence-transformers with FAISS (dense) and BM25 (sparse) hybrid retrieval with re-ranking",
      "Grounded generation with citation support via OpenAI and Anthropic LLM providers",
      "Automated evaluation using RAGAS (faithfulness, answer relevancy) and DeepEval with comprehensive metric dashboards",
      "Experiment tracking with MLflow and Weights & Biases for reproducible benchmarking",
      "Enterprise features: JWT auth with Google OAuth, RBAC, multi-user workspaces, persistent chat with export, and admin analytics",
    ],
    engineering: [
      "Modular architecture with clean separation across 10 data pipeline stages: loaders, preprocessing, chunking, embeddings, retrieval, generation, evaluation, experiments, production engineering, and enterprise",
      "FastAPI backend with SQLAlchemy async ORM, Alembic migrations, Redis caching, and OpenTelemetry observability with Prometheus metrics",
      "Enterprise layer with JWT access/refresh tokens (HS256), bcrypt password hashing, RBAC permission matrix with FastAPI dependency guards, and append-only audit logging",
      "Evaluation framework combining RAGAS and DeepEval metrics with MLflow experiment tracking for automated regression detection",
      "Multi-format document ingestion via LoaderFactory pattern with format-specific loaders, TextCleaner normalization, and SHA256 content integrity verification",
      "Docker containerization with PostgreSQL backend and comprehensive test suite (unit, integration, async) with ruff/black/mypy enforcement",
    ],
    overview:
      "Built a production-grade Retrieval-Augmented Generation platform with modular architecture spanning document ingestion, chunking, embedding, retrieval, generation, evaluation, and experiment tracking, featuring enterprise authentication, role-based access control, and automated evaluation pipelines.",
    problem:
      "Building production RAG systems requires coordinating multiple complex pipeline stages — ingestion, chunking, embedding, retrieval, generation, evaluation, and experimentation — each with its own set of tools, configurations, and quality metrics, making it difficult to iterate rapidly while maintaining reproducibility and production quality.",
    solution:
      "Retrieval Intelligence Platform provides a modular, end-to-end architecture that separates each pipeline stage into well-defined, configurable modules with standardized interfaces, enabling teams to swap implementations, run automated evaluations, track experiments via MLflow/WandB, and deploy with enterprise-grade authentication and access control — all through a unified FastAPI backend.",
    architecture:
      "FastAPI backend with a 10-stage modular data pipeline: ingestion (LoaderFactory) → preprocessing → chunking → embedding → vector store (FAISS/ChromaDB) → retrieval (dense + sparse hybrid) → generation (OpenAI/Anthropic) → evaluation (RAGAS/DeepEval) → experiment tracking (MLflow/WandB). Enterprise layer adds JWT auth, RBAC, workspaces, persistent chat, and audit logging. Docker + PostgreSQL + Redis + Prometheus for production.",
    pattern: "rings",
    url: "https://github.com/Aryan41211/Retrieval-Intelligence-Platform",
  },
  {
    title: "Library Management System",
    subtitle: "Flask + CLI Library Manager",
    period: "Feb 2025 — Mar 2025",
    stack: ["Python", "Flask", "JSON", "OOP", "Role-Based Access Control"],
    highlights: [
      "Full-stack Library Management System with CLI and REST interfaces; seeded 1,000+ book records with borrow/return tracking, overdue management, and advanced multi-field search.",
      "Structured modular OOP layers (auth, catalog, transactions) with PIN-based session security and robust error handling — designed for future PostgreSQL / SQLite migration.",
    ],
    features: [
      "Full-stack Library Management System with both CLI and REST interfaces",
      "Seeded 1,000+ book records with borrow/return tracking and overdue management",
      "Advanced multi-field search across the book catalog",
    ],
    engineering: [
      "Modular OOP architecture with separate layers for auth, catalog, and transactions",
      "PIN-based session security with comprehensive error handling",
      "Designed for future PostgreSQL / SQLite migration",
    ],
    overview:
      "Developed a full-stack Library Management System with CLI and REST interfaces, featuring borrow/return tracking, overdue management, advanced multi-field search, and modular OOP architecture designed for future database migration.",
    pattern: "waves",
    url: "https://github.com/Aryan41211/library-management-system",
  },
  {
    title: "Supervised ML Model Benchmarking",
    subtitle: "Classification model comparison suite",
    period: "Jan 2025 — Mar 2025",
    stack: ["Python", "scikit-learn", "NumPy", "Pandas", "Matplotlib"],
    highlights: [
      "Benchmarked five supervised ML models on real-world datasets; evaluated with confusion matrix, precision-recall, F1, and CV.",
      "Achieved reproducible evaluation workflows with documented results on GitHub.",
    ],
    features: [
      "Benchmarked five supervised ML models on real-world datasets",
      "Compared Precision, Recall, F1 Score, Confusion Matrix, and Cross Validation",
      "Achieved reproducible evaluation workflows",
    ],
    engineering: [
      "Consistent evaluation methodology across all models for fair comparison",
      "Documented reproducible workflows on GitHub",
    ],
    overview:
      "Benchmarked five supervised ML models on real-world datasets, comparing Precision, Recall, F1 Score, Confusion Matrix, and Cross Validation with reproducible evaluation workflows.",
    pattern: "dots",
    url: GITHUB_USER_URL,
  },
];
