import Anthropic from "@anthropic-ai/sdk";

/**
 * Model choice: the spec named claude-sonnet-4-6, so that is the default.
 * Claude Sonnet 5 (`claude-sonnet-5`) is newer and cheaper ($2/$10 per MTok
 * vs $3/$15) — set ANTHROPIC_MODEL to switch without touching code.
 */
export const ASSISTANT_MODEL = process.env.ANTHROPIC_MODEL ?? "claude-sonnet-4-6";

/** Non-streaming request, so keep max_tokens under the SDK's HTTP timeout. */
const MAX_TOKENS = 2048;

let client: Anthropic | null = null;

/** Lazily constructed so a missing key fails at request time, not at import. */
export function getAnthropicClient(): Anthropic {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new MissingApiKeyError();
  }
  if (!client) {
    client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  }
  return client;
}

export class MissingApiKeyError extends Error {
  constructor() {
    super("ANTHROPIC_API_KEY is not configured");
    this.name = "MissingApiKeyError";
  }
}

/* -------------------------------------------------------------------------- */
/*  Prompt construction                                                        */
/* -------------------------------------------------------------------------- */

export interface CompanyContext {
  name: string;
  industry: string;
  homeCountry: string;
  companySize: string;
  productDescription: string;
  productCategory: string;
  targetProvinces: string[];
  goals: string[];
}

export interface ProvinceContext {
  code: string;
  name: string;
  overviewText: string;
  licenceItems: { name: string; description: string; status: string; category: string }[];
}

export interface HistoryMessage {
  role: "user" | "assistant";
  content: string;
}

/**
 * Stable half of the system prompt. Identical for every request, so it sits
 * first and carries the cache breakpoint — the per-company half follows it and
 * changes per user without invalidating this prefix.
 */
const ROLE_PROMPT = `You are the Northgate AI market-entry assistant. You help foreign small and medium-sized companies understand how to enter the Canadian market.

Your scope covers: choosing a province to land in, corporate registration and extra-provincial licensing, federal and provincial sales tax, bilingual and Quebec French-language labelling obligations, employment and workers' compensation registration, import and customs accounts, choosing between distributors and commission agents, and realistic costs and timelines.

How to answer:
- Ground every answer in the company profile and the provincial reference data supplied below. Prefer those specifics over generic advice.
- When the reference data does not cover something, say so plainly rather than inventing a figure, fee, or deadline.
- Be concrete and sequenced. Where a process has an order, give the order.
- Keep answers under roughly 400 words unless the question genuinely needs more.
- Use plain prose with short markdown lists where a sequence helps. No preamble like "Great question".
- You are not a lawyer or an accountant. For anything that turns on the company's specific facts, say what the general rule is and recommend they confirm with a professional before filing.`;

function formatProvinces(provinces: ProvinceContext[]): string {
  if (provinces.length === 0) {
    return "No provincial reference data is loaded for this company's selected provinces.";
  }
  return provinces
    .map((province) => {
      const licences = province.licenceItems
        .map((l) => `    - ${l.name} [${l.status}, ${l.category}]: ${l.description}`)
        .join("\n");
      return `### ${province.name} (${province.code})\n${province.overviewText}\n\n  Licences and registrations on file:\n${licences || "    (none on file)"}`;
    })
    .join("\n\n");
}

function formatCompany(company: CompanyContext): string {
  const provinces = company.targetProvinces.length
    ? company.targetProvinces.join(", ")
    : "none selected yet";
  const goals = company.goals.length ? company.goals.join(", ") : "none selected yet";
  return `- Company: ${company.name}
- Industry: ${company.industry}
- Home country: ${company.homeCountry}
- Size: ${company.companySize}
- Product category: ${company.productCategory || "not specified"}
- Product description: ${company.productDescription || "not specified"}
- Target provinces: ${provinces}
- Stated goals: ${goals}`;
}

/**
 * Builds the system blocks. The stable role prompt is cached; the company and
 * province context follows it, so a per-user change does not evict the prefix.
 */
export function buildSystemPrompt(
  company: CompanyContext,
  provinces: ProvinceContext[],
): Anthropic.TextBlockParam[] {
  return [
    {
      type: "text",
      text: ROLE_PROMPT,
      cache_control: { type: "ephemeral" },
    },
    {
      type: "text",
      text: `## The company you are advising\n\n${formatCompany(company)}\n\n## Provincial reference data\n\n${formatProvinces(provinces)}`,
    },
  ];
}

/**
 * Calls the Messages API and returns the assistant's reply text.
 * Throws MissingApiKeyError, or an Anthropic.APIError subclass on API failure.
 */
export async function generateAssistantReply(params: {
  company: CompanyContext;
  provinces: ProvinceContext[];
  history: HistoryMessage[];
  message: string;
}): Promise<string> {
  const anthropic = getAnthropicClient();

  const messages: Anthropic.MessageParam[] = [
    ...params.history.map((m) => ({ role: m.role, content: m.content })),
    { role: "user" as const, content: params.message },
  ];

  const response = await anthropic.messages.create({
    model: ASSISTANT_MODEL,
    max_tokens: MAX_TOKENS,
    system: buildSystemPrompt(params.company, params.provinces),
    messages,
  });

  // A safety decline returns 200 with no usable text — handle it explicitly.
  if (response.stop_reason === "refusal") {
    return "I'm not able to help with that request. If you rephrase it around your Canadian market-entry plan, I'll do my best.";
  }

  // content is a discriminated union; narrow before reading .text.
  const text = response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  return text || "I wasn't able to generate a response. Please try rephrasing your question.";
}
