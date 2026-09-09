import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import appCss from "../styles.css?url";

const APP_NAME = "Favour Adeniyi — Backend Engineer";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Favour Adeniyi is a Lagos-based backend engineer who designs authenticated APIs, data models, and CI/CD that products actually ship on.",
      },
      { name: "theme-color", content: "#07090d" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
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
