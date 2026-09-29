import { About } from "@/components/sections/about";
import { Hero } from "@/components/sections/hero";
import { Work } from "@/components/sections/work";

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <Work />
      <About />
    </main>
  );
}
