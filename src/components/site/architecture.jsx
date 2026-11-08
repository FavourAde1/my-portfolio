import { useState } from "react";
import { pipeline } from "@/lib/content";
import { cn } from "@/lib/utils";

const details = {
  edge: "Anything that speaks HTTP. The contract is the product — stable paths, predictable errors, pagination that does not break clients.",
  proxy: "Nginx terminates TLS and reverse-proxies to the Node process. Health checks and process managers keep deploys boring.",
  app: "Express (or Nest when the domain needs modules). Route modules, not a single file of handlers. OpenAPI generated from the same surface.",
  auth: "JWT at the edge of the app, RBAC at the handler. Public routes are explicit. Secrets never live in the client.",
  svc: "Domain logic stays out of the transport layer. Payments, mail, and reports are services with their own failure modes.",
  data: "Mongo when the document fits, MySQL or Postgres when the ledger needs relations, Redis when the hot path needs a cache.",
};

export function Architecture() {
  const [active, setActive] = useState("auth");

  return (
    <section className="wrap section-pad py-16 md:py-24">
      <div className="mb-10">
        <p className="kicker">Control plane</p>
        <h2 className="mt-3 max-w-xl text-3xl font-semibold tracking-tight">
          How a request moves through a system I design.
        </h2>
      </div>

      <div className="overflow-hidden rounded-xl bg-elevated p-4 shadow-[var(--shadow-border)] md:p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {pipeline.map((node, i) => (
            <button
              key={node.id}
              type="button"
              onClick={() => setActive(node.id)}
              className={cn(
                "flex min-h-16 flex-1 flex-col justify-center rounded-lg px-4 py-3 text-left transition-[background-color,box-shadow,color] duration-150",
                active === node.id ? "bg-accent text-accent-foreground" : "bg-bg text-fg hairline hairline-hover",
              )}
            >
              <span className="font-mono text-2xs tracking-widest uppercase opacity-70">
                0{i + 1}
              </span>
              <span className="mt-1 text-sm font-medium">{node.label}</span>
              <span className={cn("mt-0.5 text-xs", active === node.id ? "opacity-80" : "text-muted")}>
                {node.detail}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted">{details[active]}</p>
      </div>
    </section>
  );
}
