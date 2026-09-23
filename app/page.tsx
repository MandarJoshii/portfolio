import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-6 px-6">
      <p className="text-muted">Full-stack developer</p>
      <h1 className="font-display text-hero max-w-[12ch] font-bold">
        I build the parts of web apps that have to be right.
      </h1>
      <p className="text-muted max-w-[38ch] text-lg leading-relaxed">
        Authentication, permissions, payments, and data that never ends up half-written.
      </p>
      <div className="flex flex-wrap items-center gap-4">
        <Link
          href="https://github.com/MandarJoshii"
          className="rounded-instrument bg-signal text-signal-ink inline-flex min-h-12 items-center px-5 font-medium"
        >
          View my work
        </Link>
        <span className="text-muted font-mono text-sm">font check: IBM Plex Mono</span>
      </div>
    </main>
  );
}
