// Build-time static fallback, not a claim of platform-supported SSR/prerender.
// No user-agent branch: visitors and crawlers receive the same content.
import staticHome from "./staticHome.js";
import { CONTACT, HOME_TITLE, HOME_DESCRIPTION, ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "./siteIdentity.js";
import * as copy from "../employees/homeContent.js";
import { TESTIMONIALS } from "../employees/testimonialsData.js";
import { FAQ_ITEMS } from "../../lib/faqData.js";
import { EXPERIENCES_VIDEO } from "../../lib/videoAssets.js";

export default function publicHtmlPlugin() {
  return {
    name: "boombuy-public-html",
    transformIndexHtml: {
      order: "pre",
      handler(html) {
        if (FAQ_ITEMS.length !== 12 || new Set(FAQ_ITEMS.map((item) => item.q)).size !== 12) throw new Error("Expected the existing 12 unique FAQ items");
        // One index.html is served for every path, so only site-wide identity ships
        // here. Per-route nodes (WebPage, and FAQPage on the home page alone) are
        // added at runtime by SeoManager, which knows the current path.
        const graph = { "@context": "https://schema.org", "@graph": [ORGANIZATION_JSON_LD, WEBSITE_JSON_LD] };
        const body = staticHome({ copy, faq: FAQ_ITEMS, testimonials: TESTIMONIALS, contact: CONTACT, video: EXPERIENCES_VIDEO, organization: ORGANIZATION_JSON_LD });
        if (!html.includes("<!-- bb:public-content -->") || !html.includes("<!-- bb:structured-data -->")) throw new Error("Public HTML markers are missing");
        const output = html.replace("<!-- bb:public-content -->", body)
          .replace("<!-- bb:structured-data -->", `<script type="application/ld+json" data-bb-schema="true">${JSON.stringify(graph).replace(/</g, "\\u003c")}</script>`)
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${HOME_TITLE}</title>`)
          .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*("\s*\/?>)/g, `$1${HOME_DESCRIPTION}$2`)
          .replace(/(<meta (?:name|property)="(?:og:title|twitter:title)" content=")[^"]*("\s*\/?>)/g, `$1${HOME_TITLE}$2`);
        console.info(`[public-html artifact only] FAQ ${FAQ_ITEMS.length}/12; testimonials ${TESTIMONIALS.length}/4; Organization 1; WebSite 1; H1 ${(body.match(/<h1\b/g) || []).length}; links ${(body.match(/<a\b/g) || []).length}`);
        return output;
      },
    },
  };
}