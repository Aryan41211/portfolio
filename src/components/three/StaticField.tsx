/**
 * Non-WebGL stand-in for the hero field.
 *
 * Same clustered-embedding idea, projected to 2D and rendered as plain SVG.
 * Computed once at module scope from a fixed seed so server and client emit
 * byte-identical markup — no hydration mismatch, no layout shift when the
 * real canvas takes over.
 */

const WIDTH = 800;
const HEIGHT = 800;
const CLUSTERS = 7;
const POINTS = 300;
const NEIGHBOURS = 7;

function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

interface Dot {
  x: number;
  y: number;
  r: number;
  accent: boolean;
  opacity: number;
}

const { dots, links, anchorDot } = (() => {
  const rand = makeRandom(20260823);
  const centroids = Array.from({ length: CLUSTERS }, () => ({
    x: WIDTH * (0.18 + rand() * 0.64),
    y: HEIGHT * (0.18 + rand() * 0.64),
  }));

  const dots: Dot[] = [];
  for (let i = 0; i < POINTS; i++) {
    const c = centroids[i % CLUSTERS];
    const depth = rand();
    dots.push({
      x: c.x + gaussian(rand) * 78,
      y: c.y + gaussian(rand) * 78,
      r: 1.1 + depth * 2.6,
      accent: rand() < 0.22,
      opacity: 0.2 + depth * 0.55,
    });
  }

  // One resolved query: the nearest neighbours of a single anchor point.
  const anchor = dots[Math.floor(POINTS * 0.42)];
  const links = dots
    .map((d, i) => ({ i, d2: (d.x - anchor.x) ** 2 + (d.y - anchor.y) ** 2 }))
    .filter((n) => n.d2 > 0)
    .sort((a, b) => a.d2 - b.d2)
    .slice(0, NEIGHBOURS)
    .map((n) => dots[n.i]);

  return { dots, links, anchorDot: anchor };
})();

export function StaticField() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <g className="text-brand" stroke="currentColor" strokeWidth="0.9" opacity="0.5">
        {links.map((n, i) => (
          <line key={i} x1={anchorDot.x} y1={anchorDot.y} x2={n.x} y2={n.y} />
        ))}
      </g>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={d.r}
          className={d.accent ? "fill-brand" : "fill-muted-foreground"}
          opacity={d.opacity}
        />
      ))}
      <circle cx={anchorDot.x} cy={anchorDot.y} r="5" className="fill-brand" opacity="0.9" />
    </svg>
  );
}
