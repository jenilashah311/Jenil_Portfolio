import type { SkillNode } from "@/types";

export const skills: SkillNode[] = [
  // AI/ML
  { id: "python", label: "Python", category: "ai-ml", description: "Primary language for ML pipelines, modeling, and automation" },
  { id: "tensorflow", label: "TensorFlow", category: "ai-ml", description: "Deep learning model design and production inference" },
  { id: "pytorch", label: "PyTorch", category: "ai-ml", description: "Research, neural networks, and model deployment" },
  { id: "langchain", label: "LangChain", category: "ai-ml", description: "LLM orchestration, agent workflows, and RAG systems" },
  { id: "huggingface", label: "HuggingFace", category: "ai-ml", description: "Transformer architectures, model hub, and fine-tuning" },
  { id: "nlp", label: "NLP", category: "ai-ml", description: "Natural language processing and semantic text classification" },
  { id: "rag", label: "RAG", category: "ai-ml", description: "Retrieval-augmented generation pipelines" },
  { id: "scikit", label: "Scikit-learn", category: "ai-ml", description: "Classical machine learning algorithms and evaluation" },
  { id: "deeplearning", label: "Deep Learning", category: "ai-ml", description: "Neural networks, CNNs, RNNs, and complex model architectures" },
  { id: "openai", label: "OpenAI API", category: "ai-ml", description: "GPT models integration, embeddings, and fine-tuning" },
  { id: "prompt", label: "Prompt Engineering", category: "ai-ml", description: "Context optimization, chain-of-thought, and system instructions" },
  { id: "llama", label: "LLaMA", category: "ai-ml", description: "Open-source LLM hosting, quantization, and local fine-tuning" },
  { id: "keras", label: "Keras", category: "ai-ml", description: "High-level neural networks API built on top of TensorFlow" },

  // Backend
  { id: "fastapi", label: "FastAPI", category: "backend", description: "High-performance asynchronous RESTful APIs" },
  { id: "flask", label: "Flask", category: "backend", description: "Python micro-frameworks and web service design" },
  { id: "java", label: "Java", category: "backend", description: "Enterprise application systems and Spring Boot architecture" },
  { id: "go", label: "Go", category: "backend", description: "High-throughput services and concurrency patterns" },
  { id: "spring", label: "Spring Boot", category: "backend", description: "JVM-based microservices and web application frameworks" },
  { id: "bash", label: "Bash", category: "backend", description: "Shell scripting, systems automation, and Linux utilities" },

  // Frontend
  { id: "react", label: "React", category: "frontend", description: "Component-based user interfaces and single page applications" },
  { id: "typescript", label: "TypeScript", category: "frontend", description: "Type-safe JavaScript for application development" },
  { id: "javascript", label: "JavaScript", category: "frontend", description: "Browser environment scripting and Node.js backend development" },
  { id: "htmlcss", label: "HTML/CSS", category: "frontend", description: "Responsive layouts, semantic markup, and modern styling" },

  // Data
  { id: "sql", label: "SQL", category: "data", description: "Relational query formulation, modeling, and schema optimization" },
  { id: "pandas", label: "Pandas", category: "data", description: "Structured data manipulation, cleaning, and analysis" },
  { id: "numpy", label: "NumPy", category: "data", description: "Numerical computing and matrix operations" },
  { id: "spark", label: "Spark", category: "data", description: "Distributed data processing and large-scale analytical pipelines" },
  { id: "postgres", label: "PostgreSQL", category: "data", description: "Primary relational database and pgvector vector search" },
  { id: "mongodb", label: "MongoDB", category: "data", description: "Document-oriented NoSQL storage" },
  { id: "redis", label: "Redis", category: "data", description: "Distributed caching, rate limiting, and session management" },
  { id: "pinecone", label: "Pinecone", category: "data", description: "Vector database optimized for RAG embeddings retrieval" },
  { id: "elasticsearch", label: "Elasticsearch", category: "data", description: "Distributed full-text search and analytical indexing" },
  { id: "mysql", label: "MySQL", category: "data", description: "Relational database management system" },
  { id: "r", label: "R", category: "data", description: "Statistical computing and data visualization" },

  // Cloud
  { id: "aws", label: "AWS", category: "cloud", description: "Amazon Web Services cloud computing infrastructure" },
  { id: "gcp", label: "GCP", category: "cloud", description: "Google Cloud Platform deployment and serverless services" },
  { id: "azure", label: "Azure", category: "cloud", description: "Microsoft Azure cloud solutions" },
  { id: "docker", label: "Docker", category: "cloud", description: "Application containerization and isolation" },
  { id: "kubernetes", label: "Kubernetes", category: "cloud", description: "Container orchestration, scaling, and cluster management" },
  { id: "terraform", label: "Terraform", category: "cloud", description: "Infrastructure as Code (IaC) provisioning" },
  { id: "kafka", label: "Kafka", category: "cloud", description: "Distributed event streaming and message queuing" },
  { id: "airflow", label: "Airflow", category: "cloud", description: "Workflow orchestration and automated ETL scheduling" },
  { id: "githubactions", label: "GitHub Actions", category: "cloud", description: "Continuous integration and continuous deployment pipelines" },
  { id: "prometheus", label: "Prometheus", category: "cloud", description: "Time-series systems monitoring and alerting metrics" },
  { id: "grafana", label: "Grafana", category: "cloud", description: "Metrics visualization, alerting, and telemetry dashboards" },
  { id: "jira", label: "Jira", category: "cloud", description: "Agile project management, tracking, and collaboration" },
];

export const skillCategories = [
  { id: "ai-ml", label: "AI/ML", color: "#165c3b" },
  { id: "backend", label: "Backend", color: "#1f4f6c" },
  { id: "frontend", label: "Frontend", color: "#4b5563" },
  { id: "data", label: "Data", color: "#6b5a3e" },
  { id: "cloud", label: "Cloud", color: "#3c4f76" },
] as const;
