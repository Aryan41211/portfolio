import { useEffect, useState } from "react";
import { ANIMATION } from "@/constants";

/**
 * Hook that returns true once the user has scrolled past 20px.
 * Drives the navbar's elevated/scrolled visual state.
 */
export function useScrolled(): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > ANIMATION.scrollThresholdPx);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return scrolled;
}
