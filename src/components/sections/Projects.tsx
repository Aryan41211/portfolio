import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Reveal, Section, SectionHeader } from "@/components/common";
import { Badge, IconButton } from "@/components/ui";
import { GithubIcon } from "@/components/common";
import { PROJECTS } from "@/data";
import { ICON_BUTTON_HOVER } from "@/constants";
import { useTilt } from "@/hooks";
import { ProjectModal } from "./ProjectModal";
import type { Project, ProjectPattern } from "@/types";

function Artwork({ pattern }: { pattern: ProjectPattern }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-secondary/40">
      {/* Accent wash that intensifies with the card hover. */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-muted via-transparent to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100" />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 225"
        fill="none"
        aria-hidden="true"
      >
        {pattern === "grid" && (
          <g stroke="currentColor" strokeWidth="0.5" className="text-foreground/15">
            {Array.from({ length: 20 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 20} y1={0} x2={i * 20} y2={225} />
            ))}
            {Array.from({ length: 12 }).map((_, i) => (
              <line key={`h${i}`} x1={0} y1={i * 20} x2={400} y2={i * 20} />
            ))}
            <circle cx="200" cy="112" r="60" className="fill-brand/5 stroke-brand/40" />
            <circle cx="200" cy="112" r="30" className="fill-brand/10 stroke-brand/60" />
          </g>
        )}
        {pattern === "waves" && (
          <g stroke="currentColor" fill="none" className="text-foreground/25">
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${40 + i * 18} Q100 ${20 + i * 18} 200 ${40 + i * 18} T400 ${40 + i * 18}`}
                strokeWidth="0.6"
                className={i % 3 === 1 ? "text-brand/50" : undefined}
              />
            ))}
          </g>
        )}
        {pattern === "dots" && (
          <g className="fill-foreground/30">
            {Array.from({ length: 16 }).map((_, y) =>
              Array.from({ length: 28 }).map((_, x) => (
                <circle
                  key={`${x}-${y}`}
                  cx={10 + x * 14}
                  cy={10 + y * 14}
                  r={1.2}
                  className={(x * 7 + y * 3) % 11 === 0 ? "fill-brand/70" : undefined}
                />
              )),
            )}
          </g>
        )}
        {pattern === "rings" && (
          <g stroke="currentColor" fill="none" className="text-foreground/25">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={i}
                cx="200"
                cy="112"
                r={10 + i * 12}
                strokeWidth="0.6"
                className={i % 4 === 0 ? "text-brand/55" : undefined}
              />
            ))}
          </g>
        )}
        {pattern === "diagonal" && (
          <g stroke="currentColor" strokeWidth="0.5" className="text-foreground/18">
            {Array.from({ length: 30 }).map((_, i) => (
              <line key={`d${i}`} x1={i * 20 - 200} y1={0} x2={i * 20} y2={225} />
            ))}
            {Array.from({ length: 30 }).map((_, i) => (
              <line key={`r${i}`} x1={i * 20} y1={0} x2={i * 20 - 200} y2={225} />
            ))}
            <rect
              x="150"
              y="62"
              width="100"
              height="100"
              rx="8"
              className="fill-brand/5 stroke-brand/45"
              strokeWidth="0.8"
            />
          </g>
        )}
        {pattern === "crosshatch" && (
          <g stroke="currentColor" strokeWidth="0.4" className="text-foreground/16">
            {Array.from({ length: 22 }).map((_, i) => (
              <line key={`c${i}`} x1={0} y1={i * 12} x2={400} y2={i * 12} strokeDasharray="4 6" />
            ))}
            {Array.from({ length: 35 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 12} y1={0} x2={i * 12} y2={225} strokeDasharray="4 6" />
            ))}
            <circle
              cx="200"
              cy="112"
              r="45"
              className="fill-brand/8 stroke-brand/45"
              strokeWidth="0.6"
            />
            <circle
              cx="200"
              cy="112"
              r="25"
              className="fill-brand/5 stroke-brand/30"
              strokeWidth="0.5"
            />
          </g>
        )}
      </svg>
    </div>
  );
}

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  // One hook instance per card, hence the extracted component.
  const { ref, tiltProps } = useTilt<HTMLElement>({ max: 6, lift: 14 });

  return (
    <div className="tilt-scene h-full">
      {/*
        Whole-card click is a mouse convenience only. The card itself is not
        given role="button": it contains a link and a button, and a button role
        must not wrap focusable descendants. Keyboard and screen-reader users
        get the explicit "View details" control at the foot of the card.
      */}
      <article
        ref={ref}
        {...tiltProps}
        className={`${tiltProps.className} border-spin group relative flex h-full cursor-pointer flex-col rounded-3xl border border-border bg-card p-6 hover:border-brand-subtle hover:shadow-[0_18px_40px_-24px_var(--brand)] md:p-8`}
        onClick={(e) => {
          // Let a nested link or button win its own click.
          if ((e.target as HTMLElement).closest("a,button")) return;
          onOpen();
        }}
      >
        <span className="tilt-sheen" aria-hidden="true" />

        {/* Lifted off the card plane so it parallaxes against the tilt. */}
        <div className="tilt-layer" style={{ "--layer-z": "34px" } as React.CSSProperties}>
          <Artwork pattern={project.pattern} />
        </div>

        <div
          className="tilt-layer mt-6 flex items-start justify-between gap-4"
          style={{ "--layer-z": "18px" } as React.CSSProperties}
        >
          <div className="min-w-0">
            <div className="text-[11px] font-medium uppercase tracking-widest text-brand">
              {project.period}
            </div>
            <h3 className="mt-2 text-xl font-semibold leading-snug tracking-tight text-foreground md:text-2xl">
              {project.title}
            </h3>
            <div className="mt-1 text-sm text-muted-foreground">{project.subtitle}</div>
          </div>
          <IconButton
            href={project.url}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`${project.title} on GitHub`}
            title={`${project.title} on GitHub`}
            whileHover={ICON_BUTTON_HOVER}
          >
            <GithubIcon className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        </div>

        <ul className="mt-5 space-y-2.5" role="list">
          {project.highlights.map((h, j) => (
            <li key={j} className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground">
              <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>{h}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <Badge key={s} variant="muted">
              {s}
            </Badge>
          ))}
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="mt-auto inline-flex w-fit items-center gap-1.5 rounded-full pt-6 text-sm font-medium text-brand transition-all hover:gap-2.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          View details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only">for {project.title}</span>
        </button>
      </article>
    </div>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <Section id="projects">
      <SectionHeader id="projects" />

      <div className="grid gap-6 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.05}>
            <ProjectCard project={p} onOpen={() => setSelectedProject(p)} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}
