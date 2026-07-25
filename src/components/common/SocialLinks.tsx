import { GithubIcon, LinkedinIcon } from "./BrandIcons";
import { SOCIAL_LINKS } from "@/constants";
import { IconButton } from "@/components/ui";
import { ICON_BUTTON_HOVER } from "@/constants";

/** Reusable GitHub + LinkedIn icon pair used in Hero and Contact. */
export function SocialIconPair() {
  return (
    <div className="flex items-center gap-3" role="list" aria-label="Social links">
      {SOCIAL_LINKS.map((s) => {
        const Icon = s.id === "github" ? GithubIcon : LinkedinIcon;
        return (
          <IconButton
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={s.label}
            whileHover={ICON_BUTTON_HOVER}
          >
            <Icon className="h-4 w-4" aria-hidden="true" />
          </IconButton>
        );
      })}
    </div>
  );
}

/** Contact-section variant: card-style links with handle + platform label. */
export function SocialCardLinks() {
  return (
    <div className="grid gap-4" role="list" aria-label="Contact links">
      {SOCIAL_LINKS.map((s) => {
        const Icon = s.id === "github" ? GithubIcon : LinkedinIcon;
        return (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-4 transition-all duration-200 hover:border-foreground/20 hover:shadow-sm hover:bg-secondary/30"
            role="listitem"
          >
            <Icon
              className="h-4 w-4 text-foreground transition-transform group-hover:scale-110"
              aria-hidden="true"
            />
            <div className="min-w-0">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {s.id === "github" ? "GitHub" : "LinkedIn"}
              </div>
              <div className="truncate text-sm font-medium text-foreground">{s.handle}</div>
            </div>
          </a>
        );
      })}
    </div>
  );
}
