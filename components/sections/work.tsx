import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { featuredProjects } from "@/data/projects";
import { getSkill } from "@/data/skills";

const MAX_STACK = 6;

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="work-title"
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Selected work
          </h2>
          <p className="text-muted max-w-[40ch]">
            Three production apps, designed, built, and deployed solo.
          </p>
        </div>

        <ul className="border-rule mt-12 border-t">
          {featuredProjects.map((project) => {
            const hiddenCount = project.stack.length - MAX_STACK;

            return (
              <li
                key={project.slug}
                className="border-rule grid gap-6 border-b py-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-12"
              >
                <div>
                  <h3 className="font-display text-3xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted mt-2">{project.tagline}</p>
                  <p className="text-muted mt-4 font-mono text-xs">{project.year}</p>
                </div>

                <div className="flex flex-col gap-5">
                  <p className="text-lg leading-relaxed">{project.summary}</p>

                  <ul className="flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
                    {project.stack.slice(0, MAX_STACK).map((id) => (
                      <li
                        key={id}
                        className="rounded-instrument border-rule border px-2.5 py-1 font-mono text-xs"
                      >
                        {getSkill(id).name}
                      </li>
                    ))}
                    {hiddenCount > 0 && (
                      <li className="text-muted px-1 py-1 font-mono text-xs">
                        +{hiddenCount} more
                      </li>
                    )}
                  </ul>

                  <div className="flex flex-wrap gap-6">
                    <TextLink href={`/projects/${project.slug}`}>Case study</TextLink>
                    {project.links.github && (
                      <TextLink href={project.links.github}>Source code</TextLink>
                    )}
                    {project.links.demo && <TextLink href={project.links.demo}>Live demo</TextLink>}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
