# SaaS Dashboard Design

## Architecture

A multi-tenant SaaS dashboard built with Next.js 15, Auth.js v5, Prisma, and PostgreSQL.

## Authentication

- Auth.js v5 credentials provider with email/password.
- Roles: `admin`, `member`, `viewer`.
- JWT session strategy with role and team id embedded in the token.
- `AUTH_SECRET` and `AUTH_URL` environment variables.

## Database

- PostgreSQL via Prisma ORM.
- Models: `User`, `Team`, `TeamMembership`, `Subscription`, `UsageSnapshot`.
- Tenant isolation by `teamId` on `TeamMembership` and `Subscription`.

## Pages

- `/` — landing / login CTA
- `/dashboard` — protected server component showing team name, subscription status, and latest usage snapshot

## API

- `POST /api/auth/[...nextauth]` — Auth.js route handlers
- `POST /api/auth/register` — create a team + user
- `GET /api/health` — liveness
- `GET /api/status` — database and Stripe connectivity
- `POST /api/billing/checkout` — create Stripe Checkout session
- `POST /api/webhooks/stripe` — Stripe webhook handler
- `GET /api/cron/usage-snapshot` — returns current usage snapshot JSON

## Deployment

- Node.js 20 runtime.
- Next.js `output: "standalone"` for the Docker image.
- `npm run build` should run `prisma generate` before `next build`.
