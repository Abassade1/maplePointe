import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { updateCompanySchema } from "@/lib/validation";
import { ok, parseBody, preflight, unauthorized, withErrorHandling } from "@/lib/api";

export const PATCH = withErrorHandling(async (request: NextRequest) => {
  const authed = await getAuthedUser(request);
  if (!authed) return unauthorized();

  const parsed = await parseBody(request, updateCompanySchema);
  if (!parsed.ok) return parsed.response;

  // Scoped to the caller's own company — the id never comes from the body.
  const company = await prisma.company.update({
    where: { id: authed.companyId },
    data: parsed.data,
  });

  return ok({ company });
});

export const OPTIONS = preflight;
