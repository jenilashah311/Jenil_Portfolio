import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Jenil Shah | AI/ML Engineer & Systems Architect",
  description:
    "Portfolio of Jenil Shah — AI/ML Engineer & Full Stack Developer. Specialized in RAG pipelines, distributed task execution, and real-time streaming ML platforms.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} font-sans antialiased bg-[#030307] text-[#f3f4f6] selection:bg-[#00f5d4]/30 selection:text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
