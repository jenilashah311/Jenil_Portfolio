import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "visual-ai-automation",
    title: "Visual AI Automation Platform",
    techStack: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "WebSocket",
      "Redis",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker"
    ],
    problem:
      "A complete visual workflow builder for AI agents and LLM pipelines, featuring drag-and-drop nodes, websocket execution streaming, and full-stack architecture.",
    architecture: "React Canvas → WebSocket Gateway → FastAPI Pipelines → Redis Queue → PostgreSQL State",
    github: "https://github.com/jenilashah311/Visual-AI-Automation-Platform",
    metrics: [
      "Drag-and-drop canvas interface",
      "Real-time websocket streaming",
      "Multi-model execution support",
      "Containerized deployment"
    ],
  },
  {
    id: "distributed-job-queue",
    title: "Distributed Job Queue & Task Scheduler",
    techStack: [
      "Go",
      "FastAPI",
      "Python",
      "Redis",
      "PostgreSQL",
      "Docker",
      "Locust",
      "Nginx"
    ],
    problem:
      "A production-grade, high-concurrency task execution engine featuring atomic Redis queues, idempotency checks, worker crash recovery ('The Reaper'), and locust load testing at scale.",
    architecture: "FastAPI (Gateway) → Redis (BRPopLPush) → Go Workers (Pool) → Postgres / Locust Tests",
    github: "https://github.com/jenilashah311/Distributed-Job-Queue-Task-Scheduler",
    metrics: [
      "50+ concurrent worker containers",
      "64MB strict memory limit per worker",
      "Reaper crash recovery background engine",
      "Exactly-once processing via idempotency keys"
    ],
  },
  {
    id: "autonomous-prediction-platform",
    title: "Autonomous ML Prediction Platform",
    techStack: [
      "Python",
      "FastAPI",
      "Kafka",
      "Redis",
      "PostgreSQL",
      "Scikit-Learn",
      "MLflow",
      "Evidently AI",
      "Prometheus",
      "Grafana",
      "Docker",
      "Helm",
      "Airflow",
      "PySpark"
    ],
    problem:
      "A live streaming ML feature store and prediction service processing synthetic transaction events from Kafka, storing online Redis/offline Postgres features, evaluating data drift via Evidently AI, and monitoring via Prometheus/Grafana.",
    architecture: "Kafka Events → Python stream processor → Redis/Postgres → FastAPI Inference → Prometheus & Grafana",
    github: "https://github.com/jenilashah311/Autonomous-Intelligence-Prediction-Platform",
    metrics: [
      "Real-time feature store updates",
      "Evidently AI drift detection on batch data",
      "MLflow tracking for model training",
      "Kubernetes Helm packaging"
    ],
  },
  {
    id: "querypilot-ai-platform",
    title: "QueryPilot AI Platform",
    techStack: [
      "React",
      "TypeScript",
      "FastAPI",
      "Python",
      "PostgreSQL",
      "pgvector",
      "Redis",
      "Stripe",
      "Playwright",
      "Docker",
      "GitHub Actions"
    ],
    problem:
      "A multi-tenant B2B SaaS platform allowing non-technical users to query database schemas in plain English using text-to-SQL LLM engines with secure schema isolation, Stripe billing, and RBAC controls.",
    architecture: "React Frontend → FastAPI Tenant Gateway → PostgreSQL pgvector → OpenAI Text-to-SQL → Stripe Checkout",
    github: "https://github.com/jenilashah311/QueryPilot-AI-Platform",
    metrics: [
      "Multi-tenant schema isolation",
      "pgvector semantic query cache",
      "Stripe checkout webhook integration",
      "RBAC role permissions (Admin/Analyst)"
    ],
  },
  {
    id: "multi-agent-platform",
    title: "Multi-Agent Platform",
    techStack: [
      "Python",
      "LangChain",
      "FastAPI",
      "Redis",
      "WebSockets",
      "Docker",
      "React"
    ],
    problem:
      "A scalable orchestrator for multi-agent LLM systems, allowing asynchronous cooperation on complicated tasks. Features persistent conversation memory, semantic routing, and live execution progress charts.",
    architecture: "User Prompt → Master Coordinator → Agent Swarm (FastAPI/LangChain) → Redis PubSub → WebSockets UI",
    github: "https://github.com/jenilashah311/Multi-Agent-Platform",
    metrics: [
      "Asynchronous multi-agent coordination",
      "Semantic router for task delegation",
      "Integrated short & long term memory",
      "Dynamic execution trace graph"
    ],
  },
  {
    id: "ai-contract-review",
    title: "AI Contract Review System",
    techStack: [
      "Python",
      "FastAPI",
      "SentenceTransformers",
      "PostgreSQL",
      "pgvector",
      "Docker"
    ],
    problem:
      "Built a semantic clause comparison system using SentenceTransformers and pgvector on 500+ real legal contracts, reducing manual compliance review effort by 35%.",
    architecture: "FastAPI → SentenceTransformers Embeddings → pgvector → Semantic Similarity Search",
    github: "https://github.com/jenilashah311/AI-Contract-Review-Compliance-System",
    metrics: [
      "Processed 500+ legal contracts",
      "35% compliance review time reduction",
      "High-performance semantic search cache"
    ],
  },
  {
    id: "ml-model-monitoring",
    title: "ML Model Monitoring Dashboard",
    techStack: [
      "Python",
      "FastAPI",
      "Evidently AI",
      "PostgreSQL",
      "Docker",
      "Grafana",
      "Prometheus"
    ],
    problem:
      "Built a production ML telemetry dashboard using Evidently AI to monitor data drift and performance degradation on live Scikit-Learn pipelines, reducing undetected drift incidents by 25%.",
    architecture: "ML Inference → Evidently AI telemetry → Prometheus collector → Grafana Dashboard",
    github: "https://github.com/jenilashah311/ML-model-monitoring-dashboard",
    metrics: [
      "Real-time data drift telemetry",
      "Scikit-Learn pipeline monitoring",
      "Automated alerting webhooks"
    ],
  },
  {
    id: "event-booking-platform",
    title: "Event Booking Platform",
    techStack: [
      "FastAPI",
      "PostgreSQL",
      "JWT",
      "Redis",
      "Docker"
    ],
    problem:
      "Designed a RESTful booking backend using FastAPI and PostgreSQL with transactional concurrency control and Redis caching, preventing double bookings under 500+ simultaneous requests.",
    architecture: "API Gateway → Redis concurrency locks → PostgreSQL (ACID isolation)",
    github: "https://github.com/jenilashah311/Event-Booking-Platform",
    metrics: [
      "500+ concurrent connections tested",
      "Zero double-bookings recorded",
      "Optimized Redis cache layer"
    ],
  }
];
