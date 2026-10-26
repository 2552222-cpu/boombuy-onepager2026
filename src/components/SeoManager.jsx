import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { resolveSeo, SITE_ORIGIN } from "@/lib/seoRoutes";
import syncStructuredData from "@/lib/structuredData";

// Route-aware SEO, applied once per path for EVERY way a visitor can arrive:
// direct entry, refresh and internal navigation all end here.
//
// Home title/description values in seoRoutes match index.html and the published
// SEO settings, so loading the app keeps the same Hebrew copy (also for OG/Twitter).
// Only managed tags are updated and deduplicated; verification and image tags
// remain untouched, and each other route keeps its own metadata.
//
// Only this site's Organization/WebSite and FAQ nodes are synchronized; other
// useful schema nodes stay intact. This is not a fix for initial server HTML:
// the platform's SEO settings must separately match the static metadata.

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
  const el = all.shift() || head().appendChild(document.createElement("meta"));
  el.setAttribute("property", property);
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
    syncStructuredData(seo);
  }, [pathname]);

  return null;
}