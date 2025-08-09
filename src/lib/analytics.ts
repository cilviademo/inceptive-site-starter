export type AnalyticsEvent =
  | "view_product"
  | "click_product"
  | "play_preview"
  | "add_to_wishlist"
  | "remove_from_wishlist"
  | "start_checkout"
  | "purchase";

export function track(event: AnalyticsEvent, props: Record<string, any> = {}) {
  const payload = {
    event,
    props,
    ts: Date.now(),
    path: typeof window !== "undefined" ? window.location.pathname : "",
  };
  try {
    const key = "drumhaus_events";
    const prev = JSON.parse(localStorage.getItem(key) || "[]");
    prev.push(payload);
    localStorage.setItem(key, JSON.stringify(prev).slice(-5000));
  } catch {}
  // eslint-disable-next-line no-console
  console.log("[analytics]", event, props);
  try {
    window.dispatchEvent(new CustomEvent("drumhaus:analytics", { detail: payload }));
  } catch {}
}
