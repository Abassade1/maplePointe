import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { ok, preflight, unauthorized, withErrorHandling } from "@/lib/api";

const MAX_MESSAGES = 100;

/** Full chat history for the caller, oldest first. */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const authed = await getAuthedUser(request);
  if (!authed) return unauthorized();

  const messages = await prisma.chatMessage.findMany({
    where: { userId: authed.id },
    orderBy: { createdAt: "asc" },
    take: MAX_MESSAGES,
  });

  return ok({ messages, count: messages.length });
});

export const OPTIONS = preflight;
