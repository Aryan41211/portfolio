import { Suspense, lazy, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

// Lazy-load below-fold sections — Reveal already handles entrance animation.
const About = lazy(() => import("@/components/sections/About").then((m) => ({ default: m.About })));
const Experience = lazy(() =>
  import("@/components/sections/Experience").then((m) => ({ default: m.Experience })),
);
const Projects = lazy(() =>
  import("@/components/sections/Projects").then((m) => ({ default: m.Projects })),
);
const Skills = lazy(() =>
  import("@/components/sections/Skills").then((m) => ({ default: m.Skills })),
);
const Education = lazy(() =>
  import("@/components/sections/Education").then((m) => ({ default: m.Education })),
);
const Contact = lazy(() =>
  import("@/components/sections/Contact").then((m) => ({ default: m.Contact })),
);

/**
 * One boundary per section, each reserving roughly the height its section will
 * occupy.
 *
 * A single shared boundary collapsed all six sections into one 200px box until
 * the slowest chunk resolved, which both threw away several screens of layout
 * (a large CLS hit) and meant `#projects` and friends did not exist as scroll
 * targets yet, so deep links and nav clicks landed on the wrong place.
 */
function LazySection({ minHeight, children }: { minHeight: number; children: ReactNode }) {
  return (
    <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>{children}</Suspense>
  );
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <a
        href="#projects"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground"
      >
        Skip to projects
      </a>
      <main>
        <Hero />
        <LazySection minHeight={620}>
          <About />
        </LazySection>
        <LazySection minHeight={560}>
          <Experience />
        </LazySection>
        <LazySection minHeight={1400}>
          <Projects />
        </LazySection>
        <LazySection minHeight={700}>
          <Skills />
        </LazySection>
        <LazySection minHeight={420}>
          <Education />
        </LazySection>
        <LazySection minHeight={900}>
          <Contact />
        </LazySection>
      </main>
      <Footer />
    </div>
  );
}
