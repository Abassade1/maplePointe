/**
 * Fixed-window in-memory rate limiter.
 *
 * Adequate for a single-process MVP only: the counters live in this process,
 * so they reset on restart and are not shared across instances. Swap for Redis
 * before running more than one server.
 */
interface Window {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Window>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
}

export function rateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || now >= existing.resetAt) {
    const fresh = { count: 1, resetAt: now + windowMs };
    buckets.set(key, fresh);
    return { allowed: true, remaining: limit - 1, resetAt: fresh.resetAt, limit };
  }

  existing.count += 1;
  const allowed = existing.count <= limit;
  return {
    allowed,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
    limit,
  };
}

/** Assistant endpoint calls a paid API, so it is capped per user per hour. */
export const ASSISTANT_LIMIT = 20;
export const ASSISTANT_WINDOW_MS = 60 * 60 * 1000;

/** Opportunistic cleanup so the map cannot grow without bound. */
export function sweepExpired(): void {
  const now = Date.now();
  for (const [key, window] of Array.from(buckets.entries())) {
    if (now >= window.resetAt) buckets.delete(key);
  }
}
