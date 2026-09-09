import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { ok, preflight, unauthorized, withErrorHandling } from "@/lib/api";

interface ProvinceGroup {
  province: { id: string; code: string; name: string };
  items: unknown[];
  total: number;
  completed: number;
  completionPercentage: number;
}

/** The caller's checklist, grouped by province, with completion percentages. */
export const GET = withErrorHandling(async (request: NextRequest) => {
  const authed = await getAuthedUser(request);
  if (!authed) return unauthorized();

  const items = await prisma.checklistItem.findMany({
    where: { userId: authed.id },
    include: { licenceItem: { include: { province: true } } },
    orderBy: { licenceItem: { name: "asc" } },
  });

  const groups = new Map<string, ProvinceGroup>();

  for (const item of items) {
    const province = item.licenceItem.province;
    let group = groups.get(province.code);
    if (!group) {
      group = {
        province: { id: province.id, code: province.code, name: province.name },
        items: [],
        total: 0,
        completed: 0,
        completionPercentage: 0,
      };
      groups.set(province.code, group);
    }
    group.items.push({
      id: item.id,
      completed: item.completed,
      completedAt: item.completedAt,
      licenceItem: {
        id: item.licenceItem.id,
        name: item.licenceItem.name,
        description: item.licenceItem.description,
        status: item.licenceItem.status,
        category: item.licenceItem.category,
      },
    });
    group.total += 1;
    if (item.completed) group.completed += 1;
  }

  const byProvince = Array.from(groups.values())
    .map((group) => ({
      ...group,
      completionPercentage:
        group.total === 0 ? 0 : Math.round((group.completed / group.total) * 100),
    }))
    .sort((a, b) => a.province.name.localeCompare(b.province.name));

  const total = items.length;
  const completed = items.filter((i) => i.completed).length;

  return ok({
    summary: {
      total,
      completed,
      remaining: total - completed,
      completionPercentage: total === 0 ? 0 : Math.round((completed / total) * 100),
    },
    byProvince,
  });
});

export const OPTIONS = preflight;
