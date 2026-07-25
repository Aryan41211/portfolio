import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui";
import { GithubIcon } from "@/components/common";
import type { Project } from "@/types";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, handleKeyDown]);

  return (
    <AnimatePresence>
      {project && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl border border-border bg-card p-8 shadow-2xl md:p-12"
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close modal"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-border text-muted-foreground transition-all duration-200 hover:bg-secondary hover:text-foreground active:scale-95"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>

            <div className="text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
              {project.period}
            </div>
            <h2
              id="modal-title"
              className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl leading-snug"
            >
              {project.title}
            </h2>
            <p className="mt-2 text-base text-muted-foreground md:text-lg">{project.subtitle}</p>

            <div className="mt-8 space-y-4">
              {project.highlights.map((h, j) => (
                <div
                  key={j}
                  className="flex gap-3 text-[15px] leading-relaxed text-muted-foreground"
                >
                  <span
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-foreground"
                    aria-hidden="true"
                  />
                  <span>{h}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <Badge key={s} variant="default">
                  {s}
                </Badge>
              ))}
            </div>

            {project.url && (
              <div className="mt-8 flex gap-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:bg-secondary hover:shadow-sm"
                  title={`${project.title} on GitHub`}
                >
                  <GithubIcon className="h-4 w-4" aria-hidden="true" />
                  View on GitHub
                  <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export { ProjectModal };
