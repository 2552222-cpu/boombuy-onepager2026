// Captures lead-source attribution (UTM params + LinkedIn li_fat_id + landing URL)
// from the URL/cookies on page load, persists to sessionStorage, and sends it with the lead.
const KEY = "boom_lead_source";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content"];

export function captureLeadSource() {
  if (typeof window === "undefined") return;
  try {
    const u = new URL(window.location.href);
    const data = {};
    PARAMS.forEach((p) => {
      const v = u.searchParams.get(p);
      if (v) data[p] = v;
    });
    const m = document.cookie.match(/(?:^|;\s*)li_fat_id=([^;]+)/);
    if (m) data.li_fat_id = decodeURIComponent(m[1]);
    data.landing_url = window.location.href;
    const existing = readLeadSource();
    sessionStorage.setItem(KEY, JSON.stringify({ ...existing, ...data }));
  } catch (e) {
    /* ignore */
  }
}

export function readLeadSource() {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || "{}");
  } catch (e) {
    return {};
  }
}