import { test } from "node:test";
import assert from "node:assert/strict";
import {
  INTENTS,
  LIMITS,
  buildEmail,
  clientKey,
  createRateLimiter,
  isAllowedOrigin,
  validateContact,
} from "../src/lib/contact-core.js";

const good = {
  name: "Ada Obi",
  email: "ada@atlas.dev",
  intent: "Hire me",
  message: "We need an auth-first API for our product.",
};

test("accepts and normalises a valid payload", () => {
  const r = validateContact({ ...good, name: "  Ada   Obi ", message: "  hello there, friend  \r\n" });
  assert.equal(r.ok, true);
  assert.deepEqual(r.value, { ...good, name: "Ada Obi", message: "hello there, friend" });
});

test("flattens newlines in single-line fields so headers cannot be injected", () => {
  const r = validateContact({ ...good, name: "Ada\r\nBcc: victim@example.com" });
  assert.equal(r.ok, true);
  assert.equal(r.value.name, "Ada Bcc: victim@example.com");
  assert.doesNotMatch(buildEmail(r.value).subject, /[\r\n]/);
});

test("rejects emails that could carry a second address or header", () => {
  for (const email of ["a@b", "a b@c.dev", "a@b.dev,c@d.dev", "<a@b.dev>", "a@b.dev;c@d.dev", "a@b.dev\r\nBcc: x@y.z", "", "no-at-sign.dev"]) {
    const r = validateContact({ ...good, email });
    assert.equal(r.ok, false, `expected ${JSON.stringify(email)} to be rejected`);
    assert.ok(r.errors.email);
  }
});

test("strips control characters from the message", () => {
  const r = validateContact({ ...good, message: "hello\u0000 there\u0007, friend" });
  assert.equal(r.value.message, "hello there, friend");
});

test("honeypot marks the submission as spam, not as an error", () => {
  const r = validateContact({ ...good, hp_field: "http://spam.example" });
  assert.deepEqual(r, { ok: false, spam: true });
  assert.equal(validateContact({ ...good, hp_field: "   " }).ok, true);
});

test("rejects non-object and wrongly typed input", () => {
  for (const input of [null, undefined, "x", 5, [], [good]]) assert.equal(validateContact(input).ok, false);
  const r = validateContact({ name: 1, email: {}, intent: [], message: null });
  assert.deepEqual(Object.keys(r.errors).sort(), ["email", "intent", "message", "name"]);
});

test("enforces intent list and length limits", () => {
  assert.ok(validateContact({ ...good, intent: "Free money" }).errors.intent);
  for (const intent of INTENTS) assert.equal(validateContact({ ...good, intent }).ok, true);
  assert.ok(validateContact({ ...good, message: "too short" }).errors.message);
  assert.ok(validateContact({ ...good, message: "x".repeat(LIMITS.messageMax + 1) }).errors.message);
  assert.ok(validateContact({ ...good, name: "n".repeat(LIMITS.name + 1) }).errors.name);
  assert.equal(validateContact({ ...good, message: "x".repeat(LIMITS.messageMax) }).ok, true);
});

test("buildEmail is plain text and caps the subject", () => {
  const { subject, text } = buildEmail({ ...good, name: "N".repeat(200) });
  assert.equal(subject.length, 120);
  assert.match(text, /Email:\s+ada@atlas\.dev/);
  assert.match(text, /We need an auth-first API/);
  assert.doesNotMatch(text, /<[a-z]/i);
});

test("rate limiter allows `limit` hits per window, then blocks with a retry time", () => {
  let t = 1_000_000;
  const rl = createRateLimiter({ limit: 3, windowMs: 60_000, now: () => t });
  for (let i = 0; i < 3; i++) {
    assert.equal(rl.check("ip-a").allowed, true);
    t += 1000;
  }
  const blocked = rl.check("ip-a");
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.retryAfterSec, 57); // first hit was 3s ago in a 60s window
  assert.equal(rl.check("ip-b").allowed, true, "other keys are independent");
  t += 60_000;
  assert.equal(rl.check("ip-a").allowed, true, "window has passed");
});

test("blocked attempts do not extend the lockout", () => {
  let t = 0;
  const rl = createRateLimiter({ limit: 1, windowMs: 10_000, now: () => t });
  rl.check("k");
  for (let i = 0; i < 20; i++) {
    t += 400;
    rl.check("k");
  }
  t = 10_001;
  assert.equal(rl.check("k").allowed, true);
});

test("rate limiter evicts the oldest keys beyond maxKeys", () => {
  const rl = createRateLimiter({ limit: 1, maxKeys: 2 });
  rl.check("a");
  rl.check("b");
  rl.check("c"); // evicts "a"
  assert.equal(rl.check("a").allowed, true, "evicted key starts fresh");
  assert.equal(rl.check("c").allowed, false);
});

test("clientKey prefers the first x-forwarded-for entry", () => {
  assert.equal(clientKey(new Headers({ "x-forwarded-for": "1.2.3.4, 10.0.0.1" })), "1.2.3.4");
  assert.equal(clientKey(new Headers({ "x-real-ip": "5.6.7.8" })), "5.6.7.8");
  assert.equal(clientKey(new Headers()), "unknown");
});

test("isAllowedOrigin", () => {
  assert.equal(isAllowedOrigin(null, "site.dev"), true);
  assert.equal(isAllowedOrigin("https://site.dev", "site.dev"), true);
  assert.equal(isAllowedOrigin("https://evil.example", "site.dev"), false);
  assert.equal(isAllowedOrigin("not a url", "site.dev"), false);
  assert.equal(isAllowedOrigin("https://www.site.dev", "site.dev", ["https://www.site.dev"]), true);
});
