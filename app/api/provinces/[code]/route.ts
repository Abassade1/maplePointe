import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { notFound, ok, preflight, withErrorHandling } from "@/lib/api";

/**
 * Province detail with its licence items. Public, but when the caller is
 * authenticated each item also carries that user's checklist state.
 */
export const GET = withErrorHandling(
  async (request: NextRequest, context: { params: Promise<{ code: string }> }) => {
    const { code } = await context.params;

    const province = await prisma.province.findUnique({
      where: { code: code.toUpperCase() },
      include: { licenceItems: { orderBy: { name: "asc" } } },
    });
    if (!province) return notFound("Province");

    const authed = await getAuthedUser(request);
    if (!authed) return ok({ province });

    const checklist = await prisma.checklistItem.findMany({
      where: { userId: authed.id, licenceItem: { provinceId: province.id } },
      select: { licenceItemId: true, completed: true, completedAt: true },
    });
    const byLicenceId = new Map(checklist.map((c) => [c.licenceItemId, c]));

    return ok({
      province: {
        ...province,
        licenceItems: province.licenceItems.map((item) => ({
          ...item,
          checklist: byLicenceId.get(item.id) ?? null,
        })),
      },
    });
  },
);

export const OPTIONS = preflight;
