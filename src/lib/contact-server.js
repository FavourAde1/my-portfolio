// Server-side handler for POST /api/contact.
//
// Delivery is configured entirely through environment variables:
//   RESEND_API_KEY + CONTACT_TO_EMAIL   -> send an email through Resend
//   MONGODB_URI                         -> also store the message in MongoDB
// With neither set the endpoint answers 503 "not_configured" and the page falls
// back to opening the visitor's mail client, so the form never silently drops mail.

import {
  LIMITS,
  buildEmail,
  clientKey,
  createRateLimiter,
  isAllowedOrigin,
  validateContact,
} from "./contact-core.js";

const defaultLimiter = createRateLimiter();

function json(body, status = 200, headers = {}) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

async function sendEmail(value, env, fetchImpl) {
  const { subject, text } = buildEmail(value);
  const res = await fetchImpl("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
      to: [env.CONTACT_TO_EMAIL],
      subject,
      text,
      reply_to: value.email,
    }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`resend responded ${res.status}`);
}

async function saveMessage(value, getDb) {
  const db = await getDb();
  await db.collection("contact_messages").insertOne({ ...value, createdAt: new Date() });
}

/**
 * @param {Request} request
 * @param {object}  deps  Injectable for tests; production passes only { env }.
 */
export async function handleContact(request, deps = {}) {
  const {
    env = {},
    fetch: fetchImpl = fetch,
    limiter = defaultLimiter,
    getDb = async () => (await import("./mongodb.js")).getDb(),
  } = deps;

  const emailConfigured = Boolean(env.RESEND_API_KEY && env.CONTACT_TO_EMAIL);
  const storeConfigured = Boolean(env.MONGODB_URI);
  if (!emailConfigured && !storeConfigured) return json({ error: "not_configured" }, 503);

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return json({ error: "unsupported_media_type" }, 415);
  }

  const extraOrigins = env.SITE_URL ? [env.SITE_URL] : [];
  if (!isAllowedOrigin(request.headers.get("origin"), request.headers.get("host"), extraOrigins)) {
    return json({ error: "forbidden_origin" }, 403);
  }

  const verdict = limiter.check(clientKey(request.headers));
  if (!verdict.allowed) {
    return json({ error: "rate_limited" }, 429, { "Retry-After": String(verdict.retryAfterSec) });
  }

  const declared = Number(request.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > LIMITS.bodyBytes) return json({ error: "too_large" }, 413);
  const raw = await request.text();
  if (raw.length > LIMITS.bodyBytes) return json({ error: "too_large" }, 413);

  let payload;
  try {
    payload = JSON.parse(raw);
  } catch {
    return json({ error: "invalid_json" }, 400);
  }

  const result = validateContact(payload);
  // Bots get the same "success" a person would, so they have nothing to adapt to.
  if (result.spam) return json({ ok: true });
  if (!result.ok) return json({ error: "validation", fields: result.errors }, 422);

  const jobs = [];
  if (emailConfigured) jobs.push(sendEmail(result.value, env, fetchImpl));
  if (storeConfigured) jobs.push(saveMessage(result.value, getDb));

  const settled = await Promise.allSettled(jobs);
  for (const job of settled) {
    // Log the failure reason only, never the visitor's message or address.
    if (job.status === "rejected") console.error("[contact] delivery step failed:", job.reason?.message ?? "unknown");
  }
  if (!settled.some((job) => job.status === "fulfilled")) return json({ error: "delivery_failed" }, 502);

  return json({ ok: true });
}
