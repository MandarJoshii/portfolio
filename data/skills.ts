import type { Skill, SkillCategory } from "@/types/skill";

export const skills = [
  // Languages
  { id: "typescript", name: "TypeScript", category: "language" },
  { id: "javascript", name: "JavaScript", category: "language" },
  { id: "java", name: "Java", category: "language" },
  { id: "python", name: "Python", category: "language" },
  { id: "sql", name: "SQL", category: "language" },
  { id: "html", name: "HTML", category: "language" },
  { id: "css", name: "CSS", category: "language" },

  // Frontend
  { id: "react", name: "React", category: "frontend" },
  { id: "nextjs", name: "Next.js", category: "frontend" },
  { id: "tailwind", name: "Tailwind CSS", category: "frontend" },
  { id: "react-router", name: "React Router", category: "frontend" },
  { id: "tanstack-query", name: "TanStack Query", category: "frontend" },
  { id: "react-hook-form", name: "React Hook Form", category: "frontend" },

  // Backend
  { id: "nodejs", name: "Node.js", category: "backend" },
  { id: "express", name: "Express", category: "backend" },
  { id: "spring-boot", name: "Spring Boot", category: "backend" },
  { id: "zod", name: "Zod", category: "backend" },
  { id: "razorpay", name: "Razorpay", category: "backend" },

  // Databases and ORMs
  { id: "postgresql", name: "PostgreSQL", category: "data" },
  { id: "mysql", name: "MySQL", category: "data" },
  { id: "mongodb", name: "MongoDB", category: "data" },
  { id: "prisma", name: "Prisma", category: "data" },
  { id: "supabase", name: "Supabase", category: "data" },

  // Testing
  { id: "vitest", name: "Vitest", category: "testing" },
  { id: "jest", name: "Jest", category: "testing" },
  { id: "supertest", name: "Supertest", category: "testing" },

  // Platform and delivery
  { id: "git", name: "Git", category: "platform" },
  { id: "github-actions", name: "GitHub Actions", category: "platform" },
  { id: "vercel", name: "Vercel", category: "platform" },
  { id: "render", name: "Render", category: "platform" },
  { id: "neon", name: "Neon", category: "platform" },

  // Engineering practices
  { id: "rest-api", name: "REST API design", category: "practice" },
  { id: "jwt-auth", name: "JWT authentication", category: "practice" },
  { id: "rbac", name: "Role-based access control", category: "practice" },
  { id: "multi-tenancy", name: "Multi-tenant architecture", category: "practice" },
  { id: "webhooks", name: "Webhook integration", category: "practice" },
  { id: "state-machines", name: "State-machine workflows", category: "practice" },
] as const satisfies readonly Skill[];

export type SkillId = (typeof skills)[number]["id"];

export const skillCategoryLabels: Record<SkillCategory, string> = {
  language: "Languages",
  frontend: "Frontend",
  backend: "Backend",
  data: "Databases and ORMs",
  testing: "Testing",
  platform: "Platform and delivery",
  practice: "Engineering practices",
};

const skillsById = new Map<string, Skill>(skills.map((skill) => [skill.id, skill]));

export function getSkill(id: SkillId): Skill {
  const skill = skillsById.get(id);
  if (!skill) {
    throw new Error(`Unknown skill id: ${id}`);
  }
  return skill;
}
