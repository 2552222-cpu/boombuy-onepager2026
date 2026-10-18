import { FAQ_JSON_LD, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/lib/seoRoutes";

// Runtime safety net only. The initial served HTML still requires the platform's
// SEO settings to carry the same strings.
//
// Every Organization / WebSite / FAQPage node in the served head is dropped here,
// whatever app or project name it came from, and the current set is re-added from
// seoRoutes.js. That way no leftover identity from an earlier project name can
// survive alongside the current branding, and only the route that owns the FAQ
// ships it. All other structured data is left untouched.
export default function syncStructuredData(keepFaq) {
  const clean = (node) => {
    if (Array.isArray(node)) {
      const nodes = node.map(clean).filter(Boolean);
      return nodes.length ? nodes : null;
    }
    if (!node || typeof node !== "object") return node;
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    if (types.includes("Organization") || types.includes("WebSite") || types.includes("FAQPage")) return null;
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
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.dataset.bbSchema = "true";
  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD, ...(keepFaq ? [FAQ_JSON_LD] : [])],
  });
  document.head.appendChild(script);
}