import type { ExperienceItem } from "@/types";

export const experience: ExperienceItem[] = [
  {
    role: "Machine Learning Engineer",
    company: "Drive Health",
    description: "AI-powered patient engagement platform serving 50,000+ patients",
    location: "Gilbert, AZ, USA",
    period: "May 2025 — May 2026",
    bullets: [
      "Diagnosed inconsistent patient education retrieval and engineered a RAG-based backend service with Pinecone, using structured indexing and retrieval orchestration across 10,000+ queries, improving content precision by 20%.",
      "Remediated slow clinical response generation and rebuilt an ML inference acceleration pipeline with TensorFlow, PyTorch, and event-driven batching, cutting latency from 2s to 200ms and reducing manual review effort by 45%.",
      "Eliminated blind spots in model quality and launched a real-time observability system with Prometheus and Grafana across 5 live ML services, surfacing user rating signals that raised response quality by 15%.",
      "Investigated access control gaps and designed a role-based access governance layer with RBAC policies for 3 user groups, hardening the AI platform and sustaining zero unauthorized access findings across 2 quarterly audits.",
    ],
  },
  {
    role: "Research Assistant",
    company: "California State University Los Angeles",
    location: "Los Angeles, CA, USA",
    description: "Academic Research in LLMs & Qualitative Theme Extraction",
    period: "Aug 2024 — Apr 2025",
    bullets: [
      "Co-developed ATA-LLM, a system that uses large language models with clustering and dimensionality reduction (UMAP, DenseMAP) to automatically identify themes in qualitative text data, improving consistency and resulting in a peer-reviewed Springer Nature publication at SEET 2025.",
    ],
  },
  {
    role: "Data Science Intern",
    company: "TechXi",
    location: "Vadodara, GJ, India",
    description: "Speech Recognition and NLP scale pipelines",
    period: "Jan 2023 — Jun 2024",
    bullets: [
      "Confronted noisy audio transcription failures and built a speech recognition pipeline with TensorFlow, Keras, and denoising algorithms over 10,000 audio files, achieving 85% transcription accuracy.",
      "Reduced scaling bottlenecks in language processing workflows and shipped an NLP model operations pipeline with Python and PySpark across 50 models, lowering transcription errors by 30% and increasing throughput by 40%.",
    ],
  },
  {
    role: "Machine Learning Engineer Intern",
    company: "WebCare Infoway",
    location: "Rajkot, GJ, India",
    description: "Clinical data modeling & validation frameworks",
    period: "May 2022 — Dec 2022",
    bullets: [
      "Stabilized weak clinical prediction performance and engineered a text classification system with Python and Scikit-learn for patient records, improving baseline prediction accuracy by 23%.",
      "Responded to overfitting across clinical datasets and strengthened a model validation framework using k-fold cross-validation and hyperparameter tuning on 6 datasets, reducing overfitting by 18% and reaching 91% accuracy.",
    ],
  },
];

export const education = [
  {
    school: "California State University, Los Angeles",
    degree: "Master of Science in Computer Science",
    gpa: "4.0/4.0",
    location: "Los Angeles, CA, USA",
    period: "Aug 2024 — May 2026",
  },
  {
    school: "Charusat University",
    degree: "Bachelor of Technology in Computer Science",
    gpa: "3.9/4.0",
    location: "Changa, GJ, India",
    period: "Jan 2020 — May 2024",
  },
];

export const research = {
  title: "AI-Powered Augmented Thematic Analysis System",
  publisher: "Springer Nature",
  date: "Aug 2025",
  description:
    "ATA-LLM automatically extracts qualitative themes from unstructured text using large language models, clustering, and dimensionality reduction, boosting analytical consistency by 30% across 5 datasets.",
};
