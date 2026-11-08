import { useMemo, useState } from "react";
import { ArrowUpRight, ChevronRight, Copy, Check } from "lucide-react";
import { projects } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Only links that actually exist are shown; see the comment above `projects` in content.js.
function proofLinks(project) {
  return [
    { label: "Live", href: project.live },
    { label: "API docs", href: project.docs },
    { label: "Postman", href: project.postman },
    { label: "CI", href: project.ci },
    { label: "GitHub", href: project.repo },
  ].filter((link) => Boolean(link.href));
}

function methodColor(method) {
  if (method === "GET") return "text-method-get";
  if (method === "POST") return "text-method-post";
  if (method === "PATCH") return "text-method-patch";
  return "text-method-delete";
}

function Playground({ project }) {
  const endpoints = project.endpoints || [];
  const [active, setActive] = useState(endpoints[0] || null);
  const [copied, setCopied] = useState(false);
  const json = useMemo(
    () => (active ? JSON.stringify(active.response, null, 2) : ""),
    [active],
  );

  if (!endpoints.length) {
    return (
      <div className="rounded-xl bg-elevated p-6 text-sm text-muted shadow-[var(--shadow-border)]">
        Hardware / firmware project — no HTTP playground. Open the GitHub repo for the station design and firmware.
      </div>
    );
  }

  return (<div className="overflow-hidden rounded-xl bg-elevated shadow-[var(--shadow-border)]">
      <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        <div className="border-b border-border md:border-r md:border-b-0">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="kicker">endpoints</p>
            <span className="font-mono text-2xs text-dim">{project.endpoints.length} routes</span>
          </div>
          <ul className="p-2">
            {project.endpoints.map((ep) => (<li key={ep.path}>
                <button
                  type="button"
                  onClick={() => setActive(ep)}
                  className={cn("flex w-full min-h-11 items-start gap-3 rounded-md px-3 py-2.5 text-left transition-[background-color] duration-150", active.path === ep.path ? "bg-bg" : "hover:bg-bg/60", )}
                >
                  <span
                    className={cn("mt-0.5 w-12 shrink-0 font-mono text-2xs font-medium", methodColor(ep.method), )}
                  >
                    {ep.method}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-mono text-xs text-fg">{ep.path}</span>
                    <span className="mt-0.5 block text-xs text-muted">{ep.desc}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex min-w-0 flex-col bg-bg">
          <div className="flex items-center justify-between gap-2 border-b border-border px-4 py-3">
            <div className="min-w-0">
              <p className="truncate font-mono text-xs text-fg">
                <span className={methodColor(active.method)}>{active.method}</span> {active.path}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-2xs text-ok">{active.status}</span>
              <span className="font-mono text-2xs text-dim tabular-nums">{active.ms}ms</span>
              <Button
                variant="ghost"
                size="icon"
                className="size-9"
                aria-label="Copy response"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(json);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1400);
                  } catch {
                    /* clipboard can fail in some embeds */
                  }
                }}
              >
                {copied ? <Check className="size-3.5 text-ok" /> : <Copy className="size-3.5" />}
              </Button>
            </div>
          </div>
          <pre className="max-h-72 flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed text-accent">
            {json}
          </pre>
        </div>
      </div>
    </div>
  );
}

export function Systems() {
  const [selected, setSelected] = useState(0);
  const project = projects[selected];

  return (<section id="systems" className="border-y border-border bg-surface/40 py-16 md:py-24">
      <div className="wrap section-pad">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">Systems</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">Shipped systems, not demos.</h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Real client delivery and API surfaces a frontend can build against — auth first, production
            deploys included.
          </p>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {projects.map((p, i) => (<button
              key={p.id}
              type="button"
              onClick={() => setSelected(i)}
              className={cn("h-11 rounded-md px-4 text-sm transition-[background-color,color,box-shadow] duration-150", selected === i
                  ? "bg-accent text-accent-foreground"
                  : "bg-elevated text-muted hairline hairline-hover hover:text-fg", )}
            >
              {p.name}
            </button>
          ))}
        </div>

        <article className="mb-6 rounded-xl bg-elevated p-5 shadow-[var(--shadow-border)] md:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-xl font-medium tracking-tight">{project.name}</h3>
                <Badge variant="accent">{project.status}</Badge>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((s) => (<Badge key={s}>{s}</Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {proofLinks(project).map(({ label, href }) => (
                <Button key={label} variant="outline" size="sm" asChild>
                  <a href={href} target="_blank" rel="noreferrer">
                    {label}
                    <ArrowUpRight />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {project.flow && project.flow.length > 0 ? (
            <ol aria-label="Request path" className="mt-6 flex flex-wrap items-center gap-y-2 font-mono text-2xs">
              {project.flow.map((step, i) => (
                <li key={step} className="flex items-center">
                  {i > 0 ? <ChevronRight className="mx-1.5 size-3 text-dim" aria-hidden="true" /> : null}
                  <span className="rounded-md bg-bg px-2.5 py-1.5 text-fg/90 hairline">{step}</span>
                </li>
              ))}
            </ol>
          ) : null}

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div>
              <p className="kicker">Problem</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.problem}</p>
            </div>
            <div>
              <p className="kicker">Architecture</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{project.architecture}</p>
            </div>
          </div>

          <ul className="mt-6 grid gap-2 md:grid-cols-3">
            {project.outcomes.map((o) => (<li key={o} className="rounded-lg bg-bg px-4 py-3 text-sm leading-relaxed text-fg/90">
                {o}
              </li>
            ))}
          </ul>

          {project.evidence && project.evidence.length > 0 ? (<div className="mt-8">
              <p className="kicker mb-3">Evidence</p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {project.evidence.map((shot) => (<figure
                    key={shot.src}
                    className="overflow-hidden rounded-lg bg-bg shadow-[var(--shadow-border)]"
                  >
                    <img
                      src={shot.src}
                      alt={shot.caption}
                      className="aspect-[4/3] w-full object-cover object-top"
                      loading="lazy"
                    />
                    <figcaption className="border-t border-border px-3 py-2 font-mono text-2xs text-muted">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          ) : null}
        </article>

        <Playground key={project.id} project={project} />
      </div>
    </section>
  );
}
