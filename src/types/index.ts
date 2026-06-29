export type PanelId =
  | "ai-ml"
  | "software"
  | "fullstack"
  | "data-science"
  | "projects"
  | "resume"
  | "contact";

export interface Profile {
  name: string;
  title: string;
  titles: string[];
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  portfolio: string;
  location: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  description: string;
  location: string;
  period: string;
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  techStack: string[];
  problem: string;
  architecture?: string;
  github?: string;
  demo?: string;
  metrics?: string[];
}

export interface SkillNode {
  id: string;
  label: string;
  category: "ai-ml" | "backend" | "frontend" | "data" | "cloud";
  description?: string;
}

export interface DeveloperStats {
  modelsTrained: number;
  apisBuilt: number;
  systemsDeployed: number;
  repositories: number;
  technologiesMastered: number;
}

export interface TerminalCommand {
  cmd: string;
  output: string;
}
