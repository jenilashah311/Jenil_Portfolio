"use client";

import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { experience, education } from "@/data/experience";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        data-lenis-prevent
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 print:p-0 overflow-y-auto bg-black/60 backdrop-blur-md print:bg-white print:backdrop-blur-none"
      >
        
        {/* Modal container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-white text-black rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:rounded-none print:w-full print:h-full print:overflow-visible border border-black/5"
        >
          {/* Top action bar - hidden during print */}
          <div className="flex items-center justify-between border-b border-black/10 px-6 py-4 bg-gray-50 print:hidden">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="font-mono text-xs text-gray-500 uppercase tracking-widest">
                System Dossier — Resume
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="p-1.5 text-gray-400 hover:text-black transition"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Resume Body Container */}
          <div className="flex-1 overflow-y-auto p-8 sm:p-12 md:p-16 print:overflow-visible print:p-0 font-serif leading-relaxed hide-scrollbar">
            
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-4xl font-normal uppercase tracking-wide font-sans text-black mb-2">
                {profile.name}
              </h1>
              <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-1 text-sm font-sans text-gray-600 print:text-black">
                <a href={`tel:${profile.phone}`} className="hover:underline">
                  {profile.phone}
                </a>
                <span>|</span>
                <a href={`mailto:${profile.email}`} className="hover:underline">
                  {profile.email}
                </a>
                <span>|</span>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  linkedin.com/in/jenilshah11
                </a>
                <span>|</span>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  github.com/jenilashah311
                </a>
              </div>
            </header>

            {/* Technical Skills */}
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-2 font-sans">
                Technical Skills
              </h2>
              <div className="text-sm space-y-1 text-gray-800 print:text-black">
                <p>
                  <strong className="font-sans font-semibold">Languages:</strong> Python, Java, SQL, JavaScript, TypeScript, Bash, R, HTML/CSS
                </p>
                <p>
                  <strong className="font-sans font-semibold">AI, ML & LLMs:</strong> NLP, Deep Learning, LangChain, OpenAI API, HuggingFace, RAG, Prompt Engineering, LLaMA
                </p>
                <p>
                  <strong className="font-sans font-semibold">Frameworks & Libraries:</strong> TensorFlow, PyTorch, Scikit-learn, FastAPI, Flask, Pandas, NumPy, React, Spring Boot
                </p>
                <p>
                  <strong className="font-sans font-semibold">Cloud & DevOps:</strong> AWS, GCP, Azure, Docker, Kubernetes, Spark, Airflow, Kafka, GitHub Actions, Terraform
                </p>
                <p>
                  <strong className="font-sans font-semibold">Databases & Tools:</strong> PostgreSQL, MongoDB, Pinecone, Redis, Elasticsearch, Prometheus, Grafana, MySQL, Jira
                </p>
              </div>
            </section>

            {/* Work Experience */}
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3 font-sans">
                Work Experience
              </h2>
              <div className="space-y-4">
                {experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <div>
                        <strong className="text-base text-black">{exp.role}</strong>
                        <span className="text-sm text-gray-500 font-sans ml-2">— {exp.company}</span>
                      </div>
                      <span className="text-sm font-sans text-gray-600 print:text-black whitespace-nowrap">
                        {exp.period}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 italic mb-1 font-sans">
                      {exp.location} {exp.description && `| ${exp.description}`}
                    </div>
                    <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 print:text-black space-y-1">
                      {exp.bullets.map((bullet, bIdx) => (
                        <li key={bIdx}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="mb-6">
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3 font-sans">
                Project Work
              </h2>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-base text-black">AI Contract Review System</strong>
                    <span className="text-xs text-gray-500 font-sans italic">Python, FastAPI, SentenceTransformers, PostgreSQL, pgvector, Docker</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 print:text-black">
                    <li>Strengthened slow legal review workflows by designing a semantic clause comparison system across 500 CUAD contracts using SentenceTransformers and pgvector, reducing manual review effort by 35%, improving issue triage consistency, and cutting average clause review time by 28%.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-base text-black">ML Model Monitoring Dashboard</strong>
                    <span className="text-xs text-gray-500 font-sans italic">Python, FastAPI, Evidently AI, PostgreSQL, Docker, Grafana</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 print:text-black">
                    <li>Navigated limited visibility into model drift by deploying a production ML monitoring system with Evidently AI across 3 live Scikit-learn models, reducing undetected drift incidents by 25%, surfacing stale feature distributions before impacting downstream decisions, and enabling automated alerts that reduced mean detection time by 31%.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-base text-black">Event Booking Platform</strong>
                    <span className="text-xs text-gray-500 font-sans italic">FastAPI, PostgreSQL, JWT, Redis, Docker</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 print:text-black">
                    <li>Engineered a RESTful booking backend with FastAPI and PostgreSQL to eliminate double-booking race conditions, using transactional concurrency control and Redis caching to handle 500+ simultaneous requests with zero conflicts, reducing average booking confirmation latency by 22% under sustained high-load production scenarios.</li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <strong className="text-base text-black">Payment Processing Service</strong>
                    <span className="text-xs text-gray-500 font-sans italic">Go, FastAPI, PostgreSQL, Redis, Docker</span>
                  </div>
                  <ul className="list-disc list-outside ml-4 text-[13px] text-gray-700 print:text-black">
                    <li>Built a high-throughput payment service in Go with Redis rate limiting and PostgreSQL idempotency keys to prevent duplicate transactions, handling 1,000+ transactions per second with zero payment errors, achieving 99.98% uptime and reducing failed transaction retries by 41% under sustained peak load conditions.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="mb-4">
              <h2 className="text-lg font-bold uppercase tracking-wider border-b border-black pb-1 mb-3 font-sans">
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu, idx) => (
                  <div key={idx} className="flex justify-between items-baseline">
                    <div>
                      <strong className="text-base text-black">{edu.school}</strong>
                      <div className="text-xs text-gray-500 font-sans">
                        {edu.degree}, GPA: {edu.gpa}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-sans text-gray-600 print:text-black block">{edu.period}</span>
                      <span className="text-xs text-gray-400 font-sans block">{edu.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
