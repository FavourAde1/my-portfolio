import { useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/content";
import { Button } from "@/components/ui/button";

const intents = ["Hire me", "Partner / invest", "Contract API", "Something else"] as const;

function copy(text: string, label: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success(`${label} copied`))
    .catch(() => toast.error("Could not copy"));
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState<(typeof intents)[number]>("Hire me");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Name, email, and a note are required.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("That email does not look right.");
      return;
    }
    const subject = encodeURIComponent(`[${intent}] ${name} → ${profile.displayName}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}\nIntent: ${intent}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    toast.success("Opening your mail client.");
  }

  return (
    <section id="contact" className="border-t border-border bg-surface/40 py-16 md:py-24">
      <div className="wrap section-pad grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="kicker">Contact</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">If you are building, I can own the server.</h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
            {profile.availability}. Send a note with the product, the timeline, and what the API needs to do. I reply from Lagos.
          </p>

          <ul className="mt-8 space-y-2">
            <li>
              <button
                type="button"
                onClick={() => copy(profile.email, "Email")}
                className="flex min-h-11 w-full items-center justify-between gap-3 rounded-lg bg-elevated px-4 text-left text-sm hairline hairline-hover"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Mail className="size-4 text-accent" />
                  {profile.email}
                </span>
                <Copy className="size-3.5 text-dim" />
              </button>
            </li>
            <li>
              <a
                href={profile.phoneHref}
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-elevated px-4 text-sm hairline hairline-hover"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Phone className="size-4 text-accent" />
                  {profile.phone}
                </span>
                <ArrowUpRight className="size-3.5 text-dim" />
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-elevated px-4 text-sm hairline hairline-hover"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Github className="size-4 text-accent" />
                  github.com/FavourAdeniyi
                </span>
                <ArrowUpRight className="size-3.5 text-dim" />
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex min-h-11 items-center justify-between gap-3 rounded-lg bg-elevated px-4 text-sm hairline hairline-hover"
              >
                <span className="inline-flex items-center gap-2.5">
                  <Linkedin className="size-4 text-accent" />
                  linkedin.com/in/favouradeniyi
                </span>
                <ArrowUpRight className="size-3.5 text-dim" />
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={onSubmit} className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] md:p-7">
          <p className="font-mono text-xs text-dim">$ mail --to favour --intent</p>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-muted">Name</span>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 rounded-md bg-bg px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-dim"
                placeholder="Your name"
                autoComplete="name"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-muted">Email</span>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                className="h-11 rounded-md bg-bg px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-dim"
                placeholder="you@company.com"
                autoComplete="email"
              />
            </label>
            <fieldset>
              <legend className="mb-2 text-xs font-medium text-muted">Intent</legend>
              <div className="flex flex-wrap gap-2">
                {intents.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setIntent(item)}
                    className={
                      intent === item
                        ? "h-10 rounded-full bg-accent px-3 text-xs font-medium text-accent-foreground"
                        : "h-10 rounded-full bg-bg px-3 text-xs text-muted hairline hairline-hover"
                    }
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-muted">Note</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                className="resize-y rounded-md bg-bg px-3 py-2.5 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-dim"
                placeholder="What you are building, and what the backend needs to do."
              />
            </label>
            <Button type="submit" size="lg" className="w-full">
              {sent ? (
                <>
                  <Check /> Draft ready
                </>
              ) : (
                "Send brief"
              )}
            </Button>
            <p className="text-xs text-dim">Opens your mail client addressed to {profile.email}. No form spam, no third-party inbox.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
