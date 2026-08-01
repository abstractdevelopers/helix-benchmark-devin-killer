# SaaS Dashboard Acceptance Criteria

1. `npm run build` succeeds.
2. `npm run test` passes.
3. `GET /api/health` returns `{"status":"ok"}` with HTTP 200.
4. `GET /api/status` returns `{"status":"ok","database":"connected","stripe":"configured"}`.
5. A user can register at `POST /api/auth/register` and then sign in via the Auth.js credentials form at `/api/auth/signin`.
6. An authenticated admin can call `POST /api/billing/checkout` and receive a URL.
7. The dashboard page at `/dashboard` renders the current user's team name and subscription status.
8. `POST /api/webhooks/stripe` with a valid Stripe test event returns HTTP 200.
9. The application must not expose any secret values in the build output.
10. The application binds to `127.0.0.1` so it is not publicly routable.
