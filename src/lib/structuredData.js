import { FAQ_JSON_LD, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD, SITE_ORIGIN } from "@/lib/seoRoutes";

// Runtime safety net only. Initial HTML still requires matching platform SEO settings.
// Remove only this site's identities and FAQ nodes, never unrelated structured data.
export default function syncStructuredData(keepFaq) {
  const identities = {};
  const clean = (node) => {
    if (Array.isArray(node)) {
      const nodes = node.map(clean).filter(Boolean);
      return nodes.length ? nodes : null;
    }
    if (!node || typeof node !== "object") return node;
    const types = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
    const identity = types.find((type) => type === "Organization" || type === "WebSite");
    const isSite = String(node.url || "").replace(/\/$/, "") === SITE_ORIGIN;
    if (identity && (isSite || ["boombuy", "BoomBuy Onepager2026"].includes(node.name))) {
      identities[identity] = { ...node, ...identities[identity] };
      return null;
    }
    if (types.includes("FAQPage")) return null;
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
    "@graph": [
      { ...identities.Organization, ...ORGANIZATION_JSON_LD },
      { ...identities.WebSite, ...WEBSITE_JSON_LD },
      ...(keepFaq ? [FAQ_JSON_LD] : []),
    ],
  });
  document.head.appendChild(script);
}