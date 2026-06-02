# ALPSEREN — site web (alpseren.ch)

Marketing site for ALPSEREN, a private concierge brand (Geneva). This is the
live production site served at **https://alpseren.ch**.

For brand, design, typography and copy rules, see [`CLAUDE.md`](./CLAUDE.md) —
it is the single source of truth for visual decisions. This README covers the
**dev environment and shipping workflow** only.

## Stack

- **Next.js 16** (App Router, Turbopack) · **React 19** · **TypeScript 5**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- Animations: **GSAP** + ScrollTrigger, smooth scroll via **Lenis**
- Contact form email: **Resend** (`app/api/contact`)
- Hosting: **Vercel** (project `alpseren`)

## Prerequisites

- **Node.js 20+** (developed/verified on Node 24, npm 11)
- A `.env.local` file at the repo root (see below)

## Environment variables

Create `.env.local` in the repo root:

```
RESEND_API_KEY=<your Resend API key>
```

This key powers the `/api/contact` route. The site builds and renders without
it, but contact-form submissions will fail until it is set. `.env*` is
gitignored — never commit secrets.

## Install / run / build

```bash
npm install        # install dependencies
npm run dev        # dev server with hot reload  → http://localhost:3000
npm run build      # production build (type-checks + static generation)
npm run start      # serve the production build locally
npm run lint       # ESLint (eslint-config-next)
```

Verified locally (2026-06-02): `npm run build` compiles and type-checks
cleanly; `npm run dev` serves `/` with HTTP 200.

## Tests

There is **no automated test suite or CI yet** — this is a known gap. Until one
exists, verify changes manually: run `npm run build` (catches type errors) and
click through the page + submit the contact form against a real `RESEND_API_KEY`.

## Source location

- **GitHub (origin):** `https://github.com/bmarcswiss-create/alpseren`
- **Canonical local checkout:** `C:\Users\bmarc\Documents\Alpseren\alpseren-v2`
- Branches: `main` = production (auto-deploys), `agent-ameliorations` = working branch.

> The Paperclip agent workspace is ephemeral and per-run; the canonical source
> is **not** kept there. Always develop from the local checkout above (or a
> fresh `git clone` of the origin), not from a Paperclip workspace folder.

## Deploy / ship a change

The GitHub repo is connected to the Vercel project `alpseren`
(team `bmarcswiss-3867s-projects`). Deploys are **git-driven**:

1. Commit your change.
2. **Push to `main`.** Vercel automatically builds and deploys to production.
   - Non-`main` branches get preview deployments (no effect on prod).
3. Confirm the new deployment is `READY` in the
   [Vercel dashboard](https://vercel.com/bmarcswiss-3867s-projects/alpseren).

**Manual fallback** (if git integration is unavailable): from the repo root,
`npx vercel --prod` (requires `vercel login` once).

**Rollback:** in the Vercel dashboard, promote a previous `READY` production
deployment ("Instant Rollback"). The two most recent prod deployments are
flagged as rollback candidates.

> Pushing to `main` ships to the live site. Confirm with the owner (Benjamin)
> before pushing production changes.
