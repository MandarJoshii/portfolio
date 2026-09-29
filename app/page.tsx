import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";
import { profile } from "@/data/profile";
import { site } from "@/data/site";
import { social } from "@/data/social";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  url: site.url,
  email: `mailto:${profile.email}`,
  sameAs: social.map((item) => item.href),
};

export default function HomePage() {
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Work />
      <About />
      <Contact />
    </main>
  );
}
