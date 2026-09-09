import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { signToken, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";
import { fail, ok, parseBody, preflight, withErrorHandling } from "@/lib/api";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const parsed = await parseBody(request, loginSchema);
  if (!parsed.ok) return parsed.response;

  const { email, password } = parsed.data;

  const user = await prisma.user.findUnique({
    where: { email },
    select: { id: true, email: true, passwordHash: true, createdAt: true, company: true },
  });

  // Same response whether the email is unknown or the password is wrong, so the
  // endpoint cannot be used to enumerate registered accounts.
  const invalid = fail("Invalid email or password", 401);
  if (!user) return invalid;

  const matches = await verifyPassword(password, user.passwordHash);
  if (!matches) return invalid;

  const token = signToken({ userId: user.id, email: user.email });

  return ok({
    token,
    user: { id: user.id, email: user.email, createdAt: user.createdAt },
    company: user.company,
  });
});

export const OPTIONS = preflight;
