import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/site-shell";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SiteShell />;
}
