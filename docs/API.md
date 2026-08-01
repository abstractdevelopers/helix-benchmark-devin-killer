# SaaS Dashboard API Specification

## Authentication

The app uses Auth.js v5 (NextAuth 5) with credentials.

Required environment variables:

- `AUTH_SECRET` — random secret used by Auth.js to sign tokens
- `AUTH_URL` — the canonical origin of the app (e.g. `https://example.com`)
- `DATABASE_URL` — PostgreSQL connection string
- `STRIPE_SECRET_KEY` — Stripe secret key
- `STRIPE_WEBHOOK_SECRET` — Stripe webhook signing secret

## Routes

### `GET /api/health`

Returns `200` JSON:

```json
{ "status": "ok" }
```

### `GET /api/status`

Returns `200` JSON with service connectivity:

```json
{ "status": "ok", "database": "connected", "stripe": "configured" }
```

### `POST /api/auth/register`

Body:

```json
{ "email": "user@example.com", "password": "password", "teamName": "Acme" }
```

Creates a `Team`, `User`, and `TeamMembership` with role `admin`. Returns `201`.

### `POST /api/billing/checkout`

Requires an authenticated user with `admin` role. Returns a Stripe Checkout session URL.

### `POST /api/webhooks/stripe`

Handles `checkout.session.completed` events. Verifies the Stripe signature using `STRIPE_WEBHOOK_SECRET`.

### `GET /api/cron/usage-snapshot`

Returns the latest `UsageSnapshot` for the authenticated user's team:

```json
{ "teamId": "...", "period": "2024-07", "units": 1234, "costCents": 500 }
```
