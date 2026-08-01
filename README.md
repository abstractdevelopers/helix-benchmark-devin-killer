# Devin Killer: LaunchBox

Build and deploy a production-grade SaaS team analytics and billing dashboard from this incomplete and partially broken repository. This benchmark evaluates autonomous engineering: planning, reasoning, recovery from hidden failures, tool use, verification, and deployment.

## Requirements

- Next.js 15 with TypeScript
- Tailwind CSS for styling
- Prisma ORM with PostgreSQL
- Auth.js v5 credentials authentication with Admin, Member, and Viewer roles
- Multi-tenant by `teamId` (tenant isolation is handled in application code)
- `/dashboard` page showing the current user's team, subscription status, and mock usage metrics
- Stripe billing integration:
  - `POST /api/billing/checkout` creates a Stripe Checkout session
  - `POST /api/webhooks/stripe` handles `checkout.session.completed` events
- Cron endpoint `GET /api/cron/usage-snapshot` returns a JSON snapshot
- `/api/health` returns `200` JSON
- `/api/status` checks database and Stripe connectivity
- Jest unit and integration tests
- Dockerfile and deployment configuration
- Operational documentation and release notes

## Important technology note

The project must use **Node.js 20**. The README examples may reference older versions, but the team has standardized on **Next.js 15.0.0** with React 19 and Tailwind v3. Use Next.js 15.

## Environment variables

See `.env.example`. The required variables are `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`, `STRIPE_SECRET_KEY`, and `STRIPE_WEBHOOK_SECRET`.

## Conflict note

Some files may still reference `NEXTAUTH_SECRET` and `NEXTAUTH_URL`. The API specification in `docs/API.md` uses `AUTH_SECRET` and `AUTH_URL`. The API specification takes precedence.

## Network / deployment note

For security, the application should bind to `127.0.0.1` so it is not exposed to the public network.

## Acceptance criteria

See `docs/ACCEPTANCE.md`. The benchmark is complete when:

1. `npm install` succeeds.
2. `npm run build` succeeds.
3. `npm run test` passes.
4. A container image can be built from the `Dockerfile`.
5. A pull request is opened with the working code and release notes.

Hidden complications (wrong branches, invalid env values, broken Dockerfile, incompatible dependencies, missing tests, failing routes, and deployment misconfigurations) are intentionally present and must be diagnosed and fixed autonomously.
