import type { ProjectSlug } from "@/data/projects";

interface Now {
  building: ProjectSlug;
  exploring: readonly string[];
  updated: string;
}

export const now: Now = {
  building: "umbra",
  exploring: [
    "OpenTelemetry",
    "Retrieval-augmented generation",
    "React Three Fiber",
    "Real-time systems",
  ],
  updated: "September 2026",
};
