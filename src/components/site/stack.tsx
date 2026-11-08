import { stackGroups } from "@/lib/content";

export function Stack() {
  return (
    <section id="stack" className="border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="wrap section-pad">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Stack</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Tools I will actually put in production.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Node and Express at the core. SQL and Mongo depending on the shape of the data. Docker, Linux, and a PaaS when the product needs to be live on Friday.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {stackGroups.map((group) => (
            <article key={group.title} className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] md:p-6">
              <h3 className="kicker">{group.title}</h3>
              <ul className="mt-5 space-y-4">
                {group.items.map((item) => (
                  <li key={item.name}>
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm text-fg">{item.name}</span>
                      <span className="font-mono text-2xs text-dim tabular-nums">{item.level}%</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-bg">
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${item.level}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
