// Per-route SEO — the single source of truth for title, description, canonical
// path and structured data on every route of the onepager.
//
// Why this exists: the app is a SPA served from one index.html, so per-path
// metadata can only be applied at runtime. SeoManager (src/components/SeoManager.jsx)
// reads this map on EVERY entry, refresh and internal navigation, so /privacy and
// /accessibility never inherit the home page's title, canonical or FAQPage, and
// coming back to "/" always restores the home values.
//
// The home FAQ structured data is built from FAQ_ITEMS, so the questions that are
// visible in the accordion, the no-JS mirror inside index.html and the JSON-LD can
// never drift apart.
import { FAQ_ITEMS } from "@/lib/faqData";
import { HOME_TITLE, HOME_DESCRIPTION, SITE_ORIGIN, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/components/seo/siteIdentity";
export { HOME_TITLE, HOME_DESCRIPTION, SITE_ORIGIN, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD };

export const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

// Public indexable routes.
export const ROUTE_SEO = {
  "/": {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    canonical: "/",
    faq: true,
  },
  "/privacy": {
    title: "מדיניות פרטיות | boombuy",
    description:
      "איזה פרטים נאספים בטופס בדיקת ההתאמה, למה הם משמשים, אילו ספקים מעורבים בעיבודם ומהן הזכויות שלכם לפנות אלינו בבקשה לעיין או למחוק.",
    canonical: "/privacy",
    faq: false,
  },
  "/accessibility": {
    title: "הצהרת נגישות | boombuy",
    description:
      "הצהרת הנגישות של אתר boombuy: רמת הנגישות לפי ת\"י 5568 (WCAG 2.0 AA), אמצעי הנגישות הזמינים באתר, הסדרי שירות חלופיים ודרכי פנייה לרכז הנגישות.",
    canonical: "/accessibility",
    faq: false,
  },
};

// App pages that exist but must not be indexed or inherit landing-page metadata.
const PRIVATE_SEO = {
  prefix: ["/admin", "/results", "/join/"],
  title: "אזור אישי | boombuy",
  description: "עמוד פנימי באתר boombuy.",
};

// A path nobody mapped: the app's "not found" view.
export const NOT_FOUND_SEO = {
  title: "העמוד לא נמצא | boombuy",
  description: "העמוד שחיפשתם אינו קיים באתר boombuy. ניתן לחזור לעמוד הבית ולהמשיך משם.",
};

export function resolveSeo(pathname) {
  if (ROUTE_SEO[pathname]) {
    const r = ROUTE_SEO[pathname];
    return { ...r, index: true, url: SITE_ORIGIN + r.canonical };
  }
  if (PRIVATE_SEO.prefix.some((p) => pathname.startsWith(p))) {
    return { title: PRIVATE_SEO.title, description: PRIVATE_SEO.description, index: false, faq: false, canonical: null };
  }
  return { ...NOT_FOUND_SEO, index: false, faq: false, canonical: null };
}