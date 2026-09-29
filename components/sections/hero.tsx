import { RidgelineChart } from "@/components/sections/ridgeline-chart";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { profile } from "@/data/profile";
import { social } from "@/data/social";

const heroLinks = social.filter((item) => item.label !== "Instagram");

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="border-rule border-b">
      <Container className="grid min-h-[min(calc(100dvh_-_4rem),60rem)] items-center gap-12 py-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16 lg:py-14">
        <div className="flex flex-col gap-6">
          <p className="text-muted">{profile.role}</p>
          <h1 id="hero-title" className="font-display text-hero max-w-[14ch] font-bold">
            {profile.headline}
          </h1>
          <p className="text-muted max-w-[40ch] text-lg leading-relaxed">{profile.lede}</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="#work">View my work</ButtonLink>
            <ButtonLink href="#contact" variant="secondary">
              Get in touch
            </ButtonLink>
          </div>
          <ul className="flex gap-6">
            {heroLinks.map((item) => (
              <li key={item.href}>
                <TextLink href={item.href}>{item.label}</TextLink>
              </li>
            ))}
          </ul>
        </div>

        <figure className="rounded-instrument border-rule border p-4 sm:p-6">
          <RidgelineChart />
          <figcaption className="text-muted mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="bg-ink h-0.5 w-5" />
              Signal
            </span>
            <span className="inline-flex items-center gap-2">
              <span aria-hidden="true" className="bg-signal h-0.5 w-5" />
              Incident
            </span>
            <span className="ml-auto hidden pointer-fine:inline">
              Move your pointer over the chart
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}
