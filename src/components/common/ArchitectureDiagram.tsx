import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks";
import type { DiagramEdge, DiagramNode, DiagramNodeKind, ProjectDiagram } from "@/types";

/* -------------------------------------------------------------------------- */
/*  Layout                                                                     */
/* -------------------------------------------------------------------------- */

const NODE_W = 116;
const NODE_H = 46;
const GAP_X = 38;
const GAP_Y = 34;
const PAD = 14;
/** Vertical clearance for a feedback edge routed beneath a row. */
const LOOP_DROP = 20;

const nodeX = (col: number) => PAD + col * (NODE_W + GAP_X);
const nodeY = (row: number) => PAD + row * (NODE_H + GAP_Y);

/** Milliseconds each step stays lit before the next one takes over. */
const STEP_MS = 780;
/** Extra beats held on the completed graph before the loop restarts. */
const REST_BEATS = 2;

/* -------------------------------------------------------------------------- */
/*  Edge routing                                                               */
/* -------------------------------------------------------------------------- */

/**
 * Route an edge between two grid-placed nodes.
 *
 * Three cases, chosen so an arrow never doubles back over its own source:
 * horizontal for same-row forward flow, a vertical S-curve when the rows
 * differ (in whichever direction the target sits), and a loop routed under
 * the row for same-row feedback.
 */
function edgePath(from: DiagramNode, to: DiagramNode): string {
  const fx = nodeX(from.col);
  const fy = nodeY(from.row);
  const tx = nodeX(to.col);
  const ty = nodeY(to.row);

  if (from.row === to.row) {
    const midY = fy + NODE_H / 2;

    if (to.col > from.col) {
      const x1 = fx + NODE_W;
      const x2 = tx;
      const c = (x2 - x1) / 2;
      return `M ${x1} ${midY} C ${x1 + c} ${midY}, ${x2 - c} ${midY}, ${x2} ${midY}`;
    }

    // Feedback along the same row — drop below both boxes and come back up.
    const y = fy + NODE_H;
    const dip = y + LOOP_DROP;
    const x1 = fx + NODE_W / 2;
    const x2 = tx + NODE_W / 2;
    return `M ${x1} ${y} C ${x1} ${dip}, ${x2} ${dip}, ${x2} ${y}`;
  }

  // Different rows: leave the face pointing at the target and arrive head-on.
  const goingDown = to.row > from.row;
  const y1 = goingDown ? fy + NODE_H : fy;
  const y2 = goingDown ? ty : ty + NODE_H;
  const x1 = fx + NODE_W / 2;
  const x2 = tx + NODE_W / 2;
  const c = (y2 - y1) / 2;
  return `M ${x1} ${y1} C ${x1} ${y1 + c}, ${x2} ${y2 - c}, ${x2} ${y2}`;
}

/** Midpoint of an edge, used to anchor its branch label. */
function edgeLabelPoint(from: DiagramNode, to: DiagramNode): { x: number; y: number } {
  const fx = nodeX(from.col);
  const fy = nodeY(from.row);
  const tx = nodeX(to.col);
  const ty = nodeY(to.row);

  if (from.row === to.row) {
    return { x: (fx + NODE_W + tx) / 2, y: fy + NODE_H / 2 - 7 };
  }
  return {
    x: (fx + tx) / 2 + NODE_W / 2,
    y: (fy + ty) / 2 + NODE_H / 2,
  };
}

/* -------------------------------------------------------------------------- */
/*  Node styling                                                               */
/* -------------------------------------------------------------------------- */

/** Idle appearance per node role. Active nodes override all of this. */
const KIND_STYLE: Record<DiagramNodeKind, { fill: string; stroke: string; dashed?: boolean }> = {
  input: { fill: "var(--secondary)", stroke: "var(--border)" },
  process: { fill: "var(--card)", stroke: "var(--border)" },
  decision: { fill: "var(--card)", stroke: "var(--muted-foreground)" },
  store: { fill: "var(--secondary)", stroke: "var(--muted-foreground)" },
  output: { fill: "var(--card)", stroke: "var(--border)" },
  external: { fill: "var(--card)", stroke: "var(--border)", dashed: true },
};

