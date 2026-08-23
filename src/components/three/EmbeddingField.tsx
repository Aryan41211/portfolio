import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { cssVarToRgb } from "@/utils";

/* --------------------------------------------------------------------------
 * Scene parameters
 * ----------------------------------------------------------------------- */

const POINT_COUNT = 1400;
const CLUSTER_COUNT = 7;
const CLUSTER_SPREAD = 1.35;
const FIELD_RADIUS = 5.2;
/** How many neighbours the travelling query links to. */
const K = 7;
/** Seconds a query rests on one point before hopping to the next. */
const HOP_INTERVAL = 2.4;

/** Deterministic PRNG so the layout is identical on every load. */
function makeRandom(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/** Box-Muller, so cluster members fall off naturally from the centroid. */
function gaussian(rand: () => number) {
  const u = Math.max(rand(), 1e-6);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * rand());
}

const VERTEX_SHADER = /* glsl */ `
  attribute float aScale;
  attribute float aMix;
  uniform float uSize;
  uniform float uTime;
  varying float vMix;
  varying float vDepth;

  void main() {
    vMix = aMix;

    // Slow per-point drift keeps the field alive with no CPU work per frame.
    vec3 p = position;
    p.x += sin(uTime * 0.28 + position.z * 1.7) * 0.055;
    p.y += cos(uTime * 0.23 + position.x * 1.4) * 0.055;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    vDepth = smoothstep(-22.0, -3.0, mv.z);
    gl_PointSize = uSize * aScale * (1.0 / max(-mv.z, 0.1));
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uBrand;
  uniform vec3 uBase;
  uniform float uOpacity;
  varying float vMix;
  varying float vDepth;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;

    float alpha = smoothstep(0.5, 0.08, d);
    vec3 color = mix(uBase, uBrand, vMix);
    gl_FragColor = vec4(color, alpha * vDepth * uOpacity);
  }
`;

const LINE_VERTEX_SHADER = /* glsl */ `
  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const LINE_FRAGMENT_SHADER = /* glsl */ `
  uniform vec3 uBrand;
  uniform float uOpacity;

  void main() {
    gl_FragColor = vec4(uBrand, uOpacity * 0.7);
  }
