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

export const SITE_ORIGIN = "https://boombuyonepage.com";

// Same values as the static tags in index.html, so the crawler that reads the raw
// HTML and the one that runs JavaScript see one set of strings, not two.
export const HOME_TITLE = "בום ביי | מועדון הטבות לעובדים במותג הארגון";
export const HOME_DESCRIPTION =
  "בום ביי מקימה ומפעילה מועדון הטבות בשם הארגון, לצד פעילות הרווחה הקיימת. הכירו דוגמאות להטבות, את תהליך ההקמה והשירות, ובדקו התאמה.";

export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": SITE_ORIGIN + "/#organization",
  name: "boombuy",
  url: SITE_ORIGIN + "/",
  logo: "https://media.base44.com/images/public/69e48538aaee477b09fc7b49/4cebf7412_15.png",
  description: "פלטפורמה ישראלית שמקימה ומפעילה מועדון הטבות לעובדים במותג הארגון.",
  contactPoint: {
    "@type": "ContactPoint", telephone: "+972542552222",
    email: "support@boombuy.co.il", contactType: "customer support",
    areaServed: "IL", availableLanguage: ["Hebrew"],
  },
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": SITE_ORIGIN + "/#website",
  name: "boombuy",
  url: SITE_ORIGIN + "/",
  description: HOME_DESCRIPTION,
  inLanguage: "he-IL",
  publisher: { "@id": ORGANIZATION_JSON_LD["@id"] },
};

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