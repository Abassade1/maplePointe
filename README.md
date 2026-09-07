# Northgate AI — Market-Entry Navigator (MVP)

A clickable, demo-ready frontend for Northgate AI's **Module 1: Market-Entry Navigator** — a tool
that helps foreign SMEs work out how to enter the Canadian market.

No backend. All data is mocked and all state is client-side.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Demo path

1. **Landing** (`/`) — problem framing, how it works, fictional social proof.
2. **Onboarding** (`/onboarding`) — 4 steps: company basics → product → provinces → goals.
3. **Dashboard** (`/dashboard`) — readiness score, open items, suggested next step, profile summary.
4. **Guide** (`/dashboard/guide`) — pick a province, read the overview, expand a licence, hit
   **Mark as reviewed**.
5. **Checklist** (`/dashboard/checklist`) — the items you marked, grouped by province, with a
   progress bar. Ticking items moves the dashboard readiness score.
6. **Assistant** (`/dashboard/assistant`) — try a starter chip, or ask about Quebec, licensing,
   tax, partners, costs, or timelines.
7. **Partners** (`/dashboard/partners`) — filter by province and type, request an intro.

To reset the demo, clear the `northgate-ai-store` key from local storage.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui-style components on Radix ·
lucide-react · Zustand (persisted to local storage).

## Structure

```
app/                    Routes (landing, onboarding, dashboard + 4 sub-screens)
components/ui/          Base primitives (button, card, select, accordion, sheet, toast, …)
components/<feature>/   Feature components, one folder per screen
lib/types.ts            Domain model
lib/mock-data.ts        Provinces, overviews, 24 licences, 12 partners, option sets
lib/mock-assistant.ts   Keyword-matched response engine for the chat
store/use-app-store.ts  Zustand store + derived selectors
```

## Notes on the data

Provincial registration steps, fees, and timelines are realistic but **illustrative**, written for
a demo. They are not legal or tax advice. All partner organisations, customer names, and quotations
are fictional and labelled as such in the UI.

## Deliberately out of scope

Real auth, backend, database, and billing. Modules 2 (Funding Copilot) and 3 (Diaspora Bridge) are
not built — they are stubbed as "Coming soon" in the sidebar and slot in as siblings of
`app/dashboard/guide/` when the time comes.
