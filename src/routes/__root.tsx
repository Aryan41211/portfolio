import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SITE, SOCIAL_LINKS } from "@/constants";
import { ThemeProvider } from "@/hooks";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover",
      },
      { title: SITE.title },
      { name: "description", content: SITE.description },
      { name: "author", content: SITE.author },
      {
        name: "keywords",
        content:
          "machine learning engineer, NLP, semantic search, MLOps, Python developer, AI portfolio, Aryan Kondekar, ML portfolio",
      },
      { name: "theme-color", content: "#ffffff" },
      { name: "color-scheme", content: "light dark" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
      { name: "format-detection", content: "telephone=no" },
      { property: "og:title", content: SITE.title },
      { property: "og:description", content: SITE.description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:site_name", content: SITE.brandmark },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: `${SITE.url}/og-image.png` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: SITE.title },
      { property: "og:image:type", content: "image/png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: SOCIAL_LINKS[0].handle },
      { name: "twitter:creator", content: SOCIAL_LINKS[0].handle },
      { name: "twitter:title", content: SITE.title },
      { name: "twitter:description", content: SITE.description },
      { name: "twitter:image", content: `${SITE.url}/og-image.png` },
      { name: "twitter:image:alt", content: SITE.title },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/favicon.ico" },
      { rel: "canonical", href: SITE.url },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "preload",
        as: "style",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        innerHTML: JSON.stringify([
          {
            "@context": "https://schema.org",
            "@type": "Person",
            name: SITE.author,
            url: SITE.url,
            jobTitle: "Machine Learning Engineer",
            description: SITE.description,
            image: `${SITE.url}/og-image.png`,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Pune",
              addressCountry: "IN",
            },
            alumniOf: [
              {
                "@type": "CollegeOrUniversity",
                name: "Savitribai Phule Pune University",
              },
            ],
            knowsAbout: [
              "Machine Learning",
              "Natural Language Processing",
              "Semantic Search",
              "MLOps",
              "Python",
              "FastAPI",
              "Deep Learning",
              "scikit-learn",
              "FAISS",
            ],
            sameAs: SOCIAL_LINKS.map((s) => s.href),
            seeks: {
              "@type": "JobPosting",
              description: "Open to ML engineering roles and internships",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE.brandmark,
            url: SITE.url,
            description: SITE.description,
            author: {
              "@type": "Person",
              name: SITE.author,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: SITE.title,
            description: SITE.description,
            url: SITE.url,
            inLanguage: "en",
            about: {
              "@type": "Person",
              name: SITE.author,
            },
          },
        ]),
      },
      {
        innerHTML: `
          (function() {
            try {
              var theme = null;
              try { theme = localStorage.getItem('theme'); } catch (e) {}
              if (!theme || theme === 'system') {
                theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              }
              if (theme === 'dark') {
                document.documentElement.classList.add('dark');
                var meta = document.querySelector('meta[name="theme-color"]');
                if (meta) meta.setAttribute('content', '#212121');
              }
            } finally {
              // Must always run: 'preload' disables every transition on the
              // page, so a throw above would freeze the site's animation.
              document.documentElement.classList.remove('preload');
            }
          })();
        `,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth preload" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="overflow-x-hidden">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Outlet />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
