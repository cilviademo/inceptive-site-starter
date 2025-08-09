export const AFF_KEY = "drumhaus_aff";

export function captureAffiliate() {
  try {
    const url = new URL(window.location.href);
    const aff = url.searchParams.get("aff") || url.searchParams.get("ref") || url.searchParams.get("utm_source");
    if (aff) {
      localStorage.setItem(AFF_KEY, JSON.stringify({ aff, ts: Date.now() }));
    }
  } catch {}
}

export function getAffiliate(): string | null {
  try {
    const raw = localStorage.getItem(AFF_KEY);
    if (!raw) return null;
    const { aff } = JSON.parse(raw);
    return aff || null;
  } catch {
    return null;
  }
}

export function appendAffiliate(url: string) {
  const aff = getAffiliate();
  if (!aff) return url;
  try {
    const u = new URL(url, window.location.origin);
    u.searchParams.set("aff", aff);
    return u.toString();
  } catch {
    return url;
  }
}
