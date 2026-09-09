import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ZodError, type ZodSchema } from "zod";
import { toFieldErrors, type FieldErrors } from "./validation";

/** Error shape every endpoint returns: { error, fields? } */
export interface ApiError {
  error: string;
  fields?: FieldErrors;
}

const ALLOWED_ORIGIN = process.env.FRONTEND_ORIGIN ?? "http://localhost:3000";

/** CORS restricted to the frontend origin, not a wildcard. */
export function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
    "Access-Control-Allow-Methods": "GET,POST,PATCH,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

export function ok<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, { status, headers: corsHeaders() });
}

export function fail(error: string, status: number, fields?: FieldErrors): NextResponse {
  const body: ApiError = fields ? { error, fields } : { error };
  return NextResponse.json(body, { status, headers: corsHeaders() });
}

export const unauthorized = () => fail("Authentication required", 401);
export const notFound = (what = "Resource") => fail(`${what} not found`, 404);

/** Preflight handler — re-exported as OPTIONS from each route. */
export function preflight(): NextResponse {
  return new NextResponse(null, { status: 204, headers: corsHeaders() });
}

/**
 * Parses and validates a JSON body. Returns a discriminated result so callers
 * can return the error response directly.
 */
export async function parseBody<T>(
  request: NextRequest,
  schema: ZodSchema<T>,
): Promise<{ ok: true; data: T } | { ok: false; response: NextResponse }> {
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return { ok: false, response: fail("Request body must be valid JSON", 400) };
  }

  const parsed = schema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      response: fail("Validation failed", 400, toFieldErrors(parsed.error)),
    };
  }
  return { ok: true, data: parsed.data };
}

/**
 * Wraps a handler so an unexpected throw becomes a generic 500.
 * Stack traces are logged server-side and never sent to the client.
 */
export function withErrorHandling<Args extends unknown[]>(
  handler: (request: NextRequest, ...args: Args) => Promise<NextResponse>,
) {
  return async (request: NextRequest, ...args: Args): Promise<NextResponse> => {
    try {
      return await handler(request, ...args);
    } catch (error) {
      if (error instanceof ZodError) {
        return fail("Validation failed", 400, toFieldErrors(error));
      }
      console.error("[api] unhandled error:", error);
      return fail("Something went wrong. Please try again.", 500);
    }
  };
}
