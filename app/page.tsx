import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";

export default function HomePage() {
  return (
    <main className="flex min-h-dvh items-center">
      <Container className="flex flex-col gap-6">
        <p className="text-muted">Full-stack developer</p>
        <h1 className="font-display text-hero max-w-[12ch] font-bold">
          I build the parts of web apps that have to be right.
        </h1>
        <p className="text-muted max-w-[38ch] text-lg leading-relaxed">
          Authentication, permissions, payments, and data that never ends up half-written.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="https://github.com/MandarJoshii">View my work</ButtonLink>
          {/* Temporary: points nowhere until the CV file is added in M7 */}
          <ButtonLink href="#" variant="secondary">
            Download CV
          </ButtonLink>
        </div>
        <div className="flex gap-6">
          <TextLink href="https://github.com/MandarJoshii">GitHub</TextLink>
          <TextLink href="https://www.linkedin.com/in/mandarrr-joshiiii">LinkedIn</TextLink>
        </div>
      </Container>
    </main>
  );
}
