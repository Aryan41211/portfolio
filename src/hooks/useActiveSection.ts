import { useEffect, useState } from "react";
import { TRACKABLE_SECTION_IDS, ANIMATION } from "@/constants";

/**
 * Scroll-spy hook extracted from Navbar.
 * Returns the currently-active section id (e.g. "about", "projects").
 * Observes the same 120px vertical offset the original code used.
 */
export function useActiveSection(): string {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      for (const id of TRACKABLE_SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= ANIMATION.spyOffsetPx && rect.bottom >= ANIMATION.spyOffsetPx) {
          setActive(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return active;
}
