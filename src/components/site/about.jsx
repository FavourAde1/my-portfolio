import { engagement, manifesto, profile } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="wrap section-pad py-16 md:py-24">
      <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
        <div>
          <p className="kicker">Thesis</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            {profile.headline}
          </h2>
        </div>
        <div className="space-y-5 text-base leading-relaxed text-muted">
          {manifesto.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {engagement.map((item) => (
          <article key={item.title} className="rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] md:p-6">
            <h3 className="text-base font-medium text-fg">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
