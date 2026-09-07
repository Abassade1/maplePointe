# Northgate AI — Market-Entry Navigator (MVP)

A clickable, demo-ready frontend for Northgate AI, covering all three modules:

1. **Market-Entry Navigator** — where to land, what to register, who to work with.
2. **Funding Copilot** — grants, tax credits, and financing you qualify for.
3. **Diaspora Bridge** — the community already in Canada, and the people in it.

Built for foreign SMEs working out how to enter the Canadian market.

Fully bilingual: **English and Canadian French**, including all mock content.

No backend. All data is mocked and all state is client-side.

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000 — you are redirected to `/en` or `/fr` based on your
browser's `Accept-Language`. Use the switcher in the header to change language; it keeps you
on the same page, so `/fr/dashboard/guide` is a shareable link.

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
8. **Funding** (`/dashboard/funding`) — filter programmes, open **View details** to see
   eligibility, then **Track** one.
9. **Pipeline** (`/dashboard/funding/pipeline`) — move an application through Preparing →
   Submitted → Awarded and watch the totals move.
10. **Diaspora** (`/dashboard/diaspora`) — community snapshot for your home country, chambers and
    networks, upcoming events.
11. **Mentors** (`/dashboard/diaspora/mentors`) — mentors from your home market lead the list.

Two things worth showing in a demo, because they make the modules feel like one product:

- **Cross-module eligibility.** Most funding programmes require a Canadian entity. Open a
  programme's details before completing your extra-provincial registration in the Checklist and
  you get an amber warning linking back to the Guide; complete it and the same callout turns
  green.
- **Graceful fallback.** Pick a home country without a dedicated community profile (Ghana, say)
  and the Diaspora module falls back to a cross-community baseline and says so, rather than
  showing an empty screen.

To reset the demo, clear the `northgate-ai-store` key from local storage.

## Languages

English and Canadian French are both complete — UI strings, province guides, licence
descriptions, funding programmes, diaspora content, and the assistant's canned answers. The
assistant matches French keywords too, so a question written entirely in French routes to the
right answer. Numbers and currency follow each locale's conventions (`CA$36.7M` / `36,7 M$ CA`).

### Adding a third language

1. Add the code to `LOCALES` in `lib/i18n/config.ts`, with its name and BCP 47 tag.
2. Copy `lib/i18n/dictionaries/fr.ts` to `<code>.ts` and translate it — TypeScript will flag
   any key you miss.
3. Register it in `lib/i18n/get-dictionary.ts`.
4. Optionally add a content overlay under `lib/i18n/content/` and a branch in
   `lib/i18n/localize.ts`. Without one, that locale falls back to the English mock content
   while the UI is still translated.

Routing, the switcher, static generation, and `lang` handling all pick it up automatically.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui-style components on Radix ·
lucide-react · Zustand (persisted to local storage).

## Structure

```
app/[locale]/           All routes, prerendered per locale (/en/…, /fr/…)
middleware.ts           Redirects locale-less paths, honouring Accept-Language
lib/i18n/               Config, dictionaries, content overlays, merge helpers
components/ui/          Base primitives (button, card, select, accordion, sheet, toast, …)
components/<feature>/   Feature components, one folder per screen
lib/types.ts            Domain model for all three modules
lib/mock-data.ts        Module 1 data + re-exports of the two below
lib/mock-funding.ts     Module 2 — 15 federal and provincial programmes
lib/mock-diaspora.ts    Module 3 — communities, organisations, mentors, events
lib/mock-assistant.ts   Keyword-matched response engine (English + French keywords)
lib/navigation.ts       Module-grouped navigation, built from the active dictionary
store/use-app-store.ts  Zustand store + derived selectors
```

## Notes on the data

Provincial registration steps, funding programme amounts, fees, and timelines are realistic but
**illustrative**, written for a demo. They are not legal, tax, or financial advice. Diaspora
population figures are illustrative rather than census data. All partners, organisations, mentors,
events, customer names, and quotations are fictional and labelled as such in the UI.

## Adding a fourth module

Navigation is grouped by module in `lib/navigation.ts`. Add a `NavGroup` there and a matching
folder under `app/dashboard/`, and it appears in the sidebar, the mobile drawer, and the dashboard
module cards automatically.

## Deliberately out of scope

Real auth, backend, database, and billing.
