import { Suspense, lazy } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/sections/Navbar";
import { ScrollProgress } from "@/components/common/ScrollProgress";
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/sections/Footer";

// Lazy-load below-fold sections — Reveal already handles entrance animation
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

function SectionFallback() {
  return <div className="h-[200px]" aria-hidden="true" />;
}

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<SectionFallback />}>
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Education />
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
