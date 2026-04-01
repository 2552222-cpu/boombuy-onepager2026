import React, { useState, useRef } from "react";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const OFFERS = [
  {
    id: "apple",
    badge: "חשמל, אלקטרוניקה ומובייל",
    title: "Apple במחיר עובדים",
    text: "אייפון, AirPods ומוצרי פרימיום במחירים שמרגישים אחרת.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/db8e935e8_-2026-03-22T162955489.png",
    accent: "#0071e3",
  },
  {
    id: "alo",
    badge: "אופנה",
    title: "Alo Yoga במחיר עובדים",
    text: "מותג פרימיום שאנשים באמת רוצים לקנות, במחיר עובדים.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/6a4f8399a_90.png",
    accent: "#6c63ff",
  },
  {
    id: "adidas",
    badge: "אופנה וספורט",
    title: "Adidas / Nike לעובדים",
    text: "גם מוצרי ספורט והנעלה הופכים להיות חלק מהנטו.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/82cf01fcc_87.png",
    accent: "#222",
  },
  {
    id: "super",
    badge: "יוקר המחיה",
    title: "סופר ופארם בהנחה קבועה",
    text: "כאן העובד מבין שזה לא מבצע חד-פעמי, אלא משהו שחוזר כל שבוע.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/d53a51271_-2026-03-22T163009970.png",
    accent: "#1a7a4a",
  },
  {
    id: "vacation",
    badge: "נופש וחופשות",
    title: "חופשה במחיר עובדים",
    text: "חופשות, מלונות וחוויות במחירים שמרגישים אחרת.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/1b29c5bb8_-2026-03-22T162942110.png",
    accent: "#0055a0",
  },
  {
    id: "luggage",
    badge: "נסיעות וטרוול",
    title: "מזוודה במחיר עובדים",
    text: "סט 3 מזוודות Kate Hill יבואן רשמי. מחיר ירידה חריג מ-1,999 ל-249 ש״ח.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/b4837c4f0_-2026-03-15T180501791.png",
    accent: "#444",
    regularPrice: 1999, employeePrice: 249, savings: 1750,
  },
  {
    id: "culture",
    badge: "תרבות ופנאי",
    title: "קזבלן והופעות במחיר עובדים",
    text: "גם עולם התרבות והבילוי חייב להרגיש חלק מהנטו.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/3d11c2184_-2026-03-22T165538542.png",
    accent: "#7a1020",
  },
  {
    id: "daily",
    badge: "כל בוקר הטבה חדשה",
    title: "כל בוקר הטבה חדשה",
    text: "260 הטבות בשנה — ישירות לוואטסאפ שלך. תמיד במחיר הנמוך ביותר בישראל.",
    image: "https://media.base44.com/images/public/69bc4105141d932b80ba9f27/7e52326a0_-2026-03-22T160414836.png",
    accent: "#0066CC",
  },
];

