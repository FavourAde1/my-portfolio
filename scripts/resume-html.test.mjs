import { test } from "node:test";
import assert from "node:assert/strict";
import * as content from "../src/lib/content.js";
import { renderResumeHtml } from "./resume-html.mjs";

const html = renderResumeHtml(content);

test("résumé carries every role, project, school and contact detail from content.js", () => {
  for (const job of content.experience) {
    assert.ok(html.includes(job.role.replace(/&/g, "&amp;")), `missing role: ${job.role}`);
    for (const point of job.points) assert.ok(html.includes(point.replace(/&/g, "&amp;")), `missing bullet: ${point}`);
  }
  for (const project of content.projects) assert.ok(html.includes(project.name));
  for (const ed of content.education) assert.ok(html.includes(ed.title));
  assert.ok(html.includes(content.profile.email));
  assert.ok(html.includes(content.profile.phone));
});

test("résumé lists skills by name only, with no self-rated levels", () => {
  assert.ok(html.includes("JavaScript / Node.js"));
  assert.doesNotMatch(html, /\d{2}%/);
});

test("content is HTML-escaped", () => {
  const evil = renderResumeHtml({
    ...content,
    profile: { ...content.profile, displayName: '<img src=x onerror="alert(1)">' },
  });
  assert.doesNotMatch(evil, /<img src=x/);
  assert.match(evil, /&lt;img src=x onerror=&quot;alert\(1\)&quot;&gt;/);
});

test("only proof links that exist are printed", () => {
  const withDocs = renderResumeHtml({
    ...content,
    projects: [{ ...content.projects[1], docs: "https://docs.example.dev/api" }],
  });
  assert.ok(withDocs.includes("docs.example.dev/api"));
  assert.doesNotMatch(html, /undefined|null/);
});
