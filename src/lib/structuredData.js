import { FAQ_JSON_LD, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD, SITE_ORIGIN } from "@/lib/seoRoutes";

// Runtime safety net only. The initial served HTML still requires the platform's
// SEO settings to carry the same strings.
//
// Every Organization / WebSite / WebPage / FAQPage node already in the head is
// dropped here — whatever app or project name it came from — and the current set
// is rebuilt for THIS route from seoRoutes.js. That way no leftover identity from
// an earlier project name survives, each route declares its own WebPage, and only
// the route that owns the FAQ (the home page) ships FAQPage. All other structured
// data is left untouched.
const OWNED_TYPES = ["Organization", "WebSite", "WebPage", "FAQPage"];

function webPageSchema(seo) {
  const url = SITE_ORIGIN + seo.canonical;
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": url + "#webpage",
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: "he-IL",
    isPartOf: { "@id": WEBSITE_JSON_LD["@id"] },
    about: { "@id": ORGANIZATION_JSON_LD["@id"] },
  };
}

export default function syncStructuredData(seo) {
  const clean = (node) => {
    if (Array.isArray(node)) {
      const nodes = node.map(clean).filter(Boolean);
      return nodes.length ? nodes : null;
    }
    if (!node || typeof node !== "object") return node;
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    if (types.some((type) => OWNED_TYPES.includes(type))) return null;
    if (node["@graph"]) {
      const graph = clean(node["@graph"]);
      return graph ? { ...node, "@graph": graph } : null;
    }
    return node;
  };
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    let data;
    try { data = JSON.parse(script.textContent); } catch { return; }
    const remaining = clean(data);
    if (remaining) script.textContent = JSON.stringify(remaining);
    else script.remove();
  });
  const graph = [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD];
  if (seo?.canonical) graph.push(webPageSchema(seo));
  if (seo?.faq) graph.push(FAQ_JSON_LD);
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.bbSchema = "true";
  script.textContent = JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
  document.head.appendChild(script);
}