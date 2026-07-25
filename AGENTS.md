<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

---

# Portfolio Architecture — Refactor Notes (2025-07-25)

## Summary

Complete refactor from a flat `src/components/portfolio/*` structure to a production-grade, domain-driven architecture. All UI, animations, and behaviour preserved exactly.

## New Folder Structure

```
src/
├── assets/           # static assets (images, icons, resume PDF)
├── components/
│   ├── common/       # layout primitives (Container, Section, SectionHeader, Reveal, ScrollProgress, BrandIcons, SocialLinks)
│   ├── layout/       # page-level chrome (Navbar)
│   ├── sections/     # portfolio sections (Hero, About, Experience, Projects, Skills, Education, Contact, Footer)
│   └── ui/           # design-system primitives (Button, Badge, IconButton)
├── constants/        # site metadata, nav/section config, animation presets, social links
├── data/             # typed portfolio content (profile, projects, experience, education, skills, socials)
├── hooks/            # reusable logic (useActiveSection, useCopyToClipboard, useScrolled, useIsMobile)
├── lib/              # server-side utilities (error handling, SSR error pages)
├── routes/           # TanStack Start file-based routes
├── types/            # domain types (Project, ExperienceEntry, SkillGroup, SocialLink, Profile, etc.)
├── utils/            # pure helpers (cn, copyText, scrollToSection)
├── App.tsx
└── main.tsx
```

## Key Architectural Decisions

### 1. Data-Component Separation

All static content moved to `src/data/*.ts` with strict TypeScript interfaces in `src/types/portfolio.ts`. Editing the portfolio now means editing data files — no component changes needed.

### 2. Single Source of Truth for Navigation

`constants/navigation.ts` defines `NAV_LINKS`; `SECTIONS` and `SECTION_MAP` are derived. Section headers (01 About, 02 Experience…) can never drift from the navbar.

### 3. Centralised Animation Presets

`constants/animation.ts` exports `HERO_VARIANTS`, `REVEAL_VARIANTS`, `MOTION_SPRING` (nav pill, project hover, scroll progress). One tweak fans out everywhere.

### 4. Reusable Primitives

- `components/common/Section` wraps `id`, `scroll-mt-24`, `py-32 md:py-40`, and `Container`.
- `components/common/SectionHeader` derives ordinal + label from `SECTION_MAP`.
- `components/ui/Button` (primary/secondary/ghost + sizes), `Badge` (default/muted/skill), `IconButton` — exact class-name parity with original inline JSX.

### 5. Hooks for Behavioural Logic

- `useActiveSection` — scroll-spy (120px offset).
- `useScrolled` — navbar elevation at 20px.
- `useCopyToClipboard` — 1.6s auto-reset.
- `useIsMobile` — 768bp media query.

### 6. Lazy-Loaded Below-Fold Sections

`routes/index.tsx` uses `React.lazy` + single `Suspense` boundary for About → Contact. Hero + Navbar stay in initial bundle. Reveal animations unchanged.

### 7. SEO via Constants

`routes/__root.tsx` reads `SITE.title`, `SITE.description`, `SOCIAL_LINKS` — no hard-coded strings.

### 8. Removed Dead Code

Deleted 46 unused shadcn UI components + `lib/utils.ts` (duplicate `cn`) + `hooks/use-mobile.tsx` (renamed to `useIsMobile.ts`). Bundle size & IDE scan surface reduced.

## Path Aliases (tsconfig.json)

```
@/*              → ./src/*
@/assets/*       → ./src/assets/*
@/components/*   → ./src/components/*
@/common/*       → ./src/components/common/*
@/layout/*       → ./src/components/layout/*
@/sections/*     → ./src/components/sections/*
@/ui/*           → ./src/components/ui/*
@/constants      → ./src/constants/index.ts
@/constants/*    → ./src/constants/*
@/data           → ./src/data/index.ts
@/data/*         → ./src/data/*
@/hooks          → ./src/hooks/index.ts
@/hooks/*        → ./src/hooks/*
@/lib/*          → ./src/lib/*
@/types          → ./src/types/index.ts
@/types/*        → ./src/types/*
@/utils          → ./src/utils/index.ts
@/utils/*        → ./src/utils/*
```

## Verification

- `npm run build` ✓ (SSR + client bundles)
- `npm run lint` ✓ (zero errors after prettier --write)
- Visual parity confirmed: all Tailwind classes, Framer Motion variants, and SVG artwork identical to pre-refactor output.
