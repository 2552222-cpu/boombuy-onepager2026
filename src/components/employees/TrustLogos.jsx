import React, { useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { THEME } from "./designTokens";

// Stage 1: the two logo rows moved to the fixed bottom rail (LogoRail).
// This section is now a short, in-page introduction line only — no double logo wall.
export default function TrustLogos() {
  const ref = useRef(null);
  const fired = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !fired.current) {
            fired.current = true;
            try {
              base44.analytics.track({ eventName: "trust_logos_view" });
            } catch (err) {
              /* analytics must never break the UI */
            }
            io.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id="trust-logos-section"
      dir="rtl"
      style={{
        background: THEME.bg,
        padding: "36px 20px",
        textAlign: "center",
        fontFamily: THEME.fontFamily,
        scrollMarginTop: 90,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        <span
          style={{
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: THEME.coral,
            display: "inline-block",
            flexShrink: 0,
          }}
        />
        <p
          style={{
            margin: 0,
            color: THEME.charcoal,
            fontSize: "clamp(16px, 2vw, 20px)",
            fontWeight: 600,
            letterSpacing: "-0.01em",
            lineHeight: 1.3,
          }}
        >
          בין הארגונים שכבר עובדים איתנו
        </p>
      </div>
    </section>
  );
}