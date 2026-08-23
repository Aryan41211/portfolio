import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import {
  TRACKABLE_SECTION_IDS,
  NAV_LINKS,
  ANIMATION,
  MOTION_SPRING,
  BUTTON_PRESS,
} from "@/constants";
import { cn } from "@/utils";
import { useTheme } from "@/hooks";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();

  // Elevation flag only — one boolean, rAF-throttled so a fast scroll cannot
  // queue more work than the compositor can retire.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > ANIMATION.scrollThresholdPx);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  // Scroll-spy via IntersectionObserver. The previous implementation called
  // getBoundingClientRect() for every section on every scroll event, forcing a
  // synchronous layout each time; the observer does the same job off the main
  // thread. Sections mount lazily, so re-observe whenever the set changes.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer whichever tracked section covers the spy line and is most
        // visible, so overlapping sections do not fight over the pill.
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      {
        // A band around the spy offset, so exactly one section owns it.
        rootMargin: `-${ANIMATION.spyOffsetPx}px 0px -55% 0px`,
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    const attach = () => {
      for (const id of TRACKABLE_SECTION_IDS) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    };
    attach();

    // Below-fold sections are code-split and appear after hydration.
    const mutations = new MutationObserver(attach);
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      mutations.disconnect();
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2"
    >
      <motion.div
        className={cn(
          "flex items-center justify-between rounded-full border px-5 py-2.5 transition-all duration-300",
          scrolled
            ? "border-border/80 bg-background/70 shadow-[0_2px_20px_-6px_rgba(0,0,0,0.08)] backdrop-blur-xl"
            : "border-transparent bg-background/40 backdrop-blur-md",
        )}
        animate={{
          boxShadow: scrolled ? "0 2px 20px -6px rgba(0,0,0,0.08)" : "0 0 0 -6px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <a
          href="#home"
          className="text-sm font-semibold tracking-tight text-foreground"
          aria-label="Go to top"
          title="Back to top"
        >
          ANK<span className="text-muted-foreground">.</span>
        </a>
        <nav
          className="hidden items-center gap-1 md:flex"
          role="navigation"
          aria-label="Main navigation"
        >
          {NAV_LINKS.map((l) => {
            const isActive = active === l.id;
            return (
              <a
                key={l.href}
                href={l.href}
                className={cn(
                  "relative px-3 py-1.5 text-[13px] font-medium text-muted-foreground transition-colors hover:text-foreground",
                  isActive && "text-foreground",
                )}
                aria-current={isActive ? "page" : undefined}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-brand-muted ring-1 ring-inset ring-brand-subtle"
                    transition={MOTION_SPRING.navPill}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href="/Aryan_Kondekar_Resume.pdf"
            download
            className="hidden rounded-full bg-brand px-4 py-1.5 text-[13px] font-medium text-brand-foreground transition-all hover:opacity-90 md:inline-block"
            aria-label="Download resume"
            title="Download resume (PDF)"
          >
            Resume
          </a>
          <button
            aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground active:scale-95"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Moon className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border md:hidden"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <X className="h-4 w-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Menu className="h-4 w-4" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-2 overflow-hidden rounded-2xl border border-border bg-background/90 p-2 shadow-lg backdrop-blur-xl md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <nav id="mobile-menu" aria-label="Mobile navigation">
              {NAV_LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-foreground hover:bg-secondary",
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {l.label}
                  </a>
                );
              })}
            </nav>
            <button
              onClick={() => {
                toggleTheme();
              }}
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              {resolvedTheme === "dark" ? (
                <Sun className="h-4 w-4 shrink-0" aria-hidden="true" />
              ) : (
                <Moon className="h-4 w-4 shrink-0" aria-hidden="true" />
              )}
              {resolvedTheme === "dark" ? "Light Mode" : "Dark Mode"}
            </button>
            <a
              href="/Aryan_Kondekar_Resume.pdf"
              download
              className="mt-1 block rounded-xl bg-brand px-4 py-2.5 text-center text-sm font-medium text-brand-foreground transition-all hover:opacity-90"
              title="Download resume (PDF)"
            >
              Download Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
