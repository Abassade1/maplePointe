import Anthropic from "@anthropic-ai/sdk";
import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { assistantSchema } from "@/lib/validation";
import {
  fail, notFound, ok, parseBody, preflight, unauthorized, withErrorHandling,
} from "@/lib/api";
import {
  ASSISTANT_LIMIT, ASSISTANT_WINDOW_MS, rateLimit, sweepExpired,
} from "@/lib/rate-limit";
import {
  MissingApiKeyError, generateAssistantReply, type ProvinceContext,
} from "@/lib/anthropic";

/** How much prior conversation to replay as context. */
const HISTORY_LIMIT = 10;

export const POST = withErrorHandling(async (request: NextRequest) => {
  const authed = await getAuthedUser(request);
  if (!authed) return unauthorized();

  const parsed = await parseBody(request, assistantSchema);
  if (!parsed.ok) return parsed.response;
  const { message } = parsed.data;

  // 1. Company context.
  const company = await prisma.company.findUnique({ where: { id: authed.companyId } });
  if (!company) return notFound("Company");

  // 2. Provincial reference data for the company's target provinces. Fall back
  //    to every province when none are selected yet, so the assistant is still
  //    grounded rather than answering from memory alone.
  const provinceRows = await prisma.province.findMany({
    where: company.targetProvinces.length
      ? { code: { in: company.targetProvinces } }
      : undefined,
    include: { licenceItems: { orderBy: { name: "asc" } } },
    orderBy: { name: "asc" },
  });

  const provinces: ProvinceContext[] = provinceRows.map((p) => ({
    code: p.code,
    name: p.name,
    overviewText: p.overviewText,
    licenceItems: p.licenceItems.map((l) => ({
      name: l.name,
      description: l.description,
      status: l.status,
      category: l.category,
    })),
  }));

  // 3. Recent history, oldest first for the API.
  const recent = await prisma.chatMessage.findMany({
    where: { userId: authed.id },
    orderBy: { createdAt: "desc" },
    take: HISTORY_LIMIT,
  });
  const history = recent
    .reverse()
    .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

  // 4. Consume a rate-limit slot. Done here, not at the top of the handler, so
  //    that a rejected or malformed request never burns the user's quota — the
  //    limit exists to cap calls to the paid API, and those never reach it.
  sweepExpired();
  const limit = rateLimit(`assistant:${authed.id}`, ASSISTANT_LIMIT, ASSISTANT_WINDOW_MS);
  if (!limit.allowed) {
    const retryAfter = Math.ceil((limit.resetAt - Date.now()) / 1000);
    const limited = fail(
      `Rate limit reached (${ASSISTANT_LIMIT} messages per hour). Try again later.`,
      429,
    );
    limited.headers.set("Retry-After", String(retryAfter));
    limited.headers.set("X-RateLimit-Limit", String(limit.limit));
    limited.headers.set("X-RateLimit-Remaining", "0");
    return limited;
  }

  // 5. Call the model.
  let reply: string;
  try {
    reply = await generateAssistantReply({
      company: {
        name: company.name,
        industry: company.industry,
        homeCountry: company.homeCountry,
        companySize: company.companySize,
        productDescription: company.productDescription,
        productCategory: company.productCategory,
        targetProvinces: company.targetProvinces,
        goals: company.goals,
      },
      provinces,
      history,
      message,
    });
  } catch (error) {
    if (error instanceof MissingApiKeyError) {
      return fail(
        "The assistant is not configured on this server. Set ANTHROPIC_API_KEY and restart.",
        503,
      );
    }
    if (error instanceof Anthropic.RateLimitError) {
      return fail("The assistant is busy right now. Please try again shortly.", 429);
    }
    if (error instanceof Anthropic.AuthenticationError) {
      console.error("[assistant] Anthropic rejected the API key");
      return fail("The assistant is not configured correctly on this server.", 503);
    }
    if (error instanceof Anthropic.APIError) {
      console.error(`[assistant] Anthropic API error ${error.status}:`, error.message);
      return fail("The assistant could not answer right now. Please try again.", 502);
    }
    throw error;
  }

  // 6. Persist both turns only after a successful reply, so a failed call does
  //    not leave a user message stranded without an answer.
  const [userMessage, assistantMessage] = await prisma.$transaction([
    prisma.chatMessage.create({
      data: { userId: authed.id, role: "user", content: message },
    }),
    prisma.chatMessage.create({
      data: { userId: authed.id, role: "assistant", content: reply },
    }),
  ]);

  const response = ok({
    reply,
    messages: [userMessage, assistantMessage],
    rateLimit: { limit: limit.limit, remaining: limit.remaining, resetAt: limit.resetAt },
  });
  response.headers.set("X-RateLimit-Limit", String(limit.limit));
  response.headers.set("X-RateLimit-Remaining", String(limit.remaining));
  return response;
});

export const OPTIONS = preflight;
