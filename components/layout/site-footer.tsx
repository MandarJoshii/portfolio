import Link from "next/link";
import { Container } from "@/components/ui/container";
import { TextLink } from "@/components/ui/text-link";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";
import { social } from "@/data/social";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-rule border-t">
      <Container className="grid gap-10 py-14 sm:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-3">
          <p className="font-display text-2xl font-bold tracking-tight">{profile.name}</p>
          <p className="text-muted max-w-[32ch]">{profile.tagline}</p>
          <TextLink href={`mailto:${profile.email}`} className="self-start">
            {profile.email}
          </TextLink>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-muted mb-2 text-sm font-medium">Site</h2>
          <ul className="flex flex-col">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-signal inline-flex min-h-11 items-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-muted mb-2 text-sm font-medium">Elsewhere</h2>
          <ul className="flex flex-col">
            {social.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="hover:text-signal inline-flex min-h-11 items-center"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <Container>
        <div className="border-rule text-muted flex flex-wrap items-center justify-between gap-4 border-t py-6 text-sm">
          <p>
            © {year} {profile.name}
          </p>
          <Link href="#main" className="hover:text-ink inline-flex min-h-11 items-center">
            Back to top
          </Link>
        </div>
      </Container>
    </footer>
  );
}
