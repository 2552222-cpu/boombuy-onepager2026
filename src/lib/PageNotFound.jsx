import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Clear, branded error page for a URL that does not exist.
//
// Indexing: the SPA host serves the app shell for unknown paths, so the HTTP
// status is not under our control — a missing URL can answer 200. We therefore
// mark the page noindex for as long as it is mounted (and restore the previous
// value on unmount, so the tag never leaks onto a valid page).
// We never redirect an unknown URL to the home page: the visitor chooses.
export default function PageNotFound() {
  const location = useLocation();

  useEffect(() => {
    let meta = document.querySelector('meta[name="robots"]');
    const created = !meta;
    const previous = meta ? meta.getAttribute("content") : null;
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "robots";
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", "noindex,follow");
    return () => {
      if (created) meta.remove();
      else if (previous !== null) meta.setAttribute("content", previous);
    };
  }, []);

  return (
    <div
      dir="rtl"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 20px",
        background: "#FBFAF8",
        fontFamily: "var(--font-heebo), Heebo, Arial, sans-serif",
        color: "#17191D",
      }}
    >
      <div style={{ maxWidth: 520, width: "100%", textAlign: "center" }}>
        <p style={{ fontSize: 56, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", margin: 0 }}>404</p>
        <h1 style={{ fontSize: "clamp(22px,3vw,30px)", fontWeight: 800, letterSpacing: "-0.02em", margin: "18px 0 10px" }}>
          העמוד שחיפשתם לא נמצא
        </h1>
        <p style={{ color: "#3A3C42", fontSize: 16, lineHeight: 1.7, margin: 0 }}>
          ייתכן שהקישור שגוי, או שהעמוד הועבר למקום אחר.
        </p>
        <p style={{ color: "#6E7177", fontSize: 14, lineHeight: 1.6, margin: "8px 0 0", direction: "ltr", wordBreak: "break-all" }}>
          {location.pathname}
        </p>
        <Link
          to="/"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 28,
            height: 52,
            padding: "0 28px",
            borderRadius: 999,
            background: "#17191D",
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            textDecoration: "none",
          }}
        >
          חזרה לדף הבית
        </Link>
      </div>
    </div>
  );
}