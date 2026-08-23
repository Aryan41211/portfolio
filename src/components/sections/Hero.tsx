import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { Container, GithubIcon, LinkedinIcon } from "@/components/common";
import { HeroCanvas } from "@/components/three";
import { Button, IconButton } from "@/components/ui";
import { PROFILE } from "@/data";
import { SOCIAL_LINKS, RESUME, HERO_VARIANTS, AVAILABLE } from "@/constants";
import { ICON_BUTTON_HOVER, BUTTON_PRESS } from "@/constants/animation";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-36 md:pt-44 lg:pt-52"
    >
      {/* Live embedding field. Decorative and non-interactive — the copy in
          front of it is the accessible content. */}
      <HeroCanvas />

      {/* Readability scrim: keeps the headline legible over the point cloud
          without dimming the field on the right where there is no text. */}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent md:via-background/70"
        aria-hidden="true"
      />

      <Container className="relative w-full">
        <motion.div variants={HERO_VARIANTS.container} initial="hidden" animate="show">
          {/* Status badge */}
          {AVAILABLE && (
            <motion.div
              variants={HERO_VARIANTS.item}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-subtle bg-brand-muted px-3 py-1.5 text-[12px] font-medium text-foreground backdrop-blur-sm"
            >
              <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Available for opportunities
              <span className="mx-1 h-3 w-px bg-brand-subtle" aria-hidden="true" />
              <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
              {PROFILE.location}
            </motion.div>
          )}

          {/* Name headline */}
          <motion.h1
            variants={HERO_VARIANTS.item}
            className="text-balance text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground"
          >
            {PROFILE.firstName}
            <br />
            {PROFILE.lastName}
            <span className="text-brand">.</span>
          </motion.h1>

          {/* Role tags */}
          <motion.div
            variants={HERO_VARIANTS.item}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium text-muted-foreground md:text-xl"
            role="list"
            aria-label="Roles"
          >
            {PROFILE.taglines.map((tagline, i) => (
              <span key={tagline} className="contents">
                {i > 0 && <span className="h-1 w-1 rounded-full bg-brand" aria-hidden="true" />}
                <span role="listitem">{tagline}</span>
              </span>
            ))}
          </motion.div>

          {/* Intro paragraph */}
          <motion.p
            variants={HERO_VARIANTS.item}
            className="mt-8 max-w-2xl text-balance text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {PROFILE.intro}
          </motion.p>

          {/* CTA buttons + social */}
          <motion.div
            variants={HERO_VARIANTS.item}
            className="mt-10 flex flex-wrap items-center gap-3"
            role="group"
            aria-label="Primary actions"
          >
            <Button asChild size="md" whileHover={{ y: -2 }} whileTap={BUTTON_PRESS}>
              <a
                href="#projects"
                title="View featured projects"
                className="group inline-flex items-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-medium text-brand-foreground shadow-[0_8px_24px_-12px_var(--brand)] transition-all hover:opacity-90"
              >
                View Projects
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </Button>
            <Button
              variant="secondary"
              asChild
              size="md"
              whileHover={{ y: -2 }}
              whileTap={BUTTON_PRESS}
            >
              <a
                href={RESUME.href}
                download
                title={`Download ${RESUME.cta}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-5 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition-all hover:border-brand-subtle hover:bg-secondary"
              >
                <Download className="h-4 w-4" aria-hidden="true" />
                {RESUME.cta}
              </a>
            </Button>
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.id === "github" ? GithubIcon : LinkedinIcon;
              return (
                <IconButton
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={social.label}
                  title={social.label}
                  whileHover={ICON_BUTTON_HOVER}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </IconButton>
              );
            })}
          </motion.div>

          {/* Headline metrics — the numbers that would otherwise stay buried
              in project bullet text. */}
          <motion.dl
            variants={HERO_VARIANTS.item}
            className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-6 border-t border-border pt-8 sm:grid-cols-4"
          >
            {PROFILE.stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd>
                  <span className="block text-2xl font-semibold tracking-tight text-foreground tabular-nums md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="mt-1 block text-[13px] leading-snug text-muted-foreground">
                    {stat.label}
                  </span>
                </dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </Container>
    </section>
  );
}
