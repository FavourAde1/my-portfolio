import { useState } from "react";
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, Phone } from "lucide-react";
import { toast } from "sonner";
import { profile } from "@/lib/content";
import { INTENTS, validateContact } from "@/lib/contact-core";
import { Button } from "@/components/ui/button";

const inputClass = "h-11 rounded-md bg-bg px-3 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-dim";

function copy(text, label) {
  navigator.clipboard
    .writeText(text)
    .then(() => toast.success(`${label} copied`))
    .catch(() => toast.error("Could not copy"));
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="text-xs text-danger">
      {message}
    </span>
  );
}

export function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intent, setIntent] = useState("Hire me");
  const [message, setMessage] = useState("");
  const [trap, setTrap] = useState(""); // honeypot: real visitors never see or fill this
  const [errors, setErrors] = useState({});
  // idle | sending | sent | draft (draft = we fell back to the visitor's mail client)
  const [status, setStatus] = useState("idle");

  const edit = (setter) => (e) => {
    setter(e.target.value);
    if (status === "sent" || status === "draft") setStatus("idle");
  };

  function openMailClient() {
    const subject = encodeURIComponent(`[${intent}] ${name} → ${profile.displayName}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}\nIntent: ${intent}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setStatus("draft");
    toast.message("Could not send directly, so I opened your mail client instead.");
  }

  async function onSubmit(e) {
    e.preventDefault();
    if (status === "sending") return;

    const checked = validateContact({ name, email, intent, message, hp_field: trap });
    if (!checked.ok && !checked.spam) {
      setErrors(checked.errors);
      toast.error("Check the highlighted fields.");
      return;
    }
    setErrors({});
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, intent, message, hp_field: trap }),
      });

      if (res.ok) {
        setStatus("sent");
        setName("");
        setEmail("");
        setMessage("");
        toast.success("Message sent. I reply from Lagos.");
        return;
      }
      if (res.status === 422) {
        const data = await res.json().catch(() => ({}));
        setErrors(data.fields ?? {});
        setStatus("idle");
        toast.error("Check the highlighted fields.");
        return;
      }
      if (res.status === 429) {
        setStatus("idle");
        toast.error(`Too many messages from this connection. Try again later, or email ${profile.email}.`);
        return;
      }
      // 503 (not configured), 502 (delivery failed) or anything unexpected
      openMailClient();
    } catch {
      openMailClient();
    }
  }

  const sending = status === "sending";

  return (<section id="contact" className="border-t border-border bg-surface/40 py-16 md:py-24">
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

        <form onSubmit={onSubmit} noValidate className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] md:p-7">
          <p className="font-mono text-xs text-dim">$ mail --to favour --intent</p>
          <div className="mt-5 grid gap-4">
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-muted">Name</span>
              <input
                value={name}
                onChange={edit(setName)}
                className={inputClass}
                placeholder="Your name"
                autoComplete="name"
                maxLength={100}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "contact-err-name" : undefined}
              />
              <FieldError id="contact-err-name" message={errors.name} />
            </label>
            <label className="grid gap-1.5">
              <span className="text-xs font-medium text-muted">Email</span>
              <input
                value={email}
                onChange={edit(setEmail)}
                type="email"
                className={inputClass}
                placeholder="you@company.com"
                autoComplete="email"
                maxLength={254}
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? "contact-err-email" : undefined}
              />
              <FieldError id="contact-err-email" message={errors.email} />
            </label>
            <fieldset>
              <legend className="mb-2 text-xs font-medium text-muted">Intent</legend>
              <div className="flex flex-wrap gap-2">
                {INTENTS.map((item) => (<button
                    key={item}
                    type="button"
                    aria-pressed={intent === item}
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
                onChange={edit(setMessage)}
                rows={5}
                maxLength={4000}
                className="resize-y rounded-md bg-bg px-3 py-2.5 text-sm text-fg shadow-[var(--shadow-border)] placeholder:text-dim"
                placeholder="What you are building, and what the backend needs to do."
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "contact-err-message" : undefined}
              />
              <FieldError id="contact-err-message" message={errors.message} />
            </label>

            {/* Honeypot. Off-screen, skipped by keyboard and screen readers, name chosen so autofill ignores it. */}
            <div aria-hidden="true" className="sr-only">
              <label>
                Leave this field empty
                <input name="hp_field" value={trap} onChange={(e) => setTrap(e.target.value)} tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={sending}>
              {sending ? (
                "Sending…"
              ) : status === "sent" ? (
                <>
                  <Check /> Sent
                </>
              ) : status === "draft" ? (
                <>
                  <Check /> Draft ready
                </>
              ) : (
                "Send brief"
              )}
            </Button>
            <p className="text-xs text-dim" aria-live="polite">
              {status === "sent"
                ? "Thanks. I'll reply to the address you gave."
                : `Goes straight to my inbox. If sending fails, your mail client opens addressed to ${profile.email}.`}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
