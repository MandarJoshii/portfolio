import type { Project } from "@/types/project";

export const projects = [
  {
    slug: "procureflow",
    title: "ProcureFlow",
    tagline: "Multi-tenant procurement and payments SaaS",
    summary:
      "A procurement platform where organizations raise purchase orders, route them through configurable approvals, and pay invoices through Razorpay, with every company's data strictly isolated.",
    problem:
      "Procurement touches money and permissions at once. The wrong person approving an order, one company seeing another's data, or a payment marked complete without proof are all expensive mistakes.",
    role: "Solo: designed, built, and deployed end to end",
    stack: [
      "react",
      "typescript",
      "nodejs",
      "express",
      "postgresql",
      "prisma",
      "jwt-auth",
      "rbac",
      "multi-tenancy",
      "razorpay",
      "webhooks",
      "state-machines",
      "vitest",
      "vercel",
      "render",
      "neon",
    ],
    highlights: [
      "Tenant isolation enforced at the query layer: every request is scoped to the signed-in organization, never to an ID sent by the client.",
      "One configurable approval engine, with separate template and instance state machines, shared by purchase orders and invoices.",
      "Razorpay payments confirmed only by HMAC-SHA256 webhook signature verification, never by client-side state.",
      "JWT authentication, bcrypt hashing, RBAC middleware, and rate-limited auth endpoints, with Vitest tests covering webhook verification and approval authorization.",
      "Deployed across Vercel, Render, and Neon Postgres, with environment-based config and CORS locked to the live frontend.",
    ],
    links: {
      github: "https://github.com/MandarJoshii/procureflow",
      demo: "https://procureflow-frontend-nu.vercel.app/login",
    },
    year: 2026,
    status: "shipped",
    featured: true,
  },
  {
    slug: "shiftswap",
    title: "ShiftSwap",
    tagline: "Shift scheduling and swap platform",
    summary:
      "A workforce scheduling app where employees trade shifts and managers approve swaps, without anyone ending up double-booked.",
    problem:
      "Shift swaps look simple until two people claim the same shift or someone gets booked twice. The rules have to hold on the server, not just in the interface.",
    role: "Solo: designed, built, and deployed end to end",
    stack: [
      "react",
      "typescript",
      "nodejs",
      "express",
      "mysql",
      "prisma",
      "jwt-auth",
      "rbac",
      "state-machines",
      "jest",
      "supertest",
      "github-actions",
      "render",
    ],
    highlights: [
      "Role-based access control enforced at the API layer on every route, not just hidden in the UI.",
      "A swap-approval state machine with automatic conflict detection, using an interval-overlap check to prevent double-booking.",
      "Approval runs in a single database transaction that reassigns the shift and auto-rejects competing claims, so data is never left half-updated.",
      "20 automated tests (Jest and Supertest) covering auth, RBAC, and conflict-detection edge cases, run by GitHub Actions on every push.",
    ],
    links: {
      github: "https://github.com/MandarJoshii/shiftswap",
      demo: "https://mandarjoshii.github.io/shiftswap/login",
    },
    year: 2026,
    status: "shipped",
    featured: true,
  },
  {
    slug: "jobtrack",
    title: "JobTrack",
    tagline: "Job application tracker",
    summary:
      "A tracker for managing job applications through the hiring pipeline, with search, filtering, analytics, and a Kanban-style board.",
    problem:
      "Applications spread across many companies and stages quickly outgrow a spreadsheet. Each user needs a private, searchable pipeline.",
    role: "Solo: designed, built, and deployed end to end",
    stack: ["react", "java", "spring-boot", "postgresql", "jwt-auth", "rest-api"],
    highlights: [
      "Authenticated CRUD workflows with search, filtering, analytics, and a Kanban-style pipeline across the hiring lifecycle.",
      "JWT-secured REST communication between a React frontend and a Spring Boot backend, with PostgreSQL data scoped to each user.",
    ],
    links: {
      github: "https://github.com/MandarJoshii/JobTrack",
      demo: "https://mandarjoshii.github.io/JobTrack/",
    },
    year: 2026,
    status: "shipped",
    featured: true,
  },
  {
    slug: "umbra",
    title: "Umbra",
    tagline: "AI-native observability platform",
    summary:
      "An observability and incident-intelligence platform with a live 3D view of how services connect and where they fail.",
    problem:
      "When something breaks across many services, engineers need to see where it started and what changed, fast.",
    role: "Solo: designing and building",
    stack: ["nextjs", "typescript", "tailwind", "nodejs", "python", "postgresql"],
    highlights: [
      "A monorepo with a Next.js frontend, a Node.js API, and a Python AI service.",
      "A live 3D service-topology view of how requests move between services.",
    ],
    links: {
      github: "https://github.com/MandarJoshii/umbra",
    },
    year: 2026,
    status: "in-progress",
    featured: false,
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]["slug"];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
