/**
 * Non-WebGL stand-in for the hero field.
 *
 * Same clustered-embedding idea, projected to 2D and rendered as plain SVG.
 * Computed once at module scope from a fixed seed so server and client emit
 * identical markup — no hydration mismatch, no layout shift when the real
 * canvas takes over.
 *
 * A seeded PRNG alone is NOT enough for that guarantee. Math.log, Math.cos and
 * friends are implementation-defined in ECMAScript, and Node's V8 disagrees
 * with the browser's in the last ULP — which is exactly what a Box-Muller
 * gaussian here produced: cx=425.1054687148925 on the client against
 * ...4 from the server, and a React hydration error for the whole tree.
 *
 * So everything below sticks to +, -, * and /, which IEEE-754 specifies
 * exactly and every engine reproduces bit-for-bit, and the emitted
 * coordinates are additionally quantised to 3 decimals.
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

/**
 * Irwin-Hall approximation of a standard normal: the sum of 6 uniforms has
 * variance 6/12, so centring and scaling by sqrt(2) gives unit variance.
 * Visually indistinguishable from Box-Muller at this scale, and uses only
 * exactly-specified arithmetic.
 */
const SQRT_2 = 1.4142135623730951;

function gaussian(rand: () => number) {
  let sum = 0;
  for (let i = 0; i < 6; i++) sum += rand();
  return (sum - 3) * SQRT_2;
}

/** Quantise to 3 decimals so serialisation cannot differ between engines. */
function q(n: number) {
  return Math.round(n * 1000) / 1000;
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
      x: q(c.x + gaussian(rand) * 78),
      y: q(c.y + gaussian(rand) * 78),
      r: q(1.1 + depth * 2.6),
      accent: rand() < 0.22,
      opacity: q(0.2 + depth * 0.55),
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
