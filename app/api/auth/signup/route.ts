import type { NextRequest } from "next/server";
import { prisma } from "@/lib/db";
import { hashPassword, signToken } from "@/lib/auth";
import { signupSchema } from "@/lib/validation";
import { fail, ok, parseBody, preflight, withErrorHandling } from "@/lib/api";

export const POST = withErrorHandling(async (request: NextRequest) => {
  const parsed = await parseBody(request, signupSchema);
  if (!parsed.ok) return parsed.response;

  const { email, password, company } = parsed.data;

  const existing = await prisma.user.findUnique({ where: { email }, select: { id: true } });
  if (existing) {
    return fail("An account with that email already exists", 409, {
      email: "Already registered",
    });
  }

  const passwordHash = await hashPassword(password);

  // Company and user are created together so a signup can never leave an
  // orphaned company behind.
  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
      company: {
        create: {
          name: company.name,
          industry: company.industry,
          homeCountry: company.homeCountry,
          companySize: company.companySize,
        },
      },
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      company: true,
    },
  });

  const token = signToken({ userId: user.id, email: user.email });

  return ok(
    {
      token,
      user: { id: user.id, email: user.email, createdAt: user.createdAt },
      company: user.company,
    },
    201,
  );
});

export const OPTIONS = preflight;
