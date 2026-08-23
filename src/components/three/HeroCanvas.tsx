import { Suspense, lazy, useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks";
import { StaticField } from "./StaticField";

const EmbeddingScene = lazy(() => import("./EmbeddingScene"));

/**
 * Decides whether this device gets the live WebGL field or the static SVG
 * stand-in, then lazy-loads three.js only in the former case.
 *
 * Gates, in order of how often they fire:
 *  - server render / first paint: always static, so the hero is never blank
 *  - reduced motion: static, no exceptions
 *  - Save-Data or a low-memory device: static, three.js is ~150KB
 *  - no WebGL context available: static
 */
function canRunWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

interface NetworkInfo {
  saveData?: boolean;
}

function isConstrainedDevice(): boolean {
  const nav = navigator as Navigator & { connection?: NetworkInfo; deviceMemory?: number };
  if (nav.connection?.saveData) return true;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return true;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2) return true;
  return false;
}

export function HeroCanvas() {
  const reducedMotion = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(!isConstrainedDevice() && canRunWebGL());
  }, [reducedMotion]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Accent bloom sitting behind the field, visible in both modes. */}
      <div className="brand-glow absolute right-[-10%] top-[8%] h-[46rem] w-[46rem] opacity-40 blur-[60px] dark:opacity-50" />

      {enabled ? (
        <Suspense fallback={<StaticField />}>
          <EmbeddingScene reducedMotion={reducedMotion} />
        </Suspense>
      ) : (
        <StaticField />
      )}
    </div>
  );
}
