import { createFileRoute } from "@tanstack/react-router";

// POST /api/contact. The `server.handlers` shape is TanStack Start's server-route API.
// The handler is imported lazily so MongoDB and the delivery code stay server-only.
export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { handleContact } = await import("@/lib/contact-server");
        return handleContact(request, { env: process.env });
      },
    },
  },
});
