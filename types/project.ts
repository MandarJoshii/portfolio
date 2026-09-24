import type { SkillId } from "@/data/skills";

export type ProjectStatus = "shipped" | "in-progress";

export interface ProjectLinks {
  github?: string;
  demo?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  problem: string;
  role: string;
  stack: readonly SkillId[];
  highlights: readonly string[];
  links: ProjectLinks;
  year: number;
  status: ProjectStatus;
  featured: boolean;
}
