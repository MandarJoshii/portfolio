export type SkillCategory =
  "language" | "frontend" | "backend" | "data" | "testing" | "platform" | "practice";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
}
