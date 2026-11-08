# Favour Adeniyi — Backend Engineer Portfolio

A portfolio site for a backend engineer focused on API design, authentication, data modeling, and production-ready systems.

## Stack

- React 19 + Vite
- TanStack Start / Router (file-based routes, server route for the contact API)
- Tailwind CSS 4
- Plain JavaScript (`.js` / `.jsx`, no TypeScript)

## Local development

```bash
npm install
npm run dev        # http://localhost:8080
npm test           # contact logic + résumé tests (Node's built-in runner, no extra deps)
npm run build      # production build
```

## Where things live

| What | Where |
| --- | --- |
| All copy: profile, experience, projects, skills, credentials | `src/lib/content.js` |
| Page sections | `src/components/site/*.jsx` |
| Contact API route | `src/routes/api.contact.jsx` → `src/lib/contact-server.js` |
| Validation, rate limiting, origin check (shared by browser and server) | `src/lib/contact-core.js` |
| Résumé generator | `scripts/build-resume.mjs`, `scripts/resume-html.mjs` |

## Contact form

`POST /api/contact` validates the message, rate-limits by client IP (5 per hour per server instance), rejects cross-origin browser posts, and traps bots with a hidden field. Delivery is chosen by environment variables (see `.env.example`):

- **Email** via Resend: set `RESEND_API_KEY` and `CONTACT_TO_EMAIL`. Replies go to the visitor (`reply_to`).
- **MongoDB** (optional): set `MONGODB_URI` to also store each message in `contact_messages`.

If neither is configured, or delivery fails, the page opens the visitor's mail client addressed to you, so a message is never silently lost. The rate limiter lives in memory, so on serverless hosts each instance counts separately; treat it as abuse dampening, not a hard cap.

## Résumé

`public/Favour-Adeniyi-Resume.pdf` is generated from `content.js`, so it matches the site. Regenerate it after any content change:

```bash
npx playwright install chromium   # once
npm run build:resume
```

## Proof links on projects

Each project in `content.js` can have `live`, `docs` (hosted Swagger/OpenAPI), `postman`, and `ci` URLs. The page and the résumé show only the ones that are set. Fill them in as the real URLs exist; nothing is shown for a field left out.

## Link previews

`og.jpg` and the Open Graph / Twitter tags are in `src/routes/__root.jsx`. Preview images need an absolute URL, so set `VITE_SITE_URL` once the site is on its own domain.

## Secrets

Never commit `.env`. It is in `.gitignore`; if one was ever committed to any repo, rotate every value in it, because deleting the file does not remove it from git history.
