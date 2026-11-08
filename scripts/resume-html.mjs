// Renders the résumé as HTML from the same content the site uses, so the PDF and
// the page cannot drift apart. Pure function: no I/O, no browser, easy to test.

const esc = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const bare = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const link = (url) => `<a href="${esc(url)}">${esc(bare(url))}</a>`;

const CSS = `
  @page { size: A4; margin: 13mm 15mm; }
  * { box-sizing: border-box; }
  body { margin: 0; color: #1a1f24; font: 9.4pt/1.4 "Helvetica Neue", Helvetica, Arial, sans-serif; }
  a { color: #1f4d47; text-decoration: none; }
  h1 { margin: 0; font-size: 21pt; letter-spacing: -0.01em; }
  .title { margin: 1px 0 0; font-size: 11pt; color: #3c4a48; }
  .contact { margin: 6px 0 0; color: #3c4a48; }
  .contact span:not(:last-child)::after { content: "  ·"; color: #98a3a1; white-space: pre; }
  .contact span { margin-right: 4px; white-space: nowrap; }
  h2 { margin: 15px 0 6px; padding-bottom: 3px; border-bottom: 1px solid #c9d1d0; font-size: 8.6pt; letter-spacing: 0.14em; text-transform: uppercase; color: #1f4d47; }
  .entry { margin: 0 0 9px; break-inside: avoid; }
  .row { display: flex; justify-content: space-between; gap: 12px; align-items: baseline; }
  .role { font-weight: 700; }
  .org { color: #3c4a48; }
  .when { color: #5b6967; white-space: nowrap; font-size: 8.8pt; }
  .meta { margin: 1px 0 0; color: #5b6967; font-size: 8.8pt; }
  ul { margin: 3px 0 0; padding-left: 15px; }
  li { margin: 0 0 1.5px; }
  p { margin: 0; }
  .skills p { margin: 0 0 2px; }
  .skills b { display: inline-block; min-width: 82px; }
`;

function experienceBlock(job) {
  const meta = [job.location, job.note].filter(Boolean).map(esc).join(" · ");
  return `
    <div class="entry">
      <div class="row"><span><span class="role">${esc(job.role)}</span> <span class="org">— ${esc(job.org)}</span></span><span class="when">${esc(job.period)}</span></div>
      <p class="meta">${meta}</p>
      <ul>${job.points.map((point) => `<li>${esc(point)}</li>`).join("")}</ul>
    </div>`;
}

function projectBlock(project) {
  const links = [project.live, project.docs, project.repo].filter(Boolean).map(link).join(" · ");
  return `
    <div class="entry">
      <div class="row"><span><span class="role">${esc(project.name)}</span> <span class="org">— ${esc(project.status)}</span></span></div>
      <p class="meta">${esc(project.stack.join(" · "))}</p>
      <p>${esc(project.problem)}</p>
      <ul>${project.outcomes.slice(0, 2).map((outcome) => `<li>${esc(outcome)}</li>`).join("")}</ul>
      <p class="meta">${links}</p>
    </div>`;
}

export function renderResumeHtml({ profile, experience, projects, stackGroups, education, certifications, languages }) {
  const contact = [
    esc(profile.location),
    `<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>`,
    `<a href="${esc(profile.phoneHref)}">${esc(profile.phone)}</a>`,
    link(profile.github),
    link(profile.linkedin),
  ];

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${esc(profile.displayName)} — Résumé</title>
  <style>${CSS}</style>
</head>
<body>
  <h1>${esc(profile.displayName)}</h1>
  <p class="title">${esc(profile.title)}</p>
  <p class="contact">${contact.map((part) => `<span>${part}</span>`).join("")}</p>

  <h2>Summary</h2>
  <p>${esc(profile.lede)}</p>

  <h2>Experience</h2>
  ${experience.map(experienceBlock).join("")}

  <h2>Projects</h2>
  ${projects.map(projectBlock).join("")}

  <h2>Skills</h2>
  <div class="skills">
    ${stackGroups.map((group) => `<p><b>${esc(group.title)}</b>${esc(group.items.map((item) => item.name).join(", "))}</p>`).join("")}
  </div>

  <h2>Education</h2>
  ${education
    .map(
      (ed) => `<div class="entry"><div class="row"><span><span class="role">${esc(ed.title)}</span></span><span class="when">${esc(ed.period)}</span></div><p class="meta">${esc(ed.school)}</p></div>`,
    )
    .join("")}

  <h2>Certifications</h2>
  <p>${certifications.map((cert) => `${esc(cert.name)} (${esc(cert.org)})`).join(" · ")}</p>

  <h2>Languages</h2>
  <p>${languages.map((lang) => `${esc(lang.name)} (${esc(lang.level)})`).join(" · ")}</p>
</body>
</html>`;
}
