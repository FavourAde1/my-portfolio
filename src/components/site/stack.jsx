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
              <ul className="mt-5 divide-y divide-border">
                {group.items.map((item) => (
                  <li key={item.name} className="flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-1.5 py-2.5">
                    <span className="text-sm text-fg">{item.name}</span>
                    {item.usedIn.length > 0 ? (
                      <span className="flex flex-wrap justify-end gap-1.5">
                        {item.usedIn.map((where) => (
                          <span key={where} className="rounded-full bg-bg px-2 py-0.5 font-mono text-2xs text-muted hairline">
                            {where}
                          </span>
                        ))}
                      </span>
                    ) : null}
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
