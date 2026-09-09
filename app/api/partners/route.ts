import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { partnerQuerySchema, toFieldErrors } from "@/lib/validation";
import { fail, ok, preflight, withErrorHandling } from "@/lib/api";

/** Public, filterable by province code and partner type. */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);

  const parsed = partnerQuerySchema.safeParse({
    province: searchParams.get("province") ?? undefined,
    type: searchParams.get("type") ?? undefined,
  });
  if (!parsed.success) {
    return fail("Invalid query parameters", 400, toFieldErrors(parsed.error));
  }

  const { province, type } = parsed.data;

  const partners = await prisma.partner.findMany({
    where: {
      ...(type ? { type } : {}),
      ...(province ? { province: { code: province } } : {}),
    },
    include: { province: { select: { code: true, name: true } } },
    orderBy: { name: "asc" },
  });

  return ok({ partners, count: partners.length });
});

export const OPTIONS = preflight;
