import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { getAuthedUser } from "@/lib/auth";
import { toggleChecklistSchema } from "@/lib/validation";
import {
  fail, notFound, ok, preflight, unauthorized, withErrorHandling,
} from "@/lib/api";

/**
 * Adds a licence item to the caller's checklist, or updates its completion.
 * Body is optional: omit `completed` to flip the current value.
 */
export const PATCH = withErrorHandling(
  async (request: NextRequest, context: { params: Promise<{ id: string }> }) => {
    const authed = await getAuthedUser(request);
    if (!authed) return unauthorized();

    const { id } = await context.params;

    const licenceItem = await prisma.licenceItem.findUnique({
      where: { id },
      select: { id: true, name: true, province: { select: { code: true, name: true } } },
    });
    if (!licenceItem) return notFound("Licence item");

    // Body is optional here — an empty PATCH means "toggle".
    let completed: boolean | undefined;
    const rawBody = await request.text();
    if (rawBody.trim().length > 0) {
      let json: unknown;
      try {
        json = JSON.parse(rawBody);
      } catch {
        return fail("Request body must be valid JSON", 400);
      }
      const parsed = toggleChecklistSchema.safeParse(json);
      if (!parsed.success) return fail("Validation failed", 400, { completed: "Must be a boolean" });
      completed = parsed.data.completed;
    }

    const existing = await prisma.checklistItem.findUnique({
      where: { userId_licenceItemId: { userId: authed.id, licenceItemId: id } },
    });

    const nextCompleted = completed ?? !(existing?.completed ?? false);

    const item = await prisma.checklistItem.upsert({
      where: { userId_licenceItemId: { userId: authed.id, licenceItemId: id } },
      create: {
        userId: authed.id,
        licenceItemId: id,
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date() : null,
      },
      update: {
        completed: nextCompleted,
        completedAt: nextCompleted ? new Date() : null,
      },
    });

    return ok({
      checklistItem: item,
      licenceItem: { id: licenceItem.id, name: licenceItem.name, province: licenceItem.province },
    });
  },
);

export const OPTIONS = preflight;
