import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

const SITE_URL = "https://jenil113-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Jenil Shah | AI/ML Engineer & Systems Architect",
  description:
    "Portfolio of Jenil Shah — AI/ML Engineer & Full Stack Developer. RAG pipelines, multi-agent LLM systems, real-time streaming ML platforms, and high-concurrency cloud architectures.",
  keywords: [
    "Jenil Shah",
    "AI Engineer",
    "Machine Learning Engineer",
    "Full Stack Developer",
    "RAG",
    "LLM",
    "MLOps",
  ],
  authors: [{ name: "Jenil Shah" }],
  openGraph: {
    title: "Jenil Shah | AI/ML Engineer & Systems Architect",
    description:
      "RAG pipelines, multi-agent LLM systems, and real-time streaming ML platforms. Explore the interactive systems dossier.",
    url: SITE_URL,
    siteName: "Jenil Shah — Systems Architect",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jenil Shah | AI/ML Engineer & Systems Architect",
    description:
      "RAG pipelines, multi-agent LLM systems, and real-time streaming ML platforms.",
  },
};

export const viewport: Viewport = {
  themeColor: "#d0e6dd",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} font-sans antialiased bg-[#d0e6dd] text-[#111115] selection:bg-black/10 selection:text-black overflow-x-hidden`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
