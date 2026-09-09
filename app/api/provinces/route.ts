import { prisma } from "@/lib/db";
import { ok, preflight, withErrorHandling } from "@/lib/api";

/** Public — the frontend shows province choices before a user signs up. */
export const GET = withErrorHandling(async () => {
  const provinces = await prisma.province.findMany({
    orderBy: { name: "asc" },
    select: {
      id: true,
      code: true,
      name: true,
      overviewText: true,
      _count: { select: { licenceItems: true } },
    },
  });

  return ok({
    provinces: provinces.map(({ _count, ...province }) => ({
      ...province,
      licenceItemCount: _count.licenceItems,
    })),
  });
});

export const OPTIONS = preflight;