`;

interface FieldProps {
  /** Pointer position in normalised [-1, 1] space, updated outside React. */
  pointer: React.RefObject<{ x: number; y: number }>;
  reducedMotion: boolean;
}

export function EmbeddingField({ pointer, reducedMotion }: FieldProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { invalidate } = useThree();

  /* ---- Static geometry: a clustered "embedding space" ------------------ */
  const { positions, scales, mixes } = useMemo(() => {
    const rand = makeRandom(20260823);
    const positions = new Float32Array(POINT_COUNT * 3);
    const scales = new Float32Array(POINT_COUNT);
    const mixes = new Float32Array(POINT_COUNT);

    const centroids = Array.from({ length: CLUSTER_COUNT }, () => {
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = FIELD_RADIUS * (0.45 + rand() * 0.55);
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.7,
        r * Math.cos(phi),
      );
    });

    for (let i = 0; i < POINT_COUNT; i++) {
      const centroid = centroids[i % CLUSTER_COUNT];

      positions[i * 3] = centroid.x + gaussian(rand) * CLUSTER_SPREAD;
      positions[i * 3 + 1] = centroid.y + gaussian(rand) * CLUSTER_SPREAD * 0.8;
      positions[i * 3 + 2] = centroid.z + gaussian(rand) * CLUSTER_SPREAD;

      scales[i] = 6 + rand() * 10;
      // A minority of points carry the accent hue; the rest stay neutral.
      mixes[i] = rand() < 0.22 ? 0.55 + rand() * 0.45 : rand() * 0.12;
    }

    return { positions, scales, mixes };
  }, []);

  /* ---- Theme-reactive colours ----------------------------------------- */
  const uniforms = useMemo(
    () => ({
      uSize: { value: 26 },
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uBrand: { value: new THREE.Color(0.35, 0.32, 0.9) },
      uBase: { value: new THREE.Color(0.5, 0.5, 0.5) },
    }),
    [],
  );

  const lineUniforms = useMemo(
    () => ({
      uBrand: { value: new THREE.Color(0.35, 0.32, 0.9) },
      uOpacity: { value: 0 },
    }),
    [],
  );

  useEffect(() => {
    const sync = () => {
      const brand = cssVarToRgb("--brand", [0.35, 0.32, 0.9]);
      const isDark = document.documentElement.classList.contains("dark");
      const base: [number, number, number] = isDark ? [0.62, 0.62, 0.66] : [0.42, 0.42, 0.48];

      uniforms.uBrand.value.setRGB(brand[0], brand[1], brand[2]);
      uniforms.uBase.value.setRGB(base[0], base[1], base[2]);
      lineUniforms.uBrand.value.setRGB(brand[0], brand[1], brand[2]);
      invalidate();
    };

    sync();
    // The theme toggle swaps a class on <html>; watch for that rather than
    // threading theme state down into the canvas.
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, [uniforms, lineUniforms, invalidate]);

  /* ---- Nearest-neighbour retrieval ------------------------------------ */
  // One reusable segment buffer: K segments, two vertices each.
  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(K * 2 * 3), 3));
    return geo;
  }, []);

  useEffect(() => () => lineGeometry.dispose(), [lineGeometry]);

  const query = useRef({ elapsed: HOP_INTERVAL });

  /**
   * Brute-force kNN over the cloud. 1400 points costs nothing at one query
   * every 2.4s, and doing it honestly means the drawn lines really are the
   * nearest neighbours rather than decorative noise.
   */
  const runQuery = useMemo(() => {
    return (index: number) => {
      const qx = positions[index * 3];
      const qy = positions[index * 3 + 1];
      const qz = positions[index * 3 + 2];

      const best: Array<{ i: number; d: number }> = [];
      for (let i = 0; i < POINT_COUNT; i++) {
        if (i === index) continue;
        const dx = positions[i * 3] - qx;
        const dy = positions[i * 3 + 1] - qy;
        const dz = positions[i * 3 + 2] - qz;
        const d = dx * dx + dy * dy + dz * dz;

        if (best.length < K) {
          best.push({ i, d });
          if (best.length === K) best.sort((a, b) => a.d - b.d);
        } else if (d < best[K - 1].d) {
          best[K - 1] = { i, d };
          best.sort((a, b) => a.d - b.d);
        }
      }

      const attr = lineGeometry.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      for (let slot = 0; slot < best.length; slot++) {
        const n = best[slot];
        const o = slot * 6;
        arr[o] = qx;
        arr[o + 1] = qy;
        arr[o + 2] = qz;
        arr[o + 3] = positions[n.i * 3];
        arr[o + 4] = positions[n.i * 3 + 1];
        arr[o + 5] = positions[n.i * 3 + 2];
      }
      attr.needsUpdate = true;
    };
  }, [positions, lineGeometry]);

  const hopRandom = useMemo(() => makeRandom(7717), []);

  useFrame((state, delta) => {
    const dt = Math.min(delta, 0.05);
    const group = groupRef.current;
    if (!group) return;

    uniforms.uTime.value = state.clock.elapsedTime;
    // Fade in once the first frame has actually rendered, so the lazy chunk
    // landing never reads as a pop.
    uniforms.uOpacity.value = THREE.MathUtils.damp(uniforms.uOpacity.value, 1, 2.2, dt);

    if (!reducedMotion) {
      group.rotation.y += dt * 0.055;
    }

    // Pointer parallax, damped so it trails the cursor rather than snapping.
    const p = pointer.current ?? { x: 0, y: 0 };
    group.rotation.x = THREE.MathUtils.damp(group.rotation.x, p.y * 0.28, 3, dt);
    group.position.x = THREE.MathUtils.damp(group.position.x, p.x * 0.6, 3, dt);

    // Advance the travelling query.
    const q = query.current;
    q.elapsed += dt;
    if (q.elapsed >= HOP_INTERVAL) {
      q.elapsed = 0;
      runQuery(Math.floor(hopRandom() * POINT_COUNT));
    }

    // Links pulse in after each hop, then ease out before the next.
    const phase = q.elapsed / HOP_INTERVAL;
    const target = phase < 0.12 ? phase / 0.12 : phase > 0.82 ? (1 - phase) / 0.18 : 1;
    lineUniforms.uOpacity.value = THREE.MathUtils.damp(
      lineUniforms.uOpacity.value,
      THREE.MathUtils.clamp(target, 0, 1),
      6,
      dt,
    );
  });

  return (
    <group ref={groupRef}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
          <bufferAttribute attach="attributes-aMix" args={[mixes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={VERTEX_SHADER}
          fragmentShader={FRAGMENT_SHADER}
          uniforms={uniforms}
          transparent
          depthWrite={false}
        />
      </points>

      {/* The segment buffer starts zeroed and is rewritten in place without
          recomputing bounds, so three's lazily-derived bounding sphere would
          cull the links as the group rotates. Seven segments are not worth
          culling anyway. */}
      <lineSegments geometry={lineGeometry} frustumCulled={false}>
        <shaderMaterial
          vertexShader={LINE_VERTEX_SHADER}
          fragmentShader={LINE_FRAGMENT_SHADER}
          uniforms={lineUniforms}
          transparent
          depthWrite={false}
        />
      </lineSegments>
    </group>
  );
}
