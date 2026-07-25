import { Check, Copy, Mail, MapPin } from "lucide-react";
import { Reveal, Section, SectionHeader } from "@/components/common";
import { Button } from "@/components/ui";
import { GithubIcon, LinkedinIcon } from "@/components/common";
import { EMAIL, SOCIALS, PROFILE } from "@/data";
import { BUTTON_PRESS } from "@/constants";
import { useCopyToClipboard } from "@/hooks";

export function Contact() {
  const [copied, copy] = useCopyToClipboard();

  const handleCopy = () => copy(EMAIL);

  return (
    <Section id="contact">
      <SectionHeader id="contact" />

      <Reveal>
        <div className="rounded-[2rem] border border-border bg-card p-8 md:p-16">
          <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground md:text-6xl leading-tight">
            {PROFILE.contactHeadline[0]}
            <br />
            <span className="text-muted-foreground">{PROFILE.contactHeadline[1]}</span>
          </h2>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg leading-relaxed">
            {PROFILE.contactParagraph}
          </p>

          <div
            className="mt-10 flex flex-wrap items-center gap-3"
            role="group"
            aria-label="Contact actions"
          >
            <a
              href={`mailto:${EMAIL}`}
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all duration-200 hover:opacity-90 hover:shadow-lg focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span className="truncate">{EMAIL}</span>
            </a>
            <Button
              variant="ghost"
              onClick={handleCopy}
              aria-label={copied ? "Email copied to clipboard" : "Copy email address"}
              aria-live="polite"
              whileHover={{ y: -2 }}
              whileTap={BUTTON_PRESS}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 shrink-0" aria-hidden="true" />
                  Copy
                </>
              )}
            </Button>
          </div>

          <div className="mt-12 grid gap-4 border-t border-border pt-10 md:grid-cols-3">
            {SOCIALS.map((social) => {
              const Icon = social.id === "github" ? GithubIcon : LinkedinIcon;
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/20 hover:bg-secondary/30 hover:shadow-sm hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
                  <div className="min-w-0">
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {social.id === "github" ? "GitHub" : "LinkedIn"}
                    </div>
                    <div className="truncate text-sm font-medium text-foreground">
                      {social.handle}
                    </div>
                  </div>
                </a>
              );
            })}
            <div className="flex items-center gap-3 rounded-2xl border border-border p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm">
              <MapPin className="h-4 w-4 shrink-0 text-foreground" aria-hidden="true" />
              <div className="min-w-0">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  Location
                </div>
                <div className="truncate text-sm font-medium text-foreground">
                  {PROFILE.location}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
