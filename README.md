# Favour Adeniyi — Backend Engineer Portfolio

A portfolio site for a backend engineer focused on API design, authentication, data modeling, and production-ready systems.

## Stack

- React + Vite
- TanStack Router
- Tailwind CSS
- TypeScript

## Local development

```bash
npm install
npm run dev
```

The app runs on port 8080.

## Production build

```bash
npm run build
```

## Render deployment

Create a Render **Web Service** with these settings:

```text
Build Command: npm ci && npm run build
Start Command: npm start
```

The service listens on Render's `PORT` automatically. No environment variables are required for the current portfolio.

## Notes

This repository contains the portfolio source and excludes local generated artifacts.
