import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Clear, branded error page for a URL that does not exist.
//
// Base44 prerendering reads this status hint for crawler responses.
// SeoManager separately applies noindex and the not-found metadata.
// We never redirect an unknown URL to the home page: the visitor chooses.
export default function PageNotFound() {
  const location = useLocation();

  useEffect(() => {
    const status = document.createElement("meta");
    status.name = "prerender-status-code";
    status.content = "404";
    document.head.appendChild(status);
    return () => status.remove();
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