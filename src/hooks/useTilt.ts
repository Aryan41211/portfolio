import { useCallback, useRef } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

interface TiltOptions {
  /** Maximum rotation in degrees on each axis. */
  max?: number;
  /** How far the card lifts toward the viewer, in px. */
  lift?: number;
}

/**
 * Pointer-driven 3D tilt.
 *
 * Writes --rx / --ry / --tz / --mx / --my straight to the element's style so
 * the transform stays on the compositor — no React state, no re-render per
 * pointermove. Disabled under reduced-motion and on coarse pointers, where a
 * tilt that can never settle just looks broken.
 */
export function useTilt<T extends HTMLElement>({ max = 7, lift = 12 }: TiltOptions = {}) {
  const ref = useRef<T>(null);
  const frame = useRef(0);
  const reduced = usePrefersReducedMotion();

  const onPointerMove = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current;
      if (!el || reduced || e.pointerType !== "mouse") return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        el.dataset.tilting = "true";
        el.style.setProperty("--ry", `${(px - 0.5) * 2 * max}deg`);
        el.style.setProperty("--rx", `${(0.5 - py) * 2 * max}deg`);
        el.style.setProperty("--tz", `${lift}px`);
        el.style.setProperty("--mx", `${px * 100}%`);
        el.style.setProperty("--my", `${py * 100}%`);
      });
    },
    [max, lift, reduced],
  );

  const onPointerLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(frame.current);
    el.dataset.tilting = "false";
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--tz", "0px");
  }, []);

  return { ref, tiltProps: { onPointerMove, onPointerLeave, className: "tilt-card" } };
}
