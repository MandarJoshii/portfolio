import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigation } from "@/data/navigation";
import { profile } from "@/data/profile";

export function SiteHeader() {
  return (
    <header className="border-rule bg-paper sticky top-0 z-40 border-b">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-display text-xl font-bold tracking-tight">
          {profile.name}
        </Link>
        <nav aria-label="Primary">
          <ul className="flex items-center gap-5 sm:gap-8">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-muted hover:text-ink inline-flex min-h-11 items-center text-[15px] transition-colors"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>
    </header>
  );
}
