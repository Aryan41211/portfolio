import { useState } from "react";
import { motion } from "framer-motion";
import { Reveal, Section, SectionHeader } from "@/components/common";
import { Badge, IconButton } from "@/components/ui";
import { GithubIcon } from "@/components/common";
import { PROJECTS } from "@/data";
import { CARD_HOVER, ICON_BUTTON_HOVER } from "@/constants";
import { ProjectModal } from "./ProjectModal";
import type { Project } from "@/types";

function Artwork({ pattern }: { pattern: "grid" | "waves" | "dots" | "rings" | "diagonal" | "crosshatch" }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-secondary/40">
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
            <circle cx="200" cy="112" r="60" className="fill-foreground/5 stroke-foreground/30" />
            <circle cx="200" cy="112" r="30" className="fill-foreground/10 stroke-foreground/40" />
          </g>
        )}
        {pattern === "waves" && (
          <g stroke="currentColor" fill="none" className="text-foreground/25">
            {Array.from({ length: 10 }).map((_, i) => (
              <path
                key={i}
                d={`M0 ${40 + i * 18} Q100 ${20 + i * 18} 200 ${40 + i * 18} T400 ${40 + i * 18}`}
                strokeWidth="0.6"
              />
            ))}
          </g>
        )}
        {pattern === "dots" && (
          <g className="fill-foreground/30">
            {Array.from({ length: 16 }).map((_, y) =>
              Array.from({ length: 28 }).map((_, x) => (
                <circle key={`${x}-${y}`} cx={10 + x * 14} cy={10 + y * 14} r={1.2} />
              )),
            )}
          </g>
        )}
        {pattern === "rings" && (
          <g stroke="currentColor" fill="none" className="text-foreground/25">
            {Array.from({ length: 12 }).map((_, i) => (
              <circle key={i} cx="200" cy="112" r={10 + i * 12} strokeWidth="0.6" />
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
            <rect x="150" y="62" width="100" height="100" rx="8" className="fill-foreground/5 stroke-foreground/25" strokeWidth="0.8" />
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
            <circle cx="200" cy="112" r="45" className="fill-foreground/8 stroke-foreground/30" strokeWidth="0.6" />
            <circle cx="200" cy="112" r="25" className="fill-foreground/5 stroke-foreground/20" strokeWidth="0.5" />
          </g>
        )}
      </svg>
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
            <motion.article
              whileHover={CARD_HOVER}
              onClick={(e) => {
                if ((e.target as HTMLElement).closest("a")) return;
                setSelectedProject(p);
              }}
              className="group flex h-full cursor-pointer flex-col rounded-3xl border border-border bg-card p-6 transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_2px_20px_-8px_rgba(0,0,0,0.08)] md:p-8"
            >
              <Artwork pattern={p.pattern} />
              <div className="mt-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                    {p.period}
                  </div>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground md:text-2xl leading-snug">
                    {p.title}
                  </h3>
                  <div className="mt-1 text-sm text-muted-foreground">{p.subtitle}</div>
                </div>
                <IconButton
                  href={p.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${p.title} on GitHub`}
                  title={`${p.title} on GitHub`}
                  whileHover={ICON_BUTTON_HOVER}
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                </IconButton>
              </div>
              <ul className="mt-5 space-y-2.5" role="list">
                {p.highlights.map((h, j) => (
                  <li
                    key={j}
                    className="flex gap-2.5 text-[14px] leading-relaxed text-muted-foreground"
                  >
                    <span
                      className="mt-2 h-1 w-1 shrink-0 rounded-full bg-foreground/50"
                      aria-hidden="true"
                    />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-1.5">
                {p.stack.map((s) => (
                  <Badge key={s} variant="muted">
                    {s}
                  </Badge>
                ))}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </Section>
  );
}
