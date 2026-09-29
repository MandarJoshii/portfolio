import { Reveal } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/tilt";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { projectVisuals } from "@/components/visuals/project-visuals";
import { featuredProjects } from "@/data/projects";
import { getSkill } from "@/data/skills";
import { cn } from "@/lib/cn";

const MAX_STACK = 6;

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="py-20 sm:py-28">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2
            id="work-title"
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Selected work
          </h2>
          <p className="text-muted max-w-[40ch]">
            Three production apps, designed, built, and deployed solo.
          </p>
        </Reveal>

        <ul className="border-rule mt-12 border-t">
          {featuredProjects.map((project, index) => {
            const visual = projectVisuals[project.slug];
            const hiddenCount = project.stack.length - MAX_STACK;

            return (
              <li
                key={project.slug}
                className="border-rule grid items-center gap-10 border-b py-14 md:grid-cols-2 md:gap-16"
              >
                {visual && (
                  <Reveal className={cn(index % 2 === 1 && "md:order-last")}>
                    <Tilt>
                      <figure className="rounded-instrument border-rule border p-4 sm:p-6">
                        <visual.Visual />
                        <figcaption className="text-muted mt-4 font-mono text-xs leading-relaxed">
                          {visual.caption}
                        </figcaption>
                      </figure>
                    </Tilt>
                  </Reveal>
                )}

                <Reveal delay={120}>
                  <p className="text-muted font-mono text-xs">{project.year}</p>
                  <h3 className="font-display mt-3 text-4xl font-bold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="text-muted mt-2">{project.tagline}</p>
                  <p className="mt-6 text-lg leading-relaxed">{project.summary}</p>

                  <ul
                    className="mt-6 flex flex-wrap gap-2"
                    aria-label={`${project.title} technologies`}
                  >
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

                  <div className="mt-6 flex flex-wrap gap-6">
                    {project.links.github && (
                      <TextLink href={project.links.github}>Source code</TextLink>
                    )}
                    {project.links.demo && <TextLink href={project.links.demo}>Live demo</TextLink>}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
