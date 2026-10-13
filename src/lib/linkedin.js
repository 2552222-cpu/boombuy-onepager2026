import { LINKEDIN_PARTNER_ID, isLinkedInEnabled } from "@/lib/siteConfig";

let initialized = false;

// Loads the LinkedIn Insight Tag once, only when a partner id is configured.
export function initLinkedIn() {
  if (initialized || !isLinkedInEnabled()) return;
  if (typeof window === "undefined") return;
  initialized = true;
  window._linkedin_partner_id = LINKEDIN_PARTNER_ID;
  window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
  window._linkedin_data_partner_ids.push(window._linkedin_partner_id);
  (function () {
    const s = document.getElementsByTagName("script")[0];
    const b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
    s.parentNode.insertBefore(b, s);
  })();
}

// Fires a LinkedIn conversion event. No-op when not configured.
export function trackLinkedInConversion(conversionId) {
  if (!isLinkedInEnabled() || !conversionId) return;
  if (typeof window === "undefined") return;
  try {
    if (window.lintrk) window.lintrk("track", { conversion_id: conversionId });
  } catch (e) {
    /* ignore */
  }
}