function OfferCard({ offer, onCTA }) {
  return (
    <div style={{
      flexShrink: 0,
      width: "clamp(240px, 70vw, 300px)",
      borderRadius: "20px",
      overflow: "hidden",
      background: "#fff",
      boxShadow: "0 4px 20px rgba(0,0,0,0.09)",
      border: "1px solid rgba(0,0,0,0.07)",
      display: "flex",
      flexDirection: "column",
    }}>
      {/* תמונה */}
      <div style={{
        background: "#FAFAFA",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "28px 24px",
        height: "200px",
        borderBottom: "1px solid rgba(0,0,0,0.05)",
      }}>
        <img
          src={offer.image}
          alt={offer.title}
          style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain", filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.12))" }}
        />
      </div>

      {/* תוכן */}
      <div style={{ padding: "18px 18px 20px", display: "flex", flexDirection: "column", gap: "8px", flex: 1 }}>
        <span style={{
          display: "inline-block",
          background: offer.accent,
          color: "#fff",
          fontSize: "10px", fontWeight: 700,
          padding: "3px 10px", borderRadius: 999,
          alignSelf: "flex-start",
          fontFamily: "var(--font-heebo)",
        }}>
          {offer.badge}
        </span>

        <h3 style={{
          fontSize: "16px", fontWeight: 900, color: "#1D1D1F",
          letterSpacing: "-0.02em", lineHeight: 1.25, margin: 0,
          fontFamily: "var(--font-heebo)",
        }}>
          {offer.title}
        </h3>

        <p style={{ fontSize: "13px", color: "#555", lineHeight: 1.5, margin: 0, fontFamily: "var(--font-heebo)" }}>
          {offer.text}
        </p>

        {offer.regularPrice && (
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "4px" }}>
            {[
              { label: "מחיר רגיל", value: `₪${offer.regularPrice.toLocaleString()}`, color: "#86868B", strike: true },
              { label: "מחיר עובדים", value: `₪${offer.employeePrice.toLocaleString()}`, color: "#34C759", strike: false },
              { label: "חיסכון", value: `₪${offer.savings.toLocaleString()}`, color: "#0066CC", strike: false },
            ].map((c) => (
              <div key={c.label} style={{
                background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: "10px", padding: "6px 10px", textAlign: "center",
              }}>
                <p style={{ fontSize: "9px", color: "#86868B", margin: "0 0 2px", fontFamily: "var(--font-heebo)" }}>{c.label}</p>
                <p style={{ fontSize: "13px", fontWeight: 800, color: c.color, textDecoration: c.strike ? "line-through" : "none", margin: 0, fontFamily: "var(--font-heebo)" }}>{c.value}</p>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={onCTA}
          style={{
            marginTop: "auto",
            paddingTop: "12px",
            background: "#0066CC", color: "#fff",
            fontWeight: 700, fontSize: "13px",
            padding: "11px 18px", borderRadius: "10px",
            border: "none", cursor: "pointer",
            fontFamily: "var(--font-heebo)",
          }}
        >
          אני רוצה שהארגון שלי יצטרף
        </button>
      </div>
    </div>
  );
}

export default function FeaturedOffersSlider() {
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  const scrollToSurvey = () => {
    setTimeout(() => document.getElementById("survey-section")?.scrollIntoView({ behavior: "smooth" }), 150);
  };

  const go = (dir) => {
    const next = Math.min(Math.max(active + dir, 0), OFFERS.length - 1);
    setActive(next);
    if (trackRef.current) {
      const cardWidth = trackRef.current.children[0]?.offsetWidth + 16 || 316;
      trackRef.current.scrollTo({ left: next * cardWidth, behavior: "smooth" });
    }
  };

  return (
    <section style={{
      background: "#F5F5F7",
      padding: "64px 0 72px",
      overflowX: "hidden",
      maxWidth: "100vw",
      borderTop: "1px solid rgba(0,0,0,0.06)",
      direction: "rtl",
    }}>
      {/* Header */}
      <div style={{
        maxWidth: 1300, margin: "0 auto",
        padding: "0 20px 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "1rem", flexWrap: "wrap",
      }}>
        <div>
          <h2 style={{
            fontSize: "clamp(24px, 3.5vw, 36px)",
            fontWeight: 900, color: "#1D1D1F",
            letterSpacing: "-0.025em", lineHeight: 1.15,
            marginBottom: 8,
            fontFamily: "var(--font-heebo)",
          }}>
            ככה נראית הטבה אמיתית
          </h2>
          <p style={{ fontSize: 15, color: "#86868B", fontFamily: "var(--font-heebo)", lineHeight: 1.6 }}>
            דוגמאות חריגות לחיסכון מהשנה האחרונה.
          </p>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button onClick={() => go(-1)} disabled={active === 0} style={{
            width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)",
            background: "#fff", color: "#1D1D1F", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: active === 0 ? "default" : "pointer",
            opacity: active === 0 ? 0.3 : 1, transition: "0.2s",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}>
            <ChevronRight size={18} />
          </button>
          <button onClick={() => go(1)} disabled={active === OFFERS.length - 1} style={{
            width: 40, height: 40, borderRadius: "50%", border: "1px solid rgba(0,0,0,0.1)",
            background: "#fff", color: "#1D1D1F", display: "flex", alignItems: "center",
            justifyContent: "center", cursor: active === OFFERS.length - 1 ? "default" : "pointer",
            opacity: active === OFFERS.length - 1 ? 0.3 : 1, transition: "0.2s",
            boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
          }}>
            <ChevronLeft size={18} />
          </button>
        </div>
      </div>

      {/* Cards track */}
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingInline: "20px",
          paddingBottom: "20px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {OFFERS.map((o) => (
          <OfferCard key={o.id} offer={o} onCTA={scrollToSurvey} />
        ))}
      </div>

      {/* Dots */}
      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", paddingTop: "20px", paddingBottom: "28px" }}>
        {OFFERS.map((_, i) => (
          <button key={i} onClick={() => { setActive(i); if (trackRef.current) { const cardWidth = trackRef.current.children[0]?.offsetWidth + 16 || 316; trackRef.current.scrollTo({ left: i * cardWidth, behavior: "smooth" }); } }} style={{
            width: i === active ? 20 : 8, height: 8,
            borderRadius: 999,
            background: i === active ? "#0066CC" : "rgba(0,0,0,0.15)",
            border: "none", cursor: "pointer",
            transition: "all 0.3s ease", padding: 0,
          }} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center" }}>
        <button
          onClick={scrollToSurvey}
          style={{
            background: "#0066CC", color: "#fff",
            fontWeight: 800, fontSize: 15,
            padding: "13px 32px", borderRadius: 12,
            border: "none", cursor: "pointer",
            boxShadow: "0 6px 20px rgba(0,102,204,0.24)",
            fontFamily: "var(--font-heebo)",
          }}
        >
          אני רוצה שהארגון שלי יצטרף
        </button>
      </div>
    </section>
  );
}