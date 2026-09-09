# Northgate AI — Backend

Next.js Route Handlers in the same repo as the frontend, backed by PostgreSQL via
Prisma. JWT auth with bcrypt, Zod validation, and an assistant endpoint that calls
the Anthropic API with the caller's company context injected.

## Setup

**1. PostgreSQL.** Needs a running server. If you installed it with Homebrew:

```bash
LC_ALL=C /opt/homebrew/opt/postgresql@15/bin/pg_ctl -D /opt/homebrew/var/postgresql@15 -l /tmp/pglogs/pg.log start
```

`LC_ALL=C` is required on macOS — without it the postmaster fails with
"became multithreaded during startup". (`brew services start` is the usual route,
but it is currently broken on this machine with an unrelated Homebrew bug.)

Then create the database:

```bash
createdb northgate
```

**2. Environment.** Copy the example and fill it in:

```bash
cp .env.example .env
```

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Postgres connection string |
| `JWT_SECRET` | Signs JWTs. Must be 16+ characters; the app refuses to start signing without it |
| `ANTHROPIC_API_KEY` | Required by `/api/assistant`. Without it that endpoint returns 503 and everything else still works |
| `FRONTEND_ORIGIN` | CORS allowlist. Defaults to `http://localhost:3000` |

**3. Migrate and seed.**

```bash
npm install
npx prisma migrate dev
npx prisma db seed
```

Seeds 3 provinces (Ontario, British Columbia, Alberta), 20 licence items, and
10 partners. The seed is idempotent — re-running replaces reference data rather
than duplicating it.

**4. Run.**

```bash
npm run dev
```

API at `http://localhost:3000/api`. Use `requests.http` (VS Code REST Client or
JetBrains HTTP Client) to exercise every endpoint.

## Endpoints

Auth is a bearer token: `Authorization: Bearer <jwt>`.

| Method | Path | Auth | Purpose |
|---|---|:--:|---|
| POST | `/api/auth/signup` | – | Creates User + Company, returns JWT |
| POST | `/api/auth/login` | – | Returns JWT |
| GET | `/api/auth/me` | ✓ | Current user + company |
| PATCH | `/api/company` | ✓ | Update company profile |
| GET | `/api/provinces` | – | All provinces with licence counts |
| GET | `/api/provinces/:code` | opt | Province + licence items; adds per-user checklist state when authenticated |
| PATCH | `/api/licence-items/:id/checklist` | ✓ | Toggle onto checklist. Empty body flips; `{"completed":true}` sets |
| GET | `/api/checklist` | ✓ | Checklist grouped by province with completion percentages |
| GET | `/api/partners?province=&type=` | – | Filterable partner list |
| POST | `/api/assistant` | ✓ | Grounded assistant reply; persists both turns |
| GET | `/api/assistant/history` | ✓ | Chat history, oldest first |

Every route also answers `OPTIONS` for CORS preflight.

## Errors

Consistent shape across every endpoint:

```json
{ "error": "Validation failed", "fields": { "email": "Must be a valid email address" } }
```

`fields` appears only on validation failures. Codes: **400** validation or
malformed JSON, **401** missing/invalid token, **404** missing resource,
**409** duplicate email, **429** rate limit, **502/503** assistant upstream or
unconfigured, **500** unexpected. Stack traces are logged server-side and never
returned.

## The assistant endpoint

`POST /api/assistant` does five things:

1. Loads the caller's company profile from Postgres.
2. Loads the provincial overviews and licence items for their target provinces
   (falling back to all provinces if none are selected), so answers are grounded
   in real rows rather than model recall.
3. Loads the last 10 chat messages for continuity.
4. Calls the Messages API with a two-part system prompt — a stable role prompt
   carrying the cache breakpoint, then the per-company context after it, so a
   change of user does not evict the cached prefix.
5. Persists the user message and the reply, **only after a successful call**, so
   a failure never strands a question without an answer.

**Model.** `claude-sonnet-4-6`, as specified. Override without touching code by
setting `ANTHROPIC_MODEL`. Worth knowing: `claude-sonnet-5` is newer *and*
cheaper ($2/$10 per MTok vs $3/$15).

**Rate limit.** 20 requests per user per hour. The counter is consumed
immediately before the paid call — not at the top of the handler — so rejected
or malformed requests never burn a user's quota. It is an in-memory fixed
window: fine for a single-process MVP, but it resets on restart and is not
shared across instances. Swap for Redis before running more than one server.

## Adding Modules 2 and 3

Funding Copilot and Diaspora Bridge are deliberately absent. To add one: new
models in `prisma/schema.prisma`, a migration, and a new route group under
`app/api/`. Nothing in the existing auth, validation, or error-handling layer
needs to change — `withErrorHandling`, `parseBody`, and `getAuthedUser` are
already generic.

## Layout

```
app/api/…                 Route handlers, one folder per endpoint
lib/db.ts                 Prisma client singleton (survives dev hot-reload)
lib/auth.ts               bcrypt hashing, JWT sign/verify, bearer extraction
lib/validation.ts         Zod schemas + ZodError → field-error flattening
lib/api.ts                Response helpers, CORS, error-handling wrapper
lib/rate-limit.ts         In-memory fixed-window limiter
lib/anthropic.ts          Anthropic client + system prompt builder
prisma/schema.prisma      7 models
prisma/seed.ts            Reference data
requests.http             Manual test collection for every endpoint
```

Note: Prisma 7 generates its client to `generated/` (gitignored) and reads the
database URL from `prisma.config.ts` rather than the schema — both are
deliberate, not leftovers.
