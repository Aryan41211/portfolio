export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-4 px-6 py-10 text-sm text-muted-foreground md:flex-row md:items-center">
        <div>Designed & Built by Aryan Nitin Kondekar</div>
        <div>© {new Date().getFullYear()} — All rights reserved.</div>
      </div>
    </footer>
  );
}
