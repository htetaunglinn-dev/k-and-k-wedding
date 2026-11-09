import { createHash, timingSafeEqual } from "node:crypto";

const digest = (value: string) => createHash("sha256").update(value).digest();

export function hasGuestListAccess(request: Request) {
  const key = process.env.GUEST_LIST_KEY;
  if (!key) return false;
  return timingSafeEqual(
    digest(request.headers.get("authorization") ?? ""),
    digest(`Bearer ${key}`),
  );
}
