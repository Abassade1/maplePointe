import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { prisma } from "./db";

const TOKEN_TTL = "7d";
const BCRYPT_ROUNDS = 12;

export interface JwtPayload {
  userId: string;
  email: string;
}

function getSecret(): string {
  const secret = process.env.JWT_SECRET;
  // Fail loudly rather than signing with a fallback an attacker could guess.
  if (!secret || secret.length < 16) {
    throw new Error("JWT_SECRET is missing or too short (needs 16+ characters).");
  }
  return secret;
}

export function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, BCRYPT_ROUNDS);
}

export function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: TOKEN_TTL });
}

export function verifyToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, getSecret()) as JwtPayload;
  } catch {
    // Expired, malformed, or wrong signature — all are simply "not authenticated".
    return null;
  }
}

function extractBearer(request: NextRequest): string | null {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return null;
  const token = header.slice(7).trim();
  return token.length > 0 ? token : null;
}

export interface AuthedUser {
  id: string;
  email: string;
  companyId: string;
}

/**
 * Resolves the caller from the Authorization header.
 * Returns null when the token is missing, invalid, or points at a deleted user.
 */
export async function getAuthedUser(request: NextRequest): Promise<AuthedUser | null> {
  const token = extractBearer(request);
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, email: true, companyId: true },
  });

  return user;
}
