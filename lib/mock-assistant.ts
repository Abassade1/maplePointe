/**
 * Deterministic, offline stand-in for the Northgate assistant.
 * Matches the user's question against keyword rules and returns a canned answer.
 * No network calls — this exists so the demo behaves believably without a backend.
 */

interface ResponseRule {
  id: string;
  /** Lower-cased keywords; any match scores the rule. */
  keywords: string[];
  /** Higher weight wins when several rules match. */
  weight: number;
  answer: string;
}

const RULES: ResponseRule[] = [
  {
    id: "quebec-language",
    keywords: ["quebec", "québec", "french", "français", "francais", "bilingual", "oqlf", "language", "law 14", "bill 96", "montreal", "montréal"],
    weight: 3,
    answer:
      "Quebec is usually the highest-friction province for foreign entrants, and language is the main reason.\n\nUnder the Charter of the French Language, your product labelling, packaging, warranties, instructions, public signage, and customer-facing website all need French versions — and French must be displayed at least as prominently as any other language. A non-French trademark on storefront signage needs a sufficient French descriptor alongside it.\n\nTwo practical implications:\n\n1. **Budget for a Quebec-specific artwork revision.** Most entrants need one, and it typically runs CA$1,500–CA$8,000 per SKU family with a 6–12 week turnaround. Decide on this before you finalise packaging for the rest of Canada — repackaging later costs more than designing bilingually from the start.\n2. **Check the OQLF headcount threshold.** Above it, you must register with the Office québécois de la langue française and complete a francisation process, which is a months-long programme rather than a filing.\n\nNote that the federal Consumer Packaging and Labelling Act already requires bilingual product identity and net quantity declarations *everywhere* in Canada — so some bilingual work applies even if you never sell into Quebec.",
  },
  {
    id: "labelling",
    keywords: ["label", "labeling", "labelling", "packaging", "package", "ingredient", "nutrition facts", "artwork", "cpla"],
    weight: 3,
    answer:
      "Canadian labelling obligations come from two layers, and it helps to keep them separate.\n\n**Federal (applies nationwide).** The Consumer Packaging and Labelling Act requires product identity and net quantity declarations in both English and French, metric units, and the dealer's name and principal place of business. For food, the CFIA layers on nutrition facts tables, ingredient lists, and allergen declarations in a prescribed bilingual format.\n\n**Provincial.** Quebec adds a considerably stricter French-language regime on top of the federal baseline, covering warranties, instructions, and signage rather than just the panel.\n\nThe common failure mode is treating bilingual labelling as a Quebec-only problem, designing English-only packaging for an Ontario launch, and then discovering the federal requirement at customs. Plan bilingual artwork once, up front — it is materially cheaper than a second production run.",
  },
  {
    id: "licensing",
    keywords: ["licence", "license", "licensing", "permit", "registration", "register", "incorporate", "incorporation", "entity", "extra-provincial", "extraprovincial", "business number"],
    weight: 2,
    answer:
      "Registration in Canada happens in a fairly predictable sequence. For most foreign SMEs it looks like this:\n\n1. **Choose your structure.** Either register your existing foreign corporation extra-provincially, or incorporate a federal subsidiary under the CBCA and then register it in each province where you operate. The federal route costs more initially but travels better across provinces.\n2. **Appoint an attorney or agent for service.** Every province requires a local representative with a physical provincial address. A mailbox will not satisfy this.\n3. **Get a CRA Business Number.** This is the spine — your tax, payroll, and import/export accounts all hang off it. Usually issued within a couple of business days.\n4. **Open the import/export (RM) program account** before your first shipment reaches the border.\n5. **Register for sales tax** — HST in Ontario, GST plus a separate PST in British Columbia, GST only in Alberta, and GST plus QST through Revenu Québec in Quebec.\n6. **Register with the provincial workers' compensation board** before your first employee starts.\n\nMunicipal licences sit on top of all of this and vary by city and category. Open the Province Guide to see the specific items for each province you selected, with timelines and fees.",
  },
  {
    id: "tax",
    keywords: ["tax", "hst", "gst", "pst", "qst", "sales tax", "duty", "tariff", "cusma", "nafta", "customs", "tariffs"],
    weight: 2,
    answer:
      "Sales tax treatment differs enough between provinces that it should influence where you land first.\n\n- **Ontario** — 13% HST, a single harmonised rate collected at point of sale.\n- **British Columbia** — 5% GST plus 7% PST, administered separately. PST applies to some business inputs that would be recoverable under HST, so your effective cost is higher than the headline 12%.\n- **Alberta** — 5% GST only. No provincial sales tax at all, which makes it the cleanest province for testing consumer price sensitivity.\n- **Quebec** — 5% GST plus 9.975% QST, with QST administered by Revenu Québec rather than the CRA, meaning separate filings.\n\nThe CA$30,000 small-supplier threshold applies across four consecutive calendar quarters. Registering voluntarily below it is often worthwhile, because it lets you recover input tax credits on setup costs.\n\nOn duties: if you manufacture in the US or Mexico, check CUSMA rules of origin before assuming preferential treatment — the certification requirements catch people out more often than the rates do.",
  },
  {
    id: "partners",
    keywords: ["partner", "distributor", "distribution", "agent", "reseller", "logistics", "3pl", "warehouse", "freight", "broker", "intro"],
    weight: 2,
    answer:
      "For a first entry, the choice is usually between a distributor and a commission agent, and it comes down to how much control you want.\n\n**Distributors** take title to your goods, which removes your working-capital and credit risk but also removes your visibility into end customers and pricing. They generally expect exclusivity in a defined territory. Negotiate the territory narrowly at first — Ontario rather than all of Canada — so a poor fit does not lock up the whole country.\n\n**Commission agents** keep you closer to the market and cost less up front, but you carry inventory, receivables, and collections yourself. This suits B2B and industrial products, where a small number of procurement relationships matter more than shelf coverage.\n\nWhichever you pick, budget separately for a customs broker and a 3PL — distributors rarely handle border clearance for you.\n\nThe Partner Matches page has vetted options filtered by province and type. \"Request intro\" flags them for the Northgate team.",
  },
  {
    id: "costs",
    keywords: ["cost", "costs", "budget", "price", "pricing", "fee", "fees", "how much", "expensive", "capital", "spend", "estimate"],
    weight: 2,
    answer:
      "A realistic first-year budget for a single-province entry breaks into four buckets.\n\n**Registration and legal** — CA$3,000–CA$12,000. Provincial registration fees themselves are modest (CA$275–CA$380), so most of this is legal work on structuring, distribution agreements, and attorney-for-service arrangements.\n\n**Compliance and labelling** — CA$2,000–CA$15,000 depending on SKU count. If Quebec is in scope, weight this upward: French artwork revision runs CA$1,500–CA$8,000 per SKU family on its own.\n\n**Logistics setup** — CA$5,000–CA$20,000 to establish customs brokerage, initial bonded storage, and 3PL onboarding, before per-shipment costs.\n\n**Market development** — the widest range, CA$10,000–CA$100,000+, covering listing fees, trade shows, agent retainers, and marketing.\n\nA cautious planning figure for a single-province pilot is CA$25,000–CA$60,000 before inventory. Adding Quebec at the same time typically increases the compliance bucket by 40–60%.",
  },
  {
    id: "province-choice",
    keywords: ["which province", "where should", "ontario", "british columbia", "alberta", "toronto", "vancouver", "calgary", "best province", "start"],
    weight: 2,
    answer:
      "Choosing a landing province mostly comes down to where your supply chain starts and who your buyer is.\n\n**Ontario** is the default. About 39% of Canadians live there, the GTA absorbs more imported consumer goods than any other metro, and head offices concentrate in Toronto. Highest competition, but the fastest demand signal.\n\n**British Columbia** makes sense if you ship from Asia-Pacific. Vancouver clears more container volume than every other Canadian port combined, and transit from Shanghai or Busan is 5–8 days shorter than routing east. The PST regime is the trade-off.\n\n**Alberta** is the lightest tax environment — 8% corporate rate, no PST. Its economy is concentrated in energy, agriculture, and logistics, and B2B buying runs through a relatively small set of procurement relationships in Calgary and Edmonton. Often a single strong local agent beats a broad distributor network.\n\n**Quebec** is the second-largest market but carries the heaviest compliance load because of the French-language regime. Rarely the right first province unless you already have francophone capability.\n\nA common sequence is Ontario first, then the province matching your logistics, then Quebec once packaging economics justify the translation work.",
  },
  {
    id: "timeline",
    keywords: ["how long", "timeline", "time", "weeks", "months", "fast", "quickly", "when can", "duration", "schedule"],
    weight: 2,
    answer:
      "For a straightforward single-province entry, plan on **three to five months** from decision to first sale.\n\nRoughly how it sequences:\n\n- **Weeks 1–2** — structural decision, name approval where required (BC needs this before registration).\n- **Weeks 2–6** — extra-provincial registration. Ontario runs 2–4 weeks, BC 3–5, Alberta 1–3, Quebec 3–6.\n- **Weeks 3–4** — CRA Business Number and sales tax accounts. These are fast, often a couple of days, but they depend on the entity existing first.\n- **Weeks 4–12** — labelling and packaging revision. This is usually the critical path, especially with Quebec French requirements in scope.\n- **Weeks 8–16** — distribution agreements, customs brokerage, and 3PL onboarding, which can run in parallel with labelling.\n\nThe two things that most often blow the schedule are packaging artwork revisions and municipal licensing in cities with slower queues. Start both earlier than feels necessary.",
  },
  {
    id: "employment",
    keywords: ["employee", "employees", "hiring", "hire", "payroll", "worker", "staff", "work permit", "visa", "immigration", "wsib", "labour"],
    weight: 2,
    answer:
      "Hiring in Canada is province-regulated, so obligations attach to where the employee works rather than where your entity is registered.\n\nBefore your first hire in a province you will need a CRA payroll (RP) account, registration with that province's workers' compensation board — WSIB in Ontario, WorkSafeBC, WCB Alberta, CNESST in Quebec — and payroll set up for CPP, EI, and income tax withholding.\n\nEmployment standards are provincial and differ meaningfully on notice periods, overtime thresholds, and statutory holidays. Quebec goes further: employment documentation and internal communications generally need to be available in French.\n\nIf you are relocating staff rather than hiring locally, the intra-company transferee stream under CUSMA or the general LMIA-exempt category is usually the route worth exploring, and it is worth taking specific immigration advice early — processing times vary considerably by country of application.",
  },
];

