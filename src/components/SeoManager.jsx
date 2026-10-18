import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveSeo, FAQ_JSON_LD, SITE_ORIGIN } from "@/lib/seoRoutes";

// Route-aware SEO, applied once per path for EVERY way a visitor can arrive:
// direct entry, refresh and internal navigation all end here.
//
// The platform injects its own title/description/og tags (project name and app
// metadata) into the served HTML, so ours must win at runtime and the injected
// duplicates must not survive next to them: each managed tag is updated in place
// and any extra copy of the same property is removed.
//
// The FAQPage block is deliberately NOT re-created here when the route keeps it:
// index.html already ships the mirrored block for crawlers without JavaScript.

function head() {
  return document.head;
}

function setNamed(name, content) {
  const all = [...head().querySelectorAll(`meta[name="${name}"]`)];
  const el = all.shift() || head().appendChild(Object.assign(document.createElement("meta"), { name }));
  el.setAttribute("content", content);
  all.forEach((extra) => extra.remove());
}

function setProperty(property, content) {
  const all = [...head().querySelectorAll(`meta[property="${property}"]`)];
  const el = all.shift() || head().appendChild(Object.assign(document.createElement("meta"), { property }));
  el.setAttribute("content", content);
  all.forEach((extra) => extra.remove());
}

function setCanonical(href) {
  const all = [...head().querySelectorAll('link[rel="canonical"]')];
  if (!href) {
    all.forEach((el) => el.remove());
    return;
  }
  const el = all.shift() || head().appendChild(Object.assign(document.createElement("link"), { rel: "canonical" }));
  el.setAttribute("href", href);
  all.forEach((extra) => extra.remove());
}

function syncFaqJsonLd(keep) {
  const blocks = [...head().querySelectorAll('script[type="application/ld+json"]')];
  const faqBlocks = blocks.filter((s) => (s.textContent || "").includes('"FAQPage"'));
  if (!keep) {
    faqBlocks.forEach((s) => s.remove());
    return;
  }
  // index.html already carries the mirrored FAQPage for this route — never add a
  // second one, and repair the block if it is missing.
  if (faqBlocks.length > 0) return;
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(FAQ_JSON_LD);
  head().appendChild(script);
}

export default function SeoManager() {
  const { pathname } = useLocation();

  useEffect(() => {
    const seo = resolveSeo(pathname);

    document.title = seo.title;
    setNamed("description", seo.description);
    setNamed("robots", seo.index ? "index,follow" : "noindex,follow");

    setProperty("og:type", "website");
    setProperty("og:site_name", "boombuy");
    setProperty("og:locale", "he_IL");
    setProperty("og:title", seo.title);
    setProperty("og:description", seo.description);
    setProperty("og:url", seo.canonical ? SITE_ORIGIN + seo.canonical : SITE_ORIGIN + "/");
    setNamed("twitter:card", "summary_large_image");
    setNamed("twitter:title", seo.title);
    setNamed("twitter:description", seo.description);

    setCanonical(seo.canonical ? SITE_ORIGIN + seo.canonical : null);
    syncFaqJsonLd(seo.faq);
  }, [pathname]);

  return null;
}