import { ArrowDownRight, Download, MapPin } from "lucide-react";
import { metrics, profile, requestLog } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { scrollToId } from "@/lib/utils";

function RequestTape() {
  const loop = [...requestLog, ...requestLog];
  return (
    <div className="relative overflow-hidden rounded-lg bg-bg hairline">
      <div className="flex items-center justify-between border-b border-border px-3 py-2">
        <span className="kicker">live.request.log</span>
        <span className="flex items-center gap-1.5 font-mono text-2xs text-ok">
          <span className="size-1.5 rounded-full bg-ok motion-safe-only" style={{ animation: "pulse-dot 1.6s ease-in-out infinite" }} />
          200 OK
        </span>
      </div>
      <div className="relative h-40 overflow-hidden">
        <div
          className="motion-safe-only flex flex-col gap-1 px-3 py-2"
          style={{ animation: "log-scroll 18s linear infinite" }}
        >
          {loop.map((row, i) => (
            <div key={`${row.path}-${i}`} className="grid grid-cols-[auto_3.4rem_1fr_auto] items-center gap-2 font-mono text-2xs">
              <span className="text-dim tabular-nums">{row.t}</span>
              <span
                className={
                  row.method === "GET"
                    ? "text-method-get"
                    : row.method === "POST"
                      ? "text-method-post"
                      : "text-method-patch"
                }
              >
                {row.method}
              </span>
              <span className="truncate text-muted">{row.path}</span>
              <span className="text-ok tabular-nums">{row.ms}ms</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative">
      <div className="wrap section-pad grid gap-10 py-12 md:grid-cols-[1.15fr_0.85fr] md:items-end md:py-20">
        <div className="rise-in">
          <p className="kicker mb-5">{profile.kicker}</p>
          <h1 className="text-4xl font-semibold tracking-tight text-fg sm:text-5xl md:text-6xl md:leading-none">
            {profile.firstName}
            <br />
            {profile.lastName}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.lede}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button size="lg" onClick={() => scrollToId("contact")}>
              Start a conversation
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToId("systems")}>
              Inspect systems
              <ArrowDownRight />
            </Button>
            <Button size="lg" variant="ghost" asChild>
              <a href={profile.resume} download>
                Résumé
                <Download />
              </a>
            </Button>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
            <span className="inline-flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inset-0 rounded-full bg-ok opacity-60 motion-safe-only" style={{ animation: "pulse-dot 1.8s ease-in-out infinite" }} />
                <span className="relative size-2 rounded-full bg-ok" />
              </span>
              Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {profile.location}
            </span>
            <span className="font-mono text-xs tracking-wide text-dim">NODE · EXPRESS · SQL · JWT</span>
          </div>
        </div>

        <div className="rise-in" style={{ animationDelay: "80ms" }}>
          <div className="rounded-xl bg-elevated p-3 shadow-[var(--shadow-border)] md:p-4">
            <div className="flex items-center gap-4 rounded-lg bg-bg p-3">
              <img
                src="/portrait.jpg"
                alt="Favour Oluwaseun Adeniyi"
                width={160}
                height={160}
                className="portrait size-20 shrink-0 rounded-md outline outline-1 -outline-offset-1 outline-fg/10 sm:size-24"
              />
              <div className="min-w-0">
                <p className="font-mono text-2xs tracking-widest text-accent uppercase">Backend engineer</p>
                <p className="mt-1 truncate text-base font-medium text-fg">{profile.displayName}</p>
                <p className="mt-1 text-xs text-muted">{profile.location}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-ok/15 px-2 py-0.5 font-mono text-2xs text-ok">
                  <span className="size-1.5 rounded-full bg-ok" />
                  OPEN TO WORK
                </span>
              </div>
            </div>
            <div className="mt-3">
              <RequestTape />
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-border bg-surface/60">
        <div className="wrap section-pad grid grid-cols-2 md:grid-cols-4">
          {metrics.map((m, i) => (
            <div
              key={m.label}
              className={i === metrics.length - 1 ? "px-0 py-6 md:px-6" : "border-border px-0 py-6 md:border-r md:px-6"}
            >
              <p className="font-mono text-2xl tracking-tight text-fg tabular-nums">{m.value}</p>
              <p className="mt-1 max-w-[14ch] text-sm text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
