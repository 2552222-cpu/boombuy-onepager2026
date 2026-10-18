import { Link, useLocation } from "react-router-dom";

// Clear, branded error page for a URL that does not exist.
//
// Indexing: the SPA host serves the app shell for unknown paths, so the HTTP
// status is not under our control — a missing URL can answer 200. The noindex tag
// and the "not found" title/description for every unmapped path are applied
// centrally by SeoManager, which owns the head for all routes.
// We never redirect an unknown URL to the home page: the visitor chooses.
export default function PageNotFound() {
  const location = useLocation();

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