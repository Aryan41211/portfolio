import { motion } from "framer-motion";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/common";
import { Button, IconButton } from "@/components/ui";
import { PROFILE } from "@/data";
import { SOCIAL_LINKS, RESUME, HERO_VARIANTS } from "@/constants";
import { ICON_BUTTON_HOVER, BUTTON_PRESS } from "@/constants/animation";

export function Hero() {
  return (
    <section id="home" className="relative pt-40 md:pt-48 lg:pt-56 min-h-screen flex items-center">
      <div className="mx-auto max-w-5xl px-6 w-full">
        <motion.div variants={HERO_VARIANTS.container} initial="hidden" animate="show">
          {/* Status badge */}
          <motion.div
            variants={HERO_VARIANTS.item}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-[12px] font-medium text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            Available for opportunities
            <span className="mx-1 h-3 w-px bg-border" aria-hidden="true" />
            <MapPin className="h-3 w-3 shrink-0" aria-hidden="true" />
            {PROFILE.location}
          </motion.div>

          {/* Name headline */}
          <motion.h1
            variants={HERO_VARIANTS.item}
            className="text-[clamp(2.5rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-[-0.035em] text-foreground text-balance"
          >
            {PROFILE.firstName}
            <br />
            {PROFILE.lastName}
            <span className="text-muted-foreground">.</span>
          </motion.h1>

          {/* Role tags */}
          <motion.div
            variants={HERO_VARIANTS.item}
            className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-lg font-medium text-muted-foreground md:text-xl"
            role="list"
            aria-label="Roles"
          >
            <span role="listitem">{PROFILE.role}</span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span role="listitem">Python Developer</span>
            <span className="h-1 w-1 rounded-full bg-border" aria-hidden="true" />
            <span role="listitem">AI Enthusiast</span>
          </motion.div>

          {/* Intro paragraph */}
          <motion.p
            variants={HERO_VARIANTS.item}
            className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-balance"
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
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-all hover:opacity-90"
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
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-all hover:bg-secondary"
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
        </motion.div>
      </div>
    </section>
  );
}
