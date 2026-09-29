import { Container } from "@/components/ui/container";
import { skillCategoryLabels, skills } from "@/data/skills";
import type { SkillCategory } from "@/types/skill";

const categories = Object.keys(skillCategoryLabels) as SkillCategory[];

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="border-rule border-t py-20 sm:py-28"
    >
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <div>
          <h2
            id="about-title"
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            About
          </h2>
          <div className="mt-8 flex max-w-[56ch] flex-col gap-5 text-lg leading-relaxed">
            <p>
              I&apos;m a full-stack developer from Vadodara. I did a BCA in cyber security, then an
              MCA in data science, and along the way built an Android app with real-time face
              detection and shipped Next.js features at R.K Digital Solutions.
            </p>
            <p>
              The part I enjoy most is the backend: who&apos;s allowed to do what, what happens to
              the data when two things happen at once, and writing the tests that prove it works.
              Right now I&apos;m building Umbra, an observability platform, to learn more about
              real-time systems.
            </p>
          </div>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold tracking-tight">What I work with</h3>
          <dl className="mt-6 flex flex-col gap-5">
            {categories.map((category) => {
              const names = skills
                .filter((skill) => skill.category === category)
                .map((skill) => skill.name);

              return (
                <div key={category} className="grid gap-1 sm:grid-cols-[12rem_minmax(0,1fr)]">
                  <dt className="text-muted font-mono text-xs sm:pt-1">
                    {skillCategoryLabels[category]}
                  </dt>
                  <dd>{names.join(", ")}</dd>
                </div>
              );
            })}
          </dl>
        </div>
      </Container>
    </section>
  );
}
