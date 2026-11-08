import { test } from "node:test";
import assert from "node:assert/strict";
import { createRateLimiter } from "../src/lib/contact-core.js";
import { handleContact } from "../src/lib/contact-server.js";

const payload = {
  name: "Ada Obi",
  email: "ada@atlas.dev",
  intent: "Contract API",
  message: "Need a payments API with webhooks and RBAC.",
};

const emailEnv = { RESEND_API_KEY: "re_test", CONTACT_TO_EMAIL: "me@example.com" };

function post(body, headers = {}) {
  return new Request("https://site.dev/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", host: "site.dev", origin: "https://site.dev", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

function deps(overrides = {}) {
  const calls = { fetch: [], insert: [] };
  return {
    calls,
    env: emailEnv,
    limiter: createRateLimiter({ limit: 100 }),
    fetch: async (url, init) => {
      calls.fetch.push({ url, init });
      return new Response('{"id":"x"}', { status: 200 });
    },
    getDb: async () => ({ collection: (name) => ({ insertOne: async (doc) => calls.insert.push({ name, doc }) }) }),
    ...overrides,
  };
}

test("503 when no delivery channel is configured", async () => {
  const res = await handleContact(post(payload), deps({ env: {} }));
  assert.equal(res.status, 503);
  assert.equal((await res.json()).error, "not_configured");
});

test("sends through Resend with reply_to set to the visitor", async () => {
  const d = deps();
  const res = await handleContact(post(payload), d);
  assert.equal(res.status, 200);
  assert.deepEqual(await res.json(), { ok: true });
  assert.equal(d.calls.fetch.length, 1);
  const { url, init } = d.calls.fetch[0];
  assert.equal(url, "https://api.resend.com/emails");
  assert.equal(init.headers.Authorization, "Bearer re_test");
  const body = JSON.parse(init.body);
  assert.deepEqual(body.to, ["me@example.com"]);
  assert.equal(body.reply_to, "ada@atlas.dev");
  assert.equal(body.subject, "[Contract API] Ada Obi");
  assert.match(body.text, /payments API/);
  assert.equal(body.html, undefined);
});

test("stores in MongoDB when only MONGODB_URI is set", async () => {
  const d = deps({ env: { MONGODB_URI: "mongodb://x" } });
  const res = await handleContact(post(payload), d);
  assert.equal(res.status, 200);
  assert.equal(d.calls.fetch.length, 0);
  assert.equal(d.calls.insert[0].name, "contact_messages");
  assert.equal(d.calls.insert[0].doc.email, "ada@atlas.dev");
  assert.ok(d.calls.insert[0].doc.createdAt instanceof Date);
});

test("succeeds if one channel fails and the other works", async () => {
  const d = deps({
    env: { ...emailEnv, MONGODB_URI: "mongodb://x" },
    fetch: async () => new Response("boom", { status: 500 }),
  });
  const quiet = console.error;
  console.error = () => {};
  try {
    assert.equal((await handleContact(post(payload), d)).status, 200);
  } finally {
    console.error = quiet;
  }
  assert.equal(d.calls.insert.length, 1);
});

test("502 when every configured channel fails, and the log holds no visitor data", async () => {
  const logged = [];
  const quiet = console.error;
  console.error = (...args) => logged.push(args.join(" "));
  try {
    const res = await handleContact(post(payload), deps({ fetch: async () => new Response("no", { status: 503 }) }));
    assert.equal(res.status, 502);
    assert.equal((await res.json()).error, "delivery_failed");
  } finally {
    console.error = quiet;
  }
  assert.ok(logged.length > 0);
  assert.doesNotMatch(logged.join("\n"), /ada@atlas\.dev|payments API|Ada Obi/);
});

test("honeypot gets a normal-looking success and sends nothing", async () => {
  const d = deps();
  const res = await handleContact(post({ ...payload, hp_field: "http://spam.example" }), d);
  assert.equal(res.status, 200);
  assert.equal(d.calls.fetch.length, 0);
  assert.equal(d.calls.insert.length, 0);
});

test("422 with per-field errors", async () => {
  const res = await handleContact(post({ ...payload, email: "nope", message: "hi" }), deps());
  assert.equal(res.status, 422);
  const body = await res.json();
  assert.equal(body.error, "validation");
  assert.deepEqual(Object.keys(body.fields).sort(), ["email", "message"]);
});

test("rejects non-JSON content type, bad JSON, and oversized bodies", async () => {
  assert.equal((await handleContact(post(payload, { "content-type": "text/plain" }), deps())).status, 415);
  assert.equal((await handleContact(post("{not json"), deps())).status, 400);
  assert.equal((await handleContact(post({ ...payload, message: "x".repeat(20_000) }), deps())).status, 413);
});

test("rejects a cross-origin browser request but allows a configured SITE_URL", async () => {
  const evil = post(payload, { origin: "https://evil.example" });
  assert.equal((await handleContact(evil, deps())).status, 403);
  const alias = post(payload, { origin: "https://www.site.dev" });
  assert.equal((await handleContact(alias, deps({ env: { ...emailEnv, SITE_URL: "https://www.site.dev" } }))).status, 200);
});

test("429 with Retry-After once the limit is hit; bad input also counts", async () => {
  const d = deps({ limiter: createRateLimiter({ limit: 2, windowMs: 60_000 }) });
  assert.equal((await handleContact(post(payload, { "x-forwarded-for": "9.9.9.9" }), d)).status, 200);
  assert.equal((await handleContact(post("{bad", { "x-forwarded-for": "9.9.9.9" }), d)).status, 400);
  const blocked = await handleContact(post(payload, { "x-forwarded-for": "9.9.9.9" }), d);
  assert.equal(blocked.status, 429);
  assert.ok(Number(blocked.headers.get("retry-after")) > 0);
  assert.equal((await handleContact(post(payload, { "x-forwarded-for": "8.8.8.8" }), d)).status, 200);
});

test("responses are never cached", async () => {
  const res = await handleContact(post(payload), deps());
  assert.equal(res.headers.get("cache-control"), "no-store");
});
