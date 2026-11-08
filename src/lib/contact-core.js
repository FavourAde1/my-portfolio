// Pure contact-form logic. No framework or network imports, so it runs in the
// browser (client-side validation), on the server (the API route), and under
// `node --test` without any install step.

export const INTENTS = ["Hire me", "Partner / invest", "Contract API", "Something else"];

export const LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 4000,
  bodyBytes: 16 * 1024,
};

// Deliberately simple: one "@", no whitespace, a dot in the domain, and none of
// the characters that could smuggle a second address or header into an email.
const EMAIL_RE = /^[^\s@<>,;"']+@[^\s@<>,;"']+\.[^\s@<>,;"']+$/;

// C0 control characters except tab (\x09), newline (\x0A) and carriage return (\x0D).
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

function singleLine(value) {
  return value.replace(CONTROL_CHARS, "").replace(/\s+/g, " ").trim();
}

function multiLine(value) {
  return value.replace(CONTROL_CHARS, "").replace(/\r\n?/g, "\n").trim();
}

/**
 * Validate and normalise a contact payload.
 *
 * Returns one of:
 *   { ok: true,  value: { name, email, intent, message } }
 *   { ok: false, errors: { field: "message" } }
 *   { ok: false, spam: true }          (honeypot field was filled in)
 */
export function validateContact(input) {
  if (input === null || typeof input !== "object" || Array.isArray(input)) {
    return { ok: false, errors: { form: "Send a JSON object." } };
  }

  // Honeypot: real visitors never see this field, so any value means a bot. The name is deliberately meaningless (not "website" or "url") so browser autofill does not fill it in for real people.
  if (typeof input.hp_field === "string" && input.hp_field.trim() !== "") {
    return { ok: false, spam: true };
  }

  const errors = {};
  for (const field of ["name", "email", "intent", "message"]) {
    if (typeof input[field] !== "string") errors[field] = "Required.";
  }
  if (Object.keys(errors).length > 0) return { ok: false, errors };

  const name = singleLine(input.name);
  const email = singleLine(input.email);
  const intent = input.intent;
  const message = multiLine(input.message);

  if (!name) errors.name = "Tell me your name.";
  else if (name.length > LIMITS.name) errors.name = `Keep your name under ${LIMITS.name} characters.`;

  if (!email) errors.email = "Add an email so I can reply.";
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = "That email does not look right.";

  if (!INTENTS.includes(intent)) errors.intent = "Pick one of the options.";

  if (message.length < LIMITS.messageMin) {
    errors.message = `Add a few more words (at least ${LIMITS.messageMin} characters).`;
  } else if (message.length > LIMITS.messageMax) {
    errors.message = `Keep it under ${LIMITS.messageMax} characters.`;
  }

  if (Object.keys(errors).length > 0) return { ok: false, errors };
  return { ok: true, value: { name, email, intent, message } };
}

/** Plain-text email. Never HTML, so nothing the visitor types can be interpreted as markup. */
export function buildEmail({ name, email, intent, message }) {
  const subject = `[${intent}] ${name}`.slice(0, 120);
  const text = [
    "New message from your portfolio",
    "",
    `Name:   ${name}`,
    `Email:  ${email}`,
    `Intent: ${intent}`,
    "",
    message,
    "",
  ].join("\n");
  return { subject, text };
}

/**
 * In-memory sliding-window limiter. On serverless hosts each instance keeps its
 * own counters, so treat this as abuse dampening rather than a hard guarantee.
 */
export function createRateLimiter({ limit = 5, windowMs = 60 * 60 * 1000, maxKeys = 5000, now = Date.now } = {}) {
  const hits = new Map();

  return {
    check(key) {
      const t = now();
      const recent = (hits.get(key) ?? []).filter((ts) => t - ts < windowMs);

      if (recent.length >= limit) {
        hits.set(key, recent);
        return { allowed: false, retryAfterSec: Math.max(1, Math.ceil((recent[0] + windowMs - t) / 1000)) };
      }

      recent.push(t);
      hits.delete(key); // re-insert so the Map's order tracks recency
      hits.set(key, recent);

      while (hits.size > maxKeys) hits.delete(hits.keys().next().value);
      return { allowed: true, remaining: limit - recent.length };
    },
  };
}

/** Best-effort client key from proxy headers; "unknown" shares one bucket. */
export function clientKey(headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim() || "unknown";
  return headers.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Browsers always send Origin on a cross-origin POST. If it is present it must
 * match this site; if it is absent the caller is not a browser (curl, a script)
 * and the rate limiter is the control that applies.
 */
export function isAllowedOrigin(origin, host, extraAllowed = []) {
  if (!origin) return true;
  let originHost;
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }
  if (host && originHost === host) return true;
  return extraAllowed.some((allowed) => {
    try {
      return new URL(allowed).host === originHost;
    } catch {
      return false;
    }
  });
}
