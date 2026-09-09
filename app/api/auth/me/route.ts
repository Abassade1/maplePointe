import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { notFound, ok, preflight, unauthorized, withErrorHandling } from "@/lib/api";

export const GET = withErrorHandling(async (request: NextRequest) => {
  const authed = await getAuthedUser(request);
  if (!authed) return unauthorized();

  const user = await prisma.user.findUnique({
    where: { id: authed.id },
    select: { id: true, email: true, createdAt: true, company: true },
  });
  if (!user) return notFound("User");

  return ok({
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    company: user.company,
  });
});

export const OPTIONS = preflight;
