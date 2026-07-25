import { SITE } from "@/constants";

export function Footer() {
  return (
    <footer className="border-t border-border" role="contentinfo">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <p className="font-medium text-foreground">Designed & Built by {SITE.author}</p>
        <p>© {new Date().getFullYear()} — All rights reserved.</p>
      </div>
    </footer>
  );
}
