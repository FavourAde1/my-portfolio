import { profile } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="wrap section-pad flex flex-col gap-3 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-xs text-dim">
          © {new Date().getFullYear()} {profile.displayName} · Backend systems, Lagos
        </p>
        <p className="font-mono text-xs text-dim">Built to be read by people who ship product.</p>
      </div>
    </footer>
  );
}
