import { useState } from "react";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { Reveal } from "./Reveal";

const EMAIL = "aryankondekar16@gmail.com";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* no-op */
    }
  };

  return (
    <section id="contact" className="scroll-mt-24 py-32 md:py-40">
      <div className="mx-auto max-w-5xl px-6">
        <Reveal>
          <div className="mb-12 flex items-baseline gap-4">
            <span className="text-sm font-medium text-muted-foreground">06</span>
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">Contact</span>
          </div>
        </Reveal>

        <Reveal>
          <div className="rounded-[2rem] border border-border bg-white p-8 md:p-16">
            <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl">
              Let's build something
              <br />
              <span className="text-muted-foreground">worth shipping.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
              Open to ML engineering roles, internships, and interesting collaborations.
              The fastest way to reach me is email.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${EMAIL}`}
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
              >
                <Mail className="h-4 w-4" />
                {EMAIL}
              </a>
              <button
                onClick={copy}
                aria-label="Copy email"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4" /> Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4" /> Copy
                  </>
                )}
              </button>
            </div>

            <div className="mt-12 grid gap-4 border-t border-border pt-10 md:grid-cols-3">
              <a
                href="https://github.com/Aryan41211"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-border p-4 transition-all hover:border-foreground/20"
              >
                <GithubIcon className="h-4 w-4 text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    GitHub
                  </div>
                  <div className="truncate text-sm font-medium text-foreground">
                    github.com/Aryan41211
                  </div>
                </div>
              </a>
              <a
                href="https://linkedin.com/in/aryankondekar"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-2xl border border-border p-4 transition-all hover:border-foreground/20"
              >
                <LinkedinIcon className="h-4 w-4 text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    LinkedIn
                  </div>
                  <div className="truncate text-sm font-medium text-foreground">
                    linkedin.com/in/aryankondekar
                  </div>
                </div>
              </a>
              <div className="flex items-center gap-3 rounded-2xl border border-border p-4">
                <MapPin className="h-4 w-4 text-foreground" />
                <div className="min-w-0">
                  <div className="text-xs uppercase tracking-widest text-muted-foreground">
                    Location
                  </div>
                  <div className="truncate text-sm font-medium text-foreground">
                    Pune, India
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
