# E-Commerce (Next.js + Supabase)

Full-stack e-commerce app, reworked from [E-Commerce](https://github.com/MontherAlzamli/E-Commerce) so it deploys on Vercel with no separate server.

- `client/` customer store. The REST API (`/api/v1/*`) runs inside this Next.js app as an API route, using the original Express routes and controllers (`client/server/`).
- `dashboard/` admin panel. It proxies `/api/v1` to the store app (`API_ORIGIN`).
- Database: Supabase Postgres through Prisma (`client/prisma/schema.prisma`).
- Stripe for payments, Cloudinary for image uploads (optional: product images can also be URLs).

Stack: Next.js 14, TypeScript, Tailwind CSS, Prisma, PostgreSQL (Supabase), JWT auth, Stripe.

## Deploy on Vercel

Two Vercel projects from this repo.

1. `client`: root directory `client`. Env vars: see `client/.env.example`. The build runs `prisma db push` and a seed (demo products, plus an admin if `ADMIN_EMAIL` and `ADMIN_PASSWORD` are set).
2. `dashboard`: root directory `dashboard`. Env var `API_ORIGIN` = the store URL.

## Run locally

```bash
cd client && cp .env.example .env && npm install && npx prisma db push && npm run seed && npm run dev
cd dashboard && npm install && API_ORIGIN=http://localhost:3000 npm run dev -- -p 3001
```
