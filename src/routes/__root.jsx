import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Favour Adeniyi — Backend Engineer";
const DESCRIPTION =
  "Favour Adeniyi is a Lagos-based backend engineer who designs authenticated APIs, data models, and CI/CD that products actually ship on.";
const OG_ALT = "Favour Adeniyi, backend engineer in Lagos: authenticated APIs, data models, CI/CD.";

// Link previews (LinkedIn, WhatsApp, X) need an absolute image URL. Set VITE_SITE_URL
// when the site moves to its own domain; the fallback is the current deployment.
const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://portfolio-history-check.vercel.app").replace(/\/+$/, "");

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "description", content: DESCRIPTION },
      { name: "theme-color", content: "#07090d" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Favour Adeniyi" },
      { property: "og:title", content: APP_NAME },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: `${SITE_URL}/og.jpg` },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: OG_ALT },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: APP_NAME },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: `${SITE_URL}/og.jpg` },
      { name: "twitter:image:alt", content: OG_ALT },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "canonical", href: SITE_URL },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  component: () => (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="page-grid bg-bg text-fg font-sans">
        <TooltipProvider delayDuration={200}>
          <Outlet />
          <Toaster
            theme="dark"
            position="bottom-right"
            toastOptions={{
              className: "font-sans",
              style: {
                background: "var(--color-elevated)",
                border: "1px solid var(--color-border)",
                color: "var(--color-fg)",
              },
            }}
          />
        </TooltipProvider>
        <Scripts />
      </body>
    </html>
  ),
});
