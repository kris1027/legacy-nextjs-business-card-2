export const RATE_LIMIT_MAX = 5;
export const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;

type Entry = { count: number; resetAt: number };
const store = new Map<string, Entry>();

setInterval(
  () => {
    const now = Date.now();
    for (const [ip, entry] of store) {
      if (now > entry.resetAt) store.delete(ip);
    }
  },
  30 * 60 * 1000
).unref();

export function checkRateLimit(ip: string, now = Date.now()): boolean {
  const entry = store.get(ip);

  if (!entry || now > entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

export function _resetStoreForTest() {
  store.clear();
}
