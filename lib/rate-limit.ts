import { createHash } from "node:crypto";
import { ipAddress } from "@vercel/functions";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";
import { rateLimits } from "@/db/schema";

const MINUTE_MS = 60_000;

export const RATE_LIMIT = {
  rsvp: { scope: "rsvp", limit: 20, windowMs: 60 * MINUTE_MS },
  guestList: { scope: "guest-list", limit: 20, windowMs: 15 * MINUTE_MS },
} as const;

export async function isRateLimited(
  request: Request,
  rule: (typeof RATE_LIMIT)[keyof typeof RATE_LIMIT],
) {
  const client = ipAddress(request) ?? "unknown";
  const key = createHash("sha256").update(`${rule.scope}:${client}`).digest("hex");
  const now = Date.now();
  const expiredBefore = now - rule.windowMs;
  const windowExpired = sql`${rateLimits.windowStart} <= ${expiredBefore}`;

  const [row] = await getDb()
    .insert(rateLimits)
    .values({ key, count: 1, windowStart: now })
    .onConflictDoUpdate({
      target: rateLimits.key,
      set: {
        count: sql`case when ${windowExpired} then 1 else ${rateLimits.count} + 1 end`,
        windowStart: sql`case when ${windowExpired} then ${now}::bigint else ${rateLimits.windowStart} end`,
      },
    })
    .returning({ count: rateLimits.count });

  return row.count > rule.limit;
}
