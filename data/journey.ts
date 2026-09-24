import type { JourneyEntry } from "@/types/journey";

export const journey = [
  {
    id: "bca",
    period: "2021 – 2024",
    title: "BCA, Cyber Security",
    org: "Parul University, Vadodara",
    kind: "education",
    summary: "Where I learned to ask how a system could be misused before asking whether it works.",
  },
  {
    id: "calcs",
    period: "Jan – Jun 2023",
    title: "Android Applications Developer Intern",
    org: "Calcs, Mumbai",
    kind: "work",
    summary:
      "Built an Android app with real-time face detection, connecting the camera pipeline to Python-based ML inference.",
  },
  {
    id: "rk-digital",
    period: "Jun – Aug 2024",
    title: "Full-Stack Developer Intern",
    org: "R.K Digital Solutions, Vadodara",
    kind: "work",
    summary:
      "Built responsive Next.js modules with reusable components, and integrated Supabase authentication and data into application workflows.",
  },
  {
    id: "mca",
    period: "2024 – 2026",
    title: "MCA, Data Science",
    org: "MIT-ADT University, Pune",
    kind: "education",
    summary: "Master of Computer Applications with a Data Science specialization. CGPA 8.0.",
  },
  {
    id: "shipped-2026",
    period: "2026",
    title: "Shipped three full-stack applications",
    kind: "project",
    summary: "ProcureFlow, ShiftSwap, and JobTrack, each deployed to production.",
  },
  {
    id: "umbra",
    period: "Now",
    title: "Building Umbra",
    kind: "project",
    summary: "An AI-native observability platform, built to go deeper into real-time systems.",
  },
] as const satisfies readonly JourneyEntry[];
