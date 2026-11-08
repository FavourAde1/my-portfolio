import { useEffect } from "react";
import { Command } from "cmdk";
import { Github, Linkedin, Mail, ArrowRight, Download } from "lucide-react";
import { nav, profile } from "@/lib/content";
import { scrollToId } from "@/lib/utils";
import { toast } from "sonner";

export function CommandPalette({ open, onOpenChange }) {
  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape" && open) onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  if (!open) return null;

  return (
    <div className="cmdk-overlay" onClick={() => onOpenChange(false)}>
      <Command
        className="cmdk-root"
        label="Command palette"
        onClick={(e) => e.stopPropagation()}
      >
        <Command.Input placeholder="Jump, copy, or open a link…" />
        <Command.List>
          <Command.Empty>No matches.</Command.Empty>
          <Command.Group heading="Navigate">
            {nav.map((item) => (
              <Command.Item
                key={item.id}
                value={item.label}
                onSelect={() => {
                  scrollToId(item.id);
                  onOpenChange(false);
                }}
              >
                <ArrowRight className="size-3.5 text-accent" />
                {item.label}
              </Command.Item>
            ))}
          </Command.Group>
          <Command.Group heading="Contact">
            <Command.Item
              value="download resume cv"
              onSelect={() => {
                window.open(profile.resume, "_blank", "noreferrer");
                onOpenChange(false);
              }}
            >
              <Download className="size-3.5 text-accent" />
              Download résumé
            </Command.Item>
            <Command.Item
              value="copy email"
              onSelect={() => {
                navigator.clipboard.writeText(profile.email).then(() => toast.success("Email copied"));
                onOpenChange(false);
              }}
            >
              <Mail className="size-3.5 text-accent" />
              Copy email
            </Command.Item>
            <Command.Item
              value="github"
              onSelect={() => {
                window.open(profile.github, "_blank", "noreferrer");
                onOpenChange(false);
              }}
            >
              <Github className="size-3.5 text-accent" />
              Open GitHub
            </Command.Item>
            <Command.Item
              value="linkedin"
              onSelect={() => {
                window.open(profile.linkedin, "_blank", "noreferrer");
                onOpenChange(false);
              }}
            >
              <Linkedin className="size-3.5 text-accent" />
              Open LinkedIn
            </Command.Item>
          </Command.Group>
        </Command.List>
      </Command>
    </div>
  );
}
