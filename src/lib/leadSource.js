// Session attribution; never retain arbitrary query strings or contact data.
export const ATTRIBUTION_KEY = "boom_lead_source";
const KEY = ATTRIBUTION_KEY;
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"];

export function captureLeadSource() {
  if (typeof window === "undefined") return;
  try {
    const u = new URL(window.location.href);
    const data = {};
    PARAMS.forEach((p) => {
      const v = u.searchParams.get(p);
      if (v && v.length <= 120 && /^[a-zA-Z0-9_ .\-\u0590-\u05ff]+$/.test(v)) data[p] = v;
    });
    const oppref = u.searchParams.get("oppref");
    if (oppref && oppref.length <= 2048 && /^[A-Za-z0-9_=-]+$/.test(oppref)) data.oppref = oppref;
    const existing = readLeadSource();
    const tagged = PARAMS.some(p => data[p]) || Boolean(data.oppref);
    if (!tagged && existing.captured_at) return;
    data.landing_url = u.origin + "/";
    data.captured_at = Date.now();
    try { data.referrer_host = document.referrer ? new URL(document.referrer).hostname : ""; } catch {}
    sessionStorage.setItem(KEY, JSON.stringify(data));
  } catch (e) {
    /* ignore */
  }
}

export function readLeadSource() {
  if (typeof window === "undefined") return {};
  try {
    const saved = JSON.parse(sessionStorage.getItem(KEY) || "{}");
    const age = Date.now() - saved.captured_at;
    return age >= 0 && age < 30 * 60 * 1000 ? saved : {};
  } catch (e) {
    return {};
  }
}