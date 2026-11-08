import { experience } from "@/lib/content";

export function Experience() {
  return (
    <section id="work" className="wrap section-pad py-16 md:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="kicker">Work</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight">Delivery, not theatre.</h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          Three years of backend work — internships inside shipping teams, then independent API builds for products that needed a real server.
        </p>
      </div>

      <ol className="relative space-y-0">
        {experience.map((job, i) => (
          <li key={job.id} className="grid gap-4 border-t border-border py-8 md:grid-cols-[14rem_1fr] md:gap-10">
            <div>
              <p className="font-mono text-xs text-accent">{job.period}</p>
              <p className="mt-2 text-sm text-muted">{job.location}</p>
              {i === 0 ? (
                <p className="mt-3 inline-flex rounded-full bg-ok/15 px-2.5 py-1 font-mono text-2xs tracking-wide text-ok">
                  CURRENT
                </p>
              ) : null}
            </div>
            <div>
              <h3 className="text-lg font-medium tracking-tight text-fg">{job.role}</h3>
              <p className="mt-0.5 text-sm text-accent">{job.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{job.summary}</p>
              <ul className="mt-4 space-y-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-relaxed text-fg/90">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
