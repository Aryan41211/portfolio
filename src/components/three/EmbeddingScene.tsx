import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { EmbeddingField } from "./EmbeddingField";

/**
 * The WebGL half of the hero visual.
 *
 * Split into its own module so the entire three.js graph lands in a lazy
 * chunk — nothing here is parsed until HeroCanvas decides the device can
 * actually run it.
 */
export default function EmbeddingScene({ reducedMotion }: { reducedMotion: boolean }) {
  const pointer = useRef({ x: 0, y: 0 });
  const hostRef = useRef<HTMLDivElement>(null);
  // Pause the render loop whenever the hero scrolls away — an idle canvas
  // burning GPU behind six other sections is the classic portfolio battery bug.
  // Both conditions are tracked separately: returning to a backgrounded tab
  // must not resume rendering for a hero that is scrolled far off screen.
  const [onScreen, setOnScreen] = useState(true);
  const [tabActive, setTabActive] = useState(true);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(host);

    const onVisibility = () => setTabActive(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = onScreen && tabActive;

  useEffect(() => {
    if (reducedMotion) return;

    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  return (
    <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
      <Canvas
        frameloop={running ? "always" : "never"}
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 13], fov: 52 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "none" }}
      >
        <EmbeddingField pointer={pointer} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