const FALLBACK =
  "I can help you think that through. I have the most useful detail on:\n\n- **Registration and licensing** — what to file, in what order, and how long each step takes\n- **Sales tax** — how HST, GST, PST, and QST differ by province and what that does to your pricing\n- **Labelling and bilingual compliance** — federal requirements and Quebec's stricter French-language regime\n- **Choosing a province** — matching your supply chain and buyer to the right landing point\n- **Partners** — when a distributor beats a commission agent, and what to negotiate\n- **Costs and timelines** — realistic first-year budgets and a week-by-week sequence\n\nCould you tell me a bit more about what you are trying to decide? If you mention your product type and which provinces you are considering, I can be more specific.";

/** Scores every rule against the question and returns the best match, or a fallback. */
export function getAssistantResponse(question: string): string {
  const q = question.toLowerCase();

  let best: ResponseRule | null = null;
  let bestScore = 0;

  for (const rule of RULES) {
    const hits = rule.keywords.filter((k) => q.includes(k)).length;
    if (hits === 0) continue;
    const score = hits * rule.weight;
    if (score > bestScore) {
      bestScore = score;
      best = rule;
    }
  }

  return best ? best.answer : FALLBACK;
}

/** Starter prompts surfaced as chips above the composer. */
export const SUGGESTED_QUESTIONS = [
  "Which province should we enter first?",
  "What are the Quebec French labelling requirements?",
  "What licences do we need in Ontario?",
  "How much should we budget for the first year?",
  "How long does registration take end to end?",
  "Should we use a distributor or a local agent?",
];

/** Mock network latency so the typing indicator reads as real. */
export function getSimulatedLatency(): number {
  return 700 + Math.random() * 700;
}
