import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { getProject, projects } from "@/data/projects";
import { getSkill, skillCategoryLabels } from "@/data/skills";
import type { Skill, SkillCategory } from "@/types/skill";

// Only the projects in projects.ts get pages; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    return {};
  }
  return {
    title: `${project.title} · Mandar Joshi`,
    description: project.summary,
  };
}

const statusLabels = {
  shipped: "Shipped",
  "in-progress": "In progress",
} as const;

function CaseSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="border-rule grid gap-4 border-t py-12 md:grid-cols-[minmax(0,1fr)_minmax(0,2.2fr)] md:gap-12">
      <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  // Group the project's stack by category, in the same order as skills.ts.
  const byCategory = new Map<SkillCategory, Skill[]>();
  for (const id of project.stack) {
    const skill = getSkill(id);
    const group = byCategory.get(skill.category) ?? [];
    group.push(skill);
    byCategory.set(skill.category, group);
  }
  const stackGroups = (Object.keys(skillCategoryLabels) as SkillCategory[]).flatMap((category) => {
    const items = byCategory.get(category);
    return items ? [{ category, items }] : [];
  });

  return (
    <main id="main">
      <article>
        <header className="border-rule border-b">
          <Container className="py-14 sm:py-20">
            <Link
              href="/#work"
              className="text-muted hover:text-ink inline-flex min-h-11 items-center text-sm"
            >
              ← All work
            </Link>
            <h1 className="font-display mt-6 text-5xl font-bold tracking-tight sm:text-7xl">
              {project.title}
            </h1>
            <p className="text-muted mt-4 max-w-[44ch] text-xl">{project.tagline}</p>

            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              <div>
                <dt className="text-muted font-mono text-xs">Role</dt>
                <dd className="mt-1">{project.role}</dd>
              </div>
              <div>
                <dt className="text-muted font-mono text-xs">Year</dt>
                <dd className="mt-1">{project.year}</dd>
              </div>
              <div>
                <dt className="text-muted font-mono text-xs">Status</dt>
                <dd className="mt-1 inline-flex items-center gap-2">
                  {project.status === "in-progress" && (
                    <span aria-hidden="true" className="bg-signal size-2 rounded-full" />
                  )}
                  {statusLabels[project.status]}
                </dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              {project.links.demo && <ButtonLink href={project.links.demo}>Live demo</ButtonLink>}
              {project.links.github && (
                <ButtonLink
                  href={project.links.github}
                  variant={project.links.demo ? "secondary" : "primary"}
                >
                  Source code
                </ButtonLink>
              )}
            </div>
          </Container>
        </header>

        <Container className="py-6 sm:py-10">
          <CaseSection title="The problem">
            <p className="max-w-[60ch] text-lg leading-relaxed">{project.problem}</p>
          </CaseSection>

          <CaseSection title="What I built">
            <p className="max-w-[60ch] text-lg leading-relaxed">{project.summary}</p>
            <ul className="mt-8 flex flex-col gap-5">
              {project.highlights.map((highlight) => (
                <li key={highlight} className="flex max-w-[64ch] gap-4 leading-relaxed">
                  <span aria-hidden="true" className="bg-signal mt-2.5 size-1.5 shrink-0" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </CaseSection>

          <CaseSection title="Stack">
            <div className="flex flex-col gap-6">
              {stackGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-muted font-mono text-xs">
                    {skillCategoryLabels[group.category]}
                  </h3>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <li
                        key={skill.id}
                        className="rounded-instrument border-rule border px-2.5 py-1 font-mono text-xs"
                      >
                        {skill.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </CaseSection>
        </Container>
      </article>
    </main>
  );
}