/* -------------------------------------------------------------------------- */
/*  Component                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Resolve a node's repo-relative `source` to a GitHub URL.
 *
 * A trailing slash means a directory, which GitHub serves under `/tree/`
 * rather than `/blob/`. Returns undefined when the project has no repo, so a
 * node degrades to plain text instead of a dead link.
 */
function sourceHref(repoUrl: string | undefined, source: string | undefined): string | undefined {
  if (!repoUrl || !source) return undefined;
  const isDir = source.endsWith("/");
  const path = isDir ? source.slice(0, -1) : source;
  return `${repoUrl.replace(/\/$/, "")}/${isDir ? "tree" : "blob"}/main/${path}`;
}

interface ArchitectureDiagramProps {
  diagram: ProjectDiagram;
  /** Restarts the animation whenever it changes — pass the project title. */
  playKey: string;
  /** Repository root. Nodes carrying a `source` link into it when supplied. */
  repoUrl?: string;
}

function ArchitectureDiagram({ diagram, playKey, repoUrl }: ArchitectureDiagramProps) {
  const reduced = usePrefersReducedMotion();

  const { nodes, edges, cols, rows, caption } = diagram;

  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);
  const lastStep = useMemo(() => nodes.reduce((m, n) => Math.max(m, n.step), 0), [nodes]);

  // `step` walks 0..lastStep, then idles for a few beats so the finished graph
  // is readable before the loop restarts.
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(0);
    if (reduced) return;

    const total = lastStep + 1 + REST_BEATS;
    const id = window.setInterval(() => {
      setStep((prev) => (prev + 1) % total);
    }, STEP_MS);
    return () => window.clearInterval(id);
  }, [reduced, lastStep, playKey]);

  // Reduced motion gets the completed graph, statically.
  const activeStep = reduced ? lastStep : step;
  const isActive = (n: DiagramNode) => n.step === activeStep;
  const isDone = (n: DiagramNode) => n.step < activeStep;

  const hasLinks = Boolean(repoUrl) && nodes.some((n) => n.source);

  const width = PAD * 2 + cols * NODE_W + (cols - 1) * GAP_X;
  const height = PAD * 2 + rows * NODE_H + (rows - 1) * GAP_Y + LOOP_DROP;

  const resolved = edges
    .map((e) => ({ edge: e, from: byId.get(e.from), to: byId.get(e.to) }))
    .filter((e): e is { edge: DiagramEdge; from: DiagramNode; to: DiagramNode } =>
      Boolean(e.from && e.to),
    );

  return (
    <figure className="m-0">
      <div className="overflow-x-auto rounded-2xl border border-border bg-secondary/30 p-3">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          width="100%"
          className="block min-w-[520px]"
          role="img"
          aria-label={caption}
        >
          <defs>
            <marker
              id="diagram-arrow"
              viewBox="0 0 8 8"
              refX="7"
              refY="4"
              markerWidth="5"
              markerHeight="5"
              orient="auto-start-reverse"
            >
              <path d="M 0 1 L 7 4 L 0 7 z" fill="var(--muted-foreground)" opacity="0.55" />
            </marker>
          </defs>

          {/* Static edges — always visible so the topology reads at a glance. */}
          <g fill="none" strokeWidth={1.25}>
            {resolved.map(({ edge, from, to }) => (
              <path
                key={`base-${edge.from}-${edge.to}`}
                d={edgePath(from, to)}
                stroke="var(--border)"
                strokeDasharray={edge.dashed ? "4 4" : undefined}
                markerEnd="url(#diagram-arrow)"
              />
            ))}
          </g>

          {/* Flow pulse — the edge into whichever step is currently lighting up. */}
          {!reduced && (
            <g fill="none" strokeWidth={2} strokeLinecap="round">
              {resolved.map(({ edge, from, to }) => {
                const live = to.step === activeStep && from.step < activeStep;
                return (
                  <motion.path
                    key={`live-${edge.from}-${edge.to}`}
                    d={edgePath(from, to)}
                    stroke="var(--brand)"
                    initial={false}
                    animate={live ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                    transition={{ duration: live ? STEP_MS / 1400 : 0.2, ease: "easeInOut" }}
                  />
                );
              })}
            </g>
          )}

          {/* Branch labels. */}
          <g>
            {resolved
              .filter(({ edge }) => edge.label)
              .map(({ edge, from, to }) => {
                const { x, y } = edgeLabelPoint(from, to);
                return (
                  <text
                    key={`label-${edge.from}-${edge.to}`}
                    x={x}
                    y={y}
                    textAnchor="middle"
                    className="fill-muted-foreground"
                    style={{ fontSize: 8, letterSpacing: "0.06em" }}
                  >
                    {edge.label}
                  </text>
                );
              })}
          </g>

          {/* Nodes. */}
          <g>
            {nodes.map((n) => {
              const active = isActive(n);
              const done = isDone(n);
              const style = KIND_STYLE[n.kind];
              const x = nodeX(n.col);
              const y = nodeY(n.row);
              const href = sourceHref(repoUrl, n.source);

              const body = (
                <motion.g
                  initial={false}
                  animate={{ opacity: active || done ? 1 : 0.45 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <motion.rect
                    x={x}
                    y={y}
                    width={NODE_W}
                    height={NODE_H}
                    rx={10}
                    fill={active ? "var(--brand-muted)" : style.fill}
                    stroke={active ? "var(--brand)" : done ? "var(--brand-subtle)" : style.stroke}
                    strokeWidth={active ? 1.75 : 1}
                    strokeDasharray={style.dashed ? "5 4" : undefined}
                    initial={false}
                    animate={{ scale: active ? 1.035 : 1 }}
                    style={{ transformOrigin: `${x + NODE_W / 2}px ${y + NODE_H / 2}px` }}
                    transition={{ type: "spring", stiffness: 420, damping: 26 }}
                  />
                  <text
                    x={x + NODE_W / 2}
                    y={n.detail ? y + NODE_H / 2 - 2 : y + NODE_H / 2 + 3.5}
                    textAnchor="middle"
                    className={active ? "fill-foreground" : "fill-foreground/85"}
                    style={{ fontSize: 10.5, fontWeight: 550 }}
                  >
                    {n.label}
                  </text>
                  {n.detail && (
                    <text
                      x={x + NODE_W / 2}
                      y={y + NODE_H / 2 + 11}
                      textAnchor="middle"
                      className="fill-muted-foreground"
                      style={{ fontSize: 8 }}
                    >
                      {n.detail}
                    </text>
                  )}
                </motion.g>
              );

              if (!href) return <g key={n.id}>{body}</g>;

              return (
                <a
                  key={n.id}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`Open the ${n.label} source on GitHub`}
                  className="group cursor-pointer outline-none"
                >
                  {body}
                  {/* Hover and keyboard-focus affordance. */}
                  <rect
                    x={x - 2.5}
                    y={y - 2.5}
                    width={NODE_W + 5}
                    height={NODE_H + 5}
                    rx={12}
                    fill="none"
                    stroke="var(--brand)"
                    strokeWidth={1.25}
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                  />
                  <text
                    x={x + NODE_W - 7}
                    y={y + 11}
                    textAnchor="end"
                    fill="var(--brand)"
                    style={{ fontSize: 8.5 }}
                    className="opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
                    aria-hidden="true"
                  >
                    ↗
                  </text>
                </a>
              );
            })}
          </g>
        </svg>
      </div>
      <figcaption className="mt-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
        {caption}
        {hasLinks && <span className="text-foreground/70"> Click any box to open its source.</span>}
      </figcaption>
    </figure>
  );
}

export { ArchitectureDiagram };
