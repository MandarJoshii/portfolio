import { Reveal } from "@/components/motion/reveal";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { profile } from "@/data/profile";

export function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="border-rule border-t py-20 sm:py-28"
    >
      <Container className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
        <Reveal>
          <h2
            id="contact-title"
            className="font-display text-4xl font-bold tracking-tight sm:text-5xl"
          >
            Get in touch
          </h2>
          <p className="text-muted mt-6 max-w-[44ch] text-lg leading-relaxed">
            Have a role, a project, or a question about something I&apos;ve built? Send a message
            and I&apos;ll reply by email.
          </p>
          <p className="mt-6">
            Or email me at <TextLink href={`mailto:${profile.email}`}>{profile.email}</TextLink>
          </p>
        </Reveal>
        <Reveal delay={120}>
          <ContactForm />
        </Reveal>
      </Container>
    </section>
  );
}
