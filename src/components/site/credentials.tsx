import { certifications, communities, education, languages } from "@/lib/content";

export function Credentials() {
  return (
    <section id="credentials" className="wrap section-pad py-16 md:py-24">
      <div className="mb-10">
        <p className="kicker">Credentials</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight">
          Engineer by training. Backend by obsession.
        </h2>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h3 className="kicker mb-4">Education</h3>
          <ul>
            {education.map((ed) => (
              <li key={ed.title} className="border-t border-border py-5">
                <p className="text-base font-medium text-fg">{ed.title}</p>
                <p className="mt-1 text-sm text-muted">{ed.school}</p>
                <p className="mt-2 font-mono text-xs text-accent">{ed.period}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6">
          <div className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] md:p-6">
            <h3 className="kicker mb-4">Certifications</h3>
            <ul className="space-y-3">
              {certifications.map((c) => (
                <li key={c.name} className="flex items-start justify-between gap-3">
                  <span className="text-sm text-fg">{c.name}</span>
                  <span className="shrink-0 text-right font-mono text-2xs text-dim">{c.org}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)]">
              <h3 className="kicker mb-3">Communities</h3>
              <ul className="space-y-2">
                {communities.map((c) => (
                  <li key={c.name} className="text-sm text-fg">
                    {c.name}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)]">
              <h3 className="kicker mb-3">Languages</h3>
              <ul className="space-y-2">
                {languages.map((l) => (
                  <li key={l.name} className="flex justify-between text-sm">
                    <span className="text-fg">{l.name}</span>
                    <span className="text-muted">{l.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
