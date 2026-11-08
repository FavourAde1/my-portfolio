// Usage: npm run build:resume
// Prints src/lib/content.js to public/Favour-Adeniyi-Resume.pdf using Playwright's
// Chromium (a devDependency; run `npx playwright install chromium` once if needed).

import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { renderResumeHtml } from "./resume-html.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const content = await import(pathToFileURL(path.join(root, "src/lib/content.js")).href);
const outFile = path.join(root, "public", path.basename(content.profile.resume));

const require = createRequire(import.meta.url);
const { chromium } = require("playwright");

const html = renderResumeHtml(content);
await mkdir(path.dirname(outFile), { recursive: true });

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "load" });
  await page.pdf({ path: outFile, format: "A4", printBackground: true, preferCSSPageSize: true });
} finally {
  await browser.close();
}

console.log(`Wrote ${path.relative(root, outFile)}`);